package com.chickengak.dto;

import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class RequestBoard {
	/**
	 * 자료요청 게시글 번호
	 */
	private Integer no;
	/**
	 * 작성자 번호
	 */
	private Integer	user_no;
	/**
	 * 작성자 별명
	 */
	private String 	user_nickname;
	/**
	 * 게시글의 좋아요 수
	 */
	private Integer	like;
	/**
	 * 게시글의 요청이 완료되었는지 여부
	 * 0 - 미완료
	 * 1 - 완료
	 * 2 - 찾을 수 없음
	 */
	private Integer	complete;
	/**
	 * 조회수
	 */
	private Integer	view;
	/**
	 * 제목
	 */
	private String 	title;
	/**
	 * 내용
	 */
	private String	content;
	
	/**
	 *	생성일시
	 */
	private Date 	create_at;
	/**
	 * 작성자 프로필 사진
	 */
	private String profile;
	
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
	public String getUser_nickname() {
		return user_nickname;
	}
	public void setUser_nickname(String user_nickname) {
		this.user_nickname = user_nickname;
	}
	public Integer getLike() {
		return like;
	}
	public void setLike(Integer like) {
		this.like = like;
	}
	public Integer getComplete() {
		return complete;
	}
	public void setComplete(Integer complete) {
		this.complete = complete;
	}
	public Integer getView() {
		return view;
	}
	public void setView(Integer view) {
		this.view = view;
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
	public Date getCreate_at() {
		return create_at;
	}
	public void setCreate_at(Date create_at) {
		this.create_at = create_at;
	}
	@Override
	public String toString() {
		return "RequestBoard [no=" + no + ", user_no=" + user_no + ", user_nickname=" + user_nickname + ", like=" + like
				+ ", complete=" + complete + ", view=" + view + ", title=" + title + ", content=" + content
				+ ", create_at=" + create_at + "]";
	}
	public String getProfile() {
		return profile;
	}
	public void setProfile(String profile) {
		this.profile = profile;
	}
}
