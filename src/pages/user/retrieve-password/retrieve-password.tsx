import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../../navigations/routes";
import RetrievePasswordForm from "./retrieve-password/retrieve-password-form";
import "./retrieve-password.scss";

function RetrievePasswordPage() {
  const navigate = useNavigate();

  const retrievalInitiated = () => {
    navigate(`/${Path.updatePassword}`);
  };

  const goToLogin = () => {
    navigate(`/${Path.login}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="retrieve-password-page">
      <div className="hold-grid">
        <div className="content-sect">
          <div className="content-holder">
            <RetrievePasswordForm
              retrievalInitiated={retrievalInitiated}
              switchToLogin={goToLogin}
            />
          </div>
        </div>
        <div className="image-sect"></div>
      </div>
    </div>
  );
}

export default RetrievePasswordPage;
