import face_recognition
import cv2
import os
import numpy as np

class Encoding():
  def __init__(self):
    self.known_face_encodings = []
    self.known_face_names = []

    f = open("encoding.txt",'w')

    dirname = 'knowns'
    files = os.listdir(dirname)
    for filename in files:
#      print(filename)
      name, ext = os.path.splitext(filename)
#      print(ext)
      if ext == '.jpg':
        self.known_face_names.append(name)
        pathname = os.path.join(dirname, filename)
        img = face_recognition.load_image_file(pathname)
        face_encoding = face_recognition.face_encodings(img)
#        print(face_encoding[0])
        f.write(name)
        f.write(str(face_encoding))
    f.close()

if __name__ == '__main__':
  face_recog = Encoding()

