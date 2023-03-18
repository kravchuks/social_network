import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Users.module.css";
import userLogo from "assets/images/userLogo.png";
import { UsersType } from "types/types";

type PropsType = {
  user: UsersType;
  followingInProgres: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

const User: React.FC<PropsType> = ({
  user,
  followingInProgres,
  unfollow,
  follow,
}) => {
  return (
    <div>
      <span className={styles.user_block}>
        <div>
          <NavLink to={`/profile/` + user.id}>
            <img className={styles.photo} src={user.photos.small || userLogo} />
          </NavLink>
        </div>
        <span>
          <div className={styles.user_name}>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <div>
          {user.followed ? (
            <button
              className={styles.submit}
              disabled={followingInProgres.some((id) => id === user.id)}
              onClick={() => unfollow(user.id)}
            >
              Unfollow
            </button>
          ) : (
            <button
              className={styles.submit}
              disabled={followingInProgres.some((id) => id === user.id)}
              onClick={() => follow(user.id)}
            >
              Follow
            </button>
          )}
        </div>
      </span>
    </div>
  );
};

export default User;
