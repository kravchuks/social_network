import React, { ChangeEvent, useEffect, useState } from "react";

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
};

const ProfileStatusWithHooks: React.FC<PropsType> = ({
  status,
  updateStatus,
}) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [statusText, setStatus] = useState<string>(status);

  useEffect(() => {
    setStatus(status);
  }, [status]);

  let activateEditMode = () => {
    setEditMode(true);
  };

  let deactivateEditMode = () => {
    setEditMode(false);
    updateStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div style={{ display: "inline-block" }}>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>{statusText}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            value={status}
            onBlur={deactivateEditMode}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
