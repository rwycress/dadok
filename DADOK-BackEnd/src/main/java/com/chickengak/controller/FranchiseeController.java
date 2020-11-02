package com.chickengak.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chickengak.dto.Franchisee;
import com.chickengak.service.FranchiseeService;

@RestController
@CrossOrigin
@RequestMapping("fran")
public class FranchiseeController {
	
	@Autowired
	FranchiseeService service;
	
	//가입
	@PostMapping
	public ResponseEntity<String> joinFranchisee(Franchisee franchisee){
		int result = 0;
		try {
			result = service.insertFranchisee(franchisee);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("가맹점 가입 실패");
		}	
		return result != 0 ? 
				new ResponseEntity<String>("success", HttpStatus.OK) : 
					new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
	}
	
	//수정
	@PutMapping
	public ResponseEntity<String> modifyFranchisee(Franchisee franchisee){
		int result=0;
		try {
			result = service.updateFranchisee(franchisee);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("수정 실패");
		}	
		return result != 0 ? 
				new ResponseEntity<String>("success", HttpStatus.OK) : 
					new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
	}
	//삭제
	@DeleteMapping
	public ResponseEntity<String> deleteFranchisee(int no) {
		int result =0;
		try {
			result = service.deleteFranchisee(no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("삭제 실패");
		}	
		return result != 0 ? 
				new ResponseEntity<String>("success", HttpStatus.OK) : 
					new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
	}
	//검색
	@GetMapping("search")
	public ResponseEntity<Franchisee[]> searchFranchisee(Franchisee franchisee){
		Franchisee[] franchisees=null;
		try {
			franchisees = service.search(franchisee);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("검색 실패");
		}
		return franchisees != null ? 
				new ResponseEntity<Franchisee[]>(franchisees, HttpStatus.OK) : 
					new ResponseEntity<Franchisee[]>(franchisees, HttpStatus.NO_CONTENT);
	}
	//모든 가맹점 정보
	@GetMapping
	public ResponseEntity<Franchisee[]> getAll(){
		Franchisee[] franchisees;
		try {
			franchisees = service.getAll();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("검색 실패");
		}
		return franchisees != null ? 
				new ResponseEntity<Franchisee[]>(franchisees, HttpStatus.OK) : 
					new ResponseEntity<Franchisee[]>(franchisees, HttpStatus.NO_CONTENT);
	}
}
