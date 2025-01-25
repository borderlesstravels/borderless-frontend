import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../../navigations/routes";
import ResetPasswordForm from "./reset-password-form/reset-password-form";
import "./reset-password.scss";

function ResetPasswordPage() {
  const navigate = useNavigate();

  const resetComplete = () => {
    navigate(`/${Path.login}`);
  };

  const goToLogin = () => {
    navigate(`/${Path.login}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="reset-password-page">
      <div className="hold-grid">
        <div className="content-sect">
          <div className="content-holder">
            <ResetPasswordForm
              resetComplete={resetComplete}
              switchToLogin={goToLogin}
            />
          </div>
        </div>
        <div className="image-sect"></div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
