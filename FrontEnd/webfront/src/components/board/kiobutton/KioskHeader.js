import React from "react";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// import NomarlButton from "../../components/header/NomarButton";

// core components

function KioskHeader() {
  return (
    <>
      <div className="page-header" style={{ minWidth: "400px" }}>
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../../../assets/ourdesign/kioskback.jpg") + ")",
          }}
        ></div>

        <div className="content-center">
          {/* 메인 홈페이지로 가는 이미지. */}
          {/* <a className="text-light" href="/">
            <i class="fas fa-home"></i>
          </a> */}
          <Container>
            <h1 className="title" style={{ color: "white" }}>
              Welcome to DADOK.
            </h1>
            <div className="text-center">
              {/* <Button
                className="btn-icon btn-round"
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
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
              </Button> */}
              <Row>
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    padding: "20px",
                  }}
                >
                  <Button
                    className="btn-round btn-white"
                    color="default"
                    outline
                    size="lg"
                    style={{ color: "white" }}
                  >
                    회원
                  </Button>
                  {/* <FancyButton onClick={(e) => e.preventDefault()} /> */}
                </Col>
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    padding: "20px",
                  }}
                >
                  <Button
                    className="btn-round btn-white"
                    color="default"
                    outline
                    size="lg"
                    style={{ color: "white" }}
                  >
                    비회원
                  </Button>
                  {/* <FancyButton onClick={(e) => e.preventDefault()} /> */}
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default KioskHeader;
