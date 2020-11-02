import React, { Component } from "react";

import { Card, CardBody } from "reactstrap";

class PublicBoardHeader extends Component {
  render() {
    return (
      <>
        <Card>
          <CardBody>
            <blockquote className="blockquote blockquote-primary mb-0">
              <p>Public Board</p>
              <footer className="blockquote-footer">공용자료 게시판</footer>
            </blockquote>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default PublicBoardHeader;
