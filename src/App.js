import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Card from "./components/views/Card/Card";
import AddWords from "./components/views/AddWords/AddWords";
import Home from "./components/views/Home";
import LoginPage from "./components/views/LoginPage/LoginPage";
import Mypage from "./components/views/MyPage/Mypage";
import NotFound from "./components/views/NotFound/NotFound";
import SignUpPage from "./components/views/SignUpPage/SignUpPage";
import { useCookies } from "react-cookie";
import TestsChoice from "./components/views/Test/TestsChoice";
import MultipleChoice from "./components/views/Test/MultipleChoice";
import SpellSpelling from "./components/views/Test/SpellSpelling";
import AllTestsChoice from "./components/views/Test/AllTestsChoice";
import Marks from "./components/views/Marks/Marks";
import NicknameChange from "./components/views/MyPage/NicknameChange";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import WordSearch from "./components/views/WordSearch/WordSearch";
import { StyledBottomNavigation } from "./components/style/WordStyle";
import axios from "axios";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [wordAll, setWordAll] = useState([]);
  const [cards, setCards] = useState([]);
  const [getToken, setGetToken] = useState(false);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/wordcheck-web/"
            element={
              <LoginPage
                setCookie={setCookie}
                cookies={cookies}
                setShowBottomNav={setShowBottomNav}
              />
            }
          />
          <Route
            path="/wordcheck-web/home"
            element={
              <Home
                cookies={cookies}
                cards={cards}
                setCards={setCards}
                setShowBottomNav={setShowBottomNav}
              />
            }
          />

          <Route path="/wordcheck-web/login/signup" element={<SignUpPage />} />
          <Route
            path="/wordcheck-web/addwords"
            element={<AddWords cookies={cookies} />}
          />
          <Route
            path="/wordcheck-web/marks"
            element={<Marks cookies={cookies} />}
          />
          <Route
            path="/wordcheck-web/card/:contents"
            element={<Card cookies={cookies} />}
          />
          <Route
            path="/wordcheck-web/testschoice"
            element={<TestsChoice cookies={cookies} />}
          />
          <Route
            path="/wordcheck-web/alltestchoice"
            element={
              <AllTestsChoice
                wordlist={wordAll}
                cookies={cookies}
                wordAll={wordAll}
              />
            }
          />
          <Route
            path="/wordcheck-web/multiplechoice/:contents"
            element={<MultipleChoice cookies={cookies} />}
          />
          <Route
            path="/wordcheck-web/spellspelling/:contents"
            element={<SpellSpelling cookies={cookies} />}
          />
          <Route
            path="/wordcheck-web/wordsearch"
            element={<WordSearch cookies={cookies} cards={cards} />}
          />
          <Route
            path="/wordcheck-web/mypage"
            element={<Mypage cookies={cookies} removeCookie={removeCookie} />}
          />
          <Route
            path="/wordcheck-web/mypage/nicknamechange"
            element={
              <NicknameChange cookies={cookies} removeCookie={removeCookie} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {showBottomNav && (
          <StyledBottomNavigation
            showLabels
            style={{
              position: "sticky",
              bottom: "0",
              borderTop: "1px solid lightgray",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Link
              to="/wordcheck-web/alltestchoice"
              state={{ cards }}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <BottomNavigationAction
                // label="test all"
                icon={<QuizIcon />}
              />
            </Link>
            <Link
              to="/wordcheck-web/addwords"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <BottomNavigationAction
                // label="add words"
                icon={<AddIcon />}
              />
            </Link>
            <Link
              to="/wordcheck-web/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <BottomNavigationAction
                // label="home"
                icon={<HomeIcon />}
              />
            </Link>
            <Link
              to="/wordcheck-web/wordsearch"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <BottomNavigationAction
                // label="search"
                icon={<SearchIcon />}
              />
            </Link>
            <Link
              to="/wordcheck-web/marks"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <BottomNavigationAction
                // label="marks"
                icon={<StarIcon />}
              />
            </Link>
          </StyledBottomNavigation>
        )}
      </Router>
    </div>
  );
}

export default App;
