import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  BackButton,
  ButtonContainer,
  Container,
  TestContentDiv,
  TopNav,
  TopNavDivContainer,
} from "../../style/WordStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function TestsChoice({ cookies }) {
  const location = useLocation();
  const navigate = useNavigate();
  // Link에서 가져온 wordList

  const wordlist = location?.state?.wordlist;

  return (
    <Container>
      <TopNavDivContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </BackButton>
        <TopNav>단어 테스트</TopNav>
      </TopNavDivContainer>

      <TestContentDiv>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/wordcheck-web/multiplechoice/${wordlist[0]?.contents}`}
          state={{ wordlist }}
        >
          <ButtonContainer>
            <div className="buttons">
              <span style={{ paddingBottom: "1vh" }}>사지선다</span>
              <div className="contentInfo">
                문제를 읽고 올바른 정답을 선택하세요.
              </div>
            </div>
          </ButtonContainer>
        </Link>
        <ArrowForwardIosIcon />
      </TestContentDiv>
      <TestContentDiv>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/wordcheck-web/spellspelling/${wordlist[0]?.contents}`}
          state={{ wordlist }}
        >
          <ButtonContainer>
            <div className="buttons">
              <span style={{ paddingBottom: "1vh" }}>철자맞히기 </span>
              <div className="contentInfo">단어의 철자를 직접 입력하세요.</div>
            </div>
          </ButtonContainer>
        </Link>
        <ArrowForwardIosIcon />
      </TestContentDiv>
    </Container>
  );
}
