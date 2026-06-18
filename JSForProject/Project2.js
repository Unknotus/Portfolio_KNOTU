
document.addEventListener('DOMContentLoaded', () => {
  const mainPlayer   = document.getElementById('main-player');
  const ambientVideo = document.getElementById('ambient-video');
  const playerWrap   = document.querySelector('.main-play-obertka');
  const previewCards = document.querySelectorAll('.preview-card');
  const ambientBackg = document.querySelector('.AmbientBackg'); 

  // ── Синхронизация ambient ──
  mainPlayer.addEventListener('play',  () => ambientVideo.play());
  mainPlayer.addEventListener('pause', () => ambientVideo.pause());
  mainPlayer.addEventListener('seeking', () => {
    ambientVideo.currentTime = mainPlayer.currentTime;
  });

function checkOrientation(card) {
    if (card && card.dataset.orientation === 'horizontal') {
      playerWrap.classList.remove('is-vertical');
      ambientBackg.classList.remove('ambient-vertical');
      return;
    }
    if (card && card.dataset.orientation === 'vertical') {
      playerWrap.classList.add('is-vertical');
      ambientBackg.classList.add('ambient-vertical'); 
    }
    const isVertical = mainPlayer.videoHeight > mainPlayer.videoWidth;
    playerWrap.classList.toggle('is-vertical', isVertical);
    ambientBackg.classList.toggle('ambient-vertical', isVertical);
  }

  // ── Описание под плеером ──
  function updateDescription(title, desc, genre, year) {
    const block = document.getElementById('videoDescription');
    if (!block) return;

    block.style.opacity   = '0';
    block.style.transform = 'translateY(8px)';

    setTimeout(() => {
      document.getElementById('vd-title').textContent = title;
      document.getElementById('vd-desc').textContent  = desc;
      document.getElementById('vd-genre').textContent = genre;
      document.getElementById('vd-year').textContent  = year;

      block.style.opacity   = '1';
      block.style.transform = 'translateY(0)';
    }, 180);
  }

  // ── Переключение карточек ──
  previewCards.forEach(card => {
    card.addEventListener('click', () => {
      previewCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      mainPlayer.iframe    = card.dataset.video;
      mainPlayer.poster = card.dataset.poster;
      ambientVideo.iframe  = card.dataset.video;

      mainPlayer.addEventListener('loadedmetadata', () => checkOrientation(card), { once: true });
      mainPlayer.play();

      updateDescription(
        card.dataset.title,
        card.dataset.desc,
        card.dataset.genre,
        card.dataset.year
      );
    });
  });

  // ── При загрузке страницы ──
  const firstCard = document.querySelector('.preview-card.active');

  mainPlayer.addEventListener('loadedmetadata', () => checkOrientation(firstCard));

  if (firstCard) {
    updateDescription(
      firstCard.dataset.title,
      firstCard.dataset.desc,
      firstCard.dataset.genre,
      firstCard.dataset.year
    );
  }

});

//  КНОПКА
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
