import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { ColorButton, CssTextField } from "../../style/LoginStyle";
import { useCookies } from "react-cookie";
// import Button from "@mui/material/Button";

export default function LoginPage({ setCookie }) {
  const navigate = useNavigate();

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
      .post("http://wordcheck.sulrae.com/api/accounts/normal_login/", formData)
      .then((response) => {
        if (response.data) {
          setCookie("token", response.data.account_token, {
            path: "/",
          });
          setCookie("nickname", response.data.nickname, {
            path: "/",
          });
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
          toast.error("닉네임이나 패스워드가 올바르지 않아요.", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  return (
    <Container
      style={{
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
          width: "30vh",
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

        <ColorButton style={{ marginTop: "1vh", padding: "1vh" }} type="submit">
          Login
        </ColorButton>
      </form>
      <Link
        to="signup"
        style={{ textDecoration: "none", color: "black", paddingTop: "1vh" }}
      >
        <div>Sign up</div>
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
