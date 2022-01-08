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

export default function AddWords() {
  const navigate = useNavigate();

  const [contents, setContents] = useState("");
  const [spelling, setSpelling] = useState("");
  const [meaning, setMeaning] = useState("");
  const [category, setCategory] = useState("n");
  const cookies = new Cookies();
  const cookieToken = cookies.get("Token");

  const onClickContentHandler = (event) => {
    setContents(event.target.value);
  };

  const onClickSpellingHandler = (event) => {
    setSpelling(event.target.value);
  };

  const onClickMeaningHandler = (event) => {
    setMeaning(event.target.value);
  };

  const onClickCategoryHandler = (event) => {
    setCategory(event.target.value);
  };

  // console.log("out", category);

  const categoryList = ["n", "v", "adj", "adv", "phr", "prep"];

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

  return (
    <Container>
      <div>
        <CssTextField
          value={contents}
          onChange={onClickContentHandler}
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
      <CardContainer>
        <div>
          <label>단어</label>
          <Input value={spelling} onChange={onClickSpellingHandler} />
        </div>
        <div>
          <label>뜻</label>
          <Input value={meaning} onChange={onClickMeaningHandler} />
        </div>
        <div>
          <label>품사</label>
          <NativeSelect value={category} onChange={onClickCategoryHandler}>
            {categoryList.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </NativeSelect>
        </div>
      </CardContainer>
    </Container>
  );
}

const CardContainer = styled.div`
  background-color: lightgray;
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
