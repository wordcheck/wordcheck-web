import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { ColorButton } from "../../style/LoginStyle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WordList from "./WordList";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
export default function Card() {
  const [wordlist, setWordlist] = useState([]);
  const cookies = new Cookies();
  const CookieToken = cookies.get("Token");
  const { contents } = useParams();

  useEffect(() => {
    axios
      .get(`http://52.78.37.13/api/words/detail_list/?contents=${contents}`, {
        headers: {
          Authorization: CookieToken,
        },
      })
      .then((response) => {
        setWordlist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <HeaderDiv>
        <div>{wordlist[0]?.contents}</div>
        <ColorButton>시험보기</ColorButton>
      </HeaderDiv>
      <WordList
        wordlist={wordlist}
        CookieToken={CookieToken}
        setWordlist={setWordlist}
      />
    </Container>
  );
}
const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1vh;
`;
