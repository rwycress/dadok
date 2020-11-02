package com.chickengak.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chickengak.dto.Memo;
import com.chickengak.service.MemoService;

@RestController
@CrossOrigin
@RequestMapping("memo")
public class MemoController {
	@Autowired
	MemoService service;
	@GetMapping
	public ResponseEntity getList(int user_no) {
		Memo[] result;
		try {
			result = service.selectMemoByUserNo(user_no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("리스트 불러오기 실패");
		}
		return result != null ? 
				ResponseEntity.ok(result) : 
					ResponseEntity.noContent().build();
	}
	@PostMapping
	public ResponseEntity insert(Memo memo) {
		int result;
		try {
			result = service.insertMemo(memo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("메모 삽입 실패");
		}
		return result != 0 ? 
				ResponseEntity.ok().build() : 
					ResponseEntity.badRequest().build();
	}
	@PutMapping
	public ResponseEntity update(Memo memo) {
		int result;
		try {
			result = service.updateMemo(memo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("메모 수정 실패");
		}
		return result != 0 ? 
				ResponseEntity.ok().build() : 
					ResponseEntity.badRequest().build();
	}
	@DeleteMapping
	public ResponseEntity delete(int no) {
		int result;
		try {
			result = service.deleteMemo(no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("메모 삭제 실패");
		}
		return result != 0 ? 
				ResponseEntity.ok().build() : 
					ResponseEntity.badRequest().build();
	}

}
