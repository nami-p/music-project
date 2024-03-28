import React, { useState, useEffect } from 'react';
import '../design/home/home.css'; // Import your CSS file

const Home = () => {
  console.log(" i am here (home component) ")
  const [curSlide, setCurSlide] = useState(1);
  const [scrolledUp, setScrolledUp] = useState(false);
  const [animation, setAnimation] = useState(true);

  const handleClick = (target) => {
    if (animation) return;
    pagination(curSlide, target);
    setCurSlide(target);
  };

  const pagination = (slide, target) => {
    setAnimation(true);
  
    let nextSlide;
  
    if (target === undefined) {
      nextSlide = scrolledUp ? slide - 1 : slide + 1;
    } else {
      nextSlide = target;
    }
  
    const currentNavItem = document.querySelector('.pages__item--' + slide);
    const nextNavItem = document.querySelector('.pages__item--' + nextSlide);
  
    if (currentNavItem && currentNavItem.classList) {
      currentNavItem.classList.remove('page__item-active');
    }
  
    if (nextNavItem && nextNavItem.classList) {
      nextNavItem.classList.add('page__item-active');
    }
  
    const $app = document.querySelector('.app');
    if ($app && $app.classList) {
      $app.classList.toggle('active');
    }
  
    setTimeout(() => {
      setAnimation(false);
    }, 3000);
  };
  useEffect(() => {
    const $app = document.querySelector('.app');

    const navigateDown = () => {
      if (curSlide > 1) return;
      setScrolledUp(false);
      pagination(curSlide);
      setCurSlide((prev) => prev + 1);
    };

    const navigateUp = () => {
      if (curSlide === 1) return;
      setScrolledUp(true);
      pagination(curSlide);
      setCurSlide((prev) => prev - 1);
    };

    setTimeout(() => {
      $app.classList.add('initial');
    }, 1500);

    setTimeout(() => {
      setAnimation(false);
    }, 4500);

    const handleScroll = (e) => {
      const delta = e.deltaY || -e.detail;

      if (animation) return;

      if (delta > 0) {
        navigateDown();
      } else {
        navigateUp();
      }
    };

    document.addEventListener('wheel', handleScroll);
    document.addEventListener('DOMMouseScroll', handleScroll);
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('pages__item') && !e.target.classList.contains('page__item-active')) {
        handleClick(+e.target.getAttribute('data-target'));
      }
    });

    return () => {
      document.removeEventListener('wheel', handleScroll);
      document.removeEventListener('DOMMouseScroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, [curSlide, scrolledUp, animation]);
  return (
    <>
      <div className="cont">
        <div className="mouse"></div>
        <div className="app">
          <div className="app__bgimg">
            <div className="app__bgimg-image app__bgimg-image--1"></div>
            <div className="app__bgimg-image app__bgimg-image--2"></div>
          </div>
          <div className="app__img">
            <img
              onMouseDown={() => false}
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/whiteTest4.png"
              alt="city"
            />
          </div>

          <div className={`app__text app__text--1 ${!animation ? 'initial' : ''}`}>
            <div className="app__text-line app__text-line--4">inspiring </div>
            <div className="app__text-line app__text-line--3">formation</div>
            <div className="app__text-line app__text-line--2">creators share </div>
            <div className="app__text-line app__text-line--1">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/opus-attachment.png"
                alt=""
              />
            </div>
          </div>

          <div className={`app__text app__text--2 ${!animation ? 'initial' : ''}`}>
            <div className="app__text-line app__text-line--4">music</div>
            <div className="app__text-line app__text-line--3">for fun</div>
            <div className="app__text-line app__text-line--2"> personal playlists</div>
            <div className="app__text-line app__text-line--1">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/opus-attachment.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="pages">
          <ul className="pages__list">
            <li
              onClick={() => handleClick(1)}
              className={`pages__item pages__item--1 ${
                curSlide === 1 ? 'page__item-active' : ''
              }`}
            ></li>
            <li
              onClick={() => handleClick(2)}
              className={`pages__item pages__item--2 ${
                curSlide === 2 ? 'page__item-active' : ''
              }`}
            ></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
