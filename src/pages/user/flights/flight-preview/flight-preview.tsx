import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FlightFeatureImage1,
  FlightFeatureImage2,
  FlightFeatureImage3,
  FlightFeatureImage4,
  FlightPreviwImg,
  PlaneTripIcon,
} from "../../../../assets/images";
import MiniLoader from "../../../../components/block-components/mini-loader/mini-loader";
import { iStoreState } from "../../../../services/constants/interfaces/store-schemas";
import { Path } from "../../../../navigations/routes";
import {
  formatDate,
  formatNumber,
} from "../../../../services/utils/data-manipulation-utilits";
import { sendRequest } from "../../../../services/utils/request";
import {
  formatTime,
  getFlightToAndFrom,
  processPassengerPriceList,
  sampleFlights,
} from "../flight-search/flight-search-service";
import FlightImageSlideSect from "./flight-image-slide/flight-image-slide";
import "./flight-preview.scss";

function FlightPreviewPage(props: any) {
  const navigate = useNavigate();
  const flightId = useParams().id || "";
  const [loading, setLoading] = useState(0);
  const [flightDetails, setFlightDetails] = useState<any>({
    outbound: [],
    inbound: [],
  });
  const airportList = useSelector((state: iStoreState) => state.airportList);

  const flightFeatureImageList = [
    FlightFeatureImage1,
    FlightFeatureImage2,
    FlightFeatureImage3,
    FlightFeatureImage4,
  ];

  const getFlightDetails = () => {
    setLoading(0);

    sendRequest(
      {
        url: "flight/confirm-price/" + flightId,
        method: "GET",
      },
      (res: any) => {
        setFlightDetails(res.data);
        setLoading(1);
      },
      (err: any) => {
        setLoading(2);
      }
    );
  };

  const reloadData = () => {
    getFlightDetails();
  };

  const exitPage = () => {
    navigate(`/${Path.flights}`);
  };

  const viewDetails = () => {
    document
      .getElementById("summary-card")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const bookFlight = (id: string) => {
    navigate(`/${Path.flightBooking}/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getFlightDetails();
    console.log({ airportList });
  }, [props]);

  return (
    <>
      {loading === 0 && (
        <div className="loader-holder">
          <MiniLoader />
        </div>
      )}
      {loading === 2 && (
        <div className="loader-holder">
          <div className="error-box">
            <h3>An error occured while loading</h3>
            <button
              className="my-2 mx-2 confirmation-button"
              onClick={reloadData}
            >
              Reload
            </button>
            <button className="my-2 mx-2 cancel" onClick={exitPage}>
              Exit
            </button>
          </div>
        </div>
      )}
      {loading === 1 && (
        <div className="flight-preview">
          <div className="preview-sect">
            <h5>
              <span className="orange-tx">
                {getFlightToAndFrom(flightDetails).from}{" "}
              </span>{" "}
              <span className="px-2 fainter-tx"> &gt; </span>
              <span className="orange-tx">
                {" "}
                {getFlightToAndFrom(flightDetails).to}{" "}
              </span>{" "}
              <span className="px-2 fainter-tx"> &gt; </span>
              <span className="increased-soft">
                {" "}
                {flightDetails.outbound[0]?.airline_details?.name}
              </span>
            </h5>
            <div className="spread-info-web pt-3 pb-2">
              <h2 className="f700">
                {flightDetails.outbound[0]?.airline_details?.name}{" "}
                {flightDetails.fare_basis}
              </h2>
              <h2 className="pt-2 orange-tx increased-x number-bold">
                <span className="reduced-im">{flightDetails.currency}</span>{" "}
                {formatNumber(Math.ceil(flightDetails.amount))}
              </h2>
            </div>

            <div className="spread-info-web pb-3">
              <p className="faint-tx py-2 mb-0">
                <FontAwesomeIcon icon={"map-marker"} /> &nbsp;
                {flightDetails.outbound[0]?.airport_from_details?.country}
              </p>
              <div className="description-grid-50">
                <div className="center-info save-flight">
                  <FontAwesomeIcon icon={"heart"} className="save-icon" />
                </div>
                <div className="pl-3">
                  <button className="flight-button" onClick={viewDetails}>
                    Proceed
                  </button>
                </div>
              </div>
            </div>

            <div data-aos="zoom-in" data-aos-delay="400">
              <div className="preview-image">
                <img src={FlightPreviwImg} alt="" />
              </div>
              <div className="spread-info-web pt-5 pb-2">
                <h5 className="f600 increased sentence-case mb-0">
                  basic{" "}
                  {flightDetails.outbound[0]?.cabin_type?.toLocaleLowerCase()}{" "}
                  features
                </h5>
                <p className="sentence-case mb-0">
                  Class:{" "}
                  <span className="f600">
                    {flightDetails.outbound[0]?.cabin_type.toLocaleLowerCase()}
                  </span>
                </p>
                {/* <div className='spread-info'>
                  <span className='cabin-type-indicator'>
                    <input type="checkbox" 
                      checked={flightDetails.outbound[0]?.cabin_type.toLocaleLowerCase() === 'economy'} 
                      onChange={(e) => e.preventDefault()}
                      name="" 
                      id="" 
                    />
                    Economy
                  </span>
                  <span className='cabin-type-indicator'>
                    <input type="checkbox" 
                      checked={flightDetails.outbound[0]?.cabin_type.toLocaleLowerCase() === 'first class'} 
                      onChange={(e) => e.preventDefault()}
                      name="" 
                      id="" 
                    />
                    First Class
                  </span>
                  <span className='cabin-type-indicator'>
                    <input type="checkbox" 
                      checked={flightDetails.outbound[0]?.cabin_type.toLocaleLowerCase() === 'business class'} 
                      onChange={(e) => e.preventDefault()}
                      name="" 
                      id="" 
                    />
                    Business Class
                  </span>
                </div> */}
              </div>
              <FlightImageSlideSect
                imageList={[
                  ...flightFeatureImageList,
                  ...flightFeatureImageList,
                  ...flightFeatureImageList,
                ]}
              />
            </div>
            <div className="policy-card mb-4">
              <h5 className="f600 increased">
                {flightDetails.outbound[0]?.airline_details?.name} Airline
                Policies
              </h5>
              <p className="text-center mb-1">No policies available</p>
            </div>
            {flightDetails.outbound.map((trip: any, tripIndex: number) => (
              <div className="mb-4 trip-card" key={tripIndex}>
                <div className="spread-info pb-i">
                  <p className="f400 mb-0 number-medium">
                    {formatDate(trip.departure_time)}
                  </p>
                  <span className="reduced-im number-light">
                    {Math.floor(trip.duration / 60)}Hs, {trip.duration % 60}Ms
                  </span>
                </div>
                <div className="spread-info-web my-3">
                  <div className="airline-badge my-2">
                    <div className="imh">
                      <img src={trip.airline_details?.logo} alt="" />
                    </div>
                    <span></span>
                    <div className="">
                      <h6>{trip.airline_details?.name}</h6>
                      <p className="mb-0 reduced fainter-tx">
                        {trip.airline_details?.code}
                      </p>
                    </div>
                  </div>
                  <div className="spread-info">
                    <FontAwesomeIcon icon={"plane"} />
                    <div className="split"></div>
                    <FontAwesomeIcon icon={"wifi"} />
                    <div className="split"></div>
                    <FontAwesomeIcon icon={"stopwatch"} />
                    <div className="split"></div>
                    <FontAwesomeIcon icon={"bowl-food"} />
                    <div className="split"></div>
                    <FontAwesomeIcon icon={"restroom"} />
                  </div>
                </div>
                <div className="spread-info w96">
                  <div className="text-center">
                    <p className="mb-0">
                      <span className="f500 mb-0 number-medium">
                        {formatTime(trip.departure_time)}{" "}
                      </span>
                      <span className="f400 reduced-im faint-tx">
                        {trip.airport_from}
                      </span>
                    </p>
                    <p className="mb-0">
                      <span className="f400 reduced-im faint-tx">
                        {
                          airportList?.find(
                            (airport) => airport.iata_code === trip.airport_from
                          )?.name
                        }
                      </span>
                    </p>
                    <p className="mb-0">
                      <span className="f400 reduced-im faint-tx">
                        {trip.airport_from_details?.city
                          ? `(${trip.airport_from_details.city})`
                          : ""}
                      </span>
                    </p>
                  </div>
                  <div className="trip-icon">
                    <img src={PlaneTripIcon} alt="" />
                  </div>
                  <div className="text-center">
                    <p className="mb-0">
                      <span className="f500 mb-0 number-medium">
                        {formatTime(trip.arrival_time)}{" "}
                      </span>
                      <span className="f400 reduced-im faint-tx">
                        {trip.airport_to}
                      </span>
                    </p>
                    <p className="mb-0">
                      <span className="f400 reduced-im faint-tx">
                        {
                          airportList?.find(
                            (airport) => airport.iata_code === trip.airport_to
                          )?.name
                        }
                      </span>
                    </p>
                    <p className="mb-0">
                      <span className="f400 reduced-im faint-tx">
                        {trip.airport_to_details?.city
                          ? `(${trip.airport_to_details.city})`
                          : ""}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-lg-4 col-6 mt-2">
                    <p className="reduced mb-0">Flight Number</p>
                    <span className="number-medium">{trip.flight_number}</span>
                  </div>
                  <div className="col-lg-4 col-6 mt-2">
                    <p className="reduced mb-0">Layover Duration</p>
                    <span className=" number-medium">
                      {Math.floor(trip.layover / 60)}Hs, {trip.layover % 60}Ms
                    </span>
                  </div>
                  <div className="col-lg-4 col-md-6 mt-2">
                    <p className="reduced mb-0">Cabin Type</p>
                    <span className="number-medium sentence-case">
                      {trip.cabin_type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {flightDetails.inbound.length > 0 && (
              <div className="py-2">
                <hr className="text-center" />
                <h6 className="text-center mb-0">Return Trip</h6>
                <hr className="text-center" />
              </div>
            )}
            {flightDetails.inbound.map((trip: any, tripIndex: number) => (
              <div className="mb-4 trip-card" key={tripIndex}>
                <div className="spread-info pb-i">
                  <p className="f400 mb-0 number-medium">
                    {formatDate(trip.departure_time)}
                  </p>
                  <span className="reduced-im number-light">
                    {Math.floor(trip.duration / 60)}Hs, {trip.duration % 60}Ms
                  </span>
                </div>
                <div className="spread-info-web my-3">
                  <div className="airline-badge my-2">
                    <div className="imh">
                      <img src={trip.airline_details?.logo} alt="" />
                    </div>
                    <span></span>
                    <div className="">
                      <h6>{trip.airline_details?.name}</h6>
                      <p className="mb-0 reduced fainter-tx">
                        {trip.airline_details?.code}
                      </p>
                    </div>
                  </div>
                  <div className="spread-info">
                    <FontAwesomeIcon icon={"plane"} />
                    <div className="split"></div>
                    <FontAwesomeIcon icon={"wifi"} />
                    <div className="split"></div>
                    <FontAwesomeIcon icon={"stopwatch"} />
                    <div className="split"></div>
                    <FontAwesomeIcon icon={"bowl-food"} />
                    <div className="split"></div>
                    <FontAwesomeIcon icon={"restroom"} />
                  </div>
                </div>
                <div className="spread-info w96">
                  <div className="text-center">
                    <p className="mb-0">
                      <span className="f500 mb-0 number-medium">
                        {formatTime(trip.departure_time)}{" "}
                      </span>
                      <span className="f400 reduced-im faint-tx">
                        {trip.airport_from}
                      </span>
                    </p>
                    <p className="mb-0">
                      <span className="f400 reduced-im faint-tx">
                        {
                          airportList?.find(
                            (airport) => airport.iata_code === trip.airport_from
                          )?.name
                        }
                      </span>
                    </p>
                    <p className="mb-0">
                      <span className="f400 reduced-im faint-tx">
                        {trip.airport_from_details?.city
                          ? `(${trip.airport_from_details.city})`
                          : ""}
                      </span>
                    </p>
                  </div>
                  <div className="trip-icon">
                    <img src={PlaneTripIcon} alt="" />
                  </div>
                  <div className="text-center">
                    <p className="mb-0">
                      <span className="f500 mb-0 number-medium">
                        {formatTime(trip.arrival_time)}{" "}
                      </span>
                      <span className="f400 reduced-im faint-tx">
                        {trip.airport_to}
                      </span>
                    </p>
                    <p className="mb-0">
                      <span className="f400 reduced-im faint-tx">
                        {
                          airportList?.find(
                            (airport) => airport.iata_code === trip.airport_to
                          )?.name
                        }
                      </span>
                    </p>
                    <p className="mb-0">
                      <span className="f400 reduced-im faint-tx">
                        {trip.airport_to_details?.city
                          ? `(${trip.airport_to_details.city})`
                          : ""}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-lg-4 col-6 mt-2">
                    <p className="reduced mb-0">Flight Number</p>
                    <span className="number-medium">{trip.flight_number}</span>
                  </div>
                  <div className="col-lg-4 col-6 mt-2">
                    <p className="reduced mb-0">Layover Duration</p>
                    <span className=" number-medium">
                      {Math.floor(trip.layover / 60)}Hs, {trip.layover % 60}Ms
                    </span>
                  </div>
                  <div className="col-lg-4 col-md-6 mt-2">
                    <p className="reduced mb-0">Cabin Type</p>
                    <span className="number-medium sentence-case">
                      {trip.cabin_type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="mb-4 summary-card">
              <div className="hanger" id="summary-card"></div>
              <div className="row">
                <div className="col-md-6">
                  <div className="py-2">
                    <h6>Price Details</h6>
                    {flightDetails?.travelers_price?.map(
                      (price: any, index: number) => (
                        <div className="spread-info" key={index}>
                          {/* price_summary */}
                          {processPassengerPriceList(price).map(
                            (item, index) => (
                              <React.Fragment key={index}>
                                <h6 className="sentence-case f300 reduced-soft">
                                  {item.key}
                                </h6>
                                <h6 className="number-light reduced-soft">
                                  {formatNumber(item.value)}
                                </h6>
                              </React.Fragment>
                            )
                          )}
                        </div>
                      )
                    )}
                    <div className="spread-info">
                      <h6 className="f300 reduced-soft">Base Fare</h6>
                      <h6 className="number-light reduced-soft">
                        {formatNumber(Math.ceil(flightDetails?.amount))}
                      </h6>
                    </div>
                    <div className="spread-info">
                      <h6 className="f300 reduced-soft">Service Charge</h6>
                      <h6 className="number-light reduced-soft">
                        {formatNumber(Math.ceil(0))}
                      </h6>
                    </div>
                    <div className="spread-info">
                      <h6 className="f300 reduced-soft">Discount </h6>
                      <h6 className="number-light reduced-soft">
                        {formatNumber(Math.ceil(0))}
                      </h6>
                    </div>
                    <div className="spread-info">
                      <h6>Total</h6>
                      <h6 className="number-medium">
                        {formatNumber(Math.ceil(flightDetails?.amount))}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="py-2">
                    <h6>Special Information</h6>
                    <p className="faint-tx reduced-soft mb-0">
                      No special information
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <button
                className="flight-button"
                onClick={() => bookFlight(flightDetails.id)}
              >
                Book Flight
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FlightPreviewPage;
