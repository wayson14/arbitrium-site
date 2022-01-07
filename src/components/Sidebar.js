import React from 'react'
import UnderlinedBtn from './UnderlinedBtn.js'
import {Link, useNavigate} from 'react-router-dom';
// import BigA from '../assets/bigA.jsx'
const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebar container frame">
            {/* <BigA/> */}
            {/* this img has to be changed to a svg file so it can be colored */}
            <div className="btn-wrapper container column">
                <Link className="link"to="/posts"><UnderlinedBtn text="Aktualności"></UnderlinedBtn></Link>
                <Link className="link" to="/more"><UnderlinedBtn text="Więcej"></UnderlinedBtn></Link>
                <Link className="link" to="/about"><UnderlinedBtn text="O nas"></UnderlinedBtn></Link>
                <Link className="link" to="/downloads"><UnderlinedBtn text="Pliki"></UnderlinedBtn></Link>
                <button onClick={()=>{
                    navigate(-1);
                }}>
                Go back 
                </button>
            </div>
        </div>
    )
}

export default Sidebar;
