import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUpUser } from "../../../_actions/user_action";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Nickname, setNickname] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [SecretCode, setSecretCode] = useState("");

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
      // console.log("dispatch", response.payload.msg);
      if (response.payload?.msg === "success") {
        
        navigate(-1);
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
      </form>
    </div>
  );
}
