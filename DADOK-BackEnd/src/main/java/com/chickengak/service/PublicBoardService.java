package com.chickengak.service;

import com.chickengak.dto.Like;
import com.chickengak.dto.PublicBoard;

public interface PublicBoardService{
	PublicBoard[] 	getListByPage		(int page, int interval) throws Exception;
	PublicBoard[] 	search				(PublicBoard board) throws Exception;
	PublicBoard 	detail				(int no) throws Exception;
	
			int 	insertBoard			(PublicBoard board) throws Exception;
			int 	updatepublicBoard	(PublicBoard board) throws Exception;
			int 	deletepublicBoard	(int no) throws Exception;
			
		   Like[] 	selectLike			(PublicBoard board) throws Exception;
		    int 	insertLike			(int user_no, int public_no) throws Exception;
		    int 	deleteLike			(Integer no, Integer public_no, Integer user_no, Integer type) throws Exception;
			int 	getMaxNo() throws Exception;	
		    
}
