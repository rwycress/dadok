import React, { Component } from "react";

import RequestBoardBody from "./board/body/RequestBoardBody";

class RequestBoardBase extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { showContents: true };
  // }
  render() {
    return (
      <div>
        <RequestBoardBody />
        {/* <RequestBoardBody show={this.state.showContents} /> */}
      </div>
    );
  }
}

export default RequestBoardBase;
