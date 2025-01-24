import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { PendingTag } from '../../../../../assets/images';
import MiniLoader from '../../../../../components/block-components/mini-loader/mini-loader';
import { apiLinks } from '../../../../../config/environment';
import { routeConstants } from '../../../../../services/constants/route-constants';
import { formatDate, formatDateMini } from '../../../../../services/utils/data-manipulation-utilits';
import { sendRequest } from '../../../../../services/utils/request';
import { formatTime } from '../../../stays/stay-search/stay-search-service';
import './stay-booking-records.scss';

function StayBookingRecords(props: any) {

  const [stayRecords, setStayRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<0 | 1 | 2>(0);

  const navigate = useNavigate();

  const getStayBookingRecords = () => {
    setLoading(0);
    
    sendRequest(
      {
        url: "user-profile/shortlet-bookings",
        method: "GET",
      },
      (res: any) => {
        setStayRecords(Array.isArray(res.data) ? res.data.reverse() : []);
        setLoading(1);
      },
      (err: any) => {
        setLoading(1);
      }
    );
  };

  const viewDetails = (id: string) => {
    // window.open(apiLinks.url + 'stay/stay-booking-details/' + reference);
    navigate(`/${routeConstants.stayBookingDetail}/${id}`)
  }

  useEffect(() => {
    getStayBookingRecords();
  }, [props]);
  
  return (
    <div className='stay-booking-records'>
    <div className='stay-list'>
      {
        loading === 0 &&
        <div className='loader-holder-40'>
          <MiniLoader />
        </div>
      }
      {
        loading === 2 &&
        <div className='loader-holder-40'>
          <div className='error-box'>
            <h3>An error occured while loading</h3>
            <button className='my-2 mx-2 confirmation-button' onClick={getStayBookingRecords}>Reload</button>
          </div>
        </div>
      }
      {
        loading === 1 &&
        <>
          {
            stayRecords.map((stay, index) => (
              <div className='detail-card' key={index}>
                <div className='outer-spread'>
                  <div className='inner-spread'>
                    <div className='image-holder'>
                      <div className='airline-image' style={{backgroundImage: `url(${stay.airline_logo})`}}></div>
                    </div>
                    <div className='stay-time-case'>
                      <div>
                        <h6>{stay.apartment_name}</h6>
                      </div>
                      <div className='stay-time'>
                        <div className=''>
                          <p className='mb-0 reduced-x faint-tx'>Check-In</p>
                          <h5 className='mb-0 number-medium reduced'>{formatDate(stay.check_in_date)}</h5>
                        </div>
                        <FontAwesomeIcon icon={'minus'} className='increased px-3' />
                        <div className=''>
                          <p className='mb-0 reduced-x faint-tx'>Check-Out</p>
                          <h5 className='mb-0 number-medium reduced'>{formatDate(stay.check_out_date)}</h5>
                        </div>
                      </div>
                    </div>
                    <div className='splitter'></div>
                    <div className='spread-info'>
                      <div className='space-right'>
                        <div className='description-grid-40 pb-3'>
                          <div className='icon-holder'>
                            <FontAwesomeIcon icon={'calendar-days'} className='icon' />
                          </div>
                          <div className='space-left'>
                            <p className='mb-0 reduced-xl faint-tx reduce-height'>Check-In Time</p>
                            <p className='mb-0 reduced number-medium'>{formatTime(stay.check_in_time, true)}</p>
                          </div>
                        </div>
                        <div className='description-grid-40 '>
                          <div className='icon-holder'>
                            <FontAwesomeIcon icon={'calendar-days'} className='icon' />
                          </div>
                          <div className='space-left'>
                            <p className='mb-0 reduced-xl faint-tx reduce-height'>Room No</p>
                            <p className='mb-0 reduced number-medium'>On Arrival</p>
                            {/* <p className='mb-0 reduced-xl faint-tx reduce-height'>Check-Out Time</p>
                            <p className='mb-0 reduced number-medium'>{formatTime(stay.check_out_time, true)}</p> */}
                          </div>
                        </div>
                      </div>
                      {/* <div>
                        <div className='description-grid-40 pb-3'>
                          <div className='icon-holder'>
                            <FontAwesomeIcon icon={'door-closed'} className='icon' />
                          </div>
                          <div className='space-left'>
                            <p className='mb-0 reduced-xl faint-tx reduce-height'>Room No</p>
                            <p className='mb-0 reduced number-medium'>On Arrival</p>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className='text-center py-3'>
                    <button className='purple-button purple-shadow' onClick={() => viewDetails(stay._id)}>View Details</button>
                  </div>
                </div>
                {
                  stay.status === 'pending' &&
                  <div className='pending-banner'>
                    <img src={PendingTag} alt="" />
                  </div>
                }
              </div>
            ))
          }
            
          {
            stayRecords.length === 0 &&
            <div className='detail-card py-5'>
              <p className='mb-0 increased'>You have no stay Records yet</p>
            </div>
          }
        </>
      }
    </div>
  </div>
  );
}

export default StayBookingRecords;
