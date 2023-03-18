import React from "react";
import { connect } from "react-redux";
import { AppStateType } from "redux/redux-store";

import { actions } from "redux/profile-reducer";
import MyPosts from "./MyPosts";

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage,
  };
};

const MyPostsContainer = connect(mapStateToProps, { actions })(MyPosts);

export default MyPostsContainer;
