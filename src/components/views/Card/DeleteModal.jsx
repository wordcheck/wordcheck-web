import React from "react";
import {
  ConfirmModalAnswer,
  ConfirmModalDiv,
  FalseModalButtonDiv,
  ModalBackground,
} from "../../style/WordStyle";

export default function DeleteModal({ setGetDeleteModal }) {
  return (
    <ModalBackground>
      <ConfirmModalDiv>
        해당 단어를 지우시겠습니까?
        <FalseModalButtonDiv>
          <ConfirmModalAnswer
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
            onClick={() => setGetDeleteModal(false)}
          >
            아니요
          </ConfirmModalAnswer>
          <ConfirmModalAnswer
            variant="contained"
            color="success"
            sx={{ textTransform: "none" }}
          >
            네
          </ConfirmModalAnswer>
        </FalseModalButtonDiv>
      </ConfirmModalDiv>
    </ModalBackground>
  );
}
