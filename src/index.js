import Swiper, { Navigation, Pagination } from 'swiper';

import './styles/normalize.css';
import './styles/style.scss';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const swiper = new Swiper('.swiper', {
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
        init: function () {
          document.querySelectorAll('.projects__slide-name')[this.realIndex].classList.add('projects__slide-name--active');
        },
        slideChange: function (swiper) {
          let activeIndex = swiper.realIndex
          let slidesName = document.querySelectorAll('.projects__slide-name');

          slidesName.forEach((item, index) => {
            if (index === activeIndex) {
              item.classList.add('projects__slide-name--active');
            } else {
              item.classList.remove('projects__slide-name--active')
            }
          });
        }
    },
});

const slidesName = document.querySelectorAll('.projects__slide-name');

slidesName.forEach((slideName, index) => {
  slideName.addEventListener('click', () => swiper.slideToLoop(index))
})

const video = document.querySelector('video');
const videoWrapper = document.querySelector('.control__video-play');
const videoPlayBtn = document.querySelector('.control__video-play-btn');

window.addEventListener('DOMContentLoaded', () => {
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
