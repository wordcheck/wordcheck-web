import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Mypage() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const onClickLogoutHandler = () => {
    cookies.remove("Token");
    cookies.remove("Nickname");
    navigate("/login");
  };
  return (
    <div>
      mypage <button onClick={onClickLogoutHandler}>Sign out</button>
    </div>
  );
}
