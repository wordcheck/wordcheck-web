import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUpUser } from "../../../_actions/user_action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Nickname, setNickname] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [SecretCode, setSecretCode] = useState("");
  const [ToastNickname, setToastNickname] = useState(false);

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

  const onClickNicknameCheckHandler = () => {
    const nicknameformData = new FormData();
    nicknameformData.append("nickname", Nickname);
    axios
      .post("http://52.78.37.13/api/accounts/nickname_check/", nicknameformData)
      .then((response) => {
        // handle success

        if (response.data.msg === "success") {
          toast.dark("사용해도 좋은 닉네임입니다.", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      })
      .catch((error) => {
        console.log("err", error);
        if (!Nickname) {
          toast.dark("사용할 닉네임 값을 입력해주세요.", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.dark("중복된 닉네임입니다.", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 일치하지 않아요");
    }

    const body = {
      nickname: Nickname,
      password: Password,
      secret_code: SecretCode,
    };

    dispatch(SignUpUser(body)).then((response) => {
      if (response.payload?.msg === "success") {
        navigate(-1);
        alert("회원가입에 성공했어요");
      } else {
        console.log("sign up error");
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
        <input onChange={onNicknameHandler} value={Nickname} />
        <button type="button" onClick={onClickNicknameCheckHandler}>
          check
        </button>
        <label>Password</label>
        <input onChange={onPasswordHandler} type="password" value={Password} />
        <label>Password check</label>
        <input
          onChange={onConfirmPasswordHandler}
          type="password"
          value={ConfirmPassword}
        />
        <label>Secret code</label>
        <input
          onChange={onSecretCodeHandler}
          type="password"
          value={SecretCode}
        />
        <br />
        <button vlaue="submit">회원가입</button>
        <ToastContainer />
      </form>
    </div>
  );
}
