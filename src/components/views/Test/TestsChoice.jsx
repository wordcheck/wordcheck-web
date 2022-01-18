import React from "react";
import { useNavigate } from "react-router-dom";
import { ColorButton } from "../../style/LoginStyle";
import {
  BackButton,
  ButtonContainer,
  Container,
  TestContentDiv,
  TopNav,
} from "../../style/WordStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function TestsChoice() {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowBackIosIcon />
      </BackButton>
      <TopNav>Test</TopNav>
      <TestContentDiv>
        <ButtonContainer>
          <div className="buttons">
            <span>사지선다</span>
            <div className="contentInfo">
              문제를 읽고 올바른 정답을 선택하세요.
            </div>
          </div>
        </ButtonContainer>
        <ArrowForwardIosIcon />
      </TestContentDiv>
      <TestContentDiv>
        <ButtonContainer>
          <div className="buttons">
            <span>철자맞히기 </span>
            <div className="contentInfo">단어의 철자를 직접 입력하세요.</div>
          </div>
        </ButtonContainer>
        <ArrowForwardIosIcon />
      </TestContentDiv>
    </Container>
  );
}
