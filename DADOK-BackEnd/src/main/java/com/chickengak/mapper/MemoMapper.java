package com.chickengak.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.chickengak.dto.Memo;
@Mapper
public interface MemoMapper {
	Memo[] selectMemoByUserNo(int user_no) throws Exception;
	Integer insertMemo(Memo memo) throws Exception;
	Integer updateMemo(Memo memo) throws Exception;
	Integer deleteMemo(int no) throws Exception;
}
