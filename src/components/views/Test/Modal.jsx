import React from "react";
import { ModalBackground, ModalContainer } from "../../style/WordStyle";

export default function Modal({ setOpenModal, isTrueAnswer }) {
  function trueModal() {
    return (
      <>
        <div>정답입니다!😄</div>
        <button onClick={() => setOpenModal(false)}>계속하기</button>
      </>
    );
  }
  function falseModal() {
    return (
      <>
        <div>걱정 마세요. 외우면 됩니다!</div>
        <div>"틀린답"</div>
        <div>정답</div>
        <div>"정답"</div>
        <button>정답으로 처리하기</button>
        <button onClick={() => setOpenModal(false)}>계속하기</button>
      </>
    );
  }
  return (
    <>
      <ModalBackground>
        <ModalContainer>
          {isTrueAnswer ? trueModal() : falseModal()}
        </ModalContainer>
      </ModalBackground>
    </>
  );
}
