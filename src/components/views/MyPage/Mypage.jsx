import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton, Container, NameDiv } from "../../style/WordStyle";

import { ColorButton } from "../../style/LoginStyle";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ProfileLottie from "../../../utils/ProfileLottie";

export default function Mypage({ cookies, removeCookie }) {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  }, []);

  const onClickLogoutHandler = () => {
    if (window.confirm("정말 로그아웃하시겠습니까?")) {
      removeCookie("token");
      removeCookie("nickname");
      navigate("/");
    }
  };
  if (loading) return <ProfileLottie />;

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowBackIosIcon />
      </BackButton>
      <img
        src={profile.profile_image}
        alt="profilePicture"
        width="70%"
        height="90%"
      />

      <NameDiv>{cookies.nickname}님 </NameDiv>
      <ColorButton onClick={() => onClickLogoutHandler()}>Sign out</ColorButton>
    </Container>
  );
}
