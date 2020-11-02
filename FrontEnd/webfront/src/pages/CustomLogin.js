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
import LoginAnimation from "../layout/index/header/LoginAnimation";

function CustomLogin() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);

  // 로그인

  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });

  const { id, password } = inputs;

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
    // 로그인 axios
    axios
      .post("http://i3d208.p.ssafy.io:9999/chickengak/user/login/", params)
      .then(function (res) {
        window.sessionStorage.setItem("id", id);
        window.sessionStorage.setItem("password", password);

        // 회원정보 가져오는 axios
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
          })
          .catch(function (error) {});
      })
      .catch(function (error) {});
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
            <LoginAnimation />
            <Col className="ml-auto mr-auto mt-3" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="content-center"></div>
                  </CardHeader>
                  <CardBody>
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
                        placeholder="Input your password"
                        name="password"
                        onChange={onChange}
                        value={password}
                        type="password"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Link to="/" refresh="true">
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        size="lg"
                        onClick={onFinish}
                      >
                        Login
                      </Button>
                    </Link>

                    <div className="pull-left">
                      <h6>
                        <a className="link" href="./CreateCustom">
                          Create Account
                        </a>
                      </h6>
                    </div>
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
