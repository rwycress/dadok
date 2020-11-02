import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class TodoForm extends Component {
  state = {
    form: { content: "", complete: 0 },
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let form = this.state.form;
    form[name] = value;
    this.setState({ form });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.onFormSubmit(this.state.form);

    this.setState({
      content: "",
      complete: 0,
    });

    this.onReset();
  };

  onReset = () => {
    this.setState({
      form: { content: "", complete: 0 },
    });
    document.querySelector("form").reset();
  };

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            name="content"
            value={this.state.form.content}
            onChange={this.handleChange}
            placeholder="할일을 입력해주세요"
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          size="sm"
          onClick={this.onFormSubmit}
          style={{ float: "right" }}
        >
          ADD
        </Button>
      </Form>
    );
  }
}

export default TodoForm;
