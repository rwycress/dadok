package com.chickengak.dto;

public class Memo {
	Integer no;
	Integer user_no;
	String title;
	String content;
	String create_at;
	String update_at;
	@Override
	public String toString() {
		return "Memo [no=" + no + ", user_no=" + user_no + ", title=" + title + ", content=" + content + ", create_at="
				+ create_at + ", update_at=" + update_at + "]";
	}
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getCreate_at() {
		return create_at;
	}
	public void setCreate_at(String create_at) {
		this.create_at = create_at;
	}
	public String getUpdate_at() {
		return update_at;
	}
	public void setUpdate_at(String update_at) {
		this.update_at = update_at;
	}
	
	
}
