
let API_URL = 'https://t-forum-serverside.herokuapp.com';
if (window.location.hostname === 'localhost') {
  API_URL = 'http://localhost:3000';
}

/* eslint-disable import/prefer-default-export */

export async function isAdmin() {
  const respnse = await fetch(`${API_URL}/auth/isAdmin`);
  return respnse.json();
}
