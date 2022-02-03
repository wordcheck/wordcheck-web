import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ConfirmModalAnswer,
  ConfirmModalDiv,
  ModalBackground,
} from "../../style/WordStyle";

export default function NickNameChangeSuccessModal({ setGetSuccessModal }) {
  const navigate = useNavigate();

  return (
    <ModalBackground>
      <ConfirmModalDiv>
        닉네임을 성공적으로 바꿨어요!
        <ConfirmModalAnswer
          variant="contained"
          color="success"
          sx={{ textTransform: "none" }}
          onClick={() => {
            setGetSuccessModal(false);
            navigate(-1);
          }}
        >
          확인
        </ConfirmModalAnswer>
      </ConfirmModalDiv>
    </ModalBackground>
  );
}
