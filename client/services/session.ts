/**
   Simple utility for storing and removing auth tokens.
   Generally use the get method before making a request, destroy if the user initiates
   a logout action
*/
export const SESSION_KEY = 'ido.session';

export function getSession() {
  const value = localStorage.getItem(SESSION_KEY);
  return value ? JSON.parse(value) : null;
}

export function saveSession(session: any) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function destroySession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getAuthTime() {
  const session = getSession();
  return session ? session.authTime : 0;
}

export function getToken() {
  try {
    const { accessToken } = getSession();
    return `Bearer ${accessToken}`;
  } catch (err) {
    throw new Error('Access token not available');
  }
}
