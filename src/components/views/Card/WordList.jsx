import React, { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import Input from "@mui/material/Input";
import { NativeSelect } from "@mui/material";

export default function WordList({ wordlist, CookieToken, setIsDeleted }) {
  const [isEdited, setIsEdited] = useState(false); // 수정모드
  const [editId, setEditId] = useState("");
  const onClickDeleteWord = (wordid) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
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

  console.log(
    "예",
    wordlist.findIndex((i) => i.id == editId)
  );

  console.log("ffwedfw", wordlist[0]);
  const categoryList = ["n", "v", "adj", "adv", "phr", "prep"];

  const onClickEditWord = (id) => {
    console.log(id);
    setIsEdited(true);
    // newArr[id] = true;
    // console.log(newArr)
    // setIsEdited(true);
  };
  // let newArr = Array(wordlist.length).fill(false);
  // console.log(wordlist);
  // console.log(newArr);
  // const checkwordlist = wordlist.concat(false);
  // console.log("ff", checkwordlist);
  return (
    <div>
      {wordlist.map((word) => (
        <Carddiv key={word.id}>
          {word.id == editId ? (
            <>
              <Spellingdiv>
                <Input color="secondary" defaultValue={word.spelling}></Input>
              </Spellingdiv>
              <NativeSelect
                name="category"
                defaultvalue={word.category}
                // onChange={onChangeInputHandler}
              >
                {categoryList.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </NativeSelect>
              <Input defaultValue={word.meaning}></Input>
              <CheckIcon
                onClick={() => {
                  setEditId("");
                }}
              />
            </>
          ) : (
            <>
              <Spellingdiv>{word.spelling}</Spellingdiv>
              <CardDiv2>
                <div>
                  {word.id}
                  {word.category}.{word.meaning}
                </div>
                <div>
                  <EditIcon
                    onClick={() => {
                      onClickEditWord(word.id);
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
