import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../redux/store/store";
import LogInForm from "./LogInForm";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("Given the LogInForm component", () => {
  describe("When it's invoked", () => {
    test("Then it should render one 'Username' label", () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <LogInForm />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getAllByText("Username")).toHaveLength(1);
    });

    test("Then it should render one 'Password' label", () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <LogInForm />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getAllByText("Password")).toHaveLength(1);
    });

    test("Then it should render a button", () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <LogInForm />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("When the word 'hola' is written to the name input field", () => {
    test("Then the value of the Username input field should be 'hola'", () => {
      const inputText = "hola";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <LogInForm />
          </BrowserRouter>
        </Provider>
      );

      userEvent.type(screen.getByLabelText("Username"), inputText);
      expect(screen.getByLabelText("Username")).toHaveValue(inputText);
    });

    test("Then the value of the Password input field should be 'hola'", () => {
      const inputText = "hola";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <LogInForm />
          </BrowserRouter>
        </Provider>
      );

      userEvent.type(screen.getByLabelText("Password"), inputText);
      expect(screen.getByLabelText("Password")).toHaveValue(inputText);
    });
  });

  describe("When the user type whatever the username and password input fields", () => {
    test("Then the Log-In button should be enabled", () => {
      const username = "test";
      const password = "test";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <LogInForm />
          </BrowserRouter>
        </Provider>
      );

      const usernameInput = screen.getByLabelText("Username");
      const passwordInput = screen.getByLabelText("Password");
      const loginButton = screen.getByRole("button", { name: "Log-In" });

      userEvent.type(usernameInput, username);
      userEvent.type(passwordInput, password);

      expect(loginButton).not.toBeDisabled();
    });
  });

  describe("When a user enters its username and password and submit the form", () => {
    test("Then it should call the dispatch action with its credentials", () => {
      const formData = {
        username: "test1",
        password: "test1",
      };

      render(
        <Provider store={store}>
          <BrowserRouter>
            <LogInForm />
          </BrowserRouter>
        </Provider>
      );

      const usernameInput: HTMLInputElement = screen.getByRole("textbox", {
        name: "Username",
      });
      userEvent.type(usernameInput, formData.username);
      const passwordInput: HTMLInputElement =
        screen.getByLabelText(/password/i);
      userEvent.type(passwordInput, formData.password);

      const expectedButton: HTMLButtonElement = screen.getByRole("button", {
        name: "Log-In",
      });
      userEvent.click(expectedButton);

      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
