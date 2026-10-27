const API_BASE = '/api';

const getHeaders = (isAuthRequired = false) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (isAuthRequired) {
    const token = localStorage.getItem('imovies_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// Auth API
export const loginApi = async (credentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  });
  return res.json();
};

export const registerApi = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(userData)
  });
  return res.json();
};

export const getMeApi = async () => {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getHeaders(true)
  });
  return res.json();
};

// Movies API
export const getMoviesApi = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/movies?${query}`);
  return res.json();
};

export const getFeaturedMoviesApi = async () => {
  const res = await fetch(`${API_BASE}/movies/featured`);
  return res.json();
};

export const getMovieByIdApi = async (id) => {
  const res = await fetch(`${API_BASE}/movies/${id}`);
  return res.json();
};

export const getMovieCinemasApi = async (movieId, city = 'Bengaluru') => {
  const res = await fetch(`${API_BASE}/movies/${movieId}/cinemas?city=${encodeURIComponent(city)}`);
  return res.json();
};

// Cinema & Show API
export const getShowDetailsApi = async (showId) => {
  const res = await fetch(`${API_BASE}/cinemas/shows/${showId}`);
  return res.json();
};

export const getAddonsApi = async () => {
  const res = await fetch(`${API_BASE}/addons`);
  return res.json();
};

// Booking API
export const createBookingApi = async (bookingData) => {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(bookingData)
  });
  return res.json();
};

export const getMyBookingsApi = async () => {
  const res = await fetch(`${API_BASE}/bookings/my`, {
    headers: getHeaders(true)
  });
  return res.json();
};

export const getBookingByIdApi = async (id) => {
  const res = await fetch(`${API_BASE}/bookings/${id}`, {
    headers: getHeaders(true)
  });
  return res.json();
};

export const cancelBookingApi = async (id) => {
  const res = await fetch(`${API_BASE}/bookings/${id}/cancel`, {
    method: 'POST',
    headers: getHeaders(true)
  });
  return res.json();
};

export const checkHealthApi = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    return { status: 'offline' };
  }
};
