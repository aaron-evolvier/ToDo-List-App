import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
    getTodos: async () => {
        const response = await axios.get(`${API_URL}/todos`);
        return response.data;
    },

    createTodo: async (text) => {
        const response = await axios.post(`${API_URL}/todos`, { text });
        return response.data;
    },

    updateTodo: async (id, updates) => {
        const response = await axios.patch(`${API_URL}/todos/${id}`, updates);
        return response.data;
    },

    deleteTodo: async (id) => {
        await axios.delete(`${API_URL}/todos/${id}`);
    }
};

export default api;
