import React, { useState } from "react";
import Menu from "../core/Menu";
import SignupImage from "../images/signup.svg";
import { signup } from "../auth/helper";
import "./scss/Sign.modules.scss";
import "./scss/Message.modules.scss";
import { Link } from "react-router-dom";

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
      .catch(console.log("Error in signup"));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
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
      {successMessage()}
      {errorMessage()}
      {signupForm()}
    </div>
  );
};

export default Signup;
