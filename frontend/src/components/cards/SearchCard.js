import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Input, Space } from 'antd';
const { Search } = Input;

const SearchCard = () => {
    const dispath = useDispatch();
    const navigate = useNavigate();

    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    const handleChange = (e) => {
        //console.log(e.target.value)
        dispath({
            type: "SEARCH_QUERY",
            payload: {
                text: e.target.value
            },
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/?${text}`);
    }

    const onSearch = (value) => {
        // console.log('Search::', value);
        dispath({
            type: "SEARCH_QUERY",
            payload: {
                text: value
            },
        });

    }

    return (
        // <form onSubmit={handleSubmit}>
        //     <input
        //         onChange={handleChange}
        //         type="search"
        //         className='form-control'
        //     />
        // </form>
        <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
                width: 250,
            }}
        />
    )
}

export default SearchCard