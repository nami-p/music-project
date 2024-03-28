import { Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../design/loading/loading.css"
import Loading from "../loading/loading";

const Songs = () => {
    // const tempSongs = useSelector()
    const songs = useSelector((state) => state.songs.songs);
    // const user = useSelector((state) => state.login.user);
    const status = useSelector((state) => state.songs.status);

    useEffect(() => {
        // setSongs(tempSongs);
    }, [])
    console.log(songs, "songs");
    return (<>
        {status === 'idle' &&
        <Loading/>}
        {status === "fulfilled" &&
            <Link to="/playlist"
                state={{
                    songs: undefined, category: undefined, isPlaylist: false
                }}
            >
                hello world
            </Link>}
    </>);
}

export default Songs;