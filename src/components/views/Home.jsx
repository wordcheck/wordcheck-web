// 로그인 했을 때 보이는 첫 홈페이지 화면
// 로그인한 유저만 들어올 수 있음
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { ColorButton } from "../style/LoginStyle";
import axios from "axios";
import { useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";

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
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const CardList = cards.map((card, index) => (
    <HomeCardLink
      key={card.contents}
      to={`/wordcheck-web/card/${card.contents}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <WordListDiv key={index}>{card.contents}</WordListDiv>
    </HomeCardLink>
  ));

  if (!cookies.token) {
    return <Navigate to="/wordcheck-web/" />;
  }

  return (
    <Container>
      <TopLogoMypageContainer>
        <Logo>wordcheck</Logo>
        <Link
          to="/wordcheck-web/mypage"
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

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Nanum+Gothic+Coding&display=swap");
  font-family: "Nanum Gothic", sans-serif;
  width: 100vw;
  height: ${(props) => (props.isInner ? "80vh" : "100%")};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #e6fff7; */
  font-size: ${(props) => (props.isInnerFontSize ? "1em" : "1.5em")};
  @media only screen and (min-width: 750px) {
    width: 750px;
    font-size: 30px;
  }
`;
const TopLogoMypageContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-around;
  padding-top: 2.5vh;
  padding-bottom: 4vh;
  @media only screen and (min-width: 750px) {
    width: 750px;
    display: flex;
    justify-content: space-around;
    padding-top: 2.5vh;
    padding-bottom: 4vh;
  }
`;

const Logo = styled.div`
  font-size: 5vh;
  font-weight: bolder;
`;
const EmptyWordDiv = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  @media only screen and (min-width: 750px) {
    width: 750px;
  }
`;

const HomeCardLink = styled(Link)`
  width: 85vw;
  display: flex;
  @media only screen and (min-width: 750px) {
    width: 637.5px;
  }
`;
const WordListContainer = styled.div`
  width: 85vw;
  @media only screen and (min-width: 750px) {
    width: 637.5px;
  }
`;

const WordListDiv = styled.div`
  position: relative;
  width: 85vw;
  background-color: #e6e6e6;
  /* border: 2px solid lightgray; */
  border-radius: 1vh;
  padding: 1.7vh;
  margin-bottom: 2vh;
  font-size: 0.6em;
  @media only screen and (min-width: 750px) {
    width: 637.5px;
  }
`;
