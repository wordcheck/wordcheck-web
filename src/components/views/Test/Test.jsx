import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Test(props) {
  const location = useLocation();
  const [testWords, setTestWords] = useState("");

  useEffect(() => {
    axios
      .get(`http://52.78.37.13/api/words/search/?target=word`, {
        headers: {
          Authorization: props.cookies.token,
        },
      })
      .then((response) => {
        setTestWords(response.data);
      })
      .catch((error) => {
        console.log("error->>>", error);
      });
  }, []);
  console.log("testWord", testWords);
  console.log("location", location);

  return (
    <>
      <div>시험화면</div>
      <div></div>
    </>
  );
}
