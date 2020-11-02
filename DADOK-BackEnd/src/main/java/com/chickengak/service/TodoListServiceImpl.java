package com.chickengak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chickengak.dto.TodoList;
import com.chickengak.mapper.TodoListMapper;
@Service
public class TodoListServiceImpl implements TodoListService{

	@Autowired
	TodoListMapper mapper;
	
	@Override
	public Integer totalCount() throws Exception {
		return mapper.totalCount();
	}

	@Override
	public TodoList[] selectByDay(String date, int user_no) throws Exception {
		return mapper.selectByDay(date, user_no);
	}

	@Override
	public Integer insertTodo(TodoList todo) throws Exception {
		return mapper.insertTodo(todo);
	}

	@Override
	public Integer updateTodo(TodoList todo) throws Exception {
		return mapper.updateTodo(todo);
	}

	@Override
	public Integer deleteTodo(int no) throws Exception {
		return mapper.deleteTodo(no);
	}

}
