import { Routes, Route } from "react-router-dom";
import Quizzes from "./components/Quizzes/Quizzes";
import Header from "./containers/Header";
import Questions from "./components/Questions/Questions";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Quizzes />} />
        <Route path="/quizzes/:id" element={<Questions />} />
      </Routes>
    </>
  );
}

export default App;
