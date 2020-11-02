package com.chickengak.dto;

import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class Sensor {
	/**
	 * 센서데이터 번호
	 */
	private Integer no;
	/**
	 * 센서데이터 소리값
	 */
	private Integer val;
	/**
	 * 센서데이터 유저번호
	 */
	private Integer user_no;
	/**
	 * 센서데이터 저장 URL
	 */
	private String 	url;
	/**
	 * 센서데이터 생성일시
	 */
	private Date	create_at;
	public Integer getNo() {
		return no;
	}
	public void setNo(Integer no) {
		this.no = no;
	}
	public Integer getVal() {
		return val;
	}
	public void setVal(Integer val) {
		this.val = val;
	}
	public Integer getUser_no() {
		return user_no;
	}
	public void setUser_no(Integer user_no) {
		this.user_no = user_no;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Date getCreate_at() {
		return create_at;
	}
	public void setCreate_at(Date create_at) {
		this.create_at = create_at;
	}
	@Override
	public String toString() {
		return "Sensor [no=" + no + ", val=" + val + ", user_no=" + user_no + ", url=" + url + ", create_at="
				+ create_at + "]";
	}
	
	
}
