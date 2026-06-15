// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api/customers'; 

// export const getAll = async () => {
//     const res = await axios.get(`${API_BASE_URL}/all`);
//     return res.data;
// };

// export const create = async (data: { name: string; email: string; location: string }) => {
//     const res = await axios.post(`${API_BASE_URL}/add`, data);
//     return res.data;
// };

// export const update = async (id: number, data: { name: string; email: string; location: string }) => {
//     const res = await axios.put(`${API_BASE_URL}/update/${id}`, data);
//     return res.data;
// };

// export const deleteCustomer = async (id: number) => {
//     const res = await axios.delete(`${API_BASE_URL}/delete/${id}`);
//     return res.data;
// };
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/customers'; 

export const getAll = async () => {
    const res = await axios.get(`${API_BASE_URL}/all`);
    return res.data;
};

// 🎯 FIX: Changed 'data' type from strict old parameters to 'any' 
// to accept the new Zoho form object metrics without breaking TypeScript compiler.
export const create = async (data: any) => {
    const res = await axios.post(`${API_BASE_URL}/add`, data);
    return res.data;
};

// 🎯 FIX: Changed 'id' to support both number/string, and data to 'any'
export const update = async (id: number | string, data: any) => {
    const res = await axios.put(`${API_BASE_URL}/update/${id}`, data);
    return res.data;
};

export const deleteCustomer = async (id: number | string) => {
    const res = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return res.data;
};