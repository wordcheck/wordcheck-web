import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import TextField from "@mui/material/TextField";
import { styled as muiStyled } from "@mui/material/styles";
import styled from "styled-components";
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

    const body = {
      nickname: Nickname,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload) {
        console.log("login success");
        console.log(response.payload);
        cookies.set("Token", response.payload.account_token, { path: "/" });
        cookies.set("Nickname", response.payload.nickname, { path: "/" });
        navigate("/");
      } else {
        console.log("login error");
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
      <Logo>wordcheck</Logo>
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

        <Button type="submit">Login</Button>
      </form>
      <Link to="signup">
        <div>Sign up </div>
      </Link>
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

const CssTextField = muiStyled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#bfbfbf",
    },
    "&:hover fieldset": {
      borderColor: "#bfbfbf",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

export const ButtonDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2vh;
`;

export const Button = styled.button`
  border-radius: 5px;
  /* box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2); */
  width: ${(props) => props.buttonWidth || "100%"};
  background-color: Green;
  border: none;
  color: white;
  padding: 1vh;
  text-align: center;
  /* text-decoration: none; */
  display: inline-block;
  font-size: 2.5vh;
  margin: 1vh;
`;
