import React from "react";
import {
  BackButton,
  Container,
  NicknameChangeFormDiv,
  NicknameChangeInfo,
  TopNav,
} from "../../style/WordStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ColorButton, CssTextField } from "../../style/LoginStyle";
import { useNavigate } from "react-router-dom";
export default function WordSearch() {
  const navigate = useNavigate();
  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowBackIosIcon />
      </BackButton>
      <TopNav>단어 찾기</TopNav>
      <NicknameChangeFormDiv>
        <CssTextField style={{ width: "80vw" }} />
        <ColorButton>검색하기</ColorButton>
      </NicknameChangeFormDiv>
    </Container>
  );
}
