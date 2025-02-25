import { Routes, Route } from "react-router-dom";
import Quizzes from "./components/Quizzes/Quizzes";
import Header from "./containers/Header";
import Questions from "./components/Questions/Questions";
import Login from "./components/Authentification/Login";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Quizzes />} />
        <Route path="/quiz/:id" element={<Questions />} />
        <Route path="/login/" element={<Login />} />

      </Routes>
    </>
  );
}

export default App;
