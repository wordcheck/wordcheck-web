import axios from "axios";
import React from "react";
import {
  ConfirmModalAnswer,
  ConfirmModalDiv,
  FalseModalButtonDiv,
  ModalBackground,
} from "../../style/WordStyle";

export default function DeleteModal({
  setGetDeleteModal,
  setIsDeleteWord,
  deleteWordId,
  setDeleteWordId,
  cookies,
}) {
  const onClickDeleteWordButtonHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_API}words/${deleteWordId}`, {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((response) => {
        setDeleteWordId("");
      })
      .catch((error) => {
        // console.log("err===>", error);
      });

    setGetDeleteModal(false);

    setIsDeleteWord(true);
  };

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
            onClick={() => onClickDeleteWordButtonHandler()}
          >
            네
          </ConfirmModalAnswer>
        </FalseModalButtonDiv>
      </ConfirmModalDiv>
    </ModalBackground>
  );
}
