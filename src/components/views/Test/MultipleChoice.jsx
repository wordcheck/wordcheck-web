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

export default function MultipleChoice({ cookies }) {
  const [isTrueAnswer, setIsTrueAnswer] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [currentNo, setCurrentNo] = useState(0);
  const [wrongWords, setWrongWords] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Link에서 가져온 wordList
  const wordList = location.state.wordlist;

  // currentNo index를 제거한 리스트를 생성
  let unshuffledfiltered = wordList.filter((element, i) => i !== currentNo);

  // currentNo index를 제거한 리스트 무작위화
  let filtered = unshuffledfiltered
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

  // 보여질 단어보기 리스트(안섞인)
  let unshuffledProblemList = [
    wordList[currentNo],
    filtered[1],
    filtered[2],
    filtered[3],
  ];
  // 보여질 단어보기 리스트(섞인)
  let problemList = unshuffledProblemList
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

  const onClickMultipleChoiceButtonHandler = (ans) => {
    if (ans.meaning == wordList[currentNo].meaning) {
      setCorrectAnswer(wordList[currentNo].meaning);
      setModalOpen(true);
      setIsTrueAnswer(true);
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API}words/${ans.id}/test/`,
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
            spelling: ans.spelling,
            meaning: ans.meaning,
            category: ans.category,
          };
          lastWrongWords.push(nextWrongWords);
          setWrongWords(lastWrongWords);
          setCorrectAnswer(wordList[currentNo].meaning);
          setAnswer(ans.meaning);
          setIsTrueAnswer(false);
        })
        .catch((error) => {
          // console.log("err===>", error);
        });
    }
  };

  if (wordList.length <= 3) {
    return <div>hello</div>;
  }
  // 문제를 다 풀었을 때
  if (currentNo == wordList.length) {
    return <TestEnd wrongWords={wrongWords} />;
  }
  return (
    <>
      <Container>
        <TopNavDivContainer>
          <BackButton onClick={() => navigate("/wordcheck-web/home")}>
            <ArrowBackIosIcon />
          </BackButton>
          <TopNav>
            <div className="wordscount">
              {currentNo + 1}of {wordList.length}
            </div>
          </TopNav>
        </TopNavDivContainer>

        <QuestionDiv>{wordList[currentNo].spelling}</QuestionDiv>

        <MultipleChoiceDiv>
          {problemList?.map((answer) => (
            <ColorButton
              key={answer.id}
              value={answer?.meaning}
              className="colorbutton"
              onClick={() => {
                onClickMultipleChoiceButtonHandler(answer);
                setModalOpen(true);
              }}
            >
              {answer?.meaning}
            </ColorButton>
          ))}
        </MultipleChoiceDiv>
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
    </>
  );
}
