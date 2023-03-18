import React from "react";
import { Field, Formik } from "formik";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import * as yup from "yup";

import styles from "./Login.module.css";
import { login, getCaptchaUrl } from "redux/auth-reducer";

class LoginForm extends React.Component {
  validationSchema = yup.object().shape({
    password: yup
      .string()
      .typeError("should be a string")
      .max(13, "max 8 characters")
      .min(2, "min 2 characters")
      .required("required"),
    // confirmPassword: yup.string().oneOf([yup.ref('password')], 'passwords are not same').required('required'),
    email: yup.string().email("Email should be correct").required("required"),
  });

  render() {
    if (this.props.isAuth) {
      return <Navigate to={"/profile"} />;
    }
    return (
      <div>
        <h1>Login</h1>
        <Formik
          initialValues={{
            password: "",
            email: "",
            confirmEmail: "",
            rememberMe: false,
            captcha: "",
          }}
          validateOnBlur
          onSubmit={(values) => {
            this.props.login(
              values.email,
              values.password,
              values.rememberMe,
              values.captcha
            );
          }}
          validationSchema={this.validationSchema}
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
            <div>
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
                {this.props.captchaUrl && (
                  <div>
                    <div>
                      <img src={this.props.captchaUrl} className={styles.captcha} />
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
                  {this.props.userId == "something went wrong" && (
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
                  onClick={handleSubmit}
                  type="submit"
                  className={styles.submit}
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    captchaUrl: state.auth.captchaUrl,
  };
};

export default connect(mapStateToProps, { login, getCaptchaUrl })(LoginForm);
