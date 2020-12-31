import React, { useState, useEffect } from "react";
import "./DashboardAdmin.css";
import { MenuItem, Select, Button, CircularProgress } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { CSVDownload, CSVLink } from "react-csv";
import AttendanceCard from "./AttendanceCard";
import db from "./firebase";
import { classInfoTest, kidInfoTest } from "./Testdata";
import AttendanceInfo from "./AttendanceInfo";
import { useStateValue } from "./StateProvider";
// import { kidInfo2Csv } from "./util"
import DatePicker from "./DatePicker"
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
  KID_STATUS_ACTIVE,
  ACTION_PICKUP,
  ACTION_LEAVE,
  ACTION_RESET,
} from "./types";

function Dashboard() {
  const [classInfo, setClassInfo] = useState(null);
  const [classId, setClassId] = useState(CLASS_ID_MAX);
  const [kidInfo, setKidInfo] = useState([]);
  const [checkAttendanceType, setCheckAttendanceType] = useState(
    ATTENDANCE_TYPE_PICKUP
  );
  const [attendanceInfo, setAttendanceInfo] = useState([]);
  const [currentFilterOption, setCurrentFilterOption] = useState(
    FILTER_OPTION_ALL
  );
  const [classTotal, setClassTotal] = useState(0);

  const [{ user }, dispatch] = useStateValue();
  const [showSearch, setShowSearch] = useState(false);

  const Status2Text = ["Chưa tới", "Báo nghỉ", "Đã tới", "Đón muộn", "Đã về"];

  const kidInfo2Csv = (_kidInfo) => {
    return _kidInfo.map((item) => {
      const csv = {
        Lớp: classInfo[item.classId]?.name,
        Tên: item.name,
        "Trạng thái": Status2Text[item.attendanceStatus],
      };
      // console.log(csv)
      return csv;
    });
  };

  const getKidInfoByClassId = async (classId, filterOption) => {
    const queryRef =
      classId === CLASS_ID_ALL
        ? await db
            .collection("School")
            .doc("irKMMhRi62L5zljT7qc7")
            .collection("Kid")
            .where("status", "==", KID_STATUS_ACTIVE)
        : await db
            .collection("School")
            .doc("irKMMhRi62L5zljT7qc7")
            .collection("Kid")
            .where("status", "==", KID_STATUS_ACTIVE)
            .where("classId", "==", classId);

    let snapshot =
      filterOption === FILTER_OPTION_ALL
        ? await queryRef.get()
        : await queryRef.where("activeStatus", "==", filterOption).get();

    if (snapshot.empty) {
      console.log("No matching document");
      return null;
    }

    const kidInfoByClass = [];
    snapshot.forEach((doc) => {
      kidInfoByClass.push({
        docId: doc.id,
        kidId: doc.data().kidId,
        name: doc.data().name,
        nickname: doc.data().nickName,
        classId: doc.data().classId,
        attendanceStatus: doc.data().activeStatus,
        activeStatus: doc.data().status,
      });
    });

    return kidInfoByClass;
  };

  useEffect(() => {
    setClassInfo(classInfoTest);
    setClassId(classInfoTest[0].classId);
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (classId != CLASS_ID_MAX) {
        const queryRef =
          classId === CLASS_ID_ALL
            ? await db
                .collection("School")
                .doc("irKMMhRi62L5zljT7qc7")
                .collection("Kid")
                .where("status", "==", 0)
            : await db
                .collection("School")
                .doc("irKMMhRi62L5zljT7qc7")
                .collection("Kid")
                .where("status", "==", 0)
                .where("classId", "==", classId);

        const snapshot = await queryRef.get();

        if (snapshot.empty) {
          console.log("No matching document");
          return null;
        }

        const kidInfoByClass = [];
        snapshot.forEach((doc) => {
          kidInfoByClass.push({
            docId: doc.id,
            kidId: doc.data().kidId,
            name: doc.data().name,
            nickname: doc.data().nickName,
            classId: doc.data().classId,
            attendanceStatus: doc.data().activeStatus,
            activeStatus: doc.data().status,
          });
        });

        setKidInfo(kidInfoByClass);
        setClassTotal(kidInfoByClass.length);
        setAttendanceInfo({
          arrivedNum: kidInfoByClass.filter(
            (item) => item.attendanceStatus === FILTER_OPTION_ARRIVED
          ).length,
          notArrivedNum: kidInfoByClass.filter(
            (item) => item.attendanceStatus === FILTER_OPTION_NOT_ARRIVED
          ).length,
          absenceNum: kidInfoByClass.filter(
            (item) => item.attendanceStatus === FILTER_OPTION_ABSENCE
          ).length,
          notLeavedNum: kidInfoByClass.filter(
            (item) => item.attendanceStatus === FILTER_OPTION_ARRIVED
          ).length,
          leavedNum: kidInfoByClass.filter(
            (item) => item.attendanceStatus === FILTER_OPTION_LEAVED
          ).length,
          pickedUpLateNum: kidInfoByClass.filter(
            (item) => item.attendanceStatus === FILTER_OPTION_PICKUP_LATE
          ).length,
        });
      }
    }

    console.log("inside useEffect() classId: ", classId);

    fetchData();
  }, [classId]);

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
    setClassId(event.target.value);
  };

