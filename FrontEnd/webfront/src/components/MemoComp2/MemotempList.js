import React, { Component } from "react";
import Note from "./Note";
import { Row, Col } from "react-bootstrap";
import { Alert } from "antd";

class MemotempList extends Component {
  onDelete = (no) => {
    this.props.onDelete(no);
  };
  onEdit = (data) => {
    this.props.onEdit(data);
  };

  render() {
    const notes = this.props.notes;
    if (notes.length !== 0) {
      return (
        <Row>
          {notes.map((note) => {
            return (
              <Col>
                <Note
                  note={note}
                  key={note.no}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                />
              </Col>
            );
          })}
        </Row>
      );
    } else {
      return (
        <Alert
          message="노트를 추가해보세요!"
          type="warning"
          style={{ fontSize: "0.8rem", width: "100%" }}
        />
      );
    }
  }
}

export default MemotempList;
