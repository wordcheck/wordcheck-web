import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import Input from "@mui/material/Input";
import { NativeSelect } from "@mui/material";
import {
  Container,
  Carddiv,
  CardDiv2,
  CategoryList,
  MeaningDiv,
  SpellingDiv,
  WrongCountDiv,
  StarIconDiv,
  SpellingVolumeUpDiv,
  CategoryMeaningDiv,
  EditDeleteIconDiv,
  WordCardRightDiv,
  WordListInputContainer,
} from "../../style/WordStyle";
import StarIcon from "@mui/icons-material/Star";
import { grey, yellow } from "@mui/material/colors";
import { useEffect } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useSpeechSynthesis } from "react-speech-kit";
import Home from "../Home";
import { useNavigate } from "react-router-dom";
export default function WordList({
  wordlist,
  cookies,
  setIsDeleted,
  editId,
  setEditId,
}) {
  const [editedInputs, setEditedInputs] = useState([
    {
      spelling: "",
      meaning: "",
      category: "",
    },
  ]);
  const [marks, setMarks] = useState(
    JSON.parse(localStorage.getItem("marks")) || ""
  );

  useEffect(() => {
    window.localStorage.setItem("marks", JSON.stringify(marks));
  }, [marks]);

  const { speak } = useSpeechSynthesis();
  const navigate = useNavigate();

  const { spelling, meaning, category } = editedInputs;
  const categoryList = ["n", "v", "adj", "adv", "phr", "prep"];

  const onChangeEditedInputHandler = (e) => {
    const { value, name } = e.target;
    setEditedInputs({
      ...editedInputs,
      [name]: value,
    });
  };

  const onClickModificatedButtonHandler = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API}words/${editId}/?spelling=${spelling}&meaning=${meaning}&category=${category}`,
        {},
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        setEditId("");
      })
      .catch((error) => {
        console.log("err===>", error);
      });
  };
  const onClickEditButtonHandler = (id) => {
    setEditId(id);
    const editIndex = wordlist.findIndex((i) => i.id === id);
    setEditedInputs({
      spelling: wordlist[editIndex]?.spelling,
      meaning: wordlist[editIndex]?.meaning,
      category: wordlist[editIndex]?.category,
    });
  };

  const onClickDeleteButtonHandler = (wordid) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`${process.env.REACT_APP_API}words/${wordid}`, {
          headers: {
            Authorization: cookies.token,
          },
        })
        .then((response) => {
          console.log("response", response);
          setIsDeleted(true);
        })
        .catch((error) => {
          console.log("err===>", error);
        });
    }
    setIsDeleted(false);
  };

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
      {wordlist.map((word) => (
        <Carddiv key={word.id}>
          {word.id === editId ? (
            <>
              <WordListInputContainer>
                <Input
                  name="spelling"
                  value={spelling}
                  onChange={onChangeEditedInputHandler}
                  color="secondary"
                  defaultValue={word.spelling}
                />

                <NativeSelect
                  name="category"
                  value={category}
                  defaultValue={word.category}
                  onChange={onChangeEditedInputHandler}
                >
                  {categoryList.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </NativeSelect>
                <Input
                  name="meaning"
                  value={meaning}
                  defaultValue={word.meaning}
                  onChange={onChangeEditedInputHandler}
                ></Input>

                <CheckIcon onClick={onClickModificatedButtonHandler} />
              </WordListInputContainer>
            </>
          ) : (
            <>
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
                <StarIconDiv>
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
                </StarIconDiv>
                <EditDeleteIconDiv>
                  <EditIcon onClick={() => onClickEditButtonHandler(word.id)} />
                  <DeleteIcon
                    onClick={() => {
                      onClickDeleteButtonHandler(word.id);
                    }}
                  />
                </EditDeleteIconDiv>
              </WordCardRightDiv>
            </>
          )}
        </Carddiv>
      ))}
    </Container>
  );
}
