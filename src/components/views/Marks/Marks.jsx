import React from "react";
import {
  Container,
  Carddiv,
  SpellingDiv,
  CardDiv3,
  CategoryList,
  TitleDiv,
} from "../../style/WordStyle";

export default function Marks() {
  let marksList = JSON.parse(localStorage.getItem("marks"));

  console.log(marksList[0].contents); // [1,2,3,4,5]

  return (
    <Container>
      <TitleDiv>Mark book</TitleDiv>
      {marksList.map((mark) => (
        <Carddiv key={mark.id}>
          {/* {mark.contents} */}
          <SpellingDiv> {mark.spelling}</SpellingDiv>
          <CategoryList> {mark.category}</CategoryList>

          {mark.meaning}
        </Carddiv>
      ))}
    </Container>
  );
}
