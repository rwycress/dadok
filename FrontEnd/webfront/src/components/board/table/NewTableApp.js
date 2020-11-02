import React, { Component } from "react";

import { Table } from "antd";
import {
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";

import { Tabs, Tab, Card } from "react-bootstrap";

import { Form, Button } from "react-bootstrap";
import { NavItem, NavLink, Nav } from "reactstrap";

import axios from "axios";

import { Input } from "antd";

import "./NewTableApp.css";

const { Column } = Table;
const { Search } = Input;

const itemsPerPage = 1000;
const currentPage = 1;

axios({
  method: "get",
  url: `http://i3d208.p.ssafy.io:9999/chickengak/request/page/${currentPage}/${itemsPerPage}`,
})
  .then(function (res) {
    const requestItems = res.data;

    window.sessionStorage.setItem("requestItems", JSON.stringify(requestItems));
  })
  .catch(function (res) {});

function onSearch(value) {
  window.sessionStorage.setItem("onSearch", value);
  if (window.sessionStorage.getItem("onSearch")) {
    axios({
      method: "get",
      url: `http://i3d208.p.ssafy.io:9999/chickengak/request/search?title=${window.sessionStorage.getItem(
        "onSearch"
      )}`,
    })
      .then(function (res) {
        const requestItems = res.data;
        window.sessionStorage.setItem(
          "requestItems",
          JSON.stringify(requestItems)
        );
        window.sessionStorage.removeItem("onSearch");
        window.location.reload(true);
      })
      .catch(function (res) {});
  } else {
    axios({
      method: "get",
      url: `http://i3d208.p.ssafy.io:9999/chickengak/request/page/${currentPage}/${itemsPerPage}`,
    })
      .then(function (res) {
        const requestItems = res.data;

        window.sessionStorage.setItem(
          "requestItems",
          JSON.stringify(requestItems)
        );
      })
      .catch(function (res) {});
  }
}
const data = JSON.parse(window.sessionStorage.getItem("requestItems"));

class NewTableApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "list",
    };
  }

  onRowClick = (record, index) => {
    this.setState({
      title: record.title,
      content: record.content,
      user_nickname: record.user_nickname,
      user_no: record.user_no,
      key: record.no,
    });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onAdd = (e) => {
    axios({
      method: "post",
      url: `http://i3d208.p.ssafy.io:9999/chickengak/request?content=${
        this.state.content
      }&title=${this.state.title}&user_no=${window.sessionStorage.getItem(
        "no"
      )}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        title: this.state.title,
        content: this.state.content,
        user_no: window.sessionStorage.getItem("no"),
      },
    })
      .then(function (res) {
        axios({
          method: "get",
          url: "http://i3d208.p.ssafy.io:9999/chickengak/request",
        })
          .then(function (res) {
            const requestItems = res.data;

            window.sessionStorage.setItem(
              "requestItems",
              JSON.stringify(requestItems)
            );

            window.location.reload(true);
          })
          .catch(function (res) {});

        window.location.reload(true);
      })
      .catch(function (error) {});
  };

  onModifyConfirm = (e) => {
    axios({
      method: "put",
      url: `http://i3d208.p.ssafy.io:9999/chickengak/request?content=${this.state.content}&no=${this.state.key}&title=${this.state.title}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        no: this.state.key,
        title: this.state.title,
        content: this.state.content,
        user_no: this.state.user_no,
      },
    })
      .then(function (res) {
        axios({
          method: "get",
          url: "http://i3d208.p.ssafy.io:9999/chickengak/request",
        }).then(function (res) {
          const requestItems = res.data;
          window.sessionStorage.setItem(
            "requestItems",
            JSON.stringify(requestItems)
          );

          window.location.reload(true);
        });
      })
      .catch(function (error) {});
  };

  onDelete = () => {
    axios({
      method: "delete",
      url: `http://i3d208.p.ssafy.io:9999/chickengak/request?no=${this.state.key}`,
    })
      .then(function (res) {
        axios({
          method: "get",
          url: "http://i3d208.p.ssafy.io:9999/chickengak/request",
        })
          .then(function (res) {
            const requestItems = res.data;

            window.sessionStorage.setItem(
              "requestItems",
              JSON.stringify(requestItems)
            );

            window.location.reload(true);
          })
          .catch(function (res) {});
      })
      .catch(function (err) {});
  };

  render() {
    if (this.state.page === "detail") {
      return (
        <>
          <Nav>
            <NavItem>
              <NavLink
                className="active text-primary font-weight-bold"
                onClick={() =>
                  this.setState({
                    page: "list",
                  })
                }
              >
                / 목록
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="active"
                onClick={() =>
                  this.setState({
                    page: "add",
                  })
                }
              >
                / 자료 요청하기
              </NavLink>
            </NavItem>
          </Nav>
          <Container className="my-5">
            <Row>
              <Col xs="12">
                <Card border="primary" style={{ textAlign: "left" }}>
                  <Container className="detailContainer">
                    <Card.Header>
                      <Nav className="justify-content-end text-primary m-3 detailNavButton">
                        {this.state.user_no + "" ===
                        window.sessionStorage.getItem("no") ? (
                          <Nav className="justify-content-end text-primary m-3 detailNavButton">
                            <NavItem>
                              <NavLink
                                onClick={() =>
                                  this.setState({
                                    page: "list",
                                  })
                                }
                              >
                                <i class="fas fa-arrow-circle-left"></i>
                              </NavLink>
                            </NavItem>

                            <NavItem>
                              <NavLink
                                onClick={() =>
                                  this.setState({
                                    page: "edit",
                                  })
                                }
                              >
                                <i class="far fa-edit"></i>
                              </NavLink>
                            </NavItem>

                            <NavItem>
                              <NavLink onClick={this.onDelete}>
                                <i class="far fa-trash-alt"></i>
                              </NavLink>
                            </NavItem>
                          </Nav>
                        ) : (
                          <Nav className="justify-content-end text-primary m-3 detailNavButton">
                            <NavItem>
                              <NavLink
                                onClick={() =>
                                  this.setState({
                                    page: "list",
                                  })
                                }
                              >
                                <i class="fas fa-arrow-circle-left"></i>
                              </NavLink>
                            </NavItem>
                          </Nav>
                        )}
                      </Nav>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{this.state.title}</Card.Title>
                      <hr />
                      <Row className="">
                        <Col xs="12" className="d-flex align-items-center">
                          {this.state.profile !== "null" ? (
                            <img
                              alt="..."
                              className="detailProfileImg"
                              src={this.state.profile}
                            ></img>
                          ) : (
                            <img
                              alt="..."
                              className="detailProfileImg"
                              src={require("../../../assets/img/default-avatar.png")}
                            ></img>
                          )}

                          <div className="m-1">
                            <CardText>
                              {this.state.create_at.slice(0, 10)}
                            </CardText>
                            <CardText>{this.state.user_nickname}</CardText>
                          </div>
                        </Col>
                      </Row>
                      <hr />
                      <Card.Text>{this.state.content}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <div className="detailFooter"></div>
                    </Card.Footer>
                  </Container>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      );
    } else if (this.state.page === "add") {
      return (
        <>
          <Nav>
            <NavItem>
              <NavLink
                className="active"
                onClick={() =>
                  this.setState({
                    page: "list",
                  })
                }
              >
                / 목록
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="active text-primary font-weight-bold"
                onClick={() =>
                  this.setState({
                    page: "add",
                  })
                }
              >
                / 자료 요청하기
              </NavLink>
            </NavItem>
          </Nav>
          <Container>
            <div className="vh-100 request-form-box text-left">
              <Form className="m-5">
                <Form.Group controlId="requesttitleinput">
                  <Form.Label className="m-3"></Form.Label>
                  <Form.Control
                    className="request-form-title"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={this.title}
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group controlId="requestcontentinput">
                  <Form.Label className="m-3"></Form.Label>
                  <Form.Control
                    className="request-form-content"
                    as="textarea"
                    rows="10"
                    placeholder="Content"
                    name="content"
                    value={this.content}
                    onChange={this.onChange}
                  />
                </Form.Group>
              </Form>

              <Nav className="justify-content-end">
                <NavItem>
                  <Button className="p-1 mr-3" variant="outline-primary">
                    <NavLink className="active" onClick={this.onAdd}>
                      Submit
                    </NavLink>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button className="p-1 mr-5" variant="outline-default">
                    <NavLink
                      onClick={() =>
                        this.setState({
                          page: "list",
                        })
                      }
                    >
                      Cancel
                    </NavLink>
                  </Button>
                </NavItem>
              </Nav>
            </div>
          </Container>
        </>
      );
    } else if (this.state.page === "edit") {
      return (
        <>
          <Nav>
            <NavItem>
              <NavLink
                className="active"
                onClick={() =>
                  this.setState({
                    page: "list",
                  })
                }
              >
                / 목록
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="active text-primary font-weight-bold"
                onClick={() =>
                  this.setState({
                    page: "add",
                  })
                }
              >
                / 자료 요청하기
              </NavLink>
            </NavItem>
          </Nav>
          <Container>
            <div className="vh-100 request-form-box text-left">
              <Form className="m-3">
                <Form.Group controlId="requesttitleinput">
                  <Form.Label className="m-3"></Form.Label>
                  <Form.Control
                    className="request-form-title"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={this.title}
                    onChange={this.onChange}
                    defaultValue={this.state.title}
                  />
                </Form.Group>
                <Form.Group controlId="requestcontentinput">
                  <Form.Label className="m-3"></Form.Label>
                  <Form.Control
                    className="request-form-content"
                    as="textarea"
                    rows="10"
                    placeholder="Content"
                    name="content"
                    value={this.content}
                    onChange={this.onChange}
                    defaultValue={this.state.content}
                  />
                </Form.Group>
              </Form>

              <Nav className="justify-content-end">
                <NavItem>
                  <Button className="p-1 mr-3" variant="outline-primary">
                    <NavLink className="active" onClick={this.onModifyConfirm}>
                      Submit
                    </NavLink>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button className="p-1 mr-5" variant="outline-default">
                    <NavLink
                      onClick={() =>
                        this.setState({
                          page: "detail",
                        })
                      }
                    >
                      Cancel
                    </NavLink>
                  </Button>
                </NavItem>
              </Nav>
            </div>
          </Container>
        </>
      );
    } else {
      return (
        <>
          <Nav>
            <NavItem>
              <NavLink
                className="active text-primary font-weight-bold"
                onClick={() =>
                  this.setState({
                    page: "list",
                  })
                }
              >
                / 목록
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="active"
                onClick={() =>
                  this.setState({
                    page: "add",
                  })
                }
              >
                / 자료 요청하기
              </NavLink>
            </NavItem>
          </Nav>
          <Container className="my-5 tableContainer">
            <Table
              pagination={{ defaultPageSize: 8, showSizeChanger: false }}
              dataSource={data}
              onRow={(record, index) => ({
                onClick: (event) => {
                  this.onRowClick(record, index, event);
                },
              })}
            >
              <Column />
              <Column title="#" dataIndex="no" key="no" />
              <Column
                title="Title"
                dataIndex="title"
                key="title"
                render={(text, record) => (
                  <a
                    href="#"
                    onClick={() =>
                      this.setState({
                        page: "detail",
                      })
                    }
                    onMouseOver={() =>
                      this.setState({
                        title: record.title,
                        content: record.content,
                        user_nickname: record.user_nickname,
                        user_no: record.user_no,
                        key: record.no,
                        create_at: record.create_at,
                        profile: record.profile,
                      })
                    }
                  >
                    {record.title}
                  </a>
                )}
              />

              <Column
                title="Author"
                dataIndex="user_nickname"
                key="user_nickname"
              />
              <Column />
            </Table>

            <Search
              className="mt-5"
              placeholder="Search"
              onSearch={onSearch}
              style={{ height: "2.5rem", width: "50%" }}
            />
          </Container>
        </>
      );
    }
  }
}

export default NewTableApp;
