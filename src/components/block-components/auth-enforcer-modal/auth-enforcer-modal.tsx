import React, { useEffect, useState } from "react";
import "./auth-enforcer-modal.scss";
import {
  closeAppModal,
  openModal,
} from "../../../services/utils/app-data-modal-service";
import LoginForm from "../../../pages/user/login/login-form/login-form";
import AdminSignupForm from "../../../pages/user/signup/signup-form/signup-form";
import VerifyEmailForm from "../../../pages/user/verify-email/verify-email-form/verify-email-form";
import RetrievePasswordForm from "../../../pages/user/retrieve-password/retrieve-password/retrieve-password-form";
import ResetPasswordForm from "../../../pages/user/reset-password/reset-password-form/reset-password-form";
import { useNavigate } from "react-router-dom";
import { Path } from "../../../navigations/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../services/actions-reducers/user-data";
import { sendRequest } from "../../../services/utils/request";
import { useSelector } from "react-redux";
import { iStoreState } from "../../../services/constants/interfaces/store-schemas";

const AuthEnforcerModal = (props: {
  overlayMode: number;
  updateOverlayMode: Function;
  init: boolean;
  proceed?: Function;
}) => {
  const [authPage, setAuthPage] = useState<
    "login" | "register" | "verify" | "forgot_password" | "reset_password"
  >("login");
  const [closeClass, setCloseClass] = useState<"close-false" | "close-true">(
    "close-false"
  );
  const userType: "user" | "host" = useSelector(
    (state: iStoreState) => state?.user?.userMode || "user"
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logUserIn = (user?: any) => {
    if (user) {
      // sendRequest(
      //   {
      //     url: userType === 'user' ? 'user-auth/logout' : 'host-profile/logout',
      //     method: "POST",
      //     body: {},
      //   },
      //   () => {
      //     dispatch(userLogout());
      //     navigateTo(`${Path.home}`);
      //   },
      //   () => {}
      // );
      dispatch(userLogin(user));
    }
    setAuthPage("login");
    if (props.proceed) {
      closeModal();
      setTimeout(() => props.updateOverlayMode(2), 500);
      props.proceed();
    }
  };

  const goToLogin = () => {
    setAuthPage("login");
  };

  const goToRegister = () => {
    setAuthPage("register");
  };

  const poceedToVerify = () => {
    setAuthPage("verify");
  };

  const retrievalInitiated = () => {
    setAuthPage("reset_password");
  };

  const forgotPassword = () => {
    setAuthPage("forgot_password");
  };

  const hideCloser = (ev: any) => {
    setCloseClass("close-false");
  };
  const showCloser = (ev: any) => {
    setCloseClass("close-true");
  };

  const closeModal = () => {
    closeAppModal(
      () => {
        // props.closeModal({skipHide: true, query: '.auth-enforcer-modal'})
      },
      { skipHide: true, query: ".auth-enforcer-modal" }
    );
  };

  const returnHome = () => {
    navigate(Path.home);
  };

  useEffect(() => {
    openModal({ skipHide: true, query: ".auth-enforcer-modal" });
  }, [props.init]);

  useEffect(() => {
    if (props.overlayMode === 1) {
      closeModal();
      setTimeout(() => props.updateOverlayMode(2), 500);
    }
  }, [props.overlayMode]);

  return (
    <div className="auth-enforcer-modal edit-news-modal">
      <div className="modal-bg"></div>
      <div className="modal-container">
        <div className="modal-content">
          <div className="space-control" onClick={hideCloser}>
            {/* <h1 className="text-center">Content Starts Here</h1> */}
            {authPage === "login" && (
              <LoginForm
                poceedToVerify={poceedToVerify}
                logUserIn={logUserIn}
                switchToRegister={goToRegister}
                passwordReset={forgotPassword}
              />
            )}
            {authPage === "register" && (
              <AdminSignupForm
                poceedToVerify={poceedToVerify}
                switchToLogin={goToLogin}
              />
            )}
            {authPage === "verify" && (
              <VerifyEmailForm userVerified={logUserIn} />
            )}
            {authPage === "forgot_password" && (
              <RetrievePasswordForm
                retrievalInitiated={retrievalInitiated}
                switchToLogin={goToLogin}
              />
            )}
            {authPage === "reset_password" && (
              <ResetPasswordForm
                resetComplete={goToLogin}
                switchToLogin={goToLogin}
              />
            )}
            {/* <h1 className="text-center">Content Ends Here</h1> */}
          </div>
          <div className="close-holder">
            <div className="close-button" onClick={showCloser}>
              <FontAwesomeIcon icon={"times"} />
            </div>
            <div className={"confirmation " + closeClass}>
              <p>
                Are you sure you want to close the login process and return to
                home page? (any unsaved progress will be lost)
              </p>
              <div className="text-center">
                <button onClick={hideCloser} className="cancel mx-2">
                  Cancel
                </button>
                <button
                  onClick={returnHome}
                  className="confirmation-button mx-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthEnforcerModal;
