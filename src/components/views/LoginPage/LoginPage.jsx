import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { ColorButton, CssTextField } from "../../style/LoginStyle";
// import Button from "@mui/material/Button";

export default function LoginPage() {
  // const [Tokencookie, setTokenCookie, removeTokenCookie] = useCookies([
  //   "Token",
  // ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

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
    const formData = new FormData();
    formData.append("nickname", Nickname);
    formData.append("password", Password);

    axios
      .post("http://52.78.37.13/api/accounts/normal_login/", formData)
      .then((response) => {
        if (response) {
          console.log("login success");
          console.log(response);
          cookies.set("Token", response.account_token, { path: "/" });
          cookies.set("Nickname", response.nickname, { path: "/" });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("==>", err);
        if (!Nickname) {
          toast.error("닉네임을 입력해주세요", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else if (!Password) {
          toast.error("패스워드를 입력해주세요", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error("아이디나 패스워드가 올바르지 않아요.", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  return (
    <Container
      style={{
        // width: "80%",
        // height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Logo>WordCheck</Logo>
      <form
        onSubmit={onSubmitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CssTextField
          fullWidth
          label="Nickname"
          value={Nickname}
          onChange={onNicknameHandler}
        />
        <CssTextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        />

        <ColorButton type="submit">Login</ColorButton>
      </form>
      <Link to="signup">
        <div>Sign up </div>
      </Link>
      <ToastContainer />
    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.div`
  font-size: 5vh;
  font-weight: bolder;
  padding-top: 20vh;
  padding-bottom: 3vh;
`;

export const InputDiv = styled.div`
  width: 80%;
`;

export const ButtonDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2vh;
`;
