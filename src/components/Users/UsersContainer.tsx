import React from "react";
import { useSelector } from "react-redux";

import { getIsFetching } from "redux/users-selectors";
import Preloader from "../Preloader/Preloader";
import Users from "./Users";

const UsersContainer: React.FC = () => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};

export default UsersContainer;
