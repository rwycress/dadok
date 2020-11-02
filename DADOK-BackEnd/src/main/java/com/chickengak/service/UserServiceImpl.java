package com.chickengak.service;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chickengak.dto.PublicBoard;
import com.chickengak.dto.User;
import com.chickengak.mapper.PublicBoardMapper;
import com.chickengak.mapper.UserMapper;
import com.chickengak.util.AES256Util;
@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserMapper mapper;
	
	@Autowired
	FileService fileservice;
	
	@Autowired
	AES256Util util;
	
	@Override
	public User login(String id, String password) throws Exception {
		User user = new User();
		user.setId(id);
		String enc = null;
		try {
			enc = util.aesEncode(password);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidAlgorithmParameterException | IllegalBlockSizeException | BadPaddingException e) {
			e.printStackTrace();
			return null;
		}
		user.setPassword(enc);
		user = mapper.selectUser(user);
		user.setPhone(null);
		user.setBirth(null);
		return user;
	}
	
	@Override
	public User myPage(String id, String password) throws Exception {
		User user = new User();
		user.setId(id);
		String enc = null;
		try {
			enc = util.aesEncode(password);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidAlgorithmParameterException | IllegalBlockSizeException | BadPaddingException e) {
			e.printStackTrace();
			return null;
		}
		user.setPassword(enc);
		user = mapper.selectUser(user);
		
		
		return user;
	}

	@Override
	public String logout(User user) {
		return null;
	}

	@Override
	public int join(User user) throws Exception {
		//이메일, 이름, 아이디 형식 체크
		
		//비밀번호 길이 및 형식 체크
		
		//프로필 파일 형식 체크
		String enc = null;
		User temp = null;
		try {
			temp = mapper.emailCheck(user.getEmail());
			if(temp != null) return -1;
			temp = mapper.idCheck(user.getId());
			if(temp != null) return -2;
			if(user.getPassword().length() < 8) return -3;
			
			
			
			enc = util.aesEncode(user.getPassword());
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidAlgorithmParameterException | IllegalBlockSizeException | BadPaddingException e) {
			e.printStackTrace();
			return 0;
		} catch(Exception e){
			e.printStackTrace();
			
		}
		user.setPassword(enc);
		return mapper.insertUser(user);
	}

	@Override
	public int update(User user) throws Exception {
		return mapper.updateUser(user);
	}

	@Override
	public int delete(String id, String password) throws Exception {
		User user = new User();
		user.setId(id);
		String enc = null;
		try {
			enc = util.aesEncode(password);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidAlgorithmParameterException | IllegalBlockSizeException | BadPaddingException e) {
			e.printStackTrace();
			return 0;
		}
		user.setPassword(enc);
		user = mapper.selectUser(user);
		user.setPassword(enc);
//		if( user != null) {
			return mapper.deleteUser(user);
//		}
//		return 0;
//		return mapper.deleteUser(user);
	}

	@Override
	public PublicBoard[] likeList(User user) throws Exception {
		PublicBoard[] boards = mapper.likeList(user);
		
		for(PublicBoard board : boards) {
//			PublicBoard temp = mapper.select(board.getNo());
//			System.out.println(temp);
			board.setFinfos(fileservice.getfileinfos(board.getNo()));
		}
		
		return boards;
	}
	
	@Override
	public String noCheck(int no) throws Exception{
		User user = mapper.noCheck(no);
		if(user == null) return null;
		return user.getNickname();
	}

	@Override
	public User selectJoinDateByUserNo(int user_no) throws Exception {
		return mapper.noCheck(user_no);
	}

	@Override
	public int updateProfile(User user) throws Exception {
		return mapper.updateUserProfile(user);
	}
}
