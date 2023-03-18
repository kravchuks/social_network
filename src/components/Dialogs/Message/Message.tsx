import React from "react";

import styles from "../Dialogs.module.css";
import { MessageType } from "types/types";

const Message: React.FC<MessageType> = ({ text }) => {
  return <div className={styles.message}>{text}</div>;
};

export default Message;
