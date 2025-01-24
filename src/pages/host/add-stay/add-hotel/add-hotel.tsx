import React, { useEffect } from 'react';
import './add-hotel.scss';

function AddHotelPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='add-hotel'>
      <div className='banner'>
        <h1>Add Hotel Page</h1>
      </div>
    </div>
  );
}

export default AddHotelPage;
