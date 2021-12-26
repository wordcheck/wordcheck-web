import axios from "axios";
import { LOGIN_USER, SIGNUP_USER } from "./types";

export async function loginUser(dataToSubmit) {
  //  console.log("asdf", dataToSubmit);
  const formData = new FormData();
  formData.append("nickname", dataToSubmit?.nickname);
  formData.append("password", dataToSubmit?.password);
  const request = axios
    .post("http://52.78.37.13/api/accounts/normal_login/", formData)
    .then((response) => response.data.account_token)
    .catch((err) => {
      console.log("==>", err);
    });

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function SignUpUser(dataToSubmit) {
  //  console.log("asdf", dataToSubmit);
  const formData = new FormData();
  formData.append("nickname", dataToSubmit?.nickname);
  formData.append("password", dataToSubmit?.password);
  formData.append("secret_code", dataToSubmit?.secret_code);
  const request = axios
    .post("http://52.78.37.13/api/accounts/normal_signup/", formData)
    .then((response) => response.data)
    .catch((err) => {
      console.log("==>", err);
    });

  return {
    type: SIGNUP_USER,
    payload: request,
  };
}
