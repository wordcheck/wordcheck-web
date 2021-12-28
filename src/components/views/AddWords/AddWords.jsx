import React, { useState } from "react";
import { ColorButton, Container, CssTextField } from "../../style/LoginStyle";
import Input from "@mui/material/Input";
import NativeSelect from "@mui/material/NativeSelect";
import styled from "styled-components";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

export default function AddWords() {
  const [contents, setContents] = useState("");
  const [spelling, setSpelling] = useState("");
  const [meaning, setMeaning] = useState("");
  const [category, setCategory] = useState("n");
  const onContentHandler = (event) => {
    setContents(event.target.value);
  };

  const onSpellingHandler = (event) => {
    setSpelling(event.target.value);
  };

  const onMeaningHandler = (event) => {
    setMeaning(event.target.value);
  };

  const onCategoryHandler = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Container>
      <div>
        <CssTextField
          onChange={onContentHandler}
          label="title"
          variant="standard"
        />
        <ColorButton>만들기</ColorButton>
      </div>
      <CardContainer>
        <div>
          <label>단어</label>
          <Input onChange={onSpellingHandler} />
        </div>
        <div>
          <label>뜻</label>
          <Input onChange={onMeaningHandler} />
        </div>
        <div>
          <label>품사</label>
          <NativeSelect defaultValue="n" onChange={onCategoryHandler}>
            <option value="n">n</option>
            <option value="v">v</option>
            <option value="adj">adj</option>
            <option value="adv">adv</option>
            <option value="phr">phr</option>
            <option value="prep">prep</option>
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
