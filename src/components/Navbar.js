import React from 'react'
import SearchBox from './SearchBox'
import { MdSearch } from "react-icons/md"
const Navbar = () => {
    return (

        <div className="navbar container frame">
            <div className="nav-placeholder"></div>
            <MdSearch className="center-alligned" color="white"></MdSearch>
            <SearchBox></SearchBox>
            <div className="nav-name">134 MDH "Arbitrium" im. Andrzeja Romockiego "Morro"</div>
        </div>

    )
}

export default Navbar
