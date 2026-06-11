 export const DashboardController = {
  getStats: async () => {
    return { revenue: 45000, customers: 156, products: 48, invoices: 89 };
  },
  getActivities: async () => {
    return [];
  },
  getChartData: async () => {
    return [];
  }
};

export {};  // ← ADD THIS
