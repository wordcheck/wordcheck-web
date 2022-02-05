import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUpUser } from "../../../_actions/user_action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorButton, CssTextField } from "../../style/WordStyle";
import styled from "styled-components";
import { Container, ToastInfoDiv } from "../../style/WordStyle";
import LoginSuccessModal from "./LoginSuccessModal";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Nickname, setNickname] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [CheckNickname, setCheckNickname] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onNicknameCheckHandler = () => {
    const nicknameformData = new FormData();
    nicknameformData.append("nickname", Nickname);
    axios
      .post(
        `${process.env.REACT_APP_API}accounts/nickname_check/`,
        nicknameformData
      )
      .then((response) => {
        if (response.data.msg === "success") {
          setCheckNickname(true);
          toast.success(<ToastInfoDiv>사용가능한 닉네임입니다.</ToastInfoDiv>, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      })
      .catch((error) => {
        if (!Nickname) {
          toast.error(
            <ToastInfoDiv>사용할 닉네임 값을 입력해주세요.</ToastInfoDiv>,
            {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER,
            }
          );
        } else {
          toast.error(<ToastInfoDiv>중복된 닉네임입니다.</ToastInfoDiv>, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!CheckNickname) {
      return toast.error(
        <ToastInfoDiv>닉네임 중복 검사를 해주세요</ToastInfoDiv>,
        {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    } else if (Password !== ConfirmPassword) {
      return toast.error(
        <ToastInfoDiv>비밀번호가 올바른지 확인해주세요</ToastInfoDiv>,
        {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    }

    const body = {
      nickname: Nickname,
      password: Password,
      secret_code: "980117",
    };

    dispatch(SignUpUser(body)).then((response) => {
      if (response.payload?.msg === "success") {
        setIsLoginSuccess(true);
      } else {
        return toast.error(
          <ToastInfoDiv>
            알 수 없는 이유로 아이디 생성에 실패했습니다.
          </ToastInfoDiv>,
          {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          }
        );
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
        <br />
        <ColorButton type="submit">회원가입</ColorButton>
        <ToastContainer style={{ fontsize: "10px" }} />
      </form>
      {isLoginSuccess && <LoginSuccessModal />}
    </Container>
  );
}

const Logo = styled.div`
  padding-top: 3vh;
  font-size: 1.2em;
  font-size: bolder;
`;
const Info = styled.div`
  padding-bottom: 4vh;
  padding-top: 2vh;
  font-size: 0.6em;
`;
