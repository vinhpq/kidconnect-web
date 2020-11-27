import React, { useState } from "react";
import { Card, CardContent, Avatar } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import "./AttendanceCard.css";
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

function AttendanceCard({
  attendanceType,
  disablePickUp,
  disableLeave,
  status,
  kidId,
  docId,
  kidName,
  kidNickname,
  kidImage,
  className,
  ...props
}) {
  // const [value, setValue] = useState(status)

  const handleChange = (e) => {
    // e.preventDefault()
    // setValue(parseInt(e.target.value));
    props.onClick(docId, parseInt(e.target.value));
  };

  return (
    <Card>
      <CardContent className="attendanceCard">
        <div className="attendanceCard__info">
          <Avatar src={kidImage} alt={kidName} />
          <div className="attendanceCard__name">
            <h2> {kidName} </h2>
            <p>
              {className} {kidNickname ? `(${kidNickname})` : ""}
            </p>
          </div>
        </div>
        {/* <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2> */}
        {attendanceType == ATTENDANCE_TYPE_PICKUP ? (
          <div className="attendanceCard__data">
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={status < 2 ? status : FILTER_OPTION_ARRIVED}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={FILTER_OPTION_ARRIVED}
                  control={<Radio />}
                  label="Đã tới"
                  disabled={disablePickUp}
                />
                <FormControlLabel
                  value={FILTER_OPTION_NOT_ARRIVED}
                  control={<Radio />}
                  label="Chưa tới"
                  disabled={disablePickUp}
                />
                <FormControlLabel
                  value={FILTER_OPTION_ABSENCE}
                  control={<Radio />}
                  label="Báo nghỉ"
                  disabled={disablePickUp}
                />
              </RadioGroup>
            </FormControl>
          </div>
        ) : (
          <div className="attendanceCard__data">
            <FormControl component="fieldset">
              <RadioGroup row value={status} onChange={handleChange}>
                <FormControlLabel
                  value={FILTER_OPTION_ARRIVED}
                  control={<Radio />}
                  label="Chưa về"
                  disabled={disableLeave}
                />
                <FormControlLabel
                  value={FILTER_OPTION_LEAVED}
                  control={<Radio />}
                  label="Đã về"
                  disabled={disableLeave}
                />
                <FormControlLabel
                  value={FILTER_OPTION_PICKUP_LATE}
                  control={<Radio />}
                  label="Đón muộn"
                  disabled={disableLeave}
                />
              </RadioGroup>
            </FormControl>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AttendanceCard;
