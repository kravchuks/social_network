import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, Formik, Form } from "formik";
import { Navigate } from "react-router-dom";
import * as yup from "yup";

import styles from "./Login.module.css";
import { login } from "redux/auth-reducer";
import { AppStateType, AppDispatch } from "redux/redux-store";

const LoginForm: React.FC = () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl
  );

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = ({
    email,
    password,
    rememberMe,
    captcha,
  }: {
    password: string;
    email: string;
    rememberMe: boolean;
    captcha?: string;
  }) => {
    dispatch(login(email, password, rememberMe, captcha || ""));
  };

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .typeError("should be a string")
      .max(13, "max 8 characters")
      .min(2, "min 2 characters")
      .required("required"),
    email: yup.string().email("Email should be correct").required("required"),
  });

  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <Formik
      initialValues={{
        password: "",
        email: "",
        rememberMe: false,
        captcha: "",
      }}
      validateOnBlur
      onSubmit={onSubmit}
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
      }) => (
        <Form className={styles.form}>
          <h1>Login</h1>
          <>
            <Field
              type="email"
              name={"email"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="email"
              className={styles.input}
            />
            {touched.email && errors.email && <p>{errors.email}</p>}
          </>

          <>
            <Field
              type="password"
              name={"password"}
              autoComplete="on"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="password"
              className={styles.input}
            />
            {touched.password && errors.password && <p>{errors.password}</p>}
          </>

          <>
            <Field
              type={"checkbox"}
              name={"rememberMe"}
              onChange={handleChange}
              id="rememberMe"
            />
            <label htmlFor={"rememberMe"}> remember me </label>
          </>

          {captchaUrl && (
            <>
              <img src={captchaUrl} className={styles.captcha} />
              <Field
                type={"text"}
                name={"captcha"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.captcha}
              />
            </>
          )}

          <button disabled={!isValid} type="submit" className={styles.submit}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
