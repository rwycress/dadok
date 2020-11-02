import React, { Component } from "react";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

class SideNavigation extends Component {
  render() {
    return (
      <div>
        <SideNav
          className="bg-primary"
          onSelect={(selected) => {
            // Add your code here
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
              <NavIcon>
                <i
                  className="fa fa-fw fa-home"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem eventKey="board">
              <NavIcon>
                <i
                  className="fa fas fa-chalkboard"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Board</NavText>
              <NavItem eventKey="board/public">
                <NavText>공용자료</NavText>
              </NavItem>
              <NavItem eventKey="board/request">
                <NavText>자료요청</NavText>
              </NavItem>
            </NavItem>

            <NavItem eventKey="charts">
              <NavIcon>
                <i
                  className="fa fa-fw fa-chart-line"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Statistics</NavText>
              <NavItem eventKey="charts/linechart">
                <NavText>이용 통계</NavText>
              </NavItem>
              <NavItem eventKey="charts/barchart">
                <NavText>나의 공부 습관</NavText>
              </NavItem>
            </NavItem>
            <NavItem eventKey="info">
              <NavIcon>
                <i className="fa fas fa-info" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>About Us</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </div>
    );
  }
}

export default SideNavigation;
