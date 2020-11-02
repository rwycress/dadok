package com.chickengak.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.chickengak.dto.FileInfo;
@Mapper
public interface FileMapper {
	FileInfo select(FileInfo info) throws Exception;
	int insertFileInfo(FileInfo info) throws Exception;
	int deleteFileInfoByBoardNo(int board_no) throws Exception;
	FileInfo[] selectByBoardNo(int board_no) throws Exception;
	int deleteFileInfoByUserNo(int user_no)throws Exception;
}
