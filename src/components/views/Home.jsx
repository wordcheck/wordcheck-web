// 로그인 했을 때 보이는 첫 홈페이지 화면
// 로그인한 유저만 들어올 수 있음
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ColorButton } from "../style/LoginStyle";
import axios from "axios";
import { useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";

import {
  Container,
  EmptyWordDiv,
  HomeCardLink,
  HomeCardListContainer,
  Logo,
  TopLogoMypageContainer,
  WordListContainer,
  WordListDiv,
} from "../style/WordStyle";

export default function Home({ cookies, setCards, cards, setShowBottomNav }) {
  // const [profile, setProfile] = useState([]);

  useEffect(() => {
    setShowBottomNav(true);
    axios
      .get(`${process.env.REACT_APP_API}words/`, {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((response) => {
        setCards(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const CardList = cards.map((card, index) => (
    <HomeCardLink
      key={card.contents}
      to={`/card/${card.contents}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <WordListDiv key={index}>{card.contents}</WordListDiv>
    </HomeCardLink>
  ));

  if (!cookies.token) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <TopLogoMypageContainer>
        <Logo>wordcheck</Logo>

        <Link
          to="/mypage"
          style={{ textDecoration: "none", display: "flex", height: "5vh" }}
        >
          <ColorButton>
            <PersonIcon />
          </ColorButton>
        </Link>
      </TopLogoMypageContainer>

      {cards.length === 0 ? (
        <EmptyWordDiv> 단어를 추가해주세요 </EmptyWordDiv>
      ) : (
        <WordListContainer>{CardList}</WordListContainer>
      )}
    </Container>
  );
}
