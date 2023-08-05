import axios from 'axios';

const baseURL = 'https://49.50.172.178:8443/findPhotoSpot-0.0.1-SNAPSHOT';

const authInstance = axios.create({
  baseURL,
  headers: { 'Content-type': 'application/json' },
});

const imgInstance = axios.create({
  baseURL,
});

// const formInstance = axios.create({
//   BASE_URL,
//   headers: { 'Content-type': 'multipart/form-data' },
// });

export const emailValid = async (formData) => {
  try {
    const response = await authInstance.post('/user/emailvalid', formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const nicknameValid = async (formData) => {
  try {
    const response = await authInstance.post('/user/nicknamevalid', formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const joinSubmit = async (formData) => {
  try {
    const response = await authInstance.post('/user', formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMarker = async (formData) => {
  try {
    const response = await authInstance.post('/spot/searchAll', formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const spotUpload = async (formData) => {
  try {
    const response = await authInstance.post('/spot/insertSpot', formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadImgs = async (formData) => {
  try {
    const response = await imgInstance.post('/image/uploadfiles', formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSpotData = async (formData) => {
  try {
    const response = await authInstance.post('/spot/findSpotById', formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSpotReviewData = async (formData) => {
  try {
    const response = await authInstance.post('/user/findRecommender', formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const heartData = async (formData) => {
  try {
    const response = await authInstance.post('/spotLike/like', formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const unheartData = async (formData) => {
  try {
    const response = await authInstance.post('/spotLike/unLike', formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
