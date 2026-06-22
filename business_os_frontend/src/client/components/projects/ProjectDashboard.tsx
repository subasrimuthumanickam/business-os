// src/client/components/projects/ProjectDashboard.tsx
import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign,
  Calendar,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  FileText,
  Plus,
  Activity,
  PieChart,
  Settings
} from 'lucide-react';

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalHours: string;
  teamMembers: number;
  revenue: string;
  overdueTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

interface RecentActivity {
  id: string;
  type: 'task' | 'time' | 'project' | 'invoice' | 'comment';
  title: string;
  user: string;
  time: string;
  project: string;
  avatar?: string;
}

interface UpcomingDeadline {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignee: string;
}

const ProjectDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const stats: DashboardStats = {
    totalProjects: 12,
    activeProjects: 7,
    totalHours: '447:48',
    teamMembers: 8,
    revenue: '$29,500',
    overdueTasks: 3,
    completedTasks: 42,
    pendingTasks: 18
  };

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'task',
      title: 'Task completed: Design Homepage',
      user: 'Patricia Boyle',
      time: '2 hours ago',
      project: 'Web Designing',
      avatar: 'PB'
    },
    {
      id: '2',
      type: 'time',
      title: 'Logged 4 hours on Development',
      user: 'John Doe',
      time: '4 hours ago',
      project: 'Design contract for Mr. Bruce',
      avatar: 'JD'
    },
    {
      id: '3',
      type: 'project',
      title: 'New project created: Mobile App Design',
      user: 'Jane Smith',
      time: '1 day ago',
      project: 'Mobile App Design',
      avatar: 'JS'
    },
    {
      id: '4',
      type: 'invoice',
      title: 'Invoice generated for $2,500',
      user: 'System',
      time: '2 days ago',
      project: 'Design project for MR.X',
      avatar: 'SYS'
    },
    {
      id: '5',
      type: 'comment',
      title: 'Commented on: User Testing',
      user: 'Patricia Boyle',
      time: '2 days ago',
      project: 'Web app designing',
      avatar: 'PB'
    }
  ];

  const upcomingDeadlines: UpcomingDeadline[] = [
    {
      id: '1',
      title: 'Develop API Integration',
      project: 'Design contract for Mr. Bruce',
      dueDate: '2024-06-10',
      priority: 'urgent',
      assignee: 'John Doe'
    },
    {
      id: '2',
      title: 'User Testing',
      project: 'Web app designing',
      dueDate: '2024-06-15',
      priority: 'high',
      assignee: 'Jane Smith'
    },
    {
      id: '3',
      title: 'Finalize Branding',
      project: 'Design project for MR.X',
      dueDate: '2024-06-20',
      priority: 'medium',
      assignee: 'Patricia Boyle'
    },
    {
      id: '4',
      title: 'Database Optimization',
      project: 'Design project for Bruce',
      dueDate: '2024-06-25',
      priority: 'medium',
      assignee: 'John Doe'
    },
    {
      id: '5',
      title: 'Client Feedback Review',
      project: 'Design project - Z',
      dueDate: '2024-06-28',
      priority: 'high',
      assignee: 'Patricia Boyle'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'urgent': return <AlertTriangle className="w-3 h-3" />;
      case 'high': return <AlertTriangle className="w-3 h-3" />;
      case 'medium': return <AlertTriangle className="w-3 h-3" />;
      default: return <AlertTriangle className="w-3 h-3" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'task': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'time': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'project': return <FileText className="w-4 h-4 text-purple-500" />;
      case 'invoice': return <DollarSign className="w-4 h-4 text-yellow-500" />;
      case 'comment': return <Activity className="w-4 h-4 text-indigo-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityBadgeColor = (type: string) => {
    switch(type) {
      case 'task': return 'bg-green-100 text-green-800';
      case 'time': return 'bg-blue-100 text-blue-800';
      case 'project': return 'bg-purple-100 text-purple-800';
      case 'invoice': return 'bg-yellow-100 text-yellow-800';
      case 'comment': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
              Project Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">Overview of all your projects and team activities</p>
          </div>
          <div className="flex flex-wrap items-center space-x-3 gap-2">
            <div className="flex items-center space-x-1 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1 text-sm rounded transition ${
                  timeRange === 'week' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1 text-sm rounded transition ${
                  timeRange === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange('year')}
                className={`px-3 py-1 text-sm rounded transition ${
                  timeRange === 'year' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Year
              </button>
            </div>
            <button className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center shadow-sm">
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Total Projects</span>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalProjects}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUp className="w-3 h-3" />
              <span>12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Active</span>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.activeProjects}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUp className="w-3 h-3" />
              <span>5% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Hours Logged</span>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-600">{stats.totalHours}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUp className="w-3 h-3" />
              <span>8% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Team Members</span>
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-indigo-600">{stats.teamMembers}</div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <span>Active team</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Revenue</span>
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-emerald-600">{stats.revenue}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUp className="w-3 h-3" />
              <span>18% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Overdue</span>
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.overdueTasks}</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowDown className="w-3 h-3" />
              <span>2 from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Completed</span>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{stats.completedTasks}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUp className="w-3 h-3" />
              <span>24 tasks done</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All →
              </button>
            </div>
            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-sm flex-shrink-0">
                    {activity.avatar || activity.user.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.title}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${getActivityBadgeColor(activity.type)}`}>
                        {activity.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                      <span className="truncate">{activity.project}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900">Deadlines</h3>
                </div>
                <span className="text-xs text-gray-500">{upcomingDeadlines.length} tasks</span>
              </div>
              <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
                {upcomingDeadlines.map(deadline => (
                  <div key={deadline.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900 flex-1">{deadline.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium border flex items-center space-x-1 ${getPriorityColor(deadline.priority)}`}>
                        {getPriorityIcon(deadline.priority)}
                        <span>{deadline.priority}</span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{deadline.project}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>{deadline.assignee}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Due: {deadline.dueDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-gray-200">
                <button className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All Tasks →
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                  <div className="text-xs text-gray-600">Project Completion</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">42</div>
                  <div className="text-xs text-gray-600">Tasks Done</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600">18</div>
                  <div className="text-xs text-gray-600">In Progress</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-yellow-600">7</div>
                  <div className="text-xs text-gray-600">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Plus className="w-5 h-5 mr-2 text-blue-600" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center group">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-700">New Project</span>
            </button>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition text-center group">
              <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-700">Log Time</span>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-center group">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-700">Add Team</span>
            </button>
            <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition text-center group">
              <div className="w-12 h-12 bg-yellow-600 text-white rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-700">Create Invoice</span>
            </button>
            <button className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition text-center group">
              <div className="w-12 h-12 bg-red-600 text-white rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-700">Report Issue</span>
            </button>
            <button className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition text-center group">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition">
                <PieChart className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-700">Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;