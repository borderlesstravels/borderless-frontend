import React, {  } from 'react';
import './ride-booking-comp.scss';

interface IFlightBooking {
  cleanSelection?: boolean;
}

function RideBookingComp({cleanSelection}: IFlightBooking) {
  return (
    <div className='ride-booking-comp'>
      <div className=''>Ride</div>
    </div>
  );
}

export default RideBookingComp;
