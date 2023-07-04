/* eslint-disable linebreak-style */
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import './styles/responsive.css';
import './styles/login.css';
import AOS from 'aos';
import swRegister from './utils/sw-register';
import App from './views/app';
import 'aos/dist/aos.css';

const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#main-content'),
});

const adminBtn = document.querySelector('.admin-mode');
adminBtn.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = '#/login-page';
});

window.addEventListener('hashchange', () => {
  const { hash } = window.location;
  if (hash === '#team') {
    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  }
  if (hash === '#s-container') {
    const teamSection = document.getElementById('s-container');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  }
  app.renderPage();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

AOS.init();
