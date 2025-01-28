import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import MiniLoader from "../../../../components/block-components/mini-loader/mini-loader";
import {
  activateAllTouchFields,
  chooseRelationship,
  flightPaymentInitialData,
  IFlightBookingPayload,
  IFlightBookingTouchedPayload,
  IFlightPaymentData,
  initialContactPayload,
  initialContactTouchedData,
  initialPassengerPayload,
  initialPassengerTouchedData,
  IPassengerPayload,
  updateBookingData,
  updateToRelationship,
  validateForErrors,
} from "./flight-booking-service";
import FlightPayment from "./flight-payment/flight-payment";
import "./flight-booking-page.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  getFlightToAndFrom,
  processPassengerPriceList,
} from "../flight-search/flight-search-service";
import { Path } from "../../../../navigations/routes";
import {
  acceptOnlyNumbers,
  formatNumber,
  generateMaxDate,
  generateMinDate,
} from "../../../../services/utils/data-manipulation-utilits";
import { useSelector } from "react-redux";
import {
  iStoreState,
  IUserData,
} from "../../../../services/constants/interfaces/store-schemas";
import {
  useBookFlightAuthenticatedMutation,
  useBookFlightUnauthenticatedMutation,
  useGetConfirmFlightPriceQuery,
} from "../../../../store/apis/flights";
import { Api } from "../../../../types";

