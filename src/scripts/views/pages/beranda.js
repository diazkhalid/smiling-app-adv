/* eslint-disable linebreak-style */
/* eslint-disable import/named */
/* eslint-disable no-plusplus */
import StoryDbSource from '../../data/storydb-source';
import StorySearchView from '../../utils/story-presenter/story-search-view';
import StorySearchPresenter from '../../utils/story-presenter/story-search-presenter';
import StoryShowPresenter from '../../utils/story-presenter/story-show-presenter';
import Session from '../../utils/session';

const view = new StorySearchView();

const Beranda = {
  async render() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const wave = document.querySelector('#wave');
    header.classList.remove('d-none');
    footer.classList.remove('d-none');
    wave.classList.remove('d-none');
    Session.isNotAdmin();
    return `
    <div id="carouselExampleCaptions" class="carousel slide jumbotron2" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="./slide4.jpg" class="d-block w-100" alt="Slide 1">
      <div class="carousel-caption">
      <h5>Melangkah Ke Dunia <span class="text-warning">Imajinasi</span></h5>
      <p>Aktivitas bonding membaca bersama anak, jendela menuju petualangan.</p>
      <a href="#s-container" class="btn btn-outline-warning p-3 rounded-pill text-warning" id="hero-button">Mari Membaca</a>
      </div>
    </div>
    <div class="carousel-item">
      <img src="./slide2.png" class="d-block w-100" alt="Slide 2">
      <div class="carousel-caption">
      <h5> Mari <span class="text-warning">Berpetualang</span></h5>
      <p> Melangkah bersama menembus dunia fantasi.</p>
      <a href="#s-container" class="btn btn-outline-warning p-3 rounded-pill text-warning" id="hero-button">Mari Membaca</a>
      </div>
    </div>
    <div class="carousel-item">
      <img src="./slide3.jpeg" class="d-block w-100" alt="Slide 3">
      <div class="carousel-caption">
      <h5> Si Raksasa Hijau yang <span class="text-warning"> Lembut </span></h5>
      <p> Terkadang sesuatu hal yang buruk belum tentu seburuk itu </p>
      <a href="#s-container" class="btn btn-outline-warning p-3 rounded-pill text-warning" id="hero-button">Mari Membaca</a>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
</div>
      <div class="container" id="s-container">
            <div class="row justify-content-center mt-5">
                <div class="col-lg-8 col-lg-4">
                    <div class="input-group shadow-search">
                        <span class="input-group-prepend ">
                            <span class="input-group-text bg-white round-l-search" style="height: 100%">
                                <i class="fas fa-search"></i>
                            </span>
                        </span>
                        <input type="text" class="form-control round-r-search" id="search-input" placeholder="Cari">
                    </div>
                </div>
            </div>
      </div>
      <!-- height di set ke 100% untuk menguji apakah drawer akan menutup jika main di klik -->
      <div class="container mt-5 rounded">
          <div class="row" id="card-container"></div>
      </div>
    `;
  },

  async afterRender() {
    new StoryShowPresenter({ view, stories: StoryDbSource });
    new StorySearchPresenter({ view, stories: StoryDbSource });
  },
};

export default Beranda;
