import React from "react";
import { ColorButton } from "../../style/LoginStyle";
import {
  Container,
  InfoDiv,
  LinkButtonDiv,
  WrongWordsContainer,
} from "../../style/WordStyle";
export default function TestEnd({ wrongWords }) {
  return (
    <>
      <Container>
        <InfoDiv>수고했어요!</InfoDiv>
        <LinkButtonDiv>
          <ColorButton>재시험 보러가기</ColorButton>
          <ColorButton>카드 공부하러 가기 </ColorButton>
        </LinkButtonDiv>
        <div>틀린문제 {wrongWords.length}개</div>
        {wrongWords.map((word) => (
          <WrongWordsContainer>
            <div>{word.spelling}</div>
            <div>{word.category}.</div>
            <div>{word.meaning}</div>
          </WrongWordsContainer>
        ))}
      </Container>
    </>
  );
}
