/* eslint-disable no-alert */
import Swal from 'sweetalert2';
import StoryDbSource from '../data/storydb-source';
import UrlParser from '../routes/url-parser';
import { createReviewViewTemplate, createReviewFormTemplate } from '../views/templates/template-creator';

const ReviewInitiator = {
  init({ storyReviewContainer, storyFormReviewContainer }) {
    this._storyReviewContainer = storyReviewContainer;
    this._storyFormReviewContainer = storyFormReviewContainer;
    this._renderForm();
  },

  _renderForm() {
    this._storyFormReviewContainer.innerHTML = createReviewFormTemplate();
    this._isFormSubmitted();
  },

  _isFormSubmitted() {
    const reviewFormElement = document.querySelector('#reviewForm');
    const buttonSubmit = document.querySelector('.button-sub');
    const buttonLoading = document.querySelector('.btn-loading');
    reviewFormElement.addEventListener('submit', (e) => {
      e.preventDefault();

      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const inputName = document.querySelector('#inputName');
      const inputReview = document.querySelector('#inputReview');

      if (inputName.value.length > 16) {
        Swal.fire('Nama harus dibawah 16 karakter!');
        return;
      }
      buttonSubmit.classList.toggle('d-none');
      buttonLoading.classList.remove('d-none');
      this._makeRequest({
        id: url.id,
        name: inputName.value,
        review: inputReview.value,
      });
    });
  },

  async _makeRequest({ id, name, review }) {
    const inputName = document.querySelector('#inputName');
    const inputReview = document.querySelector('#inputReview');
    const buttonSubmit = document.querySelector('.button-sub');
    const buttonLoading = document.querySelector('.btn-loading');
    const responseJSON = await StoryDbSource.addCustomerReview({ id, name, review });
    const reviewResponse = await StoryDbSource.getReview(id);
    const latestReview = reviewResponse[reviewResponse.length - 1];

    if (await responseJSON.length > 0) {
      this._storyReviewContainer.innerHTML += createReviewViewTemplate(latestReview);
      const noReviewStatus = document.querySelector('#noReview');
      noReviewStatus.style.display = 'none';
      inputName.value = '';
      inputReview.value = '';

      Swal.fire('Berhasil!', 'Review berhasil ditambahkan!', 'success');
      buttonSubmit.classList.remove('d-none');
      buttonLoading.classList.toggle('d-none');
    } else {
      Swal.fire('Gagal!', await responseJSON.message, 'error');
    }
  },
};

export default ReviewInitiator;
