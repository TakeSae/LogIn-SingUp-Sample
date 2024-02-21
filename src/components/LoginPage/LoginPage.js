import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import axios from "axios";
import PasswordChecklist from "react-password-checklist";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cep, setCEP] = useState("");
  const [address, setAddress] = useState({ street: "", city: "", uf: "" });
  const [houseNumber, setHouseNumber] = useState("");
  const [cepValid, setCepValid] = useState(false);
  const [passwordAgain, setPasswordAgain] = useState("");

  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (username.trim() !== "" && password.trim() !== "") {
      if (password.trim().length < 8) {
        setErrorMessage("Invalid username or password");
        const loginBox = document.querySelector(".login-box");
        loginBox.classList.add("shake");
        setTimeout(() => {
          loginBox.classList.remove("shake");
        }, 500);
      }
    } else {
      setErrorMessage("Please enter username and password");

      const loginBox = document.querySelector(".login-box");
      loginBox.classList.add("shake");
      setTimeout(() => {
        loginBox.classList.remove("shake");
      }, 500);
    }
  };

  const handleSignUp = () => {
    if (
      username.trim() !== "" &&
      password.trim() !== "" &&
      name.trim() !== "" &&
      email.trim() !== "" &&
      cep.trim() !== ""
    ) {
      const cepRegex = /^\d{5}-?\d{3}$/;

      if (!cepRegex.test(cep)) {
        setErrorMessage("Please enter a valid CEP");

        const signUpBox = document.querySelector(".login-box");
        signUpBox.classList.add("shake");
        setTimeout(() => {
          signUpBox.classList.remove("shake");
        }, 500);
        return;
      }

      const minLengthRegex = /.{8,}/;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const numberRegex = /\d/;
      const capitalLetterRegex = /[A-Z]/;

      if (
        !minLengthRegex.test(password) ||
        !specialCharRegex.test(password) ||
        !numberRegex.test(password) ||
        !capitalLetterRegex.test(password)
      ) {
        setErrorMessage("Password invalid");

        const signUpBox = document.querySelector(".login-box");
        signUpBox.classList.add("shake");
        setTimeout(() => {
          signUpBox.classList.remove("shake");
        }, 500);
        return;
      }

      if (!isEmailValid(email)) {
        setErrorMessage("Please enter a valid email address");
        return;
      }

      // implement actual login logic here
      // always true since it is a demo
      setLoggedIn(true);
    } else {
      setErrorMessage("All fields must be filled up");

      const signUpBox = document.querySelector(".login-box");
      signUpBox.classList.add("shake");
      setTimeout(() => {
        signUpBox.classList.remove("shake");
      }, 500);
    }
  };

  const handleCEPBlur = async () => {
    if (cep.trim() !== "") {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        const { data } = response;
        if (!data.erro) {
          setAddress({
            street: data.logradouro,
            city: data.localidade,
            uf: data.uf,
          });
          setCepValid(true);
        } else {
          setErrorMessage("CEP not found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setErrorMessage("Error fetching address");
      }
    }
  };

  const handleSignUpClick = () => {
    setShowLogin(false);
    setErrorMessage(""); // Clear error message
  };

  const handleBackToLoginClick = () => {
    setShowLogin(true);
    setErrorMessage(""); // Clear error message
  };

  return (
    <div className="background-container">
      <video className="background-video" autoPlay muted loop>
        <source src="/assets/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="login-container">
        {!loggedIn ? (
          <div className={`login-box ${!showLogin ? "signup" : ""}`}>
            {showLogin ? (
              <>
                <h2>Login</h2>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                <br />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                />
                <br />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
                <span
                  className="password-toggle"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </span>

                <br />
                <br />
                <button onClick={handleLogin} className="login-button">
                  Login
                </button>
                <br />
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#004D40",
                      height: "2px",
                    }}
                  />
                  <p style={{ margin: "0 10px" }}>New to bs.com?</p>
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#004D40",
                      height: "2px",
                    }}
                  />
                </div>
                <br />
                <button onClick={handleSignUpClick} className="bn13">
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <h2>Sign Up</h2>
                {errorMessage && (
                  <p className="error-message display-linebreak">
                    {errorMessage}
                  </p>
                )}
                <br />
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
                <br />
                <input
                  type="text"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
                <br />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                />
                <br />
                <input
                  type="text"
                  placeholder="CEP"
                  value={cep}
                  onBlur={handleCEPBlur}
                  onChange={(e) => setCEP(e.target.value)}
                  className="input-field"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                {cepValid && (
                  <>
                    <input
                      type="text"
                      placeholder="Street"
                      value={address.street}
                      readOnly
                      className="input-field"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={address.city}
                      readOnly
                      className="input-field"
                    />
                    <input
                      type="text"
                      placeholder="UF"
                      value={address.uf}
                      readOnly
                      className="input-field"
                    />
                    <input
                      type="text"
                      placeholder="House number"
                      value={houseNumber}
                      onChange={(e) => setHouseNumber(e.target.value)}
                      className="input-field"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </>
                )}
                <br />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Repeat password"
                  value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  className="input-field"
                />
                <span
                  className="password-toggle"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </span>
                <PasswordChecklist
                  rules={[
                    "minLength",
                    "specialChar",
                    "number",
                    "capital",
                    "match",
                  ]}
                  minLength={8}
                  value={password}
                  valueAgain={passwordAgain}
                  onChange={(isValid) => {}}
                />
                <br />
                <br />
                <button onClick={handleSignUp} className="login-button">
                  SignUp
                </button>
                <br />
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#004D40",
                      height: "2px",
                    }}
                  />
                  <p style={{ margin: "0 10px" }}>Already have an account?</p>
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#004D40",
                      height: "2px",
                    }}
                  />
                </div>
                <br />
                <button
                  onClick={handleBackToLoginClick}
                  className="login-button"
                >
                  Back to Login
                </button>
              </>
            )}
          </div>
        ) : (
          <div>
            <h2>Welcome, {username}!</h2>
            <button onClick={() => setLoggedIn(false)}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
