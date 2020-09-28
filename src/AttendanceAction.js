import React, { useState } from 'react'
import './AttendanceAction.css'
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Button, Checkbox } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));



function AttendanceAction({ _checked, attendanceType, ...props }) {
    const classes = useStyles();
    // const [checked, setChecked] = useState(_checked)

    // const handleChange = (e) => {
    //     setChecked(e.target.checked)
    //     props.onClick(e.target.checked)
    // }

    return (
        <div className='attendanceAction'>
            {/* <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} />} 
                label={attendanceType == '1' ? 'Đã tới đủ' : 'Đã về đủ'} /> */}
            <Button
                variant="contained"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />} >Lưu
            </Button>
        </div>
    )
}

export default AttendanceAction
