import React, { useEffect, useState } from "react";
import {
  Container,
  Carddiv,
  SpellingDiv,
  CategoryList,
  TitleDiv,
  WrongCountDiv,
  SpellingVolumeUpDiv,
  CategoryMeaningDiv,
  MeaningDiv,
  WordCardRightDiv,
  EmptyWordDiv,
  EmptyMarkDiv,
  TopNavDivContainer,
  BackButton,
  TopNav,
} from "../../style/WordStyle";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import { useSpeechSynthesis } from "react-speech-kit";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
export default function Marks() {
  const [marksList, setMarksList] = useState(
    JSON.parse(localStorage.getItem("marks")) || ""
  );
  // let marksList = JSON.parse(localStorage.getItem("marks"));
  const { speak } = useSpeechSynthesis();
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.setItem("marks", JSON.stringify(marksList));
  }, [marksList, setMarksList]);

  const onClickMarkButtonHandler = (mark) => {
    let beforeMark = [...marksList];
    const idx = beforeMark.indexOf(mark);
    beforeMark.splice(idx, 1);
    console.log("del", beforeMark);
    setMarksList(beforeMark);
  };
  console.log(marksList.length == true);

  return (
    <Container>
      <TopNavDivContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </BackButton>
        <TopNav>Mark Book</TopNav>
      </TopNavDivContainer>
      {marksList.length ? (
        marksList?.map((mark) => (
          <>
            <Carddiv>
              <div>
                <WrongCountDiv>틀린횟수 :{mark.wrong_count}</WrongCountDiv>
                <SpellingVolumeUpDiv>
                  <SpellingDiv>{mark.spelling}</SpellingDiv>

                  <VolumeUpIcon
                    sx={{ height: "2.5vh" }}
                    onClick={() => speak({ text: mark.spelling })}
                  />
                </SpellingVolumeUpDiv>
                <CategoryMeaningDiv>
                  <CategoryList>{mark.category}.</CategoryList>
                  <MeaningDiv> {mark.meaning}</MeaningDiv>
                </CategoryMeaningDiv>
              </div>
              <WordCardRightDiv>
                <StarIcon
                  onClick={() => onClickMarkButtonHandler(mark)}
                  sx={{ color: yellow[600] }}
                />
              </WordCardRightDiv>
            </Carddiv>
          </>
        ))
      ) : (
        <EmptyMarkDiv>
          <div>마크를 표시한 단어가 없어요.</div>
          <div>
            <StarIcon sx={{ color: yellow[600], height: "0.7em" }} />
            버튼을 눌러 마크북을 채워보세요!
          </div>
        </EmptyMarkDiv>
      )}
    </Container>
  );
}
{
  /* <Carddiv key={mark.id}>
          <StarIcon
            onClick={() => onClickMarkButtonHandler(mark)}
            sx={{ color: yellow[600] }}
          />
          <SpellingDiv> {mark.spelling}</SpellingDiv>
          <CategoryList> {mark.category}</CategoryList>

          {mark.meaning}
        </Carddiv> */
}
