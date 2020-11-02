import React, { Component } from "react";

// reactstrap components
import { Container } from "reactstrap";
import CustomProfile from "../../custom/CustomProfile";
import axios from "axios";

// core components

let pageHeader = React.createRef();

class ProfilePageHeader extends Component {
  state = {
    quote: "",
  };

  useEffect = () => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  };

  getQuotes = async () => {
    const quote = await axios.get("https://quotes.rest/qod?language=en");
    this.setState({ quote: quote.data.contents.quotes[0].quote });
  };

  componentDidMount() {
    this.getQuotes();
  }

  render() {
    if (this.state.quote !== null || this.state.quote !== "") {
      return (
        <>
          <div className="page-header page-header-small">
            <div
              className="page-header-image"
              style={{
                backgroundImage:
                  "url(" +
                  require("../../../assets/ourdesign/computer.jpg") +
                  ")",
              }}
              ref={pageHeader}
            ></div>
            <Container>
              <div>
                <CustomProfile />
                {/* User정보 수정, 탈퇴 */}
              </div>
              <h3 className="title" style={{ color: "white" }}>
                {window.sessionStorage.getItem("name")}
              </h3>
              <p className="category">
                {window.sessionStorage.getItem("nickname")}
              </p>
              <div className="content">
                <p>오늘의 명언(Quote of the day)</p>
                <p>"{this.state.quote}"</p>
              </div>
            </Container>
          </div>
        </>
      );
    } else if (this.state.quote === null || this.state.quote === "") {
      return (
        <>
          <div className="page-header page-header-small">
            <div
              className="page-header-image"
              style={{
                backgroundImage:
                  "url(" +
                  require("../../../assets/ourdesign/computer.jpg") +
                  ")",
              }}
              ref={pageHeader}
            ></div>
            <Container>
              <div>
                <CustomProfile />
                {/* User정보 수정, 탈퇴 */}
              </div>
              <h3 className="title" style={{ color: "white" }}>
                {window.sessionStorage.getItem("name")}
              </h3>
              <p className="category">
                {window.sessionStorage.getItem("nickname")}
              </p>
              <div className="content">
                <p>노력하는 {window.sessionStorage.getItem("name")}님</p>
                <p>"오늘도 화이팅입니다 !!"</p>
              </div>
            </Container>
          </div>
        </>
      );
    }
  }
}

export default ProfilePageHeader;
