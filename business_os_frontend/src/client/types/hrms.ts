// src/client/types/hrms.ts

export interface Employee {
  id: string;
  name: string;
  code: string;
  role: string;
  email: string;
  phone?: string;
  department: string;
  joinDate: string;
  salary?: number;
  status: 'active' | 'on-leave' | 'inactive';
  skills?: string[];
  username?: string; 
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  approvedBy?: string;
  approvedDate?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  hours: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'leadership' | 'domain';
}

export interface EmployeeSkill {
  employeeId: string;
  employeeName: string;
  skills: {
    skillId: string;
    level: 1 | 2 | 3 | 4 | 5;
    years: number;
    certified: boolean;
  }[];
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewer: string;
  date: string;
  rating: number;
  comments: string;
  strengths: string[];
  improvements: string[];
  goals: string[];
}

export interface Goal {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export interface OrgNode {
  id: string;
  name: string;
  role: string;
  department: string;
  employeeId?: string;
  avatar?: string;
  children?: OrgNode[];
  metrics?: {
    performance: number;
    teamSize: number;
    tenure: number;
  };
}

export interface DepartmentStats {
  [key: string]: number;
}

export interface LeaveDistribution {
  [key: string]: number;
}

export interface PerformanceDistribution {
  [key: string]: number;
}

export interface AnalyticsData {
  totalEmployees: number;
  activeEmployees: number;
  onLeave: number;
  averageAttendance: number;
  averageRating: number;
  departmentStats: DepartmentStats;
  leaveDistribution: LeaveDistribution;
  performanceDistribution: PerformanceDistribution;
}