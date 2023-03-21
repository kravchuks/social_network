import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";

import { usersAPI } from "API/user-api";
import { UsersType, FilterType } from "types/types";
import { updateObjectInArray } from "utils/object-helpers";
import { AppStateType, InferActionsTypes } from "./redux-store";

const initialState = {
  users: [] as Array<UsersType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgres: [] as Array<number>, // array of users ids
  filter: {
    term: "",
    friend: null as null | boolean,
  },
};

type InitialStateType = typeof initialState;

const usersReducer = (
  state = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case "SET_USERS":
      return {
        ...state,
        users: [...action.users],
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case "SET_TOTAL_PAGES":
      return {
        ...state,
        totalUsersCount: action.count,
      };
    case "TOGGLE_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "TOGGLE_IS_FOLLOWING_PROGRES": {
      return {
        ...state,
        followingInProgres: action.isFetched
          ? [...state.followingInProgres, action.userId]
          : state.followingInProgres.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

type ActionType = InferActionsTypes<typeof actions>;

export const actions = {
  followSuccess: (userId: number) => ({ type: "FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
  setUsers: (users: Array<UsersType>) =>
    ({ type: "SET_USERS", users } as const),
  setPage: (currentPage: number) =>
    ({ type: "SET_CURRENT_PAGE", currentPage } as const),
  setUsersTotalCount: (totalUsersCount: number) =>
    ({ type: "SET_TOTAL_PAGES", count: totalUsersCount } as const),
  toggleFetching: (isFetched: boolean) =>
    ({ type: "TOGGLE_IS_FETCHING", isFetching: isFetched } as const),
  setFilter: (filter: FilterType) =>
    ({ type: "SET_FILTER", payload: filter } as const),
  toggleIsFollowingProgres: (isFetched: boolean, userId: number) =>
    ({
      type: "TOGGLE_IS_FOLLOWING_PROGRES",
      isFetched: isFetched,
      userId,
    } as const),
};

type DispatchType = Dispatch<ActionType>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>;

export const requestUsers =
  (
    page: number,
    pageSize: number,
    filter: FilterType
  ): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleFetching(true));
    dispatch(actions.setPage(page));
    dispatch(actions.setFilter(filter));
    const response = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
    dispatch(actions.toggleFetching(false));
    dispatch(actions.setUsers(response.items));
    dispatch(actions.setUsersTotalCount(response.totalCount));
  };

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionType
) => {
  dispatch(actions.toggleIsFollowingProgres(true, userId));
  let response = await apiMethod(userId);
  dispatch(actionCreator(userId));
  dispatch(actions.toggleIsFollowingProgres(false, userId));
};

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow,
      actions.followSuccess
    );
  };

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unFollow,
      actions.unfollowSuccess
    );
  };

export default usersReducer;
