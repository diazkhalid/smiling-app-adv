import CONFIG from './config';

const { BASE_URL, BASE_IMAGE_URL, BASE_THUMBNAIL_URL } = CONFIG;
const API_ENDPOINT = {
  LIST: `${BASE_URL}list`,
  DETAIL: (id) => `${BASE_URL}detail/${id}`,
  ADD_REVIEW: `${BASE_URL}review`,
  GET_REVIEW: (id) => `${BASE_URL}getreview/${id}`,
  SEARCH: (keyword) => `${BASE_URL}search?title=${keyword}`,
  IMAGE_STORY: (storyId, imageId) => `${BASE_IMAGE_URL}/${storyId}/${imageId}`,
  IMAGE_THUMBNAIL: (thumbId) => `${BASE_THUMBNAIL_URL}/${thumbId}`,
  DELETE_REVIEW: (id) => `${BASE_URL}review/delete/${id}`,
  GET_ALL_REVIEW: `${BASE_URL}getAllReview`,
  GET_DATA_COUNT: `${BASE_URL}getCount`,
  IMAGE_DASHBOARD: (id) => `${BASE_URL}getDashImg/${id}`,
  SEND_MSG: `${BASE_URL}sendMsg`,
  GET_ALL_MSG: `${BASE_URL}getAllMsg`,
  DELETE_MSG: (id) => `${BASE_URL}message/delete/${id}`,
};

export default API_ENDPOINT;
