import Swal from 'sweetalert2';
import { createLikeStoryButtonTemplate, createUnlikeStoryButtonTemplate } from '../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteStories, story }) {
    this._likeButtonContainer = likeButtonContainer;
    this._story = story;
    this._favoriteStories = favoriteStories;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._story;

    if (await this._isStoryExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isStoryExist(id) {
    const story = await this._favoriteStories.getStory(id);
    return !!story;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeStoryButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteStories.putStory(this._story);
      this._renderButton();
      Swal.fire({
        title: 'Liked!',
        text: 'Terima kasih!',
        icon: 'success',
      });
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeStoryButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteStories.deleteStory(this._story.id);
      this._renderButton();
      Swal.fire({
        title: 'Unliked!',
        icon: 'error',
      });
    });
  },
};

export default LikeButtonPresenter;
