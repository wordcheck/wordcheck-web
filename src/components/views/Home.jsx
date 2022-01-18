import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ColorButton } from "../style/LoginStyle";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import QuizIcon from "@mui/icons-material/Quiz";
import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { CookieSharp } from "@mui/icons-material";

// 로그인한 유저만 들어올 수 있음
export default function Home({ cookies }) {
  const [cards, setCards] = useState([]);
  const [wordEmpty, setWordEmpty] = useState(false);

  useEffect(() => {
    axios
      .get("http://52.78.37.13/api/words/", {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.log(error);
        setWordEmpty(true);
      });
  }, [cookies]);

  const CardList = cards.map((card, index) => (
    <Link
      key={card.contents}
      to={`/card/${card.contents}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Card key={index}>{card.contents}</Card>
    </Link>
  ));

  if (!cookies.token) {
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
          <ColorButton>
            <PersonIcon />
          </ColorButton>
        </Link>
      </div>
      {wordEmpty ? (
        <div>단어를 추가해 주세요 </div>
      ) : (
        <CardContainer>{CardList}</CardContainer>
      )}

      <BottomNavigation
        showLabels
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
        }}
      >
        <BottomNavigationAction label="test all" icon={<QuizIcon />} />
        <BottomNavigationAction
          label="add words"
          icon={
            <Link to="addwords">
              <AddIcon />
            </Link>
          }
        />
        <BottomNavigationAction label=" review" icon={<MenuBookIcon />} />
      </BottomNavigation>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
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
