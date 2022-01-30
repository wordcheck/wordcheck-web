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
import {
  BackButton,
  BottomNavBoxContainer,
  CardAddContainer,
  Container,
  TitleDiv,
  TopNav,
  TopNavDivContainer,
} from "../../style/WordStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export default function AddWords({ cookies }) {
  const [contents, setContents] = useState("");
  const [wordList, setWordList] = useState([
    {
      contents: "",
      spelling: "",
      meaning: "",
      category: "n",
    },
  ]);
  const navigate = useNavigate();

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
            .post("https://wordcheck.sulrae.com/api/words/", formData, {
              headers: {
                Authorization: cookies.token,
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
    category: "n",
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
    <>
      <Container>
        <TopNavDivContainer>
          <BackButton onClick={() => navigate(-1)}>
            <ArrowBackIosIcon />
          </BackButton>
          <TopNav>단어 추가</TopNav>
        </TopNavDivContainer>
        <TitleDiv>
          <CssTextField
            name="contents"
            onChange={onChangeContentsHandler}
            value={contents}
            label="title"
            variant="standard"
            style={{ width: "66vw" }}
          />
          <ColorButton
            onClick={() => {
              onClickSubmitWords();
            }}
          >
            만들기
          </ColorButton>
        </TitleDiv>
        <AddWordsForm
          wordList={wordList}
          setWordList={setWordList}
          onChangeInputHandler={onChangeInputHandler}
        />
        <CardAddContainer onClick={onClickCardAddHandler}>
          <AddIcon />
          <span>단어카드 추가하기</span>
        </CardAddContainer>
        <BottomNavBoxContainer></BottomNavBoxContainer>
      </Container>
    </>
  );
}
