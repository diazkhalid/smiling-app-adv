/* eslint-disable import/named */
/* eslint-disable radix */
/* eslint-disable import/no-cycle */
import {
  createContentTemplate,
  createMusicPlayerTemplate,
  createReviewViewTemplate,
} from '../views/templates/template-creator';

const DetailHelper = {
  eachContent({ content, id }) {
    let contentString = '';
    content.forEach((item) => {
      contentString += createContentTemplate(item, id);
    });
    return contentString;
  },

  playerMusic(story) {
    let musicPlayerString = '';
    const srcString = `./${story.musicId}.mp3`;
    musicPlayerString += createMusicPlayerTemplate(srcString);
    return musicPlayerString;
  },

  eachStoryReview(review) {
    let storyReviewsString = '';
    review.forEach((storyReview) => {
      storyReviewsString += createReviewViewTemplate(storyReview);
    });

    return storyReviewsString;
  },
};

export default DetailHelper;
