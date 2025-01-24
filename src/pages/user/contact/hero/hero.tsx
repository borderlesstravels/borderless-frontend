import React from 'react';
import { useNavigate } from 'react-router';
import { DownloadAppstoreHero, DownloadPlaystoreHero, HomeHeroImage, HomePlanePath } from '../../../../assets/images';
import { ContactBannerImg } from '../../../../assets/images';
import './hero.scss';

function HeroSect() {
  
  return (
    <div className='contact-hero'>
      <div className='holder-1100 hero-spread'>
        <div className='text-sect' data-aos='fade-right'>
          <div className='w100' data-aos="fade-right">
            <h1>Connect with <span className='orange-tx'>us</span></h1>
            <p>
              For further questions, including partnership opportunities, 
              please contact us using our contact form.
            </p>
          </div>
        </div>
        <div className='img-sect' data-aos='zoom-out' data-aos-delay='800'>
          <img src={ContactBannerImg} alt="" />
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default HeroSect;
