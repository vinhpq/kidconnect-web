import React from 'react'
import './AttendanceInfo.css'
import { Button } from "@material-ui/core"

function AttendanceInfo({ total, attendanceType, attendanceInfo, ...props }) {

    const handleClick = (e) => {
        props.onClick(parseInt(e.currentTarget.id));
    }

    return (
        <div className='attendanceInfo'>
            {attendanceType == '1' ? (
                <>
                    <Button id={1000} variant="outlined" onClick={handleClick}>
                        <div className="attendanceInfo__infoText">
                            <span className="attendanceInfo__infoTextLineOne">Tổng</span>
                            <span className="attendanceInfo__infoTextLineTwo">{total}</span>
                        </div>
                    </Button>
                    
                    <Button id={0} variant="outlined" color="secondary" onClick={handleClick}>
                        <div className="attendanceInfo__infoText">
                            <span className="attendanceInfo__infoTextLineOne">Chưa tới</span>
                            <span className="attendanceInfo__infoTextLineTwo">{attendanceInfo.notArrivedNum}</span>
                        </div> 
                    </Button>
                    <Button id={1} variant="outlined" color="primary" onClick={handleClick}>
                        <div className="attendanceInfo__infoText">
                            <span className="attendanceInfo__infoTextLineOne">Đã tới</span>
                            <span className="attendanceInfo__infoTextLineTwo">{attendanceInfo.arrivedNum}</span>
                        </div>
                    </Button>
                    
                    <Button id={2} variant="outlined" onClick={handleClick} >
                        <div className="attendanceInfo__infoText">
                            <span className="attendanceInfo__infoTextLineOne">Báo nghỉ</span>
                            <span className="attendanceInfo__infoTextLineTwo">{attendanceInfo.absenceNum}</span>
                        </div>
                    </Button>
                </>
                    
                     ) :
                (
                    <>
                        <Button id={1} variant="outlined" color="secondary" onClick={handleClick}>
                            <div className="attendanceInfo__infoText">
                                <span className="attendanceInfo__infoTextLineOne">Tổng</span>
                                <span className="attendanceInfo__infoTextLineTwo">{attendanceInfo.arrivedNum}</span>
                            </div> 
                        </Button>
                        <Button id={3} variant="outlined" color="primary" onClick={handleClick}>
                            <div className="attendanceInfo__infoText">
                                <span className="attendanceInfo__infoTextLineOne">Đã về</span>
                                <span className="attendanceInfo__infoTextLineTwo">{attendanceInfo.leavedNum}</span>
                            </div>
                        </Button>
                        
                        <Button id={4} variant="outlined" onClick={handleClick} >
                            <div className="attendanceInfo__infoText">
                                <span className="attendanceInfo__infoTextLineOne">Đón muộn</span>
                                <span className="attendanceInfo__infoTextLineTwo">{attendanceInfo.pickedUpLateNum}</span>
                            </div>
                        </Button>
                    </>
                )
            }
            
        </div>
    )
}

export default AttendanceInfo
