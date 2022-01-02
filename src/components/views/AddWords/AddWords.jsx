import React, { useRef, useState } from "react";
import { ColorButton, CssTextField } from "../../style/LoginStyle";
import Input from "@mui/material/Input";
import NativeSelect from "@mui/material/NativeSelect";
import styled from "styled-components";
import AddWordsForm from "./AddWordsForm";
import axios from "axios";
import Cookies from "universal-cookie";

export default function AddWords() {
  const cookies = new Cookies();
  const cookieToken = cookies.get("Token");

  const contentsRef = useRef(null);
  const spellingRef = useRef(null);
  const meaningRef = useRef(null);
  const categoryRef = useRef(null);

  // console.log("out", category);

  const categoryList = ["n", "v", "adj", "adv", "phr", "prep"];
  console.log("qk", contentsRef.current.value);
  const onClickSubmitWords = () => {
    console.log(contentsRef.current.value);
    // const formData = new FormData();
    // formData.append("contents", contentsRef.current.value);
    // formData.append("spelling", spellingRef.current.value);
    // formData.append("category", categoryRef.current.value);
    // formData.append("meaning", meaningRef.current.value);
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
    //   });
  };

  return (
    <Container>
      <div>
        <CssTextField ref={contentsRef} label="title" variant="standard" />
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
          <Input ref={spellingRef} />
        </div>
        <div>
          <label>뜻</label>
          <Input ref={meaningRef} />
        </div>
        <div>
          <label>품사</label>
          <NativeSelect ref={categoryRef}>
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

const CardInfo = styled.div``;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
