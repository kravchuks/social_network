import React from "react";

import { UsersType } from "types/types";
import Paginator from "utils/Paginator/Paginator";
import User from "./User";
import styles from "./Users.module.css";

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPAgeChanged: (pageNumber: number) => void;
  users: Array<UsersType>;
  followingInProgres: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

const Users: React.FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPAgeChanged,
  users,
  followingInProgres,
  follow,
  unfollow,
}) => {
  return (
    <div className={styles.user}>
      <Paginator
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPAgeChanged={onPAgeChanged}
        portionSize={10}
      />
      <div>
        {users.map((u) => (
          <User
            user={u}
            followingInProgres={followingInProgres}
            follow={follow}
            unfollow={unfollow}
            key={u.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
