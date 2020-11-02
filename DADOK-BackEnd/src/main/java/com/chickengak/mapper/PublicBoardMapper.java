package com.chickengak.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.chickengak.dto.Like;
import com.chickengak.dto.PublicBoard;
@Mapper
public interface PublicBoardMapper {
	PublicBoard[] 	selectByPage		(int page, int interval) throws Exception;
	PublicBoard[] 	search				(PublicBoard board) throws Exception;
	PublicBoard 	select				(int no) throws Exception;
			  int 	insertpublicBoard	(PublicBoard board) throws Exception;
			  int 	updatepublicBoard	(PublicBoard board) throws Exception;
			  int 	deletepublicBoard	(int no) throws Exception;
			  int 	viewUp				(int no) throws Exception;
	
		   Like[] 	selectLike			(int board_no, int user_no) throws Exception;
			  int 	insertLike			(int user_no, int board_no) throws Exception;
			  int 	deleteLike			(int no, int board_no, int user_no, int type) throws Exception;
			Integer getAI();
	
}
