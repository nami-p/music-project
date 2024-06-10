import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageList, ImageListItem, IconButton, Dialog, Button, DialogContent, DialogActions } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const ImageResults = ({ images ,setImageSrc,setSearchImage}) => {
    const [open, setOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    const handleOpen = (img) => {
        setOpen(true);
        setCurrentImage(img);
    };

    const handleClose = () => {
        setOpen(false);
    };
   const handleOk=()=>{
       setImageSrc(currentImage);
       setSearchImage(false);
   };
    let imageListContent;

    if (images) {
        imageListContent = (
            <ImageList cols={3}>
                {images.map((img,index) => (
                    <ImageListItem
                        key={`img${index}`}
                        onClick={() => handleOpen(img.largeImageURL)}
                    >
                        <img src={img.largeImageURL} alt={img.tags} />
                    </ImageListItem>
                ))}
            </ImageList>
        );
    } else {
        imageListContent = null;
    }

    const action = [
        <Button key="close" onClick={handleClose}>Close</Button>
    ];

    return (
        <div style={{ "overflow": "auto" }}>
            {imageListContent}
            <Dialog actions={action} open={open} onClose={handleClose}>
                <DialogContent>
                    <img src={currentImage} style={{ width: '100%' }} alt="" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={handleOk} autoFocus>
                        ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
};

export default ImageResults;
