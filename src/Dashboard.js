import React, { useState, useEffect } from 'react'
import SearchIcon from "@material-ui/icons/Search"
import "./Dashboard.css"
import { MenuItem, FormControlLabel, FormControl, FormLabel, Select, IconButton, Button, RadioGroup, Radio } from "@material-ui/core";
import AttendanceCard from "./AttendanceCard"
import db from "./firebase"
import { classInfoTest, kidInfoTest, kidStatusTest } from "./Testdata"





function Dashboard() {
    const [classes, setClasses] = useState(classInfoTest);
    const [classId, setClassId] = useState('classAll');
    const [attendances, setAttendances] = useState(kidStatusTest);
    const [kids, setKids] = useState(kidInfoTest);
    const [total, setTotal] = useState('');
    const [arrived, setArrived] = useState('');
    const [not_arrived, setNotArrived] = useState('');
    const [absentNotice, setAbsentNotice] = useState('');
    const [checkAttendanceType, setCheckAttendanceType] = useState('arrive')

    const onClassChange = (event) => {
        console.log('Event value >>> ', event.target.value)

        const filteredClassId = event.target.value === 'classAll' ? kidStatusTest : kidStatusTest.filter(item => item.classId === event.target.value)

        setClassId(event.target.value);

        // console.log('Filtered >>>', filteredClassId)
        

        setTotal(filteredClassId.length);
        setNotArrived(filteredClassId.filter(item => item.status === 0).length)
        setArrived(filteredClassId.filter(item => item.status === 1).length)
        setAbsentNotice(filteredClassId.filter(item => item.status === 3).length)
        
        setAttendances(filteredClassId);
    }

    useEffect(() => {
        
        const not_arrived = kidStatusTest.filter(item => item.status === 0);
        const arrived = kidStatusTest.filter(item => item.status === 1);
        const absentNotice = kidStatusTest.filter(item => item.status === 3);

        console.log("Initial attendance status >>> ", kidStatusTest.length, not_arrived, arrived, absentNotice)

        setTotal(kidStatusTest.length);
        setNotArrived(not_arrived.length)
        setArrived(arrived.length)
        setAbsentNotice(absentNotice.length)

        
    },[])

    const searchChange = (event) => {
        console.log('event >>', event.target.value)
        const filteredKidId = kidInfoTest.filter(item => {
            return item.name.toLowerCase().includes(event.target.value.toLowerCase())
        }).map(item => item.kidId)
        
        // console.log('filteredClass >>>', filteredKidId)
        // console.log('attendances >>>', attendances)

        const filteredStatus = attendances?.filter(item => {
            return filteredKidId.includes(item.kidId);
        })

        console.log('filteredStatus >>>', filteredStatus)
        setAttendances(filteredStatus);
        
        
    }

    const onCheckAttendanceTypeChange = (event) => {
        console.log('onCheckTypeChange >>>', event.target.value)
    }


    // useEffect(() => {
    //     db
    //         .collection('School')
    //         .doc('irKMMhRi62L5zljT7qc7')
    //         .collection('KidAttendance')
    //         .onSnapshot(snapshot => {
    //             // console.log(snapshot.docs.map(doc => doc.data()));
    //             setAttendances(snapshot.docs.map(doc => ({
    //                 classId: doc.data().classId,
    //                 kidId: doc.data().kidId,
    //                 status: doc.data().status,
    //             })));
    //     })        
    // }, []);

    // useEffect(() => {
    //     db
    //         .collection('School')
    //         .doc('irKMMhRi62L5zljT7qc7')
    //         .collection('Kid')
    //         .onSnapshot(snapshot => {
    //             // console.log(snapshot.docs.map(doc => doc.data()));
    //             setKids(snapshot.docs.map(doc => ({
    //                 kidId: doc.data().kidId,
    //                 name: doc.data().name,
    //                 nickname: doc.data().nickname,
    //             })));
    //     })
        
    // }, []);

    // useEffect(() => {
    //     db
    //         .collection('School')
    //         .doc('irKMMhRi62L5zljT7qc7')
    //         .collection('Class')
    //         .onSnapshot(snapshot => {
    //             // console.log(snapshot.docs.map(doc => doc.data()));
    //             setClasses(snapshot.docs.map(doc => ({
    //                 name: doc.data().name
    //             })));
    //     })
        
    // }, []);

    // console.log('KIDS attendance >>>>>>>', attendances);
    // console.log('KIDS info', kids)

    const getMapFromArray = data => data.reduce((acc, item) => {
        acc[item.kidId] = {name: item.name, nickname: item.nickname};
        return acc;
    }, {})

    const kidsInfo = getMapFromArray(kids);
    // console.log('KIDS AFTER >>>>>>>', kidsInfo['HD200']?.name);

    return (
        <div className='dashboard'>

            <div className="dashboard__option">
                <div className="dashboard__info">
                    <div className="dashboard__infoText">
                        <span className="dashboard__infoTextLineOne">Tổng:</span>
                        <span className="dashboard__infoTextLineTwo">{total}</span>
                    </div>

                    <div className="dashboard__infoText">
                        <span className="dashboard__infoTextLineOne">Đã tới:</span>
                        <span className="dashboard__infoTextLineTwo">{arrived}</span>
                    </div>

                    <div className="dashboard__infoText">
                        <span className="dashboard__infoTextLineOne">Chưa tới:</span>
                        <span className="dashboard__infoTextLineTwo">{not_arrived}</span>
                    </div>

                    <div className="dashboard__infoText">
                        <span className="dashboard__infoTextLineOne">Báo nghỉ:</span>
                        <span className="dashboard__infoTextLineTwo">{absentNotice}</span>
                    </div>
                </div>

                <div className="dashboard__control">

                    {/* <div className="dashboard__search">
                        <input 
                            className="dashboard__searchInput" 
                            type="text" 
                            placeholder='Tìm kiếm'
                            onChange={searchChange} />
                        <SearchIcon className='dashboard__searchIcon' />
                    </div> */}

                    <Select className='dashboard__selectControl' varian="outlined" onChange={onCheckAttendanceTypeChange} value={checkAttendanceType} >
                        <MenuItem value="arrive">Điểm danh đón</MenuItem>
                        <MenuItem value="leave">Điểm danh về</MenuItem>
                    
                    </Select>
                
                    <Select className='dashboard__selectControl' varian="outlined" onChange={onClassChange} value={classId} >
                        <MenuItem value="classAll">Hiển thị toàn trường</MenuItem>
                        {classes.map((item) => (
                            <MenuItem value={item.classId}>{item.name}</MenuItem>
                        ))}
                    
                    </Select>

                    <div className='dashboard__button'>
                        <Button type="submit">Đồng bộ</Button>
                    </div>
                </div>
            </div>

            <div className="dashboard__attendanceCard">
                {attendances?.map(({ status, kidId, classId }) => (
                        <AttendanceCard 
                            status={status}
                            kidId={kidId}
                            kidName={kidsInfo[`${kidId}`]?.name}
                            kidNickname={kidsInfo[`${kidId}`]?.nickname}
                            kidImage='https://ca.slack-edge.com/TN44SBSKE-UMRR4P6US-e39c5c386636-512'
                        />
                    ))} 
            </div>
        </div>
    )
}

export default Dashboard
