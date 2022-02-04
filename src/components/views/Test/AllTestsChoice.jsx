import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

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
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

export default function AllTestsChoice({ cookies }) {
  // const [wordlist, setWordlist] = useState([]);
  const [wordAll, setWordAll] = useState([]);
  const [cards, setCards] = useState([]);
  const [mulChoicefailAlert, setMulChoiceFailAlert] = useState(false);
  const [spellFailAlert, setSpellFailAlert] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: cards } = await axios.get(
          `${process.env.REACT_APP_API}words/`,
          {
            headers: {
              Authorization: cookies.token,
            },
          }
        );
        setCards(cards);
        const cardsPromises = cards.map((contents) =>
          axios.get(
            `${process.env.REACT_APP_API}words/detail_list/?contents=${contents.contents}`,
            {
              headers: {
                Authorization: cookies.token,
              },
            }
          )
        );
        const wordAllResponse = await Promise.all(cardsPromises);
        const wordAll = wordAllResponse.map(({ data }) => data);
        setWordAll(wordAll);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);

  const wordlist = wordAll.flat();

  if (!cookies.token) {
    return <Navigate to="/wordcheck-web/" />;
  }

  return (
    <Container>
      <TopNavDivContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </BackButton>
        <TopNav>모든 단어 테스트</TopNav>
      </TopNavDivContainer>

      {wordlist.length <= 3 ? (
        <TestContentDiv onClick={() => setMulChoiceFailAlert(true)}>
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

      {/* <TestContentDiv>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/wordcheck-web/spellspelling/${wordlist[0]?.contents}`}
          state={{ wordlist }}
        >
          <ButtonContainer>
            <div className="buttons">
              <span style={{ paddingBottom: "1vh" }}>플래시카드</span>
              <div className="contentInfo">
                단어 카드를 좌우로 스와이프하세요.
              </div>
            </div>
          </ButtonContainer>
        </Link>
        <ArrowForwardIosIcon />
      </TestContentDiv> */}
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
