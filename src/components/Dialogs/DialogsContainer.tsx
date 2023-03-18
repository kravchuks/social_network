import { compose } from "redux";
import { connect } from "react-redux";

import Dialogs from "./Dialogs";
import { addMessage } from "redux/dialogs-reducer";
import { withAuthRedirect } from "HOC/withAuthRedirect";
import { DialogType, MessageType } from "types/types";
import { AppStateType } from "redux/redux-store";

type MapStatePropsType = {
  dialogsData: Array<DialogType>;
  messageData: Array<MessageType>;
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messageData: state.dialogsPage.messageData,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { addMessage }),
  withAuthRedirect
)(Dialogs);
