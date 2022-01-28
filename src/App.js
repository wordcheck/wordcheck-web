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
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import QuizIcon from "@mui/icons-material/Quiz";
import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import WordSearch from "./components/views/WordSearch/WordSearch";
import { StyledBottomNavigation } from "./components/style/WordStyle";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "nickname"]);
  const [cards, setCards] = useState([]);

  return (
    <div>
      <Router>
        <Routes>
          <>
            <Route
              path="/"
              element={
                <Home cookies={cookies} cards={cards} setCards={setCards} />
              }
            />
            <Route
              path="/login"
              element={<LoginPage setCookie={setCookie} />}
            />
            <Route path="/login/signup" element={<SignUpPage />} />
            <Route path="/addwords" element={<AddWords cookies={cookies} />} />
            <Route path="/marks" element={<Marks cookies={cookies} />} />
            <Route
              path="/card/:contents"
              element={<Card cookies={cookies} />}
            />
            <Route
              path="/testschoice"
              element={<TestsChoice cookies={cookies} />}
            />
            <Route
              path="/alltestchoice"
              element={<AllTestsChoice cookies={cookies} />}
            />
            <Route
              path="/multiplechoice/:contents"
              element={<MultipleChoice cookies={cookies} />}
            />
            <Route
              path="/spellspelling/:contents"
              element={<SpellSpelling cookies={cookies} />}
            />
            <Route
              path="/wordsearch"
              element={
                <WordSearch cookies={cookies} removeCookie={removeCookie} />
              }
            />
            <Route
              path="/mypage"
              element={<Mypage cookies={cookies} removeCookie={removeCookie} />}
            />
            <Route
              path="/mypage/nicknamechange"
              element={
                <NicknameChange cookies={cookies} removeCookie={removeCookie} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </>
        </Routes>
        <StyledBottomNavigation
          showLabels
          style={{
            position: "fixed",
            bottom: "0",
            borderTop: "1px solid lightgray",
          }}
        >
          <BottomNavigationAction
            // label="test all"
            icon={
              <Link
                to="/alltestchoice"
                state={{ cards }}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <QuizIcon />
              </Link>
            }
          />
          <BottomNavigationAction
            // label="add words"
            icon={
              <Link
                to="/addwords"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <AddIcon />
              </Link>
            }
          />
          <BottomNavigationAction
            // label="home"
            icon={
              <Link
                to="/"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <HomeIcon />
              </Link>
            }
          />
          <BottomNavigationAction
            // label="search"
            icon={
              <Link
                to="/wordsearch"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <SearchIcon />
              </Link>
            }
          />
          <BottomNavigationAction
            // label="marks"
            icon={
              <Link
                to="/marks"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <StarIcon />
              </Link>
            }
          />
        </StyledBottomNavigation>
      </Router>
    </div>
  );
}

export default App;
