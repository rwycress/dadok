import React, { Component } from "react";
import axios from "axios";
import Flippy, { FrontSide, BackSide } from "../../components/board/card/lib";
import "../board/card/CardApp.css";
import { Modal } from "antd";

import { Row, Col, Form, Input } from "antd";

import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

import { Button } from "react-bootstrap";

import ReactTagInput from "@pathofdev/react-tag-input";

function TagInput() {
  const [tags, setTags] = React.useState(["Tags"]);
  return (
    <ReactTagInput
      tags={tags}
      placeholder=" "
      maxTags={6}
      editable={true}
      removeOnBackspace={true}
      onChange={(newTags) => setTags(newTags)}
    />
  );
}

const FlippyStyle = {
  textAlign: "center",
  justifyContent: "center",
  padding: "0 20px 0 20px",
  data: [],
};

class ItemModal extends React.Component {
  state = {
    loading: false,
    visible: false,
    edit: false,
    data: [],
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  editCancel = () => {
    this.setState({ edit: false, visible: true });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onLikeSearch = (value) => {
    axios({
      method: "get",
      url: `//i3d208.p.ssafy.io:9999/chickengak/public/like/search?board_no=${value}&user_no=${window.sessionStorage.getItem(
        "no"
      )}`,
    })
      .then(function (res) {
        window.sessionStorage.setItem("like", res.status);
      })
      .catch(function (err) {});
  };

  onLike = (value) => {
    axios({
      method: "get",
      url: `//i3d208.p.ssafy.io:9999/chickengak/public/like?public_no=${value}&user_no=${window.sessionStorage.getItem(
        "no"
      )}`,
    })
      .then(function (res) {
        axios({
          method: "get",
          url: `//i3d208.p.ssafy.io:9999/chickengak/public/like/search?board_no=${value}&user_no=${window.sessionStorage.getItem(
            "no"
          )}`,
        }).then(function (res) {
          window.sessionStorage.setItem("like", res.status);
        });
      })
      .catch(function (err) {});
  };

  onUnLike = (value) => {
    axios({
      method: "get",
      url: `//i3d208.p.ssafy.io:9999/chickengak/public/unlike?public_no=${value}&user_no=${window.sessionStorage.getItem(
        "no"
      )}`,
    })
      .then(function (res) {
        axios({
          method: "get",
          url: `//i3d208.p.ssafy.io:9999/chickengak/public/like/search?board_no=${value}&user_no=${window.sessionStorage.getItem(
            "no"
          )}`,
        }).then(function (res) {
          window.sessionStorage.setItem("like", res.status);
        });
      })
      .catch(function (err) {});
  };

  onModify = () => {
    this.setState({ edit: true });
    axios({
      method: "get",
      url: `http://i3d208.p.ssafy.io:9999/chickengak/public/${this.props.no}`,
    })
      .then((res) => {
        const data = res.data;
        this.setState({ data: data });
      })

      .catch((err) => {
        console.error(err);
      });
  };

  onModifyConfirm = (e) => {
    axios({
      method: "put",
      url: "http://i3d208.p.ssafy.io:9999/chickengak/public",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        title: this.state.title,
        content: this.state.content,
        no: this.props.no,
      },
    })
      .then(function (res) {
        axios({
          method: "get",
          url: "http://i3d208.p.ssafy.io:9999/chickengak/public",
        }).then(function (res) {
          const publicItems = res.data;
          window.sessionStorage.setItem(
            "publicItems",
            JSON.stringify(publicItems)
          );

          window.location.reload(true);
        });
      })
      .catch(function (error) {});
  };

  onDelete = () => {
    axios({
      method: "delete",
      url: `http://i3d208.p.ssafy.io:9999/chickengak/public?no=${this.props.no}`,
    })
      .then(function (res) {
        axios({
          method: "get",
          url: "http://i3d208.p.ssafy.io:9999/chickengak/public",
        })
          .then(function (res) {
            const publicItems = res.data;

            window.sessionStorage.setItem(
              "publicItems",
              JSON.stringify(publicItems)
            );

            window.location.reload(true);
          })
          .catch(function (res) {});
      })
      .catch(function (err) {});
  };

  render() {
    const { visible } = this.state;

    if (this.state.edit === false) {
      return (
        <>
          <Button
            className="backside-button"
            type="primary"
            onClick={() => {
              this.showModal();
              this.onLikeSearch(this.props.no);
            }}
          >
            <i class="mr-1 fas fa-info-circle"></i> Detail
          </Button>

          <Modal
            width="60rem"
            visible={visible}
            title={this.props.title}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <div>
                {window.sessionStorage.getItem("like") === "204" ? (
                  <Button
                    className="mr-3"
                    variant="outline-primary"
                    // variant="secondary"
                    onClick={() => {
                      this.onLike(this.props.no);
                      this.showModal();
                    }}
                  >
                    <i class="fa fa-heart"></i>
                  </Button>
                ) : (
                  <Button
                    className="mr-3"
                    variant="secondary"
                    onClick={() => {
                      this.onUnLike(this.props.no);
                      this.showModal();
                    }}
                  >
                    <i class="fa fa-heart"></i>
                  </Button>
                )}

                {window.sessionStorage.getItem("no") === "1" ? (
                  <>
                    <Button
                      className=""
                      variant="outline-info"
                      onClick={this.onModify}
                      style={{ verticalAlign: "baseline", marginLeft: "12px" }}
                    >
                      Edit
                    </Button>

                    <Button
                      className=""
                      variant="outline-primary"
                      onClick={this.onDelete}
                      style={{ verticalAlign: "baseline", marginLeft: "12px" }}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <div></div>
                )}
              </div>,
            ]}
          >
            {this.props.finfos[0] ? (
              <CardText>
                <p className="h4">{this.props.content}</p>
                <br />
                <span className="mr-2">
                  <i class="fas fa-paperclip"></i>
                </span>
                {this.props.finfos[0].originalname}.{this.props.finfos[0].ext}
                <br />
                <div className="my-5">
                  <p>
                    <span className="">{this.props.tags}</span>
                  </p>
                  <p>
                    <span className="">
                      {this.props.create_at.slice(0, 10)} 등록
                    </span>
                  </p>
                </div>
              </CardText>
            ) : (
              <CardText>
                <p className="h4">{this.props.content}</p>
                <br />
                <div className="my-5">
                  <p>
                    <span className="">{this.props.tags}</span>
                  </p>
                  <p>
                    <span className="">
                      {this.props.create_at.slice(0, 10)} 등록
                    </span>
                  </p>
                </div>
              </CardText>
            )}
          </Modal>
        </>
      );
    } else {
      return (
        <>
          <Modal
            width="60rem"
            visible={visible}
            title={this.state.title}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <div>
                <Button
                  className="mr-3"
                  variant="outline-info"
                  onClick={() => {
                    this.onModifyConfirm();
                  }}
                >
                  Done
                </Button>
                <Button
                  className="mr-3"
                  variant="outline-primary"
                  onClick={this.editCancel}
                  style={{ verticalAlign: "baseline" }}
                >
                  Cancel
                </Button>
              </div>,
            ]}
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
                      defaultValue={this.props.title}
                      type="text"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="newUrl"
                    label="Source"
                    rules={[{ required: true, message: "Source is required!" }]}
                  >
                    <Input style={{ width: "100%" }} placeholder="Source URL" />
                  </Form.Item>
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
                      defaultValue={this.props.content}
                      // defaultValue={this.state.data.content}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <TagInput />
                </Col>
              </Row>
            </Form>
          </Modal>
        </>
      );
    }
  }
}

