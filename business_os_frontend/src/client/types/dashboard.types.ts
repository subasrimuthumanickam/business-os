 export interface DashboardStats {
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  customers: {
    total: number;
    newThisMonth: number;
    active: number;
  };
  products: {
    total: number;
    lowStock: number;
    outOfStock: number;
  };
  invoices: {
    total: number;
    draft: number;
    pending: number;
    paid: number;
    overdue: number;
  };
}

export interface Activity {
  id: string;
  type: 'customer' | 'invoice' | 'payment' | 'stock' | 'lead';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface TopProduct {
  id: string;
  name: string;
  revenue: number;
  quantity: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo?: string;
}
