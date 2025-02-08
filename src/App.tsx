import { Routes, Route } from "react-router-dom";
import Quizzes from "./components/Quizzes/Quizzes";
import Header from "./containers/Header";
import Game from "./components/Game/Game";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Quizzes />} />
        <Route path="/quiz/:id" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
