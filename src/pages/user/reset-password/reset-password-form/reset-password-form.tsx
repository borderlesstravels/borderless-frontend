import React, { useEffect, useState } from "react";
import { Formik, FormikProps, FormikValues } from "formik";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reset-password-form.scss";
import { useSelector } from "react-redux";
import { selectUserMode } from "../../../../store/features/user";
import { useSearchParams } from "react-router-dom";
import { useUserResetPasswordMutation } from "../../../../store/apis/user-auth";
import { useHostResetPasswordMutation } from "../../../../store/apis/host-auth";

function ResetPasswordForm({
  resetComplete,
  switchToLogin,
}: {
  resetComplete?: Function;
  switchToLogin?: Function;
}) {
  const [response, setResponse] = useState<any>();
  const [showPassword, setShowPassword] = useState(false);
  const userMode = useSelector(selectUserMode);

  const [searchParams] = useSearchParams();

  const [userResetPwdMutate] = useUserResetPasswordMutation();
  const [hostResetPwdMutate] = useHostResetPasswordMutation();

  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const userType = searchParams.get("type") || "user";

  const goToLogin = () => {
    if (switchToLogin) {
      switchToLogin();
    }
  };

  const submitRequest = async (values: any, controls: any) => {
    try {
      let res;
      const payload = {
        body: {
          password: values.password,
        },
        params: {
          id: id || "",
          token: token || "",
        },
      };

      if (userType === "user") {
        res = await userResetPwdMutate(payload).unwrap();
      } else {
        res = await hostResetPwdMutate(payload).unwrap();
      }

      if (res) {
        toast.success(res.message);
        if (resetComplete) {
          resetComplete();
        }
        controls.setSubmitting(false);
      }
    } catch (error: any) {
      controls.setSubmitting(false);
      toast.error(error?.error || error?.data?.message || "Request Failed");
      setResponse(error?.error || error?.data?.message || "Request Failed");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validate = (values: FormikValues) => {
    const errors: any = {};

    if (!values.password) {
      errors.password = "New password is required";
    } else if (values.password.length < 3) {
      errors.password = "Password can not be lass than 3 characters";
    }
    if (!values.confirm_password) {
      errors.confirm_password = "Confirming password is required";
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = "Password and confirmation do not match";
    }
    return errors;
  };

  useEffect(() => {});

  return (
    <div className="dialogue-container">
      <h6>Reset {userMode === "host" && <> Host </>} Password</h6>
      <p className="brief"></p>
      <Formik
        initialValues={{
          password: "",
          confirm_password: "",
        }}
        validate={(value) => validate(value)}
        onSubmit={(values, controls) => submitRequest(values, controls)}
      >
        {(
          props: FormikProps<{
            password: string;
            confirm_password: string;
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
            <form action="" className="row" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <div className="reg-card">
                  <label className="text-left">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    id="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onFocus={() => setResponse("")}
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
              <div className="col-md-12">
                <div className="reg-card">
                  <label className="text-left">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    id="confirm_password"
                    value={values.confirm_password}
                    onBlur={handleBlur}
                    onFocus={() => setResponse("")}
                    onChange={handleChange}
                    className={
                      errors.confirm_password && touched.confirm_password
                        ? "im-error"
                        : ""
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
                  {errors.confirm_password && touched.confirm_password && (
                    <p className="reduced error-popup pt-1 mb-0">
                      {errors.confirm_password}
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
                  {isSubmitting ? "Processing.." : "Reset Password"}
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
        <div className="col-md-12 py-2">
          <p className="mb-0 alternate-action">
            Return to
            <span onClick={goToLogin}> Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
