import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import {
  HomeBookHotelDots,
  HomeHotel1,
  HomeHotel2,
} from "../../../../../assets/images";
import { Carousel } from "../../../../../components/block-components/carousel";
import { destinationData } from "./destination-data";
import "./destinations.scss";

function DestinationsSect() {
  const previewCount = () => {
    const width = window.innerWidth;
    if (width > 1200) {
      return 5;
    } else if (width > 950) {
      return 4;
    } else if (width > 767) {
      return 3;
    } else if (width > 550) {
      return 2;
    } else {
      return 1;
    }
  };

  const destinationCarousel = destinationData.map((data, index) => {
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
          <div className="text-sect">
            <h6>{data.location}</h6>
            <p className="mt-2">
              <FontAwesomeIcon
                className="icon purple-tx"
                icon={"map-marker-alt"}
              />{" "}
              {data.country}
            </p>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <div className="destinations">
        <div>
          <h3 className="h3b text-center">
            Popular <span className="purple-tx"> Destinations</span>
          </h3>
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
              pagination={true}
              customPagination={true}
            />
          </div>
        </div>
      </div>
      <div className="book-hotel">
        <div className="hotel-case">
          <div className="bg-curve"></div>
          <div className="holder-1100">
            <h3 className="relative h3b">
              Book <span className="orange-tx"> Hotels</span>
            </h3>
            <div className="row pt-4">
              <div className="col-lg-3 col-sm-6 px-0">
                <div className="deal-case">
                  <div
                    className="deal-card"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  >
                    <div className="img-sect">
                      <div className="imh">
                        <img src={HomeHotel1} alt="" />
                      </div>
                    </div>
                    <div className="text-sect">
                      <h6>Lakeside Motel Warefront</h6>
                      <p className="mt-1">2246 properties</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 px-0">
                <div className="deal-case">
                  <div
                    className="deal-card"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                  >
                    <div className="img-sect">
                      <div className="imh">
                        <img src={HomeHotel2} alt="" />
                      </div>
                    </div>
                    <div className="text-sect">
                      <h6>Lakeside Motel Warefront</h6>
                      <p className="mt-1">2246 properties</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 px-0">
                <div className="deal-case">
                  <div
                    className="deal-card"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                  >
                    <div className="img-sect">
                      <div className="imh">
                        <img src={HomeHotel1} alt="" />
                      </div>
                    </div>
                    <div className="text-sect">
                      <h6>Lakeside Motel Warefront</h6>
                      <p className="mt-1">2246 properties</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 px-0">
                <div className="deal-case">
                  <div
                    className="deal-card"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  >
                    <div className="img-sect">
                      <div className="imh">
                        <img src={HomeHotel1} alt="" />
                      </div>
                    </div>
                    <div className="text-sect">
                      <h6>Lakeside Motel Warefront</h6>
                      <p className="mt-1">2246 properties</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='holder-1200 relative'>
            <div className='floating-dots'>
              <img src={HomeBookHotelDots} alt="" />
            </div>
          </div> */}
        </div>
        <div className="holder-1200 relative text-right">
          <div className="placed-dots">
            <img src={HomeBookHotelDots} alt="" />
          </div>
          <div className="holder-1100 explore">
            <button>Explore More</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DestinationsSect;
