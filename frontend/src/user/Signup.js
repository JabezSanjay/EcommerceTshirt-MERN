import React, { useState } from "react";
import Menu from "../core/Menu";
import SignupImage from "../images/signup.svg";
import "./scss/Sign.modules.scss";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  //Destructuring
  const { name, email, password, error, success } = values;

  //Higher order Function

  const signupForm = () => {
    return (
      <div>
        <div className="align">
          <div className="grid align__item">
            <div className="register">
              <img src={SignupImage} alt="" />
              <h2>Sign Up</h2>

              <form action="" method="post" className="form">
                <div className="form__field">
                  <input type="text" placeholder="Name" />
                </div>
                <div className="form__field">
                  <input type="email" placeholder="Email" />
                </div>

                <div className="form__field">
                  <input type="password" placeholder="Password" />
                </div>

                <div className="form__field">
                  <input type="submit" value="Sign Up" />
                </div>
              </form>

              <p>
                Already have an accout? <a href="/">Log in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Menu />
      {signupForm()}
    </div>
  );
};

export default Signup;
