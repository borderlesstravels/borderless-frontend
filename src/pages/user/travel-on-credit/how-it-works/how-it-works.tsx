import React from "react";
import howItWorksBg from "../../../../assets/images/travel-credit-how-it-works-bg.png";
import howItWorks1 from "../../../../assets/images/travel-credit-work-1.png";
import howItWorks2 from "../../../../assets/images/travel-credit-work-2.png";
import howItWorks3 from "../../../../assets/images/travel-credit-work-3.png";

import "./how-it-works.scss";

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="imh m-open-md w90 max450 pb-4" data-aos="zoom-out">
        <img src={howItWorksBg} alt="" className="" />
      </div>
      <div className="w90 max1100 choose-grid">
        <div className="">
          <h3 className="h3b pt-2 pb-2 max350 pb-4" data-aos="fade-up">
            How It <span className="orange-tx">Works</span>
          </h3>
          <div
            className="description-grid-50 py-3"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="imh pt-3">
              <img src={howItWorks1} alt="" />
            </div>
            <div className="faint-tx faint">
              <h6 className="mb-1 f700">Book Your Travel</h6>
              <p className="mb-0 f500">
                Select your destinations, flights, accommodations, and
                experiences just like any other travel service.
              </p>
            </div>
          </div>
          <div
            className="description-grid-50 py-3"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="imh pt-3">
              <img src={howItWorks2} alt="" />
            </div>
            <div className="faint-tx faint">
              <h6 className="mb-1 f700">Enjoy Your Journey</h6>
              <p className="mb-0 f500">
                Travel stress-free, knowing that your expenses are being managed
                conveniently through TravelOnCredit.
              </p>
            </div>
          </div>
          <div
            className="description-grid-50 py-3"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="imh pt-3">
              <img src={howItWorks3} alt="" />
            </div>
            <div className="faint-tx faint">
              <h6 className="mb-1 f700">Deferred Payment</h6>
              <p className="mb-0 f500">
                Settle your travel expenses at a later date that aligns with
                your cash flow, allowing you to prioritize your financial
                commitments without compromising your travel plans.
              </p>
            </div>
          </div>
        </div>
        <div className="side-img m-close-md" data-aos="zoom-out">
          <img src={howItWorksBg} alt="" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
