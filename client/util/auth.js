/**
   Simple utility for storing and removing auth tokens.
   Generally use the get method before making a request, destroy if the user initiates
   a logout action
*/
export function getAuthToken(key) {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
}

export function setAuthToken(key, token) {
  localStorage.setItem(key, JSON.stringify(token));
}

export function removeAuthToken(key) {
  localStorage.removeItem(key);
}

export function setAuthUsername(key, username) {
  const auth = JSON.parse(localStorage.getItem(key));
  localStorage.setItem(
    key,
    JSON.stringify({
      ...auth,
      apiUsername: username,
    })
  );
}
