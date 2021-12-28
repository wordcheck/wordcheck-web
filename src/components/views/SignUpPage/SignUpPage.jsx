import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUpUser } from "../../../_actions/user_action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorButton, CssTextField } from "../../style/LoginStyle";
import styled from "styled-components";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Nickname, setNickname] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [SecretCode, setSecretCode] = useState("");
  const [CheckNickname, setCheckNickname] = useState(false);

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSecretCodeHandler = (event) => {
    setSecretCode(event.currentTarget.value);
  };

  const onNicknameCheckHandler = () => {
    const nicknameformData = new FormData();
    nicknameformData.append("nickname", Nickname);
    axios
      .post("http://52.78.37.13/api/accounts/nickname_check/", nicknameformData)
      .then((response) => {
        if (response.data.msg === "success") {
          setCheckNickname(true);
          toast.success("사용가능한 닉네임입니다.", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      })
      .catch((error) => {
        console.log("err", error);
        if (!Nickname) {
          toast.error("사용할 닉네임 값을 입력해주세요.", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error("중복된 닉네임입니다.", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!CheckNickname) {
      toast.error("아이디 중복 검사를 해주세요", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (Password !== ConfirmPassword) {
      toast.error("비밀번호를 확인해주세요", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }

    const body = {
      nickname: Nickname,
      password: Password,
      secret_code: SecretCode,
    };

    dispatch(SignUpUser(body)).then((response) => {
      if (response.payload?.msg === "success") {
        navigate("/");
        console.log("success");
        alert("회원가입에 성공했어요");
      } else {
        console.log("sign up error");
      }
    });
  };

  return (
    <Container>
      <Logo>WordCheck</Logo>
      <Info>아래 폼을 작성해주세요 </Info>
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column", width: "30vh" }}
      >
        <CssTextField
          margin="normal"
          label="Nickname"
          onChange={onNicknameHandler}
          value={Nickname}
        />
        <ColorButton type="button" onClick={onNicknameCheckHandler}>
          닉네임 중복 확인
        </ColorButton>

        <CssTextField
          label="Password"
          margin="normal"
          onChange={onPasswordHandler}
          type="password"
          value={Password}
        />

        <CssTextField
          label="Password check"
          margin="normal"
          onChange={onConfirmPasswordHandler}
          type="password"
          value={ConfirmPassword}
        />

        <CssTextField
          label="Secret code"
          margin="normal"
          onChange={onSecretCodeHandler}
          type="password"
          value={SecretCode}
        />
        <br />
        <ColorButton type="submit">회원가입</ColorButton>
        <ToastContainer />
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled.div`
  padding-top: 3vh;
  font-size: 5vh;
  font-size: bolder;
`;
const Info = styled.div`
  padding-bottom: 4vh;
  padding-top: 1vh;
`;
