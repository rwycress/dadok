import React from "react";
import styled from "styled-components";

const Head = styled.div`
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid #eee;
`;

const MainTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
`;

class TodoHeader extends React.Component {
  render() {
    return (
      <Head>
        <MainTitle>
          <span style={{ verticalAlign: "middle" }}>투두리스트</span>
        </MainTitle>
      </Head>
    );
  }
}

export default TodoHeader;
