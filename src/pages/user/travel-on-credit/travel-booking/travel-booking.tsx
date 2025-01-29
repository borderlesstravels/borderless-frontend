import React from "react";

import "./travel-booking.scss";
import Form from "../../../../components/block-components/form/form/form";
import FormInput from "../../../../components/block-components/form/form-input/form-input";

interface ITravelBookingForm {
  companyName: string;
  email: string;
  phoneNumber: string;
  contactPerson: string;
  regNumber: string;
  address: string;
}

const initialValues: ITravelBookingForm = {
  companyName: "",
  email: "",
  phoneNumber: "",
  contactPerson: "",
  regNumber: "",
  address: "",
};

const TravelBooking = () => {
  const handleSubmit = (values: ITravelBookingForm) => {
    console.log({ values });
  };

  return (
    <section className="travel-booking" data-aos="fade-up">
      <div className="travel-booking-container">
        <h2 className="header-h2">Travel Booking Request</h2>
        <Form initialValues={initialValues} onSubmit={handleSubmit}>
          <FormInput name="companyName" label="Company Name" />
          <FormInput name="email" label="Email Address" />
          <FormInput name="phoneNumber" label="Phone Number" />
          <FormInput name="contactPerson" label="Contact Person" />
          <FormInput name="regNumber" label="Business Registration Number" />
          <FormInput name="address" label="Business Address" />
          <div className="submit-btn-div">
            <button className="submit-btn" type="submit">
              Submit Request
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default TravelBooking;
