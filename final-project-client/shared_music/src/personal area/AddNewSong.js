import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from "react-redux";
import { addsong } from "../Songs/SongsSlice";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const AddNewSong = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.login.user).id;
    const [open, setOpen] = useState(true);
    const [validationMessage, setvalidationMessage] = useState('');
    const [category, setCategory] = useState("");
    const [Adding, SetAdding] = useState(false);
    const [currSong, setCurrSong] = useState({ Name: '', Description: '', UserId: `${userId}`, CategoryId: 0, FileImage: null, FileSong: null });
    const categories = useSelector(state => state.categories.categories);
    const cStatus = useSelector(state => state.categories.status);
    const validName = /^[a-zA-Z\s()]{2,50}$/;
    const validDescription = /^[A-Za-z\s-,.()!]{4,100}$/;


    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setCurrSong((prevSong) => ({ ...prevSong, CategoryId: event.target.value }))
    };
    useEffect(() => {
        if (Adding) {
            const song = dispatch(addsong(currSong));
            if (song) {
                setOpen(false);
            }
        }
    }, [Adding]);

    // *** Here is the code for converting "image source"(url) to "Base64".***

    // let url = 'https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg'
    // const toDataURL = url => fetch(url)
    //     .then(response => response.blob())
    //     .then(blob => new Promise((resolve, reject) => {
    //         const reader = new FileReader()
    //         reader.onloadend = () => resolve(reader.result)
    //         reader.onerror = reject
    //         reader.readAsDataURL(blob)
    //     }))


    // // *** Here is code for converting "Base64" to javascript "File Object".***

    // function dataURLtoFile(dataurl, filename) {
    //     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     return new File([u8arr], filename, { type: mime });
    // }

    const handleSave = (e) => {
        console.log(currSong, "cursong")
        e.preventDefault();
        const errors = [];

        if (!validName.test(currSong.name)) {
            errors.push('Please enter a valid name (contain just letters).');
        }
        if (!validDescription.test(currSong.Description)) {
            errors.push('Please enter a valid description (contain just letters).');
        }
        if (!currSong.CategoryId) {
            errors.push('Please choose a category.');
        }
        if (!currSong.FileSong) {
            errors.push('Please upload a song.');
        }
        // if (!currSong.FileImage) {
        //     toDataURL(url)
        //         .then(dataUrl => {
        //             console.log('Here is Base64 Url', dataUrl);
        //             var fileData = dataURLtoFile(dataUrl, "logo.jpg");
        //             console.log("Here is JavaScript File Object", fileData);
        //             currSong.FileImage = fileData;
        //         })
            
        // }
        // if (!emailRegex.test(userUp.Email)) {
        //   errors.push('Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.');
        // }

        if (errors.length > 0) {
            setvalidationMessage(errors.join(' '));
        } else {
            SetAdding(true);
        }

    };
    return (<>{
        Adding &&
        <div style={{ "color": "#ffaeb5" }} className="scroll-down">the song added succefuly
            <CheckCircleOutlineIcon sx={{ color: "#ffaeb5", fontSize: 50 }} /></div>}
        <div className="container">
            <div className={open ? "is-open modal" : "modal"}>
                <div className="modal-container">
                    <div className="modal-left">
                        <h1 className="modal-title">hi !</h1>
                        <p className="modal-desc">share your songs and contribute to the community</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', margin: '30px' }}>
                            <div>
                                <input accept="image/*" type="file" id="image-upload" onChange={(e) => { setCurrSong((prevSong) => ({ ...prevSong, FileImage: e.target.files[0] })) }} style={{ display: 'none' }} multiple />
                                <label htmlFor="image-upload">
                                    <Button component="span" variant="contained" startIcon={<CloudUploadIcon />} style={{ backgroundColor: 'secondary.main' }}>
                                        Upload song image
                                    </Button>
                                </label>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', margin: '30px' }}>
                            <div>
                                <input accept="audio/*" type="file" id="song-upload" onChange={(e) => { setCurrSong((prevSong) => ({ ...prevSong, FileSong: e.target.files[0] })) }} style={{ display: 'none' }} multiple />
                                <label htmlFor="song-upload">
                                    <Button component="span" variant="contained" startIcon={<CloudUploadIcon />} style={{ backgroundColor: 'secondary.main' }}>
                                        Upload your track
                                    </Button>
                                </label>
                            </div>
                        </div>
                        <div className="input-block">
                            <label htmlFor="Name" className="input-label" >Song name</label>
                            <input type="text" name="Name" id="Name" placeholder="Name" onChange={(e) => setCurrSong((prevSong) => ({ ...prevSong, Name: e.target.value }))} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="Description" className="input-label">Description</label>
                            <input type="text" name="Description" id="Description" placeholder="describe your song in one sentence" onChange={(e) => setCurrSong((prevSong) => ({ ...prevSong, Description: e.target.value }))} />
                        </div>


                        {validationMessage && <div>{validationMessage}</div>}

                        {/* <select id="category" value={categoryId} onChange={handleCategoryChange}> 
                     {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))} 
                 </select> */}
                        <div className="modal-buttons">
                            {/* <Link to={"forgotPassword"} href="" className="">Afraid of copyright ?</Link> */}
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel color="primary" style={{ "color": "#3fcdce", "fontFamily": "Nunito, sans-serif" }} id="category">category</InputLabel>
                                <Select
                                    labelId="category"
                                    id="categorySelect"
                                    value={category}
                                    onChange={handleCategoryChange}
                                    label="Category"
                                    style={{ "fontFamily": "Nunito, sans-serif" }}
                                >

                                    {cStatus === "fulfilled" && categories?.map(category => (
                                        <MenuItem style={{ "fontSize": "18px", "fontFamily": "Nunito, sans-serif" }} key={category.id} value={category.id}>{category.name}</MenuItem>
                                    ))};

                                </Select>
                            </FormControl>
                            <button className="input-button" onClick={() => { }}>Check</button>
                            <button className="input-button" onClick={(e) => { handleSave(e) }}>Save</button>
                        </div>


                    </div>
                    <div className="modal-right">
                        {/* <img src="https://images.unsplash.com/photo-1526739178209-77cd6c6bcf4f?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" ></img> */}
                        <img src="	https://cdn.pixabay.com/photo/2018/05/28/12/09/headphones-3435885_1280.jpg" alt="" ></img>
                    </div>
                    <button className="icon-button close-button" onClick={() => { setOpen(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                            <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
                        </svg>
                    </button>
                    {/* <button className="modal-button" onClick={() => { setOpen(true) }}>Click here to Add</button> */}
                </div>
            </div >
        </div>
    </>);
}

export default AddNewSong;