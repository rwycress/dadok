import React from "react";
import styled from "styled-components";
import Slide from "react-reveal/Slide";
import axios from "axios";

import MemoHeader from "./MemoHeader";
import MemotempList from "./MemotempList";
import MemoForm from "./MemoForm";

const MyMemo = styled.div`
  width: 80%;
  height: 90%;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto;

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

// const MemoContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 90%;
// `;

const MemoInput = styled.div`
  align-items: center;
  padding: 30px 30px 0 30px;
  border-bottom: 1px solid #eee;
`;

const MemoBox = styled.div`
  align-items: center;
  padding: 30px;
  overflow-y: auto;

  display: flex;
  justify-content: center;
  text-align: center;
`;

class Memotemp2 extends React.Component {
  state = {
    notes: [{ no: "", title: "", content: "", user_no: "" }],
    note: {},

    url: "http://i3d208.p.ssafy.io:9999/chickengak/memo",
    user_no: window.sessionStorage.getItem("no"),
  };

  getMemos = async () => {
    const notes = await axios.get(
      `${this.state.url}?user_no=${window.sessionStorage.getItem("no")}`
    );

    const tempnotes = notes.data;

    var newnotes = tempnotes.map((value, index) => {
      var tempcontent = value.content;
      var rescontent = tempcontent.replace(/(<br>|<br\/>|<br \/>)/g, "\n");

      return {
        no: value.no,
        user_no: value.user_no,
        title: value.title,
        content: rescontent,
        create_at: value.create_at,
        update_at: value.update_at,
      };
    });

    this.setState({ notes: newnotes });
  };

  deleteMemo = async (no) => {
    await axios.delete(`${this.state.url}?no=${no}`);

    this.getMemos();
  };

  createMemo = async (data) => {
    var tempcontent = data.content;
    tempcontent = tempcontent.replace(/(\n|\r\n)/g, "<br/>");
    data.content = tempcontent;

    await axios.post(
      `${this.state.url}?content=${tempcontent}&title=${
        data.title
      }&user_no=${window.sessionStorage.getItem("no")}`
    );

    this.getMemos();
  };

  updateMemo = async (data) => {
    this.setState({ note: {} });
    await axios.put(
      `${this.state.url}?content=${data.content}&no=${data.no}&title=${
        data.title
      }&user_no=${window.sessionStorage.getItem("no")}`
    );
    this.getMemos();
  };

  componentDidMount() {
    this.getMemos();
  }

  onDelete = (no) => {
    this.deleteMemo(no);
  };
  onEdit = (data) => {
    this.setState({ note: data });
  };

  onFormSubmit = (data) => {
    if (data.isEdit) {
      this.updateMemo(data);
    } else {
      this.createMemo(data);
    }
  };

  render() {
    return (
      <Slide bottom>
        <MyMemo>
          <MemoHeader />

          <MemoInput>
            <MemoForm note={this.state.note} onFormSubmit={this.onFormSubmit} />
          </MemoInput>

          <div>
            <MemoBox>
              <MemotempList
                notes={this.state.notes}
                onDelete={this.onDelete}
                onEdit={this.onEdit}
              />
            </MemoBox>
          </div>
        </MyMemo>
      </Slide>
    );
  }
}

export default Memotemp2;
