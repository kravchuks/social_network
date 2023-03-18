import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import {
  follow,
  requestUsers,
  actions,
  unfollow,
} from "redux/users-reducer";
import {
  getCurrentPage,
  getFollowingInProgres,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "redux/users-selectors";
import Preloader from "../Preloader/Preloader";
import Users from "./Users";
import { UsersType } from "types/types";
import { AppStateType } from "redux/redux-store";

type MapStatePropsType = {
  currentPage: number;
  isFetching: boolean;
  totalUsersCount: number;
  pageSize: number;
  users: Array<UsersType>;
  followingInProgres: Array<number>;
};

type MapDispatchPropsType = {
  requestUsers: (pageNumber: number) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  onPAgeChanged: (pageNumber: number) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    let { currentPage } = this.props;
    this.props.requestUsers(currentPage);
  }

  onPAgeChanged = (pageNumber: number) => {
    this.props.requestUsers(pageNumber);
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
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    follow,
    unfollow,
    actions,
    requestUsers,
  })
)(UsersContainer);
