import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { disconnect } from "../Login/loginSlice";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { useState } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close'

const LoggedOut = () => {
    const [open, setOpen] = useState(true);

    const navigate = useNavigate()
    const dispatch = useDispatch();
    return (<>
        {/* <div style={{ 'width': '100vw', 'height': '100vh', 'justifyContent': 'center', 'alignItems': 'center', 'display': 'flex', 'flexDirection': 'column' }}> */}
        {/* <p>Are you sure you want to be in disconnect mode?</p>
            <div style={{'display':'flex','justifyContent':'center'}}>
                <Button onClick={() => { dispatch(disconnect()); navigate("/"); }}>yes</Button>
                <Button onClick={() => navigate(-1)}>back</Button>
            </div> */}
        <Box className="page" sx={{ width: '100%',height:'100%' }} style={{'justifyContent':'center','alignItems':'center','padding-top':'7vh','padding':'20%'}}>
            <Collapse in={open}>
                <Alert severity="warning"
                    action={
                        <>
                            <Button onClick={() => { dispatch(disconnect()); navigate("/"); }}>
                                ok
                            </Button>
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </>
                    }
                    sx={{ mb: 2 }}
                >
                    After clicking ok you will be in a disconnect mode!
                </Alert>
            </Collapse>
            <Button
                disabled={open}
                variant="outlined"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Re-open
            </Button>
        </Box>

        {/* </div> */}

    </>);
}

export default LoggedOut;