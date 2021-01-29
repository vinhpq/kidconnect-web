import React, { useState, useEffect } from "react";
import "./DashboardAdmin.css";
import { MenuItem, Select, Button, Checkbox } from "@material-ui/core";
import AttendanceCard from "./AttendanceCard";
import db from "./firebase";
import firebase from "firebase";
import AttendanceInfo from "./AttendanceInfo";
import { useStateValue } from "./StateProvider";
import {
  CLASS_ID_MAX,
  CLASS_ID_ALL,
  ATTENDANCE_TYPE_PICKUP,
  ATTENDANCE_TYPE_LEAVE,
  FILTER_OPTION_ALL,
  FILTER_OPTION_NOT_ARRIVED,
  FILTER_OPTION_ARRIVED,
  FILTER_OPTION_ABSENCE,
  FILTER_OPTION_PICKUP_LATE,
  FILTER_OPTION_LEAVED,
  FILTER_OPTION_NOT_LEAVED,
  KID_STATUS_ACTIVE,
} from "./types";

import DatePickerDialog from "./DatePickerDialog";
import saveCsv from "save-csv";

function Dashboard() {
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [classInfo, setClassInfo] = useState(null);
  const [classId, setClassId] = useState(CLASS_ID_ALL);
  const [attendanceCard, setAttendanceCard] = useState([]);
  const [kidInfoStatic, setKidInfoStatic] = useState([]);
  const [checkAttendanceType, setCheckAttendanceType] = useState(ATTENDANCE_TYPE_PICKUP);
  const [attendanceInfo, setAttendanceInfo] = useState([]);
  const [currentFilterOption, setCurrentFilterOption] = useState(FILTER_OPTION_ALL);

  // const [{ user }, dispatch] = useStateValue();
  const [finishMorning, setFinishMorning] = useState(false);
  const [finishDay, setFinishDay] = useState(false);
  // const timer = React.useRef();
  const today = new Date().setHours(0, 0, 0, 0);
  const beginOfDay = new Date(today);

  const [showDatePicker, setShowDatePicker] = useState(false);

  // const Status2Text = ["Chưa tới", "Báo nghỉ", "Đã tới", "Đón muộn", "Đã về"];

  // const kidInfo2Csv = (_kidInfo) => {
  //   return _kidInfo.map((item) => {
  //     const csv = {
  //       Lớp: classInfo[item.classId]?.name,
  //       Tên: item.name,
  //       "Trạng thái": Status2Text[item.attendanceStatus],
  //     };
  //     // console.log(csv)
  //     return csv;
  //   });
  // };

  const getKidAttendanceStatus = async (_classId) => {
    // console.log(beginOfDay)
    let snapshot = null;
    
    if (_classId === CLASS_ID_ALL) {
      snapshot = await db
      .collection("School")
      .doc("irKMMhRi62L5zljT7qc7")
      .collection("KidAttendance")
      .where("timestamp", ">=", firebase.firestore.Timestamp.fromDate(beginOfDay))
      .get();
    } else {
      snapshot = await db
      .collection("School")
      .doc("irKMMhRi62L5zljT7qc7")
      .collection("KidAttendance")
      .where("classId", "==", _classId)
      .where("timestamp", ">=", firebase.firestore.Timestamp.fromDate(beginOfDay))
      .get();
    }

    if (snapshot.empty) {
      console.log("Class empty...");
      return null;
    }

    let kidAttendanceStatus = [];
    snapshot.forEach((doc) => {
      // console.log(doc.data().timestamp.toDate());
      kidAttendanceStatus.push({
        docId: doc.id,
        kidId: doc.data().kidId,
        classId: doc.data().classId,
        status: doc.data().status,
        timestamp: doc.data().timestamp,
      });
    });

    return kidAttendanceStatus;
  };

  const update = () => {
    getKidAttendanceStatus(classId).then(
      (kidAttendanceStatus) => {
        let filteredKidStatus = null;

        if (null == kidAttendanceStatus) {
          console.log("No kid found...");
          return;
        }

        // console.log("Query KidAttendance result...", kidAttendanceStatus)

        if (!finishMorning) {
          if (currentFilterOption === FILTER_OPTION_ALL) {
            filteredKidStatus = kidAttendanceStatus;
          } else {
            filteredKidStatus = kidAttendanceStatus.filter((item) => item.status === currentFilterOption);
          }
        } else {
          if ((checkAttendanceType === ATTENDANCE_TYPE_PICKUP && currentFilterOption === FILTER_OPTION_ARRIVED) ||
            (checkAttendanceType === ATTENDANCE_TYPE_LEAVE && currentFilterOption === FILTER_OPTION_ALL)) {
            filteredKidStatus = kidAttendanceStatus.filter((item) => item.status >= FILTER_OPTION_ARRIVED);
          } else if (checkAttendanceType === ATTENDANCE_TYPE_PICKUP && currentFilterOption === FILTER_OPTION_ALL) {
            filteredKidStatus = kidAttendanceStatus;
          } else {
            filteredKidStatus = kidAttendanceStatus.filter((item) => item.status === currentFilterOption);
          }
        }

        let _attendanceCard = filteredKidStatus.map(item => {
          let kid = kidInfoStatic.filter(i => i.kidId === item.kidId)[0];
          return {...item, name: kid.name, nickName: kid.nickName }
        })

        
        // console.log("Attendance card: ", _attendanceCard);
        // console.log(classInfo)
        setAttendanceCard(_attendanceCard);

        if (checkAttendanceType === ATTENDANCE_TYPE_PICKUP) {
          setAttendanceInfo({
            total: classId === CLASS_ID_ALL ? schoolInfo.count : classInfo[classId].count,
            info1: kidAttendanceStatus.filter((item) => item.status === FILTER_OPTION_NOT_ARRIVED).length,
            info2: kidAttendanceStatus.filter((item) => item.status >= FILTER_OPTION_ARRIVED).length,
            info3: kidAttendanceStatus.filter((item) => item.status === FILTER_OPTION_ABSENCE).length,
          });
        } else {
          setAttendanceInfo({
            total: kidAttendanceStatus.filter((item) => item.status >= FILTER_OPTION_ARRIVED).length,
            info1: kidAttendanceStatus.filter((item) => item.status === FILTER_OPTION_NOT_LEAVED).length,
            info2: kidAttendanceStatus.filter((item) => item.status === FILTER_OPTION_LEAVED).length,
            info3: kidAttendanceStatus.filter((item) => item.status === FILTER_OPTION_PICKUP_LATE).length,
          });
        }
      },
      (error) => console.error(error)
    );
  }

  useEffect(() => {
    async function fetchData() {
      console.log("fetchData...");

      // Loading School from Firestore...
      let docRef = await db
        .collection("School")
        .doc("irKMMhRi62L5zljT7qc7")
        .get();

      if (!docRef.exists) {
        console.log("Document not existed...");
        return null;
      }

      let _schoolInfo = null;
      _schoolInfo = {
        finishMorning: docRef.data().finishMorning,
        finishDay: docRef.data().finishDay,
        count: docRef.data().count,
        docId: docRef.id,
      }
      setSchoolInfo(_schoolInfo)
      // console.log(_schoolInfo)

      // Loading Class from Firestore...
      let snapshot = await db
        .collection("School")
        .doc("irKMMhRi62L5zljT7qc7")
        .collection("Class")
        .get();

      if (snapshot.empty) {
        console.log("No matching document");
        return null;
      }

      let _classId = CLASS_ID_ALL;
      let _classInfo = [];
      snapshot.forEach((doc) => {
        // _classInfo.push({
        //   docId: doc.id,
        //   name: doc.data().name,
        //   classId: doc.data().classId,
        //   finishMorning: doc.data().finishMorning,
        //   finishDay: doc.data().finishDay,
        //   count: doc.data().count,
        // });
        _classInfo[doc.data().classId] = ({
          docId: doc.id,
          name: doc.data().name,
          classId: doc.data().classId,
          finishMorning: doc.data().finishMorning,
          finishDay: doc.data().finishDay,
          count: doc.data().count,
        });
      })

      if (_classInfo.length === 0) {
        console.log("No matching classId...");
        return null;
      }
      setClassInfo(_classInfo);
      setClassId(_classId);
      setFinishMorning(_schoolInfo.finishMorning)
      setFinishDay(_schoolInfo.finishDay)

      // Loading KidAttendance from Firestore...
      let _kidAttendanceStatus = [];
      snapshot = await db
        .collection("School")
        .doc("irKMMhRi62L5zljT7qc7")
        .collection("KidAttendance")
        .where("timestamp", ">=", firebase.firestore.Timestamp.fromDate(beginOfDay))
        .get();

      if (snapshot.empty) {
        console.log("KidAttendance empty...");
        return null;
      }

      snapshot.forEach((doc) => {
        // console.log(doc.data().timestamp.toDate());
        _kidAttendanceStatus.push({
          docId: doc.id,
          kidId: doc.data().kidId,
          classId: doc.data().classId,
          status: doc.data().status,
          timestamp: doc.data().timestamp,
        });
      });

      setAttendanceInfo({
        total: _schoolInfo.count,
        info1: _kidAttendanceStatus.filter((item) => item.status === FILTER_OPTION_NOT_ARRIVED).length,
        info2: _kidAttendanceStatus.filter((item) => item.status >= FILTER_OPTION_ARRIVED).length,
        info3: _kidAttendanceStatus.filter((item) => item.status === FILTER_OPTION_ABSENCE).length,
      });

      
      // Loading Kid from Firestore...
      snapshot = await db
        .collection("School")
        .doc("irKMMhRi62L5zljT7qc7")
        .collection("Kid")
        .where("status", "==", KID_STATUS_ACTIVE)
        .get();

      if (snapshot.empty) {
        console.log("Class empty...");
        return null;
      }

      let kidInfoByClass = [];
      snapshot.forEach((doc) => {
        kidInfoByClass.push({
          kidId: doc.data().kidId,
          name: doc.data().name,
          nickname: doc.data().nickName,
          classId: doc.data().classId,
        });
      });

      let _attendanceCard = _kidAttendanceStatus.map(item => {
        let kid = kidInfoByClass.filter(i => i.kidId === item.kidId)[0];
        return {...item, name: kid.name, nickName: kid.nickName }
      })

      setAttendanceCard(_attendanceCard);
      setKidInfoStatic(kidInfoByClass);

      // console.log("AttendanceCard: ", _attendanceCard);
    }

    fetchData();
  }, []);

   useEffect(() => {
    if (schoolInfo === null) 
      return;

    update();
  }, [checkAttendanceType, currentFilterOption, classId]);



  const onCheckAttendanceTypeChange = (event) => {
    setCheckAttendanceType(event.target.value);
  };

  const setFilterOption = (filterOptionValue) => {
    setCurrentFilterOption(filterOptionValue);
  };

  const handleAttendanceStatusChange = (docId, value) => {
    // console.log(docId, value)
    db.collection("School")
      .doc("irKMMhRi62L5zljT7qc7")
      .collection("KidAttendance")
      .doc(docId)
      .update({ status: value })
      .then(() => {
        // console.log("updated...")
        update()
      });
  };

  const handleCheckboxClicked = (event) => {
    // console.log(classInfo.docId, classInfo.classId)
    const docRef = db.collection("School")
            .doc("irKMMhRi62L5zljT7qc7")

    if (event.target.id === ATTENDANCE_TYPE_PICKUP) {
      setFinishMorning(event.target.checked)
      docRef.update({ finishMorning: event.target.checked })
            .then(() => {
              console.log("updated finishMorning...")
            });
     } else {
       setFinishDay(event.target.checked);
       docRef.update({ finishDay: event.target.checked })
            .then(() => {
              console.log("updated finishDay...")
            });
     }      
  };
  
  const onClassChange = (event) => {
    setClassId(event.target.value);
    // console.log(event.target.value)
  };

  

  const handleDatePickerClose = async (select, start, end) => {
    let endDate = new Date();

    endDate.setDate(end.getDate() + 1);
    endDate.setHours(0, 0, 0, 0)
    setShowDatePicker(false);

    // console.log('End date...', endDate)

    if (select == 0) {
      const snapshot =
        classId === CLASS_ID_ALL
          ? await db
              .collection("School")
              .doc("irKMMhRi62L5zljT7qc7")
              .collection("KidAttendance")
              .where("status", "==", KID_STATUS_ACTIVE)
              .where("timestamp", ">=", firebase.firestore.Timestamp.fromDate(start))
              .where("timestamp", "<", firebase.firestore.Timestamp.fromDate(endDate))
              .get()
          : await db
              .collection("School")
              .doc("irKMMhRi62L5zljT7qc7")
              .collection("KidAttendance")
              .where("status", "==", KID_STATUS_ACTIVE)
              .where("classId", "==", classId)
              .where("timestamp", ">=", firebase.firestore.Timestamp.fromDate(start))
              .where("timestamp", "<", firebase.firestore.Timestamp.fromDate(endDate))
              .get();

      if (snapshot.empty) {
        console.log("No matching document");
        return;
      }

      const kidAttendanceData = [];
      snapshot.forEach((doc) => {
        const kid = kidInfoStatic.filter(
          (item) => item.kidId === doc.data().kidId
        );
        // console.log(kid);
        // console.log(doc.data().timestamp);
        // console.log(doc.data().timestamp.toDate());
        kidAttendanceData.push({
          Lớp: classInfo[doc.data().classId].name,
          Tên: kid[0]?.name,
          Nickname: kid[0]?.nickname,
          "Trạng thái": doc.data().status < 2 ? "Nghỉ học" : "Đi học",
          "Thời gian": doc.data().timestamp.toDate().toString(),
        });
      });
      // console.log(kidAttendanceData);

      saveCsv(kidAttendanceData, { filename: "rabit.csv" });
    }
  };


  return (
    <div className="dashboard">
      <div className="dashboard__option">
        <div className="dashboard__control">
          <Select
            className="dashboard__selectControl"
            varian="outlined"
            onChange={onClassChange}
            value={classId}
          >
            <MenuItem key={CLASS_ID_ALL} value={CLASS_ID_ALL}>Tất cả lớp</MenuItem>
            {classInfo?.map((item) => (
              <MenuItem key={item.classId} value={item.classId}>
                {item.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            className="dashboard__selectControl"
            varian="outlined"
            onChange={onCheckAttendanceTypeChange}
            value={checkAttendanceType}
          >
            <MenuItem value={ATTENDANCE_TYPE_PICKUP}>
              <Checkbox 
                id={ATTENDANCE_TYPE_PICKUP} 
                checked={finishMorning} 
                onChange={handleCheckboxClicked} />Điểm danh đón
            </MenuItem>
            <MenuItem value={ATTENDANCE_TYPE_LEAVE} disabled={!finishMorning}>
              <Checkbox 
                id={ATTENDANCE_TYPE_LEAVE} 
                checked={finishDay} 
                onChange={handleCheckboxClicked} />Điểm danh về
            </MenuItem>
          </Select>

          <div className="dashboard__action">
            {/* {showSearch && <DatePicker />} */}
            <Button
              size="small"
              variant="contained"
              // startIcon={<CloudUploadIcon />}
              // onClick={() => setShowSearch(!showSearch)}
              onClick={() => setShowDatePicker(true)}
            >
              {"Báo cáo"}
            </Button>
            <DatePickerDialog
              // selectedValue={selectedValue}
              open={showDatePicker}
              onClose={(s, start, end) => handleDatePickerClose(s, start, end)}
            />
          </div>
        </div>

        <div className="dashboard__info">
          <AttendanceInfo
            attendanceType={checkAttendanceType}
            onClick={(e) => setFilterOption(e)}
            attendanceInfo={attendanceInfo}
            // total={classTotal}
          />
        </div>
      </div>

      <div className="dashboard__attendanceCard">
        {attendanceCard?.map(
          ({ status, kidId, docId, name, nickname, classId }) => (
            <AttendanceCard
              key={kidId}
              attendanceType={checkAttendanceType}
              finishMorning={finishMorning}
              finishDay={finishDay}
              onClick={(p, e) => handleAttendanceStatusChange(p, e)}
              status={status}
              docId={docId}
              kidName={name}
              kidNickname={nickname}
              className={classInfo[classId]?.name}
              kidImage="./null.jpg"
            />
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;
