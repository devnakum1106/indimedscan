// script.js

window.addEventListener('load', () => {
  const splash = document.getElementById('splash-screen');
  const main = document.getElementById('main-content');

  setTimeout(() => {
    splash.style.display = 'none';
    main.style.display = 'block';
  }, 2500); // Duration of splash screen
});