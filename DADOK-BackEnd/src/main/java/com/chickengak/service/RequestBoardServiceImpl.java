package com.chickengak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chickengak.dto.RequestBoard;
import com.chickengak.mapper.RequestBoardMapper;

@Service
public class RequestBoardServiceImpl implements RequestBoardService{
	
	@Autowired
	RequestBoardMapper mapper;

	@Override
	public RequestBoard[] getPage(Integer page, Integer interval) throws Exception {
		return mapper.selectByPage(page-1, interval);
	}
	
	@Override
	public RequestBoard[] search(RequestBoard board) throws Exception {
		return mapper.search(board);
	}

	@Override
	public RequestBoard detail(int no) throws Exception {
		RequestBoard result = mapper.select(no);
		if(result != null) mapper.viewUp(no);
		return result;
	}

	@Override
	public int insertBoard(RequestBoard board) throws Exception {
		return mapper.insertRequestBoard(board);
	}

	@Override
	public int updateBoard(RequestBoard board) throws Exception {
		return mapper.updateRequestBoard(board);
	}

	@Override
	public int deleteBoard(int no) throws Exception {
		int likeDelete = mapper.deleteLike(0, no, 0);
		return mapper.deleteRequestBoard(no);
	}

	@Override
	public int insertLike(int user_no, int board_no) throws Exception {
		return mapper.insertLike(user_no, board_no);
	}

	@Override
	public int deleteLike(int no, int board_no, int user_no) throws Exception {
		return mapper.deleteLike(no, board_no, user_no);
	}


}
