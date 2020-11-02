import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Modal } from "reactstrap";
// core components

const datas = JSON.parse(window.sessionStorage.getItem("seatData"));

function CustomWithdrawal() {
  const [modalLive, setModalLive] = React.useState(false);

  const onDelete = () => {
    axios
      .delete(
        `http://i3d208.p.ssafy.io:9999/chickengak/user?id=${window.sessionStorage.getItem(
          "id"
        )}&password=${window.sessionStorage.getItem("password")}`
      )
      .then(function (res) {
        window.sessionStorage.clear();
        window.location.reload(true);
      })
      .catch(function (error) {});
  };
  return (
    <>
      <Button
        color="secondary"
        type="button"
        onClick={() => setModalLive(true)}
      >
        회원탙퇴
      </Button>
      <Modal toggle={() => setModalLive(false)} isOpen={modalLive}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            회원 탈퇴
          </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setModalLive(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>정말로 회원 탈퇴 하시겠습니까?</p>
        </div>
        <div className="modal-footer">
          <Link to="/">
            <Button color="secondary" type="button" onClick={onDelete}>
              예
            </Button>
          </Link>
        </div>
      </Modal>
    </>
  );
}

export default CustomWithdrawal;
