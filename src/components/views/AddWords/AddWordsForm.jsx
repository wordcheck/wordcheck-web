import React, { useState } from "react";
import Input from "@mui/material/Input";
import styled from "styled-components";
import NativeSelect from "@mui/material/NativeSelect";
import {
  CardContainer,
  InputContainer,
  InputInfo,
  Label,
} from "../../style/WordStyle";

export default function AddWordsForm({
  inputs,
  wordList,
  onChangeInputHandler,
}) {
  const { spelling, meaning, category } = wordList;
  const categoryList = ["n", "v", "adj", "adv", "phr", "prep"];

  return (
    <>
      {wordList &&
        wordList.map((item, index) => (
          <CardContainer key={index}>
            <InputInfo>
              <InputContainer>
                <Label>단어</Label>
                <Input
                  name="spelling"
                  value={spelling}
                  onChange={(e) => onChangeInputHandler(e, index)}
                />
              </InputContainer>
              <InputContainer>
                <Label>뜻</Label>
                <Input
                  name="meaning"
                  value={meaning}
                  onChange={(e) => onChangeInputHandler(e, index)}
                />
              </InputContainer>
              <InputContainer>
                <Label>품사</Label>
                <NativeSelect
                  name="category"
                  value={category}
                  onChange={(e) => onChangeInputHandler(e, index)}
                >
                  {categoryList.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </NativeSelect>
              </InputContainer>
            </InputInfo>
          </CardContainer>
        ))}
    </>
  );
}
