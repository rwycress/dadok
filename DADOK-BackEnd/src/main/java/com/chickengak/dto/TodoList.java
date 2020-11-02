package com.chickengak.dto;

public class TodoList {
	Integer no;
	Integer user_no;
	String content;
	String create_at;
	Integer complete;
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
	public Integer getComplete() {
		return complete;
	}
	public void setComplete(Integer complete) {
		this.complete = complete;
	}
	@Override
	public String toString() {
		return "TodoList [no=" + no + ", user_no=" + user_no + ", content=" + content + ", create_at=" + create_at
				+ ", complete=" + complete + "]";
	}
}
