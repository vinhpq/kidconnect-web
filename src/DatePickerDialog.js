import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange, DateRangePicker } from "react-date-range";
import { makeStyles } from "@material-ui/core";
import vi from "date-fns/locale/vi";

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    left: 0,
    top: 90,
  },
});

function DatePickerDialog({ open, ...props }) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    // console.log(ranges.selection)
  }

  const handleClose = (e) => {
    // console.log('handleClose', e.currentTarget.value)
    props.onClose(e.currentTarget.value, startDate, endDate);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      classes={{
        paper: classes.dialog,
      }}
      // scroll={'paper'}
    >
      {/* <DialogTitle>Chọn khoảng thời gian</DialogTitle> */}
      <DialogActions>
        <Button value={0} onClick={handleClose} color="primary">
          OK
        </Button>
        <Button value={1} onClick={handleClose} color="primary">
          Hủy
        </Button>
      </DialogActions>
      <DialogContent>
        <DateRange
          months={2}
          ranges={[selectionRange]}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          fixedHeight={true}
          // showDateDisplay={false}
          locale={vi}
          // direction="horizontal"
          // scroll={{
          //   enabled: true,
          // }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default DatePickerDialog;
