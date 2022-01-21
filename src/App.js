import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "nickname"]);

  return (
    <div>
      <Router>
        <Routes>
          <>
            <Route path="/" element={<Home cookies={cookies} />} />
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
              path="/mypage"
              element={<Mypage cookies={cookies} removeCookie={removeCookie} />}
            />
            <Route path="*" element={<NotFound />} />
          </>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
