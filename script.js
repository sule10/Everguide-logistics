// Lightweight slider with dots, pause on hover, and hero text fade
(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsContainer = document.querySelector('.slider-dots');
  const heroContent = document.getElementById('hero-content');
  let idx = 0;
  let interval = null;
  const DELAY = 5000;

  if (!slides.length) return;

  // build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => show(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(document.querySelectorAll('.dot'));

  function show(i) {
    // guard
    if (i === idx) return;
    slides[idx].classList.remove('active');
    dots[idx].classList.remove('active');

    // fade out hero copy briefly for polish
    heroContent.style.opacity = 0;
    setTimeout(() => {
      idx = i;
      slides[idx].classList.add('active');
      dots[idx].classList.add('active');

      // fade in hero content
      heroContent.style.transition = 'opacity .45s ease';
      heroContent.style.opacity = 1;
    }, 220);
  }

  function next() {
    show((idx + 1) % slides.length);
  }

  function start() {
    stop();
    interval = setInterval(next, DELAY);
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  // pause on hover/focus for accessibility
  const heroSection = document.getElementById('hero');
  heroSection.addEventListener('mouseenter', stop);
  heroSection.addEventListener('mouseleave', start);
  heroSection.addEventListener('focusin', stop);
  heroSection.addEventListener('focusout', start);

  // initialize
  slides.forEach((s, i) => s.classList.toggle('active', i === 0));
  dots[0].classList.add('active');

  // set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // start autoplay
  start();

  // progressive enhancement: keyboard navigation for dots
  dots.forEach((dot, i) => {
    dot.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' || e.key === ' ') show(i);
    });
  });
})();
