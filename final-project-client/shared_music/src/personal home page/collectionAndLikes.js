import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';


const Collection = () => {
    const playbacks = useSelector((state) => state.songs.songsToUser);
    const status = useSelector((state) => state.songs.songsToUserStatus);
    const [favorites, setFavorites] = useState([]);
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        if (status === 'fulfilled' && playbacks[0] && typeof playbacks[0] === 'object') {
            setFavorites(playbacks.filter(p => p.love === true).map(s => s.song));
            setCollection(playbacks.filter(p => p.addToCollection === true).map(s => s.song));
        }

    }, [playbacks, status,])

    return (<>
        <div className="flexContainer">

            <div className="song-container" id="container-left">
                {status === 'fulfilled' ?
                    <Link to="/playlist"
                        state={{
                            songs: favorites, category: undefined, isPlaylist: false
                        }}>
                        <h1>Your favorites</h1>
                        <FavoriteBorderIcon className="heart-icon" />
                    </Link>
                    :
                    <><h1>Your favorites</h1>
                        <FavoriteBorderIcon className="heart-icon" />
                    </>
                }
            </div>
            <div className="song-container" id="container-right">
                {status === 'fulfilled' ?
                    <Link to="/playlist"
                        state={{
                            songs: collection, category: undefined, isPlaylist: false
                        }}>
                        <h1>Your collection</h1>
                        <AutoAwesomeIcon className="heart-icon" />
                    </Link>
                    :
                    <>
                        <h1>Your collection</h1>
                        <AutoAwesomeIcon className="heart-icon" />
                    </>
                }
            </div>

        </div>
        <div className="song-container review" >

                
                <h1>Your reviwes</h1>
                <DriveFileRenameOutlineIcon className="review-icon"/>

        </div>
    </>);
}

export default Collection;