import { Button } from "@mui/material";
import axios from "axios";
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
  setCurrentNo,
  currentNo,
  cookies,
  wordList,
  wrongWords,
  setWrongWords,
  setWrongWordsInMul,
}) {
  const OnClickAnswerProcessingHandler = () => {
    axios
      .patch(
        `http://52.78.37.13/api/words/${wordList[currentNo].id}/test/?state=correct`,
        {},
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      )
      .then((response) => console.log(response));
    console.log("fixorrect");
    setWrongWords(wrongWords.filter((item) => item.spelling !== correctAnswer));
    setWrongWordsInMul(
      wrongWords.filter((item) => item.meaing !== correctAnswer)
    );
    setCurrentNo(currentNo + 1);
    setAnswer("");
    setOpenModal(false);
  };

  function TrueModal() {
    return (
      <>
        <ModalContainer>
          <div>정답입니다!😄</div>
          <ColorButton
            onClick={() => {
              setOpenModal(false);
              setCurrentNo(currentNo + 1);
            }}
          >
            계속하기
          </ColorButton>
        </ModalContainer>
      </>
    );
  }
  function FalseModal() {
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
            <ColorButton
              onClick={() => {
                OnClickAnswerProcessingHandler();
              }}
            >
              정답 처리하기
            </ColorButton>
            <ColorButton
              onClick={() => {
                setOpenModal(false);
                setAnswer("");
                setCurrentNo(currentNo + 1);
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
        {isTrueAnswer ? TrueModal() : FalseModal()}
      </ModalBackground>
    </>
  );
}
