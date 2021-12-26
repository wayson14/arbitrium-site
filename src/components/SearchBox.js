import { React, useState } from 'react';

const SearchBox = () => {
    const [query, setQuery] = useState("");
    return (
        <div className='container'>

            <input 
            type="text"
            onChange= {e => setQuery(e.target.value)}
            placeholder='wyszukaj'
            className='search-box'
            />
        </div>
    )
}

export default SearchBox
