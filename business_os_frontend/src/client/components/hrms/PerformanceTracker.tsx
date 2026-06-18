import React, { useState, useEffect } from 'react';
import { Employee, PerformanceReview, Goal } from '../../types/hrms';

interface PerformanceTrackerProps {
  employees?: Employee[];
  reviews?: PerformanceReview[];
  goals?: Goal[];
  onPerformanceUpdate?: (reviews: PerformanceReview[]) => void;
  onGoalsUpdate?: (goals: Goal[]) => void;
}

const PerformanceTracker: React.FC<PerformanceTrackerProps> = ({
  employees: propEmployees,
  reviews: propReviews,
  goals: propGoals,
  onPerformanceUpdate,
  onGoalsUpdate
}) => {
  const [employees, setEmployees] = useState<Employee[]>(propEmployees || []);
  const [goals, setGoals] = useState<Goal[]>(propGoals || []);
  const [reviews, setReviews] = useState<PerformanceReview[]>(propReviews || []);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [formData, setFormData] = useState<any>({
    employeeId: '',
    employeeName: '',
    rating: 0,
    comments: '',
    strengths: '',
    improvements: '',
    goals: ''
  });

  const [goalFormData, setGoalFormData] = useState<Partial<Goal>>({
    employeeId: '',
    title: '',
    description: '',
    targetDate: '',
    progress: 0,
    status: 'not-started',
    priority: 'medium',
    category: ''
  });

  useEffect(() => {
    if (!propEmployees) fetchEmployees();
    if (!propReviews) fetchReviews();
    if (!propGoals) fetchGoals();
  }, []);

  const fetchEmployees = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const mockEmployees: Employee[] = [
        { id: '1', name: 'Takiya Baksh', code: 'EMP001', email: 'takiya@company.com', department: 'Design', role: 'UI/UX Designer', joinDate: '2024-01-15', status: 'active', skills: ['React', 'TypeScript', 'UI/UX'], phone: '+1 234-567-8901', salary: 75000 },
        { id: '2', name: 'John Smith', code: 'EMP002', email: 'john@company.com', department: 'Engineering', role: 'Frontend Developer', joinDate: '2023-11-01', status: 'active', skills: ['React', 'TypeScript', 'Node.js'], phone: '+1 234-567-8902', salary: 82000 },
        { id: '3', name: 'Sarah Johnson', code: 'EMP003', email: 'sarah@company.com', department: 'Executive', role: 'CEO', joinDate: '2020-06-10', status: 'active', skills: ['Leadership', 'Communication'], phone: '+1 234-567-8903', salary: 150000 },
        { id: '4', name: 'Michael Chen', code: 'EMP004', email: 'michael@company.com', department: 'Engineering', role: 'Backend Developer', joinDate: '2024-03-20', status: 'active', skills: ['Node.js', 'AWS'], phone: '+1 234-567-8904', salary: 78000 },
        { id: '5', name: 'Emily Rodriguez', code: 'EMP005', email: 'emily@company.com', department: 'HR', role: 'HR Specialist', joinDate: '2023-08-05', status: 'active', skills: ['Recruitment', 'Training'], phone: '+1 234-567-8905', salary: 65000 }
      ];
      setEmployees(mockEmployees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchReviews = async () => {
    // setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockReviews: PerformanceReview[] = [
        {
          id: '1',
          employeeId: '1',
          employeeName: 'Takiya Baksh',
          reviewer: 'Sarah Johnson',
          date: '2026-06-15',
          rating: 4.5,
          comments: 'Excellent performance, exceeded expectations',
          strengths: ['UI/UX design', 'Problem solving', 'Team collaboration'],
          improvements: ['Time management', 'Documentation'],
          goals: ['Lead a major project', 'Mentor junior designers']
        },
        {
          id: '2',
          employeeId: '2',
          employeeName: 'John Smith',
          reviewer: 'Sarah Johnson',
          date: '2026-06-10',
          rating: 4.2,
          comments: 'Great technical skills, good team player',
          strengths: ['Frontend development', 'Code quality', 'Communication'],
          improvements: ['Architecture design', 'Deployment knowledge'],
          goals: ['Learn AWS', 'Contribute to open source']
        }
      ];
      setReviews(mockReviews);
      if (onPerformanceUpdate) onPerformanceUpdate(mockReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchGoals = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const mockGoals: Goal[] = [
        {
          id: '1',
          employeeId: '1',
          title: 'Complete React Project',
          description: 'Finish the enterprise React application',
          targetDate: '2026-07-15',
          progress: 75,
          status: 'in-progress',
          priority: 'high',
          category: 'Technical'
        },
        {
          id: '2',
          employeeId: '2',
          title: 'Team Leadership Training',
          description: 'Complete leadership certification',
          targetDate: '2026-08-01',
          progress: 30,
          status: 'in-progress',
          priority: 'medium',
          category: 'Leadership'
        },
        {
          id: '3',
          employeeId: '3',
          title: 'Performance Review',
          description: 'Conduct Q3 performance reviews',
          targetDate: '2026-06-30',
          progress: 100,
          status: 'completed',
          priority: 'high',
          category: 'Management'
        }
      ];
      setGoals(mockGoals);
      if (onGoalsUpdate) onGoalsUpdate(mockGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'completed': return 'text-green-700 bg-green-50 border-green-200';
      case 'in-progress': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'not-started': return 'text-gray-700 bg-gray-50 border-gray-200';
      case 'overdue': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch(priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const updateGoalProgress = (id: string, progress: number) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, progress: Math.min(progress, 100) } : goal
    );
    setGoals(updatedGoals);
    if (onGoalsUpdate) onGoalsUpdate(updatedGoals);
  };

  const updateGoalStatus = (id: string, status: Goal['status']) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, status } : goal
    );
    setGoals(updatedGoals);
    if (onGoalsUpdate) onGoalsUpdate(updatedGoals);
  };

  const deleteGoal = async (id: string) => {
    try {
      const updatedGoals = goals.filter(goal => goal.id !== id);
      setGoals(updatedGoals);
      if (onGoalsUpdate) onGoalsUpdate(updatedGoals);
      setSelectedGoal(null);
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  // FIXED: Handle string to array conversion properly
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    const strengthsArray = typeof formData.strengths === 'string' 
      ? formData.strengths.split(',').map((s: string) => s.trim()).filter(Boolean)
      : formData.strengths || [];
    
    const improvementsArray = typeof formData.improvements === 'string'
      ? formData.improvements.split(',').map((s: string) => s.trim()).filter(Boolean)
      : formData.improvements || [];
    
    const goalsArray = typeof formData.goals === 'string'
      ? formData.goals.split(',').map((s: string) => s.trim()).filter(Boolean)
      : formData.goals || [];

    const review: PerformanceReview = {
      id: Date.now().toString(),
      employeeId: formData.employeeId || '',
      employeeName: formData.employeeName || '',
      reviewer: 'System Admin',
      date: new Date().toISOString().split('T')[0],
      rating: formData.rating || 0,
      comments: formData.comments || '',
      strengths: strengthsArray,
      improvements: improvementsArray,
      goals: goalsArray,
    };
    
    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    if (onPerformanceUpdate) onPerformanceUpdate(updatedReviews);
    setShowReviewModal(false);
    
    setFormData({
      employeeId: '',
      employeeName: '',
      rating: 0,
      comments: '',
      strengths: '',
      improvements: '',
      goals: ''
    });
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedEmployee = employees.find(emp => emp.id === goalFormData.employeeId);
    if (!selectedEmployee) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      employeeId: goalFormData.employeeId || '',
      title: goalFormData.title || '',
      description: goalFormData.description || '',
      targetDate: goalFormData.targetDate || new Date().toISOString().split('T')[0],
      progress: goalFormData.progress || 0,
      status: goalFormData.status as Goal['status'] || 'not-started',
      priority: goalFormData.priority as Goal['priority'] || 'medium',
      category: goalFormData.category || ''
    };
    
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    if (onGoalsUpdate) onGoalsUpdate(updatedGoals);
    setShowGoalModal(false);
    setGoalFormData({
      employeeId: '',
      title: '',
      description: '',
      targetDate: '',
      progress: 0,
      status: 'not-started',
      priority: 'medium',
      category: ''
    });
  };

  const getAverageRating = (): number => {
    if (reviews.length === 0) return 0;
    return Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length * 10) / 10;
  };

  const getGoalCompletionRate = (): number => {
    const completed = goals.filter(g => g.status === 'completed').length;
    return goals.length > 0 ? Math.round((completed / goals.length) * 100) : 0;
  };

  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || goal.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center py-12">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Performance & Goals</h3>
          <p className="text-sm text-gray-500 mt-1">
            Track employee performance and goal progress
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGoalModal(true)}
            className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Goal
          </button>
          <button
            onClick={() => setShowReviewModal(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Review
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Average Rating</p>
          <p className="text-2xl font-bold text-blue-600">{getAverageRating()}</p>
          <div className="flex items-center gap-1 mt-1">
            {[1,2,3,4,5].map(star => (
              <svg key={star} className={`w-4 h-4 ${star <= Math.round(getAverageRating()) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Goal Completion</p>
          <p className="text-2xl font-bold text-green-600">{getGoalCompletionRate()}%</p>
          <p className="text-xs text-gray-500">{goals.filter(g => g.status === 'completed').length} of {goals.length} completed</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Active Goals</p>
          <p className="text-2xl font-bold text-blue-600">{goals.filter(g => g.status === 'in-progress').length}</p>
          <p className="text-xs text-gray-500">{goals.filter(g => g.status === 'not-started').length} not started</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Total Reviews</p>
          <p className="text-2xl font-bold text-purple-600">{reviews.length}</p>
          <p className="text-xs text-green-600">↑ 25% from last year</p>
        </div>
      </div>

      {/* Goals Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">Goals & Objectives</h4>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search goals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm w-48"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredGoals.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No goals found</div>
          ) : (
            filteredGoals.map(goal => {
              const employee = employees.find(emp => emp.id === goal.employeeId);
              return (
                <div key={goal.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h5 className="font-medium text-gray-800">{goal.title}</h5>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(goal.status)}`}>
                          {goal.status.replace('-', ' ').toUpperCase()}
                        </span>
                        <span className={`text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                          {goal.priority.toUpperCase()}
                        </span>
                        {employee && (
                          <span className="text-xs text-gray-500">
                            👤 {employee.name}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 flex-wrap">
                        <span>Category: {goal.category}</span>
                        <span>Target: {new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${goal.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedGoal(goal)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="font-semibold text-gray-800">Recent Performance Reviews</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {reviews.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No reviews found</div>
          ) : (
            reviews.slice(0, 3).map(review => (
              <div key={review.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {review.employeeName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{review.employeeName}</p>
                      <p className="text-sm text-gray-500">Reviewed by {review.reviewer}</p>
                      <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{review.rating}</p>
                      <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map(star => (
                          <svg key={star} className={`w-3 h-3 ${star <= Math.round(review.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Goal Detail Modal */}
      {selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Goal Details</h3>
              <button
                onClick={() => setSelectedGoal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="font-medium">{selectedGoal.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p>{selectedGoal.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Progress</p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={selectedGoal.progress}
                    onChange={(e) => updateGoalProgress(selectedGoal.id, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="font-medium">{selectedGoal.progress}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <select
                    value={selectedGoal.status}
                    onChange={(e) => updateGoalStatus(selectedGoal.id, e.target.value as Goal['status'])}
                    className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedGoal.status)}`}
                  >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <span className={`text-sm font-medium ${getPriorityColor(selectedGoal.priority)}`}>
                    {selectedGoal.priority.toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Target Date</p>
                <p>{new Date(selectedGoal.targetDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => deleteGoal(selectedGoal.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                >
                  Delete Goal
                </button>
                <button
                  onClick={() => setSelectedGoal(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Performance Review</h3>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee *
                  </label>
                  <select
                    required
                    value={formData.employeeId || ''}
                    onChange={(e) => {
                      const employee = employees.find(emp => emp.id === e.target.value);
                      setFormData({
                        ...formData,
                        employeeId: e.target.value,
                        employeeName: employee?.name || ''
                      });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select employee</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating (1-5) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating || ''}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comments *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.comments || ''}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter review comments..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Strengths (comma separated)
                  </label>
                  {/* FIXED: Handle string/array properly */}
                  <input
                    type="text"
                    value={typeof formData.strengths === 'string' ? formData.strengths : (formData.strengths || []).join(', ')}
                    onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Team player, Communication"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Areas for Improvement
                  </label>
                  {/* FIXED: Handle string/array properly */}
                  <input
                    type="text"
                    value={typeof formData.improvements === 'string' ? formData.improvements : (formData.improvements || []).join(', ')}
                    onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Time management, Documentation"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goals (comma separated)
                  </label>
                  {/* FIXED: Handle string/array properly */}
                  <input
                    type="text"
                    value={typeof formData.goals === 'string' ? formData.goals : (formData.goals || []).join(', ')}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Lead project, Mentorship"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewModal(false);
                    setFormData({
                      employeeId: '',
                      employeeName: '',
                      rating: 0,
                      comments: '',
                      strengths: '',
                      improvements: '',
                      goals: ''
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Goal</h3>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee *
                </label>
                <select
                  required
                  value={goalFormData.employeeId || ''}
                  onChange={(e) => setGoalFormData({ ...goalFormData, employeeId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={goalFormData.title || ''}
                  onChange={(e) => setGoalFormData({ ...goalFormData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={goalFormData.description || ''}
                  onChange={(e) => setGoalFormData({ ...goalFormData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={goalFormData.category || ''}
                  onChange={(e) => setGoalFormData({ ...goalFormData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select category</option>
                  <option value="Technical">Technical</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Management">Management</option>
                  <option value="Professional Development">Professional Development</option>
                  <option value="Team Building">Team Building</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Date *
                </label>
                <input
                  type="date"
                  required
                  value={goalFormData.targetDate || ''}
                  onChange={(e) => setGoalFormData({ ...goalFormData, targetDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={goalFormData.priority || 'medium'}
                    onChange={(e) => setGoalFormData({ ...goalFormData, priority: e.target.value as Goal['priority'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={goalFormData.status || 'not-started'}
                    onChange={(e) => setGoalFormData({ ...goalFormData, status: e.target.value as Goal['status'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Progress (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={goalFormData.progress || 0}
                  onChange={(e) => setGoalFormData({ ...goalFormData, progress: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowGoalModal(false);
                    setGoalFormData({
                      employeeId: '',
                      title: '',
                      description: '',
                      targetDate: '',
                      progress: 0,
                      status: 'not-started',
                      priority: 'medium',
                      category: ''
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTracker;