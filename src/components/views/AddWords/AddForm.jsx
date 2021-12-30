import React from "react";

export default function AddForm() {
  return (
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
          {categoryList.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </NativeSelect>
      </div>
    </CardContainer>
  );
}
const CardContainer = styled.div`
  background-color: lightgray;
  padding: 2vh;
  margin: 2vh;
  width: 35vh;
  border-radius: 1.5vh;
`;
