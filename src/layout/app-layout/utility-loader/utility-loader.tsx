import React from "react";
import { useFetchAirportsQuery } from "../../../store/apis/flights";
import { useFetchShortletsLocationsQuery } from "../../../store/apis/shortlets";

function UtilityDatALoader(props: any) {
  const { data: airportData } = useFetchAirportsQuery();
  const { data: shortletsData } = useFetchShortletsLocationsQuery();

  console.log({ airportData, shortletsData });

  return <></>;
}
export default UtilityDatALoader;
