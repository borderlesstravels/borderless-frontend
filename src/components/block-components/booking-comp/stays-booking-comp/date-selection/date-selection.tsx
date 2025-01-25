import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, FormikValues } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  clipToLength,
  formatDate,
  formatDateMini,
  generateDateRestriction,
} from "../../../../../services/utils/data-manipulation-utilits";
import AppPopup from "../../../app-popup/app-popup";
import { DateRangePicker, Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./date-selection.scss";
import {
  IDateData,
  storedCombinedStayData,
} from "../../../../../services/utils/stay-booking-service";

interface iDateProps {
  setDate: Function;
  date?: IDateData;
}

function DateSelectionComp(props: iDateProps) {
  const [showPopup, setShowPopup] = useState<0 | 1 | 2>(0);
  const [initialized, setInitialized] = useState(false);
  const [selectionRange, setSelectionRange] = useState<IDateData>(
    props.date?.startDate
      ? props.date
      : { startDate: new Date(), endDate: new Date(), key: "selection" }
  );
  const [confirmedSelectionRange, setConfirmedSelectionRange] =
    useState<IDateData>(
      props.date || {
        startDate: undefined,
        endDate: undefined,
        key: "selection",
      }
    );
  const [activeDate, setActiveDate] = useState(false);

  const toggleShowPopup = (status?: 0 | 1 | 2) => {
    setShowPopup(status || 0);
  };
  const monthDisplayCount = window.innerWidth > 991 ? 2 : 1;

  const handleRangeSelect = (ranges: any) => {
    setSelectionRange(ranges.selection);
    setActiveDate(ranges.selection.startDate !== ranges.selection.endDate);
    if (ranges.selection.startDate !== ranges.selection.endDate) {
      setConfirmedSelectionRange(ranges.selection);
    } else {
      setConfirmedSelectionRange({
        startDate: undefined,
        endDate: undefined,
        key: "selection",
      });
    }
  };
  const resetDates = () => {
    setSelectionRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
    setConfirmedSelectionRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    });
    setActiveDate(false);
  };

  const confirmDate = () => {
    toggleShowPopup(1);
  };

  useEffect(() => {
    setTimeout(() => {
      setInitialized(true);
    }, 1000);
  });

  useEffect(() => {
    if (initialized) {
      props.setDate(confirmedSelectionRange);
    }
  }, [confirmedSelectionRange]);

  console.log({ monthDisplayCount, selectionRange });

  return (
    <div className="pt-3 pb-2">
      <AppPopup
        switch={
          <div
            className="selector2"
            onClick={() => toggleShowPopup(2)}
            title={`${formatDate(
              confirmedSelectionRange.startDate,
              "..."
            )} - ${formatDate(confirmedSelectionRange.endDate, "...")}`}
          >
            <div className="label">
              <span>
                Check in{" "}
                <FontAwesomeIcon icon={"sort-down"} className="uplift-arrow" />
                <span className="px-3"></span>
                Check out{" "}
                <FontAwesomeIcon icon={"sort-down"} className="uplift-arrow" />
              </span>
            </div>
            <p className="mb-0">
              <span>
                {formatDateMini(confirmedSelectionRange.startDate, "...")} -{" "}
                {formatDateMini(confirmedSelectionRange.endDate, "...")}
              </span>
            </p>
            <FontAwesomeIcon icon={"calendar-alt"} className="fainter-tx" />
          </div>
        }
        switchClass="w100-flat"
        showPopup={showPopup}
        onClosePopup={() => toggleShowPopup()}
      >
        <div className="date-case">
          <div className="range-holder">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleRangeSelect}
              months={monthDisplayCount}
              direction="horizontal"
              minDate={new Date(generateDateRestriction(0, 0, 1))}
            />
          </div>
          <div className="text-center">
            {activeDate && (
              <>
                <button className="reset-button" onClick={resetDates}>
                  Reset Date
                </button>
                &nbsp; &nbsp;
                <button className="reset-button" onClick={confirmDate}>
                  Ok
                </button>
              </>
            )}
          </div>
        </div>
      </AppPopup>
    </div>
  );
}

export default DateSelectionComp;
