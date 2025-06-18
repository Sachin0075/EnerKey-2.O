// src/services/JWT/getJwtSub.js

// Utility to extract the 'sub' (subject/user id) from a JWT token
export function getJwtSub(token) {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decoded.sub || null;
  } catch (e) {
    console.error('Failed to decode JWT:', e);
    return null;
  }
}
