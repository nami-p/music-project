import { Swiper, SwiperSlide } from 'swiper/react';
import "../design/LastSongs/swiper.css"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSongsForUser } from '../Songs/SongsSlice';
import Collection from './collectionAndLikes';
// import SwiperCore, { Autoplay } from 'swiper'; // Import SwiperCore and Autoplay module
// SwiperCore.use([Autoplay]);
import { Autoplay } from 'swiper/modules'

const LastSongsSwiper = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.user?.id);
  const playbacks = useSelector((state) => state.songs.songsToUser);
  const status = useSelector((state) => state.songs.songsToUserStatus);
  const [popularSongs, setPopularSongs] = useState([]);

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
      name: s?.song?.name,
      author: s?.song?.user?.firstName + " " + s?.song?.user?.lastName,
      image: s?.song?.image,
      avatar: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/3c7b6ef9-cd2d-4d70-819a-2aa9c2309083",
    })
  );

  return (<div id="LastSongs">
    <div className='body'>
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
              {songs?.map((song) =>
              (<>
                <SwiperSlide className="swiper-slide post" key={song.name}>
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

                    <div className="post-actions">
                      <a className="post-like" href="javascript:void(0)">
                        <i className="fas fa-heart"></i>
                      </a>
                      <button
                        className="post-actions-controller"
                        data-target="post1"
                        aria-controls="post-actions-content"
                        aria-expanded="false">
                        <i className="fa-solid fa-ellipsis fa-2xl"></i>
                      </button>
                      <div
                        className="post-actions-content"
                        id="post1"
                        data-visible="false"
                        aria-hidden="true">
                        <ul role="list" className="grid-flow" data-spacing="small">
                          <li>
                            <a className="post-actions-link" href="javascript:void(0)">
                              <i className="fa-solid fa-folder-open"></i>
                              <span>Add to Collection</span>
                            </a>
                          </li>
                          <li>
                            <a className="post-actions-link" href="javascript:void(0)">
                              <i className="fa-solid fa-eye"></i>
                              <span>Show the song</span>
                            </a>
                          </li>
                          <li>
                            <a className="post-actions-link" href="javascript:void(0)">
                              <i className="fa-solid fa-user-plus"></i>
                              <span>Follow the User</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

              </>)
              )}
              <div className="swiper-scrollbar"></div> </Swiper>
          </div>
        </div>
        <Collection />

      </div>
    </div>
  </div>)
}
export default LastSongsSwiper;