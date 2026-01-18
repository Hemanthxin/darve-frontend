const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://web-production-fcbc.up.railway.app';

export interface AuthResponse {
  message: string;
  token?: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  async register(name: string, email: string, templeId: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, temple_id: templeId, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Registration failed');
      }

      return response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Login failed');
      }

      const data = await response.json();
      return {
        ...data,
        token: data.token || data.access_token
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  setToken(token: string) {
    localStorage.setItem('authToken', token);
  },

  getToken() {
    return localStorage.getItem('authToken');
  },

  removeToken() {
    localStorage.removeItem('authToken');
  },
};
