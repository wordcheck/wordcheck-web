import React from "react";

export default function SpellSpellingTest() {
  const [currentNo, setCurrentNo] = useState(0);
  const [wrongWords, setWrongWords] = useState([]);
  const [problemType, setProblemType] = useState({ choice: "" });
  const location = useLocation();
  const navigate = useNavigate();

  // Link에서 가져온 wordList
  const wordList = location.state.wordlist;
  return <div></div>;
}
