import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Card from "./components/views/Card/Card";
import AddWords from "./components/views/AddWords/AddWords";
import Home from "./components/views/Home";
import LoginPage from "./components/views/LoginPage/LoginPage";
import Mypage from "./components/views/MyPage/Mypage";
import NotFound from "./components/views/NotFound/NotFound";
import SignUpPage from "./components/views/SignUpPage/SignUpPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/signup" element={<SignUpPage />} />
          <Route path="/addwords" element={<AddWords />} />
          <Route path="/card" element={<Card />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
