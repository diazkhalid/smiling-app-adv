class StorySearchPresenter {
  constructor({ stories, view }) {
    this._view = view;
    this._stories = stories;
    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchStories(latestQuery);
    });
  }

  async _searchStories(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundStories;
    if (this.latestQuery.length > 0) {
      foundStories = await this._stories.searchStories(this.latestQuery);
    } else {
      foundStories = await this._stories.getAllStories();
    }

    this._showFoundStories(foundStories);
  }

  _showFoundStories(stories) {
    this._view.showStories(stories);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default StorySearchPresenter;
