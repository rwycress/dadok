package com.chickengak.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

public  class MYUtil {
	public static boolean timeCheck(String start, String end, String oStart, String oEnd) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh");
		try {
//			Calendar scal = new Calendar();
			Date sdate = sdf.parse(start);
			Date edate = sdf.parse(end);
//			edate.setHours(edate.getHours()+1);
			Date osdate = sdf.parse(oStart);
			Date oedate = sdf.parse(oEnd);
			
			
			System.out.println(start + " " + end);
			System.out.println(oStart + " " + oEnd);
			
			int shour = Integer.parseInt(start.substring(11, 13).replaceAll(":", ""));
			int ehour = Integer.parseInt(end.substring(11, 13).replaceAll(":", ""));
			int oshour = Integer.parseInt(oStart.substring(11, 13).replaceAll(":", ""));
			int oehour = Integer.parseInt(oEnd.substring(11, 13).replaceAll(":", ""));
			System.out.println(shour +   "  sssss");
			System.out.println(oshour +   "  ooosssss");
			if(shour <= oshour && oshour < ehour) return true;
			if(shour < oehour && oehour <= ehour) return true;
			if(oshour <= shour && ehour <= oehour) return true;
			
			
//			//기존 예약의 시작시간과 예약시간의 끝시간이 같은 경우 예약 가능
//			if(sdate.equals(oedate)) return true;
//			//기존 예약의 끝나는 시간과 예약시간의 시작시간이 같은 경우 가능
//			if(edate.equals(osdate)) return true;
//			//기존 예약의 시작시간보다 예약하는 시간의 끝시간이 앞일 경우 가능
//			if(sdate.after(oedate)) return true;
//			//기존 예약의 끝시간보다 예약하는 시간의 시작이간이 뒤일 경우 가능
//			if(edate.before(osdate)) return true;
			
//			System.out.println(sdate.getHours() + "    hours");
//			sdate.get
//			if ( ((sdate.before(osdate) || sdate.equals(osdate)) && 
//					(osdate.before(edate) || osdate.equals(edate) ))
//				&&
//				((sdate.before(oedate) || sdate.equals(oedate) ) && 
//						(oedate.before(edate) || oedate.equals(edate) ))
//					) {
//				return true;
//			}
	
//			if( ((sdate.compareTo(osdate) * osdate.compareTo(edate))  > 0 || osdate.equals(edate)) 
//					|| ((sdate.compareTo(oedate) * oedate.compareTo(edate) > 0 || sdate.equals(oedate))) )
//				return true;
//			if( ((sdate.getTime()/1000)*1000) <= ((osdate.getTime()/1000)*1000) 
//					&& ((osdate.getTime()/1000)*1000) < ((edate.getTime()/1000)*1000) ) return true;
//			if( ((sdate.getTime()/1000)*1000) < ((oedate.getTime()/1000)*1000) 
//					&& ((oedate.getTime()/1000)*1000) <= ((edate.getTime()/1000)*1000) ) return true;
			
			
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public static void main(String[] args) {
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-hh");
		String start = "2020-08-10 08:00:00";
		String end= "2020-08-10 10:00:00 ";
		String other = "2020-08-10 11:00:00";
		String oend = "2020-08-10 12:00:00";
		System.out.println(timeCheck(start, end, other, oend));
		
	}

	public static String changeTimeFormat(String time) {
		time = time.replaceAll("-", "/");
		return time;
	}
}
