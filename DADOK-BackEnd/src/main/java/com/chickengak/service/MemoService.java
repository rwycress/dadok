package com.chickengak.service;

import com.chickengak.dto.Memo;

public interface MemoService {
	Memo[] selectMemoByUserNo(int user_no) throws Exception;
	Integer insertMemo(Memo memo) throws Exception;
	Integer updateMemo(Memo memo) throws Exception;
	Integer deleteMemo(int no) throws Exception;
}
