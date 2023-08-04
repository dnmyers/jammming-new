import { useState } from 'react';

import './SearchBar.css';

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    function handleKeyDown(e) {
        console.log('User pressed: ' + e.key);

        if(e.key === 'Enter') {
            props.onSearch(searchTerm);
        }
    }

    function handleClick() {
        props.onSearch(searchTerm);
    }

    return (
        <div className="search-bar">
            <input 
                type="text" 
                value={searchTerm}
                onKeyDown={handleKeyDown}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Enter A Song, Album, or Artist..." 
                className="search-bar-input" 
            />
            <button 
                className="search-bar-btn"
                onClick={handleClick}
            >
                SEARCH
            </button>
        </div>
    );
}

export default SearchBar;