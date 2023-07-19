/* eslint-disable no-plusplus */
import UrlParser from '../../routes/url-parser';
import StoryDbSource from '../../data/storydb-source';
import { createStoryDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteStoryIdb from '../../data/favorite-story-idb';
import ReviewInitiator from '../../utils/review-initiator';
import Session from '../../utils/session';

const Detail = {
  async render() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const wave = document.querySelector('#wave');
    header.classList.remove('d-none');
    footer.classList.remove('d-none');
    wave.classList.remove('d-none');
    Session.isNotAdmin();
    return `
    <div class="container-loading">
        <div class="cloud front">
          <span class="left-front"></span>
          <span class="right-front"></span>
        </div>
        <span class="sun sunshine"></span>
        <span class="sun"></span>
        <div class="cloud back">
          <span class="left-back"></span>
          <span class="right-back"></span>
        </div>
    </div>
    <div id="detail-container" class="container d-flex flex-column gap-5 my-5 px-4 px-sm-0"></div>
    <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const loading = document.querySelector('.container-loading');
    const story = await StoryDbSource.detailStory(url.id);
    const review = await StoryDbSource.getReview(url.id);
    loading.classList.add('d-none');
    const container = document.querySelector('#detail-container');

    container.innerHTML = createStoryDetailTemplate(story, review);
    if (review.length > 0) {
      const noReviewStatus = document.querySelector('#noReview');
      noReviewStatus.style.display = 'none';
    }

    ReviewInitiator.init({
      storyReviewContainer: document.querySelector('#reviewViewContainer'),
      storyFormReviewContainer: document.querySelector('#reviewFormContainer'),
    });

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteStories: FavoriteStoryIdb,
      story: {
        id: story.id,
        title: story.title,
        description: story.description,
      },
    });
  },
};

export default Detail;
