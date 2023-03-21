import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getTotalUsersCount,
  getPageSize,
  getCurrentPage,
  getUsers,
  getFollowingInProgres,
  getFilter,
} from "redux/users-selectors";
import { FilterType } from "types/types";
import Paginator from "utils/Paginator/Paginator";
import User from "./User";
import styles from "./Users.module.css";
import UsersSearchForm from "./UsersSearchForm";
import { follow, requestUsers, unfollow } from "redux/users-reducer";
import { AppDispatch } from "redux/redux-store";

const Users: React.FC = () => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const users = useSelector(getUsers);
  const followingInProgres = useSelector(getFollowingInProgres);
  const filter = useSelector(getFilter);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, []);

  const onPAgeChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  };

  const followUser = (userId: number) => {
    dispatch(follow(userId));
  };

  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div className={styles.user}>
      <UsersSearchForm onFilterChanged={onFilterChanged} />

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
            follow={followUser}
            unfollow={unfollowUser}
            key={u.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
