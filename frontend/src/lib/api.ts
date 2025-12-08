import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const auth = {
    signup: async (data: any) => {
        return api.post('/auth/signup', data);
    },
    login: async (data: any) => {
        const params = new URLSearchParams();
        params.append('username', data.email);
        params.append('password', data.password);
        return api.post('/auth/login', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    me: async () => {
        return api.get('/auth/me');
    },
};

export const orders = {
    create: async (data: any) => {
        return api.post('/orders/', data);
    },
    list: async () => {
        return api.get('/orders/');
    },
    get: async (id: string) => {
        return api.get(`/orders/${id}`);
    },
    updateStatus: async (id: string, status: string) => {
        return api.patch(`/orders/${id}/status`, null, { params: { status } });
    },
    getAll: async () => {
        return api.get('/orders/admin/all');
    },
};

export default api;
