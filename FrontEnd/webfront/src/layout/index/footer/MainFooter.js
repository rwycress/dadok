/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function MainFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <a href="https://www.ssafy.com/" target="_blank">
                  CHICKEN_EDAK
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/hellossafy/" target="_blank">
                  INSTAGRAM
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Designed by CHICKEN_EDAK
          </div>
        </Container>
      </footer>
    </>
  );
}

export default MainFooter;
