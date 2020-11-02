package com.chickengak.dto;

public class Reservation {
	Integer no;
	Integer seat_no;
	String start;
	String end;
	Integer user_no;

	String user_nickname;
	
	@Override
	public String toString() {
		return "Reservation [no=" + no + ", seat_no=" + seat_no + ", start=" + start + ", end=" + end + ", user_no="
				+ user_no + "]";
	}
	public Integer getNo() {
		return no;
	}
	public void setNo(Integer no) {
		this.no = no;
	}
	public Integer getSeat_no() {
		return seat_no;
	}
	public void setSeat_no(Integer seat_no) {
		this.seat_no = seat_no;
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public String getEnd() {
		return end;
	}
	public void setEnd(String end) {
		this.end = end;
	}
	public Integer getUser_no() {
		return user_no;
	}
	public void setUser_no(Integer user_no) {
		this.user_no = user_no;
	}
	public String getUser_nickname() {
		return user_nickname;
	}
	public void setUser_nickname(String user_nickname) {
		this.user_nickname = user_nickname;
	}
	
}
