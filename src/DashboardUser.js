import React, { useState, useEffect } from "react";
import "./DashboardUser.css";
import { MenuItem, Select, Button, Checkbox } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
// import { CSVDownload, CSVLink } from "react-csv";
import AttendanceCard from "./AttendanceCard";
import db from "./firebase";
import firebase from "firebase";
import { classInfoTest, kidInfoTest } from "./Testdata";
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
  ACTION_PICKUP,
  ACTION_LEAVE,
  ACTION_RESET,
} from "./types";

function Dashboard() {
  const [classInfo, setClassInfo] = useState(null);
  const [classId, setClassId] = useState(CLASS_ID_MAX);
  const [attendanceCard, setAttendanceCard] = useState([]);
  const [kidInfoStatic, setKidInfoStatic] = useState([]);
  const [checkAttendanceType, setCheckAttendanceType] = useState(ATTENDANCE_TYPE_PICKUP);
  const [attendanceInfo, setAttendanceInfo] = useState([]);
  const [currentFilterOption, setCurrentFilterOption] = useState(FILTER_OPTION_ALL);
  // const [classTotal, setClassTotal] = useState(0);

  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState(false);
  const [finishMorning, setFinishMorning] = useState(false);
  const [finishDay, setFinishDay] = useState(false);
  const timer = React.useRef();
  const today = new Date().setHours(0, 0, 0, 0);
  const beginOfDay = new Date(today);

  const Status2Text = ["Chưa tới", "Báo nghỉ", "Đã tới", "Đón muộn", "Đã về"];

  const getKidAttendanceStatus = async (_classId) => {
    // console.log(beginOfDay)
    let snapshot = await db
      .collection("School")
      .doc("irKMMhRi62L5zljT7qc7")
      .collection("KidAttendance")
      .where("classId", "==", _classId)
      .where("timestamp", ">=", firebase.firestore.Timestamp.fromDate(beginOfDay))
      .get();

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
        setAttendanceCard(_attendanceCard);

        if (checkAttendanceType === ATTENDANCE_TYPE_PICKUP) {
          setAttendanceInfo({
            total: classInfo.count,
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

      let pos = user.email.indexOf("@");
      if (pos < 0) {
        console.log("Not a valid user email...");
        return null;
      }

      let _classId = -1;
      let _classInfo = null;
      snapshot.forEach((doc) => {
        if (doc.data().name.toLowerCase() === user.email.slice(0, pos).toLowerCase()) {
          _classInfo = doc.data();
          _classInfo.docId = doc.id;
          _classId = doc.data().classId;
        }
      });

      if (_classId === -1) {
        console.log("No matching classId...");
        return null;
      }
      setClassInfo(_classInfo);
      setClassId(_classId);
      setFinishMorning(_classInfo.finishMorning)
      setFinishDay(_classInfo.finishDay)

      // Loading KidAttendance from Firestore...
      let _kidAttendanceStatus = null;
      getKidAttendanceStatus(_classId).then(
        (kidAttendanceStatus) => {
          if (null == kidAttendanceStatus) {
            console.log("No attendance record...");
            return null;
          } else {
            _kidAttendanceStatus = kidAttendanceStatus;
            setAttendanceInfo({
              total: _classInfo.count,
              info1: kidAttendanceStatus.filter((item) => item.status === FILTER_OPTION_NOT_ARRIVED).length,
              info2: kidAttendanceStatus.filter((item) => item.status >= FILTER_OPTION_ARRIVED).length,
              info3: kidAttendanceStatus.filter((item) => item.status === FILTER_OPTION_ABSENCE).length,
            });
            // console.log("AttendanceInfo: ", kidAttendanceStatus);
          }
        },
        (error) => console.error(error)
      );

      // Loading Kid from Firestore...
      snapshot = await db
        .collection("School")
        .doc("irKMMhRi62L5zljT7qc7")
        .collection("Kid")
        .where("status", "==", 0)
        .where("classId", "==", _classId)
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

      console.log("AttendanceCard: ", _attendanceCard);
    }

    fetchData();
  }, []);

   useEffect(() => {
    if (classId === CLASS_ID_MAX) 
      return;

    update();
  }, [checkAttendanceType, currentFilterOption]);



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
            .collection("Class")
            .doc(classInfo.docId)

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

  return (
    <div className="dashboard">
      <div className="dashboard__option">
        <div className="dashboard__control">
          <Select
            className="dashboard__selectControl"
            varian="outlined"
            value={classId}
          >
            <MenuItem key={classId} value={classId}>
              {classInfo?.name}
            </MenuItem>
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
        </div>

        <div className="dashboard__info">
          <AttendanceInfo
            attendanceType={checkAttendanceType}
            onClick={(e) => setFilterOption(e)}
            attendanceInfo={attendanceInfo}
            filter={currentFilterOption}
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
              className={classInfo?.name}
              kidImage="./null.jpg"
            />
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;
