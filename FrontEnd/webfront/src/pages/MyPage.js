import React from "react";

// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";
import RubberBand from "react-reveal/RubberBand";

// core components
import HeaderNavbar from "../components/index/header/HeaderNavbar";
import ProfilePageHeader from "../components/index/header/ProfilePageHeader";

import LikedItemList from "../components/MyPageLiked/LikedItemList";

// import TodoTemplate from "../components/TodoComp/TodoTemplate";
// import MemoTemplate2 from "../components/MemoComp/MemoTemplate2";
import Memotemp2 from "../components/MemoComp2/Memotemp2";
import TodoList from "../components/TodoComp2/TodoList";

function MyPage() {
  const [pills, setPills] = React.useState("1");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  }, []);

  return (
    <>
      <HeaderNavbar />
      <div className="wrapper">
        <ProfilePageHeader />
        <div className="section">
          <Container>
            <div>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">For you</h4>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <RubberBand>
                        <NavLink
                          className={pills === "1" ? "active" : ""}
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            setPills("1");
                          }}
                        >
                          <i className="now-ui-icons ui-2_favourite-28"></i>
                        </NavLink>
                      </RubberBand>
                    </NavItem>
                    <NavItem>
                      <RubberBand>
                        <NavLink
                          className={pills === "2" ? "active" : ""}
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            setPills("2");
                          }}
                        >
                          <i className="now-ui-icons files_single-copy-04"></i>
                        </NavLink>
                      </RubberBand>
                    </NavItem>
                    <NavItem>
                      <RubberBand>
                        <NavLink
                          className={pills === "3" ? "active" : ""}
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            setPills("3");
                          }}
                        >
                          <i className="now-ui-icons design_bullet-list-67"></i>
                        </NavLink>
                      </RubberBand>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              <TabContent className="gallery" activeTab={"pills" + pills}>
                <TabPane tabId="pills1">
                  <LikedItemList />
                </TabPane>
                <TabPane tabId="pills2">
                  <Memotemp2 />
                </TabPane>
                <TabPane tabId="pills3">
                  <TodoList />
                </TabPane>
              </TabContent>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
export default MyPage;
