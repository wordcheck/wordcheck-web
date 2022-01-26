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
} from "../../style/WordStyle";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import { useSpeechSynthesis } from "react-speech-kit";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
export default function Marks() {
  const [marksList, setMarksList] = useState(
    JSON.parse(localStorage.getItem("marks")) || ""
  );
  // let marksList = JSON.parse(localStorage.getItem("marks"));
  const { speak } = useSpeechSynthesis();

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

  return (
    <Container>
      <TitleDiv>Mark book</TitleDiv>
      {marksList?.map((mark) => (
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
      ))}
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
