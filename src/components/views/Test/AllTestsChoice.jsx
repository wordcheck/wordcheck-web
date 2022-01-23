import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  BackButton,
  ButtonContainer,
  Container,
  TestContentDiv,
  TopNav,
} from "../../style/WordStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import WordList from "../Card/WordList";

export default function AllTestsChoice({ cookies }) {
  const [wordlist, setWordlist] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  // Link에서 가져온 wordList
  const contents = location?.state?.cards;
  let data = [];

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
          console.log("ff", wordlist);
        })
        .catch((error) => {
          console.log("err==>", error);
        });
    });
  }, []);

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowBackIosIcon />
      </BackButton>
      <TopNav>Test</TopNav>
      <TestContentDiv>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/multiplechoice/${wordlist[0]?.contents}`}
          state={{ wordlist }}
        >
          <ButtonContainer>
            <div className="buttons">
              <span style={{ paddingBottom: "1vh" }}>사지선다</span>
              <div className="contentInfo">
                문제를 읽고 올바른 정답을 선택하세요.
              </div>
            </div>
          </ButtonContainer>
        </Link>
        <ArrowForwardIosIcon />
      </TestContentDiv>
      <TestContentDiv>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/spellspelling/${wordlist[0]?.contents}`}
          state={{ wordlist }}
        >
          <ButtonContainer>
            <div className="buttons">
              <span style={{ paddingBottom: "1vh" }}>철자맞히기 </span>
              <div className="contentInfo">단어의 철자를 직접 입력하세요.</div>
            </div>
          </ButtonContainer>
        </Link>
        <ArrowForwardIosIcon />
      </TestContentDiv>
    </Container>
  );
}
