import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ColorButton } from "../../style/LoginStyle";
import QuizIcon from "@mui/icons-material/Quiz";
import {
  BottomNavBoxContainer,
  Container,
  ContentDiv,
  HeaderDiv,
} from "../../style/WordStyle";
import Test from "../Test/Test";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import WordList from "./WordList";
import DeleteModal from "./DeleteModal";

export default function Card({ cookies }) {
  const [wordlist, setWordlist] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editId, setEditId] = useState("");
  const [getDeleteModal, setGetDeleteModal] = useState(false);
  // useeffect
  const [isDeleteWord, setIsDeleteWord] = useState(false);
  const [deleteWordId, setDeleteWordId] = useState("");
  const { contents } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API}words/detail_list/?contents=${contents}`,
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
        // console.log(error);
      });
  }, [editId, deleteWordId]);

  if (wordlist === "") {
    navigate(`/wordcheck-web/`);
  }

  return (
    <Container>
      <HeaderDiv>
        <ContentDiv>{wordlist[0]?.contents}</ContentDiv>
        <Link
          to={`/wordcheck-web/testschoice`}
          state={{ wordlist }}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <ColorButton style={{ height: "100%", width: "100px" }}>
            그룹 테스트
          </ColorButton>
        </Link>
      </HeaderDiv>
      <WordList
        wordlist={wordlist}
        cookies={cookies}
        setWordlist={setWordlist}
        setIsDeleted={setIsDeleted}
        isDeleteWord={isDeleteWord}
        editId={editId}
        setEditId={setEditId}
        isDeleted={isDeleted}
        setGetDeleteModal={setGetDeleteModal}
        setDeleteWordId={setDeleteWordId}
      />
      {getDeleteModal && (
        <DeleteModal
          cookies={cookies}
          setGetDeleteModal={setGetDeleteModal}
          setIsDeleteWord={setIsDeleteWord}
          setIsDeleted={setIsDeleted}
          deleteWordId={deleteWordId}
          setDeleteWordId={setDeleteWordId}
        />
      )}
    </Container>
  );
}
