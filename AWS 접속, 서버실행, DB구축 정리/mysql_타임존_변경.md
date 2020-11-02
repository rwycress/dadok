출처: http://devstory.ibksplatform.com/2018/05/mysql-db-time-zone.html

리눅스에서  mysql timezone 변경

 

1. 커널에서 mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql -u root -p mysql 입력

2. 워크벤치(or mysql)에서  SET GLOBAL time_zone='Asia/Seoul';

   SET time_zone = 'Asia/Seoul';

