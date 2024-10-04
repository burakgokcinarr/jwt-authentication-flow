import { instance } from './apiConfig';

export const login = async (username, password) => {
    try {
        const response = await instance.post('/login', { username, password });

        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const allUsers = async () => {
    try {
        const response = await instance.get('/users');

        return response.data;
    } catch (error) {
        console.error('Get All Product failed:', error);
        throw error;
    }
};
