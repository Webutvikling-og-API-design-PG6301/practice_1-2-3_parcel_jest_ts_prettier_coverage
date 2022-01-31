import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Home } from "../App";
import { Questions } from "../App";
import { Simulate } from "react-dom/test-utils";
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
