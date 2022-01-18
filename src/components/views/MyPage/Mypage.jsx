import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, NameDiv } from "../../style/WordStyle";

import { ColorButton } from "../../style/LoginStyle";
import { pictureSRC } from "../../../utils/ ProfilePicture";

export default function Mypage({ cookies, removeCookie }) {
  const navigate = useNavigate();

  const onClickLogoutHandler = () => {
    if (window.confirm("정말 로그아웃하시겠습니까?")) {
      removeCookie("token");
      removeCookie("nickname");
      navigate("/");
    }
  };

  return (
    <Container>
      <img src={pictureSRC} alt="profilePicture" width="70%" height="90%" />
      <NameDiv>{cookies.nickname}님 </NameDiv>
      <ColorButton onClick={() => onClickLogoutHandler()}>Sign out</ColorButton>
    </Container>
  );
}
