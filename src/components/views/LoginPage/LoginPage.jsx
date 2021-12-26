import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Tokencookie, setTokenCookie, removeTokenCookie] = useCookies([
    "Token",
  ]);

  const Token = useSelector((state) => state.user.Token);
  const [Nickname, setNickname] = useState("");
  const [Password, setPassword] = useState("");

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const body = {
      nickname: Nickname,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload) {
        console.log("login");
        setTokenCookie("Token", response.payload, { path: "/" });
        navigate("/");
        console.log("reduxtoken", Token);
      } else {
        console.log("login error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>Nickname</label>
        <input value={Nickname} onChange={onNicknameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
        {/* <Link to="signup">
          <button>sign up </button>
        </Link> */}
      </form>
    </div>
  );
}
