import { LOGIN_USER, SIGNUP_USER } from "../_actions/types";

export default function (state = { wef: "wefwf" }, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, Token: action.payload };
      break;
    case SIGNUP_USER:
      return { ...state, SignUp: action.payload };
      break;
    default:
      return state;
  }
}
