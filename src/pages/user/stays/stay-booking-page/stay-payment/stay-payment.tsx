import React, { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MiniLoader from "../../../../../components/block-components/mini-loader/mini-loader";
import { apiLinks } from "../../../../../config/environment";
import { PaystackButtonProps } from "../../../../../services/constants/interfaces/utility-schemas";
import { Path } from "../../../../../navigations/routes";
import { sendRequest } from "../../../../../services/utils/request";
import { IStayPaymentData } from "../stay-booking-service";
import "./stay-payment.scss";

interface IStayProps {
  data: IStayPaymentData;
}

function StayPayment(props: IStayProps) {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState<0 | 1 | 2>(0);

  const recordPayment = (response: any) => {
    setProcessing(1);
    sendRequest(
      {
        url: "website/record-payment",
        method: "POST",
        body: {
          service_name: "stay",
          booking_reference: props.data.booking_reference,
          transaction_reference: response.reference,
          amount: props.data.amount / 100,
          time: new Date().toISOString(),
        },
      },
      (res: any) => {
        toast.success("Booking complete");
        setProcessing(2);
        navigate(`/${Path.myBookings}`);
      },
      (err: any) => {
        toast.error(err.error || "Request failed");
        setProcessing(2);
      }
    );
  };
  const closePayment = (error: any) => {
    setProcessing(0);
  };

  const [paystackProps, setPaystackProps] = useState<PaystackButtonProps>({
    email: props.data.email,
    amount: props.data.amount,
    publicKey: apiLinks.paystackPublicKey,
    text: "Pay Now",
    label: "Borderless Travels",
    metadata: {
      custom_fields: [],
      booking_reference: props.data.booking_reference,
    },
    onSuccess: recordPayment,
    onClose: closePayment,
  });

  useEffect(() => {
    // setTimeout(() => {
    //   toast.error('Failed to load Stay details');
    //   toast.error('Field Validation error');
    // }, 5000);
    // setTimeout(() => {
    //   toast.error('Detail reload Failed');
    //   toast.error('Validation Failed');
    // }, 15000);
  }, [props]);

  return (
    <div className="stay-payment loader-holder">
      <div className="center-info-col pb-4 max300">
        {processing === 2 && (
          <div className="center-info-col pb-4 max300">
            <p className="text-center black-tx mb-3">
              There was a problem in saving your transaction record
            </p>
            <button className="paystack-button" onClick={recordPayment}>
              Retry
            </button>
          </div>
        )}
        {processing === 1 && (
          <div className="center-info-col pb-4 max300">
            <div>
              <MiniLoader />
            </div>
            <p className="text-center black-tx mb-0">
              Your payment has been confirmed and is been saved, please wait..
            </p>
          </div>
        )}
        {processing === 0 && (
          <>
            <p className="text-center black-tx">
              Please make your payment to complete your booking
            </p>
            <PaystackButton
              {...paystackProps}
              className={
                "paystack-button" + (processing !== 0 ? " deactivated" : "")
              }
            />
          </>
        )}
      </div>
    </div>
  );
}

export default StayPayment;
