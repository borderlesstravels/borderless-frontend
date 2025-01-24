import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { iStoreState, IUserData } from '../../../services/constants/interfaces/store-schemas';
import FlightBookingRecords from './flights/flight-booking-records/flight-booking-records';
import './my-bookings.scss';
import RideBookingRecords from './rides/ride-booking-records/ride-booking-records';
import StayBookingRecords from './stays/stay-booking-records/stay-booking-records';

function MyBookingsPage() {

  const user: IUserData = useSelector((state: iStoreState) => state.user);
  const { mode } = useParams();
  const [selectedTab, setSelectedTab] = useState<'flights' | 'stays' | 'rides'>(mode === 'stays' ? 'stays' : 'flights');
  
  const updateSelectedTab = (tab: 'flights' | 'stays' | 'rides') => {
    setSelectedTab(tab);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='my-bookings'>
      <div className='booking-banner'>
        <div className='banner-bg-flag'></div>
        <div className='user-info-card'>
          <div className='user-spread'>
            <div className='image'></div>
            <div className='name'>
              <h5>{user.first_name} {user.last_name}</h5>
              <p className='mb-0 faint-tx reduced'>{user.email}</p>
            </div>
          </div>
          <div className='spread-info-web'>
            <h3 className='h3b'>Tickets/<span className='purple-tx'>Bookings</span></h3>
            <div className='spread-info py-2'>
              <div className='m-drop-down-case'>
                <p className='mb-0 reduced-x px-1'>
                  <span className='purple-tx f600'>Refund</span>
                  <FontAwesomeIcon icon={'chevron-down'} className='mx-1 orange-tx reduced-soft' />
                </p>
                <div className='m-drop-down'></div>
              </div>
              <div className='m-drop-down-case'>
                <p className='mb-0 reduced-x px-1'>
                  <span className='purple-tx f600'>Change Ticket</span>
                  <FontAwesomeIcon icon={'chevron-down'} className='mx-1 orange-tx reduced-soft' />
                </p>
                <div className='m-drop-down'></div>
              </div>
              <div className='m-drop-down-case'>
                <p className='mb-0 reduced-x px-1'>
                  <span className='purple-tx f600'>Range</span>
                  <FontAwesomeIcon icon={'chevron-down'} className='mx-1 orange-tx reduced-soft' />
                </p>
                <div className='m-drop-down'></div>
              </div>
              <div className='m-drop-down-case'>
                <p className='mb-0 reduced-x px-1'>
                  <span className='purple-tx f600'>Upcoming</span>
                  <FontAwesomeIcon icon={'chevron-down'} className='mx-1 orange-tx reduced-soft' />
                </p>
                <div className='m-drop-down'></div>
              </div>
            </div>
          </div>
          <div className='category-tabs'>
            <div className={'category-tab' + (selectedTab ==='flights' ? ' active' : '')} onClick={() => updateSelectedTab('flights')}>
              <div className='spread-info-front py-2'>
                <h6 className='mb-0'>Flights</h6>
                <FontAwesomeIcon icon={'plane'} className={'mx-3' + (selectedTab === 'flights' ? ' orange-tx' : '')} />
              </div>
            </div>
            <div className='center-info py-2'>
              <div className='splitter'></div>
            </div>
            <div className={'category-tab' + (selectedTab ==='stays' ? ' active' : '')} onClick={() => updateSelectedTab('stays')}>
              <div className='spread-info-front py-2'>
                <h6 className='mb-0'>Stays</h6>
                <FontAwesomeIcon icon={'bed'} className={'mx-3' + (selectedTab === 'stays' ? ' orange-tx' : '')} />
              </div>
            </div>
            <div className='center-info py-2'>
              <div className='splitter'></div>
            </div>
            <div className={'category-tab' + (selectedTab ==='rides' ? ' active' : '')} onClick={() => updateSelectedTab('rides')}>
              <div className='spread-info-front py-2'>
                <h6 className='mb-0'>Rides</h6>
                <FontAwesomeIcon icon={'car'} className={'mx-3' + (selectedTab === 'rides' ? ' orange-tx' : '')} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        user.email_verified &&
        <div className=''>
          {selectedTab ==='flights' && <FlightBookingRecords/>}
          {selectedTab ==='stays' && <StayBookingRecords/>}
          {selectedTab ==='rides' && <RideBookingRecords/>}
        </div>
      }
    </div>
  );
}

export default MyBookingsPage;
