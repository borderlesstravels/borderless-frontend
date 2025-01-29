import React, { useEffect } from "react";
import Banner from "./banner/banner";
import HowItWorks from "./how-it-works/how-it-works";
import ExperienceTravel from "./experience-travel/experience-travel";
import RefiningTravel from "./redefining-travel/redefining-travel";
import TravelBooking from "./travel-booking/travel-booking";
import GetStarted from "./get-started/get-started";
import WhyTravel from "./why-travel/why-travel";

import "./travel-on-credit.scss";

function TravelOnCreditPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="travel-on-credit">
      <Banner />
      <WhyTravel />
      <ExperienceTravel />
      <HowItWorks />
      <GetStarted />
      <RefiningTravel />
      <TravelBooking />
    </div>
  );
}

export default TravelOnCreditPage;
