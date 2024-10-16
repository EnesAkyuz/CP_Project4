// client/src/services/OptionsAPI.js

const API_URL = '/api/options';

export const fetchOptionsByCategory = async (category, isConvertible) => {
  try {
    const response = await fetch(`${API_URL}/${category}?isConvertible=${isConvertible}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching options:', error);
    throw error;
  }
};
