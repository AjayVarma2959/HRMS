import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Your backend API URL

export const employeeApi = {
    addEmployee: async (employeeData) => {
        try {
            const response = await axios.post(`${BASE_URL}/employees`, employeeData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to add employee' };
        }
    },

    getEmployees: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/employees`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to fetch employees' };
        }
    },

    deleteEmployee: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/employees/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, message: 'Failed to delete employee' };
        }
    }
};