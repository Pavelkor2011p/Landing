let images = [{
    url: "./img/block02.png",
    title: "Картинка 1"
  }, {
    url: "./img/block03.png",
    title: "Картинка 2"
  }, {
    url: "./img/img03.png",
    // title: "Картинка 3"
  // }, {
    // url: "/wallpaperbetter.com_1920x1080_03.jpg",
    // title: "Картинка 4"
  // }, {
    // url: "/wallpaperbetter.com_1920x1080_04.jpg",
    // title: "Картинка 5"
}];

function initSlider(options) {
    if (!images || !images.length) return;
    
    options = options || {
      titles: false,
      dots: true,
      autoplay: false
    };
    
    let sliderImages = document.querySelector(".slider__images");
    let sliderArrows = document.querySelector(".slider__arrows");
    let sliderDots = document.querySelector(".slider__dots");
    
    initImages();
    initArrows();
    
    if (options.dots) {
      initDots();
    }
    
    if (options.titles) {
      initTitles();
    }
    
    if (options.autoplay) {
      initAutoplay();
    }
    
    function initImages() {
      images.forEach((image, index) => {
        let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" 
style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
        sliderImages.innerHTML += imageDiv;
      });
    }
    
        let pic01 = document.querySelector('.a');
    pic01.addEventListener('click', function() {
      moveSlider(0);
    });

    let pic02 = document.querySelector('.b');
    pic02.addEventListener('click', function() {
    moveSlider(1);
    });
    
    let pic03 = document.querySelector('.c');
    pic03.addEventListener('click', function() {
    moveSlider(2);
    });
    
    function initArrows() {
      sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
        arrow.addEventListener("click", function() {
          let curNumber = +sliderImages.querySelector(".active").dataset.index;
          let nextNumber;
          if (arrow.classList.contains("left")) {
            nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
          } else {
            nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
          }
          moveSlider(nextNumber);
        });
      });
    }
    
    function initDots() {
      images.forEach((image, index) => {
        let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" 
data-index="${index}"></div>`;
        sliderDots.innerHTML += dot;
      });
      sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
        dot.addEventListener("click", function() {
          moveSlider(this.dataset.index);
        })
      })
    }
    
    function moveSlider(num) {
      sliderImages.querySelector(".active").classList.remove("active");
      sliderImages.querySelector(".n" + num).classList.add("active");
      if (options.dots) {
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");
      }
      if (options.titles) changeTitle(num);
    }
    
    function initTitles() {
      let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
      sliderImages.innerHTML += cropTitle(titleDiv, 50);
    }
    
    function changeTitle(num) {
      if (!images[num].title) return;
      let sliderTitle = sliderImages.querySelector(".slider__images-title");
      sliderTitle.innerText = cropTitle(images[num].title, 50);
    }
    
    function cropTitle(title, size) {
      if (title.length <= size) {
        return title;
      } else {
        return title.substr(0, size) + "...";
      }
    }
    
    function initAutoplay() {
      setInterval(() => {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        moveSlider(nextNumber);
      }, options.autoplayInterval);
    }
  }
  
  let sliderOptions = {
    dots: true,
    titles: false,
    autoplay: true,
    autoplayInterval: 3000
  };
  
  document.addEventListener("DOMContentLoaded", function() {
    initSlider(sliderOptions);
  });
