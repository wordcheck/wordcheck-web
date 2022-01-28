import React, { useEffect, useState } from "react";
import {
  BackButton,
  Container,
  NicknameChangeFormDiv,
  NicknameChangeInfo,
  TopNav,
} from "../../style/WordStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ColorButton, CssTextField } from "../../style/LoginStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function WordSearch({ cookies, cards }) {
  const [searchWord, setSearchWord] = useState("");
  const [wordlist, setWordlist] = useState([]);
  const navigate = useNavigate();

  const contents = cards;

  useEffect(() => {
    contents.map((contents) => {
      // const formData = new FormData();
      // formData.append("contents", contents);
      console.log(contents.contents);
      axios
        .get(
          `http://52.78.37.13/api/words/detail_list/?contents=${contents.contents}`,
          {
            headers: {
              Authorization: cookies.token,
            },
          }
        )
        .then((res) => {
          let indata = res.data;
          for (var i = 0; i < indata.length; i++) {
            wordlist.push(indata[i]);
            setWordlist(wordlist);
          }
          console.log("ff", wordlist.spelling);
        })
        .catch((error) => {
          console.log("err==>", error);
        });
    });
  }, []);
  // const spellingList = wordlist.map((x) => spellingList.push(x.spelling));
  // console.log("map1", spellingList);
  // let result = wordlist.map((a) => a.spelling);
  // console.log(result);
  // console.log(wordlist);

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowBackIosIcon />
      </BackButton>
      <TopNav>단어 찾기</TopNav>
      <NicknameChangeFormDiv>
        <CssTextField
          style={{ width: "70vw" }}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <ColorButton>검색하기</ColorButton>
      </NicknameChangeFormDiv>
    </Container>
  );
}
