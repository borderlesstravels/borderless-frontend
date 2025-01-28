import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AboutBgCurve,
  AboutJoinJourney,
  AboutWhyChooseImage,
  AboutWhyChooseShell,
} from "../../../assets/images";
import { Path } from "../../../navigations/routes";
import "./about.scss";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  TWITTER_URL,
  YOUTUBE_URL,
} from "../../../constants/socialLinks";

function AboutPage() {
  useEffect(() => {
    // window.scrollTo(0, 0);
  });

  return (
    <div className="about">
      <div className="banner">
        <div className="bg-curve">
          <img src={AboutBgCurve} alt="" />
        </div>
        <div className="w90 max1000 pb-5">
          <h6>READ</h6>
          <h1 data-aos="zoom-in">About Us</h1>
          <p
            className="increased f500 py-4"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <span>Welcome to Borderless</span> , your gateway to the world of
            seamless travel experiences across the African continent and beyond.
            We are more than just a flight booking platform; we are your trusted
            travel companion, dedicated to making your journey as effortless and
            enjoyable as possible.
          </p>
          <p
            className="social f700 reduced"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Find us on
          </p>
          <div
            className="spread-info w96 max150 pb-2"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <a href={FACEBOOK_URL} target={"_blank"}>
              <FontAwesomeIcon className="awesome" icon={["fab", "facebook"]} />
            </a>
            <a href={INSTAGRAM_URL} target={"_blank"}>
              <FontAwesomeIcon
                className="awesome"
                icon={["fab", "instagram"]}
              />
            </a>
            <a href={TWITTER_URL} target={"_blank"}>
              <FontAwesomeIcon className="awesome" icon={["fab", "twitter"]} />
            </a>
            <a href={YOUTUBE_URL} target={"_blank"}>
              <FontAwesomeIcon className="awesome" icon={["fab", "youtube"]} />
            </a>
          </div>
        </div>
      </div>

      <div className="">
        <div className="w90 pt-4">
          <h3 className="text-center h3b">
            Why Choose <span className="orange-tx"> Borderless ?</span>
          </h3>
        </div>
        <div className="why-greed">
          <div>
            <div
              className="imh w96 max350"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <img src={AboutWhyChooseImage} alt="" />
            </div>
          </div>
          <div className="text-sect">
            <p className="orange-tx reduced-soft f700">Here’s why</p>
            <p className="faint-tx increased pb-5 f500">
              At Borderless , we understand that travel is not just about
              reaching your destination; it's about the memories you create
              along the way.
            </p>
            <h6 className="blue-tx f700 increased">
              Here's why you should make us your preferred travel partner:
            </h6>
          </div>
          <div className="imh shell" data-aos="flip-right" data-aos-delay="500">
            <img src={AboutWhyChooseShell} alt="" />
          </div>
        </div>
      </div>

      <div className="reasons">
        <div className="rope-bg">
          <h6 className="">
            <span className="purple-tx">1. Extensive </span>
            <span className="orange-tx"> Global Reach:</span>
          </h6>
          <p>
            Borderless  provides access to an extensive network of flights and
            hotels, connecting you to destinations across the globe. Whether
            you're planning a business trip, family vacation, or romantic
            getaway, we've got you covered.
          </p>
          <h6 className="">
            <span className="purple-tx">2. Unmatched </span>
            <span className="orange-tx"> Convenience:</span>
          </h6>
          <p>
            Our user-friendly web app and mobile apps for iOS and Android offer
            a seamless booking experience. You can plan your entire trip from
            the comfort of your home or on the go, with just a few taps.
          </p>
          <h6 className="">
            <span className="purple-tx">3. Local Expertise, </span>
            <span className="orange-tx"> Global Service:</span>
          </h6>
          <p>
            Borderless 's journey begins in Africa, with offices in Nigeria,
            Ghana, Kenya, and Rwanda. We have an in-depth understanding of the
            African travel landscape, allowing us to cater to the unique needs
            of travelers in the region.
          </p>
          <h6 className="">
            <span className="purple-tx">4. Personalized </span>
            <span className="orange-tx"> Support:</span>
          </h6>
          <p>
            We are committed to providing 24/7 email and phone support to assist
            you with any travel-related inquiries or issues. Your peace of mind
            is our priority.
          </p>
          <h6 className="">
            <span className="purple-tx">5. Eco-Friendly </span>
            <span className="orange-tx"> Travel:</span>
          </h6>
          <p>
            As part of our commitment to sustainable travel, Borderless  offers
            the option to book airport transfers using our battery electric
            vehicles, contributing to a greener planet.
          </p>
        </div>
      </div>
      <div className="w90 max1200 py-5">
        <div className="row">
          <div className="col-md-6 center-info">
            <div className="w96 max450 imh">
              <h6 className="reduced orange-tx">
                Thank you for choosing Borderless
              </h6>
              <h3 className="h3b">
                Join Us on Your <span className="orange-tx"> Journey:</span>
              </h3>
              <p>
                Borderless  is not just a platform; it's a community of
                travelers, adventurers, and dreamers. We invite you to embark on
                your next adventure with us. Whether you're chasing sunsets on
                the savannas of Africa, exploring the historic streets of
                Europe, or relaxing on a pristine beach in the Caribbean,
                Borderless  is here to turn your travel dreams into reality.
              </p>
              <div className="info-grid max350">
                <Link to={`/${Path.about}`}>
                  <button className="orange-button">Start Exploring</button>
                </Link>
                <Link to={`/${Path.about}`}>
                  <button className="purple-button">Loyalty Program</button>
                </Link>
              </div>
            </div>
            <div></div>
          </div>
          <div className="col-md-6 center-info">
            <div
              className="w96 max550 imh"
              data-aos="zoom-out"
              data-aos-delay="300"
            >
              <img src={AboutJoinJourney} alt="" />
              <h6 className="text-center increased pt-4 f700">
                <span className="blue-tx">‘’ Your journey, </span>
                <span className="orange-tx"> our commitment </span>
                <span className="blue-tx">’’</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
