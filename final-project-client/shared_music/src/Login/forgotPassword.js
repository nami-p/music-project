import { Box, Button } from "@mui/material";
import '../design/login/forgotPassword.css';
import SendIcon from '@mui/icons-material/Send';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { connectu, setUser } from "./loginSlice";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const [emaiSent, setEmaiSent] = useState(false);
    const email = useRef("example@gmail.com");
    const verify = useRef("1234");
    const [message, setMessage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sendEmail = async () => {
        try {
            setMessage(true);
            const formData = new FormData();
            formData.append("Email", email.current.value);
            const response = await axios.post("https://localhost:7001/api/User/login", formData);
            if (response.data.message === "Email sent succesfully") setEmaiSent(true);
        }
        catch (err) {
            console.log(err)
        }
    }
    const verifCode = async () => {
        const formData = new FormData();
        formData.append("Code", verify.current.value);
        const response = await axios.post("https://localhost:7001/api/User/verify", formData);
        if (!response.data?.message) {
            dispatch(connectu(true));
            dispatch(setUser(response.data));
            // alert("hello " + user.firstName + " " + user.lastName);
            navigate("/");
        }
    }
    return (
        <div id="password1" >
            <div className="Pcontainer">
                {!emaiSent ? <Box className="beforeImage" /> : <Box className="afterImage" />}
                {!emaiSent && < div className="PtextContainer">
                    <h2>Forgot password?</h2>
                    <div className="Psection">
                        <p>Don't worry, happens to the best of us .</p>
                        <p>Type your email to reset your password .</p>
                    </div>
                    <div className="input-block">
                        <label htmlFor="email" className="input-label">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email" ref={email} />
                    </div>
                    <Button className="Pbutton" variant="contained" size="large" startIcon={<SendIcon />} onClick={sendEmail}>
                        Send
                    </Button>
                    {message &&
                        <>
                            <p>email will be sent in a few seconeds</p>
                        </>}
                </div>}
                {emaiSent &&
                    <>
                        <div className="PtextContainer">
                            <h2>Email sent!</h2>
                            <div className="Psection">
                                <p>We have sent email to</p>
                                <p>{email.current.value} with a code to sign in</p>
                                <p>without your password .</p>
                            </div>
                            <div className="input-block">
                                <label htmlFor="verify" className="input-label">Verify</label>
                                <input type="text" name="verify" id="verify" placeholder="Verification code " ref={verify} />
                            </div>
                            <div className="PbuttonsContainer">
                                <Button className="Pbutton" variant="contained" size="large" startIcon={<VerifiedUserIcon />} onClick={verifCode}>
                                    Verify
                                </Button>
                                <div className="modal-buttons">
                                    <a href="" className=""> send code again</a>

                                    <Button style={{"color":"white"}} className="input-button" variant="contained" size="large" startIcon={<></>} onClick={() => window.open('mailto:email@example.com?subject=Subject&body=Body%20goes%20here')}>
                                        Open email app
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </>
                }
            </div>
        </div >
    );
}

export default ForgotPassword;