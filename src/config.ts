// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://darve-app.vercel.app';

// The AI verification model runs on this Hugging Face Space and is called
// directly from the browser (not proxied through the backend), since the
// verification call can take up to ~120s -- longer than the backend's
// serverless execution limit allows.
const HF_VERIFY_URL =
  import.meta.env.VITE_HF_VERIFY_URL ||
  'https://hemanthb2004-drave-ai-verifier.hf.space/verify';

console.log('=== API Configuration ===');
console.log('Environment:', import.meta.env.MODE);
console.log('API Base URL:', API_BASE_URL);
console.log('VITE_API_URL env var:', import.meta.env.VITE_API_URL);
console.log('HF Verify URL:', HF_VERIFY_URL);
console.log('========================');

export const config = {
  API_BASE_URL,
  HF_VERIFY_URL,
};
