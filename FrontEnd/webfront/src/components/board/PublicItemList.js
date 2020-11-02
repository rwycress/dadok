import React, { Component } from "react";
import CardAppEmpty from "./card/CardAppEmpty";
import { Row, Col, Alert, Input } from "antd";
import axios from "axios";

import InfiniteScroll from "react-infinite-scroll-component";

// public board Data를 받기위한 axios
const itemsPerPage = 8;
const page = 1;

const { Search } = Input;

axios({
  method: "get",
  url: `http://i3d208.p.ssafy.io:9999/chickengak/public/page/${page}/${itemsPerPage}`,
})
  .then(function (res) {
    const publicItems = res.data;
    window.sessionStorage.setItem("publicItems", JSON.stringify(publicItems));
  })
  .catch(function (res) {});

function onSearch(value) {
  window.sessionStorage.setItem("onSearch", value);
  if (window.sessionStorage.getItem("onSearch")) {
    axios({
      method: "get",
      url: `http://i3d208.p.ssafy.io:9999/chickengak/public/search?title=${window.sessionStorage.getItem(
        "onSearch"
      )}`,
    })
      .then(function (res) {
        const publicItems = res.data;
        window.sessionStorage.setItem(
          "publicItems",
          JSON.stringify(publicItems)
        );
        window.sessionStorage.removeItem("onSearch");
        window.location.reload(true);
      })
      .catch(function (res) {});
  } else {
    axios({
      method: "get",
      url: `http://i3d208.p.ssafy.io:9999/chickengak/public/page/${page}/${itemsPerPage}`,
    })
      .then(function (res) {
        const publicItems = res.data;
        window.sessionStorage.setItem(
          "publicItems",
          JSON.stringify(publicItems)
        );
      })
      .catch(function (res) {});
  }
}

const articles = JSON.parse(window.sessionStorage.getItem("publicItems"));

class PublicItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: page,
      pageArticle: articles,
      filter: this.props.filter,
    };
  }

  fetchMoreData = () => {
    this.setState((state) => {
      return {
        page: state.page + 1,
      };
    });

    axios({
      method: "get",
      url: `http://i3d208.p.ssafy.io:9999/chickengak/public/page/${this.state.page}/${itemsPerPage}`,
    })
      .then((res) => {
        const moreItems = res.data;
        window.sessionStorage.setItem("moreItems", JSON.stringify(moreItems));

        let moreArticles = JSON.parse(
          window.sessionStorage.getItem("moreItems")
        );

        this.setState((state) => {
          return {
            pageArticle: state.pageArticle.concat(moreArticles),
          };
        });
      })
      .catch(function (err) {});
  };

  render() {
    if (this.state.pageArticle.length > 0) {
      return (
        <>
          <div className="my-5 d-flex align-items-center justify-content-center">
            <Search
              className=""
              placeholder="Search"
              onSearch={onSearch}
              style={{ height: "2.5rem", width: "50%" }}
            />
          </div>
          <div>
            <InfiniteScroll
              dataLength={this.state.pageArticle.length}
              next={this.fetchMoreData}
              hasMore={true}
            >
              <Row className="d-flex">
                {this.state.pageArticle.map((item, id) => (
                  <Col sm={24} md={12} lg={8} xl={6}>
                    <CardInfo
                      className="col-4"
                      title={item.title}
                      tag={item.tag}
                      content={item.content}
                      views={item.view}
                      download={item.download}
                      finfos={item.finfos}
                      no={item.no}
                      source={item.source}
                      like={item.like}
                      key={id}
                      create_at={item.create_at}
                      update_at={item.update_at}
                    />
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="my-5">
            <Search
              className=""
              placeholder="Search Title"
              onSearch={onSearch}
              style={{ height: "2.5rem", width: "25rem" }}
            />
          </div>
          <div style={{ margin: "96px 32px 32px 32px", textAlign: "center" }}>
            <Alert
              message="게시물이 없습니다"
              description="찾으시는 자료가 존재하지 않거나 아직 자료실에 업로드된 자료가 없어요ㅠㅠ"
              type="warning"
            />
          </div>
        </>
      );
    }
  }
}

class CardInfo extends Component {
  render() {
    return (
      <>
        <CardAppEmpty {...this.props} />
      </>
    );
  }
}

export default PublicItemList;
