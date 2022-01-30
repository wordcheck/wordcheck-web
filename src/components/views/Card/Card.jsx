import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { ColorButton } from "../../style/LoginStyle";
import { Container, ContentDiv, HeaderDiv } from "../../style/WordStyle";
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
      .get(
        `https://wordcheck.sulrae.com/api/words/detail_list/?contents=${contents}`,
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      )
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
        <Link
          to={`/testschoice`}
          state={{ wordlist }}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <ColorButton style={{ height: "100%", width: "25vw" }}>
            그룹 테스트
          </ColorButton>
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
