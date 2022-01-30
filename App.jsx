import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { randomQuestion, isCorrectAnswer } from "./questions";
export const Home = ({ isRightAnswer }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>This is the home page</h1>
      <h1>You have answered {isRightAnswer} / 10</h1>
      <Link to="/question">
        <button>New Quiz</button>
      </Link>
    </div>
  );
};

export const Questions = ({ setIsRightAnswer }) => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState(randomQuestion());

  const handleAnswer = (answer) => {
    if (isCorrectAnswer(question, answer)) {
      setIsRightAnswer((prev) => prev + 1);
      navigate("/answer/correct");
    } else {
      navigate("/answer/wrong");
    }
  };

  return (
    <div>
      <h1>{question.question}</h1>
      {Object.keys(question.answers)
        .filter((value) => question.answers[value])
        .map((answer) => {
          return (
            <div key={question.id}>
              <button onClick={handleAnswer(answer)}>
                {question.answers[answer]}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export const Answers = () => {
  return (
    <>
      <Routes>
        <Route path={"correct"} element={<h1>Correct answer</h1>} />
        <Route path={"wrong"} element={<h1>Wrong answer</h1>} />
      </Routes>
      <div>
        <Link to="/">
          <button>Whats my score?</button>
        </Link>
        <Link to="/question">
          <button>New Quiz</button>
        </Link>
      </div>
    </>
  );
};

const App = () => {
  const [isRightAnswer, setIsRightAnswer] = useState(0);
  return (
    <div>
      <h1>Welcome to quizmaster</h1>
      <Routes>
        <Route path={"/"} element={<Home isRightAnswer={isRightAnswer} />} />
        <Route
          path={"/question"}
          element={<Questions setIsRightAnswer={setIsRightAnswer} />}
        />
        <Route path={"/answer/*"} element={<Answers />} />
      </Routes>
    </div>
  );
};

export default App;
