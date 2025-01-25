import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAirport,
  setAirport,
} from "../../../services/actions-reducers/airport-list";
import {
  getShortlet,
  setShortlet,
} from "../../../services/actions-reducers/shortlet-data";
import { userLogin } from "../../../services/actions-reducers/user-data";

function UtilityDatALoader(props: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAirport());
    dispatch(getShortlet());
    // setTimeout(() => dispatch(setAirport([{name: 'agric'}, {name: 'industry'}])), 6000)
    // setTimeout(() => {
    //   dispatch(userLogin({
    //     email: "dapo@gmail2.com",
    //     email_verified: true,
    //     first_name: "Dapo",
    //     id: "660c7198416cb352ca010e40",
    //     last_name: "Ogunlana",
    //   }))
    // }, 3000000);
  }, [props]);

  return <></>;
}
export default UtilityDatALoader;
