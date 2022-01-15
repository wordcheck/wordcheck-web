import React, { useEffect, useState } from "react";
import { ColorButton, CssTextField } from "../../style/LoginStyle";
import Input from "@mui/material/Input";
import NativeSelect from "@mui/material/NativeSelect";
import styled from "styled-components";
import AddWordsForm from "./AddWordsForm";
import axios from "axios";
import Cookies from "universal-cookie";
import Home from "../Home";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import WordList from "../Card/WordList";
import { SliderValueLabelUnstyled } from "@mui/material";

export default function AddWords() {
  const [contents, setContents] = useState("");
  const [wordList, setWordList] = useState([
    {
      contents: "",
      spelling: "",
      meaning: "",
      category: "",
    },
  ]);

  const navigate = useNavigate();
  const cookies = new Cookies();
  const cookieToken = cookies.get("Token");

  const onChangeContentsHandler = (e) => {
    setContents(e.target.value);
    setWordList(
      wordList.map((words) => {
        return { ...words, contents: contents };
      })
    );
  };

  const onClickSubmitWords = () => {
    const formData = new FormData();
    if (window.confirm("추가하시겠습니까?")) {
      Promise.all(
        wordList.map((wordList) => {
          formData.append("contents", wordList.contents);
          formData.append("spelling", wordList.spelling);
          formData.append("category", wordList.category);
          formData.append("meaning", wordList.meaning);

          return axios
            .post("http://52.78.37.13/api/words/", formData, {
              headers: {
                Authorization: cookieToken,
              },
            })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log("err==>", error);
            });
        })
      )
        .then(() => {
          navigate(-1);
          alert("단어가 성공적으로 추가되었습니다");
        })
        .catch((err) => {
          alert("단어를 저장시키지 못했습니다. 다시 시도해주세요");
        });
    }
  };

  const inputData = {
    spelling: "",
    meaning: "",
    category: "",
  };

  const onChangeInputHandler = (e, index) => {
    const { value, name } = e.target;
    setWordList(
      wordList.map((item, i) => {
        if (i === index) return { ...item, [name]: value, contents: contents };
        else return { ...item, contents: contents };
      })
    );
  };

  const onClickCardAddHandler = () => {
    let WordInputs = [...wordList];
    let nextWordInputs = inputData;
    WordInputs.push(nextWordInputs);
    setWordList(WordInputs);
  };

  return (
    <Container>
      <div>
        <CssTextField
          name="contents"
          onChange={onChangeContentsHandler}
          value={contents}
          label="title"
          variant="standard"
        />
        <ColorButton
          onClick={() => {
            onClickSubmitWords();
          }}
        >
          만들기
        </ColorButton>
      </div>

      <AddWordsForm
        wordList={wordList}
        setWordList={setWordList}
        onChangeInputHandler={onChangeInputHandler}
      />
      <CardAddContainer onClick={onClickCardAddHandler}>
        <AddIcon /> add Card
      </CardAddContainer>
    </Container>
  );
}

const CardAddContainer = styled.div`
  text-align: center;
  background-color: pink;
  padding: 2vh;
  margin: 2vh;
  width: 35vh;
  border-radius: 1.5vh;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
