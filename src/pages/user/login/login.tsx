import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { routeConstants } from '../../../services/constants/route-constants';
import LoginForm from './login-form/login-form';
import './login.scss';

function LoginPage() {

  const navigate = useNavigate();

  const poceedToVerify = () => {
    navigate(`/${routeConstants.verfyEmail}`);
  }

  const logUserIn = () => {
    navigate(`${routeConstants.home}`);
  }

  const goToRegister = () => {
    navigate(`/${routeConstants.signup}`);
  }

  const requestPasswordReset = () => {
    navigate(`/${routeConstants.requestPassword}`);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='login-page'>
      <div className='hold-grid'>
        <div className='content-sect'>
          <div className='content-holder'>
            <LoginForm poceedToVerify={poceedToVerify} logUserIn={logUserIn} switchToRegister={goToRegister} passwordReset={requestPasswordReset} />
          </div>
        </div>
        <div className='image-sect'></div>
      </div>
    </div>
  );
}

export default LoginPage;
