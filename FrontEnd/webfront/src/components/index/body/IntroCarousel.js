import React, { Component } from "react";
import MainCarousel from "./MainCarousel";
import { Container, Row, Col } from "reactstrap";
import IntroModal from "./IntroModal";

import Fade from "react-reveal/Fade";

class IntroCarousel extends Component {
  render() {
    const TopBottom = {
      marginTop: "70px",
      marginBottom: "50px",
    };
    const TextCenter = {
      textAlign: "center",
    };
    // const ItemCenter = {
    //   justifyContent: "center",
    // };
    return (
      <>
        <div className="section" style={TopBottom}>
          <Container>
            <Row>
              <Col
                lg="6"
                md="12"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Fade left>
                  <div style={{ alignSelf: "center" }}>
                    <MainCarousel />
                  </div>
                </Fade>
              </Col>
              <Col
                lg="6"
                md="12"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Fade right>
                  <div style={{ alignSelf: "center" }}>
                    <h2 className="title" style={TextCenter}>
                      We are DADOK
                    </h2>
                    <h5 className="description" style={TextCenter}>
                      "May your day shine
                      <br />
                      brighter than the stars."
                      <p style={{ marginTop: "10px", fontSize: "13px" }}>
                        당신의 하루가 별보다 빛나길
                      </p>
                    </h5>
                    <div className="col text-center">
                      <IntroModal />
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default IntroCarousel;
