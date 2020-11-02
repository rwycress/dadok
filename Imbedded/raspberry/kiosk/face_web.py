# face_recog.py

import face_recognition
import cv2
import camera
import os
import numpy as np

find_name = ""
find_no = ""
class FaceRecog():
    def __init__(self):

        self.camera = camera.VideoCamera()

        self.known_face_encodings = []
        self.known_face_names = []
        self.known_face_no = []

        # Load sample pictures and learn how to recognize it.
        file = open("encoding.txt",'r')
        datas = file.read().strip().split("])]")

        for data in datas:
            if len(data) != 0:
                imgdata = data.split("[array([")
                user_data = imgdata[0].split("<<")
                print(user_data[1] + ":" + user_data[0])
                self.known_face_names.append(user_data[1])
                self.known_face_no.append(user_data[0])
                tmp = imgdata[1].split(',')
                self.known_face_val=[]
                for fval in tmp:
                    self.known_face_val.append(float(fval))
                face_encoding = self.known_face_val
                self.known_face_encodings.append(face_encoding)
        # Initialize some variables
        self.face_locations = []
        self.face_encodings = []
        self.face_names = []
        self.process_this_frame = True

    def __del__(self):
        del self.camera
    def get_name(self):
        return find_name
        
    def get_no(self):
        return find_no

#===========인식된 얼굴 사각형 그리고 사진을 전송===
    def get_frame(self):
        global find_name
        find_name = ""
        global find_no
        find_no = ""
        # Grab a single frame of video
        frame = self.camera.get_frame()

        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Only process every other frame of video to save time
        if self.process_this_frame:
            # Find all the faces and face encodings in the current frame of video
            self.face_locations = face_recognition.face_locations(rgb_small_frame)
            self.face_encodings = face_recognition.face_encodings(rgb_small_frame, self.face_locations)

            self.face_names = []
            for face_encoding in self.face_encodings:
                # See if the face is a match for the known face(s)
                distances = face_recognition.face_distance(self.known_face_encodings, face_encoding)
                min_value = min(distances)

                # tolerance: How much distance between faces to consider it a match. Lower is more strict.
                # 0.6 is typical best performance.
                name = "Unknown"
                no = ""
                if min_value < 0.4:
                    index = np.argmin(distances)
                    name = self.known_face_names[index]
                    no = self.known_face_no[index]
                    print("found")
                find_name = name
                find_no = no
#                print(find_name)
                self.face_names.append(name)

        self.process_this_frame = not self.process_this_frame

        # Display the results
        for (top, right, bottom, left), name in zip(self.face_locations, self.face_names):
            # Scale back up face locations since the frame we detected in was scaled to 1/4 size
            top *= 4
            right *= 4
            bottom *= 4
            left *= 4

            # Draw a box around the face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

        return frame
#==========================================================================
    def get_jpg_bytes(self):
        frame = self.get_frame()
        # We are using Motion JPEG, but OpenCV defaults to capture raw images,
        # so we must encode it into JPEG in order to correctly display the
        # video stream.
        ret, jpg = cv2.imencode('.jpg', frame)
        return jpg.tobytes()
        
    def face_save(self):
        cam = cv2.VideoCapture(0)
        cam.set(3, 640)
        cam.set(4, 480)
        face_detector = cv2.CascadeClassifier('haarcascades/haarcascade_frontalface_default.xml')
        count = 0
        while(True):
            ret, img = cam.read()
            img = cv2.flip(img, 1)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = face_detector.detectMultiScale(gray, 1.3, 5)
            for (x,y,w,h) in faces:
                cv2.rectangle(img, (x,y), (x+w, y+h), (255,0,0), 2)
                count += 1
    # Save the captured image into the datasets folder
                cv2.imwrite("knowns/Guest.jpg", gray[y:y+h, x:x+w])
                cv2.imshow('image',img)

if __name__ == '__main__':
    face_web = FaceRecog()
    print("start")
    print(face_web.known_face_names)
    while True:
        frame = face_web.get_frame()

        # show the frame
        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF

        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break

    # do a bit of cleanup
    cv2.destroyAllWindows()
    print('finish')
