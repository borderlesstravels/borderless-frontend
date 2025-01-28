import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MiniLoader from "../../../../components/block-components/mini-loader/mini-loader";
import { Path } from "../../../../navigations/routes";
import {
  FlightPreviwImg as StayPreviwImg,
  PlaneTripIcon,
} from "../../../../assets/images";
import {
  formatDate,
  formatNumber,
} from "../../../../services/utils/data-manipulation-utilits";
import { storedCombinedStayData as sData } from "../../../../services/utils/stay-booking-service";
import { sendRequest } from "../../../../services/utils/request";
import {
  calculateBookingSubtotal,
  calculateLengthOfStay,
  calculatePrice,
  formatTime,
  reviewProcessor,
  selectAppartmentCategory,
} from "../stay-search/stay-search-service";
import "./stay-booking-page.scss";
import { iFullShortletInfo } from "../../../host/add-stay/add-shortlet/add-shortlet-data";
import { pickCurrency } from "../../../../services/utils/currency-handler";
import AmenitiesPage from "../stay-preview/amenities/amenities";
import { Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import { timeConstants } from "../../../../services/constants/general constants";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { SHORTLET_IMAGES } from "../../../../constants/resourceLinks";

function StayBookingPage(props: any) {
  const navigate = useNavigate();
  const stayId = useParams().id || "";
  const [loading, setLoading] = useState(0);
  const [stayDetails, setStayDetails] = useState<iFullShortletInfo>();
  const [tab, setTab] = useState<
    "photos" | "amenities" | "reviews" | "location"
  >("photos");
  const [activeImage, setActiveImage] = useState("");
  const hostMode = props?.hostMode;
  const [dateTimeData, setDateTimeData] = useState();
  const [serviceCharge, setServiceCharge] = useState(50);
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const updateTab = (
    active: "photos" | "amenities" | "reviews" | "location"
  ) => {
    setTab(active);
  };

  const getStayDetails = () => {
    setLoading(0);

    sendRequest(
      {
        url: "shortlet/fetch-shortlet/" + stayId,
        method: "GET",
      },
      (res: any) => {
        const refinedData = res.data;
        refinedData.images = res.data.images
          .split(", ")
          .map((image: string) => SHORTLET_IMAGES + image);
        setStayDetails(refinedData);
        setActiveImage(refinedData.images[0]);
        console.log({ refinedData });
        setLoading(1);
      },
      (err: any) => {
        setLoading(2);
      }
    );
  };

  const validate = (values: FormikValues) => {
    const errors: any = {};
    if (!values.check_in_date) {
      errors.check_in_date = "Required";
    }
    if (!values.check_out_date) {
      errors.check_out_date = "Required";
    } else if (
      new Date(values.check_in_date) >= new Date(values.check_out_date)
    ) {
      errors.check_out_date = "Invalid checkout date";
    }
    if (!values.check_in_time) {
      errors.check_in_time = "Required";
    }
    if (!values.check_out_time) {
      errors.check_out_time = "Required";
    }
    return errors;
  };

  const bookShortlet = (
    values: FormikValues,
    controls: FormikHelpers<any>,
    price: number
  ) => {
    console.log({ values });
    // return
    sendRequest(
      {
        url: "shortlet/book-shortlet-auth/" + stayId,
        method: "POST",
        body: { ...values, price },
      },
      (res: any) => {
        toast.success(res.message);
        controls.setSubmitting(false);
        setLoading(3);
      },
      (err: any) => {
        toast.error(
          err?.error ||
            "Unable to complete, Please check your network and retry"
        );
        controls.setSubmitting(false);
      }
    );
  };

  const reloadData = () => {
    getStayDetails();
  };

  const exitPage = () => {
    navigate(`/${Path.stayPreview}/${stayId}`);
  };

  const goToBookings = () => {
    navigate(`/${Path.myBookings}/stays`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log({ sData });
    getStayDetails();
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
        <div className="stay-booking-page">
          <div className="top-web-grid">
            <div className="py-3">
              <div className="back-sect" onClick={exitPage}>
                <div className="return">
                  <FontAwesomeIcon icon={"chevron-left"} />
                </div>
                <h6 className="mb-0 orange-tx ps-2">Back</h6>
              </div>
            </div>
            <div className="image-container">
              <div className="row">
                <div className="col-md-6">
                  <div className="imh">
                    <img src={activeImage} alt="" />
                  </div>
                </div>
                <div className="col-md-6 space-mb-top">
                  <div className="row auto-scroll max-h60 reduced-margin">
                    {stayDetails?.images?.map((image, index) => (
                      <div className="col-6 px-1" key={index}>
                        <div className="imh pb-2">
                          <img
                            src={image}
                            alt=""
                            onClick={() => setActiveImage(image)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="booking-sect">
            <div className="booking-card" data-aos="zoom-out">
              <h2 className="pt-2">
                <span className="reduced-im">{pickCurrency("₦")}</span>
                <span className="reduced-soft number-bold">
                  {" "}
                  {calculatePrice(stayDetails)}
                </span>
                <span>/day</span>
              </h2>
              <Formik
                initialValues={{
                  // check_in_date: (sData.date?.startDate || new Date()).toISOString().split('T')[0],
                  // check_out_date: (sData.date?.endDate || new Date(new Date().getTime() + (1000 * 60 * 60 * 24))).toISOString().split('T')[0],
                  check_in_date: (params?.startDate
                    ? new Date(params?.startDate)
                    : new Date()
                  )
                    .toISOString()
                    .split("T")[0],
                  check_out_date: (params?.endDate
                    ? new Date(params?.endDate)
                    : new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
                  )
                    .toISOString()
                    .split("T")[0],
                  check_in_time: "12:00:00",
                  check_out_time: "12:00:00",
                }}
                validate={(values) => validate(values)}
                // onSubmit={(values, control) => console.log('bookShortlet(values, control)')}
                onSubmit={(values, control) =>
                  bookShortlet(
                    values,
                    control,
                    calculateBookingSubtotal(stayDetails, values)
                  )
                }
              >
                {(
                  formikProp: FormikProps<{
                    check_in_date: string;
                    check_out_date: string;
                    check_in_time: string;
                    check_out_time: string;
                  }>
                ) => {
                  const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    isValid,
                  } = formikProp;
                  console.log({ isValid });
                  return (
                    <>
                      <form
                        method="POST"
                        name="book-shortlet-form"
                        className="row"
                        onSubmit={handleSubmit}
                      >
                        <div className="col-sm-6 py-3">
                          <div className="detail-capsule">
                            <h6>Check-In Date</h6>
                            {/* <p>24-11-2024</p> */}
                            <input
                              type="date"
                              name="check_in_date"
                              value={values.check_in_date}
                              min={new Date().toISOString().split("T")[0]}
                              onChange={handleChange}
                              onKeyDown={(e) => e.preventDefault()}
                              className={
                                touched.check_in_date && errors.check_in_date
                                  ? "red-tx"
                                  : ""
                              }
                            />
                          </div>
                          {
                            // touched.check_in_date && errors.check_in_date &&
                            // <p className='red-tx reduced mb-0'>{errors.check_in_date}</p>
                          }
                          <p className="red-tx reduced mb-0">
                            {errors.check_in_date}
                          </p>
                        </div>
                        <div className="col-sm-6 py-3">
                          <div className="detail-capsule">
                            <h6>Check-out Date</h6>
                            {/* <p>26-11-2024</p> */}
                            <input
                              type="date"
                              name="check_out_date"
                              value={values.check_out_date}
                              min={
                                new Date(
                                  new Date(values.check_in_date).getTime() +
                                    1000 * 60 * 60 * 24
                                )
                                  .toISOString()
                                  .split("T")[0]
                              }
                              // min={new Date().toISOString().split('T')[0]}
                              onChange={handleChange}
                              onKeyDown={(e) => e.preventDefault()}
                              className={
                                touched.check_out_date && errors.check_out_date
                                  ? "red-tx"
                                  : ""
                              }
                            />
                          </div>
                          <p className="red-tx reduced mb-0 px-3">
                            {errors.check_out_date}
                          </p>
                        </div>
                        <div className="col-sm-6 py-3">
                          <div className="detail-capsule">
                            <h6>Check-In Time </h6>
                            {/* <p>12 PM</p> */}
                            <select
                              name="check_in_time"
                              id="check_in_time"
                              value={values.check_in_time}
                              onChange={handleChange}
                            >
                              <option value="">pp</option>
                              {timeConstants.map((time, index) => (
                                <option key={index} value={time.value}>
                                  {time.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* {
                            touched.check_in_time && errors.check_in_time &&
                            <p className='red-tx reduced mb-0 px-3'>{errors.check_in_time}</p>
                          } */}
                          <p className="red-tx reduced mb-0">
                            {errors.check_in_time}
                          </p>
                        </div>
                        <div className="col-sm-6 py-3">
                          <div className="detail-capsule">
                            <h6>Check-Out Time</h6>
                            {/* <p>12 PM</p> */}
                            <select
                              name="check_out_time"
                              id="check_out_time"
                              value={values.check_out_time}
                              onChange={handleChange}
                            >
                              <option value="">pp</option>
                              {timeConstants.map((time, index) => (
                                <option key={index} value={time.value}>
                                  {time.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <p className="red-tx reduced mb-0">
                            {errors.check_out_time}
                          </p>
                        </div>
                        <div className="spread-info increased-soft py-3">
                          <h6 className="mb-0 number-bold blue-tx">
                            {pickCurrency("₦")}
                            <span className="number-bold">
                              {calculatePrice(stayDetails)} x{" "}
                            </span>
                            <span className="number-bold">
                              {calculateLengthOfStay(values)} nights{" "}
                            </span>
                          </h6>
                          <p className="mb-0 number-light faint-tx">
                            <span className="reduced">{pickCurrency("₦")}</span>
                            <span className="number-light">
                              {formatNumber(
                                calculateBookingSubtotal(stayDetails, values)
                              )}
                            </span>
                          </p>
                        </div>
                        {/* <div className='spread-info increased-soft pt-3'>
                          <h6 className='mb-0 number-bold blue-tx'>Borderless Service Fee</h6>
                          <p className='mb-0 number-light faint-tx'>
                            <span className='reduced'>{pickCurrency('₦')}</span>
                            <span className='number-light'>{serviceCharge}</span>
                          </p>
                        </div> */}
                        <hr />
                        <div className="spread-info increased-soft pt-3 pb-4">
                          <h6 className="mb-0 number-bold blue-tx">Total</h6>
                          <p className="mb-0 number-light faint-tx">
                            <span className="reduced">{pickCurrency("₦")}</span>
                            <span className="number-light">
                              {formatNumber(
                                calculateBookingSubtotal(stayDetails, values) +
                                  serviceCharge
                              )}
                            </span>
                          </p>
                        </div>
                        <div className="spread-info increased-soft pb-4">
                          <p className="mb-0 faint-tx">
                            You wouldnt be charged yet
                          </p>
                          <p className="mb-0 orange-tx text-right">
                            Report this booking
                          </p>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className={
                              "reserve-button" +
                              (isSubmitting ? " deactivated" : "")
                            }
                          >
                            {isSubmitting ? "Processing" : "Reserve"}
                          </button>
                        </div>
                      </form>
                    </>
                  );
                }}
              </Formik>
            </div>
            <div className="info-space">
              <div className="scrollable">
                <h5 className="orange-tx">
                  - Rental in {stayDetails?.country} {stayDetails?.state}
                </h5>
                <h2 className="f700">{stayDetails?.apartment_name}</h2>
                <h5 className="faint-tx pt-3">
                  <FontAwesomeIcon icon={"map-marker"} /> {stayDetails?.address}
                </h5>
                <h5 className="faint-tx pt-3">
                  {selectAppartmentCategory(stayDetails).count} Units of{" "}
                  {selectAppartmentCategory(stayDetails).type}
                </h5>
                <div className="spread-info-front pt-1 pb-2">
                  <div className="review-pad">
                    <span className="number-light">
                      {reviewProcessor([]).rating}
                    </span>
                  </div>
                  <p className="mb-0">
                    <span className="number-medium">
                      {reviewProcessor([]).comment}{" "}
                    </span>
                    <span className="number-medium">
                      {reviewProcessor([]).count}{" "}
                    </span>
                    <span className="number-light">
                      review{reviewProcessor([]).count !== 1 && "s"}
                    </span>
                  </p>
                </div>
                <hr />
                <div className="spread-info-front pt-1 pb-2">
                  <div className="review-pad">
                    <span>{reviewProcessor([]).rating}</span>
                  </div>
                  <p className="mb-0">
                    <span>{reviewProcessor([]).comment}</span>
                    <span>{reviewProcessor([]).count}</span>
                    review{reviewProcessor([]).count !== 1 && "s"}
                  </p>
                </div>
                <AmenitiesPage stayDetails={stayDetails} />
              </div>
            </div>
          </div>
        </div>
      )}
      {loading === 3 && (
        <div className="loader-holder">
          <div className="error-box">
            <h3>Booking was saved</h3>
            <p>
              Your booking request has been saved, you would get a response when
              the property host accepts your booking request
            </p>
            <button className="my-2 mx-2 cancel" onClick={goToBookings}>
              View Bookings
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default StayBookingPage;
