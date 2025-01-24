import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { 
  SkyRewardsHeroPlanIcons,
  SkyRewardsHowImg1,
  SkyRewardsHowImg2,
  SkyRewardsHowImg3,
 } from '../../../assets/images';
 import { ISkyRewardsFaqList, skyRewardsFaqList } from './sky-rewards-data';
import './sky-rewards.scss';
import WhySkyRewardsSect from './why-sky-rewards/why-sky-rewards';

function SkyRewardsPage() {

  const [skyFaqList, setSkyFaqList] = useState<ISkyRewardsFaqList[]>(skyRewardsFaqList);

  const toggleQuestionOpen = (index: number) => {
    const newFaqList = skyFaqList.map((item, qIndex) => {
      if(index === qIndex) item.opened = !item.opened;
      return item;
    });
    setSkyFaqList(newFaqList);
  }

  useEffect(() => {
    // window.scrollTo(0, 0);
  });
  
  return (
    <div className='sky-rewards'>
      <div className='banner'>
        <div className='text-sect'>
          <div className='plane-img-holder'>
            <img src={SkyRewardsHeroPlanIcons} alt="" />
          </div>
          <div className='text-holder' data-aos='fade-up'>
            <h1 className='purple-tx h1b2'>SkyRewards</h1>
            <h2 className='blue-tx f700'>Elevate Your Travel Experience</h2>
            <p className=' f600 pt-4'>
              Welcome to SkyRewards, our way of saying thank you for choosing Borderless  as your trusted 
              travel partner. We believe that your loyalty deserves to be rewarded, and that's why we've 
              introduced SkyRewards - a program designed to make your travel experiences even more enjoyable.
            </p>
          </div>
        </div>
      </div>
      <WhySkyRewardsSect/>
      <div className='works-sect'>
        <h6 className='f700 text-center orange-tx'>Getting started with SkyRewards is a breeze:</h6>
        <h1 className='f700 text-center'>How It <span className='purple-tx'>Works</span></h1>
        <div className='row'>
          <div className='col-lg-4 col-md-6' data-aos='zoom-out'>
            <div className='works-card'>
              <div className='bg-card'></div>
              <div className='main-card'>
                <div className='imh'>
                  <img src={SkyRewardsHowImg1} alt="" />
                </div>
                <h5>Book with Borderless</h5>
                <p>
                  Every time you book a flight or hotel on our platform, you'll automatically 
                  earn SkyRewards points. No extra steps needed.
                </p>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-6' data-aos='zoom-out' data-aos-delay='300'>
            <div className='works-card'>
              <div className='bg-card'></div>
              <div className='main-card'>
                <div className='imh'>
                  <img src={SkyRewardsHowImg2} alt="" />
                </div>
                <h5>Accumulate Points</h5>
                <p>
                  Watch your SkyRewards points accumulate with each booking. The more you travel, the more you earn.
                </p>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-12' data-aos='zoom-out' data-aos-delay='600'>
            <div className='works-card'>
              <div className='bg-card'></div>
              <div className='main-card'>
                <div className='imh'>
                  <img src={SkyRewardsHowImg3} alt="" />
                </div>
                <h5>Redeem Your Rewards</h5>
                <p>
                  When you're ready, you can use your points to save on your next adventure. Simply apply 
                  your points during the booking process.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='pt-4 w96 max1000'>
          <h3 className='relative h3b pb-3'>Join  <span className='orange-tx'>Sky</span><span className='purple-tx'>Rewards</span> Today</h3>
          <p className='increased'>
            Elevate your travel experience with SkyRewards. Whether you're a frequent flyer or an occasional 
            traveler, SkyRewards is designed to add value to every journey you take with us.
            <br /><br />
            Ready to start earning rewards? Begin your SkyRewards journey today by booking your next flight 
            or hotel on Borderless . Your loyalty deserves to be celebrated, and we're excited to reward you 
            for choosing Borderless  as your travel companion.
          </p>
        </div>
      </div>
      <div className='explore-grid'>
        <div className='explore-nature'>
          <h6>Promotion</h6>
          <h1>Explore Nature</h1>
          <button>Sign Up</button>
        </div>
        <div className='explore-cities'>
          <h6>Promotion</h6>
          <h1>Explore Cities</h1>
          <button>Join Loyalty Program</button>
        </div>
      </div>
      <div className='faq-sect'>
        <div className='faq-card'>
          <h3 className='relative h3b pb-3 text-center'><span className='white-tx'>Frequently asked </span>  <span className='orange-tx'> questions</span></h3>
          <div className='faq-questions'>
            {skyFaqList.map((item, index) => (
              <div className='question' key={index}>
                <div className='spread-info clickable' onClick={() => toggleQuestionOpen(index)}>
                  <h6 className=''>{item.question}</h6>
                  <FontAwesomeIcon className={item.opened ? 'icon rotated' : 'icon'} icon={'plus'} />
                </div>
                <div className={item.opened ? 'answer' : 'flat-answer'}>
                  <p className='mb-0'>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='subscription-card'>
            <div className='row'>
              <div className='col-lg-6 center-info'>
                <div className='w96 py-2'>
                  <h4 className='f700'>Are you looking for a Shortlet ?</h4>
                  <p className='mb-0 reduced-soft'>Let's look at some ways to narrow down your search for your stays.</p>
                </div>
              </div>
              <div className='col-lg-6 center-info'>
                <div className='w96 py-2'>
                  <div className='subscribe-grid'>
                    <input
                      type="text"
                      placeholder='Enter your email.'
                    />
                    <button>Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkyRewardsPage;
