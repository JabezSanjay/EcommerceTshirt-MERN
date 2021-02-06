import React, { useState } from "react";
import Menu from "../core/Menu";
import { Link, Redirect } from "react-router-dom";
import SigninImage from "../assets/images/signin.svg";
import styled from "styled-components";
import { isAutheticated, signin, authenticate } from "../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import COLORS from "../assets/colors";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  //Destructuring
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();
  //Higher order function
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(error);
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard"></Redirect>;
      } else {
        return <Redirect to="/"></Redirect>;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading &&
      toast.info("Loading...", { autoClose: 2000, position: "bottom-right" })
    );
  };

  const errorMessage = () => {
    if (error) {
      toast.error(error, { autoClose: 2000, position: "bottom-right" });
    }
  };

  const signInForm = () => {
    return (
      <div className="align">
        <div className="grid align__item">
          <div className="register">
            <img src={SigninImage} alt="" />
            <h2>Sign In</h2>

            <form action="" method="post" className="form">
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
                <input type="submit" value="Sign In" onClick={onSubmit} />
              </div>
            </form>

            <p>
              Don't have an accout? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <SigninTag>
      <Menu />
      <ToastContainer autoClose={2000} position="bottom-right" />
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </SigninTag>
  );
};

export default Signin;

const SigninTag = styled.div`
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
