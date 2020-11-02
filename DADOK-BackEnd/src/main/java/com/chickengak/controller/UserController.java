package com.chickengak.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chickengak.dto.PublicBoard;
import com.chickengak.dto.User;
import com.chickengak.service.UserService;
import com.chickengak.util.AES256Util;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping(value= "/user", produces = "application/json; charset=utf-8")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(User.class);
	private static int user_no = 0;
	@Autowired
	UserService service;
	
	@Autowired
	AES256Util util;
	
	@ApiOperation(value = "로그인", response = User.class)
	@PostMapping("login")
	public ResponseEntity<User> login(String id, String password){
		User user;
		try {
			user = service.login(id, password);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("로그인 실패");
		}
		
		return user != null ? 
				new ResponseEntity<User>(user, HttpStatus.OK) :
					new ResponseEntity<User>(user, HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value = "로그아웃", response = String.class)
	@GetMapping("logout")
	public ResponseEntity<String> logout(User user){
		UserController.user_no = 0;
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@ApiOperation(value = "회원가입", response = String.class)
	@PostMapping
	public ResponseEntity<String> join(User user){
		int result;
		try {
			result = service.join(user);
			if(result == -1) {
//				throw new RuntimeException("이메일 중복");
				return new ResponseEntity<String>("이메일 중복", HttpStatus.BAD_REQUEST);
			}
			if(result == -2) {
//				throw new RuntimeException("아이디 중복");
				return new ResponseEntity<String>("아이디 중복", HttpStatus.BAD_REQUEST);
			}
			if(result == -3) {
//				throw new RuntimeException("비밀번호 길이 부족");
				return new ResponseEntity<String>("비밀번호 길이 부족", HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("가입 실패");
		}
		return result > 0 ? 
				new ResponseEntity<String>("success", HttpStatus.OK) :
					new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
	}
	
	
	@ApiOperation(value = "회원정보 수정", response = User.class)
	@PutMapping
	public ResponseEntity<String> update(User user){
		//이메일, 이름, 아이디 형식 체크
		
				//비밀번호 길이 및 형식 체크
				
				//프로필 파일 형식 체크
		try {
			return service.update(user) != 0 ? 
					new ResponseEntity<String>("success", HttpStatus.OK) :
						new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("수정 실패");
		}
	}
	
	
	@ApiOperation(value = "회원 탈퇴", response = String.class)
	@DeleteMapping
	public ResponseEntity<String> delete(String id, String password){
		int result;
		try {
			result = service.delete(id, password);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("회원 삭제 실패");
		}
		return result == 0 ? new ResponseEntity<String>("실패", HttpStatus.NO_CONTENT) : 
			new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@ApiOperation(value = "좋아요한 퍼블릭보드 받기", response = PublicBoard.class)
	@GetMapping("likes")
	public ResponseEntity<PublicBoard[]> getLikeBoard(int no){
		User user = new User();
		user.setNo(no);
		PublicBoard[] boards;
		try {
			boards = service.likeList(user);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("종하요한 게시물 불러오기 실패");
		}
		return boards != null ? 
				new ResponseEntity<PublicBoard[]>(boards, HttpStatus.OK) : 
					new ResponseEntity<PublicBoard[]>(boards, HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value = "마이페이지 회원정보 받기", response = PublicBoard.class)
	@PostMapping("my")
	public ResponseEntity<User> mypage(String id, String password){
		User user;
		try {
			user = service.myPage(id, password);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("회원정보 받기 실패");
		}
		return user != null ? 
				new ResponseEntity<User>(user, HttpStatus.OK) :
					new ResponseEntity<User>(user, HttpStatus.BAD_REQUEST);
	}
	
//	@ApiOperation(value="토큰발급 미구현", response = String.class)
//	@PostMapping("jwt")
//	public ResponseEntity<String> jwt(String id, String password){
//		
//		return null;
//	}
	
	@ApiOperation(value="키오스크에서 로그인한 유저번호 반환, 0번은 미로그인", response = String.class)
	@GetMapping("kiosk")
	public ResponseEntity kioskGetNo() {
		int no = UserController.user_no;
//		UserController.user_no = 0;
		User user = new User();
		user.setNo(no);
		try {
			user.setNickname(service.noCheck(no));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return no == 0 ? ResponseEntity.noContent().build() : 
			ResponseEntity.ok(user);
	}
	@ApiOperation(value="키오스크에서 로그인한 유저번호 세팅, 세팅된 유저 닉네임 반환", response = String.class)
	@PostMapping("kiosk")
	public ResponseEntity kioskSetNo(@RequestBody int no) {
		String nickname = null;
		try {
			nickname = service.noCheck(no); 
			if(nickname != null) {
				UserController.user_no = no;
				return ResponseEntity.ok(nickname);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ResponseEntity.badRequest().build();
	}
	
}
