import React from "react";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import style from "App.module.css";
import Preloader from "./components/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginForm from "./components/Login/Login";
import Navbar from "./components/NavBar/NavBar";
import { withRouter } from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { withSuspense } from "./HOC/withSuspense";
import { initialiezeApp } from "./redux/app-reducer";
import store from "./redux/redux-store";
import { AppStateType } from "./redux/redux-store";
const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initialiezeApp: () => void;
};

class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initialiezeApp();
    window.onunhandledrejection = (err) => {
      alert("something gone wrong");
    };
  }

  render() {
    if (!this.props.initialized) {
      return (
        <div className={style.center}>
          <Preloader />
        </div>
      );
    }
    return (
      <div>
        <HeaderContainer />
        <div className={style.container}>
          <Navbar />
          <div className={style.wrapperContent}>
            <Routes>
              <Route path="" element={<Navigate to={"/profile"} />} />
              <Route
                path="/messages/*"
                element={withSuspense(DialogsContainer, { props: {} })}
              />
              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContiner = compose<React.ComponentType>(
  connect(mapStateToProps, { initialiezeApp }),
  withRouter
)(App);

const SamuraiJSApp: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AppContiner />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default SamuraiJSApp;
