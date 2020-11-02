import React, { useState } from "react";
import axios from "axios";
import CustomWithdrawal from "./CustomWithdrawal";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Modal,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
// core components

function CustomProfile() {
  const state = {};
  //
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [secondFocus, setSecondFocus] = React.useState(false);
  const [thirdFocus, setThirdFocus] = React.useState(false);
  const [fourthFocus, setFourthFocus] = React.useState(false);
  const [fifthFocus, setFifthFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);

  const [inputs, setInputs] = useState({
    name: window.sessionStorage.getItem("name"),
    nickname: window.sessionStorage.getItem("nickname"),
    email: window.sessionStorage.getItem("email"),
    phone: window.sessionStorage.getItem("phone"),
    info: window.sessionStorage.getItem("info"),
  });

  const { name, nickname, email, phone, profile, info } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onFinish = () => {
    var params = new URLSearchParams();
    params.append("name", name);
    params.append("nickname", nickname);
    params.append("email", email);
    params.append("phone", phone);

    params.append("info", info);

    axios
      .put(
        `http://i3d208.p.ssafy.io:9999/chickengak/user?id=${window.sessionStorage.getItem(
          "id"
        )}&password=${window.sessionStorage.getItem("password")}`,
        params
      )
      .then(function (res) {
        axios
          .post(
            `http://i3d208.p.ssafy.io:9999/chickengak/user/my?id=${window.sessionStorage.getItem(
              "id"
            )}&password=${window.sessionStorage.getItem("password")}`
          )
          .then(function (res) {
            window.sessionStorage.setItem("no", res.data.no);
            window.sessionStorage.setItem("name", res.data.name);
            window.sessionStorage.setItem("nickname", res.data.nickname);
            window.sessionStorage.setItem("phone", res.data.phone);
            window.sessionStorage.setItem("email", res.data.email);
            window.sessionStorage.setItem("info", res.data.info);
            window.sessionStorage.setItem("birth", res.data.birth);
            window.sessionStorage.setItem("profile", res.data.profile);
            window.location.reload(true);
          });
      })
      .catch(function (error) {});
  };

  const handleUpload = (e) => {
    const profileimg = e.target.files[0];
    let imgform = new FormData();
    imgform.append("file", profileimg);

    axios.post(
      `http://i3d208.p.ssafy.io:9999/chickengak/file/upload/profile/${window.sessionStorage.getItem(
        "no"
      )}`,
      imgform,
      {
        headers: {
          "Content-Type": "multipart/form-data; boundary=---profileimg",
        },
      }
    );
  };

  //

  const [modalLive, setModalLive] = React.useState(false);
  return (
    <>
      <button className="photo-container" onClick={() => setModalLive(true)}>
        {window.sessionStorage.getItem("profile") !== "null" ? (
          <img alt="..." src={window.sessionStorage.getItem("profile")}></img>
        ) : (
          <img
            alt="..."
            src={require("../../assets/img/default-avatar.png")}
          ></img>
        )}
      </button>

      <Modal toggle={() => setModalLive(false)} isOpen={modalLive}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            회원 정보
          </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setModalLive(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <Container>
            <Col className="ml-auto mr-auto mt-3">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="content-center"></div>
                  </CardHeader>
                  <CardBody>
                    {/* 프로필 사진 */}
                    <input
                      accept="image/*"
                      className="my-4"
                      type="file"
                      name="profileimg"
                      onChange={handleUpload}
                    ></input>

                    {/* 이름 */}
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Input your name"
                        name="name"
                        onChange={onChange}
                        value={name}
                        type="text"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>

                    {/* 닉네임 */}
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (secondFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Input your nickname"
                        name="nickname"
                        onChange={onChange}
                        value={nickname}
                        type="text"
                        onFocus={() => setSecondFocus(true)}
                        onBlur={() => setSecondFocus(false)}
                      ></Input>
                    </InputGroup>

                    {/* email */}
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (thirdFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Input your E-mail"
                        name="email"
                        onChange={onChange}
                        value={email}
                        type="email"
                        onFocus={() => setThirdFocus(true)}
                        onBlur={() => setThirdFocus(false)}
                      ></Input>
                    </InputGroup>

                    {/* phone */}
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (fourthFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Input your phone"
                        name="phone"
                        onChange={onChange}
                        value={phone}
                        onFocus={() => setFourthFocus(true)}
                        onBlur={() => setFourthFocus(false)}
                      ></Input>
                    </InputGroup>

                    {/* 하고 싶은말 */}
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Input your info"
                        name="info"
                        onChange={onChange}
                        value={info}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>

        <div className="modal-footer">
          <Button color="primary" type="button" onClick={onFinish}>
            저장
          </Button>

          <CustomWithdrawal />
        </div>
      </Modal>
    </>
  );
}

export default CustomProfile;