class CardAppEmpty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
    this.state = {
      publicItems: this.props.publicItems,
    };
    if (this.props.tag === "" || this.props.tag === null) {
      this.state.tag = "#NoTag";
    } else {
      this.state.tag = this.props.tag
        .split(",")
        .map((x) => "#" + x)
        .join(", ");
    }
  }

  render() {
    if (this.props.finfos[0]) {
      return (
        <div className="CardApp d-flex align-items-center">
          <div
            className="flipcard"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flex: "1 0 200px",
              justifyContent: "space-around",
              "flex-wrap": "wrap",
            }}
          >
            <Flippy
              flipOnHover={true}
              flipDirection={"horizontal"}
              style={FlippyStyle}
            >
              <React.Fragment>
                <FrontSide>
                  <Card
                    className="text-center"
                    style={{ height: "100%", marginBottom: "0px" }}
                  >
                    <div className="d-flex flex-column justify-content-between h-100">
                      <CardHeader className="mt-3">{this.state.tag}</CardHeader>
                      <CardBody className="d-flex flex-column justify-content-between h-100">
                        <CardTitle
                          className="text-primary cardtitle my-3"
                          tag="h4"
                        >
                          {this.props.title}
                        </CardTitle>

                        <CardText>{this.props.content}</CardText>
                        <CardText>
                          <span className="mr-2">
                            <i class="fas fa-paperclip"></i>
                          </span>
                          {this.props.finfos[0].originalname}.
                          {this.props.finfos[0].ext}
                        </CardText>
                      </CardBody>
                      <CardFooter>
                        <p className="my-3 mb-5">{this.props.views} Views</p>
                      </CardFooter>
                    </div>
                  </Card>
                </FrontSide>
                <BackSide
                  style={{
                    backgroundColor: "#eeeeee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    color: "white",
                  }}
                >
                  <ItemModal {...this.props} tags={this.state.tag} />
                  <Button
                    className="backside-button"
                    href={this.props.finfos[0].url}
                  >
                    <i class="mr-1 fas fa-download"></i> Download
                  </Button>
                  <span
                    style={{
                      fontSize: "12px",
                      position: "absolute",
                      bottom: "10px",
                      width: "100%",
                    }}
                  >
                    <br />
                  </span>
                </BackSide>
              </React.Fragment>
            </Flippy>
          </div>
        </div>
      );
    } else {
      return (
        <div className="CardApp d-flex align-items-center">
          <div
            className="flipcard"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flex: "1 0 200px",
              justifyContent: "space-around",
              "flex-wrap": "wrap",
            }}
          >
            <Flippy
              flipOnHover={true}
              flipDirection={"horizontal"}
              style={FlippyStyle}
            >
              <React.Fragment>
                <FrontSide>
                  <Card
                    className="text-center"
                    style={{ height: "100%", marginBottom: "0px" }}
                  >
                    <div className="d-flex flex-column justify-content-between h-100">
                      <CardHeader className="mt-3">{this.state.tag}</CardHeader>
                      <CardBody className="d-flex flex-column h-100">
                        <CardTitle
                          className="text-primary cardtitle my-3"
                          tag="h4"
                        >
                          {this.props.title}
                        </CardTitle>
                        <CardText>{this.props.content}</CardText>
                      </CardBody>
                      <CardFooter>
                        <p className="my-3 mb-5">{this.props.views} Views</p>
                      </CardFooter>
                    </div>
                  </Card>
                </FrontSide>
                <BackSide
                  style={{
                    backgroundColor: "#eeeeee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    color: "white",
                  }}
                >
                  <ItemModal {...this.props} tags={this.state.tag} />
                  <span
                    style={{
                      fontSize: "12px",
                      position: "absolute",
                      bottom: "10px",
                      width: "100%",
                    }}
                  >
                    <br />
                  </span>
                </BackSide>
              </React.Fragment>
            </Flippy>
          </div>
        </div>
      );
    }
  }
}

export default CardAppEmpty;
