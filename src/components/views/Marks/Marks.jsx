import React from "react";
import { Container } from "../../style/WordStyle";

export default function Marks() {
  let marksList = JSON.parse(localStorage.getItem("marks"));

  console.log(marksList[0].contents); // [1,2,3,4,5]

  return (
    <Container>
      {marksList.map((mark) => (
        <div key={mark.id}>
          {mark.contents}
          {mark.spelling}
          {mark.category}
          {mark.meaning}
        </div>
      ))}
    </Container>
  );
}
