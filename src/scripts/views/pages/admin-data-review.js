/* eslint-disable no-alert */
import Swal from 'sweetalert2';
import StoryDbSource from '../../data/storydb-source';
import { createReviewTableBody } from '../templates/template-creator';
import Session from '../../utils/session';

const DataReview = {
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
                <h1>Data Review</h1>
                <table class="review-table">
                    <thead>
                        <tr>
                            <th>ID Review</th>
                            <th>ID Story</th>
                            <th>Nama</th>
                            <th>Tanggal</th>
                            <th>Isi Review</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                    </tbody>
                </table>
                <h3 id="wait-notif">Please Wait...</h3>
                <h3 id="no-data-notif" style="display: none;">Tidak ada data</h3>
            </div>
        `;
  },

  async afterRender() {
    const tableBody = document.querySelector('#table-body');
    const emptyNotif = document.querySelector('#no-data-notif');
    const waitNotif = document.querySelector('#wait-notif');
    const reviews = await StoryDbSource.getAllReview();
    waitNotif.style.display = 'none';
    if (reviews.length < 0) {
      emptyNotif.style.display = 'block';
    }
    reviews.forEach((review) => {
      tableBody.innerHTML += createReviewTableBody(review);
    });

    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        Swal.fire({
          title: 'Konfirmasi',
          text: 'Apakah Anda yakin ingin menghapus?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { reviewId } = button.dataset;
            await StoryDbSource.deleteReviewById(reviewId);
            window.location.reload();
          }
        });
      });
    });
  },
};

export default DataReview;
