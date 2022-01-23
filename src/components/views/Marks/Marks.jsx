import React, { useEffect, useState } from "react";
import {
  Container,
  Carddiv,
  SpellingDiv,
  CardDiv3,
  CategoryList,
  TitleDiv,
} from "../../style/WordStyle";
import StarIcon from "@mui/icons-material/Star";
import { grey, red, yellow } from "@mui/material/colors";
export default function Marks() {
  const [marksList, setMarksList] = useState(
    JSON.parse(localStorage.getItem("marks")) || ""
  );
  // let marksList = JSON.parse(localStorage.getItem("marks"));
  console.log(marksList);
  useEffect(() => {
    window.localStorage.setItem("marks", JSON.stringify(marksList));
  }, [marksList, setMarksList]);

  const onClickMarkButtonHandler = (mark) => {
    let beforeMark = [...marksList];
    const idx = beforeMark.indexOf(mark);
    beforeMark.splice(idx, 1);
    console.log("del", beforeMark);
    setMarksList(beforeMark);

    // let beforeInfo = [...marks];
    // if (JSON.stringify(marks).includes(JSON.stringify(info))) {
    //   const idx = beforeInfo.indexOf(info);
    //   beforeInfo.splice(idx, 1);
    // } else {
    //   beforeInfo.push(info);
    // }
    // setMarks(beforeInfo);
  };

  return (
    <Container>
      <TitleDiv>Mark book</TitleDiv>
      {marksList?.map((mark) => (
        <Carddiv key={mark.id}>
          <StarIcon
            onClick={() => onClickMarkButtonHandler(mark)}
            sx={{ color: yellow[600] }}
          />
          <SpellingDiv> {mark.spelling}</SpellingDiv>
          <CategoryList> {mark.category}</CategoryList>

          {mark.meaning}
        </Carddiv>
      ))}
    </Container>
  );
}
