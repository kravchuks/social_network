import React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";

import {
  getStatus,
  getUserProfile,
  updateStatus,
  savePhoto,
  saveProfile,
} from "redux/profile-reducer";
import Profile from "./Profile";
import { AppStateType } from "redux/redux-store";

export function withRouter(Children: React.FC) {
  return (props: any) => {
    type ParamsType = {
      userId: string;
    };
    const match = { params: useParams() as ParamsType };

    type HistoryType = {
      push: (path: string) => void;
    };
    const history = useNavigate();
    return <Children {...props} match={match} history={history} />;
  };
}

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: () => void;
  savePhoto: () => void;
  saveProfile: (profile: any) => Promise<any>;
};

type PropsType = MapPropsType &
  DispatchPropsType & { match: any; history: any };

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile = () => {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (userId == null) {
        return this.props.history("/login");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  };
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: any): void {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
        isAuth={this.props.isAuth}
      />
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter
)(ProfileContainer);
