import React from "react";
// reactstrap components
import { Button, Modal, Row, Col, Container } from "reactstrap";
// core components
import starimgA from "../../../assets/ourdesign/star.jfif";
import starimgB from "../../../assets/ourdesign/star.jpg";

function IntroModal() {
  const [modalLarge, setModalLarge] = React.useState(false);
  return (
    <>
      <Button
        className="btn-round btn-white"
        color="primary"
        outline
        size="lg"
        type="button"
        onClick={() => setModalLarge(true)}
        style={{ marginBottom: "20px" }}
      >
        우리 다독은
      </Button>
      <Modal
        isOpen={modalLarge}
        className="modal-lg"
        modalClassName="bd-example-modal-lg"
        toggle={() => setModalLarge(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            What is DADOK
          </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setModalLarge(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div
          className="modal-body"
          style={{ textAlign: "center", margin: "20px 0 20px 0", padding: 0 }}
        >
          <Container>
            <Row style={{ height: "80%", margin: "0 20px 0 20px" }}>
              <Col
                xs="12"
                sm="6"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={starimgA}
                  style={{
                    height: "100%",
                    alignSelf: "center",
                    padding: "30px 0 30px 0",
                    filter: "brightness(70%)",
                  }}
                />
              </Col>
              <Col
                xs="12"
                sm="6"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "left",
                }}
              >
                <div style={{ alignSelf: "center", padding: "30px 0 30px 0" }}>
                  <h3 style={{ position: "relative" }}>
                    다독
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        fontSize: "20px",
                        color: "#f96332",
                      }}
                    >
                      [DADOK]
                    </span>
                  </h3>
                  <div>
                    <span style={{ fontSize: "20px", color: "#f96332" }}>
                      다
                    </span>
                    같이{" "}
                    <span style={{ fontSize: "20px", color: "#f96332" }}>
                      독
                    </span>
                    서실로 올 수 있도록 하겠습니다.
                  </div>
                  <div>
                    고생하는 여러분을
                    <span style={{ fontSize: "20px", color: "#f96332" }}>
                      다독
                    </span>
                    이겠습니다.
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    항상 고객 편의를 생각하고
                  </div>
                  <div>고객 소통을 통해</div>
                  <div>
                    최상의 서비스를 제공하는{" "}
                    <span style={{ fontSize: "20px", color: "#f96332" }}>
                      다독
                    </span>
                    이 되겠습니다.
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalLarge(false)}
          >
            Close
          </Button>
          {/* <Button
            color="primary"
            type="button"
            onClick={() => setModalLive(false)}
          >
            Save changes
          </Button> */}
        </div>
      </Modal>
    </>
  );
}

export default IntroModal;
