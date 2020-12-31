import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import ProfileDialog from "./ProfileDialog";

function Header() {
  const [open, setOpen] = useState(false)
  const [{ user }, dispatch] = useStateValue();
  // const history = useHistory();

  const handleAuthentication = () => {
    if (user) {
      console.log("sign out...");
      auth.signOut();
    }
  };

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
    console.log(value)

    if (value === 1) {
      handleAuthentication();
    } else if (value === 0) {
      console.log('Setup profile')
    }
  }

  // const searchChange = (event) => {
  //   console.log("event >>", event.target.value);
  // };

  // console.log(user)

  return (
    <div className="header">
      <div className="header__info">
        <img
          className="header__logo"
          src="https://files.slack.com/files-pri/TN44SBSKE-F01ATQ9K0NA/l5-face_profile.jpg"
          alt="BTM"
        />

        {/* <div className="header__search">
                    <input 
                        className="header__searchInput" 
                        type="text" 
                        placeholder='Tìm kiếm học sinh, giáo viên'
                        onChange={searchChange} />
                    <SearchIcon className='header__searchIcon' />
            </div> */}
        <p>
          {new Date().toLocaleString("vi-VN", { weekday: "long" })},{" "}
          {new Date().toLocaleDateString("vi-VN")}
        </p>
      </div>

      <div className="header__nav">
        <div className="header__option header__option--active">
          <span className="header__optionLineOne">Xin chào,</span>
          <span className="header__optionLineTwo">
            {user?.email.substring(0, user?.email.lastIndexOf("@"))}
          </span>
        </div>
        {/* <div className="header__option header__option--active">
          <span className="header__optionLineOne">Điểm danh</span>
          <span className="header__optionLineTwo">Học sinh</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Điểm danh</span>
          <span className="header__optionLineTwo">Giáo viên</span>
        </div> */}

        <div onClick={handleOpen} className="header__option">
          <Avatar
            className="header__avatar"
            alt={user?.displayName}
            src={user?.photoURL}
          />
          <ProfileDialog
            // selectedValue={selectedValue}
            open={open}
            onClose={(e) => handleClose(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
