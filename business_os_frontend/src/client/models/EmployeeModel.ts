 export interface EmployeeModel {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

export const EmployeeModel = {
  create: (data: Partial<EmployeeModel>): EmployeeModel => {
    return {
      id: Date.now().toString(),
      name: data.name || '',
      email: data.email || '',
      department: data.department || '',
      position: data.position || '',
      salary: data.salary || 0,
      joinDate: new Date().toISOString().slice(0, 10),
      status: data.status || 'active',
    };
  },
  calculateNetSalary: (salary: number): number => {
    const pf = salary * 0.12;
    const tax = salary * 0.1;
    return salary - pf - tax;
  }
};

export {};  // ← ADD THIS
