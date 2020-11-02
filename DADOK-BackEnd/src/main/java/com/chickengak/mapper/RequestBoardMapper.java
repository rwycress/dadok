package com.chickengak.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.chickengak.dto.Like;
import com.chickengak.dto.RequestBoard;
@Mapper
public interface RequestBoardMapper {
	RequestBoard[] 	selectByPage		(int page, int interval) throws Exception;
	RequestBoard[] 	search				(RequestBoard board) throws Exception;
	RequestBoard 	select				(int no) throws Exception;
			  int 	insertRequestBoard	(RequestBoard board) throws Exception;
			  int 	updateRequestBoard	(RequestBoard board) throws Exception;
			  int 	deleteRequestBoard	(int no) throws Exception;
			  int 	viewUp				(int no) throws Exception;
	
		   Like[] 	selectLike			(RequestBoard board) throws Exception;
			  int 	insertLike			(int user_no, int board_no) throws Exception;
			  int 	deleteLike			(int no, int board_no, int user_no) throws Exception;
}
