// Navbar background change on scroll
window.addEventListener('scroll', function () {
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Animated stats
const counters = document.querySelectorAll('[data-count]');
let animated = false;

function animateCounters() {
  if (animated) return;
  const statsSection = document.getElementById('stats');
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    counters.forEach(counter => {
      let start = 0;
      const end = parseInt(counter.getAttribute('data-count'));
      const increment = end / 100;
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          counter.innerHTML = `${end.toLocaleString()}`;
          clearInterval(interval);
        } else {
          counter.innerHTML = `${Math.floor(start).toLocaleString()}`;
        }
      }, 20);
    });
    animated = true;
  }
}

window.addEventListener('scroll', animateCounters);

// Fade-in & stagger effect
const sections = document.querySelectorAll('.fade-section');
const items = document.querySelectorAll('.fade-item');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));
items.forEach(item => observer.observe(item));

// Back to top button
const backToTop = document.getElementById("backToTop");
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Swiper initialization
const swiper = new Swiper('.reviews-swiper', {
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.reviews-swiper-pagination',
    clickable: true,
  },
  spaceBetween: 40,
  grabCursor: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: true,
  },
});

// Word slider animation
let wordIndex = -1;
const wordSliderContainer = document.querySelector('.word-slider-container');
const wordSlider = document.querySelector('.word-slider');
const wordSliderDelay = 4000;
const words = [
  "contracte",
  "taxe",
  "închirieri",
  "vize",
  "partajuri",
  "vânzări",
  "achiziții",
  "angajări",
  "moșteniri",
  "donații"
];

var updateWordSliderStyle = (o, t_Y) => {
  wordSliderContainer.style.setProperty('--opacity', o);
  wordSliderContainer.style.setProperty('--translateY', `${t_Y}%`);
}

var switchWord = () => {
  updateWordSliderStyle(0, 10);

  window.setTimeout(() => {
    updateWordSliderStyle(0, -10);
    wordIndex = ++wordIndex % words.length;
    wordSlider.textContent = words[wordIndex];
    wordSliderContainer.style.left = `${-wordSlider.offsetWidth / 2}px`;
  }, 500)

  window.setTimeout(() => {
    updateWordSliderStyle(1, 0);
  }, 750);
}

window.onload = () => {
  switchWord();
  window.setInterval(switchWord, wordSliderDelay);
}

// Autocompleting chat prompt

const chatInput = document.querySelector('.chat-input');
const suggestions = document.querySelector('.chat-suggestions');
suggestions.addEventListener('click', (e) => {
  if (!e.target.classList.contains('suggestion')) return;

  chatInput.value = e.target.textContent;
});

// Expanding chat window

const heroSection = document.getElementById('hero');

heroSection.addEventListener('click', (e) => {
  if (!e.target.classList.contains('chat-input')) return;
  heroSection.classList.toggle('chat-expanded');
});