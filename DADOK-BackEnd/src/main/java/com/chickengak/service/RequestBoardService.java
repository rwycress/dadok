package com.chickengak.service;

import com.chickengak.dto.RequestBoard;

public interface RequestBoardService {

	RequestBoard[] getPage(Integer page, Integer interval) throws Exception;

	RequestBoard[] search(RequestBoard board) throws Exception;
	RequestBoard detail(int no) throws Exception;

	int insertBoard(RequestBoard board) throws Exception;

	int updateBoard(RequestBoard board) throws Exception;

	int deleteBoard(int no) throws Exception;

	int insertLike(int user_no, int board_no) throws Exception;

	int deleteLike(int no, int board_no, int user_no) throws Exception;


}
