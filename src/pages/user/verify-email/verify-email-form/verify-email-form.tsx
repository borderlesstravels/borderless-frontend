
import React, { useEffect, useState } from "react";
import { Formik, FormikProps, FormikValues } from "formik";
import { sendRequest } from "../../../../services/utils/request";
import { toast } from "react-toastify";
import "./verify-email-form.scss";
import { iStoreState, IUserData } from "../../../../services/constants/interfaces/store-schemas";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../../services/actions-reducers/user-data";

function VerifyEmailForm({userVerified}: {userVerified?: Function}) {
  const [response, setResponse] = useState<any>();
  const user: IUserData = useSelector((state: iStoreState) => state.user);
  const dispatch = useDispatch();

  const submitRequest = (values: any, controls: any) => {
    sendRequest(
      {
        url: user?.userMode + "-auth/verify-email",
        method: "POST",
        body: {
          otp: values.otp,
          userId: user.userId,
        },
      },
      (res: any) => {
        sessionStorage.setItem("userInfo", JSON.stringify(res.user));
        dispatch(userLogin({...res.user, userMode: user?.userMode}));
        toast.success(res.message);
        if(userVerified) {
          userVerified(res.user);
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

  const validate = (values: FormikValues) => {
    const errors: any = {};

    if (!values.otp) {
      errors.otp = "OTP is required";
    } else if (values.otp.length < 3) {
      errors.otp = "OTP can not be lass than 3 characters";
    }

    return errors;
  };

  useEffect(() => {});

  return (
    <div className="dialogue-container">
      <h6>Verify {user.userMode === 'host' && <> Host </>} Email</h6>
      <p className="brief">Enter the code sent to registered email address</p>
      <Formik
        initialValues={{
          otp: "",
        }}
        validate={(value) => validate(value)}
        onSubmit={(values, controls) =>
          submitRequest(values, controls)
        }>
        {(
          props: FormikProps<{
            otp: string;
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
                  <label className="text-left">OTP Code</label>
                  <input
                    type="text"
                    placeholder="Enter code"
                    id="otp"
                    value={values.otp}
                    onBlur={handleBlur}
                    onFocus={() => (errors.otp = "")}
                    onChange={handleChange}
                    onClick={() => setResponse('')}
                    className={
                      errors.otp && touched.otp ? "im-error" : ""
                    }
                  />
                  {errors.otp && touched.otp && (
                    <p className="reduced error-popup pt-1 mb-0">
                      {errors.otp}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-center pt-4 pb-2">
                <button
                  type="submit"
                  className="btn btn-con mx-0"
                  disabled={isSubmitting}>
                  {isSubmitting ? "Processing.." : "Verify"}
                </button>
                {response && <div className="reduced error-popup">{response}</div>}
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default VerifyEmailForm;
