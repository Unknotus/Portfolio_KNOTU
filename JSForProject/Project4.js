// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Header scroll
const header = document.getElementById('header1');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('navAnime');

hamburger?.addEventListener('click', () => {
  nav?.classList.toggle('open');
  hamburger?.classList.toggle('open');
  document.body.classList.toggle('menu-open');
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger?.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    nav?.classList.remove('open');
    hamburger?.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
});

// Reveal
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    ro.unobserve(e.target);
  });
}, { threshold: 0.12 });
reveals.forEach(el => ro.observe(el));