import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Input, Modal } from "antd";

const { TextArea } = Input;

class Note extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  onDelete = () => {
    this.props.onDelete(this.props.note.no);
  };
  onEdit = () => {
    this.props.onEdit(this.props.note);
  };

  render() {
    const { title, content, create_at } = this.props.note;

    return (
      <Card style={{ minWidth: "200px" }}>
        <Card.Body>
          <Card.Title>{`${title}`}</Card.Title>
          <Card.Text style={{ height: "5rem" }}>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >{`${content}`}</div>

            <div style={{ marginTop: "10px" }}>{`${create_at}`}</div>
          </Card.Text>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={this.showModal}
              style={{ padding: "5px 15px" }}
              title="Detail"
            >
              <i class="fas fa-info-circle"></i>
            </Button>
            <Modal
              title="Note Detail"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Return
                </Button>,
              ]}
            >
              <TextArea rows={7} value={`${content}`} />
            </Modal>

            <Button
              variant="primary"
              size="sm"
              onClick={this.onEdit}
              style={{ fontSize: "0.8571em" }}
              title="Edit"
            >
              <i class="fas fa-edit"></i>
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={this.onDelete}
              style={{ fontSize: "0.8571em", color: "white" }}
              title="Delete"
            >
              <i class="fas fa-trash-alt"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default Note;
