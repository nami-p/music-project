import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Link } from "react-router-dom";

const Collection = () => {
    return (<>
        <div className="flexContainer">

            <div className="song-container" id="container-left">
                <Link>
                    <h1>Your Collection</h1>
                    <FavoriteBorderIcon className="heart-icon" />
                </Link>

            </div>
            <div className="song-container" id="container-right">
                <h1>Your favorites</h1>
                <AutoAwesomeIcon className="heart-icon" />
            </div>
        </div>
    </>);
}

export default Collection;