import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { setUserProfilImage } from '../Login/loginSlice';
import { useNavigate } from "react-router-dom";



function ResponsiveAppBar() {

  const user = useSelector(state => state.login.user);

  const pages = ['Login', 'Playlists', 'homePage', 'AllSongs', 'Users'];
  const settings = [{ name: 'Profile', link: "/userProfile/" + user?.id }, { name: 'Account', link: 'Account' }, { name: 'Dashboard', link: 'Dashboard' }, { name: 'Logout', link: 'Logout' }];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [image, setImage] = React.useState("/static/images/avatar/2.jpg");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && (user.profilImage.slice(0, 4) == "data"||image!="/static/images/avatar/2.jpg")) {
      setImage(user.profilImage)
    }
    else {
      if (user && user.profilImage) {

        axios.get(`https://localhost:7001/api/User/getImage/${user.profilImage}`)
          .then(response => {
            setImage(response.data); // Assuming the data already contains the base64 string
            dispatch(setUserProfilImage(response.data));
          })
          .catch(error => {
            console.error("Error fetching image:", error);
          });
      }
      else {
        setImage("/static/images/avatar/2.jpg");
      }
    }
  }, [user])



  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);

  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>

      <AppBar elevation={0} color="transparent" sx={{ backdropFilter: "blur(20px)", marginBottom: '5vh' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            {/* <Typography
              variant="h6"
              noWrap
              component="a"

              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: "primary",
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography> */}
            {/* <img src='assets/images/logo.jpg' ></img> */}
            <Box onClick={() => { navigate('/') }}
              component="img"
              sx={{
                height: 65,
                width: 80,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src='assets/images/logo.png'
            />
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page,index) => (
                  <MenuItem key={`pages${index}`} onClick={() => handleCloseNavMenu(page)}>
                    <Typography textAlign="center">
                      <Link className="nav-link" style={{ 'textDecoration': 'none', 'color': '#72e2e3' }} to={page}>{page}</Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              
              <Link to={"/"} />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page,index) => (

                <Button

                  key={`page${index}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link className="nav-link" style={{ 'textDecoration': 'none', 'color': '#72e2e3' }} to={page}>{page}</Link>
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar sx={{ width: 56, height: 56 }} alt="profil image" src={user?.profilImage || "/static/images/avatar/2.jpg"} /> */}
                  <Avatar sx={{ width: 56, height: 56 }} alt="profil image" src={image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting,index) => (
                  <MenuItem key={`setting${index}`} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      {user && <Link className="nav-link" to={setting.link}>{setting.name}</Link>}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default ResponsiveAppBar;