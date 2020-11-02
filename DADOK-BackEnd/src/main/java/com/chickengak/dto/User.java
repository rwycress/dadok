package com.chickengak.dto;

import org.springframework.stereotype.Component;
@Component
public class User {
	/**
	 * 사용자 번호
	 */
	private Integer no;
	/**
	 * 사용자 이름
	 */
	private String 	name;
	/**
	 * 사용자 닉네임
	 */
	private String 	nickname;
	/**
	 * 사용자 아이디
	 */
	private String 	id;
	/**
	 * 사용자 비밀번호
	 */
	private String 	password;
	/**
	 * 사용자 연락처
	 */
	private String 	phone;
	/**
	 * 사용자 이메일
	 */
	private String 	email;
	/**
	 * 사용자 프로필사진 URL
	 */
	private String 	profile;
	/**
	 * 사용자 소개글
	 */
	private String 	info;
	/**
	 * 사용자 생년월일
	 */
	private String	birth;
	/**
	 * 서비스 가입일
	 */
	private String 	join_date;
	
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
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getProfile() {
		return profile;
	}
	public void setProfile(String profile) {
		this.profile = profile;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}

	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getJoin_date() {
		return join_date;
	}
	public void setJoin_date(String join_date) {
		this.join_date = join_date;
	}
	@Override
	public String toString() {
		return "User [no=" + no + ", name=" + name + ", nickname=" + nickname + ", id=" + id + ", password=" + password
				+ ", phone=" + phone + ", email=" + email + ", profile=" + profile + ", info=" + info + ", birth="
				+ birth + ", join_date=" + join_date + "]";
	}
	
}
