import React, { useEffect } from 'react';
import { HomeWhyChooseImage, WhyTravelIconCustomer, WhyTravelIconExpertise, WhyTravelIconInnovation } from '../../../../../assets/images';
import './why-choose.scss';

function WhyChooseSect() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='why-choose'>
      <div className='row holder-1200'>
        <div className='col-md-6 center-info'>
          <div className='imh' data-aos='zoom-out'>
            <img src={HomeWhyChooseImage} alt="" />
          </div>
        </div>
        <div className='col-md-6 center-info'>
          <div>
            <h3>Why Travelers Choose <span className='purple-tx'>Borderless</span></h3>
            
            <div className='reason-card' data-aos='fade-up'>
              <div className='icon-card'>
                <div className='imh'>
                  <img src={WhyTravelIconExpertise} alt="" />
                </div>
              </div>
              <div className=''>
                <h4>Expertise</h4>
                <p>
                  Our team members bring a wealth of experience from various corners of the travel industry. 
                  From seasoned travel agents to tech wizards, our combined expertise is at your service.
                </p>
              </div>
            </div>
            
            <div className='reason-card' data-aos='fade-up'>
              <div className='icon-card'>
                <div className='imh'>
                  <img src={WhyTravelIconCustomer} alt="" />
                </div>
              </div>
              <div className=''>
                <h4>Customer-Centric</h4>
                <p>
                  We are committed to putting our customers first. Our support team is available 24/7, ready to 
                  assist with any travel-related inquiries or concerns you may have.
                </p>
              </div>
            </div>
            
            <div className='reason-card' data-aos='fade-up'>
              <div className='icon-card'>
                <div className='imh'>
                  <img src={WhyTravelIconInnovation} alt="" />
                </div>
              </div>
              <div className=''>
                <h4>Innovation</h4>
                <p>
                  Innovation drives us forward. We are constantly exploring new ways to enhance your travel experience, 
                  from developing user-friendly apps to offering eco-friendly transportation options.
                </p>
              </div>
            </div>
            
            <div className='reason-card' data-aos='fade-up'>
              <div className='icon-card'>
                <div className='imh'>
                  <img src={WhyTravelIconInnovation} alt="" />
                </div>
              </div>
              <div className=''>
                <h4>Diversity</h4>
                <p>
                  Our team is as diverse as the destinations we serve. We come from different backgrounds, cultures, and 
                  regions, allowing us to better understand and cater to the unique needs of travelers worldwide.
                </p>
              </div>
            </div>
            
            <div className='reason-card' data-aos='fade-up'>
              <div className='icon-card'>
                <div className='imh'>
                  <img src={WhyTravelIconInnovation} alt="" />
                </div>
              </div>
              <div className=''>
                <h4>Passion</h4>
                <p>
                  Above all, we share a deep passion for travel. We believe that travel has the power to transform lives, 
                  create lasting memories, and connect people from all walks of life.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseSect;
