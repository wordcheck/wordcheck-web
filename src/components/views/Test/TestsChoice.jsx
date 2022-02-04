import React, { useState } from "react";
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
import { Alert, Snackbar } from "@mui/material";

export default function TestsChoice({ cookies }) {
  const [mulChoicefailAlert, setMulChoiceFailAlert] = useState(false);
  const [spellFailAlert, setSpellFailAlert] = useState(false);
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

      {wordlist.length <= 3 ? (
        <TestContentDiv>
          <ButtonContainer>
            <div
              className="buttons"
              onClick={() => setMulChoiceFailAlert(true)}
            >
              <span style={{ paddingBottom: "1vh" }}>사지선다</span>
              <div className="contentInfo">
                문제를 읽고 올바른 정답을 선택하세요.
              </div>
            </div>
          </ButtonContainer>

          <ArrowForwardIosIcon />
        </TestContentDiv>
      ) : (
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/wordcheck-web/multiplechoice/${wordlist[0]?.contents}`}
          state={{ wordlist }}
        >
          <TestContentDiv>
            <ButtonContainer>
              <div className="buttons">
                <span style={{ paddingBottom: "1vh" }}>사지선다</span>
                <div className="contentInfo">
                  문제를 읽고 올바른 정답을 선택하세요.
                </div>
              </div>
            </ButtonContainer>

            <ArrowForwardIosIcon />
          </TestContentDiv>
        </Link>
      )}
      {wordlist.length < 1 ? (
        <TestContentDiv onClick={() => setSpellFailAlert(true)}>
          <ButtonContainer>
            <div className="buttons">
              <span style={{ paddingBottom: "1vh" }}>철자맞히기 </span>
              <div className="contentInfo">단어의 철자를 직접 입력하세요.</div>
            </div>
          </ButtonContainer>
          <ArrowForwardIosIcon />
        </TestContentDiv>
      ) : (
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/wordcheck-web/spellspelling/${wordlist[0]?.contents}`}
          state={{ wordlist }}
        >
          <TestContentDiv>
            <ButtonContainer>
              <div className="buttons">
                <span style={{ paddingBottom: "1vh" }}>철자맞히기 </span>
                <div className="contentInfo">
                  단어의 철자를 직접 입력하세요.
                </div>
              </div>
            </ButtonContainer>
            <ArrowForwardIosIcon />
          </TestContentDiv>
        </Link>
      )}

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={mulChoicefailAlert}
        autoHideDuration={3000}
        onClose={() => setMulChoiceFailAlert(false)}
      >
        <Alert
          onClose={() => setMulChoiceFailAlert(false)}
          severity="error"
          sx={{
            width: "250px",
            background: "rgb(211, 47, 47)",
            color: "rgb(255, 255, 255)",
            fontSize: "17px",
          }}
        >
          단어를 4개 이상 저장해주세요
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={spellFailAlert}
        autoHideDuration={3000}
        onClose={() => setSpellFailAlert(false)}
      >
        <Alert
          onClose={() => setSpellFailAlert(false)}
          severity="error"
          sx={{
            width: "250px",
            background: "rgb(211, 47, 47)",
            color: "rgb(255, 255, 255)",
            fontSize: "17px",
          }}
        >
          단어를 1개 이상 저장해주세요
        </Alert>
      </Snackbar>
    </Container>
  );
}
