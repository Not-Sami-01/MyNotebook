const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://my-notebook-eight.vercel.app/api' 
  : 'http://localhost:5000/api';

export default API_BASE_URL;