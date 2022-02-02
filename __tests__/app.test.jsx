import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { Questions, Home, QuestionContext } from "../App";
import { Simulate } from "react-dom/test-utils";

const question = {
  question: "Are you happy?",
  answers: {
    answer_a: "Yes",
    answer_b: "No",
    answer_c: "Maybe",
  },
  correct_answers: {
    answer_a_correct: "true",
    answer_b_correct: "false",
    answer_c_correct: "false",
  },
};

describe("master quiz", () => {
  it("Should show the answers snapshot", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Home isRightAnswer={5} isQuestionAnswered={22} />
      </MemoryRouter>,
      element
    );
    expect(
      element.querySelector("[data-testid=status]").innerHTML
    ).toMatchSnapshot();
  });

  it("should show questions", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["/question"]}>
        <QuestionContext.Provider value={{ randomQuestion: () => question }}>
          <App />
        </QuestionContext.Provider>
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show correct answer", () => {
    const setIsQuestionAnswered = jest.fn();
    const setIsRightAnswer = jest.fn();

    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["/question"]}>
        <QuestionContext.Provider value={{ randomQuestion: () => question }}>
          <Questions
            setIsRightAnswer={setIsRightAnswer}
            setIsQuestionAnswered={setIsQuestionAnswered}
          />
        </QuestionContext.Provider>
      </MemoryRouter>,
      element
    );

    Simulate.click(element.querySelector("[data-testid=answer_a] button"));
    expect(setIsQuestionAnswered).toBeCalled();
    expect(setIsRightAnswer).toBeCalled();
    expect(element.innerHTML).toMatchSnapshot();
  });
});
