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

export default function AddWords() {
  const [countList, setCountList] = useState([0]);
  const [inputs, setInputs] = useState([
    {
      contents: "",
      spelling: "",
      meaning: "",
      category: "",
    },
  ]);
  const { contents, spelling, meaning, category } = inputs;
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cookieToken = cookies.get("Token");

  const onChangeInputHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClickSubmitWords = () => {
    const formData = new FormData();
    formData.append("contents", contents);
    formData.append("spelling", spelling);
    formData.append("category", category);
    formData.append("meaning", meaning);
    // FormData의 key 확인

    for (let key of formData.keys()) {
      console.log(key);
    }
    // FormData의 value 확인
    for (let value of formData.values()) {
      console.log(value);
    }
    axios
      .post("http://52.78.37.13/api/words/", formData, {
        headers: {
          Authorization: cookieToken,
        },
      })
      .then((response) => {
        console.log(response);
        alert("단어가 성공적으로 추가되었습니다!");
        navigate(-1);
      });
  };

  const onClickCardAddHandler = () => {
    let countArr = [...countList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setCountList(countArr);
    console.log(countList);
  };
  return (
    <Container>
      <div>
        <CssTextField
          name="contents"
          onChange={onChangeInputHandler}
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
        inputs={inputs}
        onChangeInputHandler={onChangeInputHandler}
        countList={countList}
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
