import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendRequest } from "../../../../../services/utils/request";
import "./flight-tickets.scss";

function FlightTickets(props: any) {
  const flightReference = useParams().reference || "";
  const [loading, setLoading] = useState(0);
  const [flightDetails, setFlightDetails] = useState<any>({
    outbound: [],
    inbound: [],
  });

  const getFlightDetails = () => {
    setLoading(0);

    sendRequest(
      {
        url: "flight/flight-booking-details/" + flightReference,
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

  useEffect(() => {
    getFlightDetails();
    window.scrollTo(0, 0);
  }, [props]);

  return (
    <div className="flight-tickets">
      <h1>Flight Ticket Page</h1>
      <h1>Flight Ticket Page</h1>
    </div>
  );
}

export default FlightTickets;
