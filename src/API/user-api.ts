import { APIResponseType, instance } from "./api";
import { UsersType } from "../types/types";

type GetItensType = {
  items: Array<UsersType>;
  totalCount: number;
  error: string | null;
};

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetItensType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance
      .post<APIResponseType>(`follow/${userId}`)
      .then((response) => response.data);
  },
  unFollow(userId: number) {
    return instance
      .delete<APIResponseType>(`follow/${userId}`)
      .then((response) => response.data);
  },
};
