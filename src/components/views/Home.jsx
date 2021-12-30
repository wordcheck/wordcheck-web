import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ColorButton } from "../style/LoginStyle";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";

// 로그인한 유저만 들어올 수 있음
export default function Home() {
  const [cards, setCards] = useState([]);
  const cookies = new Cookies();
  const CookieToken = cookies.get("Token");

  useEffect(() => {
    if (CookieToken) {
      axios
        .get("http://52.78.37.13/api/words/", {
          headers: {
            Authorization: CookieToken,
          },
        })
        .then((response) => {
          setCards(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const CardList = cards.map((card, index) => (
    <Card key={index}>{card.contents}</Card>
  ));

  if (!CookieToken) {
    return <Navigate to="/login" />;
  }
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1.5vh",
        }}
      >
        <Logo>wordcheck</Logo>
        <Link to="/mypage" style={{ textDecoration: "none" }}>
          <ColorButton>마이페이지</ColorButton>
        </Link>
      </div>
      <CardContainer>{CardList}</CardContainer>

      <BottomNavigation
        showLabels
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          height: "10vh",
        }}
      >
        <BottomNavigationAction label="전체 시험보기 " />
        <Link to="addwords">
          <BottomNavigationAction icon={<div>+</div>} />
        </Link>
        <BottomNavigationAction label="오답노트" />
      </BottomNavigation>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Logo = styled.div`
  font-size: 5vh;
  font-weight: bolder;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1vh;
`;

const Card = styled.div`
  background-color: lightgray;
  padding: 1vh;
  margin: 1vh;
  border-radius: 1vh;
`;
