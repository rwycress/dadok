package com.chickengak.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.chickengak.dto.PublicBoard;
import com.chickengak.dto.User;
@Mapper
public interface UserMapper {
	User selectUser(User user) throws Exception;
	int insertUser(User user) throws Exception;
	int updateUser(User user) throws Exception;
	int deleteUser(User user) throws Exception;
	PublicBoard[] likeList(User user) throws Exception;
	User idCheck(String id) throws Exception;
	User emailCheck(String email) throws Exception;
	User noCheck(int no) throws Exception;
	User selectJoinDateByUserNo(int user_no);
	int updateUserProfile(User user);
}
