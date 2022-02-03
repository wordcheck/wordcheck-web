import React, { useState } from "react";
import {
  BackButton,
  Container,
  NicknameChangeFormDiv,
  NicknameChangeInfo,
  TopNav,
  TopNavDivContainer,
  WordSearchInputDiv,
} from "../../style/WordStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { ColorButton, CssTextField } from "../../style/LoginStyle";
import axios from "axios";
export default function NicknameChange({ cookies }) {
  const [changedNickname, setChangedNickname] = useState();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const onChangeNicknameChangeInputHandler = (e) => {
    setChangedNickname(e.target.value);
  };
  const onClickNicknameChangeButtonHandler = () => {
    const formData = new FormData();
    formData.append("nickname", changedNickname);
    console.log(changedNickname);
    axios
      .patch(`${process.env.REACT_APP_API}accounts/profile/`, formData, {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        console.log(res);
        navigate(-1);
        alert("닉네임을 성공적으로 바꿨어요!");
      });
  };

  return (
    <Container>
      <TopNavDivContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </BackButton>
        <TopNav>닉네임 설정</TopNav>
      </TopNavDivContainer>
      <div> 닉네임을 입력해주세요.</div>
      <WordSearchInputDiv>
        <CssTextField
          value={changedNickname}
          onChange={onChangeNicknameChangeInputHandler}
          style={{ width: "490px", paddingRight: "10px" }}
        />
        <ColorButton
          onClick={onClickNicknameChangeButtonHandler}
          sx={{ width: "100px" }}
        >
          수정하기
        </ColorButton>
      </WordSearchInputDiv>
    </Container>
  );
}
