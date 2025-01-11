import api from './api';

export const expenseService = {
    getAll: async () => {
        const response = await api.get('/expenses');
        return response.data.data;
    },

    create: async (expenseData) => {
        const response = await api.post('/expenses', expenseData);
        return response.data.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/expenses/${id}`);
        return response.data;
    }
};