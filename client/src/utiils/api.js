const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export async function api(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/api${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
  } catch {
    throw new Error('Cannot reach the API. Make sure the backend is running on port 5000.');
  }

  if (!response.ok) {
    const details = await response.json().catch(() => ({}));
    throw new Error(details.error || `Request failed (${response.status})`);
  }
  if (response.status === 204) return null;
  return response.json();
}
