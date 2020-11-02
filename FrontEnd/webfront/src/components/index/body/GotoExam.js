import React, { Component } from "react";
import { Button, Container, Row, Col } from "reactstrap";

import Fade from "react-reveal/Fade";

class GotoExam extends Component {
  render() {
    const TopBottom = {
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
                    <h2 className="title" style={TextCenter}>
                      We will support
                    </h2>
                    <h5 className="description" style={TextCenter}>
                      "He can do, She can do, <br />
                      Why not me?"
                      <p style={{ marginTop: "10px", fontSize: "13px" }}>
                        그도 하고, 그녀도 하는데, 내가 왜 못해?
                      </p>
                      <p style={{ marginTop: "10px", fontSize: "13px" }}>
                        - CEO Taeyun Kim -
                      </p>
                    </h5>

                    <div className="col text-center">
                      <Button
                        className="btn-round btn-white"
                        color="primary"
                        outline
                        size="lg"
                        type="button"
                        href="/PublicBoard"
                        style={{ marginBottom: "40px" }}
                      >
                        자료실 가기
                      </Button>
                    </div>
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
                  <div>
                    <img
                      alt="..."
                      src={require("../../../assets/ourdesign/examimg.jpg")}
                    ></img>
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

export default GotoExam;
