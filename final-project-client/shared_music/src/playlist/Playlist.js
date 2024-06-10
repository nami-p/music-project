
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Link, useLocation } from "react-router-dom";
import StarsIcon from '@mui/icons-material/Stars';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Box, IconButton, Tooltip } from "@mui/material";
import PlaylistHeader from "./PlaylistHeader";
import { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import axios from "axios";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useSelector } from "react-redux";
import { allSongs } from "../Songs/SongsSlice";
import { gridPaginatedVisibleSortedGridRowIdsSelector } from "@mui/x-data-grid";

export default function Playlist(props) {
    const [hoverId, setHoverId] = useState(null);
    const location = useLocation();
    const category = location.state?.category;
    const isPlaylist = location.state?.isPlaylist;
    const [currentTrack, setTrackIndex] = useState(0);
    const [displayPlayer, setDisplayPlayer] = useState(false);
    const userId = useSelector((state) => state.login.user?.id);
    // const songs1 = useSelector((state) => state.songs.songs);
    const songs1 = useSelector(allSongs);
    const s = location.state.songs ? location.state.songs : songs1 || [];


    const shuffleRows = () => {
        const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
        const shuffledPlaylist = shuffledSongs?.map((s, index) => ({ ...s, id: index + 1 }));
        setSongs(shuffledPlaylist);
    };
    const handleClickNext = () => {
        console.log('click next')
        setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        );
    };

    const handleEnd = () => {
        console.log('end')
        setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        );
    };

    const playAsong = async (index) => {
        if (songs[0]) {
            if (!displayPlayer) {
                setDisplayPlayer(true);
            }
            setTrackIndex(index);
            try {
                const formData = new FormData();
                formData.append('NumOfPlays', songs[index].numOfPlays + 1);
                await axios.put(`https://localhost:7001/api/Song/UpdateSong/${songs[index].songId}`, formData);
            }
            catch (err) {
                console.log(err)
            }
            if (userId) {


                if (songs[index].playbackId) {
                    //update exist playback without await
                    const formData = new FormData();
                    formData.append('Love', songs[index].actions.likeIcon);
                    formData.append('Count', songs[index].playbacksCount + 1);
                    formData.append('AddToCollection', songs[index].actions.addedToCollection);
                    axios.put(`https://localhost:7001/sharedMusic/SongToUser/${songs[index].playbackId}`, formData);
                }
                else {
                    //create new playback without await
                    const formData = new FormData();
                    formData.append("Count", 1)
                    formData.append("SongId", songs[index].songId)
                    formData.append("UserId", userId)
                    formData.append('Love', songs[index].actions.likeIcon);
                    formData.append('AddToCollection', songs[index].actions.addedToCollection);
                    const response = await axios.post(`https://localhost:7001/sharedMusic/SongToUser`, formData);

                    setSongs(songs.map((s, i) => {
                        if (i === index)
                            return { ...s, playbackId: response.data.id };
                        else
                            return s;
                    }))
                }
            }
        }

    }

    const LikeAsong = async (paramsRow, like) => {
        if (userId) {
            let updateNeeded = "";
            const newLike = like ? !paramsRow.actions.likeIcon : paramsRow.actions.likeIcon;
            const newAddToCollection = like ? paramsRow.actions.addedToCollection : !paramsRow.actions.addedToCollection;
            setSongs(prevSongs => prevSongs?.map((song, i) => {
                if (song.songId === paramsRow.songId) {
                    updateNeeded = paramsRow.actions.likeIcon != newLike ? "like" : "addToCollection";
                    return ({
                        ...song, actions: {
                            collection: "add to collection",
                            like: "like",
                            download: "free download",
                            likeIcon: newLike,
                            addedToCollection: newAddToCollection,
                        },
                    })
                }
                else
                    return { ...song };
            }));
            if (paramsRow.playbackId === 0) {
                //create new playback
                const formData = new FormData();
                formData.append("Count", paramsRow.playbacksCount);
                formData.append("SongId", paramsRow.songId);
                formData.append("UserId", userId);
                formData.append('Love', newLike);
                formData.append('AddToCollection', newAddToCollection);
                const response = await axios.post(`https://localhost:7001/sharedMusic/SongToUser`, formData);
                setSongs(songs.map((s, i) => {
                    if (i === paramsRow.id)
                        return { ...s, playbackId: response.data.id };
                    else
                        return s;
                }))
            }
            else {
                //update exist playback
                try {
                    const formData = new FormData();
                    if (updateNeeded !== "") {
                        formData.append('UpdateNeeded', updateNeeded)
                    }
                    formData.append('Love', newLike);
                    formData.append('AddToCollection', newAddToCollection);
                    formData.append('SongId', paramsRow.songId);
                    axios.put(`https://localhost:7001/sharedMusic/SongToUser/${paramsRow.playbackId}`, formData);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        else {
            alert("you have to login");
        }



    };
    const DownloadAsong = async (paramsRow) => {


        try {
            const response = await axios.get(`https://localhost:7001/api/Song/downloadSong/${paramsRow.songName}`, {
                responseType: 'blob' // Set responseType to 'blob' to handle binary data
            });

            // Create a blob object from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', paramsRow.songName); // Set the download attribute with the file name
            document.body.appendChild(link);

            // Trigger the click event on the link to start the download
            link.click();

            // Cleanup: Remove the link and revoke the URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            try {
                const formData = new FormData();
                formData.append('NumOfDownloads', 1);
                axios.put(`https://localhost:7001/api/Song/UpdateSong/${paramsRow.songId}`, formData);
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }


    };

    const convertLengthToTime = (length) => {
        const minutes = Math.floor(length);
        const seconds = Math.round((length - minutes) * 100);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    const [songs, setSongs] = useState(s?.map((song, index) => {
        return ({
            songId: song.id,
            id: index + 1,
            name: song.name,
            image: { avatar: song.image },
            detailes: {
                length: convertLengthToTime(song.length),
                raters: song.numOfRaters
            },
            actions: {
                collection: "add to collection",
                like: "like",
                download: "free download"
            },
            song: song.song1,
            songName: song.songName,
            numOfPlays: song.numOfPlays,
            // like: likes[index]?.like || false,

        })
    }));

    useEffect(() => {
        async function isLike() {
            let tempLikes = [];
            for (let i = 0; i < s.length; i++) {
                const songId = s[i].id || songs1;
                if (userId) {
                    try {
                        const response = await axios.get(`https://localhost:7001/sharedMusic/SongToUser/GetByUserAndSong/${userId}/${songId}`);
                        tempLikes[i] = { like: response.data.love, playbackId: response.data.id, addToCollection: response.data.addToCollection, count: response.data.count };
                    } catch (error) {
                        tempLikes[i] = { like: false, playbackId: 0, addedToCollection: false, count: 0 };
                    }
                } else {
                    tempLikes[i] = { like: false, playbackId: 0, addedToCollection: false, count: 0 };
                }
            }
            setSongs(prevSongs => prevSongs?.map((song, i) => ({
                ...song, playbackId: tempLikes[i].playbackId || 0, playbacksCount: tempLikes[i].count || 0, actions: {
                    collection: "add to collection",
                    like: "like",
                    download: "free download",
                    likeIcon: tempLikes[i].like || false,
                    addedToCollection: tempLikes[i].addToCollection || false,
                },
            })));
        }

        isLike();
    }, []);

    const playlist = songs?.map((s) => ({ src: s.song }));


    const columns = [
        {
            field: "id", headerName: "#", width: 40
        },

        {
            field: "image",
            headerName: "TRACK",
            type: 'actions',
            width: 78,
            renderCell: (params) => {

                return (
                    <IconButton sx={{ padding: 0 }} onClick={() => playAsong(params.row.id - 1)}>
                        <Avatar
                            onMouseEnter={() => {
                                setHoverId(params.row.id);
                                //    <Box style = {{
                                //         color: 'rgb(255, 255, 255)',
                                //         background:' rgba(25, 27, 38, 0.64)',
                                //         opacity:1
                                //     }}/>
                            }}
                            onMouseLeave={() => setHoverId(null)}
                            sx={{ width: 56, height: 56 }}

                            variant="rounded"
                            src={params.value.avatar} className="playImage">
                        </Avatar>
                        {
                            params.row.id === hoverId && (
                                <Box style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 2, transform: 'translate(-50%,-50%)', }}>
                                    <PlayArrowIcon sx={{ color: "#fff" }} />
                                </Box>
                            )
                        }
                    </IconButton >
                );
            }
        },
        {
            field: "name",
            headerName: "",
            width: 1000,
            renderCell: (params) => {
                return (
                    <Link style={{ "textDecoration": "none" }} to="/songContainer"
                        state={{
                            song: params.row
                        }} onClick={() => playAsong(params.row.id - 1)}>
                        {params.value}
                    </Link>
                )
            }
        },
        {
            field: "detailes",
            headerName: "DETAILS",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {params.value.length}
                        {params.value.raters ? <StarsIcon fontSize="small" color="primary" sx={{ margin: "0.5rem" }}></StarsIcon> : <></>
                        }
                    </>
                );
            }
        },
        {
            field: "actions",
            type: 'actions',
            headerName: "ACTIONS",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton sx={{ padding: 0 }} onClick={() => LikeAsong(params.row, false)}>
                            <Tooltip title={params.value.collection}>
                                {params.value.addedToCollection ? <BookmarkIcon sx={{ margin: "0.5rem" }} fontSize="small" color="primary"></BookmarkIcon>
                                    : <BookmarkBorderIcon sx={{ margin: "0.5rem" }} fontSize="small" color="primary"></BookmarkBorderIcon>}
                            </Tooltip>
                        </IconButton>
                        <IconButton sx={{ padding: 0 }} onClick={() => LikeAsong(params.row, true)}>
                            <Tooltip title={params.value.like}>
                                {params.value.likeIcon ? <FavoriteIcon sx={{ margin: "0.5rem" }} fontSize="small" color="primary" />
                                    : <FavoriteBorderIcon sx={{ margin: "0.5rem" }} fontSize="small" color="primary"></FavoriteBorderIcon>}
                            </Tooltip>
                        </IconButton>
                        <IconButton sx={{ padding: 0 }} onClick={() => DownloadAsong(params.row)}>
                            <Tooltip title={params.value.download}>
                                <SaveAltIcon sx={{ margin: "0.5rem" }} fontSize="small" color="primary"></SaveAltIcon >
                            </Tooltip>
                        </IconButton>
                    </>
                );
            }
        },


    ];

    const rows = songs;
    const apiRef = useGridApiRef();

    const handleSelectFirstVisibleRow = (currentTrack) => {
        const visibleRows = gridPaginatedVisibleSortedGridRowIdsSelector(apiRef); // Pass apiRef to the function
        if (visibleRows.length === 0) {
            return;
        }

        apiRef.current.selectRow(
            visibleRows[currentTrack],
            !apiRef.current.isRowSelected(visibleRows[currentTrack]),
        );
    };

    // useEffect(() => {
    //     handleSelectFirstVisibleRow(currentTrack);
    // }, [currentTrack]);

    return (
        <div>
            {isPlaylist && <PlaylistHeader Category={category} setDisplayPlayer={setDisplayPlayer} onShuffleClick={shuffleRows} />}
            <DataGrid

                sx={{
                    border: "none", padding: "1.8rem",
                    // disable cell selection style
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none'
                    },
                }}
                rowHeight={80}
                rows={rows}
                columns={columns}
                pageSizeOptions={[5]}
                hideFooterSelectedRowCount
                initialState={{
                    
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
            />
            {/* <DataTable></DataTable> */}
            {displayPlayer && <AudioPlayer
                style={{
                    position: "fixed",
                    left: 0,
                    bottom: 0,
                    width: '100 %'
                }}

                autoPlay
                showSkipControls
                showJumpControls={false}
                src={playlist[currentTrack]?.src}
                onPlay={(e) => console.log(e, "now playing")}
                onClickNext={handleClickNext}
                onEnded={handleEnd}
                onError={() => { console.log('play error') }}
            // other props here
            />}
        </div>
    );
}