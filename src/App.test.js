import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

test("inputs should be initially empty", () => {
    render(<App/>)
    const emailInputElement = screen.getByRole("textbox")
    const passwordInputElement = screen.getByLabelText("password")
    const confirmPassInputElement = screen.getByLabelText(/confirm password/i)
    expect(emailInputElement.value).toBe("")
    expect(passwordInputElement.value).toBe("")
    expect(confirmPassInputElement.value).toBe("")
})

test("should be able to type an email", () => {
    render(<App/>)
    const emailInputElement = screen.getByRole("textbox", {
        name: /email/i
    });
    userEvent.type(emailInputElement, "masoud@gmail.com");
    expect(emailInputElement.value).toBe("masoud@gmail.com")
})

test("should be able to type a password", () => {
    render(<App/>)
    const passwordInputEl = screen.getByLabelText("password")
    userEvent.type(passwordInputEl, "password!");
    expect(passwordInputEl.value).toBe("password!")
})

test("should be able to type confirm password", () => {
    render(<App/>)
    const confirmPassInputEl = screen.getByLabelText(/confirm password/i)
    const passwordInputEl = screen.getByLabelText("password")
    userEvent.type(confirmPassInputEl, passwordInputEl.value);
    expect(confirmPassInputEl.value).toBe(passwordInputEl.value)
})

test("should show error for invalid email", () => {
    render(<App/>)
    const emailInputEl = screen.getByRole("textbox", {
        name: /email/i
    });
    const emailErrorEl = screen.queryByText(/the email you input is invalid/i)
    const submitBtnEl = screen.getByRole("button", {
        name: /submit/i
    });
    expect(emailErrorEl).not.toBeInTheDocument()
    userEvent.type(emailInputEl, "masoudgmail.com");
    userEvent.click(submitBtnEl);
    const emailErrorElAgain = screen.queryByText(/the email you input is invalid/i)
    expect(emailErrorElAgain).toBeInTheDocument();
})