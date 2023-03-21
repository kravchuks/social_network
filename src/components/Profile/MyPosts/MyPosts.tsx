import React from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";

import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { PostsType } from "types/types";

type PropsType = {
  posts: Array<PostsType>;
  addPost: (newPostText: string) => void;
};

const MyPosts: React.FC<PropsType> = ({ posts, addPost }) => {
  let postsElements = posts.map((el) => (
    <Post
      key={el.message}
      message={el.message}
      like_count={el.like_count}
      image={el.image}
    />
  ));

  let onAddPost = (text: string) => {
    addPost(text);
  };

  return (
    <div className={styles.potsBlock}>
      <h4>My posts</h4>
      <div key="key">
        <MyPostForm onAddPost={onAddPost} />
      </div>
      <div className={styles.posts}>{postsElements}</div>
    </div>
  );
};

type MyPostFormPropsType = {
  onAddPost: (text: string) => void;
};

const MyPostForm: React.FC<MyPostFormPropsType> = (props) => {
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
          props.onAddPost(values.textarea);
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
              <Field as="textarea"
                type="text"
                name={"textarea"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.textarea}
                placeholder="Write something"
                className={errors.textarea ? styles.errorArea : styles.textarea}
              />
            </div>
            {touched.textarea && errors.textarea && (
              <p className={styles.errorSpan}>{errors.textarea}</p>
            )}
            <button
              disabled={!isValid && !dirty}
              // onClick={handleSubmit}
              type="submit"
              className={styles.submit}
            >
              Send
            </button>
          </div>
        );
      }}
    </Formik>
  );
};

export default MyPosts;
