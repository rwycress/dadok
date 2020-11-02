

# 얼굴 인식 참고 기존 readme
# Face Recognition

Display webcam video in real time with person's names on the video.

* camera.py - check webcam
* face_recog.py - recognize faces on webcam frame
* live_streaming.py - send video over network http://IP_addr:5000/

All 3 files are runnable like this:
```
$ python camera.py
$ python face_recog.py
$ python live_streaming.py
```

Put picture with one person's face in `knowns` directory. Change the file name as the person's name like: `john.jpg` or `jane.jpg`. Then run `python face_recog.py`. Or `python live_streaming.py` to send video over network.

Visit [https://ukayzm.github.io/python-face-recognition/](https://ukayzm.github.io/python-face-recognition/) for more information.

# 수정 후 readme

OpenCV와 Face_Recognition이 설치가 되있어야 정상 작동합니다.
외부 카메라의 경우에는 세팅을 해야 사용이 가능합니다.
기존과 동일하게 얼굴이 인식되면 등록된 유저의 경우 이름이 출력되고 등록이 안되있으면 unknown을 출력
현재 한글이 깨지는 현상이 발생하지만 이 부분은 face_web.py에서 한글 작업을 안해주어서 발생

* camera.py - webcam이 정상 작동 되는 지 확인 할 수 있습니다.
* face_web.py - 얼굴인식이 정상적으로 가능한지 확인 할 수 있습니다.
* live_web.py - kiosk의 웹을 컨트롤 해줍니다.

사진의 이름은 "유저번호<<유저닉네임.jpg"형식으로 knowns디렉토리에 저장. ex) "7<<JinSH.jpg"
사진의 경우 파일 용량이 클경우 인코딩과정에서 멈출수 있으므로 크기가 작은 흑백사진으로 권장(프로필사진 정도의 크기가 적당)
