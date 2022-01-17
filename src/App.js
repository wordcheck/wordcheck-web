import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Card from "./components/views/Card/Card";
import AddWords from "./components/views/AddWords/AddWords";
import Home from "./components/views/Home";
import LoginPage from "./components/views/LoginPage/LoginPage";
import Mypage from "./components/views/MyPage/Mypage";
import NotFound from "./components/views/NotFound/NotFound";
import SignUpPage from "./components/views/SignUpPage/SignUpPage";
import Test from "./components/views/Test/Test";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

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
            <Route
              path="/card/:contents"
              element={<Card cookies={cookies} />}
            />
            <Route
              path="/test/:contents"
              element={<Test cookies={cookies} />}
            />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="*" element={<NotFound />} />
          </>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
