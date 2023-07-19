function setupSlideshow(categoryId) {
  const slideshow = document.querySelector(`#${categoryId} .gallery-images`);
  const images = slideshow.querySelectorAll('.gallery-image');
  const numImages = images.length;
  let currentIndex = 0;


  // Show the first image
  images[currentIndex].classList.add('current');

  // Move to the next slide
  function nextSlide() {
    images[currentIndex].classList.remove('current');
    currentIndex = (currentIndex + 1) % numImages;
    images[currentIndex].classList.add('current');
  }

  // Move to the previous slide
  function prevSlide() {
    images[currentIndex].classList.remove('current');
    currentIndex = (currentIndex - 1 + numImages) % numImages;
    images[currentIndex].classList.add('current');
  }


  // Show the first image
  images[currentIndex].classList.add('current');

  // Scroll to the next slide
  function scrollToNextSlide() {
    currentIndex = (currentIndex + 1) % numImages;
    const slideWidth = slideshow.offsetWidth;
    const scrollDistance = currentIndex * slideWidth;
    slideshow.scrollTo({
      left: scrollDistance,
      behavior: 'smooth'
    });
    updateBlurEffect();
  }

  // Apply the blur effect to previous and next images
  function updateBlurEffect() {
    for (let i = 0; i < numImages; i++) {
      const image = images[i];
      if (i === currentIndex) {
        image.classList.add('current');
      } else {
        image.classList.remove('current');
      }
    }
  }

  // Auto scroll every 3 seconds
let slideshowInterval = setInterval(scrollToNextSlide, 3000);

// Pause auto-scrolling when mouse enters the gallery container
slideshow.addEventListener('mouseenter', () => {
  clearInterval(slideshowInterval);
});

// Resume auto-scrolling when mouse leaves the gallery container
slideshow.addEventListener('mouseleave', () => {
  slideshowInterval = setInterval(scrollToNextSlide, 3000);
});
  return { scrollToNextSlide,nextSlide, prevSlide };
}

// Setup slideshow for each category
const category1Slideshow = setupSlideshow('category1');
const category2Slideshow = setupSlideshow('category2');
const category3Slideshow = setupSlideshow('category3');

// Make the functions accessible from the global scope
window.category1Slideshow = category1Slideshow;
window.category2Slideshow = category2Slideshow;
window.category3Slideshow = category3Slideshow;






// Make the functions accessible from the global scope
window.category1Slideshow = category1Slideshow;
window.category2Slideshow = category2Slideshow;
window.category3Slideshow = category3Slideshow;
