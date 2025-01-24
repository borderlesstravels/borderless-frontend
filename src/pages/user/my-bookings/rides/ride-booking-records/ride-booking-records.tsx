import React, { useEffect, useState } from 'react';
import MiniLoader from '../../../../../components/block-components/mini-loader/mini-loader';
import './ride-booking-records.scss';

function RideBookingRecords() {

  const [rideRecords, setRideRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setLoading(1), 4000);
  });
  
  return (
    <div className='ride-booking-records'>
    <div className='ride-list'>
      {
        loading === 0 &&
        <div className='loader-holder-40'>
          <MiniLoader />
        </div>
      }
      {
        // loading === 2 &&
        // <div className='loader-holder-40'>
        //   <div className='error-box'>
        //     <h3>An error occured while loading</h3>
        //     <button className='my-2 mx-2 confirmation-button' onClick={getRideBookingRecords}>Reload</button>
        //   </div>
        // </div>
      }
      {
        loading === 1 &&
        <>
          {
            rideRecords.length === 0 &&
            <div className='detail-card py-5'>
              <p className='mb-0 increased'>You have no ride Records yet</p>
            </div>
          }
        </>
      }
    </div>
  </div>
  );
}

export default RideBookingRecords;
