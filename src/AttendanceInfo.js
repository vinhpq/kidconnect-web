import React from "react";
import "./AttendanceInfo.css";
import { Button } from "@material-ui/core";
import {
  ATTENDANCE_TYPE_PICKUP,
  FILTER_OPTION_ALL,
  FILTER_OPTION_NOT_ARRIVED,
  FILTER_OPTION_ARRIVED,
  FILTER_OPTION_ABSENCE,
  FILTER_OPTION_NOT_LEAVED,
  FILTER_OPTION_LEAVED,
  FILTER_OPTION_PICKUP_LATE,
} from "./types";

function AttendanceInfo({ attendanceType, attendanceInfo, filter, ...props }) {
  const handleClick = (e) => {
    e.preventDefault();
    props.onClick(parseInt(e.currentTarget.id));
  };

  return (
    <div className="attendanceInfo">
      <Button
        id={FILTER_OPTION_ALL}
        variant="outlined"
        onClick={handleClick}
        style={filter === FILTER_OPTION_ALL ? { borderTop: '2px solid' } : null}
      >
        <div className="attendanceInfo__infoText">
          <span className="attendanceInfo__infoTextLineOne"> {attendanceType === ATTENDANCE_TYPE_PICKUP ? "Sĩ số " : "Tổng"}</span>
          <span className="attendanceInfo__infoTextLineTwo"> {attendanceInfo.total}</span>
        </div>
      </Button>
      <Button
        className="attendanceInfo--border"
        id={attendanceType === ATTENDANCE_TYPE_PICKUP ? FILTER_OPTION_NOT_ARRIVED : FILTER_OPTION_NOT_LEAVED}
        variant="outlined"
        color="secondary"
        onClick={handleClick}
        style={filter === FILTER_OPTION_NOT_ARRIVED || filter === FILTER_OPTION_NOT_LEAVED ? { borderTop: '2px solid' } : null}
      >
        <div className="attendanceInfo__infoText">
          <span className="attendanceInfo__infoTextLineOne">{attendanceType === ATTENDANCE_TYPE_PICKUP ? "Chưa tới" : "Chưa về"}</span>
          <span className="attendanceInfo__infoTextLineTwo">{attendanceInfo.info1}</span>
        </div>
      </Button>
      <Button
        className="attendanceInfo--border"
        id={attendanceType === ATTENDANCE_TYPE_PICKUP ? FILTER_OPTION_ARRIVED : FILTER_OPTION_LEAVED}
        variant="outlined"
        color="primary"
        onClick={handleClick}
        style={( attendanceType === ATTENDANCE_TYPE_PICKUP && filter === FILTER_OPTION_ARRIVED ) || filter === FILTER_OPTION_LEAVED ? 
                { borderTop: '2px solid' } : 
                null}
      >
        <div className="attendanceInfo__infoText">
          <span className="attendanceInfo__infoTextLineOne"> {attendanceType === ATTENDANCE_TYPE_PICKUP ? "Đã tới" : "Đã về"}</span>
          <span className="attendanceInfo__infoTextLineTwo">{attendanceInfo.info2}</span>
        </div>
      </Button>
      <Button
        className="attendanceInfo--border"
        id={attendanceType === ATTENDANCE_TYPE_PICKUP ? FILTER_OPTION_ABSENCE : FILTER_OPTION_PICKUP_LATE}
        variant="outlined"
        onClick={handleClick}
        style={filter === FILTER_OPTION_ABSENCE || filter === FILTER_OPTION_PICKUP_LATE ? { borderTop: '2px solid' } : null}
      >
        <div className="attendanceInfo__infoText">
          <span className="attendanceInfo__infoTextLineOne">{attendanceType === ATTENDANCE_TYPE_PICKUP ? "Báo nghỉ" : "Đón muộn"}</span>
          <span className="attendanceInfo__infoTextLineTwo">{attendanceInfo.info3}</span>
        </div>
      </Button>
    </div>
  );
}

export default AttendanceInfo;
