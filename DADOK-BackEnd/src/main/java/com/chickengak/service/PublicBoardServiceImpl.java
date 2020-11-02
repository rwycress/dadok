package com.chickengak.service;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chickengak.dto.FileInfo;
import com.chickengak.dto.Like;
import com.chickengak.dto.PublicBoard;
import com.chickengak.mapper.PublicBoardMapper;
@Service
public class PublicBoardServiceImpl implements PublicBoardService{
	
	@Autowired
	FileService fileservice;
	
	//퍼블릭보드는 좋아요에서 타입1
	
	@Autowired
	PublicBoardMapper mapper;
	
	@Override
	public PublicBoard[] getListByPage(int page, int interval) throws Exception {
		PublicBoard[] boards = mapper.selectByPage((page-1) * interval, interval);
		
		for(PublicBoard board : boards) {
//			PublicBoard temp = mapper.select(board.getNo());
//			System.out.println(temp);
			board.setFinfos(fileservice.getfileinfos(board.getNo()));
		}
		return boards;
//		return mapper.selectByPage((page-1) * interval, interval);
	}

	@Override
	public PublicBoard[] search(PublicBoard board) throws Exception {
		PublicBoard[] boards = mapper.search(board);
		for(PublicBoard boa : boards) {
//			PublicBoard temp = mapper.select(board.getNo());
//			System.out.println(temp);
			boa.setFinfos(fileservice.getfileinfos(boa.getNo()));
		}
		return boards;
	}

	@Override
	public PublicBoard detail(int no) throws Exception {
		PublicBoard result = mapper.select(no);
		if(result != null) mapper.viewUp(no);
		result.setFinfos(fileservice.getfileinfos(no));
		return result;
	}

	@Override
	public int insertBoard(PublicBoard board) throws Exception {
		//보드 먼저 넣고 번호 받아와서 파일 저장
//		mapper.insertpublicBoard(board);
//		Integer no = mapper.getAI();
////		no = no != null ? no : 1;
////		no += 1;
//		board.setNo(no);
//		System.out.println(board);
//		List<FileInfo> info = null;
//		if(board.getFiles() != null) {
//			
//			try {
//				info = fileservice.save(board);
//			} catch (Exception e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//				return 0;
//			}
////			Integer data_no = fileservice.getNo(info);
////			board.setData_no(data_no);
////			board.setData_url(info.getUrl());
//		}
//		return info.size();
		return mapper.insertpublicBoard(board);
	}

	@Override
	public int updatepublicBoard(PublicBoard board) throws Exception {
//		if(board.getFiles() != null) {
//			try {
//				List<FileInfo> info = fileservice.save(board);
//			} catch (Exception e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//				return 0;
//			}
////			Integer data_no = fileservice.getNo(info);
////			board.setData_no(data_no);
////			board.setData_url(info.getUrl());
//		}
		return mapper.updatepublicBoard(board);
	}

	@Override
	public int deletepublicBoard(int no) throws Exception {
		//종아요들 지우고 난 다음 지우기
		int likeDelete = mapper.deleteLike(0, no, 0, 1);
		//연관파일 다 지우기
		fileservice.delete(no);
		
		return mapper.deletepublicBoard(no);
	}

	@Override
	public Like[] selectLike(PublicBoard board) throws Exception {
		return mapper.selectLike(board.getNo(), board.getUser_no());
	}

	@Override
	public int insertLike(int user_no, int public_no) throws Exception {
//		PublicBoard board = new PublicBoard();
//		board.setUser_no(user_no);
//		board.setNo(public_no);
		Like[] likes = mapper.selectLike(public_no, user_no);
//		System.out.println(likes);
		if(likes.length == 0) 
			return mapper.insertLike(user_no, public_no);
//		System.out.println(likes[0]);
		return 0;
	}

	@Override
	public int deleteLike(Integer no, Integer public_no, Integer user_no, Integer type) throws Exception {
		if(no == null) no = 0;
		if(public_no == null ) public_no = 0;
		if(user_no == null) user_no = 0;
		if(type == null) type = 1;
		return mapper.deleteLike(no, public_no, user_no, type);
	}
	
	@Override
	public int getMaxNo() {
		return mapper.getAI();
	}
}
