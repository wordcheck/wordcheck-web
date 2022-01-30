import React from "react";
import { useNavigate } from "react-router-dom";
import { ColorButton } from "../../style/LoginStyle";
import {
  Container,
  InfoDiv,
  LinkButtonDiv,
  WrongWordsContainer,
  WrongWordsOthersDiv,
  WrongWordsSpellingDiv,
} from "../../style/WordStyle";
export default function TestEnd({ wrongWords }) {
  console.log(wrongWords);
  const navigation = useNavigate();
  return (
    <>
      <Container>
        <InfoDiv>👏수고했어요!👏</InfoDiv>
        <LinkButtonDiv>
          <ColorButton onClick={() => navigation(-1)}>
            재시험 보러가기
          </ColorButton>

          <ColorButton onClick={() => navigation(-2)}>
            카드 공부하러 가기
          </ColorButton>
        </LinkButtonDiv>
        <div>틀린문제는 총 {wrongWords.length}개에요</div>
        {wrongWords.map((word) => (
          <WrongWordsContainer>
            <WrongWordsSpellingDiv>{word.spelling} </WrongWordsSpellingDiv>
            <WrongWordsOthersDiv>{word.category}.</WrongWordsOthersDiv>
            <WrongWordsOthersDiv>{word.meaning}</WrongWordsOthersDiv>
          </WrongWordsContainer>
        ))}
      </Container>
    </>
  );
}
