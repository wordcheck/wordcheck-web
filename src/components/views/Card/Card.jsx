import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { ColorButton } from "../../style/LoginStyle";

export default function Card() {
  const [wordlist, setWordlist] = useState([]);
  const cookies = new Cookies();
  const CookieToken = cookies.get("Token");
  const { contents } = useParams();

  useEffect(() => {
    axios
      .get(`http://52.78.37.13/api/words/detail_list/?contents=${contents}`, {
        headers: {
          Authorization: CookieToken,
        },
      })
      .then((response) => {
        setWordlist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Word = wordlist.map((word) => (
    <Carddiv key={word.id}>
      {word.spelling}
      {word.category}
      {word.meaning}
    </Carddiv>
  ));

  return (
    <>
      <div>title:{wordlist[0]?.contents}</div>
      <ColorButton>시험보기</ColorButton>
      {Word}
    </>
  );
}

const Carddiv = styled.div`
  background-color: lightgray;
  padding: 1vh;
  margin: 1vh;
  border-radius: 1vh;
`;
