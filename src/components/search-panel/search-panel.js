import React from "react";
import './search-panel.css';

const SearchPanel = ({ setSearchingText, searchingText }) => {

    const onSearch = (event) => {
        setSearchingText(event.target.value);
    };

    return (
        <input
            type={"text"}
            className={'form-control search-panel'}
            placeholder={"tap to search"}
            onChange={onSearch}
            value={searchingText}/>
    );
};

export default SearchPanel;