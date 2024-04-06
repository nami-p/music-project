import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import Iconify from './components/svg-color/iconify/iconify';

import PostCard from './ReviewPerSong';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import PostSort from '../post-sort';
// import PostSearch from '../post-search';

// ----------------------------------------------------------------------

export default function BlogView({ songId }) {

    const [posts, setPosts] = useState([]);


    async function fetchData() {
        if (!posts[0] && songId)
            try {
                const fromData = new FormData();
                fromData.append("SongId", songId)
                const response = await axios.post('https://localhost:7001/api/Review/joinReviewAndPlayback', fromData);

                setPosts(response.data.map(async(p, index) => {
                    const userImg = await axios.get(`https://localhost:7001/api/User/getImage/${p.profilImage}`)
                    return ({
                        id: p.id,
                        cover: `/assets/images/covers/cover_${index + 1}.jpg`,
                        title: p.content,
                        createdAt: p.date,
                        view: p.userCount,
                        comment: 5,
                        share: 220,
                        favorite: 5,
                        author: {
                            name: "faker",
                            avatarUrl: userImg.data,
                        },


                    })
                }
                ));
            }
            catch (err) {
                console.log(err);
            }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (<>
        {posts[0] && <Container>

            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            </Stack>

            <Grid container spacing={3}>
                {posts.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                ))}
            </Grid>
        </Container>

        }


    </>);
}