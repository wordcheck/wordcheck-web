import axios from "axios";
import { LOGIN_USER, SIGNUP_USER } from "./types";

export async function loginUser(dataToSubmit) {
  const formData = new FormData();
  formData.append("nickname", dataToSubmit?.nickname);
  formData.append("password", dataToSubmit?.password);
  const request = await axios
    .post(`${process.env.REACT_APP_API}accounts/normal_login/`, formData)
    .then((response) => response.data)
    .catch((err) => {
      console.log("==>", err);
    });

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function SignUpUser(dataToSubmit) {
  const formData = new FormData();
  formData.append("nickname", dataToSubmit?.nickname);
  formData.append("password", dataToSubmit?.password);
  formData.append("secret_code", dataToSubmit?.secret_code);
  const request = axios
    .post(`${process.env.REACT_APP_API}accounts/normal_signup/`, formData)
    .then((response) => response.data)
    .catch((err) => {
      console.log("==>", err);
    });

  return {
    type: SIGNUP_USER,
    payload: request,
  };
}
