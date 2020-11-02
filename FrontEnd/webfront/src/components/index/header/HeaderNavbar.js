import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// reactstrap components
import {
  UncontrolledCollapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
// core components

function HeaderNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (collapseOpen) {
        setNavbarColor("");
      } else {
        if (
          //===============================================================
          //현재 그림을 벗어나면 주황색으로 바뀌는걸 만들고 싶었던거 같은데
          //그림을 벗어나도 600px를 넘지 않으면 주황색으로 안바뀜
          //document.documentElement.scrollTop > 600 ||
          //document.body.scrollTop > 600
          document.documentElement.scrollTop > window.innerHeight + 14 ||
          document.body.scrollTop > window.innerHeight + 14
          //Modify by jsh
          //=============================================================
        ) {
          setNavbarColor("");
        } else if (
          //============================================================
          // document.documentElement.scrollTop < 601 ||
          // document.body.scrollTop < 601
          //
          document.documentElement.scrollTop < window.innerHeight + 15 ||
          document.body.scrollTop < window.innerHeight + 15
          //Modify by jsh
          //=============================================================
        ) {
          setNavbarColor("navbar-transparent");
        }
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  const onLogout = () => {
    window.sessionStorage.clear();
  };

  const isLogged = window.sessionStorage.getItem("id");

  const onPublicBoard = () => {
    axios
      .get("http://i3d208.p.ssafy.io:9999/chickengak/public")
      .then(function (res) {
        // window.sessionStorage.setItem(res.data);
        const publicBoard = res.data;

        window.sessionStorage.setItem(
          "publicBoard",
          JSON.stringify(publicBoard)
        );
        // window.sessionStorage.setItem(publicBoard);
      })
      .catch(function (error) {});
  };

  if (isLogged) {
    return (
      <>
        {collapseOpen ? (
          <div
            id="bodyClick"
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              setCollapseOpen(false);
            }}
          />
        ) : null}
        <Navbar
          className={"fixed-top " + navbarColor}
          expand="sm"
          color="primary"
        >
          <Container>
            <NavbarBrand className="font-weight-bold" href="/">
              <span className="h4 mb-0">Dadok</span>
            </NavbarBrand>
            <button
              className="navbar-toggler"
              id="navbarNavDropdown"
              type="button"
            >
              <span className="navbar-toggler-icon">
                <i class="text-light fas fa-bars"></i>
              </span>
            </button>
            <UncontrolledCollapse navbar toggler="#navbarNavDropdown">
              <Nav>
                <div className="d-flex justify-content-end">
                  <NavItem className="">
                    <NavLink href="/Reserve">Reserve</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav>
                    <DropdownToggle
                      aria-haspopup={true}
                      caret
                      color="default"
                      data-toggle="dropdown"
                      id="navbarDropdownMenuLink"
                      nav
                      onClick={(e) => e.preventDefault()}
                    >
                      Board
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                      <DropdownItem href="/PublicBoard" onClick={onPublicBoard}>
                        Public Items
                      </DropdownItem>
                      <DropdownItem href="/RequestBoard">
                        Request for an Item
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  <NavItem className="">
                    <Link to="/MyPage">
                      <NavLink>My Page</NavLink>
                    </Link>
                  </NavItem>

                  <NavItem className="">
                    <NavLink href="/" onClick={onLogout}>
                      Logout
                    </NavLink>
                  </NavItem>
                </div>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  }
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar
        className={"fixed-top " + navbarColor}
        expand="sm"
        color="primary"
      >
        <Container>
          <NavbarBrand className="font-weight-bold" href="/">
            <span className="h4 mb-0">Dadok</span>
          </NavbarBrand>
          <button
            className="navbar-toggler"
            id="navbarNavDropdown"
            type="button"
          >
            <span className="navbar-toggler-icon">
              <i class="text-light fas fa-bars"></i>
            </span>
          </button>
          <UncontrolledCollapse navbar toggler="#navbarNavDropdown">
            <Nav>
              <div className="d-flex justify-content-end">
                <NavItem className="">
                  <NavLink href="/Reserve">Reserve</NavLink>
                </NavItem>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    aria-haspopup={true}
                    caret
                    color="default"
                    data-toggle="dropdown"
                    id="navbarDropdownMenuLink"
                    nav
                    onClick={(e) => e.preventDefault()}
                  >
                    Board
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                    <DropdownItem href="/PublicBoard" onClick={onPublicBoard}>
                      Public Items
                    </DropdownItem>
                    <DropdownItem href="/RequestBoard">
                      Request for an Item
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <NavItem className="p-0">
                  <NavLink
                    href="/CustomLogin"
                    // onClick={(e) => e.preventDefault()}
                  >
                    Login
                  </NavLink>
                </NavItem>
                <NavItem className="p-0">
                  <NavLink
                    href="./CreateCustom"
                    // onClick={(e) => e.preventDefault()}
                  >
                    Signup
                  </NavLink>
                </NavItem>
              </div>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HeaderNavbar;
