import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorButton, Container, CssTextField } from "../../style/LoginStyle";
import {
  AnswerDiv,
  BackButton,
  MultipleChoiceDiv,
  QuestionDiv,
  TopNav,
} from "../../style/WordStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TestEnd from "./TestEnd";

export default function MultipleChoice({ cookies }) {
  const [currentNo, setCurrentNo] = useState(0);
  const [wrongWords, setWrongWords] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Link에서 가져온 wordList
  const wordList = location.state.wordlist;
  console.log("dd", wordList);
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

  const onClickMultipleChoiceButtonHandler = (answer) => {
    if (answer.meaning == wordList[currentNo].meaning) {
      console.log("correct");
      setCurrentNo(currentNo + 1);
    } else {
      console.log("not correct");
      setCurrentNo(currentNo + 1);
      axios
        .patch(
          `http://52.78.37.13/api/words/${answer.id}/test/`,
          {},
          {
            headers: {
              Authorization: cookies.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          let lastWrongWords = [...wrongWords];
          let nextWrongWords = {
            spelling: answer.spelling,
            meaning: answer.meaning,
            category: answer.category,
          };
          lastWrongWords.push(nextWrongWords);
          setWrongWords(lastWrongWords);
        })
        .catch((error) => {
          console.log("err===>", error);
        });
    }
  };

  // 문제를 다 풀었을 때
  if (currentNo == wordList.length) {
    return <TestEnd wrongWords={wrongWords} />;
  }
  return (
    <>
      <Container>
        <TopNav>
          <BackButton onClick={() => navigate(-2)}>
            <ArrowBackIosIcon />
          </BackButton>
          <div className="wordscount">
            {currentNo + 1}of {wordList.length}
          </div>
        </TopNav>
        <QuestionDiv>{wordList[currentNo].spelling}</QuestionDiv>

        <MultipleChoiceDiv>
          {problemList?.map((answer) => (
            <ColorButton
              key={answer.id}
              value={answer?.meaning}
              className="colorbutton"
              onClick={() => onClickMultipleChoiceButtonHandler(answer)}
            >
              {answer?.meaning}
            </ColorButton>
          ))}
        </MultipleChoiceDiv>
      </Container>
    </>
  );
}
