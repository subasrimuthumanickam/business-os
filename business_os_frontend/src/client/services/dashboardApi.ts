 import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const dashboardApi = {
  getStats: () => axios.get(`${API_URL}/client/dashboard/stats`),
  getRecentActivities: () => axios.get(`${API_URL}/client/dashboard/activities`),
  getSalesChart: (months: number = 6) => axios.get(`${API_URL}/client/dashboard/sales-chart?months=${months}`),
  getTopProducts: () => axios.get(`${API_URL}/client/dashboard/top-products`),
  getTasks: () => axios.get(`${API_URL}/client/dashboard/tasks`),
};
