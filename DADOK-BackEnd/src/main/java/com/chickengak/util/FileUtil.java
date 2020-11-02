package com.chickengak.util;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FileUtil {
	
private static final String alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	
	public static String getRandomString() {
		StringBuilder sb = new StringBuilder();
		Random random = new Random(System.currentTimeMillis());
		for(int i=0;i<32;i++) {
			sb.append(alphabet.charAt(random.nextInt(52)));
		}
		return sb.toString();
	}
	
	/**
     * 다운로드시 한글 깨짐 방지 처리
     */
    public static String setDisposition(String filename, HttpServletRequest request) throws Exception {
          String browser = getBrowser(request);

          String dispositionPrefix = "attachment; filename=";

          String encodedFilename = null;

    System.out.println("================================="+browser+"=============================");

          if (browser.equals("MSIE")) {
                 encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
          } else if (browser.equals("Trident")) {       // IE11 문자열 깨짐 방지
                 encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");

          } else if (browser.equals("Firefox")) {
                 encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
                 encodedFilename = URLDecoder.decode(encodedFilename);

          } else if (browser.equals("Opera")) {
                 encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";

          } else if (browser.equals("Chrome")) {
                 StringBuffer sb = new StringBuffer();

                 for (int i = 0; i < filename.length(); i++) {
                        char c = filename.charAt(i);
                        if (c > '~') {
                              sb.append(URLEncoder.encode("" + c, "UTF-8"));
                        } else {
                              sb.append(c);
                        }
                 }
                 encodedFilename = sb.toString();

          } else if (browser.equals("Safari")){
                 encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1")+ "\"";
                 encodedFilename = URLDecoder.decode(encodedFilename);
          }
          else {
                 encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1")+ "\"";
          }
          return "Content-Disposition"+ dispositionPrefix + encodedFilename;
//          if ("Opera".equals(browser)){
//                 response.setContentType("application/octet-stream;charset=UTF-8");
//          }
 }

    public static String getBrowser(HttpServletRequest request) {
          String header = request.getHeader("User-Agent");
     if (header.indexOf("MSIE") > -1) {
         return "MSIE";
     } else if (header.indexOf("Trident") > -1) {   // IE11 문자열 깨짐 방지
         return "Trident";
     } else if (header.indexOf("Chrome") > -1) {
         return "Chrome";
     } else if (header.indexOf("Opera") > -1) {
         return "Opera";
     } else if (header.indexOf("Safari") > -1) {
         return "Safari";
     }
     return "Firefox";
    }



//출처: https://developerdon.tistory.com/entry/java-spring-파일다운로드-한글깨짐-처리 [즐거운]
	
}