function FlightBookingPage(props: any) {
  const navigate = useNavigate();
  const user: IUserData = useSelector((state: iStoreState) => state.user);
  const [openPayment, setOpenPayment] = useState(false);
  const flightId = useParams().id || "";
  const [flightPaymentData, setFlightPaymentData] =
    useState<IFlightPaymentData>(flightPaymentInitialData);
  const [bookingErrors, setBookingErrors] = useState<IFlightBookingPayload>({
    contact_details: initialContactPayload,
    passenger_details: [],
  });
  const [bookingTouched, setBookingTouched] =
    useState<IFlightBookingTouchedPayload>({
      contact_details: initialContactTouchedData,
      passenger_details: [],
    });

  const [bookUnauthenticatedMutate] = useBookFlightUnauthenticatedMutation();
  const [bookAuthenticatedMutate] = useBookFlightAuthenticatedMutation();
  const {
    data: flightPriceData,
    isLoading,
    isError,
    refetch,
  } = useGetConfirmFlightPriceQuery({
    id: flightId,
  });
  const flightDetails = flightPriceData?.data;

  useEffect(() => {
    if (flightDetails) {
      setupTouchedAndErrors(flightDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flightDetails]);

  const exitPage = () => {
    navigate(`/${Path.flights}`);
  };

  const validate = (values: IFlightBookingPayload) => {
    // const formValues: IFlightBookingPayload = Object.assign(values);
    // validateForErrors(formValues);
    const { bookingErr, errors } = validateForErrors(
      values,
      flightDetails?.document_required as any,
      flightDetails
    );
    setBookingErrors(bookingErr);
    return errors;
  };

  const setupPassenterDetails = () => {
    const passengerList: any[] = [];
    flightDetails?.price_summary.forEach((item: any) => {
      for (let i = 0; i < item.quantity; i++) {
        passengerList.push({ type: item.passenger_type });
      }
    });
    const data = passengerList?.map((item) => {
      return {
        ...initialPassengerPayload,
        passenger_type: item.type,
      };
    });
    return data;
  };

  const setupTouchedAndErrors = (details: any) => {
    const errorData = bookingErrors;
    const touchedData = bookingTouched;
    processPassengerPriceList(details.travelers_price)?.forEach(() => {
      errorData.passenger_details.push(initialPassengerPayload);
      touchedData.passenger_details.push(initialPassengerTouchedData);
    });
    setBookingErrors(errorData);
    setBookingTouched(touchedData);
  };

  const setFieldChange = (
    e: any,
    values: IFlightBookingPayload,
    setValues: Function,
    title: string,
    index: number,
    inDocument?: boolean
  ) => {
    const passenger_details: any = values.passenger_details;
    if (inDocument) {
      passenger_details[index].documents[title] = e.target.value;
    } else {
      passenger_details[index][title] = e.target.value;
    }
    setValues({ ...values, passenger_details });
  };

  const setFieldTouched = (title: string, index: number) => {
    const touchedData = { ...bookingTouched };
    const passenger: any = { ...touchedData.passenger_details[index] };
    passenger[title] = true;
    touchedData.passenger_details[index] = passenger;
    setBookingTouched(touchedData);
  };

  const touchAll = () => {
    const touched = activateAllTouchFields(bookingTouched);
    setBookingTouched(touched);
  };

  const sumbitFlightBooking = async (
    values: IFlightBookingPayload,
    control: FormikHelpers<any>
  ) => {
    try {
      const payload = updateBookingData(
        values,
        !!flightDetails?.document_required
      );

      let res: Api.Flights.BookFlight.Response | undefined;

      if (user.email) {
        res = await bookAuthenticatedMutate({
          body: payload,
          query: { id: flightId },
        }).unwrap();
      } else {
        res = await bookUnauthenticatedMutate({
          body: payload,
          query: { id: flightId },
        }).unwrap();
      }

      if (res) {
        toast.success(
          "Your flight data has been captured, please make payment to complete booking"
        );
        setFlightPaymentData({
          email: values.contact_details.c_email,
          amount: Number(flightDetails?.amount) * 100,
          booking_reference: res.data?.reference,
        });
        setOpenPayment(true);
        control.setSubmitting(false);
        window.scrollTo({ behavior: "auto", left: 0, top: 0 });
      }

      // sendRequest(
      //   {
      //     url: bookLink + flightId,
      //     method: "POST",
      //     body: payload,
      //   },
      //   (res: any) => {
      //     toast.success(
      //       "Your flight data has been captured, please make payment to complete booking"
      //     );
      //     setFlightPaymentData({
      //       email: values.contact_details.c_email,
      //       amount: Number(flightDetails?.amount) * 100,
      //       booking_reference: res.data?.reference,
      //     });
      //     setOpenPayment(true);
      //     control.setSubmitting(false);
      //     window.scrollTo({ behavior: "auto", left: 0, top: 0 });
      //   },
      //   (err: any) => {
      //     toast.error(err.error || "Request failed");
      //     control.setSubmitting(false);
      //   }
      // );
    } catch (error: any) {
      toast.error(error.error || "Request failed");
      control.setSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ behavior: "auto", left: 0, top: 0 });
  }, []);

  // useEffect(() => {
  //   if(loading === 3) {
  //     setLoading(1)
  //   }
  // }, [user])

  console.log({ isLoading });

  return (
    <>
      {isLoading && (
        <div className="loader-holder">
          <MiniLoader />
        </div>
      )}
      {isError && (
        <div className="loader-holder">
          <div className="error-box">
            <h3>An error occured while loading</h3>
            <button className="my-2 mx-2 confirmation-button" onClick={refetch}>
              Reload
            </button>
            <button className="my-2 mx-2 cancel" onClick={exitPage}>
              Exit
            </button>
          </div>
        </div>
      )}
      {!isLoading && flightDetails && (
        <div className="flight-booking-page">
          <Formik
            initialValues={{
              contact_details: {
                ...initialContactPayload,
                c_email: `${user.email || ""}`,
                c_first_name: `${user.first_name || ""}`,
                c_last_name: `${user.last_name || ""}`,
              },
              passenger_details: setupPassenterDetails(),
            }}
            onSubmit={(values, control) => sumbitFlightBooking(values, control)}
            validate={(values) => validate(values)}
          >
            {(Props) => {
              const {
                values,
                touched,
                isValid,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                setValues,
              } = Props;
              return (
                <form onSubmit={handleSubmit}>
                  {!openPayment && (
                    <div className="preview-sect">
                      <div className="spread-info-web">
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
                        <h2 className="pt-2 orange-tx increased number-bold">
                          <span className="reduced-im">
                            {flightDetails.currency}
                          </span>{" "}
                          {formatNumber(Math.ceil(flightDetails?.amount))}
                        </h2>
                      </div>
                      <h5 className="f600 increased mt-4">Contact Details</h5>
                      <div className="trip-card mb-4">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-input">
                              <label>Email</label>
                              <input
                                type="text"
                                disabled={!!user.email}
                                name="contact_details.c_email"
                                placeholder="Enter email"
                                value={values.contact_details.c_email}
                                onChange={(e) => {
                                  handleChange(e);
                                  updateToRelationship(
                                    e,
                                    values,
                                    setValues,
                                    "c_email"
                                  );
                                }}
                                onBlur={handleBlur}
                                className={
                                  touched.contact_details?.c_email &&
                                  bookingErrors.contact_details.c_email
                                    ? "im-error"
                                    : ""
                                }
                              />
                              {touched.contact_details?.c_email &&
                                bookingErrors.contact_details?.c_email && (
                                  <p className="reduced red-tx-im mb-0">
                                    {bookingErrors.contact_details.c_email}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-input">
                              <label>First Name</label>
                              <input
                                type="text"
                                disabled={!!user.first_name}
                                name="contact_details.c_first_name"
                                placeholder="Enter first name"
                                value={values.contact_details.c_first_name}
                                onChange={(e) => {
                                  handleChange(e);
                                  updateToRelationship(
                                    e,
                                    values,
                                    setValues,
                                    "c_first_name"
                                  );
                                }}
                                onBlur={handleBlur}
                                className={
                                  touched.contact_details?.c_first_name &&
                                  bookingErrors.contact_details?.c_first_name
                                    ? "im-error"
                                    : ""
                                }
                              />
                              {touched.contact_details?.c_first_name &&
                                bookingErrors.contact_details?.c_first_name && (
                                  <p className="reduced red-tx-im mb-0">
                                    {bookingErrors.contact_details.c_first_name}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-input">
                              <label>Last Name</label>
                              <input
                                type="text"
                                disabled={!!user.last_name}
                                name="contact_details.c_last_name"
                                placeholder="Enter last name"
                                value={values.contact_details.c_last_name}
                                onChange={(e) => {
                                  handleChange(e);
                                  updateToRelationship(
                                    e,
                                    values,
                                    setValues,
                                    "c_last_name"
                                  );
                                }}
                                onBlur={handleBlur}
                                className={
                                  touched.contact_details?.c_last_name &&
                                  bookingErrors.contact_details?.c_last_name
                                    ? "im-error"
                                    : ""
                                }
                              />
                              {touched.contact_details?.c_last_name &&
                                bookingErrors.contact_details?.c_last_name && (
                                  <p className="reduced red-tx-im mb-0">
                                    {bookingErrors.contact_details.c_last_name}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-input">
                              <label>Phone Number</label>
                              <input
                                type="text"
                                name="contact_details.c_phone_number"
                                placeholder="Enter phone number"
                                value={values.contact_details.c_phone_number}
                                onChange={(e) => {
                                  handleChange(e);
                                  updateToRelationship(
                                    e,
                                    values,
                                    setValues,
                                    "c_phone_number"
                                  );
                                }}
                                onBlur={handleBlur}
                                className={
                                  touched.contact_details?.c_phone_number &&
                                  bookingErrors.contact_details.c_phone_number
                                    ? "im-error"
                                    : ""
                                }
                              />
                              {touched.contact_details?.c_phone_number &&
                                bookingErrors.contact_details
                                  ?.c_phone_number && (
                                  <p className="reduced red-tx-im mb-0">
                                    {
                                      bookingErrors.contact_details
                                        .c_phone_number
                                    }
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-input">
                              <label>Relationship to Passenger</label>
                              <select
                                name="contact_details.c_relationship_to_p"
                                value={
                                  values.contact_details.c_relationship_to_p
                                }
                                onChange={(e) => {
                                  handleChange(e);
                                  chooseRelationship(e, values, setValues);
                                }}
                                onBlur={handleBlur}
                                className={
                                  touched.contact_details
                                    ?.c_relationship_to_p &&
                                  bookingErrors.contact_details
                                    .c_relationship_to_p
                                    ? "im-error"
                                    : ""
                                }
                              >
                                <option value="" disabled>
                                  Choose Relationship
                                </option>
                                <option value="self">Self</option>
                                <option value="spouse">Spouse</option>
                                <option value="relative">Relative</option>
                                <option value="colleague">Colleague</option>
                                <option value="friend">Friend</option>
                                <option value="others">Others</option>
                              </select>
                              {touched.contact_details?.c_relationship_to_p &&
                                bookingErrors.contact_details
                                  ?.c_relationship_to_p && (
                                  <p className="reduced red-tx-im mb-0">
                                    {
                                      bookingErrors.contact_details
                                        .c_relationship_to_p
                                    }
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <h5 className="f600 increased mt-4">Passenger Details</h5>
                      {values.passenger_details.map(
                        (passenger: IPassengerPayload, index: number) => (
                          <div className="trip-card mb-4" key={index}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-input">
                                  <label>Passenger Type</label>
                                  <input
                                    type="text"
                                    name={"passenger.passenger_type" + index}
                                    placeholder="Enter passenger type"
                                    value={passenger.passenger_type}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled
                                    className={
                                      bookingTouched.passenger_details[index]
                                        ?.passenger_type &&
                                      bookingErrors.passenger_details[index]
                                        ?.passenger_type
                                        ? "im-error"
                                        : ""
                                    }
                                  />
                                  {bookingTouched.passenger_details[index]
                                    ?.passenger_type &&
                                    bookingErrors.passenger_details[index]
                                      ?.passenger_type && (
                                      <p className="reduced red-tx-im mb-0">
                                        {
                                          bookingErrors.passenger_details[index]
                                            ?.passenger_type
                                        }
                                      </p>
                                    )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-input">
                                  <label>Title</label>
                                  <input
                                    type="text"
                                    name={"passenger.title" + index}
                                    placeholder="Enter your title"
                                    value={passenger.title}
                                    onChange={(e) =>
                                      setFieldChange(
                                        e,
                                        values,
                                        setValues,
                                        "title",
                                        index
                                      )
                                    }
                                    onBlur={() =>
                                      setFieldTouched("title", index)
                                    }
                                    className={
                                      bookingTouched.passenger_details[index]
                                        ?.title &&
                                      bookingErrors.passenger_details[index]
                                        ?.title
                                        ? "im-error"
                                        : ""
                                    }
                                  />
                                  {bookingTouched.passenger_details[index]
                                    ?.title &&
                                    bookingErrors.passenger_details[index]
                                      ?.title && (
                                      <p className="reduced red-tx-im mb-0">
                                        {
                                          bookingErrors.passenger_details[index]
                                            ?.title
                                        }
                                      </p>
                                    )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-input">
                                  <label>First Name</label>
                                  <input
                                    type="text"
                                    name={"passenger.first_name" + index}
                                    placeholder="Enter first name"
                                    value={passenger.first_name}
                                    onChange={(e) =>
                                      setFieldChange(
                                        e,
                                        values,
                                        setValues,
                                        "first_name",
                                        index
                                      )
                                    }
                                    onBlur={() =>
                                      setFieldTouched("first_name", index)
                                    }
                                    disabled={
                                      index === 0 &&
                                      values.contact_details
                                        .c_relationship_to_p === "self"
                                    }
                                    className={
                                      bookingTouched.passenger_details[index]
                                        ?.first_name &&
                                      bookingErrors.passenger_details[index]
                                        ?.first_name
                                        ? "im-error"
                                        : ""
                                    }
                                  />
                                  {bookingTouched.passenger_details[index]
                                    ?.first_name &&
                                    bookingErrors.passenger_details[index]
                                      ?.first_name && (
                                      <p className="reduced red-tx-im mb-0">
                                        {
                                          bookingErrors.passenger_details[index]
                                            ?.first_name
                                        }
                                      </p>
                                    )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-input">
                                  <label>Last Name</label>
                                  <input
                                    type="text"
                                    name={"passenger.last_name" + index}
                                    placeholder="Enter last name"
                                    value={passenger.last_name}
                                    onChange={(e) =>
                                      setFieldChange(
                                        e,
                                        values,
                                        setValues,
                                        "last_name",
                                        index
                                      )
                                    }
                                    onBlur={() =>
                                      setFieldTouched("last_name", index)
                                    }
                                    disabled={
                                      index === 0 &&
                                      values.contact_details
                                        .c_relationship_to_p === "self"
                                    }
                                    className={
                                      bookingTouched.passenger_details[index]
                                        ?.last_name &&
                                      bookingErrors.passenger_details[index]
                                        ?.last_name
                                        ? "im-error"
                                        : ""
                                    }
                                  />
                                  {bookingTouched.passenger_details[index]
                                    ?.last_name &&
                                    bookingErrors.passenger_details[index]
                                      ?.last_name && (
                                      <p className="reduced red-tx-im mb-0">
                                        {
                                          bookingErrors.passenger_details[index]
                                            ?.last_name
                                        }
                                      </p>
                                    )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-input">
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    name={"passenger.email" + index}
                                    placeholder="Enter email"
                                    value={passenger.email}
                                    onChange={(e) =>
                                      setFieldChange(
                                        e,
                                        values,
                                        setValues,
                                        "email",
                                        index
                                      )
                                    }
                                    onBlur={() =>
                                      setFieldTouched("email", index)
                                    }
                                    disabled={
                                      index === 0 &&
                                      values.contact_details
                                        .c_relationship_to_p === "self"
                                    }
                                    className={
                                      bookingTouched.passenger_details[index]
                                        ?.email &&
                                      bookingErrors.passenger_details[index]
                                        ?.email
                                        ? "im-error"
                                        : ""
                                    }
                                  />
                                  {bookingTouched.passenger_details[index]
                                    ?.email &&
                                    bookingErrors.passenger_details[index]
                                      ?.email && (
                                      <p className="reduced red-tx-im mb-0">
                                        {
                                          bookingErrors.passenger_details[index]
                                            ?.email
                                        }
                                      </p>
                                    )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-input">
                                  <label>Phone Number</label>
                                  <input
                                    type="text"
                                    name={"passenger.phone_number" + index}
                                    placeholder="Enter phone number"
                                    value={passenger.phone_number}
                                    onChange={(e) =>
                                      setFieldChange(
                                        e,
                                        values,
                                        setValues,
                                        "phone_number",
                                        index
                                      )
                                    }
                                    onBlur={() =>
                                      setFieldTouched("phone_number", index)
                                    }
                                    disabled={
                                      index === 0 &&
                                      values.contact_details
                                        .c_relationship_to_p === "self"
                                    }
                                    maxLength={11}
                                    onKeyUp={acceptOnlyNumbers}
                                    className={
                                      bookingTouched.passenger_details[index]
                                        ?.phone_number &&
                                      bookingErrors.passenger_details[index]
                                        ?.phone_number
                                        ? "im-error"
                                        : ""
                                    }
                                  />
                                  {bookingTouched.passenger_details[index]
                                    ?.phone_number &&
                                    bookingErrors.passenger_details[index]
                                      ?.phone_number && (
                                      <p className="reduced red-tx-im mb-0">
                                        {
                                          bookingErrors.passenger_details[index]
                                            ?.phone_number
                                        }
                                      </p>
                                    )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-input">
                                  <label>Gender</label>
                                  <select
                                    name={"passenger.gender" + index}
                                    value={passenger.gender}
                                    onChange={(e) =>
                                      setFieldChange(
                                        e,
                                        values,
                                        setValues,
                                        "gender",
                                        index
                                      )
                                    }
                                    onBlur={() =>
                                      setFieldTouched("gender", index)
                                    }
                                    className={
                                      bookingTouched.passenger_details[index]
                                        ?.gender &&
                                      bookingErrors.passenger_details[index]
                                        ?.gender
                                        ? "im-error"
                                        : ""
                                    }
                                  >
                                    <option value="" disabled>
                                      Choose Gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                  </select>
                                  {bookingTouched.passenger_details[index]
                                    ?.gender &&
                                    bookingErrors.passenger_details[index]
                                      ?.gender && (
                                      <p className="reduced red-tx-im mb-0">
                                        {
                                          bookingErrors.passenger_details[index]
                                            ?.gender
                                        }
                                      </p>
                                    )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-input">
                                  <label>Date of Birth</label>
                                  <input
                                    type="date"
                                    name={"passenger.dob" + index}
                                    placeholder="Enter date of birth"
                                    value={passenger.dob}
                                    onChange={(e) =>
                                      setFieldChange(
                                        e,
                                        values,
                                        setValues,
                                        "dob",
                                        index
                                      )
                                    }
                                    onBlur={() => setFieldTouched("dob", index)}
                                    onKeyDown={(e) => e.preventDefault()}
                                    min={generateMinDate(
                                      passenger.passenger_type.toLocaleLowerCase() ===
                                        "adult"
                                        ? 100
                                        : 18
                                    )}
                                    max={generateMaxDate(
                                      passenger.passenger_type.toLocaleLowerCase() ===
                                        "adult"
                                        ? 18
                                        : 0
                                    )}
                                    className={
                                      bookingTouched.passenger_details[index]
                                        ?.dob &&
                                      bookingErrors.passenger_details[index]
                                        ?.dob
                                        ? "im-error"
                                        : ""
                                    }
                                  />
                                  {bookingTouched.passenger_details[index]
                                    ?.dob &&
                                    bookingErrors.passenger_details[index]
                                      ?.dob && (
                                      <p className="reduced red-tx-im mb-0">
                                        {
                                          bookingErrors.passenger_details[index]
                                            ?.dob
                                        }
                                      </p>
                                    )}
                                </div>
                              </div>
                              {flightDetails.document_required && (
                                <>
                                  <div className="col-md-12">
                                    <p className="mb-0 pt-2 mt-4">
                                      Passenger's documents
                                    </p>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-input">
                                      <label>
                                        Is The Passenger The Holder of This
                                        Document?
                                      </label>
                                      <select
                                        name={"passenger.holder" + index}
                                        value={passenger.holder}
                                        onChange={(e) =>
                                          setFieldChange(
                                            e,
                                            values,
                                            setValues,
                                            "holder",
                                            index
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched("holder", index)
                                        }
                                        className={
                                          bookingTouched.passenger_details[
                                            index
                                          ]?.holder &&
                                          bookingErrors.passenger_details[index]
                                            ?.holder
                                            ? "im-error"
                                            : ""
                                        }
                                      >
                                        <option disabled value="">
                                          Choose Option
                                        </option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                      </select>
                                      {bookingTouched.passenger_details[index]
                                        ?.holder &&
                                        bookingErrors.passenger_details[index]
                                          ?.holder && (
                                          <p className="reduced red-tx-im mb-0">
                                            {
                                              bookingErrors.passenger_details[
                                                index
                                              ]?.holder
                                            }
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-input">
                                      <label>Document Type</label>
                                      <select
                                        name={"passenger.document_type" + index}
                                        value={passenger.document_type}
                                        onChange={(e) =>
                                          setFieldChange(
                                            e,
                                            values,
                                            setValues,
                                            "document_type",
                                            index
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched(
                                            "document_type",
                                            index
                                          )
                                        }
                                        className={
                                          bookingTouched.passenger_details[
                                            index
                                          ]?.document_type &&
                                          bookingErrors.passenger_details[index]
                                            ?.document_type
                                            ? "im-error"
                                            : ""
                                        }
                                      >
                                        <option disabled value="">
                                          Choose Document Type
                                        </option>
                                        <option value="passport">
                                          Passport
                                        </option>
                                        <option value="national_idcard">
                                          National ID Card
                                        </option>
                                        <option value="others">Others</option>
                                      </select>
                                      {bookingTouched.passenger_details[index]
                                        ?.document_type &&
                                        bookingErrors.passenger_details[index]
                                          ?.document_type && (
                                          <p className="reduced red-tx-im mb-0">
                                            {
                                              bookingErrors.passenger_details[
                                                index
                                              ]?.document_type
                                            }
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-input">
                                      <label>Issuing Date</label>
                                      <input
                                        type="date"
                                        name={"passenger.issuing_date" + index}
                                        placeholder="Enter issuing date"
                                        value={passenger.issuing_date}
                                        onChange={(e) =>
                                          setFieldChange(
                                            e,
                                            values,
                                            setValues,
                                            "issuing_date",
                                            index
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched("issuing_date", index)
                                        }
                                        onKeyDown={(e) => e.preventDefault()}
                                        min={generateMinDate(90)}
                                        max={generateMaxDate(0)}
                                        className={
                                          bookingTouched.passenger_details[
                                            index
                                          ]?.issuing_date &&
                                          bookingErrors.passenger_details[index]
                                            ?.issuing_date
                                            ? "im-error"
                                            : ""
                                        }
                                      />
                                      {bookingTouched.passenger_details[index]
                                        ?.issuing_date &&
                                        bookingErrors.passenger_details[index]
                                          ?.issuing_date && (
                                          <p className="reduced red-tx-im mb-0">
                                            {
                                              bookingErrors.passenger_details[
                                                index
                                              ]?.issuing_date
                                            }
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-input">
                                      <label>Expiry Date</label>
                                      <input
                                        type="date"
                                        name={"passenger.expiry_date" + index}
                                        placeholder="Enter expiry date"
                                        value={passenger.expiry_date}
                                        onChange={(e) =>
                                          setFieldChange(
                                            e,
                                            values,
                                            setValues,
                                            "expiry_date",
                                            index
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched("expiry_date", index)
                                        }
                                        onKeyDown={(e) => e.preventDefault()}
                                        min={generateMinDate(0)}
                                        max={generateMaxDate(-90)}
                                        className={
                                          bookingTouched.passenger_details[
                                            index
                                          ]?.expiry_date &&
                                          bookingErrors.passenger_details[index]
                                            ?.expiry_date
                                            ? "im-error"
                                            : ""
                                        }
                                      />
                                      {bookingTouched.passenger_details[index]
                                        ?.expiry_date &&
                                        bookingErrors.passenger_details[index]
                                          ?.expiry_date && (
                                          <p className="reduced red-tx-im mb-0">
                                            {
                                              bookingErrors.passenger_details[
                                                index
                                              ]?.expiry_date
                                            }
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-input">
                                      <label>Document Number</label>
                                      <input
                                        type="text"
                                        name={"passenger.number" + index}
                                        placeholder="Enter document number"
                                        value={passenger.number}
                                        onChange={(e) =>
                                          setFieldChange(
                                            e,
                                            values,
                                            setValues,
                                            "number",
                                            index
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched("number", index)
                                        }
                                        className={
                                          bookingTouched.passenger_details[
                                            index
                                          ]?.number &&
                                          bookingErrors.passenger_details[index]
                                            ?.number
                                            ? "im-error"
                                            : ""
                                        }
                                      />
                                      {bookingTouched.passenger_details[index]
                                        ?.number &&
                                        bookingErrors.passenger_details[index]
                                          ?.number && (
                                          <p className="reduced red-tx-im mb-0">
                                            {
                                              bookingErrors.passenger_details[
                                                index
                                              ]?.number
                                            }
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-input">
                                      <label>Country Issued</label>
                                      <input
                                        type="text"
                                        name={
                                          "passenger.issuing_country" + index
                                        }
                                        placeholder="Enter country document was issued"
                                        value={passenger.issuing_country}
                                        onChange={(e) =>
                                          setFieldChange(
                                            e,
                                            values,
                                            setValues,
                                            "issuing_country",
                                            index
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched(
                                            "issuing_country",
                                            index
                                          )
                                        }
                                        className={
                                          bookingTouched.passenger_details[
                                            index
                                          ]?.issuing_country &&
                                          bookingErrors.passenger_details[index]
                                            ?.issuing_country
                                            ? "im-error"
                                            : ""
                                        }
                                      />
                                      {bookingTouched.passenger_details[index]
                                        ?.issuing_country &&
                                        bookingErrors.passenger_details[index]
                                          ?.issuing_country && (
                                          <p className="reduced red-tx-im mb-0">
                                            {
                                              bookingErrors.passenger_details[
                                                index
                                              ]?.issuing_country
                                            }
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-input">
                                      <label>Nationality</label>
                                      <input
                                        type="text"
                                        name={
                                          "passenger.nationality_country" +
                                          index
                                        }
                                        placeholder="Enter nationality of document holder"
                                        value={passenger.nationality_country}
                                        onChange={(e) =>
                                          setFieldChange(
                                            e,
                                            values,
                                            setValues,
                                            "nationality_country",
                                            index
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched(
                                            "nationality_country",
                                            index
                                          )
                                        }
                                        className={
                                          bookingTouched.passenger_details[
                                            index
                                          ]?.nationality_country &&
                                          bookingErrors.passenger_details[index]
                                            ?.nationality_country
                                            ? "im-error"
                                            : ""
                                        }
                                      />
                                      {bookingTouched.passenger_details[index]
                                        ?.nationality_country &&
                                        bookingErrors.passenger_details[index]
                                          ?.nationality_country && (
                                          <p className="reduced red-tx-im mb-0">
                                            {
                                              bookingErrors.passenger_details[
                                                index
                                              ]?.nationality_country
                                            }
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )
                      )}
                      <div className="">
                        <button
                          className={
                            "flight-button" + (!isValid ? " inactive" : "")
                          }
                          onClick={touchAll}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Book Flight"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              );
            }}
          </Formik>
          {openPayment && (
            <>
              <FlightPayment data={flightPaymentData} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default FlightBookingPage;
