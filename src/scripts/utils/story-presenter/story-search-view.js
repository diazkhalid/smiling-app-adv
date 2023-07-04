import { createStoryItemTemplate } from '../../views/templates/template-creator';

class StorySearchView {
  runWhenUserIsSearching(callback) {
    document.getElementById('search-input').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showStories(stories = []) {
    let html;
    if (stories.length) {
      html = stories.reduce((carry, story) => carry.concat(createStoryItemTemplate(story)), '');
    } else {
      html = this._getEmptyStoryTemplate();
    }
    document.getElementById('card-container').innerHTML = html;

    document.getElementById('card-container').dispatchEvent(new Event('stories:updated'));
  }

  _getEmptyStoryTemplate() {
    return `
    <div class="not-found text-center border-nofound">
    <div style="padding: 50px;">
    <img src="./nofound.png" alt="Not Found" class="not-found-image">
    <h3 class="not-found-heading">Tidak ada data ditampilkan!</h3>
    </div>
    </div>
    
    `;
  }
}

export default StorySearchView;
