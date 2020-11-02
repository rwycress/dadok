아마존 EC2 시간대 변경



Timezone ?

리눅스를 새로 설치하고 나면 (AWS EC2 AMI도 Linux와 동일) 시간대(Timezone)을 맞추지 않으면, 리눅스의 date가 미국 태평양 시간인 PST로 표시됩니다. 즉 캘리포니아 현지 시간으로 표시됩니다. 이럴경우 한국 표준시인 KST로 변경해주어야 합니다.



**Timezone 변경**

[?](https://ora-sysdba.tistory.com/entry/Cloud-Computing-Amazon-EC2-인스턴스의-TIMEZONE-변경#)

```
[ec2-user@ip-172-31-7-180 ~]$ ``date``Fri Aug 8 06:41:49 UTC 2014` `[ec2-user@ip-172-31-7-180 ~]$ ``sudo` `date``Fri Aug 8 06:42:01 UTC 2014` `[ec2-user@ip-172-31-7-180 ~]$ ``sudo` `cat` `/etc/localtime``TZif2UTCTZif2UTC``UTC0` `[ec2-user@ip-172-31-7-180 ~]$ ``sudo` `rm` `/etc/localtime` `[ec2-user@ip-172-31-7-180 ~]$ ``sudo` `ln` `-s ``/usr/share/zoneinfo/Asia/Seoul` `/etc/localtime` `[ec2-user@ip-172-31-7-180 ~]$ ``date``Fri Aug 8 15:48:27 KST 2014` `[ec2-user@ip-172-31-7-180 ~]$ ``sudo` `date``Fri Aug 8 15:48:40 KST 2014
```



출처: https://ora-sysdba.tistory.com/entry/Cloud-Computing-Amazon-EC2-인스턴스의-TIMEZONE-변경 [Welcome To Ora-SYSDBA]