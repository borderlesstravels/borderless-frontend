import React, { useCallback, useMemo, useState } from "react";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MiniLoader from "../../../../../components/block-components/mini-loader/mini-loader";
import { PaystackButtonProps } from "../../../../../services/constants/interfaces/utility-schemas";
import { Path } from "../../../../../navigations/routes";
import { IFlightPaymentData } from "../flight-booking-service";
import "./flight-payment.scss";
import { PAYSTACK_PUBLIC_KEY } from "../../../../../constants/apiLinks";
import { useRecordFlightPaymentMutation } from "../../../../../store/apis/payments";

interface IFlightProps {
  data: IFlightPaymentData;
}

function FlightPayment(props: IFlightProps) {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState<
    "initial" | "loading" | "error" | "complete"
  >("initial");
  const [recordFlightMutate] = useRecordFlightPaymentMutation();

  const recordPayment = useCallback(
    async (response: any) => {
      try {
        setCurrentStage("loading");
        const res = await recordFlightMutate({
          service_name: "flight",
          booking_reference: props.data.booking_reference,
          transaction_reference: response.reference,
          amount: props.data.amount / 100,
          time: new Date().toISOString(),
        });

        if (res) {
          setCurrentStage("complete");
          toast.success("Booking complete");
        }
      } catch (error: any) {
        setCurrentStage("error");
        toast.error(error.error || "Request failed");
      }
    },
    [props.data.amount, props.data.booking_reference, recordFlightMutate]
  );

  const goToBookings = () => {
    navigate(`/${Path.myBookings}`);
  };
  const closePayment = (error: any) => {
    setCurrentStage("initial");
  };

  const paystackProps = useMemo<PaystackButtonProps>(() => {
    return {
      email: props.data.email,
      amount: Math.ceil(props.data.amount),
      publicKey: PAYSTACK_PUBLIC_KEY,
      text: "Pay Now",
      label: "Borderless Travels",
      metadata: {
        custom_fields: [],
        booking_reference: props.data.booking_reference,
      },
      onSuccess: recordPayment,
      onClose: closePayment,
    };
  }, [
    props.data.amount,
    props.data.booking_reference,
    props.data.email,
    recordPayment,
  ]);

  return (
    <div className="flight-payment loader-holder">
      <div className="center-info-col pb-4 max300">
        {currentStage === "initial" && (
          <>
            <p className="text-center black-tx">
              Your flight data has been captured, Please make your payment to
              complete your booking
            </p>
            <PaystackButton
              {...paystackProps}
              className={
                "paystack-button" +
                (currentStage !== "initial" ? " deactivated" : "")
              }
            />
          </>
        )}
        {currentStage === "loading" && (
          <div className="center-info-col pb-4 max300">
            <div>
              <MiniLoader />
            </div>
            <p className="text-center black-tx mb-0">
              Your payment has been confirmed and is been saved, please wait..
            </p>
          </div>
        )}
        {currentStage === "error" && (
          <div className="center-info-col pb-4 max300">
            <p className="text-center black-tx mb-3">
              There was a problem in saving your transaction record
            </p>
            <button className="paystack-button" onClick={recordPayment}>
              Retry
            </button>
          </div>
        )}
        {currentStage === "complete" && (
          <div className="center-info-col pb-4 max300">
            <p className="text-center black-tx mb-3">Booking complete</p>
            <button className="paystack-button" onClick={goToBookings}>
              View Records
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlightPayment;
