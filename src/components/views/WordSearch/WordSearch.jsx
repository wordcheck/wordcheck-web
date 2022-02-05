import React, { useEffect, useState } from "react";
import {
  BackButton,
  Carddiv,
  Container,
  SpellingDiv,
  SpellingVolumeUpDiv,
  TopNav,
  WrongCountDiv,
  CategoryList,
  CategoryMeaningDiv,
  MeaningDiv,
  WordCardRightDiv,
  TopNavDivContainer,
  WordSearchInputDiv,
  WordSearchCardDiv,
} from "../../style/WordStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ColorButton, CssTextField } from "../../style/WordStyle";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StarIcon from "@mui/icons-material/Star";
import { useSpeechSynthesis } from "react-speech-kit";
import { yellow, grey } from "@mui/material/colors";

export default function WordSearch({ cookies }) {
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();
  const [marks, setMarks] = useState(
    JSON.parse(localStorage.getItem("marks")) || ""
  );

  const [wordAll, setWordAll] = useState([]);
  const [cards, setCards] = useState([]);
  const { speak } = useSpeechSynthesis();

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

        const cardsPromises = cards.map((cards) =>
          axios.get(
            `${process.env.REACT_APP_API}words/detail_list/?contents=${cards.contents}`,
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
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    window.localStorage.setItem("marks", JSON.stringify(marks));
  }, [marks]);

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
  if (!cookies.token) {
    return <Navigate to="/wordcheck-web/" />;
  }

  return (
    <Container>
      <TopNavDivContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </BackButton>
        <TopNav>단어 찾기</TopNav>
      </TopNavDivContainer>
      <WordSearchInputDiv>
        <CssTextField
          style={{ width: "490px", paddingRight: "10px" }}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <ColorButton sx={{ width: "100px" }}>검색하기</ColorButton>
      </WordSearchInputDiv>
      <WordSearchCardDiv>
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
      </WordSearchCardDiv>
    </Container>
  );
}
