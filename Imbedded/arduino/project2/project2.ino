#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#define USE_SERIAL Serial

ESP8266WiFiMulti WiFiMulti;

const char* ssid = "DESKTOP-KVCQHCD 5694";
const char* password = "q,342G43";
const char* serverName = "http://i3d208.p.ssafy.io:9999/chickengak/sensors";
const int ARUID = 1;
const int sampleWindow = 50;      // 샘플링한 시간 50ms
boolean warningfound =false;
int warningcount=0;
int quietcount=0;
unsigned int value;               // 소리 증폭 감지 센서 값 받는 변수
unsigned int userno = 2;

int ledPin = 12; // GPIO13

int LED_value = LOW;
int timecount=0;
WiFiServer server(80);
 
void setup() {
  Serial.begin(115200);
  USE_SERIAL.setDebugOutput(true);
  
  pinMode(14, OUTPUT);
  digitalWrite(14, LOW);

  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
 
  for(uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);    //와이파이 이름 비번 입력
  Serial.println("start");
 
//  server.begin();
//  Serial.println("Server started");
//  Serial.print("Use this URL to connect: ");
//  Serial.print("http://");
//  Serial.print(WiFi.localIP());
//  Serial.println("/");
 
}

void loop() {
//  if(timecount%16==0){
//  WiFiClient client = server.available();
// 
//  // Read the first line of the request
//  String request = client.readStringUntil('\r');
//  client.flush();
// 
//  if (request.indexOf("/LED=ON") != -1)  {
//    digitalWrite(ledPin, HIGH);
//    LED_value = HIGH;
//  }
//  if (request.indexOf("/LED=OFF") != -1)  {
//    digitalWrite(ledPin, LOW);
//    LED_value = LOW;
//  }
  
//  webpage();
//  }
//  timecount = (timecount+1)%16;
 // if(LED_value==HIGH){
    // wait for WiFi connection
    unsigned long startMillis= millis();  // 샘플링 시작
    unsigned int peakToPeak = 0;          // 음성 신호의 진폭

    unsigned int signalMax = 0;           // 최대 크기를 초기에는 0으로 설정
    unsigned int signalMin = 1024;        // 최소 크기를 초기에는 1024로 설정
    while (millis() - startMillis < sampleWindow){  // 데이터를 50ms마다 모으는 while문
      value = analogRead(A0);           // 소리 감지센서에더 데이터 받아오기
      if (value < 1024){                // 받아온 데이터의 값이 1024 이하일 때
        if (value > signalMax)         // 최대 크기 측정
          signalMax = value;          // 최대 크기 signalMax에 저장
        else if (value < signalMin)    // 최소 크기 측정
          signalMin = value;          // 최소 크기 sigmalMin에 저장
      }
    }
    peakToPeak = signalMax - signalMin;  // 최대- 최소 = 진폭값
    double volts = (peakToPeak * 5.0) / 1024;  // 전압 단위로 변환 = 소리 크기로 변환
    int temp=volts*100;
    if(temp<30){
      temp +=200;
    }
    if(temp >200){
//     Serial.print("Find Warning");
      warningcount+=50;
      quietcount=0;
      warningfound=true; 
    }
    else if(warningcount>0){
      warningcount--;
      quietcount++;
    }
    if(quietcount>50){
      warningcount=0;
      warningfound=false;
    }
    if(warningcount>200){
//     Serial.print("LED ON");
      digitalWrite(14, HIGH);
    } else {
//     Serial.print("LED OFF");
      digitalWrite(14, LOW);
    }

//========시리얼 플로터 확인
//    Serial.print("warningcount: ");    
//    Serial.println(warningcount);
//=========================
   
//=======시현시 보정값
//    temp=temp - 160;
//    if(temp<0){
//      temp= temp*(-1);
//    }
//    if(temp<40){
//      temp=0;
//    }
//====================

//========시리얼 플로터 확인
    Serial.print("Sound_val: ");    
    Serial.println(temp);
//=========================
//===========인터넷 연결 부분
//  if((WiFiMulti.run() == WL_CONNECTED)) {
//
//    HTTPClient http;
//======== 센서값을 aws로 보내주는 부분
//    http.begin("http://i3d208.p.ssafy.io:9999/chickengak/sensors");
//    http.addHeader("Content-Type", "application/json; charset=ascii");
//    
//    String httpRequestData = "{\"user_no\": \""+String(userno)+"\",\"val\": \""+String(temp)+"\"}";
//    Serial.println(httpRequestData);
//    int httpResponseCode = http.POST(httpRequestData);
//    
//    if(httpResponseCode>0){
//      String response = http.getString();
//      Serial.println(httpResponseCode);
//      Serial.println(response);
//      
//    } else {
//      Serial.print("Error on sending POST: ");
//      Serial.println(httpResponseCode);
//    }
//    http.end();
////===============================
//  } else {
//    Serial.println("Error in WiFi connection");
//  }
//  
//    if(timecount%16!=0){
      delay(200); 
//    }
  //}
}

//void webpage(){
//  client.println("HTTP/1.1 200 OK");
//  client.println("Content-Type: text/html");
//  client.println(""); //  do not forget this one
//  client.println("<!DOCTYPE HTML>");
//  client.println("<html>");
// 
//  client.print("Led pin is now: ");
// 
//  if(LED_value == HIGH) {
//    client.print("On");
//  } else {
//    client.print("Off");
//  }
//  client.println("<br><br>");
//  client.println("<a href=\"/LED=ON\"\"><button>Turn On </button></a>");
//  client.println("<a href=\"/LED=OFF\"\"><button>Turn Off </button></a><br />");  
//  client.println("</html>");
//}
