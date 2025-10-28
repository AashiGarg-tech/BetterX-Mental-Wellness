// services/moodApi.js
import apiClient from '../../src/utils/apiClient';

export const saveMoodEntry = async (moodData) => {
  try {
    const response = await apiClient.fetchWithAuth('/api/mood/entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mood_rating: moodData.mood_rating,
        notes: moodData.notes,
        check_in_date: new Date().toISOString().split('T')[0]
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error saving mood:', error);
    throw error;
  }
};

export const getMoodStats = async () => {
  try {
    const response = await apiClient.fetchWithAuth('/api/mood/stats', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching mood stats:', error);
    throw error;
  }
};