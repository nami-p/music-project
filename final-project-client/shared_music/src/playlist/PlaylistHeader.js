import React from 'react';
import { Box, Typography, IconButton, Tooltip, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid'; // Import Grid from Material-UI
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from "@mui/material/Avatar";
import PaidIcon from '@mui/icons-material/Paid';
import { Navigate, useNavigate } from 'react-router-dom';
import { PlayArrow } from '@mui/icons-material';


const PlaylistHeader = (props) => {
    const navigate = useNavigate();
    const category = props.Category;
    const numOfTracks = category.songs.length;
    // console.log(numOfTracks, 'numOfTracks');
    // const lengthOfAllTracks = category.songs.reduce((prev, cur, i) => prev ? prev.length + cur.length : cur, 0)
    // const lengthOfAllTracks = category.songs.reduce((accumulator, currentValue) => {
    //     return accumulator.length + currentValue.length
    //   },0);
    let lengthOfAllTracks = 0;
    for (let i = 0; i < category.songs.length; i++) {
        lengthOfAllTracks += category.songs[i].length;
    }

    // console.log(lengthOfAllTracks);
    const textStyle = {
        fontFamily: 'system-ui',
        fontSize: '1rem',
        letterSpacing: '-0.3px',
        height: '20px',
        fontWeight: 400,
    };
    return (
        <Box sx={{ marginBottom: 0 }}>
            {/* Icon with text */}
            <Box sx={{ display: 'flex', alignItems: 'center', margin: 1.5 }}>
                <IconButton onClick={() => { navigate('/playlists') }}>
                    <ArrowBackIcon fontSize='small' />
                </IconButton>
                <Typography sx={{ fontWeight: 'medium' }} variant="body2" color="textSecondary" onClick={() => console.log('Text clicked')}>
                    All playlists        </Typography>
            </Box>
            {/* Content box */}
            <Box
                sx={{
                    position: 'relative',
                    height: '40vh',
                    backgroundPosition: 'center center',
                    backgroundImage: `linear-gradient(0deg,#fff,hsla(0,0%,100%,.8)), url(${category.image})`,
                    backgroundSize: 'cover',
                    borderRadius: 1,
                    backdropFilter: 'blur(8px)',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingTop: '64px',
                        paddingBottom: '40',
                        position: 'relative',
                        zIndex: 1,
                        gap: '40px',
                        paddingLeft: '32px',
                        paddingRight: '32px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    {/* Avatar */}
                    <Avatar
                        sx={{ width: 192, height: 192, }}
                        variant="rounded"
                        src={category?.image}
                        alt="category image"
                    />
                    <Box>
                        <Typography variant="h1" sx={{
                            fontFamily: 'system-ui',
                            fontWeight: 800, fontSize: '2.2rem', paddingTop: 0
                        }}
                            color="textPrimary">
                            {category?.name}
                        </Typography>
                        <Typography variant='h2' style={{
                            paddingTop: '1rem',
                            marginBottom: '1rem',
                        }} sx={textStyle}>{category.description}
                        </Typography>
                        <Grid sx={{ padding: '0.5rem' }} container spacing={2}>
                            <Grid item xs={3.7} >
                                <Typography sx={{
                                    alignItems: 'center',
                                    lineHeight: '16px',
                                    fontSize: '12px',
                                    letterSpacing: '.4px',
                                    fontWeight: 600,
                                }}
                                    style={{
                                        background: 'rgba(114, 226, 227, 0.2)',
                                        borderRadius: '8px',
                                        padding: "4px 8px",
                                        gap: "4px",
                                        // line-height: 16px,
                                        // font-weight: 60
                                    }}>Royalty-free
                                    <Tooltip title="all of the tracks are free only to personal use !">
                                        <PaidIcon sx={{ marginLeft: '0.5rem' }} fontSize='0.3rem' />
                                    </Tooltip>

                                </Typography>
                            </Grid>
                            <Grid item xs={2.5}>
                                <Typography sx={textStyle} style={{ fontWeight: 700 }}>
                                    {`${numOfTracks} tracks`}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography sx={textStyle}> {Math.floor(lengthOfAllTracks / 60)} hrs {Math.floor(lengthOfAllTracks % 60)} mins
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography sx={textStyle}> Created by musician @ Not for commercial use</Typography>
                    </Box>
                </Box>
            </Box>
            <Stack direction="row" spacing={1} sx={{ marginTop: '1.2rem', marginLeft: '1rem' }}>
                <Button variant="contained" sx={{ borderRadius: 7.8, color: 'white' }} onClick={() => { props.setDisplayPlayer(true) }} startIcon={<PlayArrow />}>
                    Play
                </Button>
                <Button variant="outlined" onClick={props.onShuffleClick} sx={{ borderRadius: 7.8, }}>
                    shuffle
                </Button>
            </Stack>
        </Box >
    );
};

export default PlaylistHeader;
