import React from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";

import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import { DialogType, MessageType } from "types/types";

type PropsType = {
  addMessage: (text: string) => void;
  dialogsData: Array<DialogType>;
  messageData: Array<MessageType>;
};

const Dialogs: React.FC<PropsType> = ({
  addMessage,
  dialogsData,
  messageData,
}) => {
  const dialogsElements = dialogsData.map((element) => (
    <DialogItem
      key={element.id}
      name={element.name}
      id={element.id}
      image={element.image}
    />
  ));
  const messageElements = messageData.map((element) => (
    <Message key={element.id} text={element.text} id={element.id} />
  ));

  return (
    <div>
      <div className={styles.warn}>(in process!)</div>
      <div className={styles.dialogs}>
        <div className={styles.dialogsItems}>{dialogsElements}</div>
        <div className={styles.messages}>
          {messageElements}
          <AddMessageForm addMessageText={(text: string) => addMessage(text)} />
        </div>
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
  const validationSchema = () =>
    yup.object().shape({
      textarea: yup
        .string()
        .typeError("should be a string")
        .max(20, "max 20 characters")
        .min(2, "min 2 characters")
        .required("required"),
    });
  return (
    <Formik
      initialValues={{ textarea: "" }}
      validateOnBlur
      onSubmit={(values) => {
        if (values.textarea != "") {
          props.addMessageText(values.textarea);
        }
      }}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        dirty,
      }) => {
        return (
          <div>
            <div>
              <textarea
                type="text"
                name={"textarea"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.textarea}
                placeholder="Write your messaage"
                className={errors.textarea ? styles.errorArea : styles.textarea}
              />
            </div>
            {touched.textarea && errors.textarea && (
              <p className={styles.errorSpan}>{errors.textarea}</p>
            )}
            <button
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
              type="submit"
              className={styles.button}
            >
              Send
            </button>
          </div>
        );
      }}
    </Formik>
  );
};

export default Dialogs;
