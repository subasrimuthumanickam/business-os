 export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
}

export const EmployeeController = {
  getAll: async (): Promise<Employee[]> => {
    return [];
  },
  getById: async (id: string): Promise<Employee | null> => {
    return null;
  },
  create: async (data: any): Promise<Employee> => {
    return {} as Employee;
  },
  update: async (id: string, data: any): Promise<Employee> => {
    return {} as Employee;
  },
  delete: async (id: string): Promise<void> => {}
};

export {};  // ← ADD THIS
