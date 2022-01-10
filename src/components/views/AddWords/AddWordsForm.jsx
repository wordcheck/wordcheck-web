import React from "react";
import Input from "@mui/material/Input";
import styled from "styled-components";
import NativeSelect from "@mui/material/NativeSelect";
export default function AddWordsForm({
  inputs,
  onChangeInputHandler,
  wordList,
}) {
  const { spelling, meaning, category } = inputs;
  const categoryList = ["n", "v", "adj", "adv", "phr", "prep"];

  console.log("wordList", wordList);
  return (
    <>
      {wordList &&
        wordList.map((item, index) => (
          <CardContainer key={index}>
            <div>
              <div>
                <label>단어</label>
                <Input
                  name="spelling"
                  value={spelling}
                  onChange={onChangeInputHandler}
                />
              </div>
              <div>
                <label>뜻</label>
                <Input
                  name="meaning"
                  value={meaning}
                  onChange={onChangeInputHandler}
                />
              </div>
              <div>
                <label>품사</label>
                <NativeSelect
                  name="category"
                  value={category}
                  onChange={onChangeInputHandler}
                >
                  {categoryList.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            </div>
          </CardContainer>
        ))}
    </>
  );
}
const CardContainer = styled.div`
  background-color: lightgray;
  padding: 2vh;
  margin: 2vh;
  width: 35vh;
  border-radius: 1.5vh;
`;
