import React, { useState } from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import "./AttendanceCard.css"

function AttendanceCard({ status, kidId, kidName, kidNickname, kidImage }) {

    const [value, setValue] = useState(status.toString())

    const handleChange = (e) => {
        console.log('e.target.value >>>', e.target.value)
        setValue(e.target.value);
    }

    return (
        <Card>
            <CardContent className="attendanceCard">
                <img src={kidImage} alt={kidName} />
                <h2>{kidName}</h2>
                <p>{kidNickname}</p>

                {/* <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2> */}

                <FormControl component="fieldset">
                    <RadioGroup row value={value} onChange={handleChange}>
                        <FormControlLabel value="1" control={<Radio />} label="Đã tới"/>
                        <FormControlLabel value="0" control={<Radio />} label="Chưa tới" />
                        <FormControlLabel value="2" control={<Radio />} label="Báo nghỉ"/>
                    </RadioGroup>
                </FormControl>
                
            </CardContent>
        </Card>
    )
}

export default AttendanceCard
