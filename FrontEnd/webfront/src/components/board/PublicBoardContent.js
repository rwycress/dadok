import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Tabs, Tab } from "react-bootstrap";
import { Container, NavbarBrand } from "reactstrap";
import Zoom from "react-reveal/Zoom";

import {
  Layout,
  Menu,
  Row,
  Col,
  Breadcrumb,
  Drawer,
  Form,
  Input,
  Select,
  message,
  Spin,
} from "antd";

import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

import {
  ContainerOutlined,
  UserOutlined,
  ExceptionOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import "antd/dist/antd.css";
import "./Board.css";

import { Nav, Button } from "react-bootstrap";

import PublicBoardHeader from "../../layout/board/header/PublicBoardHeader";
import PublicItemList from "./PublicItemList";

import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { findAllByTestId } from "@testing-library/react";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Option } = Select;

function TagInput(props) {
  const [tags, setTags] = React.useState([]);
  const addTags = props.addTags;

  return (
    <ReactTagInput
      tags={tags}
      placeholder="#Tag"
      maxTags={4}
      editable={true}
      removeOnBackspace={true}
      onChange={(newTags) => {
        setTags(newTags);

        addTags(tags);
      }}
    />
  );
}

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    visible: false,
    title: "",
    content: "",
    files: null,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
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
      method: "POST",
      url: "http://i3d208.p.ssafy.io:9999/chickengak/public",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      data: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        tag: this.state.tag,
        source: this.state.source,
        user_no: window.sessionStorage.getItem("no"),
      }),
    })
      .then((res) => {
        const fileid = res.data;
        this.setState({
          board_no: fileid,
        });

        let filedata = new FormData();
        filedata.append("files", this.state.files);

        axios.post(
          `http://i3d208.p.ssafy.io:9999/chickengak/file/upload/${this.state.board_no}`,
          filedata,
          {
            headers: {
              "Content-Type":
                "multipart/form-data; boundary=-----------------chgsrfgsfxbgdgicken",
            },
          }
        );
        window.location.reload(true);
      })
      .catch(function (error) {});
  };

  handleUpload = (e) => {
    if (e.target.files.length > 2) {
      this.setState({
        files: e.target.files[-1],
      });
    } else {
      this.setState({
        files: e.target.files[0],
      });
    }
    // this.setState({
    //   files: e.target.files[0],
    // });
  };

  addTags = (e) => {
    const tags = e.join(",");
    this.setState({
      tag: tags,
    });
  };

  loadingStatus = this.props.loadingStatus;
  loadingFinished = this.props.loadingFinished;

  render() {
    return (
      <>
        <Button
          className="px-3 d-flex justify-content-center align-items-center"
          variant="outline-primary"
          type="primary"
          onClick={this.showDrawer}
        >
          <PlusOutlined />
          <span className="ml-2">Add Item</span>
        </Button>
        <Drawer
          title="Add Public Item"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: "left",
              }}
            >
              <Button
                onClick={() => {
                  this.onAdd();
                  this.onClose();
                }}
                style={{ marginLeft: 8 }}
                // variant="outline-primary"
                type="primary"
              >
                Add
              </Button>
              <Button
                onClick={this.onClose}
                style={{ marginLeft: 10 }}
                variant="outline-primary"
              >
                Cancel
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="newTitle"
                  label="Title"
                  rules={[{ required: true, message: "Title is required!" }]}
                >
                  <Input
                    placeholder="Title"
                    name="title"
                    onChange={this.onChange}
                    value={this.title}
                    type="text"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="newSource"
                  label="Source"
                  rules={[{ required: true, message: "Source is required!" }]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Source URL"
                    onChange={this.onChange}
                    value={this.source}
                    type="url"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="mb-3">
              <Col span={24}>
                <TagInput addTags={this.addTags} />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="newDetails"
                  label="Details"
                  rules={[
                    {
                      required: true,
                      message: "Details are required!",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Item Details"
                    name="content"
                    onChange={this.onChange}
                    value={this.content}
                    type="text"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <input
            className="mt-4"
            id="fifles"
            type="file"
            encrypt="multipart/form-data"
            name="files"
            onChange={this.handleUpload}
            // multiple
          ></input>
        </Drawer>
      </>
    );
  }
}

class PublicBoardContent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    collapsed: false,
    loading: false,
  };

  loadingStatus = () => {
    this.setState({
      loading: true,
    });
  };

  loadingFinished = () => {
    this.setState({
      loading: false,
    });
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    if (this.state.loading === false) {
      return (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            width="18rem"
            className=""
            breakpoint="xl"
            collapsedWidth="0"
            onBreakpoint={(broken) => {}}
            onCollapse={(collapsed, type) => {}}
          >
            <div className="logo d-flex align-items-center justify-content-center">
              <NavbarBrand className="font-weight-bold" href="/">
                <span className="h3 text-light">DADOK</span>
              </NavbarBrand>
            </div>
            {window.sessionStorage.getItem("no") ? (
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item
                  className="d-flex align-items-center"
                  style={{ height: "5rem" }}
                  key="1"
                  icon={<ContainerOutlined />}
                >
                  <Link className="navbutton" to="/PublicBoard">
                    Public Board
                  </Link>
                </Menu.Item>
                <Menu.Item
                  className="d-flex align-items-center"
                  style={{ height: "5rem" }}
                  key="2"
                  icon={<ExceptionOutlined />}
                >
                  <Link className="navbutton navselected" to="/RequestBoard">
                    Request Board
                  </Link>
                </Menu.Item>
                <Menu.Item
                  className="d-flex align-items-center"
                  style={{ height: "5rem" }}
                  key="3"
                  icon={<UserOutlined />}
                >
                  <Link className="navbutton" to="/MyPage">
                    My Page
                  </Link>
                </Menu.Item>
                <Menu.Item
                  className="d-flex align-items-center"
                  style={{ height: "5rem" }}
                  key="4"
                  icon={<ArrowLeftOutlined />}
                >
                  <Link className="navbutton" to="/">
                    Back to Main
                  </Link>
                </Menu.Item>
              </Menu>
            ) : (
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item
                  className="d-flex align-items-center"
                  style={{ height: "5rem" }}
                  key="1"
                  icon={<ContainerOutlined />}
                >
                  <Link className="navbutton" to="/PublicBoard">
                    Public Board
                  </Link>
                </Menu.Item>
                <Menu.Item
                  className="d-flex align-items-center"
                  style={{ height: "5rem" }}
                  key="2"
                  icon={<ExceptionOutlined />}
                >
                  <Link className="navbutton navselected" to="/RequestBoard">
                    Request Board
                  </Link>
                </Menu.Item>
                <Menu.Item
                  className="d-flex align-items-center"
                  style={{ height: "5rem" }}
                  key="4"
                  icon={<ArrowLeftOutlined />}
                >
                  <Link className="navbutton" to="/">
                    Back to Main
                  </Link>
                </Menu.Item>
              </Menu>
            )}
          </Sider>
          <Layout>
            <Content style={{ margin: "30px" }}>
              <div
                className="site-layout-background"
                style={{ padding: 25, height: "100%" }}
              >
                <div className="mx-3">
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Board</Breadcrumb.Item>
                    <Breadcrumb.Item>Public Board</Breadcrumb.Item>
                  </Breadcrumb>

                  <PublicBoardHeader />
                </div>
                {window.sessionStorage.getItem("no") === "1" ? (
                  <Nav
                    className="mx-4 align-items-center d-flex flex-row-reverse"
                    activeKey="/home"
                  >
                    <UploadForm
                      loadingStatus={(p) => {
                        this.setState(p);
                      }}
                      loadingFinished={(p) => {
                        this.setState(p);
                      }}
                    />
                  </Nav>
                ) : (
                  <Nav
                    className="mx-4 align-items-center d-flex flex-row-reverse"
                    activeKey="/home"
                  ></Nav>
                )}
                {/* <Tabs
                  defaultActiveKey="all"
                  id="uncontrolled-tab"
                  className="mx-3"
                >
                  <Tab eventKey="all" title="전체">
                    <div className="text-center">
                      <PublicItemList filter="" />
                    </div>
                  </Tab>
                  <Tab eventKey="ms" title="중등">
                    <div className="text-center">
                      <PublicItemList filter="중등" />
                    </div>
                  </Tab>
                  <Tab eventKey="hs" title="고등">
                    <div className="text-center">
                      <PublicItemList filter="고등" />
                    </div>
                  </Tab>
                  <Tab eventKey="ex" title="수험">
                    <div className="text-center">
                      <PublicItemList filter="수험" />
                    </div>
                  </Tab>
                </Tabs> */}

                <div className="text-center">
                  <PublicItemList />
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      );
    } else {
      return (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            width="18rem"
            className=""
            breakpoint="xl"
            collapsedWidth="0"
            onBreakpoint={(broken) => {}}
            onCollapse={(collapsed, type) => {}}
          >
            <div className="logo d-flex align-items-center justify-content-center">
              <NavbarBrand className="font-weight-bold" href="/">
                <span className="h3 text-light">DADOK</span>
              </NavbarBrand>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item
                className="d-flex align-items-center"
                style={{ height: "5rem" }}
                key="1"
                icon={<ContainerOutlined />}
              >
                <Link className="navbutton navselected" to="/PublicBoard">
                  Public Board
                </Link>
              </Menu.Item>

              <Menu.Item
                className="d-flex align-items-center"
                style={{ height: "5rem" }}
                key="2"
                icon={<ExceptionOutlined />}
              >
                <Link className="navbutton" to="/RequestBoard">
                  Request Board
                </Link>
              </Menu.Item>

              <Menu.Item
                className="d-flex align-items-center"
                style={{ height: "5rem" }}
                key="3"
                icon={<UserOutlined />}
              >
                <Link className="navbutton" to="/MyPage">
                  My Page
                </Link>
              </Menu.Item>
              <Menu.Item
                className="d-flex align-items-center"
                style={{ height: "5rem" }}
                key="4"
                icon={<ArrowLeftOutlined />}
              >
                <Link className="navbutton" to="/">
                  Back to Main
                </Link>
              </Menu.Item>
              <Menu.Item
                className="d-flex align-items-center fixed-bottom"
                style={{ height: "5rem" }}
                key="4"
                icon={<ArrowLeftOutlined />}
              >
                <Link className="navbutton" to="/">
                  Back to Main
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: "30px" }}>
              <div
                className="site-layout-background"
                style={{ padding: 25, height: "100%" }}
              >
                <div className="mx-3">
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Board</Breadcrumb.Item>
                    <Breadcrumb.Item>Public Board</Breadcrumb.Item>
                  </Breadcrumb>
                  <PublicBoardHeader />
                </div>
                <Nav
                  className="mx-4 align-items-center justify-content-between"
                  activeKey="/home"
                >
                  <UploadForm />
                </Nav>

                <Container>
                  <Spin />
                </Container>
              </div>
            </Content>
          </Layout>
        </Layout>
      );
    }
  }
}

export default PublicBoardContent;
