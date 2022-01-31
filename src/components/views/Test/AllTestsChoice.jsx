import React, { useEffect, useState } from "react";
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
import axios from "axios";

export default function AllTestsChoice({ cookies }) {
  // const [wordlist, setWordlist] = useState([]);
  const [wordAll, setWordAll] = useState([]);
  const [cards, setCards] = useState([]);
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
        // handle any errors, rejected Promises, etc..
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const wordlist = wordAll.flat();
  // const newWord = [].concat(wordAll.map((x) => x));
  // console.log("newWord", newWord);

  // const newWord = wordAll.map((x) => x);
  // console.log("newWord", newWord);

  return (
    <Container>
      <TopNavDivContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </BackButton>
        <TopNav>모든 단어 테스트</TopNav>
      </TopNavDivContainer>
      <TestContentDiv>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/multiplechoice/${wordlist[0]?.contents}`}
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
          to={`/spellspelling/${wordlist[0]?.contents}`}
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
      <TestContentDiv>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/spellspelling/${wordlist[0]?.contents}`}
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
      </TestContentDiv>
    </Container>
  );
}
