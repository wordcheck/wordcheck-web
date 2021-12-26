import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/views/Home";
import LoginPage from "./components/views/LoginPage/LoginPage";
import NotFound from "./components/views/NotFound/NotFound";
import SignUpPage from "./components/views/SignUpPage/SignUpPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="wordcheck-web/" element={<Home />} />
          <Route path="wordcheck-web/login" element={<LoginPage />} />
          <Route path="wordcheck-web/login/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
