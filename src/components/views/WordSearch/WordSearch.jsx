import React, { useEffect, useState } from "react";
import {
  BackButton,
  Carddiv,
  Container,
  NicknameChangeFormDiv,
  NicknameChangeInfo,
  SpellingDiv,
  SpellingVolumeUpDiv,
  TopNav,
  WrongCountDiv,
  CategoryList,
  CategoryMeaningDiv,
  MeaningDiv,
  WordCardRightDiv,
  TopNavDivContainer,
  BottomNavBoxContainer,
} from "../../style/WordStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ColorButton, CssTextField } from "../../style/LoginStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StarIcon from "@mui/icons-material/Star";
import { useSpeechSynthesis } from "react-speech-kit";
import { yellow, grey } from "@mui/material/colors";
export default function WordSearch({ cookies }) {
  const [searchWord, setSearchWord] = useState("");
  const [wordlist, setWordlist] = useState([]);
  const navigate = useNavigate();
  const [marks, setMarks] = useState(
    JSON.parse(localStorage.getItem("marks")) || ""
  );

  const [wordAll, setWordAll] = useState([]);
  const [cards, setCards] = useState([]);
  const { speak } = useSpeechSynthesis();
  useEffect(() => {
    window.localStorage.setItem("marks", JSON.stringify(marks));
  }, [marks]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: cards } = await axios.get(
          "https://wordcheck.sulrae.com/api/words/",
          {
            headers: {
              Authorization: cookies.token,
            },
          }
        );
        setCards(cards);

        const cardsPromises = cards.map((contents) =>
          axios.get(
            `https://wordcheck.sulrae.com/api/words/detail_list/?contents=${contents.contents}`,
            {
              headers: {
                Authorization: cookies.token,
              },
            }
          )
        );
        const wordAllResponse = await Promise.all(cardsPromises);
        const wordAll = wordAllResponse.map(({ data }) => data);
        setWordAll(wordAll.flat());
      } catch (error) {
        // handle any errors, rejected Promises, etc..
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(wordAll);
  const onClickMarkButtonHandler = (info) => {
    let beforeInfo = [...marks];
    if (JSON.stringify(marks).includes(JSON.stringify(info))) {
      const idx = beforeInfo.indexOf(info);
      beforeInfo.splice(idx, 1);
    } else {
      beforeInfo.push(info);
    }
    setMarks(beforeInfo);
  };

  return (
    <Container>
      <TopNavDivContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </BackButton>
        <TopNav>단어 찾기</TopNav>
      </TopNavDivContainer>
      <NicknameChangeFormDiv>
        <CssTextField
          style={{ width: "70vw" }}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <ColorButton>검색하기</ColorButton>
      </NicknameChangeFormDiv>
      <div>
        {wordAll
          .filter((word) => {
            if (searchWord == "") {
              return word;
            } else if (
              word.spelling.toLowerCase().includes(searchWord.toLowerCase())
            ) {
              return word;
            }
          })
          .map((word, key) => {
            return (
              <div key={key}>
                <Carddiv>
                  <div>
                    <WrongCountDiv>틀린횟수 :{word.wrong_count}</WrongCountDiv>
                    <SpellingVolumeUpDiv>
                      <SpellingDiv>{word.spelling}</SpellingDiv>

                      <VolumeUpIcon
                        sx={{ height: "2.5vh" }}
                        onClick={() => speak({ text: word.spelling })}
                      />
                    </SpellingVolumeUpDiv>
                    <CategoryMeaningDiv>
                      <CategoryList>{word.category}.</CategoryList>
                      <MeaningDiv> {word.meaning}</MeaningDiv>
                    </CategoryMeaningDiv>
                  </div>
                  <WordCardRightDiv>
                    {JSON.stringify(marks)?.includes(JSON.stringify(word)) ? (
                      <StarIcon
                        onClick={() => onClickMarkButtonHandler(word)}
                        sx={{ color: yellow[600] }}
                      />
                    ) : (
                      <StarIcon
                        onClick={() => onClickMarkButtonHandler(word)}
                        sx={{ color: grey[500] }}
                      />
                    )}
                  </WordCardRightDiv>
                </Carddiv>
              </div>
            );
          })}
        <BottomNavBoxContainer></BottomNavBoxContainer>
      </div>
    </Container>
  );
}
