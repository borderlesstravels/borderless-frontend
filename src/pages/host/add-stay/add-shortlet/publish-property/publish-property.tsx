
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import MiniLoader from '../../../../../components/block-components/mini-loader/mini-loader';
import { userLogout } from '../../../../../services/actions-reducers/user-data';
import { sendRequest } from '../../../../../services/utils/request';
import { iBasicInfo, iAdvancedInfo, preparePropertyData } from '../add-shortlet-data';
import './publish-property.scss';

function PublishPropertySect({basicData, advancedData, revert}: {basicData: iBasicInfo, advancedData: iAdvancedInfo, revert: Function}) {
  const [loading, setLoading] = useState<0 | 1 | 2 | 3>(0);
  const dispatch = useDispatch();

  const previous = () => {
    revert();
  }

  const submitPropertyData = () => {
    console.log('tak')
    // toast.success('Under Development');
    // return;
    setLoading(1);
    
    sendRequest(
      {
        url: "host-profile/add-listing",
        method: "POST",
        body: preparePropertyData(basicData, advancedData),
        catchAuthError: () => dispatch(userLogout()),
      },
      (res: any) => {
        setLoading(3);
      },
      (err: any) => {
        setLoading(2);
      }
    );
  }

  const goBack = () => {
    window.history.back()
  }

  useEffect(() => {});
  
  return (
    <div className='publish-property'>
      {
        loading === 0 &&
        <div className='center-info submit-grid pt-5'>
          <div className='button-holders'>
            <button className='recede-button' onClick={previous}>Previous</button>
          </div>
          <div className='button-holders'>
            <button className='proceed-button' onClick={submitPropertyData}>Submit for Review</button>
          </div>
        </div>
      }
      {
        loading === 1 &&
        <div className='loader-holder-40'>
          <MiniLoader />
        </div>
      }
      {
        loading === 2 &&
        <div className='loader-holder-40'>
          <div className='error-box'>
            <h3>An error occured while submittinng</h3>
            <div className='center-info submit-grid pt-5'>
              <div className='button-holders'>
                <button className='proceed-button' onClick={submitPropertyData}>Retry</button>
              </div>
              <div className='button-holders'>
                <button className='recede-button' onClick={previous}>Previous</button>
              </div>
            </div>
          </div>
        </div>
      }
      {
        loading === 3 &&
        <div className='loader-holder-40'>
          <div className='error-box'>
            <h3>Property added successfully</h3>
            <p>It would be activated after approval by an admin</p>
            <div className='text-align-center button-holders'>
              <button className='proceed-button px-4' onClick={goBack}>Exit</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default PublishPropertySect;
