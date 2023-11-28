const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to handle user login
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

// Function to handle user registration
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
