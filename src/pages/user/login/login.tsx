import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../../navigations/routes";
import LoginForm from "./login-form/login-form";
import "./login.scss";

function LoginPage() {
  const navigate = useNavigate();

  const poceedToVerify = (id: string, mode: string) => {
    navigate(`/${Path.verfyEmail}?id=${id}&mode=${mode}`);
  };

  const logUserIn = () => {
    navigate(`${Path.home}`);
  };

  const goToRegister = () => {
    navigate(`/${Path.signup}`);
  };

  const requestPasswordReset = (mode: string) => {
    navigate(`/${Path.requestPassword}?mode=${mode}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="login-page">
      <div className="hold-grid">
        <div className="content-sect">
          <div className="content-holder">
            <LoginForm
              poceedToVerify={poceedToVerify}
              logUserIn={logUserIn}
              switchToRegister={goToRegister}
              passwordReset={requestPasswordReset}
            />
          </div>
        </div>
        <div className="image-sect"></div>
      </div>
    </div>
  );
}

export default LoginPage;
