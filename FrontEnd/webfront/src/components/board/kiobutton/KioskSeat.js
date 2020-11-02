import React, { Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import moment from "moment";
import "./timespanpicker.css";
import axios from "axios";

import { Button, Container, Row, Col } from "reactstrap";
import KioskScroll from "./KioskScroll copy";
import { DatePicker } from "antd";
import "./KioskSeat.css";
import backimg from "../../../assets/ourdesign/kioskback.jpg";

//live Clock
import Clock from "react-live-clock";

// Material ui

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { style } from "d3";

// 좌석예약 초기화
// window.sessionStorage.removeItem("seatNo");

const config = {
  labelsPAdding: 13,
  segmentsColorsArray: ["#ddd"],
  defaultInnerRadiusIndex: 1.4,
  defaultChartPadding: 60,
};

class CircularTimespanpicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    outerRadius: PropTypes.number,
    innerRadius: PropTypes.number,
    showResults: PropTypes.bool,
    onClick: PropTypes.func,
    interval: (props, propName, componentName) => {
      const interval = props[propName];
      if (!Number.isInteger(interval) || interval > 60 || 60 % interval) {
        return new Error(
          `Invalid prop ${propName} supplied to ${componentName}. Validation failed.
                    Expects integer equal or less than 60 and 60 is divisible by it`
        );
      }
    },
    boundaryHour: (props, propName, componentName) => {
      const boundaryHour = props[propName];
      if (!Number.isInteger(boundaryHour) || boundaryHour > 24) {
        return new Error(
          `Invalid prop ${propName} supplied to ${componentName}. Validation failed.
                    Expects integer less than 24`
        );
      }
    },
  };

  static defaultProps = {
    outerRadius: 80,
    interval: 60, // 간격(분)
    boundaryHour: 0, // 0부터 시작
    showResults: true,
    onClick: (value) => {},
  };

  componentWillMount() {
    let {
      outerRadius,
      innerRadius,
      interval,
      boundaryHour,
      onClick,
      showResults,
    } = this.props;
    innerRadius =
      innerRadius && innerRadius < outerRadius
        ? innerRadius
        : outerRadius / config.defaultInnerRadiusIndex;

    const width = outerRadius * 2 + config.defaultChartPadding;
    const segmentsInHour = 60 / interval; // 1칸엔 1시간
    const totalNumberOfSegments = 1440 / interval; // 24시간
    // const totalNumberOfSegments = 720 / interval
    const boundaryIsPostMeridiem = boundaryHour > 12;

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => 1);
    const segmentsArray = pie(new Array(totalNumberOfSegments));
    const hoursLabelsArray = pie(new Array(24));
    const colorScale = d3
      .scaleOrdinal()
      .domain([0, 1, 2])
      .range(config.segmentsColorsArray);
    const segmentsArcFn = d3
      .arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);
    const minutesArcFn = d3
      .arc()
      .outerRadius(outerRadius + config.labelsPAdding)
      .innerRadius(outerRadius + config.labelsPAdding)
      .startAngle((d) => d.startAngle + Math.PI / totalNumberOfSegments)
      .endAngle((d) => d.endAngle + Math.PI / totalNumberOfSegments);
    const hoursArcFn = d3
      .arc()
      .outerRadius(outerRadius + config.labelsPAdding)
      .innerRadius(outerRadius + config.labelsPAdding)
      .startAngle((d) => d.startAngle)
      .endAngle((d) => d.endAngle - 0.26);

    const initialObject = {
      interval,
      boundaryHour,
      width,
      segmentsInHour,
      boundaryIsPostMeridiem,
      segmentsArcFn,
      minutesArcFn,
      hoursArcFn,
      segmentsArray,
      showResults,
      onClick,
      hoursLabelsArray,
      colorScale,
      innerRadius,
      outerRadius,
      totalNumberOfSegments,
    };
    this.setState({ initialObject });
  }

  /* On click on segment convert simple segment's value [startValue, endValue] in moment.js object and save it in a state as "chosen" */
  handleClick(clickedValue, isEntered) {
    /* skip handling if click anf hover were started out of segments*/
    if (isEntered && !this.state.initialObject.mouseIsClickedDown) return;
    const clickedStartValue = clickedValue[0];
    const clickedFinishValue = clickedValue[1];
    const {
      initialObject: { boundaryHour, onClick },
      ...segments
    } = this.state;
    const segmentPreviousValue = segments[clickedFinishValue];
    const segmentCurrentValue = {
      [String(clickedFinishValue)]: segmentPreviousValue
        ? null
        : [
            moment()
              .set("hour", boundaryHour)
              .set("minute", 0)
              .minute(clickedStartValue),
            moment()
              .set("hour", boundaryHour)
              .set("minute", 0)
              .minute(clickedFinishValue),
          ],
    };

    this.setState(segmentCurrentValue);
    onClick({ ...segments, ...segmentCurrentValue });
  }

  /* Define an hours labels. "showSingleBoundaryHour" set displaying of doubled boundary hours (e.g. '8|20', '16|4') */
  getHoursLabels(boundary, index, showSingleBoundaryHour) {
    const hour24 = index + 12,
      hour12 = showSingleBoundaryHour ? index : index || "00",
      isInBottomQuadrants = index > 3 && index < 10;

    if (boundary > 12) {
      boundary = boundary - 12;
      if (index === boundary)
        return showSingleBoundaryHour
          ? hour24
          : isInBottomQuadrants
          ? `${hour24} | ${hour12}`
          : `${hour12} | ${hour24}`;
      return index < boundary ? hour12 : hour24;
    } else {
      if (index === boundary)
        return showSingleBoundaryHour
          ? hour12
          : isInBottomQuadrants
          ? `${hour12} | ${hour24}`
          : `${hour24} | ${hour12}`;
      return index < boundary ? hour24 : hour12;
    }
  }

  /* combine the neighbour short time spans in one union (e.g. '5:20-5:30' and '5:30-5:40' will be combined in a '5:20-5:40') */
  getReducedArray(state) {
    const keysArr = Object.keys(state).filter(
      (key) => key !== "initialObject" && state[key]
    );
    if (keysArr.length) {
      if (keysArr.length === 1) {
        /* if is single, returns it - no needs to combine */
        return [state[keysArr[0]]];
      } else {
        /* combine time spans */
        let reducedArr = keysArr.reduce((prev, currentKey) => {
          let tempArr = Array.isArray(prev) ? prev : [state[prev]],
            lastElement = tempArr[tempArr.length - 1],
            currentElement = state[currentKey];

          if (!currentElement[0].diff(lastElement[1], "minutes")) {
            /*if last element finished in the same time current started, combine them as ['start of the last', 'end of the current]*/
            tempArr[tempArr.length - 1] = [lastElement[0], currentElement[1]];
          } else {
            tempArr.push(currentElement);
          }
          return tempArr;
        });

        return reducedArr;
      }
    }
    /* if there is no chosen spans in the state, returns empty array */
    return [];
  }

  // getBoundaryLinesRotationDegree() {
  //   let { boundaryHour, boundaryIsPostMeridiem } = this.state.initialObject;
  //   return 30 * (boundaryIsPostMeridiem ? boundaryHour - 12 : boundaryHour);
  //   /* 1 hour = 360 / 12 = 30 degrees */
  // }
  setSegmentsValue(index) {
    const {
      interval,
      boundaryHour,
      totalNumberOfSegments,
      segmentsInHour,
      boundaryIsPostMeridiem,
    } = this.state.initialObject;
    index = boundaryIsPostMeridiem ? index + totalNumberOfSegments : index;
    const boundaryIndex = boundaryHour * segmentsInHour;
    const recalculatedIndex =
      index -
      boundaryIndex +
      (index < boundaryIndex ? totalNumberOfSegments : 0);
    const startMinutes = recalculatedIndex * interval;
    return [startMinutes, startMinutes + interval];
  }

  storeMouseIsClickedDown(mouseIsClickedDown) {
    const { initialObject } = this.state;
    this.setState({ initialObject: { ...initialObject, mouseIsClickedDown } });
  }

  render() {
    if (!this.state.initialObject) return null;
    const {
      interval,
      boundaryHour,
      width,
      segmentsInHour,
      segmentsArcFn,
      minutesArcFn,
      hoursArcFn,
      segmentsArray,
      hoursLabelsArray,
      colorScale,
      outerRadius,
      innerRadius,
      showResults,
    } = this.state.initialObject;

    return (
      <div
        className="timepickerwrapper"
        onMouseDown={() => {
          this.storeMouseIsClickedDown(true);
        }}
        onMouseUp={() => {
          this.storeMouseIsClickedDown(false);
        }}
        onMouseLeave={() => {
          this.storeMouseIsClickedDown(false);
        }}
      >
        <svg width={width} height={width} style={{ margin: "20px 0 20px 0" }}>
          <g transform={`translate(${width / 2},${width / 2})`}>
            {segmentsArray.map((item, index) => (
              <Segment
                key={index}
                index={index}
                item={item}
                segmentArcFn={segmentsArcFn}
                minutesArcFn={minutesArcFn}
                label={((index % segmentsInHour) + 1) * interval}
                fill={colorScale(Math.floor(index / segmentsInHour) % 2)}
                value={this.setSegmentsValue(index)}
                handleClick={this.handleClick.bind(this)}
                isActive={this.state[this.setSegmentsValue(index)[1]]}
              />
            ))}
            <g className="hoursLabelsGroup">
              {hoursLabelsArray.map((item, index) => (
                <text
                  key={index}
                  className={`hourLabel${
                    index === boundaryHour ? " boundary" : ""
                  }`}
                  transform={`translate(${hoursArcFn.centroid(item)})`}
                  dy=".35em"
                  style={{ textAnchor: "middle" }}
                >
                  {this.getHoursLabels(boundaryHour, index, true)}
                </text>
              ))}
            </g>
            {/* <g className="boundaryGroup">
            <path
                className="boundaryLine"
                d={`M 0 -${innerRadius - 20} V -${outerRadius + 4}`}
                transform={`rotate(${this.getBoundaryLinesRotationDegree()})`}
              />
            </g> */}
          </g>
        </svg>

        <h6 style={{ color: "white" }}>Selected Time</h6>
        {showResults ? (
          <TimeResults results={this.getReducedArray(this.state)} />
        ) : null}
      </div>
    );
  }
}
// export default CircularTimespanpicker;

