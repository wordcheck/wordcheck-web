import React from "react";
import Input from "@mui/material/Input";
import styled from "styled-components";
import NativeSelect from "@mui/material/NativeSelect";
export default function AddWordsForm(props) {
  const categoryList = ["n", "v", "adj", "adv", "phr", "prep"];
  return (
    <>
      <CardContainer>
        <div>
          <label>단어</label>
          <Input
            value={props.spelling}
            onChange={props.onClickSpellingHandler}
          />
        </div>
        <div>
          <label>뜻</label>
          <Input value={props.meaning} onChange={props.onClickMeaningHandler} />
        </div>
        <div>
          <label>품사</label>
          <NativeSelect
            defaultValue="n"
            onChange={props.onClickCategoryHandler}
          >
            {categoryList.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </NativeSelect>
        </div>
      </CardContainer>
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
