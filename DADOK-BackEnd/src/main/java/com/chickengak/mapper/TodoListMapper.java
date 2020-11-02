package com.chickengak.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.chickengak.dto.TodoList;
@Mapper
public interface TodoListMapper {
	Integer totalCount() throws Exception;
	TodoList[] selectByDay(String date, int user_no) throws Exception;
	Integer insertTodo(TodoList todo) throws Exception;
	Integer updateTodo(TodoList todo) throws Exception;
	Integer deleteTodo(int no) throws Exception;
}
