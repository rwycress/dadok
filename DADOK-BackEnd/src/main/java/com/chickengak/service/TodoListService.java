package com.chickengak.service;

import com.chickengak.dto.TodoList;

public interface TodoListService {
	Integer totalCount() throws Exception;
	TodoList[] selectByDay(String date, int user_no) throws Exception;
	Integer insertTodo(TodoList todo) throws Exception;
	Integer updateTodo(TodoList todo) throws Exception;
	Integer deleteTodo(int no) throws Exception;
}
