import React, { Component } from "react";
import axios from "axios";
import { Form, Nav, NavItem, NavLink, Button } from "react-bootstrap";

class RequestForm extends Component {
  state = {
    title: "",
    content: "",
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

  render() {
    return (
      <>
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
              />
            </Form.Group>
          </Form>
          <Nav className="justify-content-end">
            <NavItem>
              <Button className="p-1 mr-3" variant="outline-primary">
                <NavLink className="active" href="#pablo" onClick={this.onAdd}>
                  Submit
                </NavLink>
              </Button>
            </NavItem>
            <NavItem>
              <Button className="p-1 mr-5" variant="outline-default">
                <NavLink
                  href="#pablo"
                  className="disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  Cancel
                </NavLink>
              </Button>
            </NavItem>
          </Nav>
        </div>
      </>
    );
  }
}

export default RequestForm;
