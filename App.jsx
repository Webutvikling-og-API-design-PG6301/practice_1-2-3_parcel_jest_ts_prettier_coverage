import React, { useState, useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { randomQuestion, isCorrectAnswer } from "./questions";

export const QuestionContext = React.createContext({ randomQuestion });

export const Home = ({ isRightAnswer, isQuestionAnswered }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>This is the home page</h1>
      <h1 data-testid={"status"}>
        You have answered {isRightAnswer} / {isQuestionAnswered}
      </h1>
      <Link to="/question">
        <button>New Quiz</button>
      </Link>
    </div>
  );
};

export const Questions = ({ setIsRightAnswer, setIsQuestionAnswered }) => {
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    setIsQuestionAnswered((prev) => prev + 1);
    if (isCorrectAnswer(question, answer)) {
      setIsRightAnswer((prev) => prev + 1);
      navigate("/answer/correct");
    } else {
      navigate("/answer/wrong");
    }
  };

  const { randomQuestion } = useContext(QuestionContext);
  const [question] = useState(randomQuestion());

  return (
    <div>
      <h1>{question.question}</h1>
      {Object.keys(question.answers)
        .filter((value) => question.answers[value])
        .map((answer, idx) => {
          return (
            <div key={idx} data-testid={answer}>
              <button onClick={() => handleAnswer(answer)}>
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
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(0);
  return (
    <div>
      <h1>Welcome to quizmaster</h1>
      <Routes>
        <Route
          path={"/"}
          element={
            <Home
              isRightAnswer={isRightAnswer}
              isQuestionAnswered={isQuestionAnswered}
            />
          }
        />
        <Route
          path={"/question"}
          element={
            <Questions
              setIsRightAnswer={setIsRightAnswer}
              setIsQuestionAnswered={setIsQuestionAnswered}
            />
          }
        />
        <Route path={"/answer/*"} element={<Answers />} />
      </Routes>
    </div>
  );
};

export default App;
