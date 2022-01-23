import React, { useState } from "react";
import styled from "styled-components";
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
  Spellingdiv,
  CategoryList,
  CardDiv3,
  IconDiv,
  SpellingDiv,
  WrongCountDiv,
} from "../../style/WordStyle";
import CircleIcon from "@mui/icons-material/Circle";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import StarIcon from "@mui/icons-material/Star";
import { grey, red, yellow } from "@mui/material/colors";
import { useEffect } from "react";

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
        `http://52.78.37.13/api/words/${editId}/?spelling=${spelling}&meaning=${meaning}&category=${category}`,
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
        .delete(`http://52.78.37.13/api/words/${wordid}`, {
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

  useEffect(() => {
    window.localStorage.setItem("marks", JSON.stringify(marks));
  }, [marks]);

  const WrongCountIcon = (wrong) => {
    console.log(wrong);
    if (wrong === 0) {
      return (
        <WrongCountDiv style={{ backgroundColor: "#00b300" }}>
          {wrong}
        </WrongCountDiv>
      );
    } else if ((wrong >= 1) & (wrong <= 3)) {
      return (
        <WrongCountDiv style={{ backgroundColor: "#ffc61a" }}>
          {wrong}
        </WrongCountDiv>
      );
    } else if (wrong > 3) {
      return (
        <WrongCountDiv style={{ backgroundColor: "#ff471a" }}>
          {wrong}
        </WrongCountDiv>
      );
    }
  };

  return (
    <Container>
      {wordlist.map((word) => (
        <Carddiv key={word.id}>
          {word.id === editId ? (
            <>
              <IconDiv>
                <Input
                  name="spelling"
                  value={spelling}
                  onChange={onChangeEditedInputHandler}
                  color="secondary"
                  defaultValue={word.spelling}
                ></Input>
              </IconDiv>
              <CardDiv2>
                <div>
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
                </div>
                <CheckIcon onClick={onClickModificatedButtonHandler} />
              </CardDiv2>
            </>
          ) : (
            <>
              <IconDiv>
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
                {/* <WrongCountDiv> {word.wrong_count}</WrongCountDiv> */}

                {WrongCountIcon(word.wrong_count)}
              </IconDiv>
              <SpellingDiv>{word.spelling}</SpellingDiv>
              <CardDiv2>
                <CategoryList>{word.category}</CategoryList>
                <CardDiv3>
                  <div> {word.meaning}</div>
                  <div>
                    <EditIcon
                      onClick={() => onClickEditButtonHandler(word.id)}
                    />
                    <DeleteIcon
                      onClick={() => {
                        onClickDeleteButtonHandler(word.id);
                      }}
                    />
                  </div>
                </CardDiv3>
              </CardDiv2>
            </>
          )}
        </Carddiv>
      ))}
    </Container>
  );
}
