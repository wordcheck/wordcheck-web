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
import StarIcon from "@mui/icons-material/Star";
import { CategoryInfo, HomeImgDiv, UserInfoDiv } from "../style/WordStyle";

// 로그인한 유저만 들어올 수 있음
export default function Home({ cookies }) {
  const [cards, setCards] = useState([]);
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    axios
      .get("http://52.78.37.13/api/words/", {
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

  useEffect(() => {
    axios
      .patch(
        "http://52.78.37.13/api/accounts/profile/",
        {},
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      )
      .then((response) => {
        setProfile(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          height: "6vh",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "2.3vw",
          paddingBottom: "2vh",
          paddingTop: "2vh",
          borderBottom: "1px solid lightgray",
          boxShadow: "1vw 1vw 2vw lightgray",
        }}
      >
        <Logo>wordcheck</Logo>
        <Link
          to="/mypage"
          style={{ textDecoration: "none", display: "flex", height: "5vh" }}
        >
          <ColorButton>
            <PersonIcon />
          </ColorButton>
        </Link>
      </div>
      <UserInfoDiv>
        <HomeImgDiv>
          <img
            className="profile"
            src={profile.profile_image}
            alt="profilePicture"
          />
        </HomeImgDiv>
        <div className="username">
          안녕하세요
          <span
            style={{
              fontWeight: 600,
              paddingLeft: "1vw",
              paddingRight: "1vw",
              fontSize: "1.2em",
            }}
          >
            {profile.nickname}
          </span>
          님
        </div>
      </UserInfoDiv>
      <CategoryInfo>목록 확인하기</CategoryInfo>
      {cards.length === 0 ? (
        <EmptyWordDiv>단어를 추가해주세요 </EmptyWordDiv>
      ) : (
        <CardContainer>{CardList}</CardContainer>
      )}

      <BottomNavigation
        showLabels
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          borderTop: "1px solid lightgray",
        }}
      >
        <BottomNavigationAction
          label="test all"
          icon={
            <Link
              to="/alltestchoice"
              state={{ cards }}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <QuizIcon />
            </Link>
          }
        />
        <BottomNavigationAction
          label="add words"
          icon={
            <Link
              to="/addwords"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <AddIcon />
            </Link>
          }
        />
        <BottomNavigationAction
          label="marks"
          icon={
            <Link
              to="/marks"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <StarIcon />
            </Link>
          }
        />
      </BottomNavigation>
    </Container>
  );
}

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Nanum+Gothic+Coding&display=swap");
  font-family: "Nanum Gothic", sans-serif;
  width: 100%;
  height: 100%;
`;
const Logo = styled.div`
  font-size: 5vh;
  font-weight: bolder;
`;

const CardContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin: 1vh;
`;

const Card = styled.div`
  background-color: #85adad;
  padding: 2vh;
  margin: 1vh;
  border-radius: 1vh;
  box-shadow: 1.2vw 1.1vw 3.2vw gray;
`;
const EmptyWordDiv = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  color: gray;
`;
