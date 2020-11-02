import React, { Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import moment from "moment";
import "./timespanpicker.css";
import axios from "axios";
import { Button, Container, Row, Col } from "reactstrap";

import KioskScroll from "../board/kiobutton/KioskScroll copy";
import { DatePicker } from "antd";
import "../board/kiobutton/KioskSeat copy.css";
import backimg from "../../assets/ourdesign/kioskback.jpg";

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
        <Container>
          <Row>
            <Col>
              <svg width={width} height={width}>
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
            </Col>
            <Col>
              {showResults ? (
                <TimeResults results={this.getReducedArray(this.state)} />
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
// export default CircularTimespanpicker;

/* Stateless Components */
function TimeResults(props) {
  const { results } = props;
  window.sessionStorage.setItem("reserveResults", results[0]);
  return results.length ? (
    <div className="results">
      <h6 style={{ color: "white" }}>Selected Time</h6>
      {results.map((segment, n) =>
        segment.length ? (
          <p key={n}>
            {segment[0].format("H:mm")} - {segment[1].format("H:mm")}
            {/* 시간 예약 데이터 */}
            {window.sessionStorage.setItem(
              "firstTime",
              segment[0].format("YYYY.MM.DD H")
            )}
            {window.sessionStorage.setItem(
              "lastTime",
              segment[1].format("YYYY.MM.DD H")
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

function onChange(date, dateString) {}

function onReserve() {
  axios({
    method: "post",
    url: `http://i3d208.p.ssafy.io:9999/chickengak/resv?end=${window.sessionStorage.getItem(
      "lastTime"
    )}%2022&seat_no=2&start=${window.sessionStorage.getItem(
      "firstTime"
    )}%2021&user_no=2`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      start: window.sessionStorage.getItem("firstTime"),
      end: window.sessionStorage.getItem("lastTime"),
      seat_no: 2,
      user_no: 2,
    },
  })
    .then(function (res) {})
    .catch(function (error) {});
}

// 좌석 예약

class KioskSeat extends Component {
  constructor(props) {
    super(props);
    this.state = [
      {
        seatNo: "1",
      },
      {
        seatNo: "2",
      },
    ];
  }

  render() {
    return (
      <>
        <div id="bg">
          <img src={backimg} alt="" />
        </div>

        <div className="content-center">
          <Container>
            <Row>
              <Col xs="12" sm="8">
                <div className="room-back m-auto">
                  <div className="room-container ">
                    <div className="room-row">
                      <div className="room-cell-bottom">
                        <div className="seat"></div>
                      </div>
                      <div className="room-cell-bottom">
                        <div className="seat"></div>
                      </div>
                      <div className="room-cell-bottom">
                        <div className="seat"></div>
                      </div>
                      <div className="room-cell-bottom">
                        <div className="seat"></div>
                      </div>
                    </div>
                    <div className="room-row">
                      <div className="room-cell-top">
                        <div className="seat-reverse"></div>
                      </div>
                      <div className="room-cell-top">
                        <div className="seat-reverse"></div>
                      </div>
                      <div className="room-cell-top">
                        <div className="seat-reverse"></div>
                      </div>
                      <div className="room-cell-top">
                        <div className="seat-reverse"></div>
                      </div>
                    </div>
                    <div style={{ display: "table-row" }}>
                      <div className="room-cell-bottom">
                        <div className="seat"></div>
                      </div>
                      <div className="room-cell-bottom">
                        <div className="seat"></div>
                      </div>
                      <div className="room-cell-bottom">
                        <div className="seat"></div>
                      </div>
                      <div className="room-cell-bottom">
                        <div className="seat"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <KioskScroll />
              </Col>

              <Col xs="12" sm="4">
                <DatePicker
                  onChange={onChange}
                  style={{ marginBottom: "20px" }}
                />
                <CircularTimespanpicker />
                <Row>
                  <Col>
                    <Button
                      className="btn-round btn-white"
                      color="white"
                      outline
                      size="default"
                      onClick={this.onReserve}
                    >
                      Select
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="btn-round btn-white"
                      color="white"
                      outline
                      size="default"
                      href="/"
                    >
                      Back
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default KioskSeat;
