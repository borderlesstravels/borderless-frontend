import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../../navigations/routes";
import AdminSignupForm from "./signup-form/signup-form";
import "./signup.scss";

function SignupPage() {
  const navigate = useNavigate();

  const poceedToVerify = (id: string, mode: string) => {
    navigate(`/${Path.verfyEmail}?id=${id}&mode=${mode}`);
  };

  const goToLogin = () => {
    navigate(`/${Path.login}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="signup-page">
      <div className="hold-grid">
        <div className="content-sect">
          <div className="content-holder">
            <AdminSignupForm
              poceedToVerify={poceedToVerify}
              switchToLogin={goToLogin}
            />
          </div>
        </div>
        <div className="image-sect"></div>
      </div>
    </div>
  );
}

export default SignupPage;
