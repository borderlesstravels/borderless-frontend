import React, { useEffect, useState } from "react";
import { Formik, FormikProps, FormikValues } from "formik";
import { toast } from "react-toastify";
import "./verify-email-form.scss";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../../../store/features/user";
import { Api } from "../../../../types";
import { useSearchParams } from "react-router-dom";
import { useUserVerifyEmailMutation } from "../../../../store/apis/user-auth";
import { useHostVerifyEmailMutation } from "../../../../store/apis/host-auth";

function VerifyEmailForm({ userVerified }: { userVerified?: Function }) {
  const [response, setResponse] = useState<any>();

  const [searchParams] = useSearchParams();

  const [userVerifyEmailMutate] = useUserVerifyEmailMutation();
  const [hostVerifyEmailMutate] = useHostVerifyEmailMutation();

  const userIdQuery = searchParams.get("id");
  const userModeQuery = searchParams.get("mode");

  const dispatch = useDispatch();

  const submitRequest = async (values: any, controls: any) => {
    try {
      let res;
      const payload = {
        otp: values.otp,
        userId: userIdQuery || "",
      };

      if (userModeQuery === "user") {
        res = await userVerifyEmailMutate(payload).unwrap();
      } else {
        res = await hostVerifyEmailMutate(payload).unwrap();
      }

      if (res) {
        sessionStorage.setItem("userInfo", JSON.stringify(res.user));
        dispatch(
          handleLogin({
            mode: userModeQuery as Api.General.UserMode,
            user: res.user,
          })
        );
        toast.success(res.message);
        if (userVerified) {
          userVerified(res.user);
        }
        controls.setSubmitting(false);
      }
    } catch (error: any) {
      controls.setSubmitting(false);
      toast.error(error?.error || error?.message || "Request Failed");
      setResponse(error?.error || error?.message || "Request Failed");
    }
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
      <h6>Verify {userModeQuery === "host" && <> Host </>} Email</h6>
      <p className="brief">Enter the code sent to registered email address</p>
      <Formik
        initialValues={{
          otp: "",
        }}
        validate={(value) => validate(value)}
        onSubmit={(values, controls) => submitRequest(values, controls)}
      >
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
                    onClick={() => setResponse("")}
                    className={errors.otp && touched.otp ? "im-error" : ""}
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing.." : "Verify"}
                </button>
                {response && (
                  <div className="reduced error-popup">{response}</div>
                )}
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default VerifyEmailForm;
