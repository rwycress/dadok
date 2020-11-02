import React, { Component } from "react";

import MainHeader from "./index/header/MainHeader";
import MainBody from "./index/body/MainBody";
import MainFooter from "./index/footer/MainFooter";
import HeaderNavbar from "../components/index/header/HeaderNavbar";

class IndexBase extends Component {
  render() {
    return (
      <div>
        <HeaderNavbar />

        <MainHeader />

        <MainBody />

        <MainFooter />
      </div>
    );
  }
}

export default IndexBase;
