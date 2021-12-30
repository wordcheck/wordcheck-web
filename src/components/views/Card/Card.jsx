import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { ColorButton } from "../../style/LoginStyle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function Card() {
  const [wordlist, setWordlist] = useState([]);
  const [deleteWord, setDeleteWord] = useState(false);
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

  // useEffect(() => {
  //   axios
  //     .delete(`http://52.78.37.13/api/words/${4}`, {
  //       headers: {
  //         Authorization: CookieToken,
  //       },
  //     })
  //     .then((response) => {
  //       setWordlist(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [deleteWord]);

  const Word = wordlist.map((word) => (
    <Carddiv key={word.id}>
      <Spellingdiv>{word.spelling}</Spellingdiv>
      <CardDiv2>
        <div>
          {word.id}
          {word.category}.{word.meaning}
        </div>
        <div>
          <EditIcon onClick={setDeleteWord(true)} />
          <DeleteIcon />
        </div>
      </CardDiv2>
    </Carddiv>
  ));

  return (
    <Container>
      <HeaderDiv>
        <div>{wordlist[0]?.contents}</div>
        <ColorButton>시험보기</ColorButton>
      </HeaderDiv>

      {Word}
    </Container>
  );
}
const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1vh;
`;
const Carddiv = styled.div`
  background-color: lightgray;
  padding: 1.5vh;
  margin: 1.2vh;
  border-radius: 1vh;
  display: flex;
`;

const Spellingdiv = styled.div`
  width: 11vh;
`;
const CardDiv2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
