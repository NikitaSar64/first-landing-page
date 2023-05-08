import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
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
    modules: [Navigation, Pagination, Autoplay],

    breakpoints: {
      950: {
        navigation: {
          nextEl: '.next',
          prevEl: '.prev',
        },
      },
      0: {
        navigation: {
          nextEl: '.next-mobile',
          prevEl: '.prev-mobile',
        },
      }
    },

    autoplay: {
      delay: 2000,
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

const swiperMobile = new Swiper('.swiper-mobile', {
  direction: 'horizontal',
  loop: true,
  modules: [Navigation],

  navigation: {
    nextEl: '.swiper-mobile-button-next',
    prevEl: '.swiper-mobile-button-prev',
  },

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

// burger menu

const burgerMenu = document.querySelector('.toggle-container');
const burgerBtn = document.querySelector('.burger');

burgerMenu.addEventListener('click', () => {
  burgerBtn.classList.toggle('active');
  document.querySelector('.button-toggle').classList.toggle('open');
  document.body.classList.toggle('no-scroll');
})

// fullscreen slider

let slider = document.querySelector('main'),
    sliderItem = document.querySelectorAll('main section'),
    dots = document.querySelector('.dots'),
    step = sliderItem[0].offsetHeight;

let header = document.querySelector('header');
let footer = document.querySelector('footer');

if (!localStorage.getItem('active-section')){
  localStorage.setItem('active-section', 0);
}

let currentPage = +localStorage.getItem('active-section'),
    canDrag     = false,
    canWeel     = true,
    intialMousePostions = 0;

// init active section    
    
slider.style.transform = `translateY(-${currentPage * step}px)`;
footer.style.transform = `translateY(-${currentPage * step}px)`;

checkActiveSection()

// init dots

sliderItem.forEach(item => {
  dots.insertAdjacentHTML('afterbegin', `<div class="dots-item"></div>`)
})

let dotsItems = document.querySelectorAll('.dots-item');
dotsItems[currentPage].classList.add('active');

// functions

const changePage = (nextPage) => {
    slider.style.transform = `translateY(-${step * nextPage}px)`;
}

const getNextPage = (direction) => {
    if(direction === 'next' && currentPage < sliderItem.length - 1){
      currentPage = currentPage + 1;
      return currentPage;
    }
    else if(direction === 'prev' && currentPage > 0){
      currentPage = currentPage - 1;
      return currentPage;
    }
    else {
      return false;
    }
}

function checkActiveSection(){
  if (currentPage == 0){
    header.style.display = 'block';
  } else {
    header.style.display = 'none';
  }

  if (currentPage == sliderItem.length - 1){
    footer.style.display = 'block';
    footer.style.transform = `translateY(-${currentPage * step}px)`;
  } else {
    footer.style.display = 'none';
  }
}

const resetCanWeel = () => canWeel = true;

const togleActiveBtn = (id) => {
  dotsItems.forEach((item) => {
    if (id == 2 || id == 3 || id == 4 || id == 6){
      item.className = 'dots-item dots--black';
    } else {
      item.className = 'dots-item dots--white';
    }
  })
  dotsItems[id].classList.add('active');
}

togleActiveBtn(currentPage)

// Listeners

// Control slider use dots

dotsItems.forEach((item, id) => {
  item.addEventListener('click', (e) => {
      currentPage = id;
      localStorage.setItem('active-section', currentPage)
      togleActiveBtn(id);
      changePage(currentPage);

      checkActiveSection();
  })
})

// Control slider use mouseweel

slider.addEventListener('mousewheel',(e) => {
  if(canWeel){
    let nextPage = false;
    if(e.deltaY < -90){
      canWeel = false;
      nextPage = getNextPage('prev');
      setTimeout(()=>{
        resetCanWeel();
      },1000)
    }
    else if(e.deltaY > 90) {
      canWeel = false;
      nextPage = getNextPage('next');
      setTimeout(()=>{
        resetCanWeel();
      },1000)
    }
    if(nextPage !== false){
      changePage(nextPage);
      togleActiveBtn(currentPage);
    } 
  }

  localStorage.setItem('active-section', currentPage)

  checkActiveSection();
})

// btn up

const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
    this.el.classList.remove('btn-up_hide');
  },
  hide() {
    this.el.classList.add('btn-up_hide');
  },
  addEventListener() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollY > 400 ? this.show() : this.hide();
    });
    document.querySelector('.btn-up').onclick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();