/* ───────────────── YEAR ───────────────── */

const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* ───────────────── HEADER SCROLL ───────────────── */

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 40);
});

/* ───────────────── МОбильтное меню ───────────────── */


const hamburger = document.querySelector('.hamburger'); // ✅ точка
const nav = document.getElementById('nav');

// Объявляем функцию один раз — используем везде
function closeMenu() {
  nav?.classList.remove('open');
  hamburger?.classList.remove('open');
  document.body.classList.remove('menu-open');
}

// Кнопка
hamburger?.addEventListener('click', () => {
  nav?.classList.toggle('open');
  hamburger?.classList.toggle('open');
  document.body.classList.toggle('menu-open');
});

// Закрытие по клику на ссылку + плавный скролл
nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    closeMenu();

    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Закрытие по Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// Закрытие при расширении окна
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
});
/* ───────────────── REVEAL ANIMATION ───────────────── */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');

      revealObserver.unobserve(entry.target);

    });

  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});


/* ───────────────── SKILL BARS ───────────────── */

const skillBars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const width = entry.target.dataset.width;

      entry.target.style.width = `${width}%`;

      skillObserver.unobserve(entry.target);

    });

  },
  {
    threshold: 0.3
  }
);

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});


/* ───────────────── CONTACT FORM ───────────────── */

const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', function (event) {

  event.preventDefault();

  const button = this.querySelector('.cform-submit');

  if (!button) return;

  button.textContent = 'Sent ✓';
  button.style.background = '#22c55e';

  setTimeout(() => {

    button.innerHTML = `
      Send message
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M1 7h12M7 1l6 6-6 6"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `;

    button.style.background = '';

    this.reset();

  }, 2500);

});


/* ───────────────── PROJECT HEADER PARTICLES ───────────────── */

const slashWrap = document.getElementById('slashWrap');
const projectsHeader = document.querySelector('.projects-header');

const particleColors = [
  '#afa9ec',
  '#7f77dd',
  '#534ab7',
  '#cecbf6',
  '#ffffff'
];

projectsHeader?.addEventListener('mouseenter', () => {

  for (let i = 0; i < 18; i++) {

    setTimeout(() => {

      const particle = document.createElement('div');

      particle.style.cssText = `
        position:absolute;
        width:3px;
        height:3px;
        border-radius:50%;
        pointer-events:none;
        background:${particleColors[Math.floor(Math.random() * particleColors.length)]};
        left:${Math.random() * 10}px;
        top:${Math.random() * 18}px;
        transition:
          transform 0.5s ease-out,
          opacity 0.5s ease-out;
      `;

      slashWrap.style.position = 'relative';

      slashWrap.appendChild(particle);

      requestAnimationFrame(() => {

        const angle = Math.random() * Math.PI * 2;

        const distance = 16 + Math.random() * 28;

        particle.style.transform =
          `translate(
            ${Math.cos(angle) * distance}px,
            ${Math.sin(angle) * distance}px
          ) scale(0)`;

        particle.style.opacity = '0';

      });

      setTimeout(() => {
        particle.remove();
      }, 520);

    }, i * 28);

  }

});