import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { disconnect } from "../Login/loginSlice";
import { useNavigate } from "react-router-dom";

const LoggedOut = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    return (  <>
        <div>
            <p>are you sure you wanna be in disconect mode?</p>
            <Button onClick={()=>{dispatch(disconnect());navigate("/");}}>yes</Button>
            <Button onClick={()=>navigate(-1)}>back</Button>
        </div>
    </>);
}
 
export default LoggedOut;