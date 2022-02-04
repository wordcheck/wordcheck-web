import React from "react";
import {
  ConfirmModalAnswer,
  ConfirmModalDiv,
  ModalBackground,
} from "../../style/WordStyle";

export default function ({ setGetProfileChangeModal }) {
  return (
    <ModalBackground>
      <ConfirmModalDiv>
        프로필 사진을 성공적으로 바꿨습니다
        <ConfirmModalAnswer
          variant="contained"
          color="success"
          sx={{ textTransform: "none" }}
          onClick={() => setGetProfileChangeModal(false)}
        >
          확인
        </ConfirmModalAnswer>
      </ConfirmModalDiv>
    </ModalBackground>
  );
}
