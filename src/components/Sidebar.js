import React from 'react'
import UnderlinedBtn from './UnderlinedBtn.js'
// import BigA from '../assets/bigA.jsx'
const Sidebar = () => {
    return (
        <div className="sidebar container frame">
            {/* <BigA/> */}
            {/* this img has to be changed to a svg file so it can be colored */}
            <div className="btn-wrapper container column">
                <UnderlinedBtn text="Aktualności" onClick={()=>console.log('lol')}></UnderlinedBtn>
                <UnderlinedBtn text="Więcej"></UnderlinedBtn>
                <UnderlinedBtn text="O nas"></UnderlinedBtn>
                <UnderlinedBtn text="Do pobrania"></UnderlinedBtn>
            </div>
        </div>
    )
}

export default Sidebar;
