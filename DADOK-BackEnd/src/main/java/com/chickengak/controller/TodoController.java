package com.chickengak.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chickengak.dto.TodoList;
import com.chickengak.service.TodoListService;

import io.jsonwebtoken.lang.Collections;
@RestController
@CrossOrigin
@RequestMapping("todo")
public class TodoController {
	@Autowired
	TodoListService service;
	@GetMapping
	public ResponseEntity getList(int user_no, String date) {
		List<TodoList> result = new ArrayList<TodoList>();
		try {
			result.addAll(Collections.arrayToList(service.selectByDay(date, user_no)));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("투두 받기 실패");
		}
		return result.size() != 0 ? 
				ResponseEntity.ok(result) : 
					ResponseEntity.noContent().build();
	}
	@PostMapping
	public ResponseEntity insert(TodoList todo) {
		int result;
		try {
			result = service.insertTodo(todo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("투두 삽입 실패");
		}
		return result != 0 ? 
				ResponseEntity.ok().build() : 
					ResponseEntity.badRequest().build();
	}
	@PutMapping
	public ResponseEntity update(TodoList todo) {
		int result;
		try {
			result = service.updateTodo(todo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("투두 수정 실패");
		}
		return result != 0 ? 
				ResponseEntity.ok().build() : 
					ResponseEntity.badRequest().build();
	}
	@DeleteMapping
	public ResponseEntity delete(int no) {
		int result;
		try {
			result = service.deleteTodo(no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("투두 삭제 실패");
		}
		return result != 0 ? 
				ResponseEntity.ok().build() : 
					ResponseEntity.badRequest().build();
	}
	
}
