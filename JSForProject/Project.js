document.addEventListener('DOMContentLoaded', () => {
  const mainPlayer = document.getElementById('main-player');
  const ambientVideo = document.getElementById('ambient-video');
  const previewCards = document.querySelectorAll('.preview-card');

  // 1. Синхронизация воспроизведения главного и фонового видео
  mainPlayer.addEventListener('play', () => ambientVideo.play());
  mainPlayer.addEventListener('pause', () => ambientVideo.pause());
  mainPlayer.addEventListener('seeking', () => {
    ambientVideo.currentTime = mainPlayer.currentTime;
  });

  // 2. Переключение видео по клику на карточки превью
  previewCards.forEach(card => {
    card.addEventListener('click', () => {
      // Убираем активный класс у всех и добавляем текущей
      previewCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const newSrc = card.getAttribute('data-video');
      const newPoster = card.getAttribute('data-poster');

      // Меняем источники для обоих видео плееров
      mainPlayer.src = newSrc;
      mainPlayer.poster = newPoster;
      ambientVideo.src = newSrc;

      // Запускаем воспроизведение
      mainPlayer.play();
    });
  });
});

