import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Card from "./components/views/Card/Card";
import CardCreate from "./components/views/CardCreate/CardCreate";
import Home from "./components/views/Home";
import LoginPage from "./components/views/LoginPage/LoginPage";
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
          <Route path="*" element={<NotFound />} />
          <Route path="/cardcreate" element={<CardCreate />}></Route>
          <Route path="/card" element={<Card />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
