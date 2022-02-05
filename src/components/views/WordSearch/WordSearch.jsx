import React, { useEffect, useState } from "react";
import {
  BackButton,
  Carddiv,
  Container,
  SpellingDiv,
  SpellingVolumeUpDiv,
  TopNav,
  WrongCountDiv,
  CategoryList,
  CategoryMeaningDiv,
  MeaningDiv,
  WordCardRightDiv,
  TopNavDivContainer,
  WordSearchInputDiv,
  WordSearchCardDiv,
  EmptyWordDiv,
} from "../../style/WordStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ColorButton, CssTextField } from "../../style/WordStyle";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StarIcon from "@mui/icons-material/Star";
import { useSpeechSynthesis } from "react-speech-kit";
import { yellow, grey } from "@mui/material/colors";

export default function WordSearch({ cookies }) {
  const [searchWord, setSearchWord] = useState("");
  const [marks, setMarks] = useState(
    JSON.parse(localStorage.getItem("marks")) || ""
  );
  const [answerWord, setAnswerWord] = useState("answer");
  const [answerShow, setAnswerShow] = useState(false);
  const [emptyAnswer, setEmptyAnswer] = useState(false);
  const { speak } = useSpeechSynthesis();

  const navigate = useNavigate();
  useEffect(() => {
    window.localStorage.setItem("marks", JSON.stringify(marks));
  }, [marks]);

  const onClickSearchButtonHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API}words/search/?target=${searchWord}`, {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        if (res.data.length === 0) {
          setAnswerShow(false);
          setEmptyAnswer(true);
        } else {
          setAnswerWord(res.data);
          setAnswerShow(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setAnswerShow(false);
        setEmptyAnswer(true);
      });
  };

  const onClickMarkButtonHandler = (info) => {
    let beforeInfo = [...marks];
    if (JSON.stringify(marks).includes(JSON.stringify(info))) {
      const idx = beforeInfo.indexOf(info);
      beforeInfo.splice(idx, 1);
    } else {
      beforeInfo.push(info);
    }
    setMarks(beforeInfo);
  };

  if (!cookies.token) {
    return <Navigate to="/wordcheck-web/" />;
  }

  return (
    <Container>
      <TopNavDivContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </BackButton>
        <TopNav>단어 찾기</TopNav>
      </TopNavDivContainer>
      <WordSearchInputDiv>
        <CssTextField
          style={{ width: "490px", paddingRight: "10px" }}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <ColorButton
          sx={{ width: "100px" }}
          onClick={() => onClickSearchButtonHandler()}
        >
          검색하기
        </ColorButton>
      </WordSearchInputDiv>

      {answerShow ? (
        <WordSearchCardDiv>
          <Carddiv>
            <div>
              <WrongCountDiv>
                틀린횟수 :{answerWord[0]?.wrong_count}
              </WrongCountDiv>
              <SpellingVolumeUpDiv>
                <SpellingDiv>{answerWord[0]?.spelling}</SpellingDiv>

                <VolumeUpIcon
                  sx={{ height: "2.5vh" }}
                  onClick={() => speak({ text: answerWord[0]?.spelling })}
                />
              </SpellingVolumeUpDiv>
              <CategoryMeaningDiv>
                <CategoryList>{answerWord[0]?.category}.</CategoryList>
                <MeaningDiv> {answerWord[0]?.meaning}</MeaningDiv>
              </CategoryMeaningDiv>
            </div>
            <WordCardRightDiv>
              {JSON.stringify(marks)?.includes(
                JSON.stringify(answerWord[0])
              ) ? (
                <StarIcon
                  onClick={() => onClickMarkButtonHandler(answerWord[0])}
                  sx={{ color: yellow[600] }}
                />
              ) : (
                <StarIcon
                  onClick={() => onClickMarkButtonHandler(answerWord[0])}
                  sx={{ color: grey[500] }}
                />
              )}
            </WordCardRightDiv>
          </Carddiv>
        </WordSearchCardDiv>
      ) : (
        <div>
          {emptyAnswer ? (
            <EmptyWordDiv>단어를 발견하지 못했습니다.</EmptyWordDiv>
          ) : (
            <EmptyWordDiv>단어를 검색해보세요</EmptyWordDiv>
          )}
        </div>
      )}

      {/* {wordAll
          .filter((word) => {
            if (searchWord == "") {
              return word;
            } else if (
              word.spelling.toLowerCase().includes(searchWord.toLowerCase())
            ) {
              return word;
            }
          })
          .map((word, key) => {
            return (
              <div key={key}>
                <Carddiv>
                  <div>
                    <WrongCountDiv>틀린횟수 :{word.wrong_count}</WrongCountDiv>
                    <SpellingVolumeUpDiv>
                      <SpellingDiv>{word.spelling}</SpellingDiv>

                      <VolumeUpIcon
                        sx={{ height: "2.5vh" }}
                        onClick={() => speak({ text: word.spelling })}
                      />
                    </SpellingVolumeUpDiv>
                    <CategoryMeaningDiv>
                      <CategoryList>{word.category}.</CategoryList>
                      <MeaningDiv> {word.meaning}</MeaningDiv>
                    </CategoryMeaningDiv>
                  </div>
                  <WordCardRightDiv>
                    {JSON.stringify(marks)?.includes(JSON.stringify(word)) ? (
                      <StarIcon
                        onClick={() => onClickMarkButtonHandler(word)}
                        sx={{ color: yellow[600] }}
                      />
                    ) : (
                      <StarIcon
                        onClick={() => onClickMarkButtonHandler(word)}
                        sx={{ color: grey[500] }}
                      />
                    )}
                  </WordCardRightDiv>
                </Carddiv>
              </div>
            );
          })} */}
    </Container>
  );
}
