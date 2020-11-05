import React from "react";
import Menu from "../core/Menu";
import { Link } from "react-router-dom";
import SigninImage from "../images/signin.svg";
import "./scss/Sign.modules.scss";

const Signin = () => {
  return (
    <div>
      <Menu />
      <div className="align">
        <div className="grid align__item">
          <div className="register">
            <img src={SigninImage} alt="" />
            <h2>Sign In</h2>

            <form action="" method="post" className="form">
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
              Don't have an accout? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
