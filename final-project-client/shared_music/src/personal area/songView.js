import { useLocation } from "react-router-dom";
import BlogView from "../Reviews/ReviewsPerSongContainer";

const SongView = (props) => {
    const location = useLocation();
    const s = location?.state?.songId ? location?.state?.songId : null ;

    return ( <>
        <BlogView songId={s} />
    </> );
}
 
export default SongView;