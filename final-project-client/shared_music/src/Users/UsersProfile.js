import { Swiper, SwiperSlide } from 'swiper/react';
import '../design/users/users.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../loading/loading';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useEffect } from 'react';
import { fetchusers } from './UsersSlice';


const Users = () => {
  const status = useSelector(state => state.users.status);
  const users = useSelector(state => state.users.users);
  const dispatch=useDispatch();
  
  useEffect(()=>{
    if (status != "fulfilled")
    dispatch(fetchusers());
  },[])
  const peopleData = users?.map((user) => ({
    ...user,
    image: user.profilImage,
    social: [
      {
        link: '#',
        icon: <i className="fa-brands fa-facebook-f"></i>,
      },
      {
        link: '#',
        icon: <TwitterIcon />,
      },
      {
        link: '#',
        icon: <InstagramIcon />,
      },
    ],
  }));
  return (
    <>
      {status === 'idle' && <Loading />}
      {status === 'fulfilled' &&
        <div id='users'>
          <div className="slider">
            <Swiper loop="true"
              slidesPerView="auto"
              centeredSlides="true"
              observeParents="!0"
              observer="!0" className="people__slide">
              {peopleData?.map((person) => {
                const userProfile="/userProfile/"+person.id;
                return (

                  <SwiperSlide className="swiper-slide" key={person.id}>
                    <div className="people__card">
                      <div className="people__image">
                        <Avatar className='img' src={person.image} alt={person.name} />
                      </div>
                      <div className="people__info">
                        <ul className="people__social">
                          {person.social.map((socialItem, index) => (
                            <li key={Math.random() * index}>
                              <a href={socialItem.link}>{socialItem.icon}</a>
                            </li>
                          ))}
                        </ul>
                        <h3 className='people__name'>{person.name}</h3>
                        <p className="people__position">{person.email}</p>
                        <div className='desc__container'> <p className="people__desc">{person.description}</p></div>
                      </div>
                      <div className="people__btn">
                        <Link to={userProfile}
                        // description: person.description,
                        // name: person.name,
                        // email: person.email,
                        // age: person.age,
                        // }

                        >View info</Link>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      }
    </>
  );
}

export default Users;