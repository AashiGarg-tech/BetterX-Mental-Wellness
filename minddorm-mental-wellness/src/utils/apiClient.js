const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5050';

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE}/api/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    if (!res.ok) return null;
    const data = await res.json();
    const newAccessToken = data.accessToken;
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
      // legacy alias
      localStorage.setItem('token', newAccessToken);
      return newAccessToken;
    }
    return null;
  } catch (err) {
    console.error('Token refresh error', err);
    return null;
  }
}

export async function fetchWithAuth(url, opts = {}, retry = true) {
  const API_URL = url.startsWith('http') ? url : `${API_BASE}${url}`;
  const accessToken = localStorage.getItem('accessToken') || localStorage.getItem('token');
  const headers = Object.assign({}, opts.headers || {}, {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
  });
  let res = await fetch(API_URL, { ...opts, headers });

  if (res.status === 401) {
    // try refresh once
    if (!retry) return res;
    const newToken = await refreshAccessToken();
    if (!newToken) {
      // failed to refresh -> clear auth
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
      return res;
    }
    const headers2 = Object.assign({}, opts.headers || {}, {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${newToken}`
    });
    return fetch(API_URL, { ...opts, headers: headers2 });
  }

  return res;
}

export default { fetchWithAuth, refreshAccessToken };
