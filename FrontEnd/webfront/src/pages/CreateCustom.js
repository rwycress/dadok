import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

// core components
import HeaderNavbar from "../components/index/header/HeaderNavbar";
import MainFooter from "../layout/index/footer/MainFooter";
import SignupAnimation from "../layout/index/header/SignupAnimation";

function CustomLogin() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [secondFocus, setSecondFocus] = React.useState(false);
  const [thirdFocus, setThirdFocus] = React.useState(false);
  const [fourthFocus, setFourthFocus] = React.useState(false);
  const [fifthFocus, setFifthFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);

  const [inputs, setInputs] = useState({
    id: "",
    password: "",
    email: "",
    name: "",
    nickname: "",
    phone: "",
  });

  const { id, password, email, name, nickname, phone } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onFinish = () => {
    var params = new URLSearchParams();
    params.append("id", id);
    params.append("password", password);
    params.append("email", email);
    params.append("name", name);
    params.append("nickname", nickname);
    params.append("phone", phone);

    axios
      .post("http://i3d208.p.ssafy.io:9999/chickengak/user/", params)
      .then(function (res) {});
  };

  React.useEffect(() => {
    document.body.classList.add("login-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
    };
  }, []);
  return (
    <>
      <HeaderNavbar />
      <div className="page-header">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../assets/ourdesign/coffeedesk.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <SignupAnimation />
            <Col className="ml-auto mr-auto mt-3" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="content-center"></div>
                  </CardHeader>
                  <CardBody>
                    {/* 아이디 */}
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
                        placeholder="Input your id"
                        name="id"
                        onChange={onChange}
                        value={id}
                        type="text"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>

                    {/* 비밀번호 */}
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
                        placeholder="Input your password"
                        name="password"
                        onChange={onChange}
                        value={password}
                        type="password"
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

                    {/* 이름 */}
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
                        placeholder="Input your name"
                        name="name"
                        onChange={onChange}
                        value={name}
                        onFocus={() => setFourthFocus(true)}
                        onBlur={() => setFourthFocus(false)}
                      ></Input>
                    </InputGroup>

                    {/* 별명 */}
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (fifthFocus ? " input-group-focus" : "")
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
                        onFocus={() => setFifthFocus(true)}
                        onBlur={() => setFifthFocus(false)}
                      ></Input>
                    </InputGroup>

                    {/* 핸드폰 번호 */}
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
                        placeholder="Input your phone number"
                        name="phone"
                        onChange={onChange}
                        value={phone}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Link to="/">
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        size="lg"
                        onClick={onFinish}
                      >
                        Sign up
                      </Button>
                    </Link>
                    <div className="pull-right">
                      <h6>
                        <a className="link" href="./">
                          Cancle
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
      <MainFooter />
    </>
  );
}

export default CustomLogin;
