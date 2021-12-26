import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

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
      <div>home</div>
      <div>안녕하세요 {Nickname} 님 </div>
      <button onClick={onClickLogoutHandler}>logout</button>
    </div>
  );
}
