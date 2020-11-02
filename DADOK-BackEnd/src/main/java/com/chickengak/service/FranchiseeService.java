package com.chickengak.service;

import com.chickengak.dto.Franchisee;

public interface FranchiseeService {
	public Franchisee[] getAll() throws Exception;
	public Franchisee[] search(Franchisee franchisee) throws Exception;
	public Integer insertFranchisee(Franchisee franchisee) throws Exception;
	public Integer updateFranchisee(Franchisee franchisee) throws Exception;
	public Integer deleteFranchisee(int no) throws Exception;
}
