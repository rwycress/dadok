package com.chickengak.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.chickengak.dto.Franchisee;
@Mapper
public interface FranchiseeMapper {
	Franchisee[] searchAll    () throws Exception;
	Franchisee[] search       (Franchisee franchisee) throws Exception;
	Integer insertFranchisee  (Franchisee franchisee) throws Exception;
	Integer updateFranchisee  (Franchisee franchisee) throws Exception;
	Integer deleteFranchisee  (int no) throws Exception;
}   
