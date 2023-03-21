import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { follow, requestUsers, unfollow } from "redux/users-reducer";
import {
  getCurrentPage,
  getFollowingInProgres,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getFilter,
} from "redux/users-selectors";
import Preloader from "../Preloader/Preloader";
import Users from "./Users";
import { FilterType, UsersType } from "types/types";
import { AppStateType } from "redux/redux-store";

type MapStatePropsType = {
  currentPage: number;
  isFetching: boolean;
  totalUsersCount: number;
  pageSize: number;
  users: Array<UsersType>;
  followingInProgres: Array<number>;
  filter: FilterType;
};

type MapDispatchPropsType = {
  requestUsers: (
    pageNumber: number,
    pageSize: number,
    filter?: FilterType
  ) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  onPAgeChanged: (pageNumber: number) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    let { currentPage, pageSize, filter } = this.props;
    this.props.requestUsers(currentPage, pageSize, filter);
  }

  onPAgeChanged = (pageNumber: number) => {
    this.props.requestUsers(pageNumber, this.props.pageSize, this.props.filter);
  };

  onFilterChanged = (filter: FilterType) => {
    this.props.requestUsers(
      this.props.currentPage,
      this.props.pageSize,
      filter
    );
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          onPAgeChanged={this.onPAgeChanged}
          currentPage={this.props.currentPage}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          followingInProgres={this.props.followingInProgres}
          onFilterChanged={this.onFilterChanged}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgres: getFollowingInProgres(state),
    filter: getFilter(state),
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    follow,
    unfollow,
    requestUsers,
  })
)(UsersContainer);
