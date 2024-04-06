import styled from "@emotion/styled";
import { Box, Button, Grid, Paper } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const PersonalArea = () => {
    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                    <Item>
                    <Button><Link to="/EditSongs">edit songs</Link></Button></Item>
                </Grid>
                <Grid item xs={8}>
                    <Item><Button><Link to="/AddSong">add new song</Link></Button></Item>
                </Grid>
            </Grid>
            {/* <Outlet /> */}
        </Box>
    </>);
}

export default PersonalArea;