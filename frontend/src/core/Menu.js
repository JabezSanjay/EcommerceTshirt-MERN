import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { isAutheticated, signout } from "../auth/helper";
import "./scss/Menu.modules.scss";

const Menu = ({ history }) => {
  const [navbar, setNavbar] = useState(false);

  const navbarClicked = () => {
    setNavbar(!navbar);
  };
  return (
    <header className="header">
      <nav className="navbar">
        <h1 className="navbar__logo">T-Shirts</h1>
        <ul
          className={navbar ? "navbar__links navbar--active" : "navbar__links"}
        >
          <li>
            <Link to="/" onClick={navbarClicked}>
              Home
            </Link>
          </li>
          {isAutheticated() && isAutheticated().user.role === 0 && (
            <li>
              <Link to="/user/dashboard">Dashboard</Link>
            </li>
          )}
          {isAutheticated() && isAutheticated().user.role === 1 && (
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
          )}
          {!isAutheticated() && (
            <li>
              {" "}
              <Link to="/signup">Signup</Link>
            </li>
          )}
          {!isAutheticated() && (
            <li>
              {" "}
              <Link to="/signin">Signin</Link>
            </li>
          )}
          {isAutheticated() && (
            <li>
              (
              <Link
                to="/"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </Link>
              )
            </li>
          )}
        </ul>
        <div
          className={navbar ? "hamburger-menu bar-change" : "hamburger-menu"}
          onClick={navbarClicked}
        >
          <div className="bar1">Menu</div>
        </div>
      </nav>
    </header>
  );
};

export default withRouter(Menu);
