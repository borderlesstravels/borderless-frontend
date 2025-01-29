import React from "react";
import bannerCapsule from "../../../../assets/images/travel-credit-capsules.png";
import travelBanner1 from "../../../../assets/images/travel-credit-banner-1.png";
import travelBanner2 from "../../../../assets/images/travel-credit-banner-2.png";

import "./banner.scss";

const Banner = () => {
  const handleTravelRequest = () => {
    document
      .getElementById("summary-card")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="travel-credit-banner">
      <div className="img-sect">
        <div className="banner-1" data-aos="zoom-out">
          <img src={travelBanner1} alt="" />
        </div>
        <div className="banner-2" data-aos="fade-left" data-aos-delay="200">
          <img src={travelBanner2} alt="" />
        </div>
      </div>
      <div className="text-sect">
        <div className="text-holder" data-aos="fade-up">
          <h1 className="blue-tx main-header h1b2">
            <div className="main-header-div">
              <div className="capsule-div">
                <div className="h1b2">Travel On</div>
                <img src={bannerCapsule} alt="" className="capsule-img" />
              </div>
              <div className="purple-tx credit-text h1b2">Credit</div>
            </div>
          </h1>
          <p className="faint-tx f600 pt-4 description">
            Through the TravelOnCredit service, we are redefining the way high
            net worth individuals and esteemed corporate organizations
            experience travel. Our tailored service empowers you to traverse the
            globe with unparalleled flexibility, offering a seamless and
            personalized journey while deferring the payment to suit your
            financial convenience.
          </p>
          <div className="travel-button-div">
            <button className="travel-button" onClick={handleTravelRequest}>
              Submit Travel Request
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
