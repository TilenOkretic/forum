/* eslint-disable */

let BASE_URL = 'https://t-forum-serverside.herokuapp.com';
if (window.location.hostname === 'localhost') {
  BASE_URL = 'http://localhost:3000';
}

const API_URL = `${BASE_URL}/api/v1`;

export { API_URL, BASE_URL };

/* eslint-disable import/prefer-default-export */

export async function getAllCategories() {
  const respone = await fetch(`${API_URL}/categories`);
  return respone.json();
}

export async function createCategory(category) {
  const respone = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    body: JSON.stringify(category),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.token}`,
    },
  });
  return respone.json();
}

