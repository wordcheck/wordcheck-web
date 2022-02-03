import React from "react";
import {
  ConfirmModalAnswer,
  ConfirmModalDiv,
  FalseModalButtonDiv,
  ModalBackground,
} from "../../style/WordStyle";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function LogoutModal({ setGetLogoutModal }) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  console.log("logout", cookies);
  const onClickLogoutButtonHandler = () => {
    removeCookie("token", { path: "/wordcheck-web/" });
    navigate("/wordcheck-web/");
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
