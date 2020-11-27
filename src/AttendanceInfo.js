import React from "react";
import "./AttendanceInfo.css";
import { Button } from "@material-ui/core";
import {
  ATTENDANCE_TYPE_PICKUP,
  FILTER_OPTION_ALL,
  FILTER_OPTION_NOT_ARRIVED,
  FILTER_OPTION_ARRIVED,
  FILTER_OPTION_ABSENCE,
  // FILTER_OPTION_NOT_LEAVED,
  FILTER_OPTION_LEAVED,
  FILTER_OPTION_PICKUP_LATE,
} from "./types";

function AttendanceInfo({ total, attendanceType, attendanceInfo, ...props }) {
  const handleClick = (e) => {
    e.preventDefault();
    props.onClick(parseInt(e.currentTarget.id));
  };

  return (
    <div className="attendanceInfo">
      {attendanceType == ATTENDANCE_TYPE_PICKUP ? (
        <>
          <Button
            id={FILTER_OPTION_ALL}
            variant="outlined"
            onClick={handleClick}
          >
            <div className="attendanceInfo__infoText">
              <span className="attendanceInfo__infoTextLineOne"> Sĩ số </span>
              <span className="attendanceInfo__infoTextLineTwo"> {total} </span>
            </div>
          </Button>
          <Button
            id={FILTER_OPTION_NOT_ARRIVED}
            variant="outlined"
            color="secondary"
            onClick={handleClick}
          >
            <div className="attendanceInfo__infoText">
              <span className="attendanceInfo__infoTextLineOne">Chưa tới</span>
              <span className="attendanceInfo__infoTextLineTwo">
                {attendanceInfo.notArrivedNum}
              </span>
            </div>
          </Button>
          <Button
            id={FILTER_OPTION_ARRIVED}
            variant="outlined"
            color="primary"
            onClick={handleClick}
          >
            <div className="attendanceInfo__infoText">
              <span className="attendanceInfo__infoTextLineOne"> Đã tới </span>
              <span className="attendanceInfo__infoTextLineTwo">
                {attendanceInfo.arrivedNum +
                  attendanceInfo.leavedNum +
                  attendanceInfo.pickedUpLateNum}
              </span>
            </div>
          </Button>
          <Button
            id={FILTER_OPTION_ABSENCE}
            variant="outlined"
            onClick={handleClick}
          >
            <div className="attendanceInfo__infoText">
              <span className="attendanceInfo__infoTextLineOne">Báo nghỉ</span>
              <span className="attendanceInfo__infoTextLineTwo">
                {attendanceInfo.absenceNum}
              </span>
            </div>
          </Button>
        </>
      ) : (
        <>
          <Button
            id={FILTER_OPTION_ALL}
            variant="outlined"
            color="secondary"
            onClick={handleClick}
          >
            <div className="attendanceInfo__infoText">
              <span className="attendanceInfo__infoTextLineOne">Tổng </span>
              <span className="attendanceInfo__infoTextLineTwo">
                {" "}
                {attendanceInfo.arrivedNum +
                  attendanceInfo.leavedNum +
                  attendanceInfo.pickedUpLateNum}{" "}
              </span>
            </div>
          </Button>
          <Button
            id={FILTER_OPTION_ARRIVED}
            variant="outlined"
            color="primary"
            onClick={handleClick}
          >
            <div className="attendanceInfo__infoText">
              <span className="attendanceInfo__infoTextLineOne"> Chưa về </span>
              <span className="attendanceInfo__infoTextLineTwo">
                {attendanceInfo.arrivedNum}
              </span>
            </div>
          </Button>
          <Button
            id={FILTER_OPTION_LEAVED}
            variant="outlined"
            color="primary"
            onClick={handleClick}
          >
            <div className="attendanceInfo__infoText">
              <span className="attendanceInfo__infoTextLineOne"> Đã về </span>
              <span className="attendanceInfo__infoTextLineTwo">
                {attendanceInfo.leavedNum}
              </span>
            </div>
          </Button>
          <Button
            id={FILTER_OPTION_PICKUP_LATE}
            variant="outlined"
            onClick={handleClick}
          >
            <div className="attendanceInfo__infoText">
              <span className="attendanceInfo__infoTextLineOne">Đón muộn</span>
              <span className="attendanceInfo__infoTextLineTwo">
                {attendanceInfo.pickedUpLateNum}
              </span>
            </div>
          </Button>
        </>
      )}
    </div>
  );
}

export default AttendanceInfo;
