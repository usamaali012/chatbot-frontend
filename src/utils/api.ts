import axios from "axios";

export const api = axios.create({
  baseURL: "<<YOUR_BASE_URL>>",   // e.g. /api
  timeout: 15_000,
});

// Global error handler (optional)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Attach a human-readable message for toasts ↓
    err.uiMessage =
      err.response?.data?.message || err.message || 'Unknown network error';
    return Promise.reject(err);
  }
);
