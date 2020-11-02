package com.chickengak.service;

import com.chickengak.dto.PublicBoard;
import com.chickengak.dto.User;

public interface UserService {
	/**
	 * 로그인
	 * @return 유저정보
	 */
	public User login(String id, String password) throws Exception;
	/**
	 * 로그아웃
	 * @return 결과 문자열
	 */
	public String logout(User user) throws Exception;
	/**
	 * 회원가입
	 * @return 성공여부
	 */
	public int join(User user) throws Exception;
	/**
	 * 회원정보 수정
	 * @return	성공여부
	 */
	public int update(User user) throws Exception;
	/**
	 * 회원 탈퇴
	 * @return 성공여부
	 */
	public int delete(String id, String password) throws Exception;
	
	/**
	 * 유저가 좋아요 선택한 퍼블릭보드 글을 반환한다.
	 * @return	보드 리스트
	 */
	public PublicBoard[] likeList(User user) throws Exception;
	User myPage(String id, String password) throws Exception;
	String noCheck(int no) throws Exception;
	public User selectJoinDateByUserNo(int user_no) throws Exception;
	int updateProfile(User user) throws Exception;
}
