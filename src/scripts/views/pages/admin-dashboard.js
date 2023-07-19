/* eslint-disable no-alert */
import StoryDbSource from '../../data/storydb-source';
import { createDashboardCard } from '../templates/template-creator';
import Session from '../../utils/session';

const DashboardAdmin = {
  async render() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const wave = document.querySelector('#wave');
    header.classList.add('d-none');
    footer.classList.add('d-none');
    wave.classList.add('d-none');
    if (Session.get('isLoggedIn') !== true) {
      window.alert('Anda bukan admin!');
      window.location.href = '#/login-page';
      window.location.reload();
      return;
    }
    return `
        <div class="sidebar">
          <img src="./logoatas.png" alt="Admin Photo">
          <h2>Hi, admin!</h2>
          <a href="#/dashboard-admin">Dashboard</a>
          <a href="#/data-review" id="review-nav">Data Review</a>
          <a href="#/data-pesan" id="msg-nav">Data Pesan</a>
          <a href="#/beranda">Keluar</a>
        </div>
      
        <div class="dashboard-content">
          <h1>Dashboard</h1>
          <div class="container-dashboard">
          </div>
        </div>
  `;
  },

  async afterRender() {
    const cardContainer = document.querySelector('.container-dashboard');
    const dataCount = await StoryDbSource.getCount();

    dataCount.forEach((item) => {
      cardContainer.innerHTML += createDashboardCard(item);
    });
  },
};

export default DashboardAdmin;
