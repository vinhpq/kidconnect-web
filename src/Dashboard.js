import React, { useState, useEffect } from 'react'
import "./Dashboard.css"
import { MenuItem, Select } from "@material-ui/core";
import AttendanceCard from "./AttendanceCard"
import db from "./firebase"
import { classInfoTest, kidInfoTest } from "./Testdata"
import AttendanceInfo from './AttendanceInfo';
import AttendanceAction from './AttendanceAction';

function Dashboard() {
    const [classInfo, setClasseInfo] = useState(classInfoTest);
    const [classId, setClassId] = useState(0);
    const [kidInfo, setKidInfo] = useState([]);
    const [checkAttendanceType, setCheckAttendanceType] = useState('1')
    const [attendanceInfo, setAttendanceInfo] = useState([])
    const [currentFilterOption, setCurrentFilterOption] = useState();
    const [classTotal, setClassTotal] = useState(0)
    
    // const getMapFromArray = data => data.reduce((acc, item) => {
    //     acc[item.kidId] = {name: item.name, nickname: item.nickname};
    //     return acc;
    // }, {})

    const getKidInfoByClassId = async (classId, filterOption) => {
        const queryRef =  classId === 1000 ? (
                await db.collection('School')
                .doc('irKMMhRi62L5zljT7qc7')
                .collection('Kid')
                .where('status', '==', 0)
            ) : ( 
                await db.collection('School')
                .doc('irKMMhRi62L5zljT7qc7')
                .collection('Kid')
                .where('status', '==', 0)
                .where('classId', '==', classId)
            )
        
        const snapshot = filterOption === 1000 ? ( await queryRef.get() ) : ( await queryRef.where('activeStatus', '==', filterOption).get() )
        
        if (snapshot.empty) {
            console.log('No matching document')
            return null;
        }  
        
        const kidInfoByClass = []
        snapshot.forEach(doc => {
            kidInfoByClass.push({
                docId: doc.id,
                kidId: doc.data().kidId,
                name: doc.data().name,
                nickname: doc.data().nickName,
                classId: doc.data().classId,
                attendanceStatus: doc.data().activeStatus,
                activeStatus: doc.data().status,
        })})

        return kidInfoByClass
    }

    useEffect(() => {
        async function fetchData() {
            await db.collection('School')
            .doc('irKMMhRi62L5zljT7qc7')
            .collection('Kid')
            .where('status', '==', 0)
            .where('classId', '==', classId)
            .onSnapshot(snapshot => {
                const kidInfoByClass = snapshot.docs.map(doc => ({
                    docId: doc.id,
                    kidId: doc.data().kidId,
                    name: doc.data().name,
                    nickname: doc.data().nickName,
                    classId: doc.data().classId,
                    attendanceStatus: doc.data().activeStatus,
                    activeStatus: doc.data().status,
                }));

                setKidInfo(kidInfoByClass)
                setClassTotal(kidInfoByClass.length)
                setAttendanceInfo({
                    arrivedNum: kidInfoByClass.filter(item => item.attendanceStatus === 1).length,
                    notArrivedNum: kidInfoByClass.filter(item => item.attendanceStatus === 0).length,
                    absenceNum: kidInfoByClass.filter(item => item.attendanceStatus === 2).length,
                    notLeavedNum: kidInfoByClass.filter(item => item.attendanceStatus === 1).length,
                    leavedNum: kidInfoByClass.filter(item => item.attendanceStatus === 3).length,
                    pickedUpLateNum: kidInfoByClass.filter(item => item.attendanceStatus === 4).length,
                })
            })
        }

        console.log('inside useEffect() classId: ', classId)

        fetchData();
        
    }, [classId]); 

    // console.log('KidInfo >>> ', kidInfo)
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


    const onClassChange = (event) => {
        setClassId(event.target.value)
    }
    

    const onCheckAttendanceTypeChange = (event) => {
        console.log('onCheckAttendanceTypeChange >>>', event.target.value)
        
        setCheckAttendanceType(event.target.value)
        setCurrentFilterOption(1000);
    }

    const setFilterOption = (filterOptionValue) => {
        console.log('setFilterOption  >>>', filterOptionValue)
        const snapshot = getKidInfoByClassId(classId, filterOptionValue).then(
            kidInfoByClass => {
                console.log(kidInfoByClass)
                setKidInfo(kidInfoByClass)
            },

            error => alert(error)
        )

        setCurrentFilterOption(filterOptionValue);
    }

    const handleAttendanceStatusChange = async (docId, value) => {
        console.log('handleAttendanceStatusChange >>> ', value)


        await db.collection('School')
            .doc('irKMMhRi62L5zljT7qc7')
            .collection('Kid')
            .doc(docId)
            .update({ activeStatus: value })
            .then(() => {
                console.log('Added successfully for classId: ', classId)
                const snapshot = getKidInfoByClassId(classId, 1000).then(
                    kidInfoByClass => {
                        // console.log(kidInfoByClass)
                        setKidInfo(currentFilterOption === 1000 ? kidInfoByClass : kidInfoByClass.filter(item => item.attendanceStatus === currentFilterOption))
                        setAttendanceInfo({
                            arrivedNum: kidInfoByClass.filter(item => item.attendanceStatus === 1).length,
                            notArrivedNum: kidInfoByClass.filter(item => item.attendanceStatus === 0).length,
                            absenceNum: kidInfoByClass.filter(item => item.attendanceStatus === 2).length,
                            notLeavedNum: kidInfoByClass.filter(item => item.attendanceStatus === 1).length,
                            leavedNum: kidInfoByClass.filter(item => item.attendanceStatus === 3).length,
                            pickedUpLateNum: kidInfoByClass.filter(item => item.attendanceStatus === 4).length,
                        })
                    },
        
                    error => alert(error)
                )
            })

        // db.collection('School')
        //     .doc('irKMMhRi62L5zljT7qc7')
        //     .collection('KidAttendance')
        //     .doc(docId)
        //     .update({
        //         status: value,
        //         // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //     })
    }

    console.log('start to render... ')

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
                        <MenuItem value={1000}>Hiển thị toàn trường</MenuItem>
                    
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
                {kidInfo?.map(({ attendanceStatus, kidId, docId, name, nickname }) => (
                        <AttendanceCard
                            key={kidId}
                            attendanceType={checkAttendanceType}
                            onClick={(p, e) => handleAttendanceStatusChange(p, e)}
                            status={attendanceStatus}
                            docId={docId}
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
