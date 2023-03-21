import { ThunkAction } from "redux-thunk";

import { securityAPI } from "API/security-api";
import { authAPI } from "API/auth-api";
import { AppStateType, InferActionsTypes } from "./redux-store";

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null, //if null then captcha is not required
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET_USER_DATA":
    case "AUTH/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "AUTH/SET_USER_DATA",
      payload: { userId, email, login, isAuth },
    } as const),
  setCaptchaUrl: (captchaUrl: string | null) =>
    ({
      type: "AUTH/GET_CAPTCHA_URL_SUCCESS",
      payload: { captchaUrl },
    } as const),
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let data = await authAPI.me();
  if (data.resultCode === 0) {
    let { id, login, email } = data.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ): ThunkType =>
  async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
    }
  };

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logOut();
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.setCaptchaUrl(captchaUrl));
};

export default authReducer;
