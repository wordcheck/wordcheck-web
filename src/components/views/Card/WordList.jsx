import React, { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import Input from "@mui/material/Input";
import { NativeSelect } from "@mui/material";
import Cookies from "universal-cookie";

export default function WordList({
  wordlist,
  CookieToken,
  setIsDeleted,
  editId,
  setEditId,
  setIsEdited,
}) {
  // const [isEdited, setIsEdited] = useState(false); // 수정모드
  const editIndex = wordlist.findIndex((i) => i.id === editId);
  const [editedInputs, setEditedInputs] = useState([
    {
      spelling: wordlist[editIndex]?.spelling || "",
      meaning: wordlist[editIndex]?.meaning || "",
      category: wordlist[editIndex]?.spelling || "",
    },
  ]);
  console.log(editIndex);
  const { spelling, meaning, category } = editedInputs;
  const categoryList = ["n", "v", "adj", "adv", "phr", "prep"];

  const onChangeEditedInputHandler = (e) => {
    const { value, name } = e.target;
    setEditedInputs({
      ...editedInputs,
      [name]: value,
    });
  };
  const onClickEditWord = () => {
    if (!editedInputs.spelling) {
      editedInputs.spelling = "";
    } else if (!editedInputs.meaning) {
      editedInputs.meaning = "";
    } else if (!editedInputs.category) {
      editedInputs.category = "";
    }

    axios
      .patch(
        `http://52.78.37.13/api/words/${editId}/?spelling=${editedInputs.spelling}&meaning=${editedInputs.meaning}&category=${editedInputs.category}`,
        {},
        {
          headers: {
            Authorization: CookieToken,
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

  const onClickDeleteWord = (wordid) => {
    if (window.confirm(" 정말 삭제하시겠습니까?")) {
      axios
        .delete(`http://52.78.37.13/api/words/${wordid}`, {
          headers: {
            Authorization: CookieToken,
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
    <div>
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
              <NativeSelect
                name="category"
                value={category}
                // defaultValue={word.category}
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
              <CheckIcon onClick={onClickEditWord} />
            </>
          ) : (
            <>
              <Spellingdiv>{word.spelling}</Spellingdiv>
              <CardDiv2>
                <div>
                  {word.category}.{word.meaning}
                </div>
                <div>
                  <EditIcon
                    onClick={() => {
                      setEditId(word.id);
                    }}
                  />
                  <DeleteIcon
                    onClick={() => {
                      onClickDeleteWord(word.id);
                    }}
                  />
                </div>
              </CardDiv2>
            </>
          )}
        </Carddiv>
      ))}
    </div>
  );
}

const Carddiv = styled.div`
  background-color: lightgray;
  padding: 1.5vh;
  margin: 1.2vh;
  border-radius: 1vh;
  display: flex;
`;

const Spellingdiv = styled.div`
  width: 11vh;
`;
const CardDiv2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
