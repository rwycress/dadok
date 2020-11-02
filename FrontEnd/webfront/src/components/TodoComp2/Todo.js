import React, { Component } from "react";

import { FaTrashAlt } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";

class Todo extends Component {

  onEdit = () => {
    this.props.onEdit(this.props.todo);
  };

  onDelete = () => {
    this.props.onDelete(this.props.todo.no);
  };

  render() {
    const { complete, content } = this.props.todo;
    return (
      <Row>
        <Col
          xs="8"
          style={{
            textDecoration: complete === 1 ? "line-through" : "",
            textAlign: "left",
            margin: "20px 0 20px 0",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          onClick={() => {
 
            this.onEdit();
          }}
        >
          {`${content}`}
        </Col>
        <Col
          xs="4"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <FaTrashAlt
            style={{
              cursor: "pointer",
              alignSelf: "center",
              fill: "#F96332",
            }}
            onClick={this.onDelete}
            title="Delete"
          />
        </Col>
      </Row>
    );
  }
}

export default Todo;
