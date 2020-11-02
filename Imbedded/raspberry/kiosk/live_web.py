#-*-coding:utf-8-*-
#-*-coding:euc-kr-*-

# live_streaming.py

from flask import Flask, render_template, Response, session, redirect, request, jsonify
import json
from datetime import datetime
import requests
import face_web
import imgencoding

# encoding 과정이 askii 로 진행되는 현상을 막기 위한 설정
import sys
reload(sys)
sys.setdefaultencoding("utf-8")
# =================================================

app = Flask(__name__)
# 인식될 얼굴의 이름을 저장
face_n = ""
face_no = ""
# html에 보내주고 싶은 메시지를 저장
sub_meg = ""
main_meg=""

rev_no = ""
# 메인화면
@app.route('/')
def index():
    global main_meg
    global face_n
    face_n= ""
    global face_no
    face_no= ""
    return render_template('index.html',html_msg = main_meg)
#==================================

@app.route('/delrev')
def delrev():
    
    redirect('/')

@app.route('/test',methods=['POST'])
def test():
    if request.method =='POST':
        result = request.form
        return render_template('test.html',result= result);
        
@app.route('/postuser' ,methods =['GET','POST'])
def postuser():
    global face_no 
    global face_n
    if face_no == "":
        face_no = 2;
    url = 'http://i3d208.p.ssafy.io:9999/chickengak/user/kiosk'
#    r = requests.get(url, params={'user_no':face_n})
#    print(r.status_code)
#    print(r.text)
    json_data = json.dumps(face_no)
#    print("====================================")
#    print(json_data)
    r = requests.post(url, json_data,headers={'Content-Type':'application/json'})
#    print(r.status_code)
#    print(r.text)
    if face_no == 2:
        return redirect('http://i3d208.p.ssafy.io/kioskSeat')
        
#    data = {'user_no':face_n}
#    json_data = json.dumps(data)
    
#    print(json_data)
#    print(type(json_data))
#    res = requests.post(url, json_data, headers={'Content-Type':'application/json'})
#    print(res.status_code)
#    print(res.text)
    now = datetime.now()
    time = now.strftime("%Y.%m.%d%H%M")
    url = 'http://i3d208.p.ssafy.io:9999/chickengak/resv/user/'+face_no+'?datetime='+time
    
    r = requests.get(url)
 #   if r.text == "[]":
    return redirect('http://i3d208.p.ssafy.io/kioskSeat')
 #   else :
 #       return render_template('put_room.html',put_msg = face_n + "님 퇴실하시겠습니까?")
    

# 사용자 확인 절차
@app.route('/choose')
def choose():
    global face_n
    global sub_meg, main_meg
    if len(face_n) == 0 :
        main_meg = "얼굴을 확인하지 못했습니다."
    elif face_n == "Unknown" :
        main_meg = "등록되지 않은 회원입니다.(회원이시면 동기화를 해주세요!)"
    else :
        sub_meg = face_n + "님이 맞습니까?"
        return render_template('choose.html', html_msg = sub_meg,face_n = face_n)
    return redirect('/')
#================================

@app.route('/room/<room_no>')
def room(room_no):
    
    now = datetime.now()
    time = now.strftime("%Y%m%d")
    
    url = 'http://i3d208.p.ssafy.io:9999/chickengak/resv/seat/date?date='+time+'&seat_no='+room_no
    r = requests.get(url)
    print(url)
    data = r.text
    info = json.loads(data)
    
    print(info)
    
    time = now.strftime("%Y-%m-%d %H:%M:%S")
    return render_template('room.html',room_no = room_no,post=info)
    

#======== 사용자가 사용중인지 판단 하고 사용중이면 퇴실창을 미사용 중이면 입실창을 제공
@app.route('/getuser')
def getuser():
    global face_no
    global face_n
    now = datetime.now()
    time = now.strftime("%Y.%m.%d%H%M")
    url = 'http://i3d208.p.ssafy.io:9999/chickengak/resv/user/'+face_no+'?datetime='+time
    r = requests.get(url)
    print(r.text)
    if r.text == "[]":
        return pick();
    else :
        global rev_no
        data = r.text
        info = json.loads(data)
        rev_no = info.no
        print(rev_no)
        return render_template('put_room.html',put_msg = face_n + "님 퇴실하시겠습니까?")
# 퇴실 창
@app.route('/putroom')
def putroom():
    global rev_no
    url = 'http://i3d208.p.ssafy.io:9999/chickengak/resv/'+rev_no
    r = requests.get(url)
    #예약 삭제 기능 (아직 미 구현)
    return redirect('/')
# 입실 창
@app.route('/pick')
def pick():
    global face_n
    if face_n == "Unknown":
        pick_msg = "비회원으로 시작합니다."
    else :
        pick_msg = face_n + "님 어서오세요."
    return render_template('pick.html',pick_msg = pick_msg)
#========================================================

# 얼굴 인식 페이지 (회원)
@app.route('/facescan')
def facescan():
    return render_template('face_scan.html')

# 얼굴 인식 페이지 (비회원)    
@app.route('/facesave')
def facesave():
    return render_template('face_save.html')

# 얼굴 인식 부분
def gen(fr):
    while True:
        jpg_bytes = fr.get_jpg_bytes()
        global face_n
        global face_no
        if face_n == "Unknown" or len(face_n) == 0:
            face_n = fr.get_name()
            face_no = fr.get_no()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + jpg_bytes + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    global main_meg
    global face_n
    face_n=""
    main_meg=""
    next = face_web.FaceRecog()
    return Response(gen(next), mimetype='multipart/x-mixed-replace;boundary=frame')
#==============================================================

# 얼굴 인식 정보 최신화를 하는 부분
@app.route('/synch_face')
def synch_face() :
    global main_meg
    # encoding 부분은 서버 쪽에서 encoding 후 txt파일만 최신 껄로 교체하는 방식은 차후 개선
    imgencoding.Encoding()
    #===============================================
    main_meg = "최신화가 완료되었습니다."
    return render_template('sy_choose.html',html_msg = main_meg)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

