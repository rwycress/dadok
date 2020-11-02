import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Form, Input } from "antd";

import "./MemoForm.css";

class MemoForm extends Component {
  state = {
    form: { title: "", content: "", isEdit: false },
    btnName: "SAVE",
  };

  isEmpty(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && !this.isEmpty(this.props.note)) {
      this.setState({
        form: { ...this.props.note, isEdit: true },
        btnName: "UPDATE",
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    let form = this.state.form;
    form[name] = value;
    this.setState({ form });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    if (this.formValidation()) {
      this.props.onFormSubmit(this.state.form);
    }

    this.onReset();
  };

  formValidation = () => {
    if (document.getElementsByName("title")[0].value === "") {
      alert("Enter title");
      return false;
    }
    if (document.getElementsByName("content")[0].value === "") {
      alert("Enter content");
      return false;
    }
    return true;
  };

  onReset = () => {
    this.setState({
      form: { title: "", content: "", isEdit: false },
    });
    this.setState({
      btnName: "SAVE",
    });
    document.querySelector("Form").reset();
  };

  render() {
    return (
      <Form>
        <Form.Item>
          <Input
            name="title"
            onChange={this.handleChange}
            value={this.state.form.title}
            placeholder="Memo Title"
            style={{
              marginTop: "10px",
              borderRadius: "30px",
            }}
          />
        </Form.Item>
        <Form.Item>
          <Input.TextArea
            onChange={this.handleChange}
            value={this.state.form.content}
            type="textarea"
            name="content"
            placeholder="Memo Content"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="submit"
            size="sm"
            onClick={this.onFormSubmit}
            style={{
              float: "right",
            }}
          >
            {this.state.btnName}
          </Button>
        </Form.Item>
        <br></br>
      </Form>
    );
  }
}

export default MemoForm;
