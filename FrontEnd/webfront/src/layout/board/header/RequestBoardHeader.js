import React, { Component } from "react";

import { Card, CardBody } from "reactstrap";

class RequestBoardHeader extends Component {
  render() {
    return (
      <>
        <Card>
          <CardBody>
            <blockquote className="blockquote blockquote-primary mb-0">
              <p>Request Board</p>
              <footer className="blockquote-footer">자료요청 게시판</footer>
            </blockquote>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default RequestBoardHeader;
