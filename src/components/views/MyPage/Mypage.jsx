import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AccountSettingDiv,
  AccountSettingDiv2,
  BackButton,
  Container,
  FootDiv,
  ImgDiv,
  NameDiv,
  TopNav,
  UserDiv,
} from "../../style/WordStyle";

import { ColorButton } from "../../style/LoginStyle";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ProfileLottie from "../../../utils/ProfileLottie";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Button, IconButton, Input } from "@mui/material";

export default function Mypage({ cookies, removeCookie }) {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [imgsubmit, setImgsubmit] = useState(false);
  const navigate = useNavigate();
  const profileImgInput = useRef();
  useEffect(() => {
    axios
      .patch(
        "http://52.78.37.13/api/accounts/profile/",
        {},
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      )
      .then((response) => {
        setProfile(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [imgsubmit]);

  const onClickLogoutHandler = () => {
    if (window.confirm("정말 로그아웃하시겠습니까?")) {
      removeCookie("token");
      removeCookie("nickname");
      navigate("/");
    }
  };
  const onClickInputBtn = (e) => {
    e.preventDefault();
    profileImgInput.current.click();
  };

  const onChangeImgChange = (e) => {
    const formData = new FormData();
    console.log(e.target.files[0]);
    formData.append("profile_image", e.target.files[0]);
    axios
      .patch("http://52.78.37.13/api/accounts/profile/", formData, {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        setImgsubmit(true);

        alert("프로필 사진을 성공적으로 바꿨어요.");
      })
      .catch((err) => console.log(err));
  };

  if (loading) return <ProfileLottie />;

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowBackIosIcon />
      </BackButton>
      <TopNav>설정</TopNav>
      <ImgDiv>
        <img
          className="profile"
          src={profile.profile_image}
          alt="profilePicture"
        />
      </ImgDiv>
      <UserDiv>
        <div>{profile.nickname}님 </div>
        <ColorButton
          style={{ height: "5vh" }}
          onClick={() => onClickLogoutHandler()}
        >
          Sign out
        </ColorButton>
      </UserDiv>
      <AccountSettingDiv>
        <div className="info">Account Settings</div>
        <Link
          to="/mypage/nicknamechange"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <AccountSettingDiv2>닉네임</AccountSettingDiv2>
        </Link>

        <input
          ref={profileImgInput}
          onChange={onChangeImgChange}
          type="file"
          accept="image/*"
          name="file"
          style={{ display: "none" }}
        />
        <AccountSettingDiv2 onClick={onClickInputBtn}>
          프로필 사진 수정
        </AccountSettingDiv2>

        <AccountSettingDiv2> 회원탈퇴</AccountSettingDiv2>
      </AccountSettingDiv>
      <FootDiv>버전정보 : 0.1.0v</FootDiv>
    </Container>
  );
}
