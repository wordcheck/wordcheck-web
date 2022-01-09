import React from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

export default function WordList({ wordlist, CookieToken, setIsDeleted }) {
  const onClickDeleteWord = (wordid) => {
    axios
      .delete(`http://52.78.37.13/api/words/${wordid}`, {
        headers: {
          Authorization: CookieToken,
        },
      })
      .then((response) => {
        console.log("res", response);
        setIsDeleted(true);
      })
      .catch((error) => {
        console.log("err===>", error);
      });

    setIsDeleted(false);
  };

  return (
    <div>
      {wordlist.map((word) => (
        <Carddiv key={word.id}>
          <Spellingdiv>{word.spelling}</Spellingdiv>
          <CardDiv2>
            <div>
              {word.id}
              {word.category}.{word.meaning}
            </div>
            <div>
              <EditIcon />
              <DeleteIcon
                onClick={() => {
                  onClickDeleteWord(word.id);
                }}
              />
            </div>
          </CardDiv2>
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
