import React from "react";
import styled from "styled-components";

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid #eee;

  height: 10vh;
`;

const MainTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
`;

class MemoHeader extends React.Component {
  render() {
    return (
      <Head>
        <MainTitle>
          <span style={{ verticalAlign: "middle" }}>메모장</span>
        </MainTitle>
      </Head>
    );
  }
}

export default MemoHeader;
