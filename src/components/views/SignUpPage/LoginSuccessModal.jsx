import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ConfirmModalAnswer,
  ConfirmModalDiv,
  ModalBackground,
} from "../../style/WordStyle";

export default function LoginSuccessModal() {
  const navigate = useNavigate();
  return (
    <ModalBackground>
      <ConfirmModalDiv>
        회원가입에 성공했습니다!
        <ConfirmModalAnswer
          variant="contained"
          color="success"
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/wordcheck-web/")}
        >
          확인
        </ConfirmModalAnswer>
      </ConfirmModalDiv>
    </ModalBackground>
  );
}
