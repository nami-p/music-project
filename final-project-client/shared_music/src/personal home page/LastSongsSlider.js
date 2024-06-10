import { Swiper, SwiperSlide } from 'swiper/react';
import "../design/LastSongs/swiper.css"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSongsForUser } from '../Songs/SongsSlice';
import Collection from './collectionAndLikes';
// import SwiperCore, { Autoplay } from 'swiper'; // Import SwiperCore and Autoplay module
// SwiperCore.use([Autoplay]);
import { Autoplay } from 'swiper/modules'
import { Link } from 'react-router-dom';

const LastSongsSwiper = () => {
  const userId = useSelector((state) => state.login.user?.id);
  const playbacks = useSelector((state) => state.songs.songsToUser);
  const status = useSelector((state) => state.songs.songsToUserStatus);
  const [popularSongs, setPopularSongs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof userId === 'number' && status !== 'fulfilled');
    dispatch(fetchSongsForUser(userId));
  }, [userId]);

  useEffect(() => {
    if (status === 'fulfilled' && playbacks[0] && typeof playbacks[0] === 'object') {
      console.log('before sorting: ', playbacks);
      const sortedPlaybacks = [...playbacks]; // Create a new array
      sortedPlaybacks.sort((a, b) => b.count - a.count); // Sort the new array
      console.log('after sorting: ', sortedPlaybacks);
      sortedPlaybacks.slice(0, 5)
      setPopularSongs(sortedPlaybacks);
    }
  }, [playbacks, status]);
  console.log(popularSongs);
  const songs = popularSongs?.map(s => (
    {
      ...s,
      name: s?.song?.name,
      author: s?.song?.user?.firstName + " " + s?.song?.user?.lastName,
      image: s?.song?.image,
      avatar: s?.profilImage,
    })
  );

  return (<>
    {userId ? <div id="LastSongs" >
      <div className='body '>
        <div className='section'>
          <div className="song-container">
            <h1>Your popular songs</h1>
            <div className='swiper'>

              <Swiper
                autoplay={{
                  delay: 3000, // Set the autoplay delay in milliseconds
                  disableOnInteraction: false
                }} // Continue autoplay even when user interacts with the swiper
                grabCursor={true}
                speed={600}
                mousewheel={{ invert: false }}
                scrollbar={{ draggable: true }}
                slidesPerView={3}
                spaceBetween={10}
                breakpoints={{
                  900: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}

                modules={[Autoplay]}
              >
                {songs?.map((song,index) =>
                (<>
                  <SwiperSlide className="swiper-slide post" key={`song${index}`}>
                  <Link style={{ "textDecoration": "none" ,"cursor":'pointer'}} to="/songContainer"
                        state={{
                            song: song
                        }} >
                    <img
                      className="post-img"
                      src={song.image}
                      alt="song" />

                    <div className="post-body">
                      <img
                        alt="user"
                        className="post-avatar"
                        src={song.avatar} />
                      <div className="post-detail">
                        <h2 className="post-name">{song.name}</h2>
                        <p className="post-author">{song.author}</p>
                      </div>

                      
                    </div>
                    </Link>
                  </SwiperSlide>

                </>)
                )}
                <div className="swiper-scrollbar"></div> </Swiper>
            </div>
          </div>
          <Collection />

        </div>
      </div>
    </div> : <div style={{ 'width': '100vw', 'height': '100vh' ,justifyContent:'center',alignItems:'center',display:'flex'}}>
      <img src='assets/images/7906226_3805046.jpg' style={{ height: '90vh', }}></img>
    </div>}</>)
}
export default LastSongsSwiper;