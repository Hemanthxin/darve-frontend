// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://web-production-fcbc.up.railway.app';

console.log('=== API Configuration ===');
console.log('Environment:', import.meta.env.MODE);
console.log('API Base URL:', API_BASE_URL);
console.log('VITE_API_URL env var:', import.meta.env.VITE_API_URL);
console.log('========================');

export const config = {
  API_BASE_URL,
};
