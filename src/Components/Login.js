import {useEffect, useState} from 'react'
import {FaSignInAlt} from 'react-icons/fa';
import {IconContext} from "react-icons";

function Login() {
    const welcome = "Welcome Back";
    const [welcomeHeader, setWelcomeHeader] = useState("");

    const [inputs, setInputs] = useState({
        password: "",
        email: ""
    });

    const [warning, setWarning] = useState({
        password: "",
        email: ""
    });

    const [isWrong, setIsWrong] = useState({
        password: false,
        email: false
    });

    useEffect(() => {
        let timeout;
        for (let i = 0; i < welcome.length; i++) {
            timeout = setTimeout(() => setWelcomeHeader(welcome.slice(0, i + 1))
                , (i + 1) * 150);
        }
        return () => clearTimeout(timeout);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }


    function handleClick(event) {
        setIsWrong({
            password: false,
            email: false
        })
        event.preventDefault();
        if (inputs.password.length < 8) {
            setWarning(prev => ({
                ...prev,
            password:"Password min 8 letters"
            }))
            setIsWrong(prev => ({
                ...prev,
                password: true
            }))
        }
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputs.email)) {
            setWarning(prev => ({
                ...prev,
                email: "Email is not valid"
            }))
            setIsWrong(prev => ({
                ...prev,
                email: true
            }))
        }
    }

    return (
        <div className="login">
            <main className="login-card">
                <header className="login-header">
                    <p>{welcomeHeader}</p>
                </header>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="login-form-label">Email</label>
                    <p className="login-form-warning">{isWrong.email && warning.email}</p>
                    <input type="email" id="email" className="login-form-input"
                           maxLength={50}
                           name="email"
                           value={inputs.email || ""}
                           onChange={handleChange}/>
                    <label htmlFor="password" className="login-form-label">Password</label>
                    <p className="login-form-warning">{isWrong.password && warning.password}</p>
                    <input type="password" id="password" className="login-form-input"
                           maxLength={50}
                           name="password"
                           value={inputs.password || ""}
                           onChange={handleChange}/>
                </form>
                <footer className="login-footer">
                    <p className="login-footer-register">Do not have account ?
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#">Sign up</a>
                    </p>
                    <button onClick={handleClick} className="login-form-footer-button">
                        <IconContext.Provider value={{
                            color: "mediumpurple",
                            size: "50px"
                        }}>
                            <FaSignInAlt/>
                        </IconContext.Provider>
                    </button>
                </footer>
            </main>
        </div>
    );
}

export default Login;