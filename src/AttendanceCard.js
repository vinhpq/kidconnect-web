import React, { useState } from 'react'
import { Card, CardContent, Avatar } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import "./AttendanceCard.css"

function AttendanceCard({ attendanceType, status, kidId, docId, kidName, kidNickname, kidImage, ...props }) {

    const [value, setValue] = useState(status)

    const handleChange = (e) => {
        e.preventDefault()
        setValue(parseInt(e.target.value));
        props.onClick(docId, parseInt(e.target.value));
    }

    return (
        <Card>
            <CardContent className="attendanceCard">
                <div className="attendanceCard__info">
                    <Avatar src={kidImage} alt={kidName} />
                    <div className="attendanceCard__name">
                        <h2>{kidName}</h2>
                        <p>{kidNickname}</p>
                    </div>
                </div>
                
                

                {/* <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2> */}
                {
                    attendanceType == '1' ? (
                        <div className='attendanceCard__data'>
                            <FormControl component="fieldset">
                                <RadioGroup row value={value} onChange={handleChange} name={kidId}>
                                    <FormControlLabel value={1} control={<Radio />} label="Đã tới"/>
                                    <FormControlLabel value={0} control={<Radio />} label="Chưa tới" />
                                    <FormControlLabel value={2} control={<Radio />} label="Báo nghỉ"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    ) : (
                        <div className='attendanceCard__data'>
                            <FormControl component="fieldset">
                                <RadioGroup row value={value} onChange={handleChange}>
                                    <FormControlLabel value={1} control={<Radio />} label="Chưa về"/>
                                    <FormControlLabel value={3} control={<Radio />} label="Đã về" />
                                    <FormControlLabel value={4} control={<Radio />} label="Đón muộn"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    )
                }
            </CardContent>
        </Card>
    )
}

export default AttendanceCard
