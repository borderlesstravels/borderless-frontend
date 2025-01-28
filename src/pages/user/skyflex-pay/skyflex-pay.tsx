import React, { useEffect } from "react";
import {
  SkyflexBannerDecore,
  SkyflexBannerTraveller,
  SkyflexBggPlane,
  SkyflexDreamTripBigImg,
  SkyflexDreamTripImg1,
  SkyflexDreamTripImg2,
  SkyflexDreamTripImg3,
  SkyflexDreamTripImg4,
  SkyflexHolidayBand,
  SkyflexHowItWorks,
  SkyflexWhatIs,
  SkyflexWhyChoose,
  SkyflexWhyChooseMobile,
  SkyflexWorksIcon1,
  SkyflexWorksIcon2,
  SkyflexWorksIcon3,
  SkyflexWorksIcon4,
} from "../../../assets/images";
import { Carousel } from "../../../components/block-components/carousel";
import "./skyflex-pay.scss";

function SkyflexPayPage() {
  const skyflexDreamTripData = [
    { image: SkyflexDreamTripImg1 },
    { image: SkyflexDreamTripImg2 },
    { image: SkyflexDreamTripImg3 },
    { image: SkyflexDreamTripImg4 },
  ];

  const previewCount = () => {
    const width = window.innerWidth;
    if (width > 767) {
      return 4;
    } else {
      return 3;
    }
  };

  const destinationCarousel = skyflexDreamTripData.map((data, index) => {
    return (
      <div className="deal-case" key={index}>
        <div
          className="deal-card"
          data-aos="zoom-in"
          data-aos-delay={(index % 5) * 200 + 100}
        >
          <div className="img-sect">
            <div className="imh">
              <img src={data.image} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    // window.scrollTo(0, 0);
  });

  return (
    <div className="skyflex-pay">
      <div className="banner">
        <div className="text-sect">
          <div className="text-holder" data-aos="fade-up">
            <h6 className="orange-tx capitalize increased f700">
              Your Path to Stress-Free Travel
            </h6>
            <h1 className="blue-tx h1b2">Introducing SkyFlex Pay</h1>
            <p className="faint-tx f600 pt-4">
              At Borderless , we understand that planning a trip can sometimes
              be financially challenging. We believe that everyone deserves the
              opportunity to explore the world, and that's why we're thrilled to
              introduce FlightFlex Pay, a game-changer in the travel industry.
            </p>
          </div>
        </div>
        <div className="img-sect">
          <div className="bg-holder">
            <img src={SkyflexBannerDecore} alt="" />
          </div>
          <div className="gradient-holder"></div>
          <div className="banner-img" data-aos="zoom-in" data-aos-delay="400">
            <img src={SkyflexBannerTraveller} alt="" />
          </div>
        </div>
      </div>
      <div className="w96 max1200 what-is">
        <div className="row py-5">
          <div className="col-md-6 center-info">
            <div className="w90">
              <h6 className="orange-tx f700">Know More</h6>
              <h3 className="h3b">
                What is <span className="purple-tx">SkyFlex</span> Pay?
              </h3>
              <p className="mobile-close">
                SkyFlex Pay is your passport to affordable travel. It's a
                revolutionary service that allows you to book your flights and
                pay for them in convenient installments leading up to your
                travel date. We believe in giving you the freedom to plan your
                dream trip without breaking the bank.
              </p>
            </div>
          </div>
          <div className="col-md-6 center-info">
            <div className="imh w96" data-aos="zoom-out">
              <img src={SkyflexWhatIs} alt="" />
            </div>
          </div>
          <div className="col-md-6 center-info mobile-open">
            <div className="w90">
              <p className="">
                SkyFlex Pay is your passport to affordable travel. It's a
                revolutionary service that allows you to book your flights and
                pay for them in convenient installments leading up to your
                travel date. We believe in giving you the freedom to plan your
                dream trip without breaking the bank.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="band">
        <div className="w90 max800">
          <h1>Let’s make your next holiday amazing</h1>
        </div>
      </div>
      <div className="why-choose py-5">
        <h3 className="h3b pt-5 pb-4 text-center">
          Why Choose <span className="orange-tx">SkyFlex</span> Pay?
        </h3>
        <div className="imh m-open-md w80 max450 pb-4" data-aos="zoom-in">
          <img
            src={SkyflexWhyChooseMobile}
            alt=""
            className="shadowed rad-15"
          />
        </div>
        <div className="w90 max1200 choose-grid">
          <div className="row">
            <div className="col-sm-6 choose-card">
              <div className="description-grid-40">
                <div className="number">1</div>
                <h6 className="purple-tx">Budget-Friendly</h6>
              </div>
              <p>
                With FlightFlex Pay, you can secure your flights with a small
                initial deposit and spread the remaining cost over time. Say
                goodbye to the stress of lump-sum payments.
              </p>
            </div>
            <div className="col-sm-6 choose-card">
              <div className="description-grid-40">
                <div className="number">2</div>
                <h6 className="purple-tx">Flexible Terms</h6>
              </div>
              <p>
                You choose the installment plan that suits your financial
                situation. Whether you prefer weekly, bi-weekly, or monthly
                payments, we've got you covered.
              </p>
            </div>
            <div className="col-sm-6 choose-card">
              <div className="description-grid-40">
                <div className="number">3</div>
                <h6 className="purple-tx">No Hidden Fees</h6>
              </div>
              <p>
                At Borderless , transparency is key. We don't charge any hidden
                fees or interest. What you see is what you pay.
              </p>
            </div>
            <div className="col-sm-6 choose-card">
              <div className="description-grid-40">
                <div className="number">4</div>
                <h6 className="purple-tx">Peace of Mind</h6>
              </div>
              <p>
                Rest easy knowing your flights are booked and paid for well in
                advance. No last-minute surprises or worries about availability.
              </p>
            </div>
          </div>
          <div className="side-img m-close-md" data-aos="zoom-in">
            <img src={SkyflexWhyChoose} alt="" />
          </div>
        </div>
      </div>

      <hr className="w90 my-0 py-0" />

      <div className="how-it-works py-5">
        <div className="imh m-open-md w90 max450 pb-4" data-aos="zoom-out">
          <img src={SkyflexHowItWorks} alt="" className="" />
        </div>
        <div className="w90 max1100 choose-grid">
          <div className="">
            <h6 className="orange-tx f700">
              Book your next trip in 4 easy steps
            </h6>
            <h3 className="h3b pt-2 pb-2 max350 pb-4">
              How <span className="purple-tx">SkyFlex</span> Pay Works
            </h3>
            <div className="description-grid-50 py-3">
              <div className="imh pt-3">
                <img src={SkyflexWorksIcon1} alt="" />
              </div>
              <div className="faint-tx faint">
                <h6 className="mb-1 f700">Book Your Flight</h6>
                <p className="mb-0 f500">
                  Find your ideal flight on our platform, and select "FlightFlex
                  Pay" as your payment option during checkout.
                </p>
              </div>
            </div>
            <div className="description-grid-50 py-3">
              <div className="imh pt-3">
                <img src={SkyflexWorksIcon2} alt="" />
              </div>
              <div className="faint-tx faint">
                <h6 className="mb-1 f700">Choose Your Plan</h6>
                <p className="mb-0 f500">
                  Customize your payment plan by selecting the frequency and
                  number of installments that suit your budget.
                </p>
              </div>
            </div>
            <div className="description-grid-50 py-3">
              <div className="imh pt-3">
                <img src={SkyflexWorksIcon3} alt="" />
              </div>
              <div className="faint-tx faint">
                <h6 className="mb-1 f700">Secure Your Booking</h6>
                <p className="mb-0 f500">
                  Pay a small initial deposit to secure your reservation. Your
                  flight is locked in!
                </p>
              </div>
            </div>
            <div className="description-grid-50 py-3">
              <div className="imh pt-3">
                <img src={SkyflexWorksIcon4} alt="" />
              </div>
              <div className="faint-tx faint">
                <h6 className="mb-1 f700">Enjoy Stress-Free Travel</h6>
                <p className="mb-0 f500">
                  With your flights paid for, you can focus on planning the rest
                  of your trip. We'll send you reminders for upcoming payments,
                  so you never miss a beat.
                </p>
              </div>
            </div>
          </div>
          <div className="side-img m-close-md" data-aos="zoom-out">
            <img src={SkyflexHowItWorks} alt="" />
          </div>
        </div>
      </div>

      <div className="dream-trip py-5">
        <div className="dream-space py-5">
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="max700">
                <h6 className="orange-tx f800 reduced-soft capitalize">
                  Ready to book your next adventure?{" "}
                </h6>
                <h3 className="h3b pt-52pb-4">
                  Your Dream Trip, <span className="purple-tx">Your Way</span>
                </h3>
                <p>
                  SkyFlex Pay is all about making travel accessible to everyone.
                  Whether you're planning a family vacation, a solo adventure,
                  or a romantic getaway, we're here to make your dreams take
                  flight. No more waiting for the perfect time; now is the
                  perfect time to start planning your next adventure.
                </p>
                <p className="f600">
                  So why wait? Start exploring the world on your terms with
                  FlightFlex Pay by Borderless . Your journey begins with us,
                  one stress-free payment at a time.
                </p>
                <h6 className="orange-tx f700 capitalize">
                  Get started{" "}
                  <span className="purple-tx"> with SkyFlex Pay today!</span>
                </h6>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5">
              <div
                className="imh w96 max450 pb-4 pt-5 w80-m"
                data-aos="fade-in"
              >
                <img
                  src={SkyflexDreamTripBigImg}
                  alt=""
                  className="dream-big-img"
                />
              </div>
            </div>
          </div>
          <div className="destination-slide-case">
            <div className="side-margin">
              <Carousel
                loop
                autoPlay
                delay={6000}
                freeMode
                slidesPerView={previewCount()}
                spaceBetween={0}
                data={destinationCarousel}
                navigation={false}
                pagination={false}
                customPagination={true}
              />
            </div>
          </div>
        </div>
        <div className="relative max900 py-4 text-center">
          <button className="">Pick a destination</button>
        </div>
      </div>
    </div>
  );
}

export default SkyflexPayPage;
