import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ConfirmModalAnswer,
  ConfirmModalDiv,
  FalseModalButtonDiv,
  ModalBackground,
} from "../../style/WordStyle";

export default function WithdrawalModal({
  setGetWithdrawalModal,
  cookies,
  nickname,
  removeCookie,
}) {
  const navigate = useNavigate();
  const onClickWithdrawalBtnHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_API}accounts/${nickname}/`, {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then(() => {
        removeCookie("token", { path: "/wordcheck-web/" });
        navigate("/wordcheck-web/");
      });
  };

  return (
    <ModalBackground>
      <ConfirmModalDiv>
        정말 계정을 삭제하시겠습니까?
        <FalseModalButtonDiv>
          <ConfirmModalAnswer
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
            onClick={() => {
              setGetWithdrawalModal(false);
            }}
          >
            아니오
          </ConfirmModalAnswer>
          <ConfirmModalAnswer
            variant="contained"
            color="success"
            sx={{ textTransform: "none" }}
            onClick={() => {
              onClickWithdrawalBtnHandler();
            }}
          >
            네
          </ConfirmModalAnswer>
        </FalseModalButtonDiv>
      </ConfirmModalDiv>
    </ModalBackground>
  );
}
