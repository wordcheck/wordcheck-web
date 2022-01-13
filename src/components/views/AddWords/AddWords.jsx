import React, { useState } from "react";
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

export default function AddWords() {
  const [contents, setContents] = useState("");
  const [wordList, setWordList] = useState([
    {
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
  };

  const onClickSubmitWords = () => {
    // const formData = new FormData();
    // formData.append("contents", contents);
    // formData.append("spelling", spelling);
    // formData.append("category", category);
    // formData.append("meaning", meaning);
    // // FormData의 key 확인

    // for (let key of formData.keys()) {
    //   console.log(key);
    // }
    // // FormData의 value 확인
    // for (let value of formData.values()) {
    //   console.log(value);
    // }
    // axios
    //   .post("http://52.78.37.13/api/words/", formData, {
    //     headers: {
    //       Authorization: cookieToken,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     alert("단어가 성공적으로 추가되었습니다!");
    //     navigate(-1);
    //   });
    console.log("submit");
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
        if (i === index) return { ...item, [name]: value };
        else return item;
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
