import API_ENDPOINT from '../globals/api-endpoint';

class StoryDbSource {
  static async getAllStories() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.stories;
  }

  static async detailStory(idStory) {
    const response = await fetch(API_ENDPOINT.DETAIL(idStory));
    return response.json();
  }

  static async searchStories(query) {
    const loweredCaseQuery = query.toLowerCase();
    const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

    try {
      const response = await fetch(API_ENDPOINT.SEARCH(jammedQuery));
      const text = await response.text();
      const data = JSON.parse(text);

      return data;
    } catch (error) { return []; }
  }

  static async addCustomerReview({ id, name, review }) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id, name, review,
        }),
      };
      const responseText = await fetch(API_ENDPOINT.ADD_REVIEW, options);
      return responseText.json();
    } catch (error) {
      return { error: true, message: `${error.message}! Review not successfully added!\nPlease check your internet connection!` };
    }
  }

  static async getReview(id) {
    const response = await fetch(API_ENDPOINT.GET_REVIEW(id));
    const responseJson = await response.json();
    return responseJson;
  }

  static async getAllReview() {
    const response = await fetch(API_ENDPOINT.GET_ALL_REVIEW);
    const responseJson = await response.json();
    return responseJson;
  }

  static async deleteReviewById(id) {
    const response = await fetch(API_ENDPOINT.DELETE_REVIEW(id), {
      method: 'DELETE',
    });
    const responseJson = await response.json();
    return responseJson;
  }

  static async getCount() {
    const response = await fetch(API_ENDPOINT.GET_DATA_COUNT);
    const responseJson = await response.json();
    return responseJson;
  }

  static async sendMsg({ name, email, message }) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, email, message,
        }),
      };
      const responseText = await fetch(API_ENDPOINT.SEND_MSG, options);
      return responseText.json();
    } catch (error) {
      return { error: true, message: `${error.message}! Message is not successfully added!\nPlease check your internet connection!` };
    }
  }

  static async getAllMsg() {
    const response = await fetch(API_ENDPOINT.GET_ALL_MSG);
    const responseJson = await response.json();
    return responseJson;
  }

  static async deleteMsgById(id) {
    const response = await fetch(API_ENDPOINT.DELETE_MSG(id), {
      method: 'DELETE',
    });
    const responseJson = await response.json();
    return responseJson;
  }

  static async getAdmin(username) {
    const response = await fetch(API_ENDPOINT.GET_ADMIN(username));
    const responseJSON = await response.json();
    return responseJSON;
  }
}

export default StoryDbSource;
