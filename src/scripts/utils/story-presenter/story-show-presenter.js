class StoryShowPresenter {
  constructor({ view, stories }) {
    this._view = view;
    this._stories = stories;

    this._showStories();
  }

  async _showStories() {
    const stories = await this._stories.getAllStories();
    this._displayStories(stories);
  }

  _displayStories(stories) {
    this._view.showStories(stories);
  }
}

export default StoryShowPresenter;
