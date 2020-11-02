import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import CreateCustom from "./pages/CreateCustom";
import CustomLogin from "./pages/CustomLogin";
import IndexBase from "./layout/IndexBase";
import PublicBoardBase from "./layout/PublicBoardBase";
import RequestBoardBase from "./layout/RequestBoardBase";
import Reserve from "./components/board/kiobutton/Reserve";
import KioskSeat from "./components/board/kiobutton/KioskSeat";
import KioskHeader from "./components/board/kiobutton/KioskHeader";
import MyPage from "./pages/MyPage";

export default () => (
  <Router>
    <Route exact path="/" component={IndexBase}></Route>
    <Route path="/CreateCustom" component={CreateCustom}></Route>
    <Route path="/CustomLogin" component={CustomLogin}></Route>
    <Route path="/MyPage" component={MyPage}></Route>

    <Route path="/PublicBoard" component={PublicBoardBase}></Route>
    <Route path="/RequestBoard" component={RequestBoardBase}></Route>

    <Route path="/Kiosk" component={KioskHeader}></Route>
    <Route path="/KioskSeat" component={KioskSeat}></Route>
    <Route path="/Reserve" component={Reserve}></Route>
  </Router>
);
