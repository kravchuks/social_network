import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <NavLink
          to="/profile"
          className={(navData) =>
            navData.isActive ? styles.active : styles.item
          }
        >
          Profile
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/messages"
          className={(navData) =>
            navData.isActive ? styles.active : styles.item
          }
        >
          Messages
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/users"
          className={(navData) =>
            navData.isActive ? styles.active : styles.item
          }
        >
          Users
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
