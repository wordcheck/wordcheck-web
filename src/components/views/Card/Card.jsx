import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { ColorButton } from "../../style/WordStyle";
import QuizIcon from "@mui/icons-material/Quiz";
import {
  BottomNavBoxContainer,
  Container,
  ContentDiv,
} from "../../style/WordStyle";
import Test from "../Test/Test";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import WordList from "./WordList";
import DeleteModal from "./DeleteModal";

export default function Card({ cookies }) {
  const [wordlist, setWordlist] = useState(["length"]);
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
  }, [editId, deleteWordId, isDeleteWord]);

  console.log(wordlist.length);
  if (wordlist.length === 0) {
    return <Navigate to="/wordcheck-web/" />;
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
const HeaderDiv = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  padding-top: 2vh;
  padding-bottom: 2vh;
  /* padding: 1.2vh; */
  /* padding-right: 1.6=vh;
  padding-left: 1.6vh;
  padding-bottom: 2vh;
  /* padding-top: 3vh; */
  @media only screen and (min-width: 750px) {
    width: 637.5px;
  }
`;