/* Stateless Components */
function TimeResults(props) {
  const { results } = props;
  return results.length ? (
    <div className="result">
      {/* <h6 style={{ color: "white" }}>Selected Time</h6> */}
      {results.map((segment, n) =>
        segment.length ? (
          <p key={n}>
            {segment[0].format("H:mm")} - {segment[1].format("H:mm")}
            {/* 시간 예약 데이터 */}
            {window.sessionStorage.setItem(
              "firstTime",
              segment[0].format("YYYY-MM-DD H:mm:ss")
            )}
            {window.sessionStorage.setItem(
              "lastTime",
              segment[1].format("YYYY-MM-DD H:mm:ss")
            )}
          </p>
        ) : null
      )}
    </div>
  ) : null;
}

function Segment(props) {
  const {
    item,
    segmentArcFn,
    minutesArcFn,
    label,
    fill,
    value,
    handleClick,
    isActive,
  } = props;
  return (
    <g
      className={`segment${isActive ? " active" : ""}`}
      onClick={() => {
        handleClick(value);
      }}
      onMouseDown={() => {
        handleClick(value, true);
      }}
    >
      <path
        d={segmentArcFn(item)}
        fill={fill}
        onMouseLeave={() => {
          handleClick(value, true);
        }}
        onDragLeave={() => {
          handleClick(value, true);
        }}
        onMouseDown={() => {
          handleClick(value, true);
        }}
      />
      {label === 60 ? null : (
        <text
          className="minuteLabel"
          transform={`translate(${minutesArcFn.centroid(item)})`}
          dy=".35em"
        >
          {label}
        </text>
      )}
    </g>
  );
}

