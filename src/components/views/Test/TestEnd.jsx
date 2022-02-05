import React from "react";
import { useNavigate } from "react-router-dom";
import { ColorButton } from "../../style/WordStyle";
import {
  Container,
  InfoDiv,
  LinkButtonDiv,
  TestEndInfoDiv,
  WrongWordsContainer,
  WrongWordsInfo,
  WrongWordsOthersDiv,
  WrongWordsSpellingDiv,
} from "../../style/WordStyle";
export default function TestEnd({ wrongWords }) {
  const navigation = useNavigate();
  return (
    <>
      <Container>
        <TestEndInfoDiv>시험이 끝났습니다!</TestEndInfoDiv>
        <LinkButtonDiv>
          <ColorButton onClick={() => navigation(-1)}>
            재시험 보러가기
          </ColorButton>

          <ColorButton onClick={() => navigation(-2)}>
            카드 공부하러 가기
          </ColorButton>
        </LinkButtonDiv>
        <WrongWordsInfo>틀린 단어 다시보기</WrongWordsInfo>
        {wrongWords.map((word, key) => (
          <WrongWordsContainer key={key}>
            <WrongWordsSpellingDiv>{word.spelling} </WrongWordsSpellingDiv>
            <WrongWordsOthersDiv>{word.category}.</WrongWordsOthersDiv>
            <WrongWordsOthersDiv>{word.meaning}</WrongWordsOthersDiv>
          </WrongWordsContainer>
        ))}
      </Container>
    </>
  );
}
