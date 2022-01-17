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
} from "../../style/WordStyle";

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
    // let spelling = editedInputs.spelling;
    // let meaning = editedInputs.meaning;
    // let category = editedInputs.category;
    console.log(editedInputs);
    // if (spelling == "undefined") {
    //   spelling = "";
    // } else if (meaning == "undefined") {
    //   meaning = "";
    // } else if (category == "undefinded") {
    //   category = "";
    // }
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

  return (
    <Container>
      {wordlist.map((word) => (
        <Carddiv key={word.id}>
          {word.id === editId ? (
            <>
              <Spellingdiv>
                <Input
                  name="spelling"
                  value={spelling}
                  onChange={onChangeEditedInputHandler}
                  color="secondary"
                  defaultValue={word.spelling}
                ></Input>
              </Spellingdiv>
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
                  </NativeSelect>{" "}
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
              <Spellingdiv>{word.spelling}</Spellingdiv>
              <CardDiv2>
                <div>
                  <div>{word.id}</div>
                  {word.category} . {word.meaning}
                </div>
                <div>
                  <EditIcon onClick={() => onClickEditButtonHandler(word.id)} />
                  <DeleteIcon
                    onClick={() => {
                      onClickDeleteButtonHandler(word.id);
                    }}
                  />
                </div>
              </CardDiv2>
            </>
          )}
        </Carddiv>
      ))}
    </Container>
  );
}
