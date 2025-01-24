
import React, { useEffect, useState } from "react";
import { Formik, FormikProps, FormikValues } from "formik";
// import * as Yup from 'yup';
import { sendRequest } from "../../../../services/utils/request";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reset-password-form.scss";
import { iStoreState, IUserData } from "../../../../services/constants/interfaces/store-schemas";
import { useSelector } from "react-redux";

function ResetPasswordForm({resetComplete, switchToLogin}: {resetComplete?: Function, switchToLogin?: Function}) {
  const [response, setResponse] = useState<any>();
  const [showPassword, setShowPassword] = useState(false);
  const user: IUserData = useSelector((state: iStoreState) => state.user);
  const token = new URLSearchParams(document.location.search).get('token');
  const id = new URLSearchParams(document.location.search).get('id');
  const userType = new URLSearchParams(document.location.search).get('type') || user?.userMode;

  const goToLogin = () => {
    if(switchToLogin){
      switchToLogin();
    }
  }

  const submitRequest = (values: any, controls: any) => {
    sendRequest(
      {
        url: `${userType || 'user'}-auth/reset-password?token=${token}&id=${id}`,
        method: "POST",
        body: {
          password: values.password,
          // otp: values.otp,
          // userId: sessionStorage.getItem("userId"),
        },
      },
      (res: any) => {
        toast.success(res.message);
        if(resetComplete) {
          resetComplete();
        }
        controls.setSubmitting(false);
      },
      (err: any) => {
        controls.setSubmitting(false);
        toast.error(err?.error || err?.message || 'Request Failed');
        setResponse(err?.error || err?.message || 'Request Failed');
      }
    );
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
      <h6>Reset {user.userMode === 'host' && <> Host </>} Password</h6>
      <p className="brief"></p>
      <Formik
        initialValues={{
          password: "",
          confirm_password: "",
        }}
        validate={(value) => validate(value)}
        onSubmit={(values, controls) =>
          submitRequest(values, controls)
        }>
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
                    onFocus={() => setResponse('')}
                    onChange={handleChange}
                    className={
                      errors.password && touched.password ? "im-error" : ""
                    }
                  />
                  <div className="password-shower">
                    {
                      showPassword ?
                      <FontAwesomeIcon icon={'eye-slash'} onClick={toggleShowPassword}/> :
                      <FontAwesomeIcon icon={'eye'} onClick={toggleShowPassword}/>
                    }
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
                    onFocus={() => setResponse('')}
                    onChange={handleChange}
                    className={
                      errors.confirm_password && touched.confirm_password ? "im-error" : ""
                    }
                  />
                  <div className="password-shower">
                    {
                      showPassword ?
                      <FontAwesomeIcon icon={'eye-slash'} onClick={toggleShowPassword}/> :
                      <FontAwesomeIcon icon={'eye'} onClick={toggleShowPassword}/>
                    }
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
                  disabled={isSubmitting}>
                  {isSubmitting ? "Processing.." : "Reset Password"}
                </button>
                {response && <div className="reduced error-popup">{response}</div>}
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
