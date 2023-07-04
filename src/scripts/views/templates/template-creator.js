/* eslint-disable import/no-cycle */
/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import API_ENDPOINT from '../../globals/api-endpoint';
import DetailHelper from '../../utils/detail-helper';

const createStoryItemTemplate = (story) => `
    <div class="col-md-6 col-lg-4 mt-2 mb-2">
        <div class="card shadow-card rad-card">
            <div class="overflow-hidden m-0" id="divImgCard">
                <img id="img-item" class="img-fluid" src="${API_ENDPOINT.IMAGE_THUMBNAIL(story.id)}" alt="" crossorigin="anonymouse">
            </div>
            <div class="card-body text-center overflow-hidden" id="body-card">
                <h3 class="card-title"><a href="/#/detail/${story.id}">${story.title}</a></h3>
                <p>${story.description}</p>
            </div>
        </div>
    </div>
`;

const createStoryDetailTemplate = (story, review) => `
    <div class="row">
        <div class="col jumbotron1">
            <h2>${story.title}</h2>
        </div>
    </div>
    <div class="row gap-5 gap-md-0">
        <div class="col-md-6 pe-md-4">
        <img class="img-fluid" src="${API_ENDPOINT.IMAGE_THUMBNAIL(story.id)}" alt="" width="100%" />
        </div>
        <div class="col-md-6 ps-md-4" id="detail-story-container">
        <h3>Detail Cerita</h3>
        <table class="table table-borderless table-responsive mt-3">
            <tr>
            <td>Penulis</td>
            <td>:</td>
            <td>${story.writer}</td>
            </tr>
            <tr>
            <td>Ilustrator</td>
            <td>:</td>
            <td>${story.illustrator}</td>
            </tr>
            <tr>
            <td>Penerbit</td>
            <td>:</td>
            <td>${story.publisher}</td>
            </tr>
            <tr>
            <td>Url asli</td>
            <td>:</td>
            <td>
                <a
                href="${story.originalUrl}"
                target="blank">Storyweaver.org.in</a
                >
            </td>
            </tr>
            <tr>
            <td>Musik</td>
            <td>:</td>
            <td>${story.musicInfo}</td>
            </tr>
            <tr>
            <td>Hak cipta</td>
            <td>:</td>
            <td>${story.copyright}</td>
            </tr>
        </table>
        </div>
    </div>
    <div class="row justify-content-center my-3 sticky-top">
        ${DetailHelper.playerMusic(story)}
    </div>
    <div class="row">
        <div class="col">
            ${DetailHelper.eachContent(story)}
        </div>
    </div>
    <div class="row" id="reviewFormContainer">
        
    </div>
    <div class="row">
    <div class="col">
        <h3>Ulasan</h3>
        <div class="review" id="reviewViewContainer">
        <p id="noReview">Tidak ada ulasan</p>
            ${DetailHelper.eachStoryReview(review)}
        </div>
    </div>
</div>
`;

const createReviewFormTemplate = () => `
    <div class="col">
        <div class="review-form">
            <h3>Tambah Ulasan</h3>
            <form id="reviewForm">
                <div class="form-group">
                    <label for="inputName">Nama</label>
                    <input type="text" id="inputName" name="review-name" class="form-control" required placeholder="Masukkan nama (Maks 16 karakter)">
                </div>
                <div class="form-group">
                    <label for="inputReview">Isi Review</label>
                    <textarea id="inputReview" name="review-content" class="form-control" required placeholder="Masukkan isi review"></textarea>
                </div>
                <button type="submit" class="btn btn-primary px-4 py-2 btn-submit button-sub" style="background-color: #e58e26; border: none; margin-top: 10px; color: light gray;">Submit</button>
                <button class="btn btn-loading mt-2 d-none" style="background-color: #e58e26; border: none; margin-top: 10px; color: white; padding-top: 10px; padding-bottom: 10px" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
                </button>
            </form>
        </div>
    </div>
`;

const createReviewViewTemplate = (review) => `
        <div class="review-item">
            <div class="review-header">
                <span class="review-name">${review.nama}</span>
                <span class="review-date">(${review.tanggal})</span>
            </div>
            <div class="review-body bg-white">
                <p>${review.isi_review}</p>
            </div>
        </div>
`;

const createMusicPlayerTemplate = (path) => `
    <div class="col-11 col-md-6 player p-0 sticky-top">
        <audio controls loop preload="none">
            <source src="${path}" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    </div>
`;

const createContentTemplate = (content, storyId) => `
    <div class="row d-flex flex-column align-items-center gap-4 mt-4">
        <div class="col text-center mb-2">
            <img
                class="img-fluid story-picture"
                src="${API_ENDPOINT.IMAGE_STORY(storyId, content.pictureId)}"
                alt=""
            />
        </div>
        <div class="col col-xl-9 text-justify">
            <p>
                ${content.story}
            </p>
        </div>
    </div>
`;

const createLikeStoryButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
      <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

const createUnlikeStoryButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
      <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

const createDashboardCard = (item) => `
    <div class="cardDash">
        <img src="${API_ENDPOINT.IMAGE_DASHBOARD(item.idDashImg)}" alt="Gambar Dashboard">
        <h2>${item.title}</h2>
        <p>${item.total}</p>
    </div>
`;
const createReviewTableBody = (review) => `
    <tr>
        <td>${review.id_review}</td>
        <td>${review.id_story}</td>
        <td>${review.nama}</td>
        <td>${review.tanggal}</td>
        <td>${review.isi_review}</td>
        <td>
            <button class="btn-delete" data-review-id="${review.id_review}">Delete</button>
        </td>
    </tr>
`;

const createMessageTableBody = (message) => `
    <tr>
        <td>${message.id_pesan}</td>
        <td>${message.nama}</td>
        <td>${message.email}</td>
        <td>${message.isi_pesan}</td>
        <td>
            <button class="btn-delete" data-pesan-id="${message.id_pesan}">Delete</button>
        </td>
    </tr>
`;

export {
  createStoryItemTemplate,
  createStoryDetailTemplate,
  createMusicPlayerTemplate,
  createContentTemplate,
  createLikeStoryButtonTemplate,
  createUnlikeStoryButtonTemplate,
  createReviewFormTemplate,
  createReviewViewTemplate,
  createDashboardCard,
  createReviewTableBody,
  createMessageTableBody,
};
