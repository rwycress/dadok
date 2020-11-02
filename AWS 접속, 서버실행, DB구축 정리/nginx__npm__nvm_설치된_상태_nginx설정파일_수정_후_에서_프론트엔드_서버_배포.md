nginx, npm, nvm 설치된 상태(nginx설정파일 수정 후)에서 

aws에서 프론트 서버 배포하는법



nginx실행하는 명령어 -  sudo service nginx start

nginx상태보는 명령어 -	sudo service nginx status

nginx끄는 명령어	-	sudo systemctl stop nginx



1. 프론트 프로젝트 있는 쪽으로 이동.

   cd dadok-front/s03p13d208/FrontEnd/webfront/

   

2. git pull origin master

   이메일, 비밀번호 입력해서 pull받는다.

   

3. npm run build

   

4. 빌드 후 생기는 build폴더를  /var/www/html/로 옮긴다. ( 여기 기존에 존재하는 build폴더 지운다.

   지우는 방법 --  sudo rm -r build )

   명령어는 cp -r /dadok-front/s03p13d208/FrontEnd/webfront/build /var/www/html/

   cp -r [옮겨야하는 폴더] [옮길위치]

   옮길위치 뒤에 / 넣으면 하위폴더로 들어가고 안넣으면 마지막에 적힌 폴더이름으로 복사된다.

5. 프론트엔트 웹프론트폴더 가서 (4번 안되서 추가)

   cp -r build /var/www/html/ 하면 옮겨짐



cd dadok-front/s0313d208/FrontEnd/webfront

cd /var/www/html

