import React, { useEffect, useState } from "react";
import { Formik, FormikProps, FormikValues } from "formik";
import { toast } from "react-toastify";
import "./retrieve-password-form.scss";
import { regexConstants } from "../../../../services/constants/validation-regex";
import { useSearchParams } from "react-router-dom";
import { useUserForgotPasswordMutation } from "../../../../store/apis/user-auth";
import { useHostForgotPasswordMutation } from "../../../../store/apis/host-auth";

function RetrievePasswordForm({
  retrievalInitiated,
  switchToLogin,
}: {
  retrievalInitiated?: Function;
  switchToLogin?: Function;
}) {
  const [response, setResponse] = useState<any>();

  const [searchParams] = useSearchParams();

  const [userForgotPwdMutate] = useUserForgotPasswordMutation();
  const [hostForgotPwdMutate] = useHostForgotPasswordMutation();

  const userMode = searchParams.get("mode");

  const goToLogin = () => {
    if (switchToLogin) {
      switchToLogin();
    }
  };

  const submitRequest = async (values: any, controls: any) => {
    try {
      let res;
      const payload = {
        email: values.email,
      };

      if (userMode === "host") {
        res = await hostForgotPwdMutate(payload).unwrap();
      } else {
        res = await userForgotPwdMutate(payload).unwrap();
      }

      if (res) {
        toast.success(res.message);
        if (retrievalInitiated) {
          retrievalInitiated();
        }
        controls.setSubmitting(false);
      }
    } catch (error: any) {
      controls.setSubmitting(false);
      toast.error(error?.error || error?.data?.message || "Request Failed");
      setResponse(error?.error || error?.data?.message || "Request Failed");
    }
    // sendRequest(
    //   {
    //     url: `${userMode || "user"}-auth/forgot-password`,
    //     method: "POST",
    //     body: {
    //       email: values.email,
    //     },
    //   },
    //   (res: any) => {
    //     sessionStorage.setItem("userId", res.userId);
    //     toast.success(res.message);
    //     if (retrievalInitiated) {
    //       retrievalInitiated();
    //     }
    //     controls.setSubmitting(false);
    //   },
    //   (err: any) => {
    //     controls.setSubmitting(false);
    //     toast.error(err?.error || err?.message || "Request Failed");
    //     setResponse(err?.error || err?.message || "Request Failed");
    //   }
    // );
  };

  const validate = (values: FormikValues) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regexConstants.emailPattern.test(values.email)) {
      errors.email = "Invalid email";
    }

    return errors;
  };

  useEffect(() => {});

  return (
    <div className="dialogue-container">
      <h6>Password {userMode === "host" && <> Host </>} Recovery</h6>
      <p className="brief"></p>
      <Formik
        initialValues={{
          email: "",
        }}
        validate={(value) => validate(value)}
        onSubmit={(values, controls) => submitRequest(values, controls)}
      >
        {(
          props: FormikProps<{
            email: string;
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
                  <label className="text-left">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onFocus={() => (errors.email = "")}
                    onChange={handleChange}
                    onClick={() => setResponse("")}
                    className={errors.email && touched.email ? "im-error" : ""}
                  />
                  {errors.email && touched.email && (
                    <p className="reduced error-popup pt-1 mb-0">
                      {errors.email}
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
                  {isSubmitting ? "Processing.." : "Recover"}
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

export default RetrievePasswordForm;
