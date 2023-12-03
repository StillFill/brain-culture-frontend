import { render, screen } from "@testing-library/react";
import HeaderToggle from "./HeaderToggle";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import * as router from "react-router";

test("Valida botão Dashboard", () => {
  render(
    <BrowserRouter>
      <HeaderToggle />
    </BrowserRouter>
  );

  const element = screen.getByText(/Dashboard/i);

  expect(element).toBeInTheDocument();
});

test("Valida botão Gerenciar", () => {
  render(
    <BrowserRouter>
      <HeaderToggle />
    </BrowserRouter>
  );

  const element = screen.getByText(/Gerenciar/i);

  expect(element).toBeInTheDocument();
});

test("Valida click botão Gerenciar", () => {
  const navigate = jest.fn();
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

  render(
    <BrowserRouter>
      <HeaderToggle />
    </BrowserRouter>
  );

  const element = screen.getByText(/Gerenciar/i);

  act(() => {
    element.click();
  });

  expect(navigate).toHaveBeenCalledWith("management");
});

test("Valida click botão Dashboard", () => {
  const navigate = jest.fn();
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

  render(
    <BrowserRouter>
      <HeaderToggle />
    </BrowserRouter>
  );

  const element = screen.getByText(/Dashboard/i);

  act(() => {
    element.click();
  });

  expect(navigate).toHaveBeenCalledWith("");
});
