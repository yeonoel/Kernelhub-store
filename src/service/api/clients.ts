
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('401 Unauthorized', error.response);
      const publicRoutes = ['/connection', '/inscription', '/'];
      // Vérifier si la route actuelle est publique ou protegée
      const isPublic = publicRoutes.some(r => window.location.pathname.startsWith(r));

      if (!isPublic) {
        localStorage.removeItem('token');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;