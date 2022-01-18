import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { ColorButton } from "../../style/LoginStyle";
import { ContentDiv, HeaderDiv } from "../../style/WordStyle";
import Test from "../Test/Test";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import WordList from "./WordList";

export default function Card({ cookies }) {
  const [wordlist, setWordlist] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editId, setEditId] = useState("");
  const { contents } = useParams();

  useEffect(() => {
    axios
      .get(`http://52.78.37.13/api/words/detail_list/?contents=${contents}`, {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((response) => {
        setWordlist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isDeleted, editId]);

  return (
    <Container>
      <HeaderDiv>
        <ContentDiv>{wordlist[0]?.contents}</ContentDiv>

        <Link to={`/testshoice/${wordlist[0]?.contents}`} state={{ wordlist }}>
          <ColorButton>시험보기</ColorButton>
        </Link>
      </HeaderDiv>
      <WordList
        wordlist={wordlist}
        cookies={cookies}
        setWordlist={setWordlist}
        setIsDeleted={setIsDeleted}
        editId={editId}
        setEditId={setEditId}
      />
    </Container>
  );
}
