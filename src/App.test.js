import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

beforeEach(() => {
    render(<App/>);
});
const typeIntoForm = ({email, password, confirmPassword}) => {
    const emailInputElement = screen.getByRole("textbox", {
        name: /email/i
    });
    const passwordInputElement = screen.getByLabelText("password")
    const confirmPassInputElement = screen.getByLabelText(/confirm password/i)

    if (email) {
        userEvent.type(emailInputElement, email)
    }
    if (password) {
        userEvent.type(passwordInputElement, password)
    }
    if (confirmPassword) {
        userEvent.type(confirmPassInputElement, confirmPassword)
    }
    return {
        emailInputElement,
        passwordInputElement,
        confirmPassInputElement
    }
}
const clickOnSubmitBtN = () => {
    const submitBtnEl = screen.getByRole("button", {
        name: /submit/i
    });
    if (submitBtnEl) {
        userEvent.click(submitBtnEl)
    }
}

describe("Signup-form", () => {
    test("inputs should be initially empty", () => {
        expect(screen.getByRole("textbox", {name: /email/i}).value).toBe("")
        expect(screen.getByLabelText("password").value).toBe("")
        expect(screen.getByLabelText(/confirm password/i).value).toBe("")
    })

    describe("Should able to type", () => {
        test("should be able to type an email", () => {
            const {emailInputElement} = typeIntoForm({email: "masoud@gmail.com"})
            expect(emailInputElement.value).toBe("masoud@gmail.com")
        })
        test("should be able to type a password", () => {
            const {passwordInputElement} = typeIntoForm({password: "password!"})
            expect(passwordInputElement.value).toBe("password!")
        })
        test("should be able to type confirm password", () => {
            const {confirmPassInputElement} = typeIntoForm({confirmPassword: "password!"})
            expect(confirmPassInputElement.value).toBe("password!")
        })
    })
    describe("Should show error message", () => {
        test("should show error for invalid email", () => {
            const emailErrorEl = screen.queryByText(/the email you input is invalid/i)
            expect(emailErrorEl).not.toBeInTheDocument()
            typeIntoForm({email: "masoudgmail.com"})
            clickOnSubmitBtN()
            const emailErrorElAgain = screen.queryByText(/the email you input is invalid/i)
            expect(emailErrorElAgain).toBeInTheDocument();
        })
        test("should show password error is password is less than 5 characters", () => {
            const passwordErrorEl = screen.queryByText(
                /the password should contain 5 or more characters/i
            );
            typeIntoForm({email: "masoud@gmail.com", password: "123"})
            expect(passwordErrorEl).not.toBeInTheDocument()
            clickOnSubmitBtN()
            const passwordErrorElAgain = screen.queryByText(
                /the password should contain 5 or more characters/i
            );
            expect(passwordErrorElAgain).toBeInTheDocument()
        })
        test("should show error if password and confirm password are not equal", () => {
            const confirmPasswordErrorEl = screen.queryByText(
                /passwords are not the same,try again/i
            );
            expect(confirmPasswordErrorEl).not.toBeInTheDocument()
            typeIntoForm({email: "masoud@gmail.com", password: "password!", confirmPassword: "123"})
            clickOnSubmitBtN()
            const confirmPasswordErrorElAgain = screen.queryByText(
                /passwords are not the same,try again/i
            );
            expect(confirmPasswordErrorElAgain).toBeInTheDocument()
        })
    })

    test("should show no error message if every input is valid", () => {
        typeIntoForm({email: "masoud@gmail.com", password: "password!", confirmPassword: "password!"})
        clickOnSubmitBtN()
        const emailErrorEl = screen.queryByText(/the email you input is invalid/i)
        const passwordErrorEl = screen.queryByText(
            /the password should contain 5 or more characters/i
        );
        const confirmErrorEl = screen.queryByText(
            /passwords are not the same,try again./i
        );
        expect(emailErrorEl).not.toBeInTheDocument()
        expect(passwordErrorEl).not.toBeInTheDocument()
        expect(confirmErrorEl).not.toBeInTheDocument()
    })
})