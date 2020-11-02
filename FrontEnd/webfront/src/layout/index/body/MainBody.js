import React, { Component } from "react";
import IntroCarousel from "../../../components/index/body/IntroCarousel";
import GotoExam from "../../../components/index/body/GotoExam";

class MainBody extends Component {
  render() {
    return (
      <>
        <IntroCarousel />
        <GotoExam />
      </>
    );
  }
}

export default MainBody;
