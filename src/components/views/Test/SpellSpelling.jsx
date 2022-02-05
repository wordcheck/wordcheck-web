//

import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorButton, CssTextField } from "../../style/WordStyle";
import {
  AnswerDiv,
  BackButton,
  Container,
  MultipleChoiceDiv,
  QuestionDiv,
  TopNav,
  TopNavDivContainer,
} from "../../style/WordStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TestEnd from "./TestEnd";
import Modal from "./Modal";

export default function SpellSpellingTest({ cookies }) {
  const [isTrueAnswer, setIsTrueAnswer] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentNo, setCurrentNo] = useState(0);
  const [wrongWords, setWrongWords] = useState([]);
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const OnChangeInputHandler = (e) => {
    setAnswer(e.target.value);
  };

  const onClickSpellingInputHandler = () => {
    if (wordList[currentNo].spelling == answer) {
      axios.patch(
        `${process.env.REACT_APP_API}words/${wordList[currentNo].id}/test/?state=correct`,
        {},
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      );
      // .then((response) => console.log(response));
      setModalOpen(true);
      setIsTrueAnswer(true);
      setCorrectAnswer(wordList[currentNo].spelling);
      // setCurrentNo(currentNo + 1);
      setAnswer("");
    } else {
      // setCurrentNo(currentNo + 1);
      axios
        .patch(
          `${process.env.REACT_APP_API}words/${wordList[currentNo].id}/test/?state=wrong`,
          {},
          {
            headers: {
              Authorization: cookies.token,
            },
          }
        )
        .then((response) => {
          let lastWrongWords = [...wrongWords];
          let nextWrongWords = {
            spelling: wordList[currentNo].spelling,
            meaning: wordList[currentNo].meaning,
            category: wordList[currentNo].category,
          };
          lastWrongWords.push(nextWrongWords);
          setWrongWords(lastWrongWords);
          setCorrectAnswer(wordList[currentNo].spelling);
          setIsTrueAnswer(false);
        })
        .catch((error) => {
          console.log("err===>", error);
        });
    }
  };

  // Link에서 가져온 wordList
  const wordList = location.state.wordlist;
  function enterkey() {
    if (window.event.keyCode == 13) {
      // 엔터키가 눌렸을 때 실행됨
      setModalOpen(true);
      onClickSpellingInputHandler();
    }
  }

  if (currentNo == wordList.length) {
    return <TestEnd wrongWords={wrongWords} />;
  }
  return (
    <Container>
      <TopNavDivContainer>
        <BackButton onClick={() => navigate("/wordcheck-web/home")}>
          <ArrowBackIosIcon />
        </BackButton>
        <TopNav>
          <div className="wordscount">
            {currentNo + 1} of {wordList.length}
          </div>
        </TopNav>
      </TopNavDivContainer>

      <QuestionDiv>{wordList[currentNo].meaning}</QuestionDiv>
      <AnswerDiv>
        <CssTextField
          onKeyUp={enterkey}
          value={answer}
          onChange={(e) => OnChangeInputHandler(e)}
          sx={{ m: 1, width: "65vw" }}
          id="standard-basic"
          label="정답을 입력해주세요"
          autoComplete="off"
          // variant="standard"
        />
        <ColorButton
          sx={{ height: "55px" }}
          onClick={() => {
            setModalOpen(true);
            onClickSpellingInputHandler();
          }}
        >
          제출
        </ColorButton>
      </AnswerDiv>
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          isTrueAnswer={isTrueAnswer}
          answer={answer}
          correctAnswer={correctAnswer}
          setAnswer={setAnswer}
          setCurrentNo={setCurrentNo}
          currentNo={currentNo}
          cookies={cookies}
          wordList={wordList}
          setWrongWords={setWrongWords}
          wrongWords={wrongWords}
        />
      )}
    </Container>
  );
}
