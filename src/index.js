import Swiper, { Navigation, Pagination } from 'swiper';
import * as ymaps from 'ymaps';

import './styles/normalize.css';
import './styles/style.scss';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

// swiper

const swiper = new Swiper('.swiper-projects', {
    direction: 'horizontal',
    loop: true,
    modules: [Navigation, Pagination],

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
    },

    on: {
        init: function() {
          setStyleFirstActiveNameSlide('projects__slide-name', 'projects__slide-name--active');
        },
        slideChange: function () {
          setStyleActiveNameSlide(this, 'projects__slide-name', 'projects__slide-name--active')
        }
    },
});

const swiperLeft = new Swiper('.swiper-realization-left', {
  direction: 'vertical',
  loop: false,
  spaceBetween: 55,
  allowTouchMove: false,

  on: {
    init: function () {
      setStyleFirstActiveNameSlide('realization__list-item', 'realization__list-item--active')
    }, 
    slideChange: function () {
      setStyleActiveNameSlide(this, 'realization__list-item', 'realization__list-item--active')
    }
  }

});

const swiperRight = new Swiper('.swiper-realization-right', {
  direction: 'vertical',
  loop: false,
  spaceBetween: 55,
  allowTouchMove: false,
  initialSlide: document.querySelectorAll('.realization__list-item').length - 1,
});


function setStyleFirstActiveNameSlide(sliderName, activeSliderName){
  document.querySelector(`.${sliderName}`).classList.add(activeSliderName);
}

function setStyleActiveNameSlide(slider, sliderNames, activeSliderName){
  let activeIndex = slider.realIndex;
  let slidesName = document.querySelectorAll(`.${sliderNames}`);

  slidesName.forEach((item, index) => {
    if (index === activeIndex) {
      item.classList.add(activeSliderName);
    } else {
      item.classList.remove(activeSliderName)
    }
  });
}

const slidesName = document.querySelectorAll('.projects__slide-name');
const sliderBtn = document.querySelectorAll('.realization__list-item');

slidesName.forEach((slideName, index) => {
  slideName.addEventListener('click', () => swiper.slideToLoop(index))
})

sliderBtn.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    swiperLeft.slideTo(index, 1000);
    swiperRight.slideTo(sliderBtn.length - 1 - index, 1000);
  })
})


// video

const video = document.querySelector('video');
const videoWrapper = document.querySelector('.control__video-play');
const videoPlayBtn = document.querySelector('.control__video-play-btn');

window.addEventListener('load', () => {
  video.insertAdjacentHTML('afterBegin', `
    <source src='assets/video/test-video.webm' type='video/webm'>
    <source src='assets/video/test-video.mp4' type='video/mp4'>
  `)
})

videoPlayBtn.addEventListener('click', () => {
  video.play();
  videoWrapper.style.display = 'none';
})

video.addEventListener('ended', () => {
  videoWrapper.style.display = 'flex';
})

// map

const coordinate = [47.24463981492797,39.72319129462243];

function init(){
  const map = new ymaps.Map('map', {
    center: coordinate,
    zoom: 19,
  })

  const marker = new ymaps.Placemark(coordinate)
  map.geoObjects.add(marker);
}

ymaps.ready(init);

