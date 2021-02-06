import React, { useState } from "react";
import Menu from "../core/Menu";
import SignupImage from "../images/signup.svg";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";
import "./scss/Sign.modules.scss";
import "./scss/Message.modules.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

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
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch();
  };

  const successMessage = () => {
    if (success) {
      return (
        <div>
          {toast.success("New account was created successfully", {
            autoClose: 1000,
          })}
          <Redirect to="/signin"></Redirect>
        </div>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return toast.error(error, { autoClose: 2000 });
    }
  };

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
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={handleChange("name")}
                    value={name}
                  />
                </div>
                <div className="form__field">
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                </div>

                <div className="form__field">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={handleChange("password")}
                    value={password}
                  />
                </div>

                <div className="form__field">
                  <input type="submit" value="Sign Up" onClick={onSubmit} />
                </div>
              </form>

              <p>
                Already have an accout? <Link to="/signin">Sign in</Link>
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
      <ToastContainer autoClose={2000} />
      {successMessage()}
      {errorMessage()}
      {signupForm()}
    </div>
  );
};

export default Signup;
