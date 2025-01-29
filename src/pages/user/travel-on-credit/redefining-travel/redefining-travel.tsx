import React from "react";
import redefiningTravelBg from "../../../../assets/images/redefining-travel-bg.png";

import "./redefining-travel.scss";

const RefiningTravel = () => {
  return (
    <section className="redefining-travel">
      <div className="redefining-travel-container">
        <div data-aos="fade-right">
          <img src={redefiningTravelBg} alt="" className="travel-img" />
        </div>
        <div className="content" data-aos="fade-up">
          <div className="content-div">
            <h2 className="h3b orange-tx">
              <span className="blue-tx">Join Us in</span> Redefining Travel
            </h2>
            <p className="faint-tx grey-text f600">
              At Borderless Travels, we believe that travel should not be
              limited by financial boundaries. Join us in reshaping the way you
              explore the world, providing you the freedom to travel on your
              terms.
            </p>
            <p className="f700 blue-text">
              Contact us today to begin your journey with TravelOnCredit. Fill
              the form below and our dedicated support team will set up a call
              with your organization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefiningTravel;
