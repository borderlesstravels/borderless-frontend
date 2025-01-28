import React, { useEffect, useState } from "react";
import { Formik, FormikProps, FormikValues } from "formik";
import { toast } from "react-toastify";
import { regexConstants } from "../../../../services/constants/validation-regex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./login-form.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { handleLogin, selectUserMode } from "../../../../store/features/user";
import {
  useUserLoginMutation,
  useUserResendVerificationOtpMutation,
} from "../../../../store/apis/user-auth";
import {
  useHostLoginMutation,
  useHostResendVerificationOtpMutation,
} from "../../../../store/apis/host-auth";

interface ILoginForm {
  poceedToVerify?: Function;
  logUserIn?: Function;
  switchToRegister?: Function;
  passwordReset?: Function;
}

function LoginForm({
  poceedToVerify,
  logUserIn,
  switchToRegister,
  passwordReset,
}: ILoginForm) {
  const dispatch = useDispatch();

  const [response, setResponse] = useState<any>();
  const [showPassword, setShowPassword] = useState(false);
  const currentUserMode = useSelector(selectUserMode);
  const [userMode, setUserMode] = useState<"user" | "host">(
    currentUserMode || "user"
  );

  const [userLoginMutate] = useUserLoginMutation();
  const [hostLoginMutate] = useHostLoginMutation();
  const [userResendOtpMutate] = useUserResendVerificationOtpMutation();
  const [hostResendOtpMutate] = useHostResendVerificationOtpMutation();

  const goToRegister = () => {
    if (switchToRegister) {
      switchToRegister();
    }
  };

  const submitRequest = async (values: any, controls: any) => {
    try {
      let res;
      const payload = {
        loginId: values.email,
        password: values.password,
      };

      if (userMode === "user") {
        res = await userLoginMutate(payload).unwrap();
      } else {
        res = await hostLoginMutate(payload).unwrap();
      }

      if (res) {
        toast.success(res.message);
        if (res.user) {
          dispatch(handleLogin({ mode: userMode, user: res.user }));
          if (logUserIn) {
            logUserIn();
          }
        }
        controls.setSubmitting(false);
      }
    } catch (error: any) {
      toast.error(error?.error || error?.message || "Request Failed");
      setResponse(error?.error || error?.message || "Request Failed");

      if (error?.data?.message === "Unverified email") {
        if (poceedToVerify) {
          // dispatch(handleLogin({mode: userMode, user}))
          // dispatch(userLogin({ userId: err?.userId, userMode }));

          let res;
          const payload = {
            userId: error?.data?.userId,
          };

          if (userMode === "user") {
            res = await userResendOtpMutate(payload).unwrap();
          } else {
            res = await hostResendOtpMutate(payload).unwrap();
          }

          if (res) {
            poceedToVerify(error?.data?.userId, userMode);
            controls.setSubmitting(false);
          }
        } else {
          controls.setSubmitting(false);
        }
      } else {
        controls.setSubmitting(false);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validate = (values: FormikValues) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regexConstants.emailPattern.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 3) {
      errors.password = "Password can not be lass than 3 characters";
    }

    return errors;
  };

  const loginWithGoogle = () => {
    toast("Google login under development");
  };

  const loginWithFacebook = () => {
    toast("Facebook login under development");
  };

  const requestPasswordReset = () => {
    if (passwordReset) {
      passwordReset(userMode);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="dialogue-container">
      <h6>{userMode === "host" && <span>Host </span>}Log In</h6>
      <p className="brief">Enter details to log in to your account</p>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(value) => validate(value)}
        onSubmit={(values, controls) => submitRequest(values, controls)}
      >
        {(
          props: FormikProps<{
            email: string;
            password: string;
          }>
        ) => {
          const {
            values,
            errors,
            touched,
            isSubmitting,
            handleBlur,
            handleChange,
            handleSubmit,
          } = props;
          return (
            <form
              action=""
              className="row"
              onSubmit={handleSubmit}
              onClick={() => setResponse("")}
            >
              <div className="col-md-12">
                <div className="reg-card">
                  <label className="text-left">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onFocus={() => (errors.email = "")}
                    onChange={handleChange}
                    className={errors.email && touched.email ? "im-error" : ""}
                  />
                  {errors.email && touched.email && (
                    <p className="reduced error-popup pt-1 mb-0">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="reg-card">
                  <label className="text-left">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    id="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onFocus={() => (errors.password = "")}
                    onChange={handleChange}
                    className={
                      errors.password && touched.password ? "im-error" : ""
                    }
                  />
                  <div className="password-shower">
                    {showPassword ? (
                      <FontAwesomeIcon
                        icon={"eye-slash"}
                        onClick={toggleShowPassword}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={"eye"}
                        onClick={toggleShowPassword}
                      />
                    )}
                  </div>
                  {errors.password && touched.password && (
                    <p className="reduced error-popup pt-1 mb-0">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-center pt-4 pb-2">
                <button
                  type="submit"
                  className="btn btn-con mx-0"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing.." : "Log In"}
                </button>
                {response && (
                  <div className="reduced error-popup">{response}</div>
                )}
              </div>
            </form>
          );
        }}
      </Formik>
      <div className="row pt-3 pb-2">
        <div className="col-md-6 py-2">
          <div className="social-login" onClick={loginWithGoogle}>
            <p className="mb-0">
              <FontAwesomeIcon icon={["fab", "google"]} className="ic-google" />
              <span>Sign in with Google</span>
            </p>
          </div>
        </div>
        <div className="col-md-6 py-2">
          <div className="social-login" onClick={loginWithFacebook}>
            <p className="mb-0">
              <FontAwesomeIcon
                icon={["fab", "facebook"]}
                className="ic-facebook"
              />
              <span>Sign in with Google</span>
            </p>
          </div>
        </div>
        <div className="col-md-12 py-2">
          {userMode === "user" && (
            <p className="mb-0 alternate-action">
              Log in as a<span onClick={() => setUserMode("host")}> Host</span>
            </p>
          )}
          {userMode === "host" && (
            <p className="mb-0 alternate-action">
              Log in as a<span onClick={() => setUserMode("user")}> User</span>
            </p>
          )}
          <p className="mb-0 alternate-action pt-2">
            Don't yet have an account?
            <span onClick={goToRegister}> Sign Up</span>
          </p>
        </div>
        <div className="col-md-12 py-2">
          <p className="mb-0 alternate-action">
            Forgotten your password?
            <span onClick={requestPasswordReset}> Recover password</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
