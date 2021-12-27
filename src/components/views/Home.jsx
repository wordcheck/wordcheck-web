import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ColorButton } from "../style/LoginStyle";

// 로그인한 유저만 들어올 수 있음
export default function Home() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const isCookieToken = cookies.get("Token");
  const Nickname = cookies.get("Nickname");

  if (!isCookieToken) {
    return <Navigate to="/login" />;
  }

  const onClickLogoutHandler = () => {
    cookies.remove("Token");
    cookies.remove("Nickname");
    navigate("/login");
  };

  return (
    <div>
      <div>wordcheck</div>
      <Link to="/cardcreate" style={{ textDecoration: "none" }}>
        <ColorButton>단어장 추가하기</ColorButton>
      </Link>
      <div> </div>

      <div>안녕하세요 {Nickname} 님 </div>
      <button onClick={onClickLogoutHandler}>logout</button>
    </div>
  );
}
