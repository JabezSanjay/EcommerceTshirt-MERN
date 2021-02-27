import React, { useState } from "react";
import Menu from "../core/Menu";
import SignupImage from "../assets/images/signup.svg";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import COLORS from "../assets/colors";

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
    <SignupTag>
      <Menu />
      <ToastContainer autoClose={2000} />
      {successMessage()}
      {errorMessage()}
      {signupForm()}
    </SignupTag>
  );
};

export default Signup;

const SignupTag = styled.div`
  .align {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    min-height: 100vh;
    background: radial-gradient(
      ${COLORS.primaryBackgroundColor},
      ${COLORS.secondaryBackgroundColor}
    );

    &__item {
      &--start {
        align-self: flex-start;
      }

      &--end {
        align-self: flex-end;
      }
    }
  }
  .site {
    &__logo {
      margin-bottom: 2rem;
    }
  }
  input {
    border: 0;
    font-family: "Poppins", sans-serif;

    &::placeholder {
      color: ${COLORS.black};
    }
  }
  .form {
    &__field {
      margin-bottom: 1rem;
    }
    input {
      outline: 0;
      padding: 0.5rem 1rem;
      &[type="email"],
      &[type="text"],
      &[type="password"] {
        width: 100%;
      }
    }
  }

  .grid {
    max-width: 25rem;
    width: 90%;
  }

  h2 {
    font-size: 2.75rem;
    font-weight: 100;
    margin: 0 0 1rem;
    text-transform: uppercase;
  }
  p {
    font-family: "Poppins", sans-serif;
  }

  a {
    color: ${COLORS.secondaryBackgroundColor};
  }

  .register {
    background-color: #ffffff;
    background-image: linear-gradient(
      315deg,
      #ffffff 80%,
      ${COLORS.secondaryBackgroundColor} 20%
    );
    text-align: center;
    padding: 4rem 2rem;
    margin-top: 2rem;
    img {
      width: 90%;
    }
    input {
      border: 1px solid ${COLORS.secondaryBackgroundColor};
      border-radius: 999px;
      background-color: transparent;
      text-align: center;

      &[type="email"],
      &[type="text"],
      &[type="password"] {
        background-repeat: no-repeat;
        background-size: 1.5rem;
        background-position: 1rem 50%;
      }
      &[type="submit"] {
        background-image: linear-gradient(
          160deg,
          ${COLORS.primaryBackgroundColor} 0%,
          ${COLORS.secondaryBackgroundColor} 100%
        );
        color: #fff;
        margin-bottom: 2rem;
        width: 100%;
        cursor: pointer;
      }
    }
  }
`;
