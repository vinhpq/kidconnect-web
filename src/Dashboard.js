import React, { useState, useEffect } from 'react'
import SearchIcon from "@material-ui/icons/Search"
import "./Dashboard.css"
import { MenuItem, FormControlLabel, FormControl, FormLabel, Select, IconButton, Button, FormGroup, RadioGroup, Radio, Checkbox } from "@material-ui/core";
import AttendanceCard from "./AttendanceCard"
import db from "./firebase"
import { classInfoTest, kidInfoTest, kidStatusTest } from "./Testdata"
import FilterBox from "./FilterBox"
import SyncIcon from '@material-ui/icons/Sync';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AttendanceInfo from './AttendanceInfo';
import AttendanceAction from './AttendanceAction';

function Dashboard() {
    const [classInfo, setClasseInfo] = useState(classInfoTest);
    const [classId, setClassId] = useState(0);
    const [kidInfo, setKidInfo] = useState([kidInfoTest]);
    const [checkAttendanceType, setCheckAttendanceType] = useState('1')
    const [attendanceInfo, setAttendanceInfo] = useState([])
    const [currentFilterOption, setCurrentFilterOption] = useState(1000);
    const [classTotal, setClassTotal] = useState(0)
    
    // const getMapFromArray = data => data.reduce((acc, item) => {
    //     acc[item.kidId] = {name: item.name, nickname: item.nickname};
    //     return acc;
    // }, {})

    // useEffect(() => {
    //     db
    //         .collection('School')
    //         .doc('irKMMhRi62L5zljT7qc7')
    //         .collection('Kid')
    //         .where('status', 'in', [0, 2])
    //         .onSnapshot(snapshot => {
    //             // console.log('Kid >>>', snapshot.docs.map(doc => doc.data()));
    //             setKidInfo(snapshot.docs.map(doc => ({
    //                 kidId: doc.data().kidId,
    //                 name: doc.data().name,
    //                 nickname: doc.data().nickName,
    //                 classId: doc.data().classId,
    //                 attendanceStatus: doc.data().activeStatus,
    //                 activeStatus: doc.data().status,
    //             })));
    //     })
        
    // }, []); 

    // useEffect(() => {
    //     db
    //         .collection('School')
    //         .doc('irKMMhRi62L5zljT7qc7')
    //         .collection('Class')
    //         .onSnapshot(snapshot => {
    //             console.log('Class >>>', snapshot.docs.map(doc => doc.data()));
    //             setClasses(snapshot.docs.map(doc => ({
    //                 classId: doc.data().classId,
    //                 name: doc.data().name,
    //                 total: doc.data().count
    //             })));
    //     })
        
    // }, []);
    
    // console.log('KIDINFO >>>', kidInfo)

    useEffect(() => {
        const kidInfoByClass = kidInfoTest.filter(item => item.classId === classId)

        setClassId(classId);
        setKidInfo(kidInfoByClass);
        setClassTotal(kidInfoByClass.length)
        
        setAttendanceInfo({
            arrivedNum: kidInfoByClass.filter(item => item.attendanceStatus === 1).length,
            notArrivedNum: kidInfoByClass.filter(item => item.attendanceStatus === 0).length,
            absenceNum: kidInfoByClass.filter(item => item.attendanceStatus === 2).length,
            notLeavedNum: kidInfoByClass.filter(item => item.attendanceStatus === 1).length,
            leavedNum: kidInfoByClass.filter(item => item.attendanceStatus === 3).length,
            pickedUpLateNum: kidInfoByClass.filter(item => item.attendanceStatus === 4).length,
        })
    },[])


    const onClassChange = (event) => {
        console.log('onClassChange Event value >>> ', event.target.value)

        const kidInfoByClass = event.target.value === 'classAll' ? kidInfoTest : kidInfoTest.filter(item => item.classId === event.target.value)

        setClassId(event.target.value);
        setKidInfo(kidInfoByClass);
        setClassTotal(kidInfoByClass.length)

        setAttendanceInfo({
            arrivedNum: kidInfoByClass.filter(item => item.attendanceStatus === 1).length,
            notArrivedNum: kidInfoByClass.filter(item => item.attendanceStatus === 0).length,
            absenceNum: kidInfoByClass.filter(item => item.attendanceStatus === 2).length,
            notLeavedNum: kidInfoByClass.filter(item => item.attendanceStatus === 1).length,
            leavedNum: kidInfoByClass.filter(item => item.attendanceStatus === 3).length,
            pickedUpLateNum: kidInfoByClass.filter(item => item.attendanceStatus === 4).length,
        })
    }
    

    const onCheckAttendanceTypeChange = (event) => {
        console.log('onCheckAttendanceTypeChange >>>', event.target.value)
        
        setCheckAttendanceType(event.target.value)
        setCurrentFilterOption(1000);
    }

    const setFilterOption = (filterStatusValue) => {
        console.log('setFilterOption filterStatusValue >>>', filterStatusValue)

        const kidInfoByClass = classId === 'classAll' ? kidInfoTest : kidInfoTest.filter(item => item.classId === classId)
        const updatedKidStatus = filterStatusValue === 1000 ? kidInfoByClass : kidInfoByClass.filter(item => item.attendanceStatus === filterStatusValue)

        // Set AttendanceCard display
        setKidInfo(updatedKidStatus);
        setCurrentFilterOption(filterStatusValue);
    }

    const handleAttendanceStatusChange = (kidId, value) => {
        console.log('handleAttendanceStatusChange >>> ', kidId, value)

        const kidInfoByClass = classId === 'classAll' ? kidInfoTest : kidInfoTest.filter(item => item.classId === classId)
        

        const updatedKidInfo = kidInfoByClass.map(item => {
            if (item.classId === classId && item.kidId === kidId) {
                item.attendanceStatus = value;
            }

            return item;
        })

        // Set AttendanceCard display
        setKidInfo(currentFilterOption === 1000 ? updatedKidInfo : updatedKidInfo.filter(item => item.attendanceStatus === currentFilterOption))

        // Set AttendanceInfo display
        setAttendanceInfo({
            arrivedNum: updatedKidInfo.filter(item => item.attendanceStatus === 1).length,
            notArrivedNum: updatedKidInfo.filter(item => item.attendanceStatus === 0).length,
            absenceNum: updatedKidInfo.filter(item => item.attendanceStatus === 2).length,
            notLeavedNum: updatedKidInfo.filter(item => item.attendanceStatus === 1).length,
            leavedNum: updatedKidInfo.filter(item => item.attendanceStatus === 3).length,
            pickedUpLateNum: updatedKidInfo.filter(item => item.attendanceStatus === 4).length,
        })
    }

    // const setCheckOption = (e) => {
    //     console.log('setCheckOption >>> ', e)
    // }

    // useEffect(() => {
    //     db
    //         .collection('School')
    //         .doc('irKMMhRi62L5zljT7qc7')
    //         .collection('KidAttendance')
    //         .orderBy('classId')
    //         .onSnapshot(snapshot => {
    //             console.log('KidAttendance >>> ', snapshot.docs.map(doc => doc.data()));
    //             setKidStatus(snapshot.docs.map(doc => ({
    //                 classId: doc.data().classId,
    //                 kidId: doc.data().kidId,
    //                 status: doc.data().status,
    //             })));
    //     })        
    // }, []);


    // console.log('KIDINFO >>>', kidInfo)
    // console.log('classTotal: ', classTotal)
    

    return (
        <div className='dashboard'>

            <div className="dashboard__option">

                <div className="dashboard__control">
                    
                    <Select className='dashboard__selectControl' varian="outlined" onChange={onCheckAttendanceTypeChange} value={checkAttendanceType} >
                        <MenuItem value="1">Điểm danh đón</MenuItem>
                        <MenuItem value="0">Điểm danh về</MenuItem>
                    
                    </Select>                                
                    <Select className='dashboard__selectControl' varian="outlined" onChange={onClassChange} value={classId} >
                        {classInfo.map((item) => (
                            <MenuItem key={item.classId} value={item.classId}>{item.name}</MenuItem>
                        ))}
                        <MenuItem value="classAll">Hiển thị toàn trường</MenuItem>
                    
                    </Select>
                </div>

                <div className="dashboard__info">
                    <AttendanceInfo
                        attendanceType={checkAttendanceType}
                        onClick={e => setFilterOption(e)}
                        attendanceInfo={attendanceInfo}
                        total={classTotal}
                    />
                </div>

                {/* <AttendanceAction
                    checked={attendanceInfo.total === attendanceInfo.arrivedNum || attendanceInfo.total === attendanceInfo.leavedNum}
                    attendanceType={checkAttendanceType}
                /> */}
            </div>

            <div className="dashboard__attendanceCard">
                {kidInfo?.map(({ attendanceStatus, kidId, name, nickname }) => (
                        <AttendanceCard
                            key={kidId}
                            attendanceType={checkAttendanceType}
                            onClick={(p, e) => handleAttendanceStatusChange(p, e)}
                            status={attendanceStatus}
                            kidId={kidId}
                            kidName={name}
                            kidNickname={nickname}
                            kidImage='https://ca.slack-edge.com/TN44SBSKE-UMRR4P6US-e39c5c386636-512'
                        />
                    ))} 
            </div>
        </div>
    )
}

export default Dashboard
