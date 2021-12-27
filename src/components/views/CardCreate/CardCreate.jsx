import React from "react";
import { Container, CssTextField } from "../../style/LoginStyle";
import Input from "@mui/material/Input";
export default function CardCreate() {
  return (
    <Container>
      <div>
        <CssTextField label="title" variant="standard" />
        <button>수정</button>
        <button>지우기</button>
      </div>
      <div>
        <label>단어</label>
        <Input />
      </div>
      <div>
        <label>뜻</label>
        <Input />
      </div>
      <div>
        <label>품사</label>
        <Input />
      </div>
    </Container>
  );
}
