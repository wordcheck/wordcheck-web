import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/views/Home";
import LoginPage from "./components/views/LoginPage/LoginPage";
import SignUpPage from "./components/views/SignUpPage/SignUpPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
