import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Layout, Menu, Breadcrumb, Input, Table, Space } from "antd";
import {
  ContainerOutlined,
  UserOutlined,
  ExceptionOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Tabs, Tab } from "react-bootstrap";
import { Container, NavbarBrand } from "reactstrap";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./Board.css";

import RequestBoardHeader from "../../layout/board/header/RequestBoardHeader";
import NewTableApp from "./table/NewTableApp";
import RequestForm from "./form/RequestForm";

const { Content, Sider } = Layout;

class RequestBoardContent extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    // if (this.state.collapsed === "false") {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          width="18rem"
          breakpoint="lg"
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
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
                  <Breadcrumb.Item>Request Board</Breadcrumb.Item>
                </Breadcrumb>

                <RequestBoardHeader />
                <NewTableApp />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default RequestBoardContent;
