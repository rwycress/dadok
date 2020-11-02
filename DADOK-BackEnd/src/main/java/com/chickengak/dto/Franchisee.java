package com.chickengak.dto;

public class Franchisee {
	Integer no;
	String name;
	String phone;
	String info;
	public Integer getNo() {
		return no;
	}
	public void setNo(Integer no) {
		this.no = no;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	@Override
	public String toString() {
		return "Franchisee [no=" + no + ", name=" + name + ", phone=" + phone + ", info=" + info + "]";
	}
	
}
