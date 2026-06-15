import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/customers'; 

export const getAll = async () => {
    const res = await axios.get(`${API_BASE_URL}/all`);
    return res.data;
};

export const create = async (data: { name: string; email: string; location: string }) => {
    const res = await axios.post(`${API_BASE_URL}/add`, data);
    return res.data;
};

export const update = async (id: number, data: { name: string; email: string; location: string }) => {
    const res = await axios.put(`${API_BASE_URL}/update/${id}`, data);
    return res.data;
};

export const deleteCustomer = async (id: number) => {
    const res = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return res.data;
};