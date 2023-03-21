import { ThunkAction } from "redux-thunk";

import { profileAPI } from "API/profile-api";
import userLogo from "assets/images/userLogo.png";
import { PhotosType, ProfileType, PostsType } from "types/types";
import { AppStateType, InferActionsTypes } from "./redux-store";

const initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", like_count: 20, image: userLogo },
    { id: 2, message: "It's my first post!", like_count: 15, image: userLogo },
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const profileReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "PROFILE/ADD_POST": {
      let newPost = {
        id: 3,
        message: action.text,
        like_count: 0,
        image: userLogo,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case "PROFILE/SET_USER_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };
    case "PROFILE/SET_STATUS": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "PROFILE/DELETE_POST": {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      };
    }
    case "PROFILE/SAVE_PHOTO_SUCCESS": {
      return {
        ...state,
        profile: { ...state.profile, photoUrl: action.photos } as ProfileType,
      };
    }
    case "PROFILE/SET_USER_INFO": {
      return {
        ...state,
        profile: { ...state.profile, ...action.data },
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addPost: (text: string) => ({ type: "PROFILE/ADD_POST", text } as const),
  setUserProfile: (profile: ProfileType) =>
    ({ type: "PROFILE/SET_USER_PROFILE", profile } as const),
  setStatus: (status: string) =>
    ({ type: "PROFILE/SET_STATUS", status } as const),
  deletePost: (postId: number) =>
    ({ type: "PROFILE/DELETE_POST", postId } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({ type: "PROFILE/SAVE_PHOTO_SUCCESS", photos } as const),
  setProfileInfo: (data: ProfileType) =>
    ({ type: "PROFILE/SET_USER_INFO", data } as const),
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode == 0) {
      dispatch(actions.setStatus(status));
    }
  };
//!!!!!!!!!!!!!!!!
export const savePhoto =
  (file: PhotosType): ThunkType =>
  async (dispatch) => {
    try {
      let data = await profileAPI.savePhoto(file);
      if (data.resultCode == 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

export const saveProfile =
  (formData: ProfileType): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.saveProfile(formData);
    const data = response.config.data;
    if (response.data.resultCode === 0) {
      dispatch(actions.setProfileInfo(data));
    }
  };

export default profileReducer;
