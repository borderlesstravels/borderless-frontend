import React from "react";
import experienceBg1 from "../../../../assets/images/travel-credit-experience-1.png";
import experienceBg2 from "../../../../assets/images/travel-credit-experience-2.png";

import "./experience-travel.scss";

const ExperienceTravel = () => {
  return (
    <section className="experience-travel">
      <div className="content-1" data-aos="fade-right">
        <img src={experienceBg1} alt="" />
      </div>
      <div className="content-2">
        <div
          className="content-2-img-div"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          <img src={experienceBg2} alt="" />
        </div>
        <div className="content-data" data-aos="fade-up">
          <h2 className="h3b purple-tx">
            <span className="blue-tx">Experience</span> Travel Differently
          </h2>
          <p className="faint-tx f600 pt-4 description">
            Embark on a journey where the destination is yours to choose, and
            the payment schedule is yours to determine. Whether it's a business
            trip, a luxurious getaway, or a series of corporate travels,
            TravelOnCredit is here to elevate your travel experience while
            granting you the financial flexibility you deserve.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTravel;
