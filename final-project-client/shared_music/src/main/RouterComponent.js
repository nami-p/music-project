import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../Home/Home';
import NavBar from '../NavBar.js/NavBar';
import SignUp from '../Login/SignUp';
import SighnIn from '../Login/SignIn';
import AllCategories from '../AllCategories/AllCategories';
import Playlist from '../playlist/Playlist';
import AllSongs from '../Songs/AllSongs';
import AddNewSong from '../personal area/AddNewSong';
import PersonalArea from '../personal area/PersonalArea';
import EditSongs from '../personal area/EditSongs';
import Users from '../Users/UsersProfile';
import LoggedOut from '../LogOut/LogOut';
import Loading from '../loading/loading';
import UserProfile from '../Users/UserProfile';
import ForgotPassword from '../Login/forgotPassword';
import LastSongsSwiper from '../personal home page/LastSongsSlider';
import Search from '../personal area/GenerateImages';
import StarsRating from '../Reviews/starsRating';
import SongView from '../personal area/songView';
import SongContainer from '../songDisplay/songContainer';


const RouterComponents = () => {

    return (<>
        <Router>
            <Routes>
                <Route path='/' element={<NavBar />}>
                    <Route index element={<Home />} />
                    <Route path="Login" element={<SighnIn />} />
                    <Route path="Playlists" element={<AllCategories />} />
                    <Route path="SignUp" element={<SignUp />} />
                    <Route path="playlist" element={<Playlist />} />
                    <Route path="AllSongs" element={<AllSongs />} />
                    <Route path="Account" element={<PersonalArea />} >
                        {/* <Route path="AddSong" element={<AddNewSong />} />
                        <Route path="EditSong" element={<EditSongs />} /> */}
                    </Route>
                    <Route path="AddSong" element={<AddNewSong />} />
                    <Route path="EditSongs" element={<EditSongs />} />
                    <Route path="Users" element={<Users />} />
                    <Route path="LogOut" element={<LoggedOut />} />
                    <Route path="loading" element={<Loading />} />
                    <Route path="forgotPassword" element={<ForgotPassword />} />
                    <Route path="userProfile/:userId" element={<UserProfile />} >
                        <Route path='playlist' element={<Playlist/>}/>
                    </Route>
                    <Route path='homePage' element={<LastSongsSwiper/>}></Route>
                    <Route path='songContainer' element={<SongContainer/>}></Route>
                    <Route path='generateImage' element={<Search/>}></Route>
                    <Route path='songView' element={<SongView/>}></Route>
                    {/* <Route path='rr' element={<StarsRating/>}></Route> */}
                </Route>
            </Routes>
        </Router>
    </>);
}

export default RouterComponents;