import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import ImageResults from './imageResult';
import { MenuItem, Select } from '@mui/material';

const Search = ({setSearchImage,setImageSrc}) => {
    const [searchText, setSearchText] = useState('');
    const [amount, setAmount] = useState(5);
    const [type, setType] = useState('all');
    const [images, setImages] = useState([]);

    const onTextChange = (event) => {
        const val = event.target.value;
        setSearchText(val);
        if (val === '') {
            setImages([]);
        } else {
            axios.get(`https://pixabay.com/api/?key=32223807-65f70c9d54dcb844f54aca101&q=${val}&image_type=${type}&per_page=${amount}&safesearch=true`)
                .then(res => {
                    setImages(res.data.hits);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const onAmountChange = (event) => {
        setAmount(event.target.value);
    };
    const onTypeChange = (event) => {
        setType(event.target.value);
    };

    return (
        <div style={{ padding: '50px' }}>
            <TextField
                name="searchText"
                value={searchText}
                onChange={onTextChange}
                label="Search for image"
                fullWidth
            />
          
            <Select
                value={amount}
                label="amount"
                onChange={onAmountChange}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
            </Select>
            <Select
                value={type}
                label="type"
                onChange={onTypeChange}
            >
                <MenuItem value={'all'}>all</MenuItem>
                <MenuItem value={'photo'}>photo</MenuItem>
                <MenuItem value={'vector'}>vector</MenuItem>
                <MenuItem value={'illustration'}>illustration</MenuItem>
            </Select>
            {images.length > 0 ? <ImageResults images={images} setSearchImage={setSearchImage} setImageSrc={setImageSrc}style={{"overflow":"auto"}}/> : null}
        </div>
    );
};

export default Search;
