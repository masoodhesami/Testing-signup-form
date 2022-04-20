import './App.css';
import {useState} from "react"
import validator from "validator";

function App() {
    const [signup, setSignup] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        })
    };
    const handleClick = (e) => {
        e.preventDefault()
        if (!validator.isEmail(signup.email)) {
            return setError("The email you input is invalid")
        } else if (signup.password.length < 5) {
            return setError("The password should contain 5 or more characters")
        } else if (signup.password !== signup.confirmPassword) {
            return setError("Passwords are not the same,Try again")
        }
    }

    return (
        <div className={"container my-5"}>
            <form>
                <div className={"mb-3"}>
                    <label className={"form-label"} htmlFor="email">
                        email address
                    </label>
                    <input type="email"
                           id={"email"}
                           name={"email"}
                           value={signup.email}
                           onChange={handleChange}
                           className={"form-control"}/>
                </div>
                <div className={"mb-3"}>
                    <label className={"form-label"} htmlFor="password">
                        password
                    </label>
                    <input type="password"
                           id={"password"}
                           name={"password"}
                           value={signup.password}
                           onChange={handleChange}
                           className={"form-control"}/>
                </div>
                <div className={"mb-3"}>
                    <label className={"form-label"} htmlFor="confirmPassword">
                        confirm password
                    </label>
                    <input type="password"
                           id={"confirmPassword"}
                           name={"confirmPassword"}
                           value={signup.confirmPassword}
                           onChange={handleChange}
                           className={"form-control"}/>
                </div>
                {error && <p className={"text-danger"}>{error}</p>}
                <button type={"submit"}
                        className={"btn btn-primary"}
                        onClick={handleClick}
                >Submit
                </button>
            </form>
        </div>
    );
}

export default App;
