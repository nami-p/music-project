
import {  useDispatch, useSelector } from 'react-redux';
// import '../design/login/sighnIn.css'
import '../design/login/login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  setUser, rememberMeChecked, connectu } from './loginSlice';
import { useEffect, useRef, useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import SignUp from './SignUp';
import { fetchSongsForUser } from '../Songs/SongsSlice';

const SighnIn = () => {
  const email = useRef();
  const password = useRef();
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rememberMe1 = useRef();
  let [signin,setsignIn]=useState(true);
  let [signUp,setSignUp]=useState(false);
  const songsToUserStatus=useSelector(state => state.songs.songsToUserStatus)

  const handleSubmit = async () => {

    console.log({
      email: email.current.value,
      password: password.current.value,
    });
    if (user == null) {
      const url = `https://localhost:7001/api/User/${password.current.value}/${email.current.value}`;
      axios.get(url)
        .then((response) => {
          console.log("response:", response.data);
          if (typeof response.data.id === 'number' && response.data.id !== 0) {
            if (rememberMe1.current.checked) {
              dispatch(rememberMeChecked(true)); // Dispatch true if checkbox is checked
            }
            dispatch(connectu(true));
            dispatch(setUser(response.data));
            if (songsToUserStatus != "fulfilled")
            // alert("hello " + user.firstName + " " + user.lastName);
            navigate(-1);
          }
          else {
            alert(("wrong password or email"))
          }
        })
        .catch(error => {
          alert(error)

        })
    }
    else {
      alert("you are conected");
      navigate(-1);
    }
  }
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    const modal = document.querySelector(".modal");
    const modalButton = document.querySelector(".modal-button");
    const closeButton = document.querySelector(".close-button");
    const scrollDown = document.querySelector(".scroll-down");

    const openModal = () => {
      modal.classList.add("is-open");
      body.style.overflow = "hidden";
    };

    const closeModal = () => {
      setSignUp(false);
      setsignIn(true)
      modal.classList.remove("is-open");
      body.style.overflow = "initial";
      navigate(-1);
    };

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !isOpened) {
        setIsOpened(true);
        scrollDown.style.display = "none";
        openModal();
      }
    };

    const handleKeyDown = (evt) => {
      evt = evt || window.event;
      if (evt.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener("scroll", handleScroll);
    modalButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    document.onkeydown = handleKeyDown;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      modalButton.removeEventListener("click", openModal);
      closeButton.removeEventListener("click", closeModal);
      document.onkeydown = null;
    };
  }, [isOpened]);

  return (
    <>
      <div className="scroll-down">SCROLL DOWN
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z" />
        </svg>
      </div>
      <div className="container">
    <div className="modal">
        <div className="modal-container">
        {signin&&  <div className="modal-left">
            <h1 className="modal-title">Welcome!</h1>
            <p className="modal-desc">Fanny pack hexagon food truck, street art waistcoat kitsch.</p>
            <div className="input-block">
              <label htmlFor="email" className="input-label" >Email</label>
              <input type="email" name="email" id="email" ref={email} placeholder="Email" />
            </div>
            <div className="input-block">
              <label htmlFor="password" className="input-label">Password</label>
              <input type="password" name="password" id="password" ref={password} placeholder="Password" />
            </div>
            <div className="modal-buttons">
              <Link to={"/forgotPassword"}>Forgot your password?</Link>
              <button className="input-button" onClick={handleSubmit}>Login</button>
            </div>
            <FormControlLabel
              control={<Checkbox ref={rememberMe1} value="remember" color="primary" />}
              label="Remember me"
            />         
            <p className="sign-up">Don't have an account? <Link onClick={()=>{
              setsignIn(false);
              setSignUp(true)
              }} >Sign up now</Link></p>
          </div>}
          {signUp&&<SignUp/>}
          <div className="modal-right">
            {/* <img src="https://images.unsplash.com/photo-1526739178209-77cd6c6bcf4f?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" ></img> */}
            <img src="	https://cdn.pixabay.com/photo/2018/05/28/12/09/headphones-3435885_1280.jpg" alt="" ></img>
          </div>
          <button className="icon-button close-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
            </svg>
          </button>
        </div>
        <button className="modal-button">Click here to login</button>
      </div>
      </div>
    </>
  );
}

export default SighnIn;