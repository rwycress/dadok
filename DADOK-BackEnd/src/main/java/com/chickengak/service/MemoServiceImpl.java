package com.chickengak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chickengak.dto.Memo;
import com.chickengak.mapper.MemoMapper;
@Service
public class MemoServiceImpl implements MemoService{

	@Autowired
	MemoMapper mapper;
	
	@Override
	public Memo[] selectMemoByUserNo(int user_no) throws Exception {
		return mapper.selectMemoByUserNo(user_no);
	}

	@Override
	public Integer insertMemo(Memo memo) throws Exception {
		return mapper.insertMemo(memo);
	}

	@Override
	public Integer updateMemo(Memo memo) throws Exception {
		return mapper.updateMemo(memo);
	}

	@Override
	public Integer deleteMemo(int no) throws Exception {
		return mapper.deleteMemo(no);
	}
	
}
