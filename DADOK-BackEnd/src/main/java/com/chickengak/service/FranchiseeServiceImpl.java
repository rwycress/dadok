package com.chickengak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chickengak.dto.Franchisee;
import com.chickengak.mapper.FranchiseeMapper;
@Service
public class FranchiseeServiceImpl implements FranchiseeService {

	@Autowired
	FranchiseeMapper mapper;
	
	@Override
	public Franchisee[] getAll() throws Exception {
		return mapper.searchAll();
	}

	@Override
	public Franchisee[] search(Franchisee franchisee) throws Exception {
		return mapper.search(franchisee);
	}

	@Override
	public Integer insertFranchisee(Franchisee franchisee) throws Exception {
		return mapper.insertFranchisee(franchisee);
	}

	@Override
	public Integer updateFranchisee(Franchisee franchisee) throws Exception {
		return mapper.updateFranchisee(franchisee);
	}

	@Override
	public Integer deleteFranchisee(int no) throws Exception {
		return mapper.deleteFranchisee(no);
	}

}
