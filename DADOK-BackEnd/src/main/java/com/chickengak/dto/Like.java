package com.chickengak.dto;

public class Like {
	Integer no;
	Integer user_no;
	Integer public_no;
	public Integer getNo() {
		return no;
	}
	public void setNo(Integer no) {
		this.no = no;
	}
	public Integer getUser_no() {
		return user_no;
	}
	public void setUser_no(Integer user_no) {
		this.user_no = user_no;
	}
	public Integer getPublic_no() {
		return public_no;
	}
	public void setPublic_no(Integer public_no) {
		this.public_no = public_no;
	}
	@Override
	public String toString() {
		return "Like [no=" + no + ", user_no=" + user_no + ", public_no=" + public_no + "]";
	}
}
