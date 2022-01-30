import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>This is the home page</h1>
      <button onClick={() => navigate("/question")}>New Quiz</button>
    </div>
  );
};

export const Questions = () => {
  return (
    <div>
      <h1>This page will give you a new question</h1>
    </div>
  );
};

export const Answers = () => {};

const App = () => {
  return (
    <div>
      <h1>Welcome to quizmaster</h1>
      <Routes>
        <Route path={"/"} element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
