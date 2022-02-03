import React from "react";
import {
  ConfirmModalAnswer,
  ConfirmModalDiv,
  FalseModalButtonDiv,
  ModalBackground,
} from "../../style/WordStyle";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function LogoutModal({ setGetLogoutModal }) {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const onClickLogoutButtonHandler = () => {
    cookies.remove("token");
    navigate("/wordcheck-web/login");
  };

  return (
    <ModalBackground>
      <ConfirmModalDiv>
        정말 로그아웃 하시겠습니까?
        <FalseModalButtonDiv>
          <ConfirmModalAnswer
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
            onClick={() => setGetLogoutModal(false)}
          >
            아니요
          </ConfirmModalAnswer>
          <ConfirmModalAnswer
            variant="contained"
            color="success"
            sx={{ textTransform: "none" }}
            onClick={() => onClickLogoutButtonHandler()}
          >
            네
          </ConfirmModalAnswer>
        </FalseModalButtonDiv>
      </ConfirmModalDiv>
    </ModalBackground>
  );
}
