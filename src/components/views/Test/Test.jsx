import axios from "axios";
import React, { useEffect, useState } from "react";
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

export default function Test(props) {
  const location = useLocation();
  const [testWords, setTestWords] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://52.78.37.13/api/words/search/?target=word`, {
        headers: {
          Authorization: props.cookies.token,
        },
      })
      .then((response) => {
        setTestWords(response.data);
      })
      .catch((error) => {
        console.log("error->>>", error);
      });
  }, []);
  console.log("testWord", testWords);
  console.log("location", location);

  return (
    <>
      <Container>
        <TopNav>
          <BackButton onClick={() => navigate(-1)}>
            <ArrowBackIosIcon />
          </BackButton>
          <div className="wordscount">1 of 1</div>
        </TopNav>
        <QuestionDiv>단어</QuestionDiv>
        {/* <AnswerDiv>
          <CssTextField
            sx={{ m: 1, width: "65vw" }}
            id="standard-basic"
            label="정답을 입력해주세요"
            // variant="standard"
          />
          <ColorButton>제출</ColorButton>
        </AnswerDiv> */}
        <MultipleChoiceDiv>
          <ColorButton className="colorbutton">answer1</ColorButton>
          <ColorButton className="colorbutton">answer2</ColorButton>
          <ColorButton className="colorbutton">answer3</ColorButton>
          <ColorButton className="colorbutton">answer4</ColorButton>
        </MultipleChoiceDiv>
      </Container>
    </>
  );
}
