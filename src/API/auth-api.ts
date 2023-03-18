//the initial variant of typing
import { ResultCodesEnum, instance, ResultCodesForCaptcha } from "./api";

type MeType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

type LoginType = {
  data: {
    userId: number;
  };
  resultCode: ResultCodesEnum | ResultCodesForCaptcha;
  messages: Array<string>;
};

// type LogoutType = {
//     data: {}
//     resultCode: ResultCodesEnum
//     messages: Array<string>
// }

export const authAPI = {
  me() {
    return instance.get<MeType>(`auth/me`).then((response) => response.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null
  ) {
    return instance
      .post<LoginType>(`auth/login`, { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },
  logOut() {
    return instance.delete(`auth/login`);
  },
};
