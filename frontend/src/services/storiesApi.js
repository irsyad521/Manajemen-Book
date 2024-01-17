import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const getAllDataStories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/stories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

export const getStoryById = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/stories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching story data:', error.message);
    throw error;
  }
};

export const updateStory = async (id, formData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/stories/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating story:', error.message);
    throw error;
  }
};

export const createStory = async formData => {
  try {
    const response = await axios.post(
      `${BASE_URL}/stories`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating story:', error.message);
    throw error;
  }
};

export const deleteStory = async id => {
  try {
    const response = await axios.delete(`${BASE_URL}/stories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting story:', error.message);
  }
};
