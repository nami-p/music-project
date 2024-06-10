import { Avatar, Box, Card, CardContent, Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import MailIcon from '@mui/icons-material/Mail';
import { useEffect, useState } from "react";

const UserProfile = () => {
    let { userId } = useParams();
    const defaultDate = new Date().toISOString().slice(0, 10) ;
    const users = useSelector(state => state.users.users) || [];
    const user = users?.find(x => x.id == userId);
    const [firstUpload, setFirstUpload] = useState(defaultDate);
    const [numOfLikes, setNumOfLikes] = useState(0);
    const [numOfListenings, setNumOfListenings] = useState(0);
    const [numOfDownloads, setNumOfDownloads] = useState(0);
    const [numOfListeners, setNumOfListeners] = useState(0);
    let songs = useSelector(state => state.songs?.songs) || [];
    const status = useSelector(state => state.songs?.status);
    const navigate = useNavigate();
    const textStyle = {
        fontFamily: 'system-ui',
        fontSize: '1rem',
        letterSpacing: '-0.3px',
        height: '20px',
        fontWeight: 400,
    };
  
    useEffect(() => {
        if (status === 'fulfilled' && songs[0] && typeof songs[0] === 'object') {
            songs = songs?.filter((song) => song.userId == userId);
            let numOfLikes = 0;
            let numOfListenings = 0;
            let numOfDownloads = 0;
            let numOfListeners = 0;
            let earlierUpload = defaultDate;
            songs?.forEach(song => {
                numOfLikes += song.numOfLikes;
                numOfListenings += song.numOfPlays;
                numOfDownloads += song.numOfDownloads;
                numOfListeners = numOfListeners>song.numOfListeners?numOfListeners:song.numOfListeners;
                const songDate = new Date(song?.uploadDate.slice(0, 10) );
                earlierUpload = songDate < earlierUpload ? songDate : earlierUpload;
            });
            setFirstUpload(earlierUpload);
            setNumOfLikes(numOfLikes);
            setNumOfListenings(numOfListenings);
            setNumOfDownloads(numOfDownloads);
            setNumOfListeners(numOfListeners);
            navigate('playlist', {
                state: {
                    songs,
                    category: undefined,
                    isPlaylist: false,
                },
            });

        }

    }, [status, songs, userId]);
    const kFormatter = (num) => {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    }

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    height: '47vh',
                    backgroundPosition: 'center center',
                    backgroundImage: `linear-gradient(0deg, rgba(25, 27, 38, .32), rgba(25, 27, 38, .72)), url(${user?.profilImage})`,
                    backgroundSize: 'cover',
                    borderRadius: 1,
                    backgroundPosition: 'center 25%',
                }}
            >
                <Box className="people__image" sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center', height: '54vh' }}>
                    <Avatar src={user?.profilImage} alt={user?.profilImage} sx={{ width: 136, height: 136 }}
                        style={{
                            "border": '4px solid #fff'
                        }} />
                </Box>
                <Box style={{
                    "display": "flex",
                    "flexDirection": "column",
                    "alignItems": "center",
                    "textAlign": "center",
                    "padding": '1rem',
                }}>
                    <Typography variant="h1" sx={{ fontWeight: 800, fontSize: '2.2rem' }}> {user?.name}</Typography>
                    <p style={{ "margin": "1rem", "width": "40vw" }}>{user?.description}</p>
                    <Grid sx={{ padding: '0.5rem', width: "40vw", justifyContent: "center", }}
                        container spacing={2}>
                        <Grid item xs={4} >
                            <Typography sx={{
                                alignItems: 'center',
                                lineHeight: '16px',
                                fontSize: '12px',
                                letterSpacing: '.4px',
                                fontWeight: 600,
                            }}
                                style={{
                                    background: 'rgba(114, 226, 227, 0.2)',
                                    borderRadius: '8px',
                                    padding: "4px 8px",
                                    gap: "4px",
                                    // line-height: 16px,
                                    // font-weight: 60
                                }}>{user?.email}
                                <MailIcon sx={{ marginLeft: '0.5rem' }} fontSize='0.3rem' />

                            </Typography>
                        </Grid>
                        <Grid item xs={0.1}><Typography>•</Typography></Grid>
                        <Grid item xs={1.5}>
                            <Typography sx={textStyle} style={{ fontWeight: 700 }}>
                                Age {user?.age}
                            </Typography>
                        </Grid>
                        <Grid item xs={0.1}><Typography>•</Typography></Grid>

                        <Grid item xs={4}>
                            <Typography sx={textStyle} > First upload at {firstUpload.split('T')[0]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box >
                <Box sx={{
                    display: 'flex', alignItems: 'end', justifyContent: 'center', height: '15vh',
                    gap: '1rem'
                }}>
                    <Card
                        elevation={0}
                        sx={{
                            width: '6vw',
                            border: 1,
                            borderRadius: '50% 50% 0% 62% / 50% 50% 49% 49%',
                            borderColor: '#72e2e3'
                        }}>
                        <CardContent sx={{ textAlign: 'center' }}>

                            <Typography style={{ fontWeight: 700 }} variant="h7" component="div">
                                {kFormatter(numOfLikes)}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Likes
                            </Typography>

                        </CardContent>

                    </Card>

                    <Card elevation={0}
                        sx={{
                            border: 1,
                            borderRadius: '60% 0% 0% 0% / 57% 50% 47% 47%',
                            borderColor: '#72e2e3'

                        }}>
                        <CardContent sx={{ textAlign: 'center' }}>

                            <Typography style={{ fontWeight: 700 }} variant="h7" component="div">
                                {kFormatter(numOfListenings)}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Playbacks
                            </Typography>

                        </CardContent>

                    </Card>
                    <Card elevation={0}
                        sx={{
                            border: 1,
                            // borderRadius: '78% 19% 73% 0% / 63% 0% 66% 48%',
                            borderRadius : '50% 50% 0% 50% / 0% 50% 58% 50%',
                            borderColor: '#72e2e3'

                        }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography style={{ fontWeight: 700 }} variant="h7" component="div">
                                {kFormatter(numOfDownloads)}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Downloads
                            </Typography>

                        </CardContent>

                    </Card>
                    <Card elevation={0}
                        sx={{
                            border: 1,
                            // borderRadius:'50% 50% 48% 0% / 48% 46% 50% 50%'
                            borderRadius:'50% 50% 50% 0%',
                            borderColor: '#72e2e3'

                        }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography style={{ fontWeight: 700 }} variant="h7" component="div">
                                {kFormatter(numOfListeners)}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                               Top listeners
                            </Typography>

                        </CardContent>

                    </Card>
                </Box>
            </Box >
            <Box sx={{marginTop:'50vh'}}>
                <Outlet />
            </Box>

        </>
    );
}

export default UserProfile;
