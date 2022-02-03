import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ConfirmModalAnswer,
  ConfirmModalDiv,
  FalseModalButtonDiv,
  ModalBackground,
} from "../../style/WordStyle";
export default function ConfirmModal({
  wordList,
  cookies,
  setFailAlert,
  setConfirm,
}) {
  const navigate = useNavigate();
  const onClickConfirmAnswerHandler = (ans) => {
    const formData = new FormData();
    if (ans) {
      Promise.all(
        wordList.map((wordList) => {
          formData.append("contents", wordList.contents);
          formData.append("spelling", wordList.spelling);
          formData.append("category", wordList.category);
          formData.append("meaning", wordList.meaning);
          return axios.post(`${process.env.REACT_APP_API}words/`, formData, {
            headers: {
              Authorization: cookies.token,
            },
          });
          // .then((res) => {
          //   console.log(res);
          // })
          // .catch((error) => {
          //   console.log("err==>", error);
          // });
        })
      )
        .then(() => {
          navigate(-1);
        })
        .catch((err) => {
          setFailAlert(true);
        });
    } else {
      setConfirm(false);
    }
  };

  return (
    <ModalBackground>
      <ConfirmModalDiv>
        단어를 추가하시겠습니까?
        <FalseModalButtonDiv>
          <ConfirmModalAnswer
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
            onClick={() => onClickConfirmAnswerHandler(false)}
          >
            no
          </ConfirmModalAnswer>
          <ConfirmModalAnswer
            variant="contained"
            color="success"
            sx={{ textTransform: "none" }}
            onClick={() => onClickConfirmAnswerHandler(true)}
          >
            yes
          </ConfirmModalAnswer>
        </FalseModalButtonDiv>
      </ConfirmModalDiv>
    </ModalBackground>
  );
}
