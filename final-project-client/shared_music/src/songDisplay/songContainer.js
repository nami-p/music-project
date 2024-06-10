import { useLocation } from "react-router-dom";
import SongComments from "../Reviews/SongComments";
import AudioVisualizer from "./Visualition";
import { Box, Grid } from "@mui/material";
import RatingMark from "./RatingMark";

const SongContainer = (props) => {

    const location = useLocation();
    const song = location.state?.song;

    return (<>
        <Box>
            <AudioVisualizer />
            <Grid container spacing={2}>
                <Grid item xs={9.5} >
                    <SongComments songId={song?.songId}></SongComments>
                </Grid>
                <Grid item xs={2.5}>
                    <RatingMark />
                </Grid>
            </Grid>
        </Box>


    </>);
}

export default SongContainer;