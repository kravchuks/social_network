import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, Formik, Form } from "formik";
import { Navigate } from "react-router-dom";
import * as yup from "yup";

import styles from "./Login.module.css";
import { login, getCaptchaUrl } from "redux/auth-reducer";
import { AppStateType, AppDispatch } from "redux/redux-store";

const LoginForm: React.FC = () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const userId = useSelector((state: AppStateType) => state.auth.userId);
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
    // confirmPassword: yup.string().oneOf([yup.ref('password')], 'passwords are not same').required('required'),
    email: yup.string().email("Email should be correct").required("required"),
  });

  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <>
      <h1>Login</h1>
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
          <Form>
            <div>
              <Field
                type="email"
                name={"email"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="email"
                className={styles.input}
              />
              <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
              </div>
            </div>

            <div>
              <Field
                type="password"
                name={"password"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="password"
                className={styles.input}
              />
              <div>
                {touched.password && errors.password && (
                  <p>{errors.password}</p>
                )}
              </div>
            </div>

            {/* <div>
                            <label htmlFor={'confirmPassword'}>confirmPassword</label><br />
                            <Field type="password"
                                name={'confirmPassword'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}/>
                            <div>{touched.confirmPassword && errors.confirmPassword && <p>{errors.confirmPassword}</p>}</div>
                        </div> */}

            <div>
              <Field
                type={"checkbox"}
                name={"rememberMe"}
                onChange={handleChange}
                id="rememberMe"
              />
              <label htmlFor={"rememberMe"}> remember me </label>
            </div>

            <div>
              {captchaUrl && (
                <div>
                  <div>
                    <img src={captchaUrl} className={styles.captcha} />
                  </div>
                  <Field
                    type={"text"}
                    name={"captcha"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.captcha}
                  />
                </div>
              )}
              <div>
                {" "}
                {userId === 0 && (
                  <div>
                    <h4>Common error</h4>
                  </div>
                )}
                {errors.captcha && (
                  <div>
                    <h4>{errors.captcha}</h4>
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={!isValid}
                type="submit"
                className={styles.submit}
              >
                Send
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
