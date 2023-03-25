import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, []);

  useEffect(() => {
    const parsed = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );

    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term };
    switch (parsed.friend) {
      case "":
        actualFilter = { ...actualFilter, friend: '' };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: any = {};
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== '') query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    navigate({
      search: new URLSearchParams(query).toString(),
    });
  }, [filter, currentPage]);

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
