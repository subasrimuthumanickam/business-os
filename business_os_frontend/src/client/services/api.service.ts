import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Unga Node.js server port code padi update pannunga

export const fetchCustomers = async () => {
    const response = await axios.get(`${API_BASE_URL}/customers/all`);
    return response.data; // types setup query response mapping
};