import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { routeConstants } from '../../../services/constants/route-constants';
import VerifyEmailForm from './verify-email-form/verify-email-form';
import './verify-email.scss';

function LoginPage() {

  const navigate = useNavigate();

  const userVerified = () => {
    navigate(`${routeConstants.home}`);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='verify-email-page'>
      <div className='hold-grid'>
        <div className='content-sect'>
          <div className='content-holder'>
            <VerifyEmailForm userVerified={userVerified} />
          </div>
        </div>
        <div className='image-sect'></div>
      </div>
    </div>
  );
}

export default LoginPage;
