const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch all food entries
export const getAllFoods = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/food/view_foods`);
    if (!response.ok) throw new Error('Error fetching foods');
    return await response.json();
  } catch (error) {
    // Handle or throw the error 
    throw error;
  }
};

// Add a new food entry
export const addFood = async (foodData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/food/create_individual_food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
    });
    if (!response.ok) throw new Error('Error adding food');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Update an existing food entry
export const updateFood = async (foodId, foodData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/${foodId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
    });
    if (!response.ok) throw new Error('Error updating food');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Delete a food entry
export const deleteFood = async (foodId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/${foodId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error deleting food');
    return await response.json();
  } catch (error) {
    throw error;
  }
};
