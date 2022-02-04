import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AccountSettingDiv,
  AccountSettingDiv2,
  BackButton,
  Container,
  DataInfoDiv,
  DataInfoTipDiv,
  DataTop3BoldSpan,
  DataTop3Div,
  DataTop3Li,
  DataTop3Span,
  EmptyUserDataDiv,
  EmptyUserDataInfoDiv,
  FootDiv,
  ImgDiv,
  NameDiv,
  TopNav,
  TopNavDivContainer,
  UserDataDiv,
  UserDiv,
} from "../../style/WordStyle";

import { ColorButton } from "../../style/LoginStyle";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ProfileLottie from "../../../utils/ProfileLottie";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Button, IconButton, Input } from "@mui/material";
import LogoutModal from "./LogoutModal";
import ProfileChangeModal from "./ProfileChangeModal";
import WithdrawalModal from "./WithdrawalModal";

export default function Mypage({ cookies, removeCookie, setShowBottomNav }) {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [imgsubmit, setImgsubmit] = useState(false);
  const [wordAll, setWordAll] = useState([]);
  const [cards, setCards] = useState([]);
  const [getLogoutModal, setGetLogoutModal] = useState(false);
  const [getProfileChangeModal, setGetProfileChangeModal] = useState(false);
  const [getWithdrawalModal, setGetWithdrawalModal] = useState(false);
  const navigate = useNavigate();
  const profileImgInput = useRef();

  useEffect(() => {
    setShowBottomNav(false);
  }, []);

  useEffect(() => {
    axios
      .patch(
        `${process.env.REACT_APP_API}accounts/profile/`,
        {},
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setProfile(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [imgsubmit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: cards } = await axios.get(
          `${process.env.REACT_APP_API}words/`,
          {
            headers: {
              Authorization: cookies.token,
            },
          }
        );
        setCards(cards);

        const cardsPromises = cards.map((contents) =>
          axios.get(
            `${process.env.REACT_APP_API}words/detail_list/?contents=${contents.contents}`,
            {
              headers: {
                Authorization: cookies.token,
              },
            }
          )
        );
        const wordAllResponse = await Promise.all(cardsPromises);
        const wordAll = wordAllResponse.map(({ data }) => data);
        setWordAll(wordAll);
      } catch (error) {
        // handle any errors, rejected Promises, etc..
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const wordlist = wordAll.flat();
  wordlist.sort(function (a, b) {
    return b.wrong_count - a.wrong_count;
  });
  let WrongSum = 0;
  wordlist.forEach((item) => (WrongSum += item.wrong_count));

  const onClickLogoutHandler = () => {
    setGetLogoutModal(true);
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
      .patch(`${process.env.REACT_APP_API}accounts/profile/`, formData, {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        setImgsubmit(true);

        setGetProfileChangeModal(true);
      })
      .catch((err) => console.log(err));
  };
  console.log(wordlist.length);

  if (loading) return <ProfileLottie />;

  return (
    <Container>
      <TopNavDivContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </BackButton>
        <TopNav>설정</TopNav>
      </TopNavDivContainer>
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
      {wordlist.length === 0 ? (
        <>
          <EmptyUserDataDiv>
            <EmptyUserDataInfoDiv>
              단어를 채워 테스트를 진행해보세요
            </EmptyUserDataInfoDiv>
            <EmptyUserDataInfoDiv>
              재미있는 결과를 알려드릴게요!
            </EmptyUserDataInfoDiv>
          </EmptyUserDataDiv>
        </>
      ) : (
        <UserDataDiv>
          <DataInfoDiv>
            {profile.nickname}님의 평균 틀린횟수는
            <DataTop3BoldSpan>
              {(WrongSum / wordlist.length).toFixed(2)}
            </DataTop3BoldSpan>
            회입니다.
          </DataInfoDiv>
          <DataInfoTipDiv>
            Tip:시험을 통해 틀린횟수를 줄여보세요!
          </DataInfoTipDiv>

          <DataTop3Div>가장 많이 틀린 단어 Top3</DataTop3Div>
          <ul>
            <DataTop3Li>
              {wordlist[0]?.spelling}{" "}
              <DataTop3Span>
                {wordlist[0]?.category} {wordlist[0]?.meaning}
              </DataTop3Span>
            </DataTop3Li>
            <DataTop3Li>
              {wordlist[1]?.spelling}{" "}
              <DataTop3Span>
                {wordlist[1]?.category} {wordlist[1]?.meaning}
              </DataTop3Span>
            </DataTop3Li>
            <DataTop3Li>
              {wordlist[2]?.spelling}{" "}
              <DataTop3Span>
                {wordlist[2]?.category} {wordlist[2]?.meaning}
              </DataTop3Span>
            </DataTop3Li>
          </ul>
        </UserDataDiv>
      )}

      <AccountSettingDiv>
        <div className="info">Account Settings</div>
        <Link
          to="/wordcheck-web/mypage/nicknamechange"
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
        <AccountSettingDiv2 onClick={() => setGetWithdrawalModal(true)}>
          회원탈퇴
        </AccountSettingDiv2>
      </AccountSettingDiv>
      {/* <FootDiv>버전정보 : 0.1.0v</FootDiv> */}
      {getLogoutModal && (
        <LogoutModal
          setGetLogoutModal={setGetLogoutModal}
          removeCookie={removeCookie}
        />
      )}
      {getProfileChangeModal && (
        <ProfileChangeModal
          setGetProfileChangeModal={setGetProfileChangeModal}
        />
      )}
      {getWithdrawalModal && (
        <WithdrawalModal
          setGetWithdrawalModal={setGetWithdrawalModal}
          cookies={cookies}
          nickname={profile.nickname}
          removeCookie={removeCookie}
        />
      )}
    </Container>
  );
}
