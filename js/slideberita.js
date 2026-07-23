const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");
let slideIndex = 0;
let isAnimating = false;
let slideInterval;

// Tampilkan slide pertama saat halaman dimuat
slides[slideIndex].classList.add('active');
if(dots.length > 0) dots[slideIndex].classList.add('active');

// Fungsi auto slide
function startSlideShow() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Ganti setiap 5 detik
}

function resetSlideShow() {
    clearInterval(slideInterval);
    startSlideShow();
}

function changeSlide(n) {
    if (isAnimating) return;
    
    let nextIndex = slideIndex + n;
    
    if (nextIndex >= slides.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = slides.length - 1;
    
    goToSlide(nextIndex, n > 0 ? 'right' : 'left');
}

function goToSlide(nextIndex, direction = null) {
    if (isAnimating || nextIndex === slideIndex) return;
    isAnimating = true;

    const currentSlide = slides[slideIndex];
    const nextSlide = slides[nextIndex];
    
    // Tentukan arah animasi jika diklik via dot
    if (!direction) {
        direction = nextIndex > slideIndex ? 'right' : 'left';
    }

    if (direction === 'right') {
        nextSlide.classList.add('active', 'slide-in-right');
        currentSlide.classList.add('slide-out-left');
    } else {
        nextSlide.classList.add('active', 'slide-in-left');
        currentSlide.classList.add('slide-out-right');
    }
    
    // Update active dot
    if(dots.length > 0) {
        for(let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        dots[nextIndex].classList.add('active');
    }

    // Update indeks slide
    slideIndex = nextIndex;
    
    setTimeout(() => {
        currentSlide.classList.remove('active', 'slide-out-left', 'slide-out-right');
        nextSlide.classList.remove('slide-in-left', 'slide-in-right');
        isAnimating = false;
    }, 500);

    resetSlideShow();
}

// Mulai slideshow otomatis
startSlideShow();