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
import { Alert, Snackbar } from "@mui/material";
import NickNameChangeSuccessModal from "./NickNameChangeSuccessModal";
export default function NicknameChange({ cookies }) {
  const [changedNickname, setChangedNickname] = useState();
  const [open, setOpen] = useState(false);

  const [getSuccessModal, setGetSuccessModal] = useState(false);
  const [nicknameChangeFailAlert, setNicknameChangeFailAlert] = useState(false);

  const navigate = useNavigate();

  const onChangeNicknameChangeInputHandler = (e) => {
    setChangedNickname(e.target.value);
  };
  const onClickNicknameChangeButtonHandler = () => {
    if (changedNickname === "") {
      return setNicknameChangeFailAlert(true);
    }
    const formData = new FormData();
    formData.append("nickname", changedNickname);

    axios
      .patch(`${process.env.REACT_APP_API}accounts/profile/`, formData, {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        setGetSuccessModal(true);
      })
      .catch((err) => {
        // console.log(err);
        setNicknameChangeFailAlert(true);
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
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={nicknameChangeFailAlert}
        autoHideDuration={3000}
        onClose={() => setNicknameChangeFailAlert(false)}
      >
        <Alert
          onClose={() => setNicknameChangeFailAlert(false)}
          severity="success"
          sx={{
            width: "500px",
            background: "rgb(211, 47, 47)",
            color: "rgb(255, 255, 255)",
            fontSize: "17px",
          }}
        >
          이미 존재하거나 사용할 수 없는 닉네임입니다.
        </Alert>
      </Snackbar>
      {getSuccessModal && (
        <NickNameChangeSuccessModal setGetSuccessModal={setGetSuccessModal} />
      )}
    </Container>
  );
}
