import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import Fade from "react-reveal/Fade";

// core components
import TitleAnimation from "./TitleAnimation";

import "./MainHeader.css";

const titleFont = {
  fontSize: "3vh",
};

function MainHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
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
  });
  return (
    <>
      <div className="page-header">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../../../assets/ourdesign/mainback.png") + ")",
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <TitleAnimation />
            <div className="h4 mt-5 description text-center">
              <p className="mb-0" style={titleFont}>
                Welcome.
              </p>
              <p className="mb-0" style={titleFont}>
                We provide great
              </p>
              <p className="mb-0" style={titleFont}>
                "reading room services".
              </p>
              <p className="mb-0" style={titleFont}>
                Come and enjoy whenever you want.
              </p>
              <p className="mb-0" style={titleFont}></p>
            </div>
            <Fade bottom>
              <div
                className="text-center mt-4"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{ borderBottom: "0.15rem solid white", width: "80%" }}
                ></div>

                {/* <Button
                className="btn-icon btn-round"
                color="info"
                href="#pablo"
                // onClick={(e) => e.preventDefault()}
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <Button
                className="btn-icon btn-round"
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Button
                className="btn-icon btn-round"
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fab fa-google-plus"></i>
              </Button> */}
              </div>
            </Fade>
          </Container>
        </div>
      </div>
    </>
  );
}

export default MainHeader;
