import React from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ColorButton } from "../style/LoginStyle";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import styled from "styled-components";

// 로그인한 유저만 들어올 수 있음
export default function Home() {
  const cookies = new Cookies();
  const isCookieToken = cookies.get("Token");

  const [value, setValue] = React.useState(0);
  if (!isCookieToken) {
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
      <CardContainer>
        <Card style={{ backgroundColor: "lightgray" }}>sdfe</Card>
        <Card style={{ backgroundColor: "lightgray" }}>sdfe</Card>
        <Card style={{ backgroundColor: "lightgray" }}>sdfe</Card>
      </CardContainer>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
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
  padding: 1vh;
  margin: 1vh;
  border-radius: 1vh;
`;
