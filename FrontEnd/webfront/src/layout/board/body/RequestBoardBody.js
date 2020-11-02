import React, { Component } from "react";

import RequestBoardContent from "../../../components/board/RequestBoardContent";

class RequestBoardBody extends Component {
  render() {
    // if (this.props.show) {
    //   return <>안나옴</>;
    // }
    return (
      <>
        <RequestBoardContent />
      </>
    );
  }
}

export default RequestBoardBody;
