import React from "react";
import './search-panel.css';

const SearchPanel = () => {
    return (
        <input
            type={"text"}
            className={'form-control search-panel'}
            placeholder={"tap to search"}/>
    );
};

export default SearchPanel;