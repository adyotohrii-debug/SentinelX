import axios from "axios";

// Helper to generate a simple unique random user ID (UUID-like)
function getOrCreateUserId() {
  let userId = localStorage.getItem("sentinelx_user_id");
  if (!userId) {
    userId = "user_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("sentinelx_user_id", userId);
  }
  return userId;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
});

// Add a request interceptor to automatically append X-User-ID to all API calls
api.interceptors.request.use((config) => {
  const userId = getOrCreateUserId();
  config.headers["X-User-ID"] = userId;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;