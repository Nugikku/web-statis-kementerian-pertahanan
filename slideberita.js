const slides = document.getElementsByClassName("slide");
let slideIndex = 0;
let isAnimating = false;

// Tampilkan slide pertama saat halaman dimuat
slides[slideIndex].classList.add('active');

function changeSlide(n) {
    if (isAnimating) {
        return;
    }
    isAnimating = true;

    const currentSlide = slides[slideIndex];
    let nextIndex = slideIndex + n;

    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    if (nextIndex < 0) {
        nextIndex = slides.length - 1;
    }

    const nextSlide = slides[nextIndex];

    if (n > 0) {
        nextSlide.classList.add('active', 'slide-in-right');
        currentSlide.classList.add('slide-out-left');
    } else {
        nextSlide.classList.add('active', 'slide-in-left');
        currentSlide.classList.add('slide-out-right');
    }

    // Update indeks slide
    slideIndex = nextIndex;
    
    setTimeout(() => {
        currentSlide.classList.remove('active', 'slide-out-left', 'slide-out-right');
        nextSlide.classList.remove('slide-in-left', 'slide-in-right');
        isAnimating = false;
    }, 500);
}