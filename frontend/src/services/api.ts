const API_URL = 'http://localhost:3002';

interface AuthResponse {
    token: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const api = {
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }

        return response.json();
    },

    async register(email: string, password: string, name?: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Registration failed');
        }

        return response.json();
    },

    setTokens(token: string, refreshToken: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
    },

    getToken() {
        return localStorage.getItem('token');
    },

    clearTokens() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    },

    async getHabits() {
        const token = this.getToken();
        const response = await fetch(`${API_URL}/habits`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.clearTokens();
                window.location.href = '/login';
            }
            throw new Error('Failed to fetch habits');
        }

        return response.json();
    },
};
