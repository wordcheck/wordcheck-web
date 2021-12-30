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
  const [setId, setSetId] = useState("");

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
  console.log("setId", setId);

  useEffect(() => {
    console.log("sf", setId);
    axios
      .delete(`http://52.78.37.13/api/words/${setId}`, {
        headers: {
          Authorization: CookieToken,
        },
      })
      .then((response) => {
        console.log(response);
        setSetId("");
      }, []);

    // .catch((error) => {
    //   console.log("err", error);
    // });
  }, [setId]);

  return (
    <Container>
      <HeaderDiv>
        <div>{wordlist[0]?.contents}</div>
        <ColorButton>시험보기</ColorButton>
      </HeaderDiv>
      <WordList wordlist={wordlist} setSetId={setSetId} />
    </Container>
  );
}
const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1vh;
`;
