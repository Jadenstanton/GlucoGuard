const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

export async function loginUser(credentials) {
  return fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}

export async function registerUser(userData) {
  return fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(data => data.json())
}
