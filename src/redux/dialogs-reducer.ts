//the initial variant of typing
import userLogo from "assets/images/userLogo.png";
import { DialogType, MessageType } from "types/types";

const ADD_MESSAGE = "ADD-MESSAGE";

const initialState = {
  dialogsData: [
    { id: 1, name: "John", image: userLogo },
    { id: 2, name: "Mia", image: userLogo },
    { id: 3, name: "Fred", image: userLogo },
    { id: 4, name: "Jennifer", image: userLogo },
    { id: 5, name: "Loy", image: userLogo },
  ] as Array<DialogType>,
  messageData: [
    { id: 1, text: "Hi!" },
    { id: 2, text: "Hi, how are you?" },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        messageData: [...state.messageData, { id: 3, text: action.newText }],
      };
    }
    default:
      return state;
  }
};

type AddMessageActionType = {
  type: typeof ADD_MESSAGE;
  newText: string | null;
};

export const addMessage = (newText: string | null): AddMessageActionType => ({
  type: ADD_MESSAGE,
  newText,
});

export default dialogsReducer;
