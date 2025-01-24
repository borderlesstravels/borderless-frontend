import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { routeConstants } from '../../../services/constants/route-constants';
import AdminSignupForm from './signup-form/signup-form';
import './signup.scss';

function SignupPage() {

  const navigate = useNavigate();

  const poceedToVerify = () => {
    navigate(`/${routeConstants.verfyEmail}`);
  }

  const goToLogin = () => {
    navigate(`/${routeConstants.login}`);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='signup-page'>
      <div className='hold-grid'>
        <div className='content-sect'>
          <div className='content-holder'>
            <AdminSignupForm poceedToVerify={poceedToVerify} switchToLogin={goToLogin} />
          </div>
        </div>
        <div className='image-sect'></div>
      </div>
    </div>
  );
}

export default SignupPage;
