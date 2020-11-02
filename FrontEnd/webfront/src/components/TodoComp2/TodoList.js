import React, { Component } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import TodoHeader from "./TodoHeader";

import styled from "styled-components";
import { MdSubject, MdSchedule, MdDoneAll } from "react-icons/md";
import { Alert } from "antd";
import Slide from "react-reveal/Slide";

import axios from "axios";

const MyTodo = styled.div`
  width: 80%;
  height: 90%;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto;

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

const TodoInput = styled.div`
  align-items: center;
  padding: 30px;
  border-bottom: 1px solid #eee;
`;

const ButtonBox = styled.div`
  align-items: center;
  padding: 30px;
  text-align: center;
`;

const TodoBox = styled.div`
  align-items: center;
  padding: 30px;
  overflow-y: auto;

  justify-content: center;
  text-align: center;
`;

var date = new Date();

var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();

var year = new String(date.getFullYear());
var month = new String(date.getMonth() + 1);
month = month >= 10 ? month : "0" + month;
var day = new String(date.getDate());
day = day >= 10 ? day : "0" + day;

const today = year + month + day;

class TodoList extends Component {
  state = {
    today: today,
    todos: [{ no: "", content: "", complete: "", create_at: "" }],
    todo: {},
    loader: false,
    url: "http://i3d208.p.ssafy.io:9999/chickengak/todo",
    todoShow: "all",
  };

  getTodos = async () => {
    this.setState({ loader: true });
    const todos = await axios.get(
      `${this.state.url}?date=${
        this.state.today
      }&user_no=${window.sessionStorage.getItem("no")}`
    );
    this.setState({ todos: todos.data, loader: false });
  };

  createTodo = async (data) => {
    this.setState({ loader: true });
    await axios.post(
      `${this.state.url}?complete=${data.complete}&content=${
        data.content
      }&user_no=${window.sessionStorage.getItem("no")}`
    );
    this.getTodos();
  };

  deleteTodo = async (no) => {
    this.setState({ loader: true });
    await axios.delete(`${this.state.url}?no=${no}`);
    this.getTodos();
  };

  updateTodo = async (data) => {
    this.setState({ todo: {}, loader: true });
    await axios.put(
      `${this.state.url}?complete=${data.complete}&content=${data.content}&no=${
        data.no
      }&user_no=${window.sessionStorage.getItem("no")}`
    );
    this.getTodos();
  };

  componentDidMount() {
    this.getTodos();
  }

  onFormSubmit = (data) => {
    this.createTodo(data);
  };

  updateTodoShow = (string) => {
    this.setState({
      todoShow: string,
    });
  };

  onDelete = (no) => {
    this.deleteTodo(no);
  };

  onEdit = (data) => {
    data.complete = data.complete === 0 ? 1 : 0;
    this.setState({ todo: data });

    this.updateTodo(data);
  };

  render() {
    let todos = [];
    todos = this.state.todos;

    if (todos.length !== 0) {
      if (this.state.todoShow === "all") {
        todos = this.state.todos;

        if (todos.length !== 0) {
          return (
            <Slide bottom>
              <MyTodo>
                <TodoHeader />
                <TodoInput>
                  <TodoForm onFormSubmit={this.onFormSubmit} />
                </TodoInput>
                <ButtonBox>
                  <div style={{ marginBottom: "15px" }}>
                    <MdSubject
                      size={30}
                      onClick={() => this.updateTodoShow("all")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                    <MdSchedule
                      size={25}
                      onClick={() => this.updateTodoShow("active")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                    <MdDoneAll
                      size={25}
                      onClick={() => this.updateTodoShow("complete")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                  </div>
                  <div>
                    남은 할일 : &nbsp;&nbsp;
                    {
                      this.state.todos.filter((todo) => todo.complete === 0)
                        .length
                    }
                  </div>
                </ButtonBox>
                <TodoBox>
                  {todos.map((todo) => (
                    <Todo
                      key={todo.no}
                      onEdit={this.onEdit}
                      onDelete={this.onDelete}
                      todo={todo}
                    />
                  ))}
                </TodoBox>
              </MyTodo>
            </Slide>
          );
        } else {
          return (
            <Slide bottom>
              <MyTodo>
                <TodoHeader />
                <TodoInput>
                  <TodoForm onFormSubmit={this.onFormSubmit} />
                </TodoInput>
                <ButtonBox>
                  <div style={{ marginBottom: "15px" }}>
                    <MdSubject
                      size={30}
                      onClick={() => this.updateTodoShow("all")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                    <MdSchedule
                      size={25}
                      onClick={() => this.updateTodoShow("active")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                    <MdDoneAll
                      size={25}
                      onClick={() => this.updateTodoShow("complete")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                  </div>
                </ButtonBox>
                <TodoBox>
                  <Alert
                    message="투두리스트를 작성하세요 !"
                    type="warning"
                    style={{ fontSize: "0.8rem" }}
                  />
                </TodoBox>
              </MyTodo>
            </Slide>
          );
        }
      } else if (this.state.todoShow === "active") {
        todos = this.state.todos.filter((todo) => todo.complete === 0);

        if (todos.length !== 0) {
          return (
            <Slide bottom>
              <MyTodo>
                <TodoHeader />
                <TodoInput>
                  <TodoForm onFormSubmit={this.onFormSubmit} />
                </TodoInput>
                <ButtonBox>
                  <div style={{ marginBottom: "15px" }}>
                    <MdSubject
                      size={30}
                      onClick={() => this.updateTodoShow("all")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                      title="전체"
                    />
                    <MdSchedule
                      size={25}
                      onClick={() => this.updateTodoShow("active")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                      title="진행중"
                    />
                    <MdDoneAll
                      size={25}
                      onClick={() => this.updateTodoShow("complete")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                      title="진행완료"
                    />
                  </div>
                  <div>
                    남은 할일 : &nbsp;&nbsp;
                    {
                      this.state.todos.filter((todo) => todo.complete === 0)
                        .length
                    }
                  </div>
                </ButtonBox>

                <TodoBox>
                  {todos.map((todo) => (
                    <Todo
                      key={todo.no}
                      onEdit={this.onEdit}
                      onDelete={this.onDelete}
                      todo={todo}
                    />
                  ))}
                </TodoBox>
              </MyTodo>
            </Slide>
          );
        } else {
          return (
            <Slide bottom>
              <MyTodo>
                <TodoHeader />
                <TodoInput>
                  <TodoForm onFormSubmit={this.onFormSubmit} />
                </TodoInput>
                <ButtonBox>
                  <div style={{ marginBottom: "15px" }}>
                    <MdSubject
                      size={30}
                      onClick={() => this.updateTodoShow("all")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                    <MdSchedule
                      size={25}
                      onClick={() => this.updateTodoShow("active")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                    <MdDoneAll
                      size={25}
                      onClick={() => this.updateTodoShow("complete")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                  </div>
                </ButtonBox>
                <TodoBox>
                  <Alert
                    message="현재 진행중인 일이 없습니다 !"
                    type="warning"
                    style={{ fontSize: "0.8rem" }}
                  />
                </TodoBox>
              </MyTodo>
            </Slide>
          );
        }
      } else if (this.state.todoShow === "complete") {
        todos = this.state.todos.filter((todo) => todo.complete === 1);

        if (todos.length !== 0) {
          return (
            <Slide bottom>
              <MyTodo>
                <TodoHeader />
                <TodoInput>
                  <TodoForm onFormSubmit={this.onFormSubmit} />
                </TodoInput>
                <ButtonBox>
                  <div style={{ marginBottom: "15px" }}>
                    <MdSubject
                      size={30}
                      onClick={() => this.updateTodoShow("all")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                    <MdSchedule
                      size={25}
                      onClick={() => this.updateTodoShow("active")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                    <MdDoneAll
                      size={25}
                      onClick={() => this.updateTodoShow("complete")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                  </div>
                  <div>
                    남은 할일 : &nbsp;&nbsp;
                    {
                      this.state.todos.filter((todo) => todo.complete === 0)
                        .length
                    }
                  </div>
                </ButtonBox>

                <TodoBox>
                  {todos.map((todo) => (
                    <Todo
                      key={todo.no}
                      onEdit={this.onEdit}
                      onDelete={this.onDelete}
                      todo={todo}
                    />
                  ))}
                </TodoBox>
              </MyTodo>
            </Slide>
          );
        } else {
          return (
            <Slide bottom>
              <MyTodo>
                <TodoHeader />
                <TodoInput>
                  <TodoForm onFormSubmit={this.onFormSubmit} />
                </TodoInput>
                <ButtonBox>
                  <div style={{ marginBottom: "15px" }}>
                    <MdSubject
                      size={30}
                      onClick={() => this.updateTodoShow("all")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                    <MdSchedule
                      size={25}
                      onClick={() => this.updateTodoShow("active")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                    <MdDoneAll
                      size={25}
                      onClick={() => this.updateTodoShow("complete")}
                      style={{
                        fill: "#F96332",
                        cursor: "pointer",
                        margin: "0 15px 0 15px",
                      }}
                    />
                  </div>
                </ButtonBox>
                <TodoBox>
                  <Alert
                    message="현재 진행완료된 일이 없습니다 !"
                    type="warning"
                    style={{ fontSize: "0.8rem" }}
                  />
                </TodoBox>
              </MyTodo>
            </Slide>
          );
        }
      }
    } else {
      return (
        <Slide bottom>
          <MyTodo>
            <TodoHeader />
            <TodoInput>
              <TodoForm onFormSubmit={this.onFormSubmit} />
            </TodoInput>
            <ButtonBox>
              <div style={{ marginBottom: "15px" }}>
                <MdSubject
                  size={30}
                  onClick={() => this.updateTodoShow("all")}
                  style={{
                    fill: "#F96332",
                    cursor: "pointer",
                    margin: "0 15px 0 15px",
                  }}
                />
                <MdSchedule
                  size={25}
                  onClick={() => this.updateTodoShow("active")}
                  style={{
                    fill: "#F96332",
                    cursor: "pointer",
                    margin: "0 15px 0 15px",
                  }}
                />
                <MdDoneAll
                  size={25}
                  onClick={() => this.updateTodoShow("complete")}
                  style={{
                    fill: "#F96332",
                    cursor: "pointer",
                    margin: "0 15px 0 15px",
                  }}
                />
              </div>
            </ButtonBox>
            <TodoBox>
              <Alert
                message="투두리스트를 작성하세요 !"
                type="warning"
                style={{ fontSize: "0.8rem" }}
              />
            </TodoBox>
          </MyTodo>
        </Slide>
      );
    }
  }
}

export default TodoList;
