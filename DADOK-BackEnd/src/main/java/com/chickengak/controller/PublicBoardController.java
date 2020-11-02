package com.chickengak.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chickengak.dto.Like;
import com.chickengak.dto.PublicBoard;
import com.chickengak.service.FileService;
import com.chickengak.service.PublicBoardService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping(value ="/public")
//@RequestMapping(value ="/public", produces = "application/json; charset=utf-8")
public class PublicBoardController {
	
	private static final Logger logger = LoggerFactory.getLogger(PublicBoard.class);
	
	private static final String SUCCESS = "success";
	private static final String FAIL= "fail";
	
	
	@Autowired
	PublicBoardService service;
	
	@Autowired
	FileService storageService;
	
	@ApiOperation(value="첫 페이지 반환", response = PublicBoard.class)
	@GetMapping
	public ResponseEntity<PublicBoard[]> get1page(){
		int page = 1;
		int interval = 20;
		PublicBoard[] boards;
		try {
			boards = service.getListByPage(page, interval);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("1페이지 받기 실패");
		}
		return boards != null ? 
				new ResponseEntity<PublicBoard[]>(boards, HttpStatus.OK) : 
					new ResponseEntity<PublicBoard[]>(boards, HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value = "요청한 페이지와 인터벌 만큼의 게시글 반환", response = PublicBoard.class)
	@GetMapping("page/{page}/{interval}")
	public ResponseEntity<PublicBoard[]> getPageList(@PathVariable Integer page, @PathVariable Integer interval ){
		System.out.println(page + " " + interval);
		if(page == null || page < 1) page = 1;
		if(interval == null) interval = 20;
		PublicBoard[] boards;
		try {
			boards = service.getListByPage(page, interval);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("페이지 단위 받기 실패");
		}
		return boards != null ? 
				new ResponseEntity<PublicBoard[]>(boards, HttpStatus.OK) : 
					new ResponseEntity<PublicBoard[]>(boards, HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value = "게시글의 상세정보 반환", response = PublicBoard.class)
	@GetMapping("{no}")
	public ResponseEntity<PublicBoard> getDetail(@PathVariable int no){
		PublicBoard board;
		try {
			board = service.detail(no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("게시글 상세 정보 받기 실패");
		}
		return board != null ? 
				new ResponseEntity<PublicBoard>(board, HttpStatus.OK) : 
					new ResponseEntity<PublicBoard>(board, HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value = "게시글 생성, 생성한 게시글 번호 리턴해줌. 받은 번호로 파일 업로드 요청하기." )
	@PostMapping(consumes =  MediaType.APPLICATION_JSON_UTF8_VALUE, 
				produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	
	public ResponseEntity<String> write(@RequestBody PublicBoard board){
		System.out.println(board);
		int result;
		try {
			result = service.insertBoard(board);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("게시글 생성 실패");
		}
		if(result == 0)
			return new ResponseEntity<String>("게시글 생성 실패", HttpStatus.BAD_REQUEST);
		else {
			int ai;
			try {
				ai = service.getMaxNo();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw new RuntimeException("추가한 게시글 번호 받기 실패");
			}
			return new ResponseEntity<String>(Integer.toString(ai), HttpStatus.OK);
		}
	}
	
	@ApiOperation(value = "게시글 수정, 파일 업로드하려면 성공 메시지 받고 업로드요청 또하기.", response = PublicBoard.class)
	@PutMapping
	public ResponseEntity<String> modify(@RequestBody PublicBoard board){
		int result;
		try {
			result = service.updatepublicBoard(board);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("게시글 수정 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>(SUCCESS, HttpStatus.OK) :
					new ResponseEntity<String>(Integer.toString(board.getNo()), HttpStatus.BAD_REQUEST);
	}
	
	@ApiOperation(value = "게시글 삭제", response = PublicBoard.class)
	@DeleteMapping
	public ResponseEntity<String> delete(int no){
		int result;
		try {
			result = service.deletepublicBoard(no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("게시글 삭제 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>(SUCCESS, HttpStatus.OK) :
					new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("like/search")
	public ResponseEntity likeSearch(int user_no, int board_no) {
		PublicBoard board = new PublicBoard();
		board.setUser_no(user_no);
		board.setNo(board_no);
		try {
			Like[] likes = service.selectLike(board);
			return likes.length != 0 ? 
					ResponseEntity.ok(likes) : 
				ResponseEntity.noContent().build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.noContent().build();
	}
	
	
	
	@ApiOperation(value = "게시글 좋아요 ", response = PublicBoard.class)
	@GetMapping("like")
	public ResponseEntity<String> like(int user_no, int public_no){
		int result;
		try {
			result = service.insertLike(user_no, public_no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("좋아요 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>(SUCCESS, HttpStatus.OK) :
					new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	@ApiOperation(value = "게시글 좋아요 해제", response = PublicBoard.class)
	@GetMapping("unlike")
	public ResponseEntity<String> unLike(Integer public_no, Integer user_no, Integer no){
		int type = 1;
		int result;
		try {
			result = service.deleteLike(no, public_no, user_no, type);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("좋아요 취소 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>(SUCCESS, HttpStatus.OK) :
					new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
	@ApiOperation(value = "게시글 검색, 검색에 필요한 타입의 데이터만 들어간 퍼블릭보드 클래스 보내면 됨", response = PublicBoard.class)
	@GetMapping("search")
	public ResponseEntity<PublicBoard[]> search(PublicBoard board){
		PublicBoard[] boards;
		try {
			boards = service.search(board);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("검색 실패");
		}
		return boards != null ? 
				new ResponseEntity<PublicBoard[]>(boards, HttpStatus.OK) : 
					new ResponseEntity<PublicBoard[]>(boards, HttpStatus.NO_CONTENT);
	}
	
//	@GetMapping("/files/{filename:.+}")
//	  @ResponseBody
//	  public ResponseEntity<Resource> getFile(@PathVariable String filename) {
//	    Resource file = storageService.load(filename);
//	    return ResponseEntity.ok()
//	        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
//	  }
//	
//	@GetMapping("/files")
//	  public ResponseEntity<List<FileInfo>> getListFiles() {
//	    List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
//	      String filename = path.getFileName().toString();
//	      System.out.println("controller filename " + filename);
//	      String url = MvcUriComponentsBuilder
//	          .fromMethodName(PublicBoardController.class, "getFile", path.getFileName().toString()).build().toString();
//	      FileInfo info = new FileInfo();
//	      info.setOriginalname(filename);
//	      info.setUrl(url);
//	      return info;
////	      return new FileInfo(filename, url);
//	    }).collect(Collectors.toList());
//
//	    return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
//	  }
	
}
