import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MiniLoader from "../../../../../components/block-components/mini-loader/mini-loader";
import { Path } from "../../../../../navigations/routes";
import { formatDateMini } from "../../../../../services/utils/data-manipulation-utilits";
import { sendRequest } from "../../../../../services/utils/request";
import { formatTime } from "../../../flights/flight-search/flight-search-service";
import "./flight-booking-records.scss";

function FlightBookingRecords(props: any) {
  const [flightRecords, setFlightRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<0 | 1 | 2>(0);

  const navigate = useNavigate();

  const getFlightBookingRecords = () => {
    setLoading(0);

    sendRequest(
      {
        url: "user-profile/flight-bookings",
        method: "GET",
      },
      (res: any) => {
        setFlightRecords(Array.isArray(res.data) ? res.data.reverse() : []);
        setLoading(1);
      },
      (err: any) => {
        setLoading(1);
      }
    );
  };

  const downloadTicket = (reference: string) => {
    navigate(`/${Path.flightTicket}/${reference}`);
  };

  useEffect(() => {
    getFlightBookingRecords();
  }, [props]);

  return (
    <div className="flight-booking-records">
      <div className="flight-list">
        {loading === 0 && (
          <div className="loader-holder-40">
            <MiniLoader />
          </div>
        )}
        {loading === 2 && (
          <div className="loader-holder-40">
            <div className="error-box">
              <h3>An error occured while loading</h3>
              <button
                className="my-2 mx-2 confirmation-button"
                onClick={getFlightBookingRecords}
              >
                Reload
              </button>
            </div>
          </div>
        )}
        {loading === 1 && (
          <>
            {flightRecords.map((flight, index) => (
              <div className="detail-card" key={index}>
                <div className="outer-spread">
                  <div className="inner-spread">
                    <div className="image-holder">
                      <div
                        className="airline-image"
                        style={{
                          backgroundImage: `url(${flight.airline_logo})`,
                        }}
                      ></div>
                    </div>
                    <div className="flight-time">
                      <div className="">
                        <p className="mb-0 reduced-x faint-tx">
                          {flight.origin} ({flight.origin_code})
                        </p>
                        <h5 className="mb-0 number-medium reduced-soft">
                          {formatTime(flight.departure_time)}
                        </h5>
                      </div>
                      <FontAwesomeIcon
                        icon={"minus"}
                        className="increased px-3"
                      />
                      <div className="">
                        <p className="mb-0 reduced-x faint-tx">
                          {flight.destination} ({flight.destination_code})
                        </p>
                        <h5 className="mb-0 number-medium reduced-soft">
                          {formatTime(flight.arrival_time)}
                        </h5>
                      </div>
                    </div>
                    <div className="splitter"></div>
                    <div className="spread-info">
                      <div className="space-right">
                        <div className="description-grid-40 pb-3">
                          <div className="icon-holder">
                            <FontAwesomeIcon
                              icon={"calendar-days"}
                              className="icon"
                            />
                          </div>
                          <div className="space-left">
                            <p className="mb-0 reduced-xl faint-tx reduce-height">
                              Departure
                            </p>
                            <p className="mb-0 reduced-soft number-medium">
                              {formatDateMini(flight.departure_time)}
                            </p>
                          </div>
                        </div>
                        <div className="description-grid-40 ">
                          <div className="icon-holder">
                            <FontAwesomeIcon
                              icon={"calendar-days"}
                              className="icon"
                            />
                          </div>
                          <div className="space-left">
                            <p className="mb-0 reduced-xl faint-tx reduce-height">
                              Arrival
                            </p>
                            <p className="mb-0 reduced-soft number-medium">
                              {formatDateMini(flight.arrival_time)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="description-grid-40 pb-3">
                          <div className="icon-holder">
                            <FontAwesomeIcon
                              icon={"door-closed"}
                              className="icon"
                            />
                          </div>
                          <div className="space-left">
                            <p className="mb-0 reduced-xl faint-tx reduce-height">
                              Gate
                            </p>
                            <p className="mb-0 reduced-soft number-medium">
                              : : : :
                            </p>
                          </div>
                        </div>
                        <div className="description-grid-40">
                          <div className="icon-holder">
                            <FontAwesomeIcon icon={"chair"} className="icon" />
                          </div>
                          <div className="space-left">
                            <p className="mb-0 reduced-xl faint-tx reduce-height">
                              Seat no.
                            </p>
                            <p className="mb-0 reduced-soft number-medium">
                              : : : :
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center py-3">
                    <button
                      className="purple-button purple-shadow"
                      onClick={() => downloadTicket(flight.booking_reference)}
                    >
                      Download Ticket
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {flightRecords.length === 0 && (
              <div className="detail-card py-5">
                <p className="mb-0 increased">You have no flight Records yet</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FlightBookingRecords;
