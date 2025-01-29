import React from "react";
import travelWhy1 from "../../../../assets/images/travel-why-1.png";
import travelWhy2 from "../../../../assets/images/travel-why-2.png";
import travelWhy3 from "../../../../assets/images/travel-why-3.png";
import travelWhy4 from "../../../../assets/images/travel-why-4.png";
import travelWhyIcon1 from "../../../../assets/images/travel-why-icon-1.png";
import travelWhyIcon2 from "../../../../assets/images/travel-why-icon-2.png";
import travelWhyIcon3 from "../../../../assets/images/travel-why-icon-3.png";

import "./why-travel.scss";

const WhyTravel = () => {
  return (
    <section className="travel-why-travel">
      <h2 className="h3b pt-2 pb-2 travel-header pb-4" data-aos="fade-up">
        Why
        <span className="orange-tx">TravelOnCredit?</span>
      </h2>
      <div className="travel-container">
        <div className="travel-grid-1">
          <div className="grid-item" data-aos="fade-up">
            <img src={travelWhy1} alt="" />
          </div>
          <div
            className="grid-span-row grid-item"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="grid-item-header">
              <span>Tailored for You</span>
              <img alt="" src={travelWhyIcon1} />
            </h3>
            <p>
              We understand the unique demands of high net worth individuals and
              corporate entities. Our service is curated to match your
              distinctive preferences and requirements, ensuring a bespoke
              travel experience that aligns with your expectations.
            </p>
          </div>
          <div
            className="grid-span-column grid-item"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div>
              <h3 className="grid-item-header">
                <span>Flexibility, Elevated</span>
                <img alt="" src={travelWhyIcon2} />
              </h3>
              <p>
                Embrace the freedom to travel at your pace. With TravelOnCredit,
                you can book your flights, accommodations, and experiences
                without immediate payment, allowing you to prioritize your cash
                flow without compromising your travel plans.
              </p>
            </div>
          </div>
          <div className="grid-item" data-aos="fade-up" data-aos-delay="300">
            <img src={travelWhy2} alt="" />
          </div>
          <div className="grid-item" data-aos="fade-up" data-aos-delay="400">
            <img src={travelWhy3} alt="" />
          </div>
        </div>
        <div className="travel-grid-2">
          <div className="purple-bg" data-aos="zoom-out" />
          <div className="grid-span-column" data-aos="zoom-out">
            <h3 className="grid-item-header">
              <span>Streamlined Process</span>
              <img alt="" src={travelWhyIcon3} />
            </h3>
            <p>
              Simplifying the way you travel and pay, TravelOnCredit streamlines
              the payment process, granting you the ease of settling your travel
              expenses at a time that best suits your financial calendar.
            </p>
          </div>
          <div className="grid-item" data-aos="fade-up" data-aos-delay="300">
            <img src={travelWhy4} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTravel;