const onCheckAttendanceTypeChange = (event) => {
    console.log("onCheckAttendanceTypeChange >>>", event.target.value);

    setCheckAttendanceType(event.target.value);
    setCurrentFilterOption(FILTER_OPTION_ALL);
};

  const setFilterOption = (filterOptionValue) => {
    console.log("setFilterOption  >>>", filterOptionValue);
    getKidInfoByClassId(classId, filterOptionValue).then(
      (kidInfoByClass) => {
        setKidInfo(kidInfoByClass);
      },
      (error) => console.error(error)
    );
    setCurrentFilterOption(filterOptionValue);
  };

  
  const handleButtonClick = () => {
    
  };

  console.log("start to render... ", kidInfo);

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
            {classInfo?.map((item) => (
              <MenuItem key={item.classId} value={item.classId}>
                {item.name}
              </MenuItem>
            ))}
            <MenuItem value={FILTER_OPTION_ALL}>Hiển thị toàn trường</MenuItem>
          </Select>

          <Select
            className="dashboard__selectControl"
            varian="outlined"
            onChange={onCheckAttendanceTypeChange}
            value={checkAttendanceType}
          >
            <MenuItem value="1">Điểm danh đón</MenuItem>
            <MenuItem value="0">Điểm danh về </MenuItem>
          </Select>

          <div className="dashboard__action">
            {showSearch && <DatePicker />}
            <Button
              size="small"
              variant="contained"
              // startIcon={<CloudUploadIcon />}
              onClick={() => setShowSearch(!showSearch)}
            >
              {"Báo cáo"}
            </Button>

            {/* <CSVLink
              className="dashboard__action__export"
              data={kidInfo2Csv(kidInfo)}
              filename={"my-file.csv"}
              target="_blank"
            >
              <Button size="small" variant="contained" color="secondary" onClick={handleButtonClick}
              disabled={loading}>
                {displayButtonTitle}
                {loading && <CircularProgress size={24} />}
              </Button>
            </CSVLink> */}
          </div>
        </div>

        <div className="dashboard__info">
          <AttendanceInfo
            attendanceType={checkAttendanceType}
            onClick={(e) => setFilterOption(e)}
            attendanceInfo={attendanceInfo}
            total={classTotal}
          />
        </div>
      </div>

      <div className="dashboard__attendanceCard">
        {kidInfo?.map(
          ({ attendanceStatus, kidId, docId, name, nickname, classId }) => (
            <AttendanceCard
              key={kidId}
              attendanceType={checkAttendanceType}
              //   finishMorning={finishMorning}
              //   finishDay={finishDay}
              //   onClick={(p, e) => handleAttendanceStatusChange(p, e)}
              status={attendanceStatus}
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
