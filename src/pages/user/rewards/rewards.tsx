import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { formatDate } from '../../../services/utils/data-manipulation-utilits';
import BannerSect from './hero/banner';
import { dummyRewardList } from './rewards-data';
import './rewards.scss';

function RewardsPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='rewards'>
      <BannerSect/>
      <div className='w90 max1100 py-5'>
        <div className='row'>
          {
            dummyRewardList.map((reward, index) => (
              <div className='col-md-6 col-lg-4' key={index}>
                <div className='reward-card' data-aos="fade-up" data-aos-delay={(index % 3) * 300}>
                  <h3 className='number-bold'>20% OFF</h3>
                  <h6 className='blue-tx number-medium reduced-soft'>FOR WHOLE ORDER</h6>
                  <h6 className='blue-tx number-bold reduced'>50 points</h6>
                  <button className='reward-button'>GET REWARD</button>
                  {
                    reward.deadline &&
                    <div className='flash-deal'>
                      <span className='f600'><FontAwesomeIcon icon={'bolt'} /> Flash Deals</span>
                      <span className='number-medium'>Ends {formatDate(reward.deadline)}</span>
                    </div>
                  }
                  <ul>
                    {reward.details.map((detail, detailIndex) => <li key={detailIndex}>{detail}</li>)}
                  </ul>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default RewardsPage;
