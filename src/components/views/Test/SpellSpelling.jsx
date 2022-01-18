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
import BeforeTest from "./TestsChoice";

export default function SpellSpellingTest({ cookies }) {
  const [currentNo, setCurrentNo] = useState(0);
  const [wrongWords, setWrongWords] = useState([]);
  const [answer, setAnswer] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const OnChangeInputHandler = (e) => {
    setAnswer(e.target.value);
  };

  const onClickMultipleChoiceButtonHandler = () => {
    if (wordList[currentNo].spelling == answer) {
      console.log("correct");
      setCurrentNo(currentNo + 1);
      setAnswer("");
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
      setAnswer("");
    }
  };

  // Link에서 가져온 wordList
  const wordList = location.state.wordlist;
  if (currentNo == wordList.length) {
    return <TestEnd wrongWords={wrongWords} />;
  }
  return (
    <Container>
      <TopNav>
        <BackButton onClick={() => navigate(-2)}>
          <ArrowBackIosIcon />
        </BackButton>
        <div className="wordscount">
          {currentNo + 1}of {wordList.length}
        </div>
      </TopNav>
      <QuestionDiv>{wordList[currentNo].meaning}</QuestionDiv>
      <AnswerDiv>
        <CssTextField
          value={answer}
          onChange={(e) => OnChangeInputHandler(e)}
          sx={{ m: 1, width: "65vw" }}
          id="standard-basic"
          label="정답을 입력해주세요"
          // variant="standard"
        />
        <ColorButton onClick={() => onClickMultipleChoiceButtonHandler()}>
          제출
        </ColorButton>
      </AnswerDiv>
    </Container>
  );
}
