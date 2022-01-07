import {React, useState} from 'react'
import {MdViewHeadline, MdFolderOpen, MdLink} from "react-icons/md"

const ItemEntry = ({type, resourceLink, text, description}) => {
    const [showInfo, setShowInfo] = useState(-1);
    return (
        <div className='container item-entry'>
            <div className="item-entry-icon">
                {type == "folder" && <MdFolderOpen className="item-entry-icon" color="black"></MdFolderOpen>}
                {type == "link" && <MdLink className="item-entry-icon" color="black"></MdLink>}
            </div>
            <div className="content-font item-text">Item entry text</div>
            <div className="item-entry-icon" onClick={()=>{
                setShowInfo(showInfo*-1);
            }}>
                <MdViewHeadline className="flex-end item-entry-icon" color="black"></MdViewHeadline>
            </div>
            {showInfo>0 && 'asdfasdf'}
        </div>
    )
}

ItemEntry.defaultProps = {
    type: "link",
    resourceLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    text: "Never Gonna Give You Up",
    description: "Never gonna let you down..."
}
export default ItemEntry
