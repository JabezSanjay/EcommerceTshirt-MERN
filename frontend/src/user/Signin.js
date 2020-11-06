import React, { useState } from "react";
import Menu from "../core/Menu";
import { Link, Redirect } from "react-router-dom";
import SigninImage from "../images/signin.svg";
import "./scss/Sign.modules.scss";
import { isAutheticated, signin, authenticate } from "../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    return loading && toast.info("Loading...");
  };

  const errorMessage = () => {
    if (error) {
      toast.error(error);
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
                <input type="submit" value="Sign Up" onClick={onSubmit} />
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
    <div>
      <Menu />
      <ToastContainer />
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </div>
  );
};

export default Signin;
