/* eslint-disable no-alert */
import Swal from 'sweetalert2';
import StoryDbSource from '../../data/storydb-source';
import { createMessageTableBody } from '../templates/template-creator';
import Session from '../../utils/session';

const DataPesan = {
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
                <h1>Data Pesan</h1>
                <table class="review-table">
                    <thead>
                        <tr>
                            <th>ID Pesan</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Isi Pesan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                    </tbody>
                </table>
                <h3 id="no-data-notif">Tidak ada data</h3>
            </div>
        `;
  },

  async afterRender() {
    const tableBody = document.querySelector('#table-body');
    const messages = await StoryDbSource.getAllMsg();
    if (messages.length > 0) {
      const emptyNotif = document.querySelector('#no-data-notif');
      emptyNotif.style.display = 'none';
    }
    messages.forEach((message) => {
      tableBody.innerHTML += createMessageTableBody(message);
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
            const { pesanId } = button.dataset;
            await StoryDbSource.deleteMsgById(pesanId);
            window.location.reload();
          }
        });
      });
    });
  },
};

export default DataPesan;
