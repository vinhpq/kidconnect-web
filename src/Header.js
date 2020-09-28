import React from 'react'
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search"
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom"
import { useStateValue } from "./StateProvider"
import { auth } from "./firebase"

function Header() {
    const [{ user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
      if (user) {
        auth.signOut();
      }
    }

    const searchChange = (event) => {
        console.log('event >>', event.target.value)
    }

    return (
        <div className="header">
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

            <div className="header__nav">

                <div className="header__option header__option--active">
                    <span className="header__optionLineOne">Điểm danh</span>
                    <span className="header__optionLineTwo">Học sinh</span>
                </div>

                <div className="header__option">
                    <span className="header__optionLineOne">Điểm danh</span>
                    <span className="header__optionLineTwo">Giáo viên</span>
                </div>

                <div onClick={handleAuthentication} className="header__option">
                    <Avatar className="header__avatar" alt={user?.displayName} src={user?.photoURL}/>
                </div>

            </div>
        </div>
    )
}

export default Header
