import React from "react";
import { NavLink } from "react-router-dom";

import styles from "../Dialogs.module.css";
import { DialogType } from "types/types";

const DialogItem: React.FC<DialogType> = ({ id, image, name }) => {
  let path = "/messages/" + id;

  return (
    <div className={styles.dialog_box}>
      <img className={styles.image} src={image} />
      <NavLink
        className={(navData) =>
          navData.isActive ? styles.active : styles.dialog
        }
        to={path}
      >
        {name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
