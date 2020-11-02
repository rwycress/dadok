package com.chickengak.dto;

import java.util.Date;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
@Component
public class PublicBoard {
	/**
	 * 번호
	 */
	private Integer no;
	/**
	 * 다운로드 횟수
	 */
	private Integer	download;
	/**
	 * 조회수
	 */
	private Integer	view;
	/**
	 * 좋아요 숫자
	 */
	private Integer like;
	/**
	 * 작성자 번호
	 */
	private Integer	user_no;
	
	/**
	 * 작성자 닉네임
	 */
	private String 	user_nickname;
	
	/**
	 * 게시글 제목
	 */
	private String	title;
	/**
	 * 게시글 내용
	 */
	private String	content;
	/**
	 * 게시글 태그
	 */
	private String	tag;
	/**
	 * 게시글 출처
	 */
	private String	source;
	/**
	 * 게시글 생성일시
	 */
	private Date	create_at;
	/**
	 * 게시글 수정일시
	 */
	private Date	update_at;
	
	private MultipartFile[] files;
	
	private FileInfo[] finfos;
	
	private Integer data_no;
	
	public Integer getNo() {
		return no;
	}
	public void setNo(Integer no) {
		this.no = no;
	}
	public Integer getDownload() {
		return download;
	}
	public void setDownload(Integer download) {
		this.download = download;
	}
	public Integer getView() {
		return view;
	}
	public void setView(Integer view) {
		this.view = view;
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
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public Date getCreate_at() {
		return create_at;
	}
	public void setCreate_at(Date create_at) {
		this.create_at = create_at;
	}
	public Date getUpdate_at() {
		return update_at;
	}
	public void setUpdate_at(Date update_at) {
		this.update_at = update_at;
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
	@Override
	public String toString() {
		return "PublicBoard [no=" + no + ", download=" + download + ", view=" + view + ", like=" + like + ", user_no="
				+ user_no + ", user_nickname=" + user_nickname + ", title=" + title + ", content=" + content + ", tag="
				+ tag + ", source=" + source + ", create_at=" + create_at + ", update_at="
				+ update_at + "]" + finfos;
	}
	public MultipartFile[] getFiles() {
		return files;
	}
	public void setFiles(MultipartFile[] files) {
		this.files = files;
	}
	public Integer getData_no() {
		return data_no;
	}
	public void setData_no(Integer data_no) {
		this.data_no = data_no;
	}
	/**
	 * @return the finfos
	 */
	public FileInfo[] getFinfos() {
		return finfos;
	}
	/**
	 * @param finfos the finfos to set
	 */
	public void setFinfos(FileInfo[] finfos) {
		this.finfos = finfos;
	}
}
