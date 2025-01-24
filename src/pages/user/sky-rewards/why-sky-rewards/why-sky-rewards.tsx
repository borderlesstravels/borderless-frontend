import React, { } from 'react';
import { SkyRewardsWhyImg1, SkyRewardsWhyImg2 } from '../../../../assets/images';
import './why-sky-rewards.scss';

function WhySkyRewardsSect() {
  
  return (
    <div className='why-sky-rewards'>
      <div className='row holder-1200'>
        <div className='col-md-6 center-info-col'>
          <div className='imh' data-aos='zoom-out'>
            <img src={SkyRewardsWhyImg1} alt="" />
          </div>
          <div className='imh' data-aos='zoom-out'>
            <img src={SkyRewardsWhyImg2} alt="" />
          </div>
        </div>
        <div className='col-md-6 center-info'>
          <div>
            <h3 className='f700'>Why Sky <span className='purple-tx'>Rewards</span></h3>
            <p className='increased-soft'>
              At Borderless , we value your loyalty, and we want to show our appreciation in a meaningful way. 
              With SkyRewards, you can unlock a world of benefits and earn exciting rewards as you explore the globe.
            </p>
            <p className='increased f500'>Here's what makes SkyRewards special:</p>
            
            <div className='reason-card' data-aos='fade-up'>
              <div className='number-card'><h1>1</h1></div>
              <div className=''>
                <h4>Earn Rewards with Every Booking</h4>
                <p>
                  Every time you book a flight or hotel through Borderless , you'll earn SkyRewards points. The 
                  more you book, the more you earn.
                </p>
              </div>
            </div>
            
            <div className='reason-card' data-aos='fade-up'>
              <div className='number-card'><h1>2</h1></div>
              <div className=''>
                <h4>Exclusive Member Benefits</h4>
                <p>
                  SkyRewards members get access to exclusive offers, discounts, and promotions. Enjoy special 
                  perks designed to enhance your travel experience.
                </p>
              </div>
            </div>
            
            <div className='reason-card' data-aos='fade-up'>
              <div className='number-card'><h1>3</h1></div>
              <div className=''>
                <h4>Flexible Redemption</h4>
                <p>
                  Use your accumulated SkyRewards points to offset the cost of future flights or hotel 
                  stays. Your rewards, your choices.
                </p>
              </div>
            </div>
            
            <div className='reason-card' data-aos='fade-up'>
              <div className='number-card'><h1>4</h1></div>
              <div className=''>
                <h4>Priority Customer Support</h4>
                <p>
                  As a SkyRewards member, you'll receive priority customer support to assist you with any 
                  travel-related inquiries or issues.
                </p>
              </div>
            </div>
            
            <div className='reason-card' data-aos='fade-up'>
              <div className='number-card'><h1>5</h1></div>
              <div className=''>
                <h4>Easy Enrollment</h4>
                <p>
                  Joining SkyRewards is easy and free. All Borderless  customers are eligible to become members.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default WhySkyRewardsSect;
