import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const getChaptersByStoryId = async storyId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/chapters-by-story/${storyId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching chapter data:', error.message);
    throw error;
  }
};

export const getChapterById = async chapterId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/chapters/${chapterId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching chapter data:', error.message);
    throw error;
  }
};

export const deleteChapter = async id => {
  try {
    const response = await axios.delete(`${BASE_URL}/chapters/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting chapter:', error.message);
    throw error;
  }
};

export const updateChapter = async (chapterId, newChapterData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/chapters/${chapterId}`,
      newChapterData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating chapter:', error.message);
    throw error;
  }
};

export const createChapter = async newChapterData => {
  try {
    const response = await axios.post(
      `${BASE_URL}/chapters`,
      newChapterData
    );
    return response.data;
  } catch (error) {
    console.error('Error creating chapter:', error.message);
    throw error;
  }
};
