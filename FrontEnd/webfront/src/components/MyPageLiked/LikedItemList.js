import React, { Component } from "react";
import LikedCard from "./LikedCard";
import { Row, Col, Alert } from "antd";
import axios from "axios";
import { Container } from "reactstrap";
import Slide from "react-reveal/Slide";
import Zoom from "react-reveal/Zoom";

class CardInfo extends Component {
  render() {
    return (
      <>
        <LikedCard {...this.props} />
      </>
    );
  }
}

class LikedItemList extends Component {
  state = {
    likearticles: [],
  };

  getlikeArticles = async () => {
    const likearticles = await axios.get(
      `http://i3d208.p.ssafy.io:9999/chickengak/user/likes?no=${window.sessionStorage.getItem(
        "no"
      )}`
    );

    this.setState({ likearticles: likearticles.data });
  };

  componentDidMount() {
    this.getlikeArticles();
  }

  render() {
    if (this.state.likearticles.length) {
      return (
        <Container>
          <Row>
            {this.state.likearticles.map((article, id) => {
              return (
                <Col sm={24} md={12} lg={12} xl={8}>
                  <Zoom>
                    <CardInfo
                      className="col-4"
                      title={article.title}
                      content={article.content}
                      downloads={article.downloads}
                      download_url={article.download_url}
                      key={article.id}
                      tag={article.tag}
                      views={article.view}
                      download={article.download}
                      finfos={article.finfos}
                      no={article.no}
                      source={article.source}
                      like={article.like}
                      create_at={article.create_at}
                      update_at={article.update_at}
                    />
                  </Zoom>
                </Col>
              );
            })}
          </Row>
        </Container>
      );
    } else {
      return (
        <Slide bottom>
          <div style={{ margin: "96px 32px 32px 32px", textAlign: "center" }}>
            <Alert
              message="좋아요 리스트가 비어있습니다"
              description="아직 자료실에서 '좋아요'한 자료가 없습니다 ! 공용게시판에서 추가하고 편리하게 사용해보세요 !"
              type="warning"
              style={{ fontSize: "0.8rem" }}
            />
          </div>
        </Slide>
      );
    }
  }
}

export default LikedItemList;
