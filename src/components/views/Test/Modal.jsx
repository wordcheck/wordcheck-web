import { Button } from "@mui/material";
import React from "react";
import { ColorButton } from "../../style/LoginStyle";
import {
  FalseModalButtonDiv,
  ModalAnswer,
  ModalBackground,
  ModalContainer,
  ModalInfoDiv,
} from "../../style/WordStyle";

export default function Modal({
  setOpenModal,
  isTrueAnswer,
  answer,
  correctAnswer,
  setAnswer,
}) {
  function trueModal() {
    return (
      <>
        <ModalContainer>
          <div>정답입니다!😄</div>
          <ColorButton onClick={() => setOpenModal(false)}>
            계속하기
          </ColorButton>
        </ModalContainer>
      </>
    );
  }
  function falseModal() {
    return (
      <>
        <ModalContainer isFalse>
          <div>
            <ModalInfoDiv>걱정 마세요. 외우면 됩니다!</ModalInfoDiv>
            <ModalAnswer
              variant="contained"
              color="error"
              sx={{ textTransform: "none" }}
            >
              {answer}
            </ModalAnswer>
            <ModalInfoDiv>정답</ModalInfoDiv>
            <ModalAnswer
              variant="contained"
              color="success"
              sx={{ textTransform: "none" }}
            >
              {correctAnswer}
            </ModalAnswer>
          </div>
          <FalseModalButtonDiv>
            <ColorButton>정답 처리하기</ColorButton>
            <ColorButton
              onClick={() => {
                setOpenModal(false);
                setAnswer("");
              }}
            >
              계속하기
            </ColorButton>
          </FalseModalButtonDiv>
        </ModalContainer>
      </>
    );
  }
  return (
    <>
      <ModalBackground>
        {isTrueAnswer ? trueModal() : falseModal()}
      </ModalBackground>
    </>
  );
}
