import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteStoryIdb = {
  async getStory(id) {
    if (!id) {
      return;
    }

    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllStories() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putStory(story) {
    if (!story.hasOwnProperty('id')) {
      return;
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, story);
  },
  async deleteStory(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
  async searchStories(query) {
    return (await this.getAllStories()).filter((story) => {
      const loweredCaseStoryTitle = (story.title || '-').toLowerCase();
      const jammedStoryTitle = loweredCaseStoryTitle.replace(/\s/g, '');
      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
      return jammedStoryTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

export default FavoriteStoryIdb;
