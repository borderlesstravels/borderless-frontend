import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { routeConstants } from '../../../services/constants/route-constants';
import RetrievePasswordForm from './retrieve-password/retrieve-password-form';
import './retrieve-password.scss';

function RetrievePasswordPage() {

  const navigate = useNavigate();

  const retrievalInitiated = () => {
    navigate(`/${routeConstants.updatePassword}`);
  }

  const goToLogin = () => {
    navigate(`/${routeConstants.login}`);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='retrieve-password-page'>
      <div className='hold-grid'>
        <div className='content-sect'>
          <div className='content-holder'>
            <RetrievePasswordForm retrievalInitiated={retrievalInitiated} switchToLogin={goToLogin} />
          </div>
        </div>
        <div className='image-sect'></div>
      </div>
    </div>
  );
}

export default RetrievePasswordPage;
