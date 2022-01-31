import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Home } from "../App";
import { Questions } from "../questions";

describe("Home page", () => {
  it("Should show the component snapshot", () => {
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
});

describe("Question page", () => {
  it("Should return simulated click", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Questions />
      </MemoryRouter>,
      element
    );
    expect(element.querySelector("[data-testid=clicked]"));
  });
});
