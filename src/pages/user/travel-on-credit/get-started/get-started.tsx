import React from "react";
import travelStarted1 from "../../../../assets/images/travel-started-1.png";
import travelStarted2 from "../../../../assets/images/travel-started-2.png";
import travelStarted3 from "../../../../assets/images/travel-started-3.png";
import travelStarted4 from "../../../../assets/images/travel-started-4.png";

import "./get-started.scss";

const GetStarted = () => {
  return (
    <section className="travel-get-started">
      <div className="travel-get-started-container" data-aos="zoom-out">
        <div className="travel-img-container">
          <img
            src={travelStarted1}
            className="travel-img travel-img-1"
            alt=""
            data-aos="fade-up"
          />
          <img
            src={travelStarted2}
            className="travel-img travel-img-2"
            alt=""
            data-aos="fade-up"
          />
          <img
            src={travelStarted3}
            className="travel-img travel-img-3"
            alt=""
            data-aos="fade-up"
          />
          <img
            src={travelStarted4}
            className="travel-img travel-img-4"
            alt=""
            data-aos="fade-up"
          />
        </div>
        <div className="travel-content" data-aos="fade-up">
          <h2 className="h3b pt-2 pb-2 max350 pb-4">
            Get <span className="purple-tx">Started</span>
          </h2>
          <p>
            Experience the unparalleled convenience and luxury of TravelOnCredit
            today. Contact our dedicated team to discuss your travel needs and
            unlock a world of possibilities without immediate financial
            constraints.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