var year = new Date().getFullYear();
var month = new Date().getMonth();
var day = new Date().getDate();
var date = year + "." + (month + 1) + "." + day;

axios({
  method: "get",
  url: `http://i3d208.p.ssafy.io:9999/chickengak/resv/seat/date?date=${date}&seat_no=${window.sessionStorage.getItem(
    "seatNo"
  )}`,
})
  .then(function (res) {
    window.sessionStorage.setItem("seatData", JSON.stringify(res.data));
  })
  .catch(function (err) {});

// 좌석 확인

function onSearch() {
  axios({
    method: "get",
    url: `http://i3d208.p.ssafy.io:9999/chickengak/resv/seat/date?date=${date}&seat_no=${window.sessionStorage.getItem(
      "seatNo"
    )}`,
  })
    .then(function (res) {
      window.sessionStorage.setItem("seatData", JSON.stringify(res.data));
      window.location.reload(true);
    })
    .catch(function (err) {});
}

// 예약 진행

function onReserve() {
  axios({
    method: "post",
    url: "http://i3d208.p.ssafy.io:9999/chickengak/resv/",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    data: JSON.stringify({
      start: window.sessionStorage.getItem("firstTime"),
      end: window.sessionStorage.getItem("lastTime"),
      seat_no: window.sessionStorage.getItem("seatNo"),
      user_no: window.sessionStorage.getItem("no"),
    }),
  })
    .then(function (res) {
      axios({
        method: "get",
        url: `http://i3d208.p.ssafy.io:9999/chickengak/resv/seat/date?date=${date}&seat_no=${window.sessionStorage.getItem(
          "seatNo"
        )}`,
      })
        .then(function (res) {
          window.sessionStorage.setItem("seatData", JSON.stringify(res.data));
          window.location.reload(true);
        })
        .catch(function (err) {});
    })
    .catch(function (error) {
      alert("예약에 실패했습니다. \n로그인 또는 예약 시간을 확인해 주세요.");
    });
}

