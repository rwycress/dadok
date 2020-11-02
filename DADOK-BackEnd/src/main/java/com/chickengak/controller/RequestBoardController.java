package com.chickengak.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chickengak.dto.PublicBoard;
import com.chickengak.dto.RequestBoard;
import com.chickengak.service.RequestBoardService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping(value = "/request", produces = "application/json; charset=utf-8")
public class RequestBoardController {
	private static final Logger logger = LoggerFactory.getLogger(RequestBoard.class);
	private static final String SUCCESS = "success";
	private static final String FAIL= "fail";
	@Autowired
	RequestBoardService service;
	
	@GetMapping
	public ResponseEntity<RequestBoard[]> getFirstPage(){
		RequestBoard[] boards;
		try {
			boards = service.getPage(1, 20);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("첫페이지 받기 실패");
		}
		return boards != null ? 
				new ResponseEntity<RequestBoard[]>(boards, HttpStatus.OK) : 
					new ResponseEntity<RequestBoard[]>(boards, HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value = "요청한 페이지와 인터벌 만큼의 게시글 반환", response = RequestBoard.class)
	@GetMapping("page/{page}/{interval}")
	public ResponseEntity<RequestBoard[]> getPage(@PathVariable Integer page, @PathVariable Integer interval){
		if(page ==null) page = 1;
		if(interval == null) interval = 20;
		
		RequestBoard[] boards;
		try {
			boards = service.getPage(page, interval);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("페이지 단위 받기 실패");
		}
		return boards != null ? 
				new ResponseEntity<RequestBoard[]>(boards, HttpStatus.OK) : 
					new ResponseEntity<RequestBoard[]>(boards, HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value = "게시글 검색", response = RequestBoard.class)
	@GetMapping("search")
	public ResponseEntity<RequestBoard[]> search(RequestBoard board){
		RequestBoard[] boards;
		try {
			boards = service.search(board);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("검색 실패");
		}
		return boards != null ? 
				new ResponseEntity<RequestBoard[]>(boards, HttpStatus.OK) : 
					new ResponseEntity<RequestBoard[]>(boards, HttpStatus.NO_CONTENT);
	}
	
	
	@ApiOperation(value = "게시글의 상세정보 반환", response = RequestBoard.class)
	@GetMapping("{no}")
	public ResponseEntity<RequestBoard> getDetail(@PathVariable int no){
		RequestBoard board;
		try {
			board = service.detail(no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("상세 정보 받기 실패");
		}
		return board != null ? 
				new ResponseEntity<RequestBoard>(board, HttpStatus.OK) : 
					new ResponseEntity<RequestBoard>(board, HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value = "게시글 생성", response = RequestBoard.class)
	@PostMapping
	public ResponseEntity<String> write(RequestBoard board){
		int result;
		try {
			result = service.insertBoard(board);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("게시글 작성 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>(SUCCESS, HttpStatus.OK) :
					new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
	@ApiOperation(value = "게시글 수정   +  자료요청 완료상태 변경", response = RequestBoard.class)
	@PutMapping
	public ResponseEntity<String> modify(RequestBoard board){
		int result;
		try {
			result = service.updateBoard(board);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("게시글 수정 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>(SUCCESS, HttpStatus.OK) :
					new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
	@ApiOperation(value = "게시글 삭제", response = RequestBoard.class)
	@DeleteMapping
	public ResponseEntity<String> delete (int no){
		int result;
		try {
			result = service.deleteBoard(no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("게시글 삭제 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>(SUCCESS, HttpStatus.OK) :
					new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
	
	@ApiOperation(value = "게시글 좋아요 클릭시", response = RequestBoard.class)
	@PostMapping("like")
	public ResponseEntity<String> like(int user_no, int board_no){
		int result;
		try {
			result = service.insertLike(user_no, board_no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("좋아요 추가 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>(SUCCESS, HttpStatus.OK) :
					new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
	@ApiOperation(value = "게시글 좋아요 해제시", response = RequestBoard.class)
	@PostMapping("unlike")
	public ResponseEntity<String> unlike(Integer no, int user_no, int board_no){
		if(no == null) no = 0;
		int result;
		try {
			result = service.deleteLike(no, board_no, user_no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("좋아요 취소 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>(SUCCESS, HttpStatus.OK) :
					new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
}
