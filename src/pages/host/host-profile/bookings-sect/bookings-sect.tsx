import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PendingTag } from "../../../../assets/images";
import MiniLoader from "../../../../components/block-components/mini-loader/mini-loader";
import { Path } from "../../../../navigations/routes";
import {
  formatDate,
  formatNumber,
} from "../../../../services/utils/data-manipulation-utilits";
import { sendRequest } from "../../../../services/utils/request";
import { formatTime } from "../../../user/stays/stay-search/stay-search-service";
import "./bookings-sect.scss";

interface iAllBookingRecord {
  bookings: any[];
  completedBookings: any[];
  confirmedBookings: any[];
  declinedBookings: any[];
  pendingBookings: any[];
}

function BookingsSect(props: any) {
  const [bookingRecords, setBookingRecords] = useState<any[]>([]);
  const [allBookingRecords, setAllBookingRecords] =
    useState<iAllBookingRecord>();
  const [mode, setMode] = useState<
    "all" | "pending" | "declined" | "confirmed" | "completed" | string
  >("all");
  const [loading, setLoading] = useState<0 | 1 | 2>(0);

  const navigate = useNavigate();

  const getStayBookingRecords = () => {
    setLoading(0);

    sendRequest(
      {
        url: "host-profile/shortlet-bookings",
        method: "GET",
      },
      (res: any) => {
        setMode("all");
        setAllBookingRecords(res.data);
        setBookingRecords(
          Array.isArray(res?.data?.bookings) ? res.data.bookings.reverse() : []
        );
        setLoading(1);
      },
      (err: any) => {
        setLoading(1);
      }
    );
  };

  const viewDetails = (id: string) => {
    navigate(`/${Path.stayBookingDetail}/${id}`);
  };

  useEffect(() => {
    getStayBookingRecords();
  }, [props]);

  useEffect(() => {
    switch (mode) {
      case "all":
        setBookingRecords(allBookingRecords?.bookings || []);
        break;
      case "pending":
        setBookingRecords(allBookingRecords?.pendingBookings || []);
        break;
      case "declined":
        setBookingRecords(allBookingRecords?.declinedBookings || []);
        break;
      case "confirmed":
        setBookingRecords(allBookingRecords?.confirmedBookings || []);
        break;
      case "completed":
        setBookingRecords(allBookingRecords?.completedBookings || []);
        break;
    }
  }, [mode]);

  return (
    <div className="host-booking-records page-holder">
      <div className="booking-list">
        <h3 className="mb-4">Booking Records</h3>
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
                onClick={getStayBookingRecords}
              >
                Reload
              </button>
            </div>
          </div>
        )}
        {loading === 1 && (
          <>
            <div className="row pb-3">
              <div className="col-lg-3 col-sm-6 pb-3">
                <div className="point-card">
                  <p>Total Bookings</p>
                  <h5>{formatNumber(allBookingRecords?.bookings?.length)}</h5>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 pb-3">
                <div className="point-card">
                  <div className="spread-info">
                    <p>Pending Bookings</p>
                    <p className="percent-rep">
                      (
                      {Math.round(
                        ((allBookingRecords?.pendingBookings?.length || 0) /
                          (allBookingRecords?.bookings?.length || 1)) *
                          100
                      )}
                      %)
                    </p>
                  </div>
                  <h5>
                    {formatNumber(allBookingRecords?.pendingBookings?.length)}
                  </h5>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 pb-3">
                <div className="point-card">
                  <div className="spread-info">
                    <p>Confirmed Bookings</p>
                    <p className="percent-rep">
                      (
                      {Math.round(
                        ((allBookingRecords?.confirmedBookings?.length || 0) /
                          (allBookingRecords?.bookings?.length || 1)) *
                          100
                      )}
                      %)
                    </p>
                  </div>
                  <h5>
                    {formatNumber(allBookingRecords?.confirmedBookings?.length)}
                  </h5>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 pb-3">
                <div className="point-card">
                  <div className="spread-info">
                    <p>Completed Bookings</p>
                    <p className="percent-rep">
                      (
                      {Math.round(
                        ((allBookingRecords?.completedBookings?.length || 0) /
                          (allBookingRecords?.bookings?.length || 1)) *
                          100
                      )}
                      %)
                    </p>
                  </div>
                  <h5>
                    {formatNumber(allBookingRecords?.completedBookings?.length)}
                  </h5>
                </div>
              </div>
              <div className="col-12 pt-3">
                <div className="mode-select">
                  <select
                    name="mode-select"
                    id=""
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                  >
                    <option value="all">All Bookings</option>
                    <option value="pending">Pending Bookings</option>
                    <option value="declined">Declined Bookings</option>
                    <option value="confirmed">Confirmed Bookings</option>
                    <option value="completed">Completed Bookings</option>
                  </select>
                </div>
              </div>
            </div>
            {bookingRecords.map((booking, index) => (
              <div className="detail-card" key={index}>
                <div className="outer-spread">
                  <div className="inner-spread">
                    <div className="image-holder">
                      <div
                        className="airline-image"
                        style={{
                          backgroundImage: `url(${booking.apartment_img})`,
                        }}
                      ></div>
                    </div>
                    <div className="stay-time-case">
                      <div>
                        <h6>{booking.apartment_name}</h6>
                      </div>
                      <div className="stay-time">
                        <div className="">
                          <p className="mb-0 reduced-x faint-tx">Check-In</p>
                          <h5 className="mb-0 number-medium reduced">
                            {formatDate(booking.check_in_date)}
                          </h5>
                        </div>
                        <FontAwesomeIcon
                          icon={"minus"}
                          className="increased px-3"
                        />
                        <div className="">
                          <p className="mb-0 reduced-x faint-tx">Check-Out</p>
                          <h5 className="mb-0 number-medium reduced">
                            {formatDate(booking.check_out_date)}
                          </h5>
                        </div>
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
                              Check-In Time
                            </p>
                            <p className="mb-0 reduced number-medium">
                              {formatTime(booking.check_in_time, true)}
                            </p>
                          </div>
                        </div>
                        <div className="description-grid-40 ">
                          <div className="icon-holder">
                            <FontAwesomeIcon
                              icon={"door-closed"}
                              className="icon"
                            />
                          </div>
                          <div className="space-left">
                            <p className="mb-0 reduced-xl faint-tx reduce-height">
                              Room No
                            </p>
                            <p className="mb-0 reduced number-medium">
                              On Arrival
                            </p>
                            {/* <p className='mb-0 reduced-xl faint-tx reduce-height'>Check-Out Time</p>
                              <p className='mb-0 reduced number-medium'>{formatTime(booking.check_out_time, true)}</p> */}
                          </div>
                        </div>
                      </div>
                      {/* <div>
                          <div className='description-grid-40 pb-3'>
                            <div className='icon-holder'>
                              <FontAwesomeIcon icon={'door-closed'} className='icon' />
                            </div>
                            <div className='space-left'>
                              <p className='mb-0 reduced-xl faint-tx reduce-height'>Room No</p>
                              <p className='mb-0 reduced number-medium'>On Arrival</p>
                            </div>
                          </div>
                        </div> */}
                    </div>
                  </div>
                  <div className="text-center py-3">
                    <button
                      className="purple-button purple-shadow"
                      onClick={() => viewDetails(booking._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
                {booking.status === "pending" && (
                  <div className="pending-banner">
                    <img src={PendingTag} alt="" />
                  </div>
                )}
              </div>
            ))}

            {bookingRecords.length === 0 && (
              <div className="detail-card py-5">
                <p className="mb-0 increased">
                  You have no {mode !== "all" && mode} booking Records yet
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BookingsSect;
