import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";
import logo from "./../../logo.svg";

export type MapPropsType = {
  isAuth: boolean;
  login: string | null; 
};

export type DispatchPropsType = {
  logout: () => void;
};

const Header: React.FC<MapPropsType & DispatchPropsType> = ({ isAuth, login, logout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to={"/profile"} className={styles.logo}>
          <img className={styles.img} src={logo}></img>
          <h1>
            React <span>Social</span>
          </h1>
        </NavLink>

        <div className={styles.loginBlock}>
          {isAuth ? (
            <div className={styles.userName}>
              {login}
              <a className={styles.login__link} onClick={logout}>
                Sing Up
              </a>
            </div>
          ) : (
            <NavLink className={styles.login__link} to="/login">
              Sing In
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
