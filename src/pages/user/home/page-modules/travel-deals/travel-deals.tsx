import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "../../../../../components/block-components/carousel";
import { Path } from "../../../../../navigations/routes";
import { formatNumber } from "../../../../../services/utils/data-manipulation-utilits";
import { sendRequest } from "../../../../../services/utils/request";
import {
  travelDealsData as dummyTravelDealsData,
  flightDummyImages,
} from "./travel-deals-data";
import "./travel-deals.scss";

function TravelDealsSect(props: any) {
  const navigate = useNavigate();
  const [travelDealsData, setTravelDealsData] =
    useState<any[]>(dummyTravelDealsData);

  const previewCount = () => {
    const width = window.innerWidth;
    if (width > 1200) {
      return 4;
    } else if (width > 900) {
      return 3;
    } else if (width > 550) {
      return 2;
    } else {
      return 1;
    }
  };

  const getTrendingFlights = () => {
    sendRequest(
      {
        url: "flight/flight-offer-search",
        method: "POST",
        body: {
          origin: "LOS",
          destination: "LAX",
          departure_date: new Date().toISOString().split("T")[0],
          adults: "1",
          cabin: "economy",
          children: "0",
          infants: "0",
          return_date: "",
        },
      },
      (res: any) => {
        const flights = res.data.map((flight: any, index: number) => {
          return {
            location:
              flight?.outbound[flight?.outbound.length - 1]
                ?.airport_from_details?.city,
            country:
              flight?.outbound[flight?.outbound.length - 1]
                ?.airport_from_details?.country,
            rating: 4.8,
            oldPrice: 850,
            currentPrice: flight.amount,
            image: flightDummyImages[index % 4],
            // image: flight?.outbound[flight?.outbound.length - 1]?.airline_details?.logo,
            id: flight.id,
          };
        });
        setTravelDealsData(flights);
      },
      (err: any) => {}
    );
  };

  const travelDealsCarousel = travelDealsData.map((data, index) => {
    return (
      <div className="deal-case" key={index}>
        <div
          className="deal-card"
          data-aos="zoom-in"
          data-aos-delay={(index % 5) * 200 + 100}
        >
          <div
            className="img-sect-display"
            style={{ backgroundImage: `url(${data.image})` }}
          >
            <div className="imh">
              {/* <img src={data.image} alt="" /> */}
              <img src={flightDummyImages[0]} alt="" />
            </div>
            <div className="overlay">
              <button onClick={() => viewFlightDetails(data.id)}>
                Book Now
              </button>
            </div>
          </div>
          <div className="text-sect">
            <div className="spread-info">
              <h6>{data.location}</h6>
              <p>
                <FontAwesomeIcon
                  icon={"star"}
                  className="yellow-bright-tx icon"
                />{" "}
                {data.rating}
              </p>
            </div>
            <div className="spread-info mt-2">
              <p>
                <FontAwesomeIcon icon={"map-marker-alt"} className="icon" />{" "}
                {data.country}
              </p>
              <div className="spread-info">
                {/* <p className='canceled number-light'>${data.oldPrice}</p> */}
                <p className="highlighted number-light">
                  ₦{formatNumber(data.currentPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const viewFlightDetails = (id: number) => {
    if (id) {
      navigate(`/${Path.flightPreview}/${id}`);
    }
  };

  useEffect(() => {
    getTrendingFlights();
  }, [props]);

  return (
    <div className="travel-deals">
      <div className="bg-fade"></div>
      <div>
        <h3 className="text-center h3b">
          Today’s <span className="orange-tx"> Travel deals</span>
        </h3>
        <div className="holder-1100">
          <Carousel
            loop
            autoPlay
            delay={6000}
            freeMode
            slidesPerView={previewCount()}
            spaceBetween={0}
            data={travelDealsCarousel}
            navigation={true}
            pagination={false}
            customPagination={true}
          />
        </div>
      </div>
    </div>
  );
}

export default TravelDealsSect;