// 좌석 예약 삭제

const datas = JSON.parse(window.sessionStorage.getItem("seatData"));

function onDelete(value) {
  axios({
    method: "delete",
    url: `http://i3d208.p.ssafy.io:9999/chickengak/resv/${value}`,
  })
    .then(function (res) {
      axios({
        method: "get",
        url: `http://i3d208.p.ssafy.io:9999/chickengak/resv/seat/date?date=${date}&seat_no=${window.sessionStorage.getItem(
          "seatNo"
        )}`,
      })
        .then(function (res) {
          window.sessionStorage.setItem("seatData", JSON.stringify(res.data));

          alert("예약이 취소되었습니다.");
          window.location.reload(true);
        })
        .catch(function (err) {});
    })
    .catch(function (err) {});
}

function onLogout() {
  window.sessionStorage.clear();
  axios({
    method: "get",
    url: "http://i3d208.p.ssafy.io:9999/chickengak/user/logout",
  });
}

class KioskTable extends Component {
  render() {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                className="text-white"
                style={{
                  textAlign: "center",
                  fontSize: "0.8rem",
                  width: "10%",
                }}
              >
                No
              </TableCell>
              <TableCell
                className="text-white"
                style={{
                  textAlign: "center",
                  fontSize: "0.8rem",
                  width: "25%",
                }}
              >
                시작
              </TableCell>
              <TableCell
                className="text-white"
                style={{
                  textAlign: "center",
                  fontSize: "0.8rem",
                  width: "25%",
                }}
              >
                종료
              </TableCell>
              <TableCell
                className="text-white"
                style={{
                  textAlign: "center",
                  fontSize: "0.8rem",
                  width: "40%",
                }}
              >
                예약 변경
              </TableCell>
            </TableRow>
          </TableHead>
          {datas ? (
            <TableBody>
              {datas.map((data, id) => (
                <TableRow>
                  <TableCell
                    className="text-white"
                    style={{ textAlign: "center", fontSize: "0.8rem" }}
                  >
                    {id + 1}
                  </TableCell>
                  <TableCell
                    className="text-white table_text"
                    style={{ textAlign: "center", fontSize: "0.8rem" }}
                  >
                    {String(new Date(data.start).getHours())} 시
                  </TableCell>
                  <TableCell
                    className="text-white"
                    style={{ textAlign: "center", fontSize: "0.8rem" }}
                  >
                    {String(new Date(data.end).getHours())} 시
                  </TableCell>
                  <TableCell
                    className="text-white"
                    style={{ textAlign: "center", fontSize: "0.8rem" }}
                  >
                    {window.sessionStorage.getItem("no") ===
                      (data.user_no += "") &&
                    window.sessionStorage.getItem("no") !== "2" ? (
                      <Button
                        className="btn-round btn-white"
                        color="white"
                        outline
                        size="default"
                        onClick={() => {
                          onDelete(data.no);
                        }}
                      >
                        예약취소
                      </Button>
                    ) : (
                      <p></p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <p></p>
          )}
        </Table>
      </TableContainer>
    );
  }
}

class KioskSeat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Kiosk user 가져오기.
    axios({
      method: "get",
      url: "http://i3d208.p.ssafy.io:9999/chickengak/user/kiosk",
    })
      .then(function (res) {
        window.sessionStorage.setItem("no", res.data.no);
        window.sessionStorage.setItem("nickname", res.data.nickname);
      })
      .catch(function (err) {});
    return (
      <>
        <div id="bg">
          <img src={backimg} alt="" />
        </div>

        <div className="content-center" style={{ padding: "50px 0 30px 0" }}>
          {/* <div className="content-center"> */}

          {window.sessionStorage.getItem("seatNo") === null ? (
            <Container>
              <Row>
                <Col
                  lg="4"
                  className="d-flex flex-column justify-content-between"
                  style={{ paddingBottom: "20px" }}
                >
                  <div
                    style={{
                      margin: "0px 0 10px 0",
                      fontSize: "1rem",
                      borderBottom: "medium initial white",
                    }}
                  >
                    <p></p>
                  </div>
                  <div className="room-back m-auto">
                    <div className="room-container ">
                      <div className="room-row">
                        <div className="room-cell-bottom">
                          <div
                            className="seat"
                            onClick={() => {
                              window.sessionStorage.setItem("seatNo", "1");
                              onSearch();
                            }}
                          ></div>
                        </div>
                        <div className="room-cell-bottom">
                          <div
                            className="seat"
                            onClick={() => {
                              window.sessionStorage.setItem("seatNo", "2");
                              onSearch();
                            }}
                          ></div>
                        </div>
                        <div className="room-cell-bottom">
                          <div
                            className="seat"
                            onClick={() => {
                              window.sessionStorage.setItem("seatNo", "3");
                              onSearch();
                            }}
                          ></div>
                        </div>
                        <div className="room-cell-bottom">
                          <div
                            className="seat"
                            onClick={() => {
                              window.sessionStorage.setItem("seatNo", "4");
                              onSearch();
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="room-row">
                        <div className="room-cell-top">
                          <div
                            className="seat-reverse"
                            onClick={() => {
                              window.sessionStorage.setItem("seatNo", "5");
                              onSearch();
                            }}
                          ></div>
                        </div>
                        <div className="room-cell-top">
                          <div
                            className="seat-reverse"
                            onClick={() => {
                              window.sessionStorage.setItem("seatNo", "6");
                              onSearch();
                            }}
                          ></div>
                        </div>
                        <div className="room-cell-top">
                          <div
                            className="seat-reverse"
                            onClick={() => {
                              window.sessionStorage.setItem("seatNo", "7");
                              onSearch();
                            }}
                          ></div>
                        </div>
                        <div className="room-cell-top">
                          <div
                            className="seat-reverse"
                            onClick={() => {
                              window.sessionStorage.setItem("seatNo", "8");
                              onSearch();
                            }}
                          ></div>
                        </div>
                      </div>
                      <div style={{ display: "table-row" }}>
                        <div className="room-cell-bottom">
                          <div
                            className="seat"
                            onClick={() => {
                              window.sessionStorage.setItem("seatNo", "9");
                              onSearch();
                            }}
                          ></div>
                        </div>
                        <div className="room-cell-bottom">
                          <div
                            className="seat"
                            onClick={() => {
                              window.sessionStorage.setItem("seatNo", "10");
                              onSearch();
                            }}
                          ></div>
                        </div>
                        <div className="room-cell-bottom">
                          <div
                            className="seat"
                            onClick={() => {
                              window.sessionStorage.setItem("seatNo", "11");
                              onSearch();
                            }}
                          ></div>
                        </div>
                        <div className="room-cell-bottom">
                          <div
                            className="seat"
                            onClick={() => {
                              window.sessionStorage.setItem("seatNo", "12");
                              onSearch();
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <KioskScroll /> */}
                  <div
                    style={{
                      margin: "20px 0 10px 0",
                      fontSize: "1rem",
                      borderBottom: "medium initial white",
                    }}
                  >
                    1. 좌석을 먼저 선택해주세요.
                  </div>
                </Col>
              </Row>
            </Container>
          ) : (
            <Container>
              <Row>
                <Col
                  lg="4"
                  className="d-flex flex-column justify-content-between"
                  style={{ paddingBottom: "20px" }}
                >
                  <div
                    style={{
                      margin: "0px 0 10px 0",
                      fontSize: "1rem",
                      borderBottom: "medium initial white",
                    }}
                  >
                    <p>좌석 번호 : {window.sessionStorage.getItem("seatNo")}</p>
                    {window.sessionStorage.getItem("no") !== "2" ? (
                      <p>
                        {window.sessionStorage.getItem("nickname")}님
                        환영합니다.!!
                      </p>
                    ) : (
                      <p>비로그인 유저입니다.</p>
                    )}
                  </div>
                  <div className="room-back m-auto">
                    <div className="room-container ">
                      <div className="room-row">
                        <div className="room-cell-bottom">
                          {window.sessionStorage.getItem("seatNo") === "1" ? (
                            <div
                              className="seat-search"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "1");
                                onSearch();
                              }}
                            ></div>
                          ) : (
                            <div
                              className="seat"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "1");
                                onSearch();
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="room-cell-bottom">
                          {window.sessionStorage.getItem("seatNo") === "2" ? (
                            <div
                              className="seat-search"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "2");
                                onSearch();
                              }}
                            ></div>
                          ) : (
                            <div
                              className="seat"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "2");
                                onSearch();
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="room-cell-bottom">
                          {window.sessionStorage.getItem("seatNo") === "3" ? (
                            <div
                              className="seat-search"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "3");
                                onSearch();
                              }}
                            ></div>
                          ) : (
                            <div
                              className="seat"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "3");
                                onSearch();
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="room-cell-bottom">
                          {window.sessionStorage.getItem("seatNo") === "4" ? (
                            <div
                              className="seat-search"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "4");
                                onSearch();
                              }}
                            ></div>
                          ) : (
                            <div
                              className="seat"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "4");
                                onSearch();
                              }}
                            ></div>
                          )}
                        </div>
                      </div>
                      <div className="room-row">
                        <div className="room-cell-top">
                          {window.sessionStorage.getItem("seatNo") === "5" ? (
                            <div
                              className="seat-reverse-search"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "5");
                                onSearch();
                              }}
                            ></div>
                          ) : (
                            <div
                              className="seat-reverse"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "5");
                                onSearch();
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="room-cell-top">
                          {window.sessionStorage.getItem("seatNo") === "6" ? (
                            <div
                              className="seat-reverse-search"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "6");
                                onSearch();
                              }}
                            ></div>
                          ) : (
                            <div
                              className="seat-reverse"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "6");
                                onSearch();
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="room-cell-top">
                          {window.sessionStorage.getItem("seatNo") === "7" ? (
                            <div
                              className="seat-reverse-search"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "7");
                                onSearch();
                              }}
                            ></div>
                          ) : (
                            <div
                              className="seat-reverse"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "7");
                                onSearch();
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="room-cell-top">
                          {window.sessionStorage.getItem("seatNo") === "8" ? (
                            <div
                              className="seat-reverse-search"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "8");
                                onSearch();
                              }}
                            ></div>
                          ) : (
                            <div
                              className="seat-reverse"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "8");
                                onSearch();
                              }}
                            ></div>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "table-row" }}>
                        <div className="room-cell-bottom">
                          {window.sessionStorage.getItem("seatNo") === "9" ? (
                            <div
                              className="seat-search"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "9");
                                onSearch();
                              }}
                            ></div>
                          ) : (
                            <div
                              className="seat"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "9");
                                onSearch();
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="room-cell-bottom">
                          {window.sessionStorage.getItem("seatNo") === "10" ? (
                            <div
                              className="seat-search"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "10");
                                onSearch();
                              }}
                            ></div>
                          ) : (
                            <div
                              className="seat"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "10");
                                onSearch();
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="room-cell-bottom">
                          {window.sessionStorage.getItem("seatNo") === "11" ? (
                            <div
                              className="seat-search"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "11");
                                onSearch();
                              }}
                            ></div>
                          ) : (
                            <div
                              className="seat"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "11");
                                onSearch();
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="room-cell-bottom">
                          {window.sessionStorage.getItem("seatNo") === "12" ? (
                            <div
                              className="seat-search"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "12");
                                onSearch();
                              }}
                            ></div>
                          ) : (
                            <div
                              className="seat"
                              onClick={() => {
                                window.sessionStorage.setItem("seatNo", "12");
                                onSearch();
                              }}
                            ></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <KioskScroll /> */}
                  <div
                    style={{
                      margin: "20px 0 10px 0",
                      fontSize: "1rem",
                      borderBottom: "medium initial white",
                    }}
                  >
                    1. 좌석이 선택 되었습니다.
                  </div>
                </Col>
                <Col lg="4" style={{ paddingBottom: "20px" }}>
                  <div style={{ height: "70vh" }}>
                    <div
                      style={{
                        color: "white",
                        fontSize: "1rem",
                        height: "10%",
                      }}
                    >
                      <Clock format={"YYYY년 MM월 DD일 HH시"} />
                    </div>

                    {/* <DatePicker
                    onChange={onChange}
                    style={{ marginBottom: "20px" }}
                  /> */}
                    <div style={{ height: "90%", overflowY: "auto" }}>
                      <CircularTimespanpicker />
                    </div>
                  </div>
                  <div
                    style={{
                      margin: "50px 0 10px 0",
                      fontSize: "1rem",
                    }}
                  >
                    2. 사용시간을 이어지게 선택해주세요.
                  </div>
                </Col>
                <Col lg="4" style={{ paddingBottom: "20px" }}>
                  {/* <div
                    style={{
                      marginBottom: "20px",
                      color: "white",
                      fontSize: "1rem",
                    }}
                  >
                    <Clock
                      format={"YYYY년 MM월 DD일 HH시"}
                      style={{ color: "white" }}
                    />
                  </div> */}

                  {/* <DatePicker
                    onChange={onChange}
                    style={{ marginBottom: "20px" }}
                  /> */}
                  {/* <CircularTimespanpicker /> */}
                  <div style={{ height: "70vh" }}>
                    <div
                      style={{
                        color: "white",
                        fontSize: "1rem",
                        height: "10%",
                      }}
                    >
                      오늘의 예약현황
                    </div>
                    <div style={{ height: "90%", overflowY: "auto" }}>
                      <KioskTable />
                    </div>
                  </div>

                  <div
                    style={{
                      margin: "50px 0 10px 0",
                      fontSize: "1rem",
                    }}
                  >
                    3. 예약 후 현황을 확인하세요.
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="4"></Col>
                <Col lg="4"></Col>
                <Col lg="4" style={{ fontSize: "1rem" }}>
                  <Button
                    className="btn-round btn-white"
                    color="white"
                    outline
                    size="default"
                    onClick={onReserve}
                    style={{ marginRight: "20px" }}
                  >
                    Reserve
                  </Button>

                  {window.sessionStorage.getItem("no") !== "2" ? (
                    <Button
                      className="btn-round btn-white"
                      color="white"
                      outline
                      size="default"
                      href="http://192.168.137.169:5000/"
                      onClick={onLogout}
                      style={{ marginLeft: "20px" }}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      className="btn-round btn-white"
                      color="white"
                      outline
                      size="default"
                      href="http://192.168.137.169:5000/"
                      onClick={onLogout}
                      style={{ marginLeft: "20px" }}
                    >
                      Home
                    </Button>
                  )}
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </>
    );
  }
}

export default KioskSeat;
