/* eslint-disable no-plusplus */
import FavoriteStoryIdb from '../../data/favorite-story-idb';
import StoryShowPresenter from '../../utils/story-presenter/story-show-presenter';
import StorySearchView from '../../utils/story-presenter/story-search-view';
import StorySearchPresenter from '../../utils/story-presenter/story-search-presenter';
import Session from '../../utils/session';

const view = new StorySearchView();

const Favorite = {
  async render() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const wave = document.querySelector('#wave');
    header.classList.remove('d-none');
    footer.classList.remove('d-none');
    wave.classList.remove('d-none');
    Session.isNotAdmin();
    return `
    <h2 class="m-5 jumbotron">Buku Favorit</h2>
    <div class="container">
    <div class="row justify-content-center mt-5">
        <div class="col-md-5">
            <div class="input-group shadow-search sticky-md-top">
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
    <div class="container my-5 rounded">
      <div class="row" id="card-container"></div>
    </div>
    `;
  },

  async afterRender() {
    new StoryShowPresenter({ view, stories: FavoriteStoryIdb });
    new StorySearchPresenter({ view, stories: FavoriteStoryIdb });
  },
};

export default Favorite;
