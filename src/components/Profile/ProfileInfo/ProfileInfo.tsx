import React, { ChangeEvent, useState } from "react";

import userLogo from "assets/images/userLogo.png";
import Preloader from "../../Preloader/Preloader";
import { ProfileDataForm } from "./ProfileDataForm";
import styles from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import { ProfileType } from "types/types";

type PropsType = {
  profile: ProfileType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<ProfileType>;
  isAuth: boolean;
};

const ProfileInfo: React.FC<PropsType> = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
  isAuth,
}) => {
  let [editMode, setEditMode] = useState<boolean>(false);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };

  type ProfileDataProps = {
    profile: ProfileType;
    isOwner: boolean;
    goToEditMode: () => void;
    isAuth: boolean;
  };

  const ProfileData: React.FC<ProfileDataProps> = ({
    profile,
    isOwner,
    goToEditMode,
    isAuth,
  }) => {
    return (
      <div>
        {isOwner && isAuth && (
          <div>
            <button className={styles.submit} onClick={goToEditMode}>
              Edit
            </button>
          </div>
        )}
        <div>
          <h3>{profile.fullName}</h3>
        </div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        {profile.lookingForAJob && (
          <div>
            <b>My professionals skills</b>: {profile.lookingForAJobDescription}
          </div>
        )}
        <div>
          {/* <b>About me</b>: {profile.aboutMe} */}
        </div>
      </div>
    );
  };

  const onSubmit = async (formData: ProfileType) => {
    await saveProfile(formData);
    setEditMode(false);
  };

  return (
    <div>
      <div className={styles.descriptionBlock}>
        <div className={styles.img__wrapper}>
          <div>
            {isOwner && (
              <div className={styles.fileload}>
                <div className={styles.file_load_block}>
                  <input
                    type="file"
                    value=""
                    id="file"
                    onChange={onMainPhotoSelected}
                  />
                  <div className={styles.fileLoad}>
                    <input type="text" defaultValue="Select file" />
                    <button>Select file</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <img className={styles.ava} src={profile.photos.small || userLogo} />
          <div className={styles.status}>
            Status :{" "}
            <ProfileStatus status={status} updateStatus={updateStatus} />
          </div>
        </div>

        <div className={styles.info__wrapper}>
          {editMode ? (
            <ProfileDataForm profile={profile} onSubmit={onSubmit} />
          ) : (
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              isAuth={isAuth}
              goToEditMode={() => setEditMode(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
