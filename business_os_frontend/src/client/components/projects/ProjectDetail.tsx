// // // // // // // src/client/components/projects/ProjectDetail.tsx
// // // // // // import React, { useState } from 'react';
// // // // // // import { 
// // // // // //   ArrowLeft, 
// // // // // //   Edit,
// // // // // //   Clock, 
// // // // // //   DollarSign, 
// // // // // //   Users, 
// // // // // //   CheckCircle,
// // // // // //   AlertCircle,
// // // // // //   FileText,
// // // // // //   Plus,
// // // // // //   MoreVertical,
// // // // // //   Calendar,
// // // // // //   Tag,
// // // // // //   X,
// // // // // //   Save,
// // // // // //   Mail,
// // // // // //   Phone,
// // // // // //   MapPin,
// // // // // //   Briefcase,
// // // // // //   Activity,
// // // // // //   ClipboardList,
// // // // // //   User,
// // // // // //   Building,
// // // // // //   Trash2,
// // // // // //   ChevronDown
// // // // // // } from 'lucide-react';
// // // // // // import ProjectEdit from './ProjectEdit';

// // // // // // // ==================== TYPES ====================
// // // // // // interface ProjectDetailProps {
// // // // // //   projectId: string;
// // // // // //   onBack: () => void;
// // // // // // }

// // // // // // interface TeamMember {
// // // // // //   name: string;
// // // // // //   role: string;
// // // // // //   email?: string;
// // // // // //   phone?: string;
// // // // // // }

// // // // // // interface Task {
// // // // // //   id: string;
// // // // // //   title: string;
// // // // // //   description: string;
// // // // // //   status: 'todo' | 'in-progress' | 'review' | 'done';
// // // // // //   priority: 'low' | 'medium' | 'high' | 'urgent';
// // // // // //   assignee: string;
// // // // // //   dueDate: string;
// // // // // //   estimatedHours: number;
// // // // // //   loggedHours: number;
// // // // // //   tags: string[];
// // // // // // }

// // // // // // interface ProjectDetailData {
// // // // // //   id: string;
// // // // // //   customerName: string;
// // // // // //   projectName: string;
// // // // // //   description: string;
// // // // // //   billingMethod: string;
// // // // // //   rate: number;
// // // // // //   status: 'active' | 'inactive' | 'completed';
// // // // // //   loggedHours: string;
// // // // // //   budget: number;
// // // // // //   revenue: number;
// // // // // //   startDate: string;
// // // // // //   endDate: string;
// // // // // //   teamMembers: TeamMember[];
// // // // // //   tasks: Task[];
// // // // // //   recentActivity: { type: string; description: string; time: string; user: string }[];
// // // // // // }

// // // // // // // ==================== ADD TASK PAGE (Separate Page) ====================
// // // // // // interface AddTaskPageProps {
// // // // // //   projectId: string;
// // // // // //   projectName: string;
// // // // // //   teamMembers: TeamMember[];
// // // // // //   onBack: () => void;
// // // // // //   onSave: (taskData: any) => void;
// // // // // // }

// // // // // // const AddTaskPage: React.FC<AddTaskPageProps> = ({ 
// // // // // //   projectId, 
// // // // // //   projectName, 
// // // // // //   teamMembers, 
// // // // // //   onBack, 
// // // // // //   onSave 
// // // // // // }) => {
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     title: '',
// // // // // //     description: '',
// // // // // //     status: 'todo' as 'todo' | 'in-progress' | 'review' | 'done',
// // // // // //     priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
// // // // // //     assignee: '',
// // // // // //     dueDate: '',
// // // // // //     estimatedHours: 0,
// // // // // //     tags: '',
// // // // // //   });

// // // // // //   const [errors, setErrors] = useState<Record<string, string>>({});
// // // // // //   const [isSaving, setIsSaving] = useState(false);

// // // // // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
// // // // // //     const { name, value } = e.target;
// // // // // //     setFormData(prev => ({ ...prev, [name]: value }));
// // // // // //     if (errors[name]) {
// // // // // //       setErrors(prev => ({ ...prev, [name]: '' }));
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSubmit = () => {
// // // // // //     // Validate
// // // // // //     const newErrors: Record<string, string> = {};
// // // // // //     if (!formData.title.trim()) newErrors.title = 'Task title is required';
// // // // // //     if (!formData.assignee) newErrors.assignee = 'Please select an assignee';
// // // // // //     if (!formData.dueDate) newErrors.dueDate = 'Please select a due date';
// // // // // //     if (formData.estimatedHours <= 0) newErrors.estimatedHours = 'Estimated hours must be greater than 0';

// // // // // //     if (Object.keys(newErrors).length > 0) {
// // // // // //       setErrors(newErrors);
// // // // // //       return;
// // // // // //     }

// // // // // //     setIsSaving(true);

// // // // // //     // Convert tags string to array
// // // // // //     const tagsArray = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

// // // // // //     // Simulate API call
// // // // // //     setTimeout(() => {
// // // // // //       onSave({
// // // // // //         ...formData,
// // // // // //         tags: tagsArray,
// // // // // //         loggedHours: 0,
// // // // // //       });
// // // // // //       setIsSaving(false);
// // // // // //     }, 500);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="p-6 bg-gray-50 min-h-screen">
// // // // // //       {/* Header */}
// // // // // //       <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
// // // // // //         <div className="flex items-center gap-3">
// // // // // //           <button
// // // // // //             onClick={onBack}
// // // // // //             className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition"
// // // // // //           >
// // // // // //             <ArrowLeft className="w-5 h-5" />
// // // // // //           </button>
// // // // // //           <div>
// // // // // //             <h1 className="text-2xl font-bold text-gray-900">Add New Task</h1>
// // // // // //             <p className="text-sm text-gray-500">Create a new task for {projectName}</p>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="flex items-center gap-2">
// // // // // //           <button
// // // // // //             onClick={onBack}
// // // // // //             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm flex items-center"
// // // // // //           >
// // // // // //             <X className="w-4 h-4 mr-1.5" />
// // // // // //             Cancel
// // // // // //           </button>
// // // // // //           <button
// // // // // //             onClick={handleSubmit}
// // // // // //             disabled={isSaving}
// // // // // //             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
// // // // // //           >
// // // // // //             <Save className="w-4 h-4 mr-1.5" />
// // // // // //             {isSaving ? 'Saving...' : 'Add Task'}
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Form */}
// // // // // //       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl">
// // // // // //         <div className="space-y-5">
// // // // // //           {/* Task Title */}
// // // // // //           <div>
// // // // // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //               Task Title <span className="text-red-500">*</span>
// // // // // //             </label>
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               name="title"
// // // // // //               value={formData.title}
// // // // // //               onChange={handleChange}
// // // // // //               className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
// // // // // //                 errors.title ? 'border-red-300' : 'border-gray-300'
// // // // // //               }`}
// // // // // //               placeholder="Enter task title"
// // // // // //             />
// // // // // //             {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
// // // // // //           </div>

// // // // // //           {/* Description */}
// // // // // //           <div>
// // // // // //             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
// // // // // //             <textarea
// // // // // //               name="description"
// // // // // //               value={formData.description}
// // // // // //               onChange={handleChange}
// // // // // //               rows={4}
// // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// // // // // //               placeholder="Enter task description"
// // // // // //             />
// // // // // //           </div>

// // // // // //           {/* Status & Priority */}
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // //             <div>
// // // // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                 Status <span className="text-red-500">*</span>
// // // // // //               </label>
// // // // // //               <select
// // // // // //                 name="status"
// // // // // //                 value={formData.status}
// // // // // //                 onChange={handleChange}
// // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// // // // // //               >
// // // // // //                 <option value="todo">To Do</option>
// // // // // //                 <option value="in-progress">In Progress</option>
// // // // // //                 <option value="review">Review</option>
// // // // // //                 <option value="done">Done</option>
// // // // // //               </select>
// // // // // //             </div>
// // // // // //             <div>
// // // // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                 Priority <span className="text-red-500">*</span>
// // // // // //               </label>
// // // // // //               <select
// // // // // //                 name="priority"
// // // // // //                 value={formData.priority}
// // // // // //                 onChange={handleChange}
// // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// // // // // //               >
// // // // // //                 <option value="low">Low</option>
// // // // // //                 <option value="medium">Medium</option>
// // // // // //                 <option value="high">High</option>
// // // // // //                 <option value="urgent">Urgent</option>
// // // // // //               </select>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Assignee & Due Date */}
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // //             <div>
// // // // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                 Assignee <span className="text-red-500">*</span>
// // // // // //               </label>
// // // // // //               <select
// // // // // //                 name="assignee"
// // // // // //                 value={formData.assignee}
// // // // // //                 onChange={handleChange}
// // // // // //                 className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
// // // // // //                   errors.assignee ? 'border-red-300' : 'border-gray-300'
// // // // // //                 }`}
// // // // // //               >
// // // // // //                 <option value="">Select Assignee</option>
// // // // // //                 {teamMembers.map((member, index) => (
// // // // // //                   <option key={index} value={member.name}>{member.name}</option>
// // // // // //                 ))}
// // // // // //               </select>
// // // // // //               {errors.assignee && <p className="text-xs text-red-500 mt-1">{errors.assignee}</p>}
// // // // // //             </div>
// // // // // //             <div>
// // // // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                 Due Date <span className="text-red-500">*</span>
// // // // // //               </label>
// // // // // //               <input
// // // // // //                 type="date"
// // // // // //                 name="dueDate"
// // // // // //                 value={formData.dueDate}
// // // // // //                 onChange={handleChange}
// // // // // //                 className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
// // // // // //                   errors.dueDate ? 'border-red-300' : 'border-gray-300'
// // // // // //                 }`}
// // // // // //               />
// // // // // //               {errors.dueDate && <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Estimated Hours & Tags */}
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // //             <div>
// // // // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                 Estimated Hours <span className="text-red-500">*</span>
// // // // // //               </label>
// // // // // //               <input
// // // // // //                 type="number"
// // // // // //                 name="estimatedHours"
// // // // // //                 value={formData.estimatedHours}
// // // // // //                 onChange={handleChange}
// // // // // //                 className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
// // // // // //                   errors.estimatedHours ? 'border-red-300' : 'border-gray-300'
// // // // // //                 }`}
// // // // // //                 placeholder="0"
// // // // // //                 min="0"
// // // // // //                 step="0.5"
// // // // // //               />
// // // // // //               {errors.estimatedHours && <p className="text-xs text-red-500 mt-1">{errors.estimatedHours}</p>}
// // // // // //             </div>
// // // // // //             <div>
// // // // // //               <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 name="tags"
// // // // // //                 value={formData.tags}
// // // // // //                 onChange={handleChange}
// // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// // // // // //                 placeholder="Design, Backend, Testing (comma separated)"
// // // // // //               />
// // // // // //               <p className="text-xs text-gray-400 mt-0.5">Separate tags with commas</p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // // ==================== MAIN PROJECT DETAIL COMPONENT ====================
// // // // // // const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
// // // // // //   const [showEditPage, setShowEditPage] = useState(false);
// // // // // //   const [showAddTaskPage, setShowAddTaskPage] = useState(false);

// // // // // //   // Sample project data based on projectId
// // // // // //   const getProjectData = (id: string): ProjectDetailData => {
// // // // // //     const projects: { [key: string]: ProjectDetailData } = {
// // // // // //       '1': {
// // // // // //         id: '1',
// // // // // //         customerName: 'Bruce Wayne',
// // // // // //         projectName: 'Design contract for Mr. Bruce',
// // // // // //         description: 'Complete UI/UX design for Wayne Enterprises',
// // // // // //         billingMethod: 'Based on Task Hours',
// // // // // //         rate: 45.00,
// // // // // //         status: 'active',
// // // // // //         loggedHours: '106:41',
// // // // // //         budget: 5000,
// // // // // //         revenue: 4500,
// // // // // //         startDate: '2024-01-15',
// // // // // //         endDate: '2024-06-30',
// // // // // //         teamMembers: [
// // // // // //           { name: 'Patricia Boyle', role: 'Lead Designer', email: 'patricia@example.com', phone: '+1 555-1111' },
// // // // // //           { name: 'John Doe', role: 'Developer', email: 'john@example.com', phone: '+1 555-2222' },
// // // // // //           { name: 'Jane Smith', role: 'Tester', email: 'jane@example.com', phone: '+1 555-3333' }
// // // // // //         ],
// // // // // //         tasks: [
// // // // // //           { id: '1', title: 'Design Homepage', description: 'Create homepage design', status: 'done', priority: 'high', assignee: 'Patricia Boyle', dueDate: '2024-06-15', estimatedHours: 8, loggedHours: 8, tags: ['Design', 'UI/UX'] },
// // // // // //           { id: '2', title: 'Develop API Integration', description: 'Integrate REST API', status: 'in-progress', priority: 'urgent', assignee: 'John Doe', dueDate: '2024-06-10', estimatedHours: 12, loggedHours: 5, tags: ['Backend', 'API'] },
// // // // // //           { id: '3', title: 'User Testing', description: 'Conduct user testing', status: 'review', priority: 'medium', assignee: 'Jane Smith', dueDate: '2024-06-20', estimatedHours: 6, loggedHours: 3, tags: ['Testing', 'QA'] },
// // // // // //           { id: '4', title: 'Database Optimization', description: 'Optimize queries', status: 'todo', priority: 'medium', assignee: 'John Doe', dueDate: '2024-06-25', estimatedHours: 10, loggedHours: 0, tags: ['Backend', 'Database'] }
// // // // // //         ],
// // // // // //         recentActivity: [
// // // // // //           { type: 'task', description: 'Task completed: Design Homepage', time: '2 hours ago', user: 'Patricia Boyle' },
// // // // // //           { type: 'time', description: 'Logged 4 hours on Development', time: '4 hours ago', user: 'John Doe' },
// // // // // //           { type: 'comment', description: 'Commented on: User Testing', time: '1 day ago', user: 'Jane Smith' }
// // // // // //         ]
// // // // // //       },
// // // // // //       '2': {
// // // // // //         id: '2',
// // // // // //         customerName: 'Bruce Wayne',
// // // // // //         projectName: 'Design project for Bruce',
// // // // // //         description: 'Redesign of corporate website',
// // // // // //         billingMethod: 'Based on Task Hours',
// // // // // //         rate: 45.00,
// // // // // //         status: 'active',
// // // // // //         loggedHours: '35:28',
// // // // // //         budget: 3000,
// // // // // //         revenue: 2500,
// // // // // //         startDate: '2024-02-01',
// // // // // //         endDate: '2024-07-15',
// // // // // //         teamMembers: [
// // // // // //           { name: 'Patricia Boyle', role: 'Designer', email: 'patricia@example.com', phone: '+1 555-1111' },
// // // // // //           { name: 'John Doe', role: 'Developer', email: 'john@example.com', phone: '+1 555-2222' }
// // // // // //         ],
// // // // // //         tasks: [
// // // // // //           { id: '5', title: 'Homepage Redesign', description: 'Redesign homepage', status: 'in-progress', priority: 'high', assignee: 'Patricia Boyle', dueDate: '2024-07-01', estimatedHours: 6, loggedHours: 2, tags: ['Design'] },
// // // // // //           { id: '6', title: 'Content Migration', description: 'Migrate content', status: 'todo', priority: 'medium', assignee: 'John Doe', dueDate: '2024-07-10', estimatedHours: 4, loggedHours: 0, tags: ['Content'] }
// // // // // //         ],
// // // // // //         recentActivity: [
// // // // // //           { type: 'task', description: 'Task started: Homepage Redesign', time: '1 day ago', user: 'Patricia Boyle' }
// // // // // //         ]
// // // // // //       }
// // // // // //     };
// // // // // //     return projects[id] || projects['1'];
// // // // // //   };

// // // // // //   const [project, setProject] = useState<ProjectDetailData>(getProjectData(projectId));

// // // // // //   // Handle Add Task
// // // // // //   const handleAddTask = (taskData: any) => {
// // // // // //     const validStatuses = ['todo', 'in-progress', 'review', 'done'] as const;
// // // // // //     const status = validStatuses.includes(taskData.status) ? taskData.status : 'todo';
    
// // // // // //     const newTask: Task = {
// // // // // //       id: String(Date.now()),
// // // // // //       title: taskData.title,
// // // // // //       description: taskData.description,
// // // // // //       status: status,
// // // // // //       priority: taskData.priority,
// // // // // //       assignee: taskData.assignee,
// // // // // //       dueDate: taskData.dueDate,
// // // // // //       estimatedHours: taskData.estimatedHours,
// // // // // //       loggedHours: 0,
// // // // // //       tags: taskData.tags,
// // // // // //     };
    
// // // // // //     setProject({
// // // // // //       ...project,
// // // // // //       tasks: [...project.tasks, newTask],
// // // // // //       recentActivity: [
// // // // // //         { type: 'task', description: `New task added: ${taskData.title}`, time: 'Just now', user: 'System' },
// // // // // //         ...project.recentActivity
// // // // // //       ]
// // // // // //     });
// // // // // //     setShowAddTaskPage(false);
// // // // // //   };

// // // // // //   // If Add Task page is shown
// // // // // //   if (showAddTaskPage) {
// // // // // //     return (
// // // // // //       <AddTaskPage
// // // // // //         projectId={projectId}
// // // // // //         projectName={project.projectName}
// // // // // //         teamMembers={project.teamMembers}
// // // // // //         onBack={() => setShowAddTaskPage(false)}
// // // // // //         onSave={handleAddTask}
// // // // // //       />
// // // // // //     );
// // // // // //   }

// // // // // //   // If Edit page is shown
// // // // // //   if (showEditPage) {
// // // // // //     return (
// // // // // //       <ProjectEdit 
// // // // // //         projectId={projectId}
// // // // // //         projectName={project.projectName}
// // // // // //         onBack={() => setShowEditPage(false)}
// // // // // //         onSave={() => {
// // // // // //           setShowEditPage(false);
// // // // // //         }}
// // // // // //       />
// // // // // //     );
// // // // // //   }

// // // // // //   const getStatusColor = (status: string) => {
// // // // // //     switch(status) {
// // // // // //       case 'active': return 'bg-green-100 text-green-700 border-green-200';
// // // // // //       case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
// // // // // //       case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
// // // // // //       default: return 'bg-gray-100 text-gray-700 border-gray-200';
// // // // // //     }
// // // // // //   };

// // // // // //   const getStatusIcon = (status: string) => {
// // // // // //     switch(status) {
// // // // // //       case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
// // // // // //       case 'inactive': return <AlertCircle className="w-4 h-4 text-gray-500" />;
// // // // // //       case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
// // // // // //       default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
// // // // // //     }
// // // // // //   };

// // // // // //   const getTaskStatusColor = (status: string) => {
// // // // // //     switch(status) {
// // // // // //       case 'done': return 'bg-green-100 text-green-700';
// // // // // //       case 'in-progress': return 'bg-blue-100 text-blue-700';
// // // // // //       case 'review': return 'bg-yellow-100 text-yellow-700';
// // // // // //       case 'todo': return 'bg-gray-100 text-gray-700';
// // // // // //       default: return 'bg-gray-100 text-gray-700';
// // // // // //     }
// // // // // //   };

// // // // // //   const getInitials = (name: string) => {
// // // // // //     return name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
// // // // // //   };

// // // // // //   const getRandomColor = (name: string) => {
// // // // // //     const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
// // // // // //     return colors[name.length % colors.length];
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="p-6 bg-gray-50 min-h-screen">
// // // // // //       {/* Header Section */}
// // // // // //       <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
// // // // // //         <div className="flex items-center gap-3">
// // // // // //           <button
// // // // // //             onClick={onBack}
// // // // // //             className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition"
// // // // // //           >
// // // // // //             <ArrowLeft className="w-5 h-5" />
// // // // // //           </button>
// // // // // //           <div>
// // // // // //             <h1 className="text-2xl font-bold text-gray-900">{project.projectName}</h1>
// // // // // //             <div className="flex items-center gap-3 mt-0.5">
// // // // // //               <span className="text-sm text-gray-500">Customer: {project.customerName}</span>
// // // // // //               <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(project.status)} flex items-center gap-1`}>
// // // // // //                 {getStatusIcon(project.status)}
// // // // // //                 {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
// // // // // //               </span>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="flex items-center gap-2 flex-wrap">
// // // // // //           {/* Edit button */}
// // // // // //           <button 
// // // // // //             onClick={() => setShowEditPage(true)}
// // // // // //             className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-xs transition"
// // // // // //           >
// // // // // //             <Edit className="w-3.5 h-3.5 mr-1.5" />
// // // // // //             Edit
// // // // // //           </button>
// // // // // //           {/* Add Task button - Opens separate page */}
// // // // // //           <button 
// // // // // //             onClick={() => setShowAddTaskPage(true)}
// // // // // //             className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center text-xs transition"
// // // // // //           >
// // // // // //             <Plus className="w-3.5 h-3.5 mr-1.5" />
// // // // // //             Add Task
// // // // // //           </button>
// // // // // //           <button className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center text-xs transition">
// // // // // //             <MoreVertical className="w-3.5 h-3.5" />
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Stats Cards */}
// // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// // // // // //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
// // // // // //           <div className="flex items-center justify-between">
// // // // // //             <div>
// // // // // //               <div className="text-xs text-gray-500 font-medium">Total Hours</div>
// // // // // //               <div className="text-2xl font-bold text-blue-600">{project.loggedHours}</div>
// // // // // //             </div>
// // // // // //             <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
// // // // // //               <Clock className="w-5 h-5 text-blue-500" />
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
// // // // // //           <div className="flex items-center justify-between">
// // // // // //             <div>
// // // // // //               <div className="text-xs text-gray-500 font-medium">Budget</div>
// // // // // //               <div className="text-2xl font-bold text-green-600">${project.budget.toFixed(2)}</div>
// // // // // //             </div>
// // // // // //             <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
// // // // // //               <DollarSign className="w-5 h-5 text-green-500" />
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
// // // // // //           <div className="flex items-center justify-between">
// // // // // //             <div>
// // // // // //               <div className="text-xs text-gray-500 font-medium">Revenue</div>
// // // // // //               <div className="text-2xl font-bold text-purple-600">${project.revenue.toFixed(2)}</div>
// // // // // //             </div>
// // // // // //             <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
// // // // // //               <DollarSign className="w-5 h-5 text-purple-500" />
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
// // // // // //           <div className="flex items-center justify-between">
// // // // // //             <div>
// // // // // //               <div className="text-xs text-gray-500 font-medium">Team Members</div>
// // // // // //               <div className="text-2xl font-bold text-indigo-600">{project.teamMembers.length}</div>
// // // // // //             </div>
// // // // // //             <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
// // // // // //               <Users className="w-5 h-5 text-indigo-500" />
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // // // // //         {/* Left Column */}
// // // // // //         <div className="lg:col-span-2 space-y-6">
// // // // // //           {/* Project Description */}
// // // // // //           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
// // // // // //             <h3 className="text-sm font-semibold text-gray-700 mb-3">Project Description</h3>
// // // // // //             <p className="text-sm text-gray-600">{project.description}</p>
// // // // // //             <div className="grid grid-cols-2 gap-4 mt-4">
// // // // // //               <div>
// // // // // //                 <div className="text-xs text-gray-500">Billing Method</div>
// // // // // //                 <div className="text-sm font-medium text-gray-800">{project.billingMethod}</div>
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <div className="text-xs text-gray-500">Rate Per Hour</div>
// // // // // //                 <div className="text-sm font-medium text-gray-800">${project.rate.toFixed(2)}/hr</div>
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <div className="text-xs text-gray-500">Start Date</div>
// // // // // //                 <div className="text-sm font-medium text-gray-800">{project.startDate}</div>
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <div className="text-xs text-gray-500">End Date</div>
// // // // // //                 <div className="text-sm font-medium text-gray-800">{project.endDate}</div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Tasks */}
// // // // // //           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
// // // // // //             <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
// // // // // //               <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
// // // // // //                 <ClipboardList className="w-4 h-4 text-gray-400" />
// // // // // //                 Tasks ({project.tasks.length})
// // // // // //               </h3>
// // // // // //               <button 
// // // // // //                 onClick={() => setShowAddTaskPage(true)}
// // // // // //                 className="text-xs text-purple-600 hover:text-purple-700 flex items-center"
// // // // // //               >
// // // // // //                 <Plus className="w-3.5 h-3.5 mr-1" />
// // // // // //                 Add Task
// // // // // //               </button>
// // // // // //             </div>
// // // // // //             <div className="divide-y divide-gray-100">
// // // // // //               {project.tasks.map((task) => (
// // // // // //                 <div key={task.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition">
// // // // // //                   <div className="flex items-center gap-3 flex-1 min-w-0">
// // // // // //                     <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
// // // // // //                       task.status === 'done' ? 'bg-green-500' : 
// // // // // //                       task.status === 'in-progress' ? 'bg-blue-500' : 
// // // // // //                       task.status === 'review' ? 'bg-yellow-500' : 'bg-gray-400'
// // // // // //                     }`} />
// // // // // //                     <div className="flex-1 min-w-0">
// // // // // //                       <div className="text-sm font-medium text-gray-800">{task.title}</div>
// // // // // //                       <div className="text-xs text-gray-500">Assignee: {task.assignee}</div>
// // // // // //                       {task.tags.length > 0 && (
// // // // // //                         <div className="flex gap-1 mt-0.5">
// // // // // //                           {task.tags.map((tag, i) => (
// // // // // //                             <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[9px] rounded">
// // // // // //                               {tag}
// // // // // //                             </span>
// // // // // //                           ))}
// // // // // //                         </div>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                   <div className="flex items-center gap-3 flex-shrink-0 ml-4">
// // // // // //                     <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${getTaskStatusColor(task.status)}`}>
// // // // // //                       {task.status}
// // // // // //                     </span>
// // // // // //                     <span className="text-xs text-gray-400">{task.dueDate}</span>
// // // // // //                     <div className="flex items-center gap-1 text-xs text-gray-500">
// // // // // //                       <Clock className="w-3 h-3" />
// // // // // //                       <span>{task.loggedHours}h / {task.estimatedHours}h</span>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Right Column */}
// // // // // //         <div className="space-y-6">
// // // // // //           {/* Customer Info */}
// // // // // //           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
// // // // // //             <h3 className="text-sm font-semibold text-gray-700 mb-3">Customer Information</h3>
// // // // // //             <div className="flex items-center gap-3">
// // // // // //               <div className={`w-12 h-12 rounded-full ${getRandomColor(project.customerName)} text-white flex items-center justify-center text-lg font-bold`}>
// // // // // //                 {getInitials(project.customerName)}
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <div className="font-medium text-gray-900">{project.customerName}</div>
// // // // // //                 <div className="text-xs text-gray-500">Customer</div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //             <button className="mt-3 w-full py-1.5 text-xs text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition">
// // // // // //               View Customer Details
// // // // // //             </button>
// // // // // //           </div>

// // // // // //           {/* Team Members */}
// // // // // //           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
// // // // // //             <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
// // // // // //               <Users className="w-4 h-4 text-gray-400" />
// // // // // //               Team Members ({project.teamMembers.length})
// // // // // //             </h3>
// // // // // //             <div className="space-y-3">
// // // // // //               {project.teamMembers.map((member, index) => (
// // // // // //                 <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition">
// // // // // //                   <div className="flex items-center gap-3">
// // // // // //                     <div className={`w-8 h-8 rounded-full ${getRandomColor(member.name)} text-white flex items-center justify-center text-xs font-medium flex-shrink-0`}>
// // // // // //                       {getInitials(member.name)}
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <div className="text-sm font-medium text-gray-800">{member.name}</div>
// // // // // //                       <div className="text-xs text-gray-500">{member.role}</div>
// // // // // //                       {member.email && <div className="text-[10px] text-gray-400">{member.email}</div>}
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Recent Activity */}
// // // // // //           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
// // // // // //             <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h3>
// // // // // //             <div className="space-y-3">
// // // // // //               {project.recentActivity.map((activity, index) => (
// // // // // //                 <div key={index} className="flex items-start gap-2.5 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
// // // // // //                   <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-[10px] font-medium flex-shrink-0">
// // // // // //                     {getInitials(activity.user)}
// // // // // //                   </div>
// // // // // //                   <div className="flex-1 min-w-0">
// // // // // //                     <div className="text-xs text-gray-700">{activity.description}</div>
// // // // // //                     <div className="text-[10px] text-gray-400 mt-0.5">{activity.time} by {activity.user}</div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default ProjectDetail;
// // // // // // src/client/components/projects/ProjectDetail.tsx

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { 
// // // // //   ArrowLeft, 
// // // // //   Clock, 
// // // // //   DollarSign, 
// // // // //   Users, 
// // // // //   Calendar, 
// // // // //   Tag,
// // // // //   User,
// // // // //   Mail,
// // // // //   Briefcase,
// // // // //   Phone,
// // // // //   MapPin,
// // // // //   Award,
// // // // //   Edit,
// // // // //   MoreVertical,
// // // // //   Download,
// // // // //   Share2,
// // // // //   Bell,
// // // // //   X,
// // // // //   CheckCircle,
// // // // //   AlertCircle,
// // // // //   Building,
// // // // //   Star,
// // // // //   Activity
// // // // // } from 'lucide-react';

// // // // // interface Project {
// // // // //   id: string;
// // // // //   customerName: string;
// // // // //   projectName: string;
// // // // //   billingMethod: string;
// // // // //   rate: number | null;
// // // // //   status: 'active' | 'inactive' | 'completed';
// // // // //   loggedHours: string;
// // // // //   budget: number | null;
// // // // //   startDate: string;
// // // // //   endDate: string;
// // // // //   description: string;
// // // // //   createdAt: string;
// // // // //   updatedAt: string;
// // // // //   tasks?: string[];
// // // // //   teamMembers?: TeamMember[];
// // // // //   recentActivity?: Activity[];
// // // // // }

// // // // // interface TeamMember {
// // // // //   id: string;
// // // // //   name: string;
// // // // //   role: string;
// // // // //   email: string;
// // // // //   phone?: string;
// // // // //   avatar?: string;
// // // // //   department?: string;
// // // // //   joinDate?: string;
// // // // //   skills?: string[];
// // // // //   projects?: string[];
// // // // // }

// // // // // interface Activity {
// // // // //   id: string;
// // // // //   user: string;
// // // // //   action: string;
// // // // //   timestamp: string;
// // // // //   details?: string;
// // // // // }

// // // // // interface ProjectDetailProps {
// // // // //   projectId: string;
// // // // //   onBack: () => void;
// // // // // }

// // // // // // ✅ DYNAMIC EMPLOYEE DATA - Built from projects and tasks
// // // // // const getEmployeeData = (employeeName: string, project?: Project): TeamMember => {
// // // // //   // Base employee data with dynamic information
// // // // //   const baseData: TeamMember = {
// // // // //     id: `emp-${Date.now()}`,
// // // // //     name: employeeName,
// // // // //     role: 'Team Member',
// // // // //     email: `${employeeName.toLowerCase().replace(' ', '.')}@company.com`,
// // // // //     phone: '+1 (555) 123-4567',
// // // // //     department: 'Engineering',
// // // // //     joinDate: '2024-01-01',
// // // // //     skills: ['React', 'TypeScript', 'JavaScript', 'CSS'],
// // // // //     projects: []
// // // // //   };

// // // // //   // Get role based on tasks assigned to this employee
// // // // //   if (project?.tasks && project.tasks.length > 0) {
// // // // //     const assignedTasks = project.tasks.filter(task => 
// // // // //       task.toLowerCase().includes(employeeName.toLowerCase()) ||
// // // // //       employeeName.toLowerCase().includes(task.toLowerCase().split(' ').slice(0, 2).join(' '))
// // // // //     );
    
// // // // //     if (assignedTasks.length > 0) {
// // // // //       if (assignedTasks.some(t => t.toLowerCase().includes('design'))) {
// // // // //         baseData.role = 'UI/UX Designer';
// // // // //         baseData.department = 'Design';
// // // // //         baseData.skills = ['Figma', 'Adobe XD', 'UI/UX Design', 'Prototyping', 'Design Systems'];
// // // // //       } else if (assignedTasks.some(t => t.toLowerCase().includes('api') || t.toLowerCase().includes('backend'))) {
// // // // //         baseData.role = 'Backend Developer';
// // // // //         baseData.department = 'Engineering';
// // // // //         baseData.skills = ['Node.js', 'Python', 'API Design', 'Database', 'Microservices'];
// // // // //       } else if (assignedTasks.some(t => t.toLowerCase().includes('test') || t.toLowerCase().includes('qa'))) {
// // // // //         baseData.role = 'QA Engineer';
// // // // //         baseData.department = 'Quality Assurance';
// // // // //         baseData.skills = ['Manual Testing', 'Automation', 'Selenium', 'Test Planning', 'Cypress'];
// // // // //       } else if (assignedTasks.some(t => t.toLowerCase().includes('frontend') || t.toLowerCase().includes('ui'))) {
// // // // //         baseData.role = 'Frontend Developer';
// // // // //         baseData.department = 'Engineering';
// // // // //         baseData.skills = ['React', 'Vue.js', 'CSS', 'JavaScript', 'HTML'];
// // // // //       } else if (assignedTasks.some(t => t.toLowerCase().includes('full stack'))) {
// // // // //         baseData.role = 'Full Stack Developer';
// // // // //         baseData.department = 'Engineering';
// // // // //         baseData.skills = ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'];
// // // // //       } else if (assignedTasks.some(t => t.toLowerCase().includes('manager') || t.toLowerCase().includes('lead'))) {
// // // // //         baseData.role = 'Project Manager';
// // // // //         baseData.department = 'Management';
// // // // //         baseData.skills = ['Project Management', 'Agile', 'Scrum', 'Leadership', 'Communication'];
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   // Add projects
// // // // //   if (project) {
// // // // //     baseData.projects = [project.projectName];
// // // // //   }

// // // // //   // Customize email based on name
// // // // //   const emailName = employeeName.toLowerCase().replace(' ', '.');
// // // // //   baseData.email = `${emailName}@company.com`;

// // // // //   return baseData;
// // // // // };

// // // // // // ✅ Predefined employee details for known users (optional - can be removed if you want fully dynamic)
// // // // // const EMPLOYEE_FALLBACK: Record<string, Partial<TeamMember>> = {
// // // // //   'Patricia Boyle': {
// // // // //     role: 'Lead Designer',
// // // // //     email: 'patricia.boyle@company.com',
// // // // //     phone: '+1 (555) 123-4567',
// // // // //     department: 'Design',
// // // // //     skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Design Systems', 'Prototyping']
// // // // //   },
// // // // //   'John Doe': {
// // // // //     role: 'Senior Developer',
// // // // //     email: 'john.doe@company.com',
// // // // //     phone: '+1 (555) 234-5678',
// // // // //     department: 'Engineering',
// // // // //     skills: ['React', 'TypeScript', 'Node.js', 'API Design', 'Database']
// // // // //   },
// // // // //   'Jane Smith': {
// // // // //     role: 'QA Tester',
// // // // //     email: 'jane.smith@company.com',
// // // // //     phone: '+1 (555) 345-6789',
// // // // //     department: 'Quality Assurance',
// // // // //     skills: ['Manual Testing', 'Automation', 'Selenium', 'Test Planning']
// // // // //   },
// // // // //   'Aaron Brown': {
// // // // //     role: 'Full Stack Developer',
// // // // //     email: 'aaron.brown@company.com',
// // // // //     phone: '+1 (555) 567-8901',
// // // // //     department: 'Engineering',
// // // // //     skills: ['React', 'Angular', 'Python', 'Django', 'AWS']
// // // // //   },
// // // // //   'Dinesh Ramamurthy': {
// // // // //     role: 'UI/UX Designer',
// // // // //     email: 'dinesh.r@company.com',
// // // // //     phone: '+1 (555) 678-9012',
// // // // //     department: 'Design',
// // // // //     skills: ['UI Design', 'UX Research', 'Figma', 'Sketch']
// // // // //   },
// // // // //   'Arthur K': {
// // // // //     role: 'Frontend Developer',
// // // // //     email: 'arthur.k@company.com',
// // // // //     phone: '+1 (555) 789-0123',
// // // // //     department: 'Engineering',
// // // // //     skills: ['React', 'Vue.js', 'CSS', 'JavaScript']
// // // // //   }
// // // // // };

// // // // // // ✅ Get employee data dynamically with fallback
// // // // // const getEmployeeWithFallback = (name: string, project?: Project): TeamMember => {
// // // // //   const fallback = EMPLOYEE_FALLBACK[name] || {};
// // // // //   const dynamicData = getEmployeeData(name, project);
  
// // // // //   return {
// // // // //     ...dynamicData,
// // // // //     ...fallback,
// // // // //     name: name,
// // // // //     projects: project ? [project.projectName] : (fallback.projects || [])
// // // // //   };
// // // // // };

// // // // // const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
// // // // //   const [project, setProject] = useState<Project | null>(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(null);
// // // // //   const [showEmployeeModal, setShowEmployeeModal] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const loadProject = () => {
// // // // //       try {
// // // // //         const savedProjects = localStorage.getItem('userProjects');
// // // // //         if (savedProjects) {
// // // // //           const parsed = JSON.parse(savedProjects);
// // // // //           const found = parsed.find((p: any) => p.id === projectId);
// // // // //           if (found) {
// // // // //             // ✅ Extract team members dynamically from tasks
// // // // //             const teamMembers: TeamMember[] = [];
// // // // //             const assignedUsers = new Set<string>();
            
// // // // //             // Extract assignees from tasks - DON'T add customer as Project Manager
// // // // //             if (found.tasks && found.tasks.length > 0) {
// // // // //               found.tasks.forEach((task: string) => {
// // // // //                 // Try to extract assignee from task string
// // // // //                 const assigneeMatch = task.match(/assignee[:\s]+([^,]+)/i) || 
// // // // //                                      task.match(/by[:\s]+([^,]+)/i) ||
// // // // //                                      task.match(/for[:\s]+([^,]+)/i);
// // // // //                 if (assigneeMatch && assigneeMatch[1]) {
// // // // //                   const name = assigneeMatch[1].trim();
// // // // //                   if (name && !assignedUsers.has(name)) {
// // // // //                     assignedUsers.add(name);
// // // // //                   }
// // // // //                 }
// // // // //               });
// // // // //             }
            
// // // // //             // Create team members from assigned users only
// // // // //             assignedUsers.forEach(name => {
// // // // //               const employeeData = getEmployeeWithFallback(name, found);
// // // // //               // Check if user has skills from the project
// // // // //               const userSkills: string[] = [];
// // // // //               if (found.tasks) {
// // // // //                 found.tasks.forEach((task: string) => {
// // // // //                   if (task.toLowerCase().includes(name.toLowerCase())) {
// // // // //                     if (task.toLowerCase().includes('design')) userSkills.push('UI/UX Design');
// // // // //                     if (task.toLowerCase().includes('backend')) userSkills.push('Backend Development');
// // // // //                     if (task.toLowerCase().includes('frontend')) userSkills.push('Frontend Development');
// // // // //                     if (task.toLowerCase().includes('api')) userSkills.push('API Development');
// // // // //                     if (task.toLowerCase().includes('test')) userSkills.push('Testing');
// // // // //                     if (task.toLowerCase().includes('database')) userSkills.push('Database Management');
// // // // //                   }
// // // // //                 });
// // // // //               }
// // // // //               if (userSkills.length > 0) {
// // // // //                 employeeData.skills = [...new Set([...employeeData.skills || [], ...userSkills])];
// // // // //               }
              
// // // // //               // Set role based on tasks
// // // // //               if (found.tasks) {
// // // // //                 const hasDesign = found.tasks.some((t: string) => 
// // // // //                   t.toLowerCase().includes('design') && t.toLowerCase().includes(name.toLowerCase())
// // // // //                 );
// // // // //                 const hasBackend = found.tasks.some((t: string) => 
// // // // //                   (t.toLowerCase().includes('api') || t.toLowerCase().includes('backend')) && 
// // // // //                   t.toLowerCase().includes(name.toLowerCase())
// // // // //                 );
// // // // //                 const hasFrontend = found.tasks.some((t: string) => 
// // // // //                   (t.toLowerCase().includes('frontend') || t.toLowerCase().includes('ui')) && 
// // // // //                   t.toLowerCase().includes(name.toLowerCase())
// // // // //                 );
// // // // //                 const hasTesting = found.tasks.some((t: string) => 
// // // // //                   (t.toLowerCase().includes('test') || t.toLowerCase().includes('qa')) && 
// // // // //                   t.toLowerCase().includes(name.toLowerCase())
// // // // //                 );
                
// // // // //                 if (hasDesign && !hasBackend && !hasFrontend) {
// // // // //                   employeeData.role = 'UI/UX Designer';
// // // // //                 } else if (hasBackend) {
// // // // //                   employeeData.role = 'Backend Developer';
// // // // //                 } else if (hasFrontend) {
// // // // //                   employeeData.role = 'Frontend Developer';
// // // // //                 } else if (hasTesting) {
// // // // //                   employeeData.role = 'QA Engineer';
// // // // //                 }
// // // // //               }
              
// // // // //               teamMembers.push(employeeData);
// // // // //             });
            
// // // // //             // Generate recent activity
// // // // //             const recentActivity: Activity[] = [];
// // // // //             if (found.tasks && found.tasks.length > 0) {
// // // // //               found.tasks.forEach((task: string) => {
// // // // //                 // Extract assignee name for activity
// // // // //                 const assigneeMatch = task.match(/assignee[:\s]+([^,]+)/i) || 
// // // // //                                      task.match(/by[:\s]+([^,]+)/i);
// // // // //                 const assignee = assigneeMatch ? assigneeMatch[1].trim() : 'System';
// // // // //                 recentActivity.push({
// // // // //                   id: `act-${Date.now()}-${Math.random()}`,
// // // // //                   user: assignee,
// // // // //                   action: `Task: "${task}"`,
// // // // //                   timestamp: new Date().toISOString()
// // // // //                 });
// // // // //               });
// // // // //             }
            
// // // // //             setProject({
// // // // //               ...found,
// // // // //               teamMembers: teamMembers.length > 0 ? teamMembers : [
// // // // //                 { 
// // // // //                   id: '1', 
// // // // //                   name: 'Unassigned', 
// // // // //                   role: 'Unassigned', 
// // // // //                   email: 'unassigned@company.com' 
// // // // //                 }
// // // // //               ],
// // // // //               recentActivity: recentActivity.length > 0 ? recentActivity : [
// // // // //                 { 
// // // // //                   id: '1', 
// // // // //                   user: 'System', 
// // // // //                   action: 'Project created', 
// // // // //                   timestamp: new Date().toISOString() 
// // // // //                 }
// // // // //               ]
// // // // //             });
// // // // //           }
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error('Failed to load project:', error);
// // // // //       }
// // // // //       setLoading(false);
// // // // //     };

// // // // //     loadProject();
// // // // //   }, [projectId]);

// // // // //   // ✅ Handle employee click - show dynamic employee details
// // // // //   const handleEmployeeClick = (employeeName: string) => {
// // // // //     if (project) {
// // // // //       const employeeData = getEmployeeWithFallback(employeeName, project);
// // // // //       setSelectedEmployee(employeeData);
// // // // //       setShowEmployeeModal(true);
// // // // //     }
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="flex items-center justify-center h-64">
// // // // //         <div className="text-gray-500">Loading project details...</div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (!project) {
// // // // //     return (
// // // // //       <div className="p-6">
// // // // //         <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
// // // // //           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
// // // // //         </button>
// // // // //         <div className="text-center py-12 text-gray-500">Project not found</div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   const getStatusColor = (status: string) => {
// // // // //     switch(status) {
// // // // //       case 'active': return 'bg-green-100 text-green-800';
// // // // //       case 'inactive': return 'bg-gray-100 text-gray-800';
// // // // //       case 'completed': return 'bg-blue-100 text-blue-800';
// // // // //       default: return 'bg-gray-100 text-gray-800';
// // // // //     }
// // // // //   };

// // // // //   // ✅ Employee Detail Modal
// // // // //   const EmployeeDetailModal = () => {
// // // // //     if (!selectedEmployee) return null;

// // // // //     return (
// // // // //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // // // //         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// // // // //           {/* Header */}
// // // // //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
// // // // //             <div className="flex items-center justify-between">
// // // // //               <div className="flex items-center gap-4">
// // // // //                 <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
// // // // //                   {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <h2 className="text-xl font-bold text-white">{selectedEmployee.name}</h2>
// // // // //                   <p className="text-blue-100">{selectedEmployee.role}</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <button 
// // // // //                 onClick={() => setShowEmployeeModal(false)}
// // // // //                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
// // // // //               >
// // // // //                 <X className="w-5 h-5" />
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Content */}
// // // // //           <div className="p-6 space-y-6">
// // // // //             {/* Contact Information */}
// // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //               <div className="bg-gray-50 rounded-lg p-4">
// // // // //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // // // //                   <Mail className="w-4 h-4" />
// // // // //                   <span>Email</span>
// // // // //                 </div>
// // // // //                 <p className="text-gray-800">{selectedEmployee.email}</p>
// // // // //               </div>
// // // // //               {selectedEmployee.phone && (
// // // // //                 <div className="bg-gray-50 rounded-lg p-4">
// // // // //                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // // // //                     <Phone className="w-4 h-4" />
// // // // //                     <span>Phone</span>
// // // // //                   </div>
// // // // //                   <p className="text-gray-800">{selectedEmployee.phone}</p>
// // // // //                 </div>
// // // // //               )}
// // // // //               {selectedEmployee.department && (
// // // // //                 <div className="bg-gray-50 rounded-lg p-4">
// // // // //                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // // // //                     <Briefcase className="w-4 h-4" />
// // // // //                     <span>Department</span>
// // // // //                   </div>
// // // // //                   <p className="text-gray-800">{selectedEmployee.department}</p>
// // // // //                 </div>
// // // // //               )}
// // // // //               {selectedEmployee.joinDate && (
// // // // //                 <div className="bg-gray-50 rounded-lg p-4">
// // // // //                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // // // //                     <Calendar className="w-4 h-4" />
// // // // //                     <span>Joined</span>
// // // // //                   </div>
// // // // //                   <p className="text-gray-800">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</p>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>

// // // // //             {/* Skills */}
// // // // //             {selectedEmployee.skills && selectedEmployee.skills.length > 0 && (
// // // // //               <div>
// // // // //                 <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
// // // // //                   <Award className="w-4 h-4" />
// // // // //                   Skills
// // // // //                 </h4>
// // // // //                 <div className="flex flex-wrap gap-2">
// // // // //                   {selectedEmployee.skills.map((skill, index) => (
// // // // //                     <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
// // // // //                       {skill}
// // // // //                     </span>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* Projects */}
// // // // //             {selectedEmployee.projects && selectedEmployee.projects.length > 0 && (
// // // // //               <div>
// // // // //                 <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
// // // // //                   <Tag className="w-4 h-4" />
// // // // //                   Projects
// // // // //                 </h4>
// // // // //                 <div className="flex flex-wrap gap-2">
// // // // //                   {selectedEmployee.projects.map((proj, index) => (
// // // // //                     <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
// // // // //                       {proj}
// // // // //                     </span>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* Action Buttons */}
// // // // //             <div className="flex gap-3 pt-4 border-t">
// // // // //               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
// // // // //                 <Mail className="w-4 h-4" />
// // // // //                 Send Message
// // // // //               </button>
// // // // //               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
// // // // //                 <Clock className="w-4 h-4" />
// // // // //                 View Activity
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
// // // // //       {/* Back Button */}
// // // // //       <button 
// // // // //         onClick={onBack} 
// // // // //         className="flex items-center text-gray-600 hover:text-blue-600 transition mb-4"
// // // // //       >
// // // // //         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
// // // // //       </button>

// // // // //       {/* Project Header */}
// // // // //       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
// // // // //         <div className="flex flex-wrap items-start justify-between gap-4">
// // // // //           <div>
// // // // //             <h1 className="text-2xl font-bold text-gray-900">{project.projectName}</h1>
// // // // //             {/* ✅ Show only project name, no customer */}
// // // // //             <p className="text-gray-500">Project ID: {project.id}</p>
// // // // //           </div>
// // // // //           <div className="flex items-center gap-3">
// // // // //             <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
// // // // //               {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
// // // // //             </span>
// // // // //             <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition">
// // // // //               <Edit className="w-4 h-4" />
// // // // //             </button>
// // // // //             <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition">
// // // // //               <MoreVertical className="w-4 h-4" />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Stats Grid */}
// // // // //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
// // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// // // // //           <div className="text-sm text-gray-500">Total Hours</div>
// // // // //           <div className="text-2xl font-bold text-gray-900">{project.loggedHours}</div>
// // // // //         </div>
// // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// // // // //           <div className="text-sm text-gray-500">Budget</div>
// // // // //           <div className="text-2xl font-bold text-gray-900">${project.budget?.toFixed(2) || '0'}</div>
// // // // //         </div>
// // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// // // // //           <div className="text-sm text-gray-500">Revenue</div>
// // // // //           <div className="text-2xl font-bold text-green-600">
// // // // //             ${project.budget ? (project.budget * 0.9).toFixed(2) : '0'}
// // // // //           </div>
// // // // //         </div>
// // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// // // // //           <div className="text-sm text-gray-500">Team Members</div>
// // // // //           <div className="text-2xl font-bold text-gray-900">{project.teamMembers?.length || 0}</div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Project Description */}
// // // // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
// // // // //         <h3 className="font-semibold text-gray-800 mb-2">Project Description</h3>
// // // // //         <p className="text-gray-600">{project.description || 'No description provided'}</p>
// // // // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
// // // // //           <div>
// // // // //             <span className="text-sm text-gray-500">Billing Method</span>
// // // // //             <p className="font-medium">{project.billingMethod}</p>
// // // // //           </div>
// // // // //           <div>
// // // // //             <span className="text-sm text-gray-500">Rate Per Hour</span>
// // // // //             <p className="font-medium">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</p>
// // // // //           </div>
// // // // //           <div>
// // // // //             <span className="text-sm text-gray-500">Start Date</span>
// // // // //             <p className="font-medium">{project.startDate || '-'}</p>
// // // // //           </div>
// // // // //           <div>
// // // // //             <span className="text-sm text-gray-500">End Date</span>
// // // // //             <p className="font-medium">{project.endDate || '-'}</p>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Tasks Section */}
// // // // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
// // // // //         <h3 className="font-semibold text-gray-800 mb-4">Tasks ({project.tasks?.length || 0})</h3>
// // // // //         {project.tasks && project.tasks.length > 0 ? (
// // // // //           <div className="space-y-3">
// // // // //             {project.tasks.map((task, index) => {
// // // // //               // Extract assignee from task
// // // // //               const assigneeMatch = task.match(/assignee[:\s]+([^,]+)/i) || 
// // // // //                                    task.match(/by[:\s]+([^,]+)/i);
// // // // //               const assignee = assigneeMatch ? assigneeMatch[1].trim() : 'Unassigned';
              
// // // // //               return (
// // // // //                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
// // // // //                   <div>
// // // // //                     <p className="font-medium text-gray-800">{task}</p>
// // // // //                     <p className="text-sm text-gray-500">Assignee: {assignee}</p>
// // // // //                   </div>
// // // // //                   <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">In Progress</span>
// // // // //                 </div>
// // // // //               );
// // // // //             })}
// // // // //           </div>
// // // // //         ) : (
// // // // //           <p className="text-gray-500">No tasks assigned</p>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* Team Members Section - Clickable */}
// // // // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
// // // // //         <h3 className="font-semibold text-gray-800 mb-4">
// // // // //           Team Members ({project.teamMembers?.length || 0})
// // // // //         </h3>
// // // // //         <div className="space-y-3">
// // // // //           {project.teamMembers?.map((member) => (
// // // // //             <div 
// // // // //               key={member.id}
// // // // //               className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition group"
// // // // //               onClick={() => handleEmployeeClick(member.name)}
// // // // //             >
// // // // //               <div className="flex items-center gap-3">
// // // // //                 <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-medium">
// // // // //                   {member.name.split(' ').map(n => n[0]).join('')}
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">
// // // // //                     {member.name}
// // // // //                   </p>
// // // // //                   <p className="text-sm text-gray-500">{member.role || 'Team Member'}</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <button className="text-blue-600 opacity-0 group-hover:opacity-100 transition">
// // // // //                 View Profile →
// // // // //               </button>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Recent Activity */}
// // // // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
// // // // //         <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
// // // // //         {project.recentActivity && project.recentActivity.length > 0 ? (
// // // // //           <div className="space-y-3">
// // // // //             {project.recentActivity.map((activity) => (
// // // // //               <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // // //                 <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-medium">
// // // // //                   {activity.user.split(' ').map(n => n[0]).join('')}
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <p className="text-sm text-gray-800">{activity.action}</p>
// // // // //                   <p className="text-xs text-gray-500">
// // // // //                     {new Date(activity.timestamp).toLocaleString()} by {activity.user}
// // // // //                   </p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         ) : (
// // // // //           <p className="text-gray-500">No recent activity</p>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* Employee Detail Modal */}
// // // // //       <EmployeeDetailModal />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ProjectDetail;
// // // // // src/client/components/projects/ProjectDetail.tsx

// // // // import React, { useState, useEffect } from 'react';
// // // // import { 
// // // //   ArrowLeft, 
// // // //   Clock, 
// // // //   DollarSign, 
// // // //   Users, 
// // // //   Calendar, 
// // // //   Tag,
// // // //   Mail,
// // // //   Briefcase,
// // // //   Phone,
// // // //   Award,
// // // //   Edit,
// // // //   MoreVertical,
// // // //   X,
// // // //   CheckCircle,
// // // //   AlertCircle,
// // // //   Clock as ClockIcon,
// // // //   User,
// // // //   Activity as ActivityIcon,
// // // //   Trash2,
// // // //   Save,
// // // //   Plus,
// // // //   ChevronDown
// // // // } from 'lucide-react';

// // // // interface Project {
// // // //   id: string;
// // // //   customerName: string;
// // // //   projectName: string;
// // // //   billingMethod: string;
// // // //   rate: number | null;
// // // //   status: 'active' | 'inactive' | 'completed';
// // // //   loggedHours: string;
// // // //   budget: number | null;
// // // //   startDate: string;
// // // //   endDate: string;
// // // //   description: string;
// // // //   createdAt: string;
// // // //   updatedAt: string;
// // // //   tasks?: Task[];
// // // //   teamMembers?: TeamMember[];
// // // //   recentActivity?: Activity[];
// // // // }

// // // // interface Task {
// // // //   id: string;
// // // //   title: string;
// // // //   assignee: string;
// // // //   assigneeEmail?: string;
// // // //   department?: string;
// // // //   status: 'todo' | 'in-progress' | 'review' | 'done';
// // // //   dueDate?: string;
// // // //   loggedHours: number;
// // // //   estimatedHours: number;
// // // //   description?: string;
// // // //   priority?: 'low' | 'medium' | 'high';
// // // //   projectName?: string;
// // // //   rework?: string;
// // // // }

// // // // interface TeamMember {
// // // //   id: string;
// // // //   name: string;
// // // //   role: string;
// // // //   email: string;
// // // //   phone?: string;
// // // //   department?: string;
// // // //   joinDate?: string;
// // // //   skills?: string[];
// // // //   projects?: string[];
// // // //   tasks?: Task[];
// // // // }

// // // // interface Activity {
// // // //   id: string;
// // // //   user: string;
// // // //   action: string;
// // // //   timestamp: string;
// // // //   details?: string;
// // // //   type?: 'task' | 'comment' | 'update' | 'status_change';
// // // // }

// // // // interface ProjectDetailProps {
// // // //   projectId: string;
// // // //   onBack: () => void;
// // // //   onProjectUpdate?: () => void;
// // // // }

// // // // // ✅ Employee data mapping with emails
// // // // const EMPLOYEE_DATA: Record<string, Partial<TeamMember>> = {
// // // //   'Patricia Boyle': {
// // // //     role: 'Lead Designer',
// // // //     email: 'patricia.boyle@company.com',
// // // //     phone: '+1 (555) 123-4567',
// // // //     department: 'Design',
// // // //     skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Design Systems', 'Prototyping'],
// // // //     joinDate: '2023-01-15'
// // // //   },
// // // //   'John Doe': {
// // // //     role: 'Senior Developer',
// // // //     email: 'john.doe@company.com',
// // // //     phone: '+1 (555) 234-5678',
// // // //     department: 'Engineering',
// // // //     skills: ['React', 'TypeScript', 'Node.js', 'API Design', 'Database'],
// // // //     joinDate: '2023-03-10'
// // // //   },
// // // //   'Jane Smith': {
// // // //     role: 'QA Tester',
// // // //     email: 'jane.smith@company.com',
// // // //     phone: '+1 (555) 345-6789',
// // // //     department: 'Quality Assurance',
// // // //     skills: ['Manual Testing', 'Automation', 'Selenium', 'Test Planning'],
// // // //     joinDate: '2023-06-01'
// // // //   },
// // // //   'Aaron Brown': {
// // // //     role: 'Full Stack Developer',
// // // //     email: 'aaron.brown@company.com',
// // // //     phone: '+1 (555) 567-8901',
// // // //     department: 'Engineering',
// // // //     skills: ['React', 'Angular', 'Python', 'Django', 'AWS'],
// // // //     joinDate: '2023-02-20'
// // // //   },
// // // //   'Dinesh Ramamurthy': {
// // // //     role: 'UI/UX Designer',
// // // //     email: 'dinesh.r@company.com',
// // // //     phone: '+1 (555) 678-9012',
// // // //     department: 'Design',
// // // //     skills: ['UI Design', 'UX Research', 'Figma', 'Sketch'],
// // // //     joinDate: '2023-04-05'
// // // //   },
// // // //   'Arthur K': {
// // // //     role: 'Frontend Developer',
// // // //     email: 'arthur.k@company.com',
// // // //     phone: '+1 (555) 789-0123',
// // // //     department: 'Engineering',
// // // //     skills: ['React', 'Vue.js', 'CSS', 'JavaScript'],
// // // //     joinDate: '2023-05-15'
// // // //   }
// // // // };

// // // // // ✅ Parse task string into structured object - IMPROVED with assignee extraction
// // // // const parseTaskString = (taskString: string, projectName?: string): Task | null => {
// // // //   try {
// // // //     // Try to parse as JSON first
// // // //     if (taskString.startsWith('{')) {
// // // //       const parsed = JSON.parse(taskString);
// // // //       return {
// // // //         id: parsed.id || `task-${Date.now()}`,
// // // //         title: parsed.title || parsed.name || 'Untitled Task',
// // // //         assignee: parsed.assignee || parsed.assignedTo || 'Unassigned',
// // // //         assigneeEmail: parsed.assigneeEmail || parsed.email || null,
// // // //         status: parsed.status || 'todo',
// // // //         loggedHours: parsed.loggedHours || parsed.hours || 0,
// // // //         estimatedHours: parsed.estimatedHours || parsed.estimate || 0,
// // // //         dueDate: parsed.dueDate || parsed.due || null,
// // // //         department: parsed.department || null,
// // // //         description: parsed.description || null,
// // // //         priority: parsed.priority || 'medium',
// // // //         projectName: parsed.projectName || projectName,
// // // //         rework: parsed.rework || null
// // // //       };
// // // //     }

// // // //     // Parse from formatted string
// // // //     const taskObj: Task = {
// // // //       id: `task-${Date.now()}`,
// // // //       title: taskString,
// // // //       assignee: 'Unassigned',
// // // //       status: 'todo',
// // // //       loggedHours: 0,
// // // //       estimatedHours: 0,
// // // //       priority: 'medium',
// // // //       projectName: projectName
// // // //     };

// // // //     // ✅ IMPROVED: Extract assignee - multiple patterns
// // // //     let assigneeMatch = taskString.match(/(?:assignee|Assignee|assigned to|Assigned To|by|for|from|to)[:\s]+([A-Za-z]+(?:\s+[A-Za-z]+)*)/i);
// // // //     if (assigneeMatch) {
// // // //       taskObj.assignee = assigneeMatch[1].trim();
// // // //     } else {
// // // //       // Try to extract from " - " pattern (common in task boards)
// // // //       const dashMatch = taskString.match(/^[^-]+-\s*([A-Za-z]+(?:\s+[A-Za-z]+)*)/);
// // // //       if (dashMatch && dashMatch[1]) {
// // // //         taskObj.assignee = dashMatch[1].trim();
// // // //       }
// // // //     }

// // // //     // ✅ Extract hours
// // // //     const hoursMatch = taskString.match(/(\d+)\s*h\s*\/\s*(\d+)\s*h/);
// // // //     if (hoursMatch) {
// // // //       taskObj.loggedHours = parseInt(hoursMatch[1]);
// // // //       taskObj.estimatedHours = parseInt(hoursMatch[2]);
// // // //     } else {
// // // //       const loggedMatch = taskString.match(/(\d+)\s*h\s*(?:logged|done)/i);
// // // //       if (loggedMatch) {
// // // //         taskObj.loggedHours = parseInt(loggedMatch[1]);
// // // //       }
// // // //       const estimateMatch = taskString.match(/estimated?\s*[:]\s*(\d+)\s*h/i);
// // // //       if (estimateMatch) {
// // // //         taskObj.estimatedHours = parseInt(estimateMatch[1]);
// // // //       }
// // // //     }

// // // //     // ✅ Extract status from task string
// // // //     const lowerTask = taskString.toLowerCase();
// // // //     if (lowerTask.includes('done') || lowerTask.includes('completed')) {
// // // //       taskObj.status = 'done';
// // // //     } else if (lowerTask.includes('review') || lowerTask.includes('in review')) {
// // // //       taskObj.status = 'review';
// // // //     } else if (lowerTask.includes('in-progress') || lowerTask.includes('in progress') || lowerTask.includes('progress')) {
// // // //       taskObj.status = 'in-progress';
// // // //     } else if (lowerTask.includes('todo') || lowerTask.includes('to do')) {
// // // //       taskObj.status = 'todo';
// // // //     }

// // // //     // ✅ Extract priority
// // // //     if (lowerTask.includes('high')) {
// // // //       taskObj.priority = 'high';
// // // //     } else if (lowerTask.includes('low')) {
// // // //       taskObj.priority = 'low';
// // // //     } else {
// // // //       taskObj.priority = 'medium';
// // // //     }

// // // //     // ✅ Extract rework info
// // // //     const reworkMatch = taskString.match(/rework\s*#?\s*(\d+)/i);
// // // //     if (reworkMatch) {
// // // //       taskObj.rework = `Rework #${reworkMatch[1]}`;
// // // //     }

// // // //     // Extract department from task context
// // // //     if (lowerTask.includes('design') || lowerTask.includes('ui') || lowerTask.includes('ux')) {
// // // //       taskObj.department = 'Design';
// // // //     } else if (lowerTask.includes('api') || lowerTask.includes('backend') || lowerTask.includes('database')) {
// // // //       taskObj.department = 'Backend';
// // // //     } else if (lowerTask.includes('frontend') || lowerTask.includes('ui')) {
// // // //       taskObj.department = 'Frontend';
// // // //     } else if (lowerTask.includes('test') || lowerTask.includes('qa')) {
// // // //       taskObj.department = 'QA';
// // // //     }

// // // //     return taskObj;
// // // //   } catch (error) {
// // // //     console.error('Failed to parse task:', error);
// // // //     return null;
// // // //   }
// // // // };

// // // // // ✅ Get employee details with email
// // // // const getEmployeeDetails = (name: string): TeamMember => {
// // // //   const fallback = EMPLOYEE_DATA[name] || {};
// // // //   return {
// // // //     id: `emp-${Date.now()}`,
// // // //     name: name,
// // // //     role: fallback.role || 'Team Member',
// // // //     email: fallback.email || `${name.toLowerCase().replace(' ', '.')}@company.com`,
// // // //     phone: fallback.phone || '+1 (555) 123-4567',
// // // //     department: fallback.department || 'Engineering',
// // // //     joinDate: fallback.joinDate || '2024-01-01',
// // // //     skills: fallback.skills || ['React', 'TypeScript', 'JavaScript', 'CSS'],
// // // //     projects: [],
// // // //     tasks: []
// // // //   };
// // // // };

// // // // const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack, onProjectUpdate }) => {
// // // //   const [project, setProject] = useState<Project | null>(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(null);
// // // //   const [showEmployeeModal, setShowEmployeeModal] = useState(false);
// // // //   const [showDropdown, setShowDropdown] = useState(false);
// // // //   const [showEditModal, setShowEditModal] = useState(false);
// // // //   const [editFormData, setEditFormData] = useState<any>(null);
// // // //   const [showTaskModal, setShowTaskModal] = useState(false);
// // // //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);

// // // //   // ✅ Format hours helper
// // // //   const formatHours = (hours: number): string => {
// // // //     const h = Math.floor(hours);
// // // //     const m = Math.round((hours - h) * 60);
// // // //     return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
// // // //   };

// // // //   useEffect(() => {
// // // //     loadProject();
// // // //   }, [projectId]);

// // // //   const loadProject = () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const savedProjects = localStorage.getItem('userProjects');
// // // //       if (savedProjects) {
// // // //         const parsed = JSON.parse(savedProjects);
// // // //         const found = parsed.find((p: any) => p.id === projectId);
// // // //         if (found) {
// // // //           const tasks: Task[] = [];
// // // //           const teamMemberMap = new Map<string, TeamMember>();
// // // //           const activities: Activity[] = [];
// // // //           let totalLoggedHours = 0;

// // // //           if (found.tasks && found.tasks.length > 0) {
// // // //             found.tasks.forEach((taskString: string) => {
// // // //               const task = parseTaskString(taskString, found.projectName);
// // // //               if (task) {
// // // //                 tasks.push(task);
// // // //                 totalLoggedHours += task.loggedHours || 0;

// // // //                 // ✅ Add to team members if assignee exists
// // // //                 if (task.assignee && task.assignee !== 'Unassigned' && task.assignee !== 'undefined') {
// // // //                   if (!teamMemberMap.has(task.assignee)) {
// // // //                     const employee = getEmployeeDetails(task.assignee);
// // // //                     employee.tasks = [];
// // // //                     teamMemberMap.set(task.assignee, employee);
// // // //                   }
// // // //                   const member = teamMemberMap.get(task.assignee)!;
// // // //                   member.tasks!.push(task);
// // // //                 }

// // // //                 // Create activity with proper assignee
// // // //                 const statusMap = {
// // // //                   'todo': 'created',
// // // //                   'in-progress': 'started working on',
// // // //                   'review': 'sent for review',
// // // //                   'done': 'completed'
// // // //                 };
// // // //                 const action = statusMap[task.status] || 'updated';
// // // //                 activities.push({
// // // //                   id: `act-${Date.now()}-${Math.random()}`,
// // // //                   user: task.assignee && task.assignee !== 'Unassigned' ? task.assignee : 'System',
// // // //                   action: `${action} task: "${task.title}"`,
// // // //                   timestamp: new Date().toISOString(),
// // // //                   type: task.status === 'done' ? 'status_change' : 'task'
// // // //                 });
// // // //               }
// // // //             });
// // // //           }

// // // //           const loggedHoursStr = formatHours(totalLoggedHours);
// // // //           const teamMembers = Array.from(teamMemberMap.values());

// // // //           setProject({
// // // //             ...found,
// // // //             tasks: tasks,
// // // //             teamMembers: teamMembers,
// // // //             loggedHours: loggedHoursStr || found.loggedHours || '00:00',
// // // //             recentActivity: activities.length > 0 ? activities : [
// // // //               { 
// // // //                 id: '1', 
// // // //                 user: 'System', 
// // // //                 action: 'Project created', 
// // // //                 timestamp: found.createdAt || new Date().toISOString(),
// // // //                 type: 'update'
// // // //               }
// // // //             ]
// // // //           });
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Failed to load project:', error);
// // // //     }
// // // //     setLoading(false);
// // // //   };

// // // //   // ✅ Handle task click - open task modal
// // // //   const handleTaskClick = (task: Task) => {
// // // //     setSelectedTask(task);
// // // //     setShowTaskModal(true);
// // // //   };

// // // //   // ✅ Update task status (called when dragging in task board)
// // // //   const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
// // // //     if (!project) return;

// // // //     const updatedTasks = project.tasks?.map(task => {
// // // //       if (task.id === taskId) {
// // // //         return { ...task, status: newStatus };
// // // //       }
// // // //       return task;
// // // //     });

// // // //     // Update in localStorage
// // // //     try {
// // // //       const savedProjects = localStorage.getItem('userProjects');
// // // //       if (savedProjects) {
// // // //         const parsed = JSON.parse(savedProjects);
// // // //         const index = parsed.findIndex((p: any) => p.id === projectId);
// // // //         if (index !== -1) {
// // // //           // Convert tasks back to strings for storage
// // // //           parsed[index].tasks = updatedTasks?.map(task => {
// // // //             return `${task.title} - assignee: ${task.assignee} - ${task.loggedHours}h / ${task.estimatedHours}h - ${task.status}`;
// // // //           });
// // // //           localStorage.setItem('userProjects', JSON.stringify(parsed));
// // // //           loadProject(); // Reload
// // // //           if (onProjectUpdate) onProjectUpdate();
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Failed to update task status:', error);
// // // //     }
// // // //   };

// // // //   // ✅ Task Detail Modal
// // // //   const TaskDetailModal = () => {
// // // //     if (!selectedTask) return null;

// // // //     return (
// // // //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // // //         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// // // //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
// // // //             <div className="flex items-center justify-between">
// // // //               <div>
// // // //                 <h2 className="text-xl font-bold text-white">{selectedTask.title}</h2>
// // // //                 <p className="text-blue-100">Task Details</p>
// // // //               </div>
// // // //               <button 
// // // //                 onClick={() => setShowTaskModal(false)}
// // // //                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
// // // //               >
// // // //                 <X className="w-5 h-5" />
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           <div className="p-6 space-y-6">
// // // //             {/* Task Info */}
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //               <div className="bg-gray-50 rounded-lg p-4">
// // // //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // // //                   <User className="w-4 h-4" />
// // // //                   <span>Assignee</span>
// // // //                 </div>
// // // //                 <p className="text-gray-800 font-medium">{selectedTask.assignee || 'Unassigned'}</p>
// // // //               </div>
// // // //               <div className="bg-gray-50 rounded-lg p-4">
// // // //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // // //                   <Tag className="w-4 h-4" />
// // // //                   <span>Status</span>
// // // //                 </div>
// // // //                 <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getTaskStatusColor(selectedTask.status)}`}>
// // // //                   {getTaskStatusLabel(selectedTask.status)}
// // // //                 </span>
// // // //               </div>
// // // //               <div className="bg-gray-50 rounded-lg p-4">
// // // //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // // //                   <Clock className="w-4 h-4" />
// // // //                   <span>Hours</span>
// // // //                 </div>
// // // //                 <p className="text-gray-800">{selectedTask.loggedHours}h / {selectedTask.estimatedHours || '?'}h</p>
// // // //               </div>
// // // //               <div className="bg-gray-50 rounded-lg p-4">
// // // //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // // //                   <Award className="w-4 h-4" />
// // // //                   <span>Priority</span>
// // // //                 </div>
// // // //                 <p className="text-gray-800 capitalize">{selectedTask.priority || 'Medium'}</p>
// // // //               </div>
// // // //             </div>

// // // //             {selectedTask.description && (
// // // //               <div>
// // // //                 <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
// // // //                 <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{selectedTask.description}</p>
// // // //               </div>
// // // //             )}

// // // //             {selectedTask.rework && (
// // // //               <div>
// // // //                 <h4 className="text-sm font-medium text-gray-700 mb-2">Rework</h4>
// // // //                 <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{selectedTask.rework}</p>
// // // //               </div>
// // // //             )}

// // // //             {selectedTask.projectName && (
// // // //               <div>
// // // //                 <h4 className="text-sm font-medium text-gray-700 mb-2">Project</h4>
// // // //                 <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{selectedTask.projectName}</p>
// // // //               </div>
// // // //             )}

// // // //             {/* Status Update Buttons */}
// // // //             <div className="border-t pt-4">
// // // //               <h4 className="text-sm font-medium text-gray-700 mb-3">Update Status</h4>
// // // //               <div className="flex flex-wrap gap-2">
// // // //                 {(['todo', 'in-progress', 'review', 'done'] as Task['status'][]).map((status) => (
// // // //                   <button
// // // //                     key={status}
// // // //                     onClick={() => {
// // // //                       updateTaskStatus(selectedTask.id, status);
// // // //                       setShowTaskModal(false);
// // // //                     }}
// // // //                     className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
// // // //                       selectedTask.status === status
// // // //                         ? getTaskStatusColor(status) + ' ring-2 ring-offset-2 ring-blue-500'
// // // //                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // //                     }`}
// // // //                   >
// // // //                     {getTaskStatusLabel(status)}
// // // //                   </button>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             <div className="flex gap-3 pt-4 border-t">
// // // //               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
// // // //                 <Edit className="w-4 h-4" />
// // // //                 Edit Task
// // // //               </button>
// // // //               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
// // // //                 <ActivityIcon className="w-4 h-4" />
// // // //                 View History
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   // ✅ Edit Project Modal
// // // //   const EditProjectModal = () => {
// // // //     if (!showEditModal || !editFormData) return null;

// // // //     return (
// // // //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // // //         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// // // //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
// // // //             <div className="flex items-center justify-between">
// // // //               <h2 className="text-xl font-bold text-white">Edit Project</h2>
// // // //               <button 
// // // //                 onClick={() => setShowEditModal(false)}
// // // //                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
// // // //               >
// // // //                 <X className="w-5 h-5" />
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           <div className="p-6 space-y-4">
// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
// // // //               <input
// // // //                 type="text"
// // // //                 value={editFormData.projectName || ''}
// // // //                 onChange={(e) => setEditFormData({...editFormData, projectName: e.target.value})}
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //               />
// // // //             </div>

// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
// // // //               <textarea
// // // //                 value={editFormData.description || ''}
// // // //                 onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //                 rows={3}
// // // //               />
// // // //             </div>

// // // //             <div className="grid grid-cols-2 gap-4">
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
// // // //                 <input
// // // //                   type="number"
// // // //                   value={editFormData.budget || ''}
// // // //                   onChange={(e) => setEditFormData({...editFormData, budget: parseFloat(e.target.value) || 0})}
// // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //                 />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour ($)</label>
// // // //                 <input
// // // //                   type="number"
// // // //                   value={editFormData.rate || ''}
// // // //                   onChange={(e) => setEditFormData({...editFormData, rate: parseFloat(e.target.value) || 0})}
// // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             <div className="grid grid-cols-2 gap-4">
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
// // // //                 <input
// // // //                   type="date"
// // // //                   value={editFormData.startDate || ''}
// // // //                   onChange={(e) => setEditFormData({...editFormData, startDate: e.target.value})}
// // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //                 />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
// // // //                 <input
// // // //                   type="date"
// // // //                   value={editFormData.endDate || ''}
// // // //                   onChange={(e) => setEditFormData({...editFormData, endDate: e.target.value})}
// // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             <div className="grid grid-cols-2 gap-4">
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
// // // //                 <select
// // // //                   value={editFormData.status || 'active'}
// // // //                   onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
// // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //                 >
// // // //                   <option value="active">Active</option>
// // // //                   <option value="inactive">Inactive</option>
// // // //                   <option value="completed">Completed</option>
// // // //                 </select>
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">Billing Method</label>
// // // //                 <select
// // // //                   value={editFormData.billingMethod || 'Based on Task Hours'}
// // // //                   onChange={(e) => setEditFormData({...editFormData, billingMethod: e.target.value})}
// // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //                 >
// // // //                   <option value="Based on Task Hours">Based on Task Hours</option>
// // // //                   <option value="Based on Project Hours">Based on Project Hours</option>
// // // //                   <option value="Fixed Price">Fixed Price</option>
// // // //                 </select>
// // // //               </div>
// // // //             </div>

// // // //             <div className="flex gap-3 pt-4 border-t">
// // // //               <button
// // // //                 onClick={handleSaveEdit}
// // // //                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
// // // //               >
// // // //                 <Save className="w-4 h-4" />
// // // //                 Save Changes
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => setShowEditModal(false)}
// // // //                 className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   // ✅ Employee Detail Modal
// // // //   const EmployeeDetailModal = () => {
// // // //     if (!selectedEmployee) return null;

// // // //     return (
// // // //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // // //         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// // // //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
// // // //             <div className="flex items-center justify-between">
// // // //               <div className="flex items-center gap-4">
// // // //                 <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
// // // //                   {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
// // // //                 </div>
// // // //                 <div>
// // // //                   <h2 className="text-xl font-bold text-white">{selectedEmployee.name}</h2>
// // // //                   <p className="text-blue-100">{selectedEmployee.role}</p>
// // // //                 </div>
// // // //               </div>
// // // //               <button 
// // // //                 onClick={() => setShowEmployeeModal(false)}
// // // //                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
// // // //               >
// // // //                 <X className="w-5 h-5" />
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           <div className="p-6 space-y-6">
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //               <div className="bg-gray-50 rounded-lg p-4">
// // // //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // // //                   <Mail className="w-4 h-4" />
// // // //                   <span>Email</span>
// // // //                 </div>
// // // //                 <p className="text-gray-800">{selectedEmployee.email}</p>
// // // //               </div>
// // // //               {selectedEmployee.phone && (
// // // //                 <div className="bg-gray-50 rounded-lg p-4">
// // // //                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // // //                     <Phone className="w-4 h-4" />
// // // //                     <span>Phone</span>
// // // //                   </div>
// // // //                   <p className="text-gray-800">{selectedEmployee.phone}</p>
// // // //                 </div>
// // // //               )}
// // // //               {selectedEmployee.department && (
// // // //                 <div className="bg-gray-50 rounded-lg p-4">
// // // //                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // // //                     <Briefcase className="w-4 h-4" />
// // // //                     <span>Department</span>
// // // //                   </div>
// // // //                   <p className="text-gray-800">{selectedEmployee.department}</p>
// // // //                 </div>
// // // //               )}
// // // //               {selectedEmployee.joinDate && (
// // // //                 <div className="bg-gray-50 rounded-lg p-4">
// // // //                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // // //                     <Calendar className="w-4 h-4" />
// // // //                     <span>Joined</span>
// // // //                   </div>
// // // //                   <p className="text-gray-800">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</p>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {selectedEmployee.skills && selectedEmployee.skills.length > 0 && (
// // // //               <div>
// // // //                 <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
// // // //                   <Award className="w-4 h-4" />
// // // //                   Skills
// // // //                 </h4>
// // // //                 <div className="flex flex-wrap gap-2">
// // // //                   {selectedEmployee.skills.map((skill, index) => (
// // // //                     <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
// // // //                       {skill}
// // // //                     </span>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {selectedEmployee.tasks && selectedEmployee.tasks.length > 0 && (
// // // //               <div>
// // // //                 <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
// // // //                   <Tag className="w-4 h-4" />
// // // //                   Assigned Tasks ({selectedEmployee.tasks.length})
// // // //                 </h4>
// // // //                 <div className="space-y-2">
// // // //                   {selectedEmployee.tasks.map((task, index) => (
// // // //                     <div 
// // // //                       key={index} 
// // // //                       className="bg-gray-50 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition"
// // // //                       onClick={() => {
// // // //                         setShowEmployeeModal(false);
// // // //                         setSelectedTask(task);
// // // //                         setShowTaskModal(true);
// // // //                       }}
// // // //                     >
// // // //                       <span className="text-sm text-gray-800">{task.title}</span>
// // // //                       <span className={`text-xs px-2 py-1 rounded-full ${getTaskStatusColor(task.status)}`}>
// // // //                         {getTaskStatusLabel(task.status)}
// // // //                       </span>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             <div className="flex gap-3 pt-4 border-t">
// // // //               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
// // // //                 <Mail className="w-4 h-4" />
// // // //                 Send Message
// // // //               </button>
// // // //               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
// // // //                 <Clock className="w-4 h-4" />
// // // //                 View Activity
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   // ✅ Handle Edit Save
// // // //   const handleSaveEdit = () => {
// // // //     try {
// // // //       const savedProjects = localStorage.getItem('userProjects');
// // // //       if (savedProjects) {
// // // //         const parsed = JSON.parse(savedProjects);
// // // //         const index = parsed.findIndex((p: any) => p.id === projectId);
// // // //         if (index !== -1) {
// // // //           parsed[index] = {
// // // //             ...parsed[index],
// // // //             ...editFormData,
// // // //             updatedAt: new Date().toISOString()
// // // //           };
// // // //           localStorage.setItem('userProjects', JSON.stringify(parsed));
// // // //           setShowEditModal(false);
// // // //           loadProject();
// // // //           if (onProjectUpdate) onProjectUpdate();
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Failed to update project:', error);
// // // //     }
// // // //   };

// // // //   // ✅ Handle Delete
// // // //   const handleDelete = () => {
// // // //     if (window.confirm('Are you sure you want to delete this project?')) {
// // // //       try {
// // // //         const savedProjects = localStorage.getItem('userProjects');
// // // //         if (savedProjects) {
// // // //           const parsed = JSON.parse(savedProjects);
// // // //           const filtered = parsed.filter((p: any) => p.id !== projectId);
// // // //           localStorage.setItem('userProjects', JSON.stringify(filtered));
// // // //           if (onProjectUpdate) onProjectUpdate();
// // // //           onBack();
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('Failed to delete project:', error);
// // // //       }
// // // //     }
// // // //     setShowDropdown(false);
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center h-64">
// // // //         <div className="text-gray-500">Loading project details...</div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!project) {
// // // //     return (
// // // //       <div className="p-6">
// // // //         <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
// // // //           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
// // // //         </button>
// // // //         <div className="text-center py-12 text-gray-500">Project not found</div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const getStatusColor = (status: string) => {
// // // //     switch(status) {
// // // //       case 'active': return 'bg-green-100 text-green-800';
// // // //       case 'inactive': return 'bg-gray-100 text-gray-800';
// // // //       case 'completed': return 'bg-blue-100 text-blue-800';
// // // //       default: return 'bg-gray-100 text-gray-800';
// // // //     }
// // // //   };

// // // //   const getTaskStatusColor = (status: Task['status']) => {
// // // //     switch(status) {
// // // //       case 'todo': return 'bg-gray-100 text-gray-600';
// // // //       case 'in-progress': return 'bg-yellow-100 text-yellow-800';
// // // //       case 'review': return 'bg-purple-100 text-purple-800';
// // // //       case 'done': return 'bg-green-100 text-green-800';
// // // //       default: return 'bg-gray-100 text-gray-600';
// // // //     }
// // // //   };

// // // //   const getTaskStatusLabel = (status: Task['status']) => {
// // // //     switch(status) {
// // // //       case 'todo': return 'To Do';
// // // //       case 'in-progress': return 'In Progress';
// // // //       case 'review': return 'Review';
// // // //       case 'done': return 'Done';
// // // //       default: return 'Unknown';
// // // //     }
// // // //   };

// // // //   const getTaskStatusIcon = (status: Task['status']) => {
// // // //     switch(status) {
// // // //       case 'todo': return <ClockIcon className="w-3 h-3" />;
// // // //       case 'in-progress': return <ActivityIcon className="w-3 h-3" />;
// // // //       case 'review': return <AlertCircle className="w-3 h-3" />;
// // // //       case 'done': return <CheckCircle className="w-3 h-3" />;
// // // //       default: return null;
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
// // // //       <button 
// // // //         onClick={onBack} 
// // // //         className="flex items-center text-gray-600 hover:text-blue-600 transition mb-4"
// // // //       >
// // // //         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
// // // //       </button>

// // // //       {/* Project Header */}
// // // //       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
// // // //         <div className="flex flex-wrap items-start justify-between gap-4">
// // // //           <div>
// // // //             <h1 className="text-2xl font-bold text-gray-900">{project.projectName}</h1>
// // // //             <p className="text-gray-500">Project ID: {project.id}</p>
// // // //           </div>
// // // //           <div className="flex items-center gap-3 relative">
// // // //             <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
// // // //               {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
// // // //             </span>
            
// // // //             {/* Dropdown Menu */}
// // // //             <div className="relative">
// // // //               <button 
// // // //                 onClick={() => setShowDropdown(!showDropdown)}
// // // //                 className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
// // // //               >
// // // //                 <MoreVertical className="w-5 h-5" />
// // // //               </button>
              
// // // //               {showDropdown && (
// // // //                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
// // // //                   <button
// // // //                     onClick={handleEdit}
// // // //                     className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-2"
// // // //                   >
// // // //                     <Edit className="w-4 h-4" />
// // // //                     Edit Project
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={handleDelete}
// // // //                     className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
// // // //                   >
// // // //                     <Trash2 className="w-4 h-4" />
// // // //                     Delete Project
// // // //                   </button>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Stats Grid */}
// // // //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
// // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// // // //           <div className="text-sm text-gray-500">Total Hours</div>
// // // //           <div className="text-2xl font-bold text-gray-900">{project.loggedHours || '00:00'}</div>
// // // //         </div>
// // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// // // //           <div className="text-sm text-gray-500">Budget</div>
// // // //           <div className="text-2xl font-bold text-gray-900">${project.budget?.toFixed(2) || '0.00'}</div>
// // // //         </div>
// // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// // // //           <div className="text-sm text-gray-500">Revenue</div>
// // // //           <div className="text-2xl font-bold text-green-600">
// // // //             ${project.budget ? (project.budget * 0.9).toFixed(2) : '0.00'}
// // // //           </div>
// // // //         </div>
// // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// // // //           <div className="text-sm text-gray-500">Team Members</div>
// // // //           <div className="text-2xl font-bold text-gray-900">{project.teamMembers?.length || 0}</div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Project Description */}
// // // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
// // // //         <h3 className="font-semibold text-gray-800 mb-2">Project Description</h3>
// // // //         <p className="text-gray-600">{project.description || 'No description provided'}</p>
// // // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
// // // //           <div>
// // // //             <span className="text-sm text-gray-500">Billing Method</span>
// // // //             <p className="font-medium">{project.billingMethod || 'Not specified'}</p>
// // // //           </div>
// // // //           <div>
// // // //             <span className="text-sm text-gray-500">Rate Per Hour</span>
// // // //             <p className="font-medium">{project.rate ? `$${project.rate.toFixed(2)}/hr` : 'Not specified'}</p>
// // // //           </div>
// // // //           <div>
// // // //             <span className="text-sm text-gray-500">Start Date</span>
// // // //             <p className="font-medium">{project.startDate || 'Not specified'}</p>
// // // //           </div>
// // // //           <div>
// // // //             <span className="text-sm text-gray-500">End Date</span>
// // // //             <p className="font-medium">{project.endDate || 'Not specified'}</p>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Tasks Section - Clickable to open modal */}
// // // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
// // // //         <h3 className="font-semibold text-gray-800 mb-4">Tasks ({project.tasks?.length || 0})</h3>
// // // //         {project.tasks && project.tasks.length > 0 ? (
// // // //           <div className="space-y-3">
// // // //             {project.tasks.map((task, index) => (
// // // //               <div 
// // // //                 key={index} 
// // // //                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition group"
// // // //                 onClick={() => handleTaskClick(task)}
// // // //               >
// // // //                 <div>
// // // //                   <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">
// // // //                     {task.title}
// // // //                   </p>
// // // //                   <p className="text-sm text-gray-500 flex items-center gap-2">
// // // //                     <User className="w-3 h-3" />
// // // //                     Assignee: {task.assignee && task.assignee !== 'Unassigned' ? task.assignee : 'Unassigned'}
// // // //                     {(task.loggedHours > 0 || task.estimatedHours > 0) && (
// // // //                       <span className="ml-2 text-xs text-gray-400">
// // // //                         {task.loggedHours}h / {task.estimatedHours || '?'}h
// // // //                       </span>
// // // //                     )}
// // // //                   </p>
// // // //                 </div>
// // // //                 <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${getTaskStatusColor(task.status)}`}>
// // // //                   {getTaskStatusIcon(task.status)}
// // // //                   {getTaskStatusLabel(task.status)}
// // // //                 </span>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         ) : (
// // // //           <p className="text-gray-500">No tasks assigned</p>
// // // //         )}
// // // //       </div>

// // // //       {/* Team Members Section */}
// // // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
// // // //         <h3 className="font-semibold text-gray-800 mb-4">
// // // //           Team Members ({project.teamMembers?.length || 0})
// // // //         </h3>
// // // //         <div className="space-y-3">
// // // //           {project.teamMembers && project.teamMembers.length > 0 ? (
// // // //             project.teamMembers.map((member) => (
// // // //               <div 
// // // //                 key={member.id}
// // // //                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition group"
// // // //                 onClick={() => handleEmployeeClick(member.name)}
// // // //               >
// // // //                 <div className="flex items-center gap-3">
// // // //                   <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-medium">
// // // //                     {member.name.split(' ').map(n => n[0]).join('')}
// // // //                   </div>
// // // //                   <div>
// // // //                     <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">
// // // //                       {member.name}
// // // //                     </p>
// // // //                     <p className="text-sm text-gray-500">
// // // //                       {member.role || 'Team Member'}
// // // //                       {member.tasks && member.tasks.length > 0 && (
// // // //                         <span className="ml-2 text-xs text-gray-400">
// // // //                           ({member.tasks.length} tasks)
// // // //                         </span>
// // // //                       )}
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>
// // // //                 <button className="text-blue-600 opacity-0 group-hover:opacity-100 transition">
// // // //                   View Profile →
// // // //                 </button>
// // // //               </div>
// // // //             ))
// // // //           ) : (
// // // //             <p className="text-gray-500">No team members assigned</p>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* Recent Activity */}
// // // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
// // // //         <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
// // // //         {project.recentActivity && project.recentActivity.length > 0 ? (
// // // //           <div className="space-y-3">
// // // //             {project.recentActivity.map((activity) => (
// // // //               <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // //                 <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-medium">
// // // //                   {activity.user.split(' ').map(n => n[0]).join('')}
// // // //                 </div>
// // // //                 <div>
// // // //                   <p className="text-sm text-gray-800">{activity.action}</p>
// // // //                   <p className="text-xs text-gray-500">
// // // //                     {new Date(activity.timestamp).toLocaleString()} 
// // // //                     {activity.user && activity.user !== 'System' && ` by ${activity.user}`}
// // // //                   </p>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         ) : (
// // // //           <p className="text-gray-500">No recent activity</p>
// // // //         )}
// // // //       </div>

// // // //       {/* Modals */}
// // // //       <EditProjectModal />
// // // //       <EmployeeDetailModal />
// // // //       <TaskDetailModal />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProjectDetail;
// // // // src/client/components/projects/ProjectDetail.tsx

// // // import React, { useState, useEffect } from 'react';
// // // import { 
// // //   ArrowLeft, 
// // //   Clock, 
// // //   DollarSign, 
// // //   Users, 
// // //   Calendar, 
// // //   Tag,
// // //   Mail,
// // //   Briefcase,
// // //   Phone,
// // //   Award,
// // //   Edit,
// // //   MoreVertical,
// // //   X,
// // //   CheckCircle,
// // //   AlertCircle,
// // //   Clock as ClockIcon,
// // //   User,
// // //   Activity as ActivityIcon,
// // //   Trash2,
// // //   Save
// // // } from 'lucide-react';

// // // interface Project {
// // //   id: string;
// // //   customerName: string;
// // //   projectName: string;
// // //   billingMethod: string;
// // //   rate: number | null;
// // //   status: 'active' | 'inactive' | 'completed';
// // //   loggedHours: string;
// // //   budget: number | null;
// // //   startDate: string;
// // //   endDate: string;
// // //   description: string;
// // //   createdAt: string;
// // //   updatedAt: string;
// // //   tasks?: Task[];
// // //   teamMembers?: TeamMember[];
// // //   recentActivity?: Activity[];
// // // }

// // // interface Task {
// // //   id: string;
// // //   title: string;
// // //   assignee: string;
// // //   assigneeEmail?: string;
// // //   department?: string;
// // //   status: 'todo' | 'in-progress' | 'review' | 'done';
// // //   dueDate?: string;
// // //   loggedHours: number;
// // //   estimatedHours: number;
// // //   description?: string;
// // //   priority?: 'low' | 'medium' | 'high';
// // //   projectName?: string;
// // //   rework?: string;
// // //   actualHours?: number;
// // // }

// // // interface TeamMember {
// // //   id: string;
// // //   name: string;
// // //   role: string;
// // //   email: string;
// // //   phone?: string;
// // //   department?: string;
// // //   joinDate?: string;
// // //   skills?: string[];
// // //   projects?: string[];
// // //   tasks?: Task[];
// // // }

// // // interface Activity {
// // //   id: string;
// // //   user: string;
// // //   action: string;
// // //   timestamp: string;
// // //   details?: string;
// // //   type?: 'task' | 'comment' | 'update' | 'status_change';
// // // }

// // // interface ProjectDetailProps {
// // //   projectId: string;
// // //   onBack: () => void;
// // //   onProjectUpdate?: () => void;
// // // }

// // // // ✅ Employee data mapping
// // // const EMPLOYEE_DATA: Record<string, Partial<TeamMember>> = {
// // //   'Patricia Boyle': {
// // //     role: 'Lead Designer',
// // //     email: 'patricia.boyle@company.com',
// // //     phone: '+1 (555) 123-4567',
// // //     department: 'Design',
// // //     skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Design Systems', 'Prototyping'],
// // //     joinDate: '2023-01-15'
// // //   },
// // //   'John Doe': {
// // //     role: 'Senior Developer',
// // //     email: 'john.doe@company.com',
// // //     phone: '+1 (555) 234-5678',
// // //     department: 'Engineering',
// // //     skills: ['React', 'TypeScript', 'Node.js', 'API Design', 'Database'],
// // //     joinDate: '2023-03-10'
// // //   },
// // //   'Jane Smith': {
// // //     role: 'QA Tester',
// // //     email: 'jane.smith@company.com',
// // //     phone: '+1 (555) 345-6789',
// // //     department: 'Quality Assurance',
// // //     skills: ['Manual Testing', 'Automation', 'Selenium', 'Test Planning'],
// // //     joinDate: '2023-06-01'
// // //   },
// // //   'subahree': {
// // //     role: 'Developer',
// // //     email: 'subahree@company.com',
// // //     phone: '+1 (555) 456-7890',
// // //     department: 'Engineering',
// // //     skills: ['React', 'TypeScript', 'Node.js', 'API Design'],
// // //     joinDate: '2023-04-01'
// // //   }
// // // };

// // // // ✅ Parse task string from localStorage
// // // const parseTaskString = (taskString: string, projectName?: string): Task | null => {
// // //   try {
// // //     // If it's already a JSON string
// // //     if (taskString.startsWith('{')) {
// // //       const parsed = JSON.parse(taskString);
// // //       return {
// // //         id: parsed.id || `task-${Date.now()}`,
// // //         title: parsed.title || parsed.name || 'Untitled Task',
// // //         assignee: parsed.assignee || parsed.assignedTo || 'Unassigned',
// // //         assigneeEmail: parsed.assigneeEmail || parsed.email || null,
// // //         status: parsed.status || 'todo',
// // //         loggedHours: parsed.loggedHours || parsed.hours || 0,
// // //         estimatedHours: parsed.estimatedHours || parsed.estimate || 0,
// // //         dueDate: parsed.dueDate || parsed.due || null,
// // //         department: parsed.department || null,
// // //         description: parsed.description || null,
// // //         priority: parsed.priority || 'medium',
// // //         projectName: parsed.projectName || projectName,
// // //         rework: parsed.rework || null,
// // //         actualHours: parsed.actualHours || 0
// // //       };
// // //     }

// // //     // Parse from the format: "Task - assignee: Name - 0h / 1h - status"
// // //     const taskObj: Task = {
// // //       id: `task-${Date.now()}`,
// // //       title: taskString,
// // //       assignee: 'Unassigned',
// // //       status: 'todo',
// // //       loggedHours: 0,
// // //       estimatedHours: 0,
// // //       priority: 'medium',
// // //       projectName: projectName
// // //     };

// // //     // Extract assignee - look for "assignee: Name" pattern
// // //     const assigneeMatch = taskString.match(/assignee[:\s]+([A-Za-z]+(?:\s+[A-Za-z]+)*)/i);
// // //     if (assigneeMatch && assigneeMatch[1]) {
// // //       taskObj.assignee = assigneeMatch[1].trim();
// // //     }

// // //     // Extract status - look for "todo", "in-progress", "review", "done"
// // //     const lowerTask = taskString.toLowerCase();
// // //     if (lowerTask.includes('done')) {
// // //       taskObj.status = 'done';
// // //     } else if (lowerTask.includes('review')) {
// // //       taskObj.status = 'review';
// // //     } else if (lowerTask.includes('in-progress') || lowerTask.includes('in progress')) {
// // //       taskObj.status = 'in-progress';
// // //     } else if (lowerTask.includes('todo') || lowerTask.includes('to do')) {
// // //       taskObj.status = 'todo';
// // //     }

// // //     // Extract hours - look for "Xh / Yh" pattern
// // //     const hoursMatch = taskString.match(/(\d+\.?\d*)\s*h\s*\/\s*(\d+\.?\d*)\s*h/);
// // //     if (hoursMatch) {
// // //       taskObj.loggedHours = parseFloat(hoursMatch[1]) || 0;
// // //       taskObj.estimatedHours = parseFloat(hoursMatch[2]) || 0;
// // //     }

// // //     // Extract priority
// // //     if (lowerTask.includes('high')) {
// // //       taskObj.priority = 'high';
// // //     } else if (lowerTask.includes('low')) {
// // //       taskObj.priority = 'low';
// // //     }

// // //     // Extract rework
// // //     const reworkMatch = taskString.match(/rework\s*#?\s*(\d+)/i);
// // //     if (reworkMatch) {
// // //       taskObj.rework = `Rework #${reworkMatch[1]}`;
// // //     }

// // //     // Extract project name from the task string if not provided
// // //     if (!taskObj.projectName) {
// // //       const projectMatch = taskString.match(/project[:\s]+([A-Za-z]+(?:\s+[A-Za-z]+)*)/i);
// // //       if (projectMatch) {
// // //         taskObj.projectName = projectMatch[1].trim();
// // //       }
// // //     }

// // //     // Clean up title - remove the metadata
// // //     const cleanTitle = taskString
// // //       .replace(/assignee[:\s]+[A-Za-z]+(?:\s+[A-Za-z]+)*/i, '')
// // //       .replace(/\d+\.?\d*\s*h\s*\/\s*\d+\.?\d*\s*h/, '')
// // //       .replace(/todo|in-progress|review|done/i, '')
// // //       .replace(/\s*-\s*/g, '')
// // //       .trim();
    
// // //     if (cleanTitle && cleanTitle.length > 0) {
// // //       taskObj.title = cleanTitle;
// // //     }

// // //     return taskObj;
// // //   } catch (error) {
// // //     console.error('Failed to parse task:', error);
// // //     return null;
// // //   }
// // // };

// // // // ✅ Get employee details
// // // const getEmployeeDetails = (name: string): TeamMember => {
// // //   const fallback = EMPLOYEE_DATA[name] || {};
// // //   return {
// // //     id: `emp-${Date.now()}`,
// // //     name: name,
// // //     role: fallback.role || 'Team Member',
// // //     email: fallback.email || `${name.toLowerCase().replace(' ', '.')}@company.com`,
// // //     phone: fallback.phone || '+1 (555) 123-4567',
// // //     department: fallback.department || 'Engineering',
// // //     joinDate: fallback.joinDate || '2024-01-01',
// // //     skills: fallback.skills || ['React', 'TypeScript', 'JavaScript', 'CSS'],
// // //     projects: [],
// // //     tasks: []
// // //   };
// // // };

// // // const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack, onProjectUpdate }) => {
// // //   const [project, setProject] = useState<Project | null>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(null);
// // //   const [showEmployeeModal, setShowEmployeeModal] = useState(false);
// // //   const [showDropdown, setShowDropdown] = useState(false);
// // //   const [showEditModal, setShowEditModal] = useState(false);
// // //   const [editFormData, setEditFormData] = useState<any>(null);
// // //   const [showTaskModal, setShowTaskModal] = useState(false);
// // //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);

// // //   // ✅ Format hours helper
// // //   const formatHours = (hours: number): string => {
// // //     const h = Math.floor(hours);
// // //     const m = Math.round((hours - h) * 60);
// // //     return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
// // //   };

// // //   useEffect(() => {
// // //     loadProject();
// // //   }, [projectId]);

// // //   const loadProject = () => {
// // //     try {
// // //       setLoading(true);
// // //       const savedProjects = localStorage.getItem('userProjects');
// // //       if (savedProjects) {
// // //         const parsed = JSON.parse(savedProjects);
// // //         const found = parsed.find((p: any) => p.id === projectId);
// // //         if (found) {
// // //           const tasks: Task[] = [];
// // //           const teamMemberMap = new Map<string, TeamMember>();
// // //           const activities: Activity[] = [];
// // //           let totalLoggedHours = 0;

// // //           if (found.tasks && found.tasks.length > 0) {
// // //             found.tasks.forEach((taskString: string) => {
// // //               const task = parseTaskString(taskString, found.projectName);
// // //               if (task) {
// // //                 tasks.push(task);
// // //                 totalLoggedHours += task.loggedHours || 0;

// // //                 // ✅ Add to team members if assignee exists
// // //                 const assigneeName = task.assignee || 'Unassigned';
// // //                 if (assigneeName !== 'Unassigned' && assigneeName !== 'undefined') {
// // //                   if (!teamMemberMap.has(assigneeName)) {
// // //                     const employee = getEmployeeDetails(assigneeName);
// // //                     employee.tasks = [];
// // //                     teamMemberMap.set(assigneeName, employee);
// // //                   }
// // //                   const member = teamMemberMap.get(assigneeName)!;
// // //                   member.tasks!.push(task);
// // //                 }
// // //               }
// // //             });
// // //           }

// // //           const loggedHoursStr = formatHours(totalLoggedHours);
// // //           const teamMembers = Array.from(teamMemberMap.values());

// // //           setProject({
// // //             ...found,
// // //             tasks: tasks,
// // //             teamMembers: teamMembers,
// // //             loggedHours: loggedHoursStr || found.loggedHours || '00:00'
// // //           });
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Failed to load project:', error);
// // //     }
// // //     setLoading(false);
// // //   };

// // //   // ✅ Handle Edit
// // //   const handleEdit = () => {
// // //     if (project) {
// // //       setEditFormData({
// // //         projectName: project.projectName,
// // //         description: project.description,
// // //         budget: project.budget,
// // //         rate: project.rate,
// // //         startDate: project.startDate,
// // //         endDate: project.endDate,
// // //         status: project.status,
// // //         billingMethod: project.billingMethod
// // //       });
// // //       setShowEditModal(true);
// // //       setShowDropdown(false);
// // //     }
// // //   };

// // //   // ✅ Handle Employee Click
// // //   const handleEmployeeClick = (employeeName: string) => {
// // //     if (project) {
// // //       const employee = project.teamMembers?.find(m => m.name === employeeName);
// // //       if (employee) {
// // //         setSelectedEmployee(employee);
// // //         setShowEmployeeModal(true);
// // //       }
// // //     }
// // //   };

// // //   // ✅ Handle Task click - just show details, no status update
// // //   const handleTaskClick = (task: Task) => {
// // //     setSelectedTask(task);
// // //     setShowTaskModal(true);
// // //   };

// // //   // ✅ Handle Save Edit
// // //   const handleSaveEdit = () => {
// // //     try {
// // //       const savedProjects = localStorage.getItem('userProjects');
// // //       if (savedProjects) {
// // //         const parsed = JSON.parse(savedProjects);
// // //         const index = parsed.findIndex((p: any) => p.id === projectId);
// // //         if (index !== -1) {
// // //           parsed[index] = {
// // //             ...parsed[index],
// // //             ...editFormData,
// // //             updatedAt: new Date().toISOString()
// // //           };
// // //           localStorage.setItem('userProjects', JSON.stringify(parsed));
// // //           setShowEditModal(false);
// // //           loadProject();
// // //           if (onProjectUpdate) onProjectUpdate();
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Failed to update project:', error);
// // //     }
// // //   };

// // //   // ✅ Handle Delete
// // //   const handleDelete = () => {
// // //     if (window.confirm('Are you sure you want to delete this project?')) {
// // //       try {
// // //         const savedProjects = localStorage.getItem('userProjects');
// // //         if (savedProjects) {
// // //           const parsed = JSON.parse(savedProjects);
// // //           const filtered = parsed.filter((p: any) => p.id !== projectId);
// // //           localStorage.setItem('userProjects', JSON.stringify(filtered));
// // //           if (onProjectUpdate) onProjectUpdate();
// // //           onBack();
// // //         }
// // //       } catch (error) {
// // //         console.error('Failed to delete project:', error);
// // //       }
// // //     }
// // //     setShowDropdown(false);
// // //   };

// // //   // ✅ Task Detail Modal - READ ONLY (status changes only via drag)
// // //   const TaskDetailModal = () => {
// // //     if (!selectedTask) return null;

// // //     return (
// // //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// // //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <h2 className="text-xl font-bold text-white">{selectedTask.title}</h2>
// // //                 <p className="text-blue-100">Task Details</p>
// // //               </div>
// // //               <button 
// // //                 onClick={() => setShowTaskModal(false)}
// // //                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
// // //               >
// // //                 <X className="w-5 h-5" />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           <div className="p-6 space-y-6">
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //               <div className="bg-gray-50 rounded-lg p-4">
// // //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // //                   <User className="w-4 h-4" />
// // //                   <span>Assignee</span>
// // //                 </div>
// // //                 <p className="text-gray-800 font-medium">{selectedTask.assignee || 'Unassigned'}</p>
// // //               </div>
// // //               <div className="bg-gray-50 rounded-lg p-4">
// // //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // //                   <Tag className="w-4 h-4" />
// // //                   <span>Status</span>
// // //                 </div>
// // //                 <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getTaskStatusColor(selectedTask.status)}`}>
// // //                   {getTaskStatusLabel(selectedTask.status)}
// // //                 </span>
// // //                 <p className="text-xs text-gray-400 mt-1">Update by dragging in task board</p>
// // //               </div>
// // //               <div className="bg-gray-50 rounded-lg p-4">
// // //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // //                   <Clock className="w-4 h-4" />
// // //                   <span>Hours</span>
// // //                 </div>
// // //                 <p className="text-gray-800">{selectedTask.loggedHours}h / {selectedTask.estimatedHours || '?'}h</p>
// // //               </div>
// // //               <div className="bg-gray-50 rounded-lg p-4">
// // //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // //                   <Award className="w-4 h-4" />
// // //                   <span>Priority</span>
// // //                 </div>
// // //                 <p className="text-gray-800 capitalize">{selectedTask.priority || 'Medium'}</p>
// // //               </div>
// // //             </div>

// // //             {selectedTask.description && (
// // //               <div>
// // //                 <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
// // //                 <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{selectedTask.description}</p>
// // //               </div>
// // //             )}

// // //             {selectedTask.rework && (
// // //               <div>
// // //                 <h4 className="text-sm font-medium text-gray-700 mb-2">Rework</h4>
// // //                 <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{selectedTask.rework}</p>
// // //               </div>
// // //             )}

// // //             {selectedTask.projectName && (
// // //               <div>
// // //                 <h4 className="text-sm font-medium text-gray-700 mb-2">Project</h4>
// // //                 <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{selectedTask.projectName}</p>
// // //               </div>
// // //             )}

// // //             <div className="flex gap-3 pt-4 border-t">
// // //               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
// // //                 <Edit className="w-4 h-4" />
// // //                 Edit Task
// // //               </button>
// // //               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
// // //                 <ActivityIcon className="w-4 h-4" />
// // //                 View History
// // //               </button>
// // //             </div>

// // //             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
// // //               <p className="text-xs text-yellow-700">
// // //                 💡 Tip: Drag this task in the task board to change its status
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   // ✅ Edit Project Modal
// // //   const EditProjectModal = () => {
// // //     if (!showEditModal || !editFormData) return null;

// // //     return (
// // //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// // //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
// // //             <div className="flex items-center justify-between">
// // //               <h2 className="text-xl font-bold text-white">Edit Project</h2>
// // //               <button 
// // //                 onClick={() => setShowEditModal(false)}
// // //                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
// // //               >
// // //                 <X className="w-5 h-5" />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           <div className="p-6 space-y-4">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
// // //               <input
// // //                 type="text"
// // //                 value={editFormData.projectName || ''}
// // //                 onChange={(e) => setEditFormData({...editFormData, projectName: e.target.value})}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
// // //               <textarea
// // //                 value={editFormData.description || ''}
// // //                 onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //                 rows={3}
// // //               />
// // //             </div>

// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
// // //                 <input
// // //                   type="number"
// // //                   value={editFormData.budget || ''}
// // //                   onChange={(e) => setEditFormData({...editFormData, budget: parseFloat(e.target.value) || 0})}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour ($)</label>
// // //                 <input
// // //                   type="number"
// // //                   value={editFormData.rate || ''}
// // //                   onChange={(e) => setEditFormData({...editFormData, rate: parseFloat(e.target.value) || 0})}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
// // //                 <input
// // //                   type="date"
// // //                   value={editFormData.startDate || ''}
// // //                   onChange={(e) => setEditFormData({...editFormData, startDate: e.target.value})}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
// // //                 <input
// // //                   type="date"
// // //                   value={editFormData.endDate || ''}
// // //                   onChange={(e) => setEditFormData({...editFormData, endDate: e.target.value})}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
// // //                 <select
// // //                   value={editFormData.status || 'active'}
// // //                   onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //                 >
// // //                   <option value="active">Active</option>
// // //                   <option value="inactive">Inactive</option>
// // //                   <option value="completed">Completed</option>
// // //                 </select>
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">Billing Method</label>
// // //                 <select
// // //                   value={editFormData.billingMethod || 'Based on Task Hours'}
// // //                   onChange={(e) => setEditFormData({...editFormData, billingMethod: e.target.value})}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //                 >
// // //                   <option value="Based on Task Hours">Based on Task Hours</option>
// // //                   <option value="Based on Project Hours">Based on Project Hours</option>
// // //                   <option value="Fixed Price">Fixed Price</option>
// // //                 </select>
// // //               </div>
// // //             </div>

// // //             <div className="flex gap-3 pt-4 border-t">
// // //               <button
// // //                 onClick={handleSaveEdit}
// // //                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
// // //               >
// // //                 <Save className="w-4 h-4" />
// // //                 Save Changes
// // //               </button>
// // //               <button
// // //                 onClick={() => setShowEditModal(false)}
// // //                 className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
// // //               >
// // //                 Cancel
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   // ✅ Employee Detail Modal
// // //   const EmployeeDetailModal = () => {
// // //     if (!selectedEmployee) return null;

// // //     return (
// // //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// // //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
// // //             <div className="flex items-center justify-between">
// // //               <div className="flex items-center gap-4">
// // //                 <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
// // //                   {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
// // //                 </div>
// // //                 <div>
// // //                   <h2 className="text-xl font-bold text-white">{selectedEmployee.name}</h2>
// // //                   <p className="text-blue-100">{selectedEmployee.role}</p>
// // //                 </div>
// // //               </div>
// // //               <button 
// // //                 onClick={() => setShowEmployeeModal(false)}
// // //                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
// // //               >
// // //                 <X className="w-5 h-5" />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           <div className="p-6 space-y-6">
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //               <div className="bg-gray-50 rounded-lg p-4">
// // //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // //                   <Mail className="w-4 h-4" />
// // //                   <span>Email</span>
// // //                 </div>
// // //                 <p className="text-gray-800">{selectedEmployee.email}</p>
// // //               </div>
// // //               {selectedEmployee.phone && (
// // //                 <div className="bg-gray-50 rounded-lg p-4">
// // //                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // //                     <Phone className="w-4 h-4" />
// // //                     <span>Phone</span>
// // //                   </div>
// // //                   <p className="text-gray-800">{selectedEmployee.phone}</p>
// // //                 </div>
// // //               )}
// // //               {selectedEmployee.department && (
// // //                 <div className="bg-gray-50 rounded-lg p-4">
// // //                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // //                     <Briefcase className="w-4 h-4" />
// // //                     <span>Department</span>
// // //                   </div>
// // //                   <p className="text-gray-800">{selectedEmployee.department}</p>
// // //                 </div>
// // //               )}
// // //               {selectedEmployee.joinDate && (
// // //                 <div className="bg-gray-50 rounded-lg p-4">
// // //                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// // //                     <Calendar className="w-4 h-4" />
// // //                     <span>Joined</span>
// // //                   </div>
// // //                   <p className="text-gray-800">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</p>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {selectedEmployee.skills && selectedEmployee.skills.length > 0 && (
// // //               <div>
// // //                 <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
// // //                   <Award className="w-4 h-4" />
// // //                   Skills
// // //                 </h4>
// // //                 <div className="flex flex-wrap gap-2">
// // //                   {selectedEmployee.skills.map((skill, index) => (
// // //                     <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
// // //                       {skill}
// // //                     </span>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {selectedEmployee.tasks && selectedEmployee.tasks.length > 0 && (
// // //               <div>
// // //                 <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
// // //                   <Tag className="w-4 h-4" />
// // //                   Assigned Tasks ({selectedEmployee.tasks.length})
// // //                 </h4>
// // //                 <div className="space-y-2">
// // //                   {selectedEmployee.tasks.map((task, index) => (
// // //                     <div 
// // //                       key={index} 
// // //                       className="bg-gray-50 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition"
// // //                       onClick={() => {
// // //                         setShowEmployeeModal(false);
// // //                         setSelectedTask(task);
// // //                         setShowTaskModal(true);
// // //                       }}
// // //                     >
// // //                       <span className="text-sm text-gray-800">{task.title}</span>
// // //                       <span className={`text-xs px-2 py-1 rounded-full ${getTaskStatusColor(task.status)}`}>
// // //                         {getTaskStatusLabel(task.status)}
// // //                       </span>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )}

// // //             <div className="flex gap-3 pt-4 border-t">
// // //               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
// // //                 <Mail className="w-4 h-4" />
// // //                 Send Message
// // //               </button>
// // //               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
// // //                 <Clock className="w-4 h-4" />
// // //                 View Activity
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center h-64">
// // //         <div className="text-gray-500">Loading project details...</div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!project) {
// // //     return (
// // //       <div className="p-6">
// // //         <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
// // //           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
// // //         </button>
// // //         <div className="text-center py-12 text-gray-500">Project not found</div>
// // //       </div>
// // //     );
// // //   }

// // //   const getStatusColor = (status: string) => {
// // //     switch(status) {
// // //       case 'active': return 'bg-green-100 text-green-800';
// // //       case 'inactive': return 'bg-gray-100 text-gray-800';
// // //       case 'completed': return 'bg-blue-100 text-blue-800';
// // //       default: return 'bg-gray-100 text-gray-800';
// // //     }
// // //   };

// // //   const getTaskStatusColor = (status: Task['status']) => {
// // //     switch(status) {
// // //       case 'todo': return 'bg-gray-100 text-gray-600';
// // //       case 'in-progress': return 'bg-yellow-100 text-yellow-800';
// // //       case 'review': return 'bg-purple-100 text-purple-800';
// // //       case 'done': return 'bg-green-100 text-green-800';
// // //       default: return 'bg-gray-100 text-gray-600';
// // //     }
// // //   };

// // //   const getTaskStatusLabel = (status: Task['status']) => {
// // //     switch(status) {
// // //       case 'todo': return 'To Do';
// // //       case 'in-progress': return 'In Progress';
// // //       case 'review': return 'Review';
// // //       case 'done': return 'Done';
// // //       default: return 'Unknown';
// // //     }
// // //   };

// // //   const getTaskStatusIcon = (status: Task['status']) => {
// // //     switch(status) {
// // //       case 'todo': return <ClockIcon className="w-3 h-3" />;
// // //       case 'in-progress': return <ActivityIcon className="w-3 h-3" />;
// // //       case 'review': return <AlertCircle className="w-3 h-3" />;
// // //       case 'done': return <CheckCircle className="w-3 h-3" />;
// // //       default: return null;
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
// // //       <button 
// // //         onClick={onBack} 
// // //         className="flex items-center text-gray-600 hover:text-blue-600 transition mb-4"
// // //       >
// // //         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
// // //       </button>

// // //       {/* Project Header */}
// // //       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
// // //         <div className="flex flex-wrap items-start justify-between gap-4">
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-gray-900">{project.projectName}</h1>
// // //             <p className="text-gray-500">Project ID: {project.id}</p>
// // //           </div>
// // //           <div className="flex items-center gap-3 relative">
// // //             <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
// // //               {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
// // //             </span>
            
// // //             <div className="relative">
// // //               <button 
// // //                 onClick={() => setShowDropdown(!showDropdown)}
// // //                 className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
// // //               >
// // //                 <MoreVertical className="w-5 h-5" />
// // //               </button>
              
// // //               {showDropdown && (
// // //                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
// // //                   <button
// // //                     onClick={handleEdit}
// // //                     className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-2"
// // //                   >
// // //                     <Edit className="w-4 h-4" />
// // //                     Edit Project
// // //                   </button>
// // //                   <button
// // //                     onClick={handleDelete}
// // //                     className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
// // //                   >
// // //                     <Trash2 className="w-4 h-4" />
// // //                     Delete Project
// // //                   </button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Stats Grid */}
// // //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
// // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// // //           <div className="text-sm text-gray-500">Total Hours</div>
// // //           <div className="text-2xl font-bold text-gray-900">{project.loggedHours || '00:00'}</div>
// // //         </div>
// // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// // //           <div className="text-sm text-gray-500">Budget</div>
// // //           <div className="text-2xl font-bold text-gray-900">${project.budget?.toFixed(2) || '0.00'}</div>
// // //         </div>
// // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// // //           <div className="text-sm text-gray-500">Revenue</div>
// // //           <div className="text-2xl font-bold text-green-600">
// // //             ${project.budget ? (project.budget * 0.9).toFixed(2) : '0.00'}
// // //           </div>
// // //         </div>
// // //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// // //           <div className="text-sm text-gray-500">Team Members</div>
// // //           <div className="text-2xl font-bold text-gray-900">{project.teamMembers?.length || 0}</div>
// // //         </div>
// // //       </div>

// // //       {/* Project Description */}
// // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
// // //         <h3 className="font-semibold text-gray-800 mb-2">Project Description</h3>
// // //         <p className="text-gray-600">{project.description || 'No description provided'}</p>
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
// // //           <div>
// // //             <span className="text-sm text-gray-500">Billing Method</span>
// // //             <p className="font-medium">{project.billingMethod || 'Not specified'}</p>
// // //           </div>
// // //           <div>
// // //             <span className="text-sm text-gray-500">Rate Per Hour</span>
// // //             <p className="font-medium">{project.rate ? `$${project.rate.toFixed(2)}/hr` : 'Not specified'}</p>
// // //           </div>
// // //           <div>
// // //             <span className="text-sm text-gray-500">Start Date</span>
// // //             <p className="font-medium">{project.startDate || 'Not specified'}</p>
// // //           </div>
// // //           <div>
// // //             <span className="text-sm text-gray-500">End Date</span>
// // //             <p className="font-medium">{project.endDate || 'Not specified'}</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Tasks Section */}
// // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
// // //         <h3 className="font-semibold text-gray-800 mb-4">Tasks ({project.tasks?.length || 0})</h3>
// // //         {project.tasks && project.tasks.length > 0 ? (
// // //           <div className="space-y-3">
// // //             {project.tasks.map((task, index) => (
// // //               <div 
// // //                 key={index} 
// // //                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition group"
// // //                 onClick={() => handleTaskClick(task)}
// // //               >
// // //                 <div>
// // //                   <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">
// // //                     {task.title}
// // //                   </p>
// // //                   <p className="text-sm text-gray-500 flex items-center gap-2">
// // //                     <User className="w-3 h-3" />
// // //                     Assignee: {task.assignee && task.assignee !== 'Unassigned' ? task.assignee : 'Unassigned'}
// // //                     {(task.loggedHours > 0 || task.estimatedHours > 0) && (
// // //                       <span className="ml-2 text-xs text-gray-400">
// // //                         {task.loggedHours}h / {task.estimatedHours || '?'}h
// // //                       </span>
// // //                     )}
// // //                   </p>
// // //                 </div>
// // //                 <div className="flex items-center gap-2">
// // //                   <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${getTaskStatusColor(task.status)}`}>
// // //                     {getTaskStatusIcon(task.status)}
// // //                     {getTaskStatusLabel(task.status)}
// // //                   </span>
// // //                   <span className="text-xs text-gray-400">↕ drag to change</span>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         ) : (
// // //           <p className="text-gray-500">No tasks assigned</p>
// // //         )}
// // //       </div>

// // //       {/* Team Members Section */}
// // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
// // //         <h3 className="font-semibold text-gray-800 mb-4">
// // //           Team Members ({project.teamMembers?.length || 0})
// // //         </h3>
// // //         <div className="space-y-3">
// // //           {project.teamMembers && project.teamMembers.length > 0 ? (
// // //             project.teamMembers.map((member) => (
// // //               <div 
// // //                 key={member.id}
// // //                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition group"
// // //                 onClick={() => handleEmployeeClick(member.name)}
// // //               >
// // //                 <div className="flex items-center gap-3">
// // //                   <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-medium">
// // //                     {member.name.split(' ').map(n => n[0]).join('')}
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">
// // //                       {member.name}
// // //                     </p>
// // //                     <p className="text-sm text-gray-500">
// // //                       {member.role || 'Team Member'}
// // //                       {member.tasks && member.tasks.length > 0 && (
// // //                         <span className="ml-2 text-xs text-gray-400">
// // //                           ({member.tasks.length} tasks)
// // //                         </span>
// // //                       )}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //                 <button className="text-blue-600 opacity-0 group-hover:opacity-100 transition">
// // //                   View Profile →
// // //                 </button>
// // //               </div>
// // //             ))
// // //           ) : (
// // //             <p className="text-gray-500">No team members assigned</p>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Recent Activity */}
// // //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
// // //         <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
// // //         <div className="text-gray-500 text-sm">
// // //           Activity will appear here when tasks are dragged and dropped
// // //         </div>
// // //       </div>

// // //       {/* Modals */}
// // //       <EditProjectModal />
// // //       <EmployeeDetailModal />
// // //       <TaskDetailModal />
// // //     </div>
// // //   );
// // // };

// // // export default ProjectDetail;
// // // src/client/components/projects/ProjectDetail.tsx

// // import React, { useState, useEffect } from 'react';
// // import { 
// //   ArrowLeft, 
// //   Clock, 
// //   DollarSign, 
// //   Users, 
// //   Calendar, 
// //   Tag,
// //   Mail,
// //   Briefcase,
// //   Phone,
// //   Award,
// //   Edit,
// //   MoreVertical,
// //   X,
// //   CheckCircle,
// //   AlertCircle,
// //   Clock as ClockIcon,
// //   User,
// //   Activity as ActivityIcon,
// //   Trash2,
// //   Save
// // } from 'lucide-react';

// // interface Project {
// //   id: string;
// //   customerName: string;
// //   projectName: string;
// //   billingMethod: string;
// //   rate: number | null;
// //   status: 'active' | 'inactive' | 'completed';
// //   loggedHours: string;
// //   budget: number | null;
// //   startDate: string;
// //   endDate: string;
// //   description: string;
// //   createdAt: string;
// //   updatedAt: string;
// //   tasks?: Task[];
// //   teamMembers?: TeamMember[];
// //   recentActivity?: Activity[];
// // }

// // interface Task {
// //   id: string;
// //   title: string;
// //   assignee: string;
// //   assigneeEmail?: string;
// //   department?: string;
// //   status: 'todo' | 'in-progress' | 'review' | 'done';
// //   dueDate?: string;
// //   loggedHours: number;
// //   estimatedHours: number;
// //   description?: string;
// //   priority?: 'low' | 'medium' | 'high';
// //   projectName?: string;
// //   rework?: string;
// //   actualHours?: number;
// //   rawString?: string; // Store the original string for updates
// // }

// // interface TeamMember {
// //   id: string;
// //   name: string;
// //   role: string;
// //   email: string;
// //   phone?: string;
// //   department?: string;
// //   joinDate?: string;
// //   skills?: string[];
// //   projects?: string[];
// //   tasks?: Task[];
// // }

// // interface Activity {
// //   id: string;
// //   user: string;
// //   action: string;
// //   timestamp: string;
// //   details?: string;
// //   type?: 'task' | 'comment' | 'update' | 'status_change';
// // }

// // interface ProjectDetailProps {
// //   projectId: string;
// //   onBack: () => void;
// //   onProjectUpdate?: () => void;
// // }

// // // ✅ Employee data mapping
// // const EMPLOYEE_DATA: Record<string, Partial<TeamMember>> = {
// //   'Patricia Boyle': {
// //     role: 'Lead Designer',
// //     email: 'patricia.boyle@company.com',
// //     phone: '+1 (555) 123-4567',
// //     department: 'Design',
// //     skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Design Systems', 'Prototyping'],
// //     joinDate: '2023-01-15'
// //   },
// //   'John Doe': {
// //     role: 'Senior Developer',
// //     email: 'john.doe@company.com',
// //     phone: '+1 (555) 234-5678',
// //     department: 'Engineering',
// //     skills: ['React', 'TypeScript', 'Node.js', 'API Design', 'Database'],
// //     joinDate: '2023-03-10'
// //   },
// //   'Jane Smith': {
// //     role: 'QA Tester',
// //     email: 'jane.smith@company.com',
// //     phone: '+1 (555) 345-6789',
// //     department: 'Quality Assurance',
// //     skills: ['Manual Testing', 'Automation', 'Selenium', 'Test Planning'],
// //     joinDate: '2023-06-01'
// //   },
// //   'subahree': {
// //     role: 'Developer',
// //     email: 'subahree@company.com',
// //     phone: '+1 (555) 456-7890',
// //     department: 'Engineering',
// //     skills: ['React', 'TypeScript', 'Node.js', 'API Design'],
// //     joinDate: '2023-04-01'
// //   }
// // };

// // // ✅ Parse task from stored string format
// // const parseTaskString = (taskString: string, projectName?: string): Task | null => {
// //   try {
// //     // If it's already a JSON string
// //     if (taskString.startsWith('{')) {
// //       const parsed = JSON.parse(taskString);
// //       return {
// //         id: parsed.id || `task-${Date.now()}`,
// //         title: parsed.title || parsed.name || 'Untitled Task',
// //         assignee: parsed.assignee || parsed.assignedTo || 'Unassigned',
// //         assigneeEmail: parsed.assigneeEmail || parsed.email || null,
// //         status: parsed.status || 'todo',
// //         loggedHours: parsed.loggedHours || parsed.hours || 0,
// //         estimatedHours: parsed.estimatedHours || parsed.estimate || 0,
// //         dueDate: parsed.dueDate || parsed.due || null,
// //         department: parsed.department || null,
// //         description: parsed.description || null,
// //         priority: parsed.priority || 'medium',
// //         projectName: parsed.projectName || projectName,
// //         rework: parsed.rework || null,
// //         actualHours: parsed.actualHours || 0,
// //         rawString: taskString
// //       };
// //     }

// //     // Clean the string - remove multiple spaces and normalize
// //     const cleanString = taskString.replace(/\s+/g, ' ').trim();
    
// //     const taskObj: Task = {
// //       id: `task-${Date.now()}`,
// //       title: 'Untitled Task',
// //       assignee: 'Unassigned',
// //       status: 'todo',
// //       loggedHours: 0,
// //       estimatedHours: 0,
// //       priority: 'medium',
// //       projectName: projectName,
// //       rawString: taskString
// //     };

// //     // Try to find the task title
// //     let titleMatch = cleanString.match(/^(.*?)(?:\s*assignee|$)/i);
// //     if (titleMatch && titleMatch[1]) {
// //       taskObj.title = titleMatch[1].trim();
// //     }

// //     // Extract assignee
// //     const assigneeMatch = cleanString.match(/assignee[:\s]+([A-Za-z]+(?:\s+[A-Za-z]+)*)/i);
// //     if (assigneeMatch && assigneeMatch[1]) {
// //       taskObj.assignee = assigneeMatch[1].trim();
// //     }

// //     // Extract status
// //     const lowerString = cleanString.toLowerCase();
// //     if (lowerString.includes('done')) {
// //       taskObj.status = 'done';
// //     } else if (lowerString.includes('review')) {
// //       taskObj.status = 'review';
// //     } else if (lowerString.includes('in-progress') || lowerString.includes('in progress')) {
// //       taskObj.status = 'in-progress';
// //     } else if (lowerString.includes('todo') || lowerString.includes('to do')) {
// //       taskObj.status = 'todo';
// //     }

// //     // Extract hours
// //     const hoursMatch = cleanString.match(/(\d+\.?\d*)\s*h\s*\/\s*(\d+\.?\d*)\s*h/);
// //     if (hoursMatch) {
// //       taskObj.loggedHours = parseFloat(hoursMatch[1]) || 0;
// //       taskObj.estimatedHours = parseFloat(hoursMatch[2]) || 0;
// //     }

// //     return taskObj;
// //   } catch (error) {
// //     console.error('Failed to parse task:', error);
// //     return null;
// //   }
// // };

// // // ✅ Get employee details
// // const getEmployeeDetails = (name: string): TeamMember => {
// //   const fallback = EMPLOYEE_DATA[name] || {};
// //   return {
// //     id: `emp-${Date.now()}`,
// //     name: name,
// //     role: fallback.role || 'Team Member',
// //     email: fallback.email || `${name.toLowerCase().replace(' ', '.')}@company.com`,
// //     phone: fallback.phone || '+1 (555) 123-4567',
// //     department: fallback.department || 'Engineering',
// //     joinDate: fallback.joinDate || '2024-01-01',
// //     skills: fallback.skills || ['React', 'TypeScript', 'JavaScript', 'CSS'],
// //     projects: [],
// //     tasks: []
// //   };
// // };

// // const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack, onProjectUpdate }) => {
// //   const [project, setProject] = useState<Project | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(null);
// //   const [showEmployeeModal, setShowEmployeeModal] = useState(false);
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [showEditModal, setShowEditModal] = useState(false);
// //   const [editFormData, setEditFormData] = useState<any>(null);
// //   const [showTaskModal, setShowTaskModal] = useState(false);
// //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);

// //   // ✅ Format hours helper
// //   const formatHours = (hours: number): string => {
// //     const h = Math.floor(hours);
// //     const m = Math.round((hours - h) * 60);
// //     return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
// //   };

// //   useEffect(() => {
// //     loadProject();
    
// //     // ✅ Listen for storage changes
// //     const handleStorageChange = (e: StorageEvent) => {
// //       if (e.key === 'userProjects') {
// //         loadProject();
// //       }
// //     };
    
// //     window.addEventListener('storage', handleStorageChange);
    
// //     // ✅ Poll every 1 second for changes (more frequent)
// //     const interval = setInterval(() => {
// //       loadProject();
// //     }, 1000);
    
// //     return () => {
// //       window.removeEventListener('storage', handleStorageChange);
// //       clearInterval(interval);
// //     };
// //   }, [projectId]);

// //   // ✅ Expose a method to force refresh from parent
// //   useEffect(() => {
// //     // If onProjectUpdate is called, reload
// //     if (onProjectUpdate) {
// //       // Wrap the original onProjectUpdate
// //       const originalUpdate = onProjectUpdate;
// //       // We'll use it to trigger reload
// //     }
// //   }, [onProjectUpdate]);

// //   const loadProject = () => {
// //     try {
// //       setLoading(true);
// //       const savedProjects = localStorage.getItem('userProjects');
// //       if (savedProjects) {
// //         const parsed = JSON.parse(savedProjects);
// //         const found = parsed.find((p: any) => p.id === projectId);
// //         if (found) {
// //           const tasks: Task[] = [];
// //           const teamMemberMap = new Map<string, TeamMember>();
// //           const activities: Activity[] = [];
// //           let totalLoggedHours = 0;

// //           if (found.tasks && found.tasks.length > 0) {
// //             found.tasks.forEach((taskString: string) => {
// //               const task = parseTaskString(taskString, found.projectName);
// //               if (task) {
// //                 tasks.push(task);
// //                 totalLoggedHours += task.loggedHours || 0;

// //                 // ✅ Add to team members based on assignee
// //                 const assigneeName = task.assignee || 'Unassigned';
// //                 if (assigneeName !== 'Unassigned' && assigneeName !== 'undefined') {
// //                   if (!teamMemberMap.has(assigneeName)) {
// //                     const employee = getEmployeeDetails(assigneeName);
// //                     employee.tasks = [];
// //                     teamMemberMap.set(assigneeName, employee);
// //                   }
// //                   const member = teamMemberMap.get(assigneeName)!;
// //                   member.tasks!.push(task);
// //                 }

// //                 // ✅ Create activity for each task with its status
// //                 const statusMap: Record<string, string> = {
// //                   'todo': 'created',
// //                   'in-progress': 'started working on',
// //                   'review': 'sent for review',
// //                   'done': 'completed'
// //                 };
// //                 const action = statusMap[task.status] || 'updated';
// //                 activities.push({
// //                   id: `act-${Date.now()}-${Math.random()}`,
// //                   user: task.assignee && task.assignee !== 'Unassigned' ? task.assignee : 'System',
// //                   action: `${action} task: "${task.title}" (${getStatusLabel(task.status)})`,
// //                   timestamp: new Date().toISOString(),
// //                   type: task.status === 'done' ? 'status_change' : 'task'
// //                 });
// //               }
// //             });
// //           }

// //           const loggedHoursStr = formatHours(totalLoggedHours);
// //           const teamMembers = Array.from(teamMemberMap.values());

// //           setProject({
// //             ...found,
// //             tasks: tasks,
// //             teamMembers: teamMembers,
// //             loggedHours: loggedHoursStr || found.loggedHours || '00:00',
// //             recentActivity: activities.length > 0 ? activities.slice(0, 20) : [
// //               { 
// //                 id: '1', 
// //                 user: 'System', 
// //                 action: 'Project created', 
// //                 timestamp: found.createdAt || new Date().toISOString(),
// //                 type: 'update'
// //               }
// //             ]
// //           });
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Failed to load project:', error);
// //     }
// //     setLoading(false);
// //   };

// //   // ✅ Helper to get status label
// //   const getStatusLabel = (status: string): string => {
// //     switch(status) {
// //       case 'todo': return 'To Do';
// //       case 'in-progress': return 'In Progress';
// //       case 'review': return 'Review';
// //       case 'done': return 'Done';
// //       default: return status;
// //     }
// //   };

// //   // ✅ Handle Edit
// //   const handleEdit = () => {
// //     if (project) {
// //       setEditFormData({
// //         projectName: project.projectName,
// //         description: project.description,
// //         budget: project.budget,
// //         rate: project.rate,
// //         startDate: project.startDate,
// //         endDate: project.endDate,
// //         status: project.status,
// //         billingMethod: project.billingMethod
// //       });
// //       setShowEditModal(true);
// //       setShowDropdown(false);
// //     }
// //   };

// //   // ✅ Handle Employee Click
// //   const handleEmployeeClick = (employeeName: string) => {
// //     if (project) {
// //       const employee = project.teamMembers?.find(m => m.name === employeeName);
// //       if (employee) {
// //         setSelectedEmployee(employee);
// //         setShowEmployeeModal(true);
// //       }
// //     }
// //   };

// //   // ✅ Handle Task click
// //   const handleTaskClick = (task: Task) => {
// //     setSelectedTask(task);
// //     setShowTaskModal(true);
// //   };

// //   // ✅ Handle Save Edit
// //   const handleSaveEdit = () => {
// //     try {
// //       const savedProjects = localStorage.getItem('userProjects');
// //       if (savedProjects) {
// //         const parsed = JSON.parse(savedProjects);
// //         const index = parsed.findIndex((p: any) => p.id === projectId);
// //         if (index !== -1) {
// //           parsed[index] = {
// //             ...parsed[index],
// //             ...editFormData,
// //             updatedAt: new Date().toISOString()
// //           };
// //           localStorage.setItem('userProjects', JSON.stringify(parsed));
// //           setShowEditModal(false);
// //           loadProject();
// //           if (onProjectUpdate) onProjectUpdate();
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Failed to update project:', error);
// //     }
// //   };

// //   // ✅ Handle Delete
// //   const handleDelete = () => {
// //     if (window.confirm('Are you sure you want to delete this project?')) {
// //       try {
// //         const savedProjects = localStorage.getItem('userProjects');
// //         if (savedProjects) {
// //           const parsed = JSON.parse(savedProjects);
// //           const filtered = parsed.filter((p: any) => p.id !== projectId);
// //           localStorage.setItem('userProjects', JSON.stringify(filtered));
// //           if (onProjectUpdate) onProjectUpdate();
// //           onBack();
// //         }
// //       } catch (error) {
// //         console.error('Failed to delete project:', error);
// //       }
// //     }
// //     setShowDropdown(false);
// //   };

// //   // ✅ Task Detail Modal
// //   const TaskDetailModal = () => {
// //     if (!selectedTask) return null;

// //     return (
// //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <h2 className="text-xl font-bold text-white">{selectedTask.title}</h2>
// //                 <p className="text-blue-100">Task Details</p>
// //               </div>
// //               <button 
// //                 onClick={() => setShowTaskModal(false)}
// //                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
// //               >
// //                 <X className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>

// //           <div className="p-6 space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div className="bg-gray-50 rounded-lg p-4">
// //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// //                   <User className="w-4 h-4" />
// //                   <span>Assignee</span>
// //                 </div>
// //                 <p className="text-gray-800 font-medium">{selectedTask.assignee || 'Unassigned'}</p>
// //               </div>
// //               <div className="bg-gray-50 rounded-lg p-4">
// //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// //                   <Tag className="w-4 h-4" />
// //                   <span>Status</span>
// //                 </div>
// //                 <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getTaskStatusColor(selectedTask.status)}`}>
// //                   {getTaskStatusLabel(selectedTask.status)}
// //                 </span>
// //                 <p className="text-xs text-gray-400 mt-1">Update by dragging in task board</p>
// //               </div>
// //               <div className="bg-gray-50 rounded-lg p-4">
// //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// //                   <Clock className="w-4 h-4" />
// //                   <span>Hours</span>
// //                 </div>
// //                 <p className="text-gray-800">{selectedTask.loggedHours}h / {selectedTask.estimatedHours || '?'}h</p>
// //               </div>
// //               <div className="bg-gray-50 rounded-lg p-4">
// //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// //                   <Award className="w-4 h-4" />
// //                   <span>Priority</span>
// //                 </div>
// //                 <p className="text-gray-800 capitalize">{selectedTask.priority || 'Medium'}</p>
// //               </div>
// //             </div>

// //             {selectedTask.projectName && (
// //               <div>
// //                 <h4 className="text-sm font-medium text-gray-700 mb-2">Project</h4>
// //                 <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{selectedTask.projectName}</p>
// //               </div>
// //             )}

// //             <div className="flex gap-3 pt-4 border-t">
// //               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
// //                 <Edit className="w-4 h-4" />
// //                 Edit Task
// //               </button>
// //               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
// //                 <ActivityIcon className="w-4 h-4" />
// //                 View History
// //               </button>
// //             </div>

// //             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
// //               <p className="text-xs text-yellow-700">
// //                 💡 Tip: Drag this task in the task board to change its status
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // ✅ Edit Project Modal
// //   const EditProjectModal = () => {
// //     if (!showEditModal || !editFormData) return null;

// //     return (
// //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
// //             <div className="flex items-center justify-between">
// //               <h2 className="text-xl font-bold text-white">Edit Project</h2>
// //               <button 
// //                 onClick={() => setShowEditModal(false)}
// //                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
// //               >
// //                 <X className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>

// //           <div className="p-6 space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
// //               <input
// //                 type="text"
// //                 value={editFormData.projectName || ''}
// //                 onChange={(e) => setEditFormData({...editFormData, projectName: e.target.value})}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
// //               <textarea
// //                 value={editFormData.description || ''}
// //                 onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 rows={3}
// //               />
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
// //                 <input
// //                   type="number"
// //                   value={editFormData.budget || ''}
// //                   onChange={(e) => setEditFormData({...editFormData, budget: parseFloat(e.target.value) || 0})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour ($)</label>
// //                 <input
// //                   type="number"
// //                   value={editFormData.rate || ''}
// //                   onChange={(e) => setEditFormData({...editFormData, rate: parseFloat(e.target.value) || 0})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 />
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
// //                 <input
// //                   type="date"
// //                   value={editFormData.startDate || ''}
// //                   onChange={(e) => setEditFormData({...editFormData, startDate: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
// //                 <input
// //                   type="date"
// //                   value={editFormData.endDate || ''}
// //                   onChange={(e) => setEditFormData({...editFormData, endDate: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 />
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
// //                 <select
// //                   value={editFormData.status || 'active'}
// //                   onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 >
// //                   <option value="active">Active</option>
// //                   <option value="inactive">Inactive</option>
// //                   <option value="completed">Completed</option>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Billing Method</label>
// //                 <select
// //                   value={editFormData.billingMethod || 'Based on Task Hours'}
// //                   onChange={(e) => setEditFormData({...editFormData, billingMethod: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 >
// //                   <option value="Based on Task Hours">Based on Task Hours</option>
// //                   <option value="Based on Project Hours">Based on Project Hours</option>
// //                   <option value="Fixed Price">Fixed Price</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="flex gap-3 pt-4 border-t">
// //               <button
// //                 onClick={handleSaveEdit}
// //                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
// //               >
// //                 <Save className="w-4 h-4" />
// //                 Save Changes
// //               </button>
// //               <button
// //                 onClick={() => setShowEditModal(false)}
// //                 className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // ✅ Employee Detail Modal
// //   const EmployeeDetailModal = () => {
// //     if (!selectedEmployee) return null;

// //     return (
// //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center gap-4">
// //                 <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
// //                   {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
// //                 </div>
// //                 <div>
// //                   <h2 className="text-xl font-bold text-white">{selectedEmployee.name}</h2>
// //                   <p className="text-blue-100">{selectedEmployee.role}</p>
// //                 </div>
// //               </div>
// //               <button 
// //                 onClick={() => setShowEmployeeModal(false)}
// //                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
// //               >
// //                 <X className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>

// //           <div className="p-6 space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div className="bg-gray-50 rounded-lg p-4">
// //                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// //                   <Mail className="w-4 h-4" />
// //                   <span>Email</span>
// //                 </div>
// //                 <p className="text-gray-800">{selectedEmployee.email}</p>
// //               </div>
// //               {selectedEmployee.phone && (
// //                 <div className="bg-gray-50 rounded-lg p-4">
// //                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// //                     <Phone className="w-4 h-4" />
// //                     <span>Phone</span>
// //                   </div>
// //                   <p className="text-gray-800">{selectedEmployee.phone}</p>
// //                 </div>
// //               )}
// //               {selectedEmployee.department && (
// //                 <div className="bg-gray-50 rounded-lg p-4">
// //                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// //                     <Briefcase className="w-4 h-4" />
// //                     <span>Department</span>
// //                   </div>
// //                   <p className="text-gray-800">{selectedEmployee.department}</p>
// //                 </div>
// //               )}
// //               {selectedEmployee.joinDate && (
// //                 <div className="bg-gray-50 rounded-lg p-4">
// //                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
// //                     <Calendar className="w-4 h-4" />
// //                     <span>Joined</span>
// //                   </div>
// //                   <p className="text-gray-800">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</p>
// //                 </div>
// //               )}
// //             </div>

// //             {selectedEmployee.skills && selectedEmployee.skills.length > 0 && (
// //               <div>
// //                 <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
// //                   <Award className="w-4 h-4" />
// //                   Skills
// //                 </h4>
// //                 <div className="flex flex-wrap gap-2">
// //                   {selectedEmployee.skills.map((skill, index) => (
// //                     <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
// //                       {skill}
// //                     </span>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {selectedEmployee.tasks && selectedEmployee.tasks.length > 0 && (
// //               <div>
// //                 <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
// //                   <Tag className="w-4 h-4" />
// //                   Assigned Tasks ({selectedEmployee.tasks.length})
// //                 </h4>
// //                 <div className="space-y-2">
// //                   {selectedEmployee.tasks.map((task, index) => (
// //                     <div 
// //                       key={index} 
// //                       className="bg-gray-50 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition"
// //                       onClick={() => {
// //                         setShowEmployeeModal(false);
// //                         setSelectedTask(task);
// //                         setShowTaskModal(true);
// //                       }}
// //                     >
// //                       <span className="text-sm text-gray-800">{task.title}</span>
// //                       <span className={`text-xs px-2 py-1 rounded-full ${getTaskStatusColor(task.status)}`}>
// //                         {getTaskStatusLabel(task.status)}
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             <div className="flex gap-3 pt-4 border-t">
// //               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
// //                 <Mail className="w-4 h-4" />
// //                 Send Message
// //               </button>
// //               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
// //                 <Clock className="w-4 h-4" />
// //                 View Activity
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-64">
// //         <div className="text-gray-500">Loading project details...</div>
// //       </div>
// //     );
// //   }

// //   if (!project) {
// //     return (
// //       <div className="p-6">
// //         <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
// //           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
// //         </button>
// //         <div className="text-center py-12 text-gray-500">Project not found</div>
// //       </div>
// //     );
// //   }

// //   const getStatusColor = (status: string) => {
// //     switch(status) {
// //       case 'active': return 'bg-green-100 text-green-800';
// //       case 'inactive': return 'bg-gray-100 text-gray-800';
// //       case 'completed': return 'bg-blue-100 text-blue-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   const getTaskStatusColor = (status: Task['status']) => {
// //     switch(status) {
// //       case 'todo': return 'bg-gray-100 text-gray-600';
// //       case 'in-progress': return 'bg-yellow-100 text-yellow-800';
// //       case 'review': return 'bg-purple-100 text-purple-800';
// //       case 'done': return 'bg-green-100 text-green-800';
// //       default: return 'bg-gray-100 text-gray-600';
// //     }
// //   };

// //   const getTaskStatusLabel = (status: Task['status']) => {
// //     switch(status) {
// //       case 'todo': return 'To Do';
// //       case 'in-progress': return 'In Progress';
// //       case 'review': return 'Review';
// //       case 'done': return 'Done';
// //       default: return 'Unknown';
// //     }
// //   };

// //   const getTaskStatusIcon = (status: Task['status']) => {
// //     switch(status) {
// //       case 'todo': return <ClockIcon className="w-3 h-3" />;
// //       case 'in-progress': return <ActivityIcon className="w-3 h-3" />;
// //       case 'review': return <AlertCircle className="w-3 h-3" />;
// //       case 'done': return <CheckCircle className="w-3 h-3" />;
// //       default: return null;
// //     }
// //   };

// //   return (
// //     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
// //       <button 
// //         onClick={onBack} 
// //         className="flex items-center text-gray-600 hover:text-blue-600 transition mb-4"
// //       >
// //         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
// //       </button>

// //       {/* Project Header */}
// //       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
// //         <div className="flex flex-wrap items-start justify-between gap-4">
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-900">{project.projectName}</h1>
// //             <p className="text-gray-500">Project ID: {project.id}</p>
// //           </div>
// //           <div className="flex items-center gap-3 relative">
// //             <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
// //               {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
// //             </span>
            
// //             <div className="relative">
// //               <button 
// //                 onClick={() => setShowDropdown(!showDropdown)}
// //                 className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
// //               >
// //                 <MoreVertical className="w-5 h-5" />
// //               </button>
              
// //               {showDropdown && (
// //                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
// //                   <button
// //                     onClick={handleEdit}
// //                     className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-2"
// //                   >
// //                     <Edit className="w-4 h-4" />
// //                     Edit Project
// //                   </button>
// //                   <button
// //                     onClick={handleDelete}
// //                     className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
// //                   >
// //                     <Trash2 className="w-4 h-4" />
// //                     Delete Project
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Stats Grid */}
// //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// //           <div className="text-sm text-gray-500">Total Hours</div>
// //           <div className="text-2xl font-bold text-gray-900">{project.loggedHours || '00:00'}</div>
// //         </div>
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// //           <div className="text-sm text-gray-500">Budget</div>
// //           <div className="text-2xl font-bold text-gray-900">${project.budget?.toFixed(2) || '0.00'}</div>
// //         </div>
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// //           <div className="text-sm text-gray-500">Revenue</div>
// //           <div className="text-2xl font-bold text-green-600">
// //             ${project.budget ? (project.budget * 0.9).toFixed(2) : '0.00'}
// //           </div>
// //         </div>
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
// //           <div className="text-sm text-gray-500">Team Members</div>
// //           <div className="text-2xl font-bold text-gray-900">{project.teamMembers?.length || 0}</div>
// //         </div>
// //       </div>

// //       {/* Project Description */}
// //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
// //         <h3 className="font-semibold text-gray-800 mb-2">Project Description</h3>
// //         <p className="text-gray-600">{project.description || 'No description provided'}</p>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
// //           <div>
// //             <span className="text-sm text-gray-500">Billing Method</span>
// //             <p className="font-medium">{project.billingMethod || 'Not specified'}</p>
// //           </div>
// //           <div>
// //             <span className="text-sm text-gray-500">Rate Per Hour</span>
// //             <p className="font-medium">{project.rate ? `$${project.rate.toFixed(2)}/hr` : 'Not specified'}</p>
// //           </div>
// //           <div>
// //             <span className="text-sm text-gray-500">Start Date</span>
// //             <p className="font-medium">{project.startDate || 'Not specified'}</p>
// //           </div>
// //           <div>
// //             <span className="text-sm text-gray-500">End Date</span>
// //             <p className="font-medium">{project.endDate || 'Not specified'}</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Tasks Section */}
// //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
// //         <h3 className="font-semibold text-gray-800 mb-4">Tasks ({project.tasks?.length || 0})</h3>
// //         {project.tasks && project.tasks.length > 0 ? (
// //           <div className="space-y-3">
// //             {project.tasks.map((task, index) => (
// //               <div 
// //                 key={index} 
// //                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition group"
// //                 onClick={() => handleTaskClick(task)}
// //               >
// //                 <div>
// //                   <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">
// //                     {task.title}
// //                   </p>
// //                   <p className="text-sm text-gray-500 flex items-center gap-2">
// //                     <User className="w-3 h-3" />
// //                     Assignee: {task.assignee && task.assignee !== 'Unassigned' ? task.assignee : 'Unassigned'}
// //                     {(task.loggedHours > 0 || task.estimatedHours > 0) && (
// //                       <span className="ml-2 text-xs text-gray-400">
// //                         {task.loggedHours}h / {task.estimatedHours || '?'}h
// //                       </span>
// //                     )}
// //                   </p>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${getTaskStatusColor(task.status)}`}>
// //                     {getTaskStatusIcon(task.status)}
// //                     {getTaskStatusLabel(task.status)}
// //                   </span>
// //                   <span className="text-xs text-gray-400">↕</span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <p className="text-gray-500">No tasks assigned</p>
// //         )}
// //       </div>

// //       {/* Team Members Section */}
// //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
// //         <h3 className="font-semibold text-gray-800 mb-4">
// //           Team Members ({project.teamMembers?.length || 0})
// //         </h3>
// //         <div className="space-y-3">
// //           {project.teamMembers && project.teamMembers.length > 0 ? (
// //             project.teamMembers.map((member) => (
// //               <div 
// //                 key={member.id}
// //                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition group"
// //                 onClick={() => handleEmployeeClick(member.name)}
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-medium">
// //                     {member.name.split(' ').map(n => n[0]).join('')}
// //                   </div>
// //                   <div>
// //                     <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">
// //                       {member.name}
// //                     </p>
// //                     <p className="text-sm text-gray-500">
// //                       {member.role || 'Team Member'}
// //                       {member.tasks && member.tasks.length > 0 && (
// //                         <span className="ml-2 text-xs text-gray-400">
// //                           ({member.tasks.length} tasks)
// //                         </span>
// //                       )}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <button className="text-blue-600 opacity-0 group-hover:opacity-100 transition">
// //                   View Profile →
// //                 </button>
// //               </div>
// //             ))
// //           ) : (
// //             <p className="text-gray-500">No team members assigned</p>
// //           )}
// //         </div>
// //       </div>

// //       {/* Recent Activity */}
// //       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
// //         <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
// //         {project.recentActivity && project.recentActivity.length > 0 ? (
// //           <div className="space-y-3 max-h-64 overflow-y-auto">
// //             {project.recentActivity.slice().reverse().map((activity) => (
// //               <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
// //                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0">
// //                   {activity.user.split(' ').map(n => n[0]).join('')}
// //                 </div>
// //                 <div className="flex-1 min-w-0">
// //                   <p className="text-sm text-gray-800">{activity.action}</p>
// //                   <p className="text-xs text-gray-500">
// //                     {new Date(activity.timestamp).toLocaleString()} 
// //                     {activity.user && activity.user !== 'System' && ` by ${activity.user}`}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="text-gray-500 text-sm">
// //             Activity will appear here when tasks are dragged and dropped
// //           </div>
// //         )}
// //       </div>

// //       {/* Modals */}
// //       <EditProjectModal />
// //       <EmployeeDetailModal />
// //       <TaskDetailModal />
// //     </div>
// //   );
// // };

// // export default ProjectDetail;
// import React, { useState, useEffect } from 'react';
// import { 
//   ArrowLeft, 
//   Clock, 
//   DollarSign, 
//   Users, 
//   Calendar, 
//   Tag,
//   Mail,
//   Briefcase,
//   Phone,
//   Award,
//   Edit,
//   MoreVertical,
//   X,
//   CheckCircle,
//   AlertCircle,
//   Clock as ClockIcon,
//   User,
//   Activity as ActivityIcon,
//   Trash2,
//   Save
// } from 'lucide-react';

// interface Project {
//   id: string;
//   customerName: string;
//   projectName: string;
//   billingMethod: string;
//   rate: number | null;
//   status: 'active' | 'inactive' | 'completed';
//   loggedHours: string;
//   budget: number | null;
//   startDate: string;
//   endDate: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   tasks?: Task[];
//   teamMembers?: TeamMember[];
//   recentActivity?: Activity[];
//   timerRunning?: boolean;
//   timerStartedAt?: string | null;
//   timerElapsedSeconds?: number;
// }

// interface Task {
//   id: string;
//   title: string;
//   assignee: string;
//   assigneeEmail?: string;
//   department?: string;
//   status: 'todo' | 'in-progress' | 'review' | 'done';
//   dueDate?: string;
//   loggedHours: number;
//   estimatedHours: number;
//   description?: string;
//   priority?: 'low' | 'medium' | 'high';
//   projectName?: string;
//   rework?: string;
//   actualHours?: number;
//   rawString?: string;
// }

// interface TeamMember {
//   id: string;
//   name: string;
//   role: string;
//   email: string;
//   phone?: string;
//   department?: string;
//   joinDate?: string;
//   skills?: string[];
//   projects?: string[];
//   tasks?: Task[];
// }

// interface Activity {
//   id: string;
//   user: string;
//   action: string;
//   timestamp: string;
//   details?: string;
//   type?: 'task' | 'comment' | 'update' | 'status_change';
// }

// interface ProjectDetailProps {
//   projectId: string;
//   onBack: () => void;
//   onProjectUpdate?: () => void;
// }

// // ✅ Employee data mapping
// const EMPLOYEE_DATA: Record<string, Partial<TeamMember>> = {
//   'Patricia Boyle': {
//     role: 'Lead Designer',
//     email: 'patricia.boyle@company.com',
//     phone: '+1 (555) 123-4567',
//     department: 'Design',
//     skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Design Systems', 'Prototyping'],
//     joinDate: '2023-01-15'
//   },
//   'John Doe': {
//     role: 'Senior Developer',
//     email: 'john.doe@company.com',
//     phone: '+1 (555) 234-5678',
//     department: 'Engineering',
//     skills: ['React', 'TypeScript', 'Node.js', 'API Design', 'Database'],
//     joinDate: '2023-03-10'
//   },
//   'Jane Smith': {
//     role: 'QA Tester',
//     email: 'jane.smith@company.com',
//     phone: '+1 (555) 345-6789',
//     department: 'Quality Assurance',
//     skills: ['Manual Testing', 'Automation', 'Selenium', 'Test Planning'],
//     joinDate: '2023-06-01'
//   },
//   'subahree': {
//     role: 'Developer',
//     email: 'subahree@company.com',
//     phone: '+1 (555) 456-7890',
//     department: 'Engineering',
//     skills: ['React', 'TypeScript', 'Node.js', 'API Design'],
//     joinDate: '2023-04-01'
//   }
// };

// // ✅ Parse task from stored string format
// const parseTaskString = (taskString: string, projectName?: string): Task | null => {
//   try {
//     if (taskString.startsWith('{')) {
//       const parsed = JSON.parse(taskString);
//       return {
//         id: parsed.id || `task-${Date.now()}`,
//         title: parsed.title || parsed.name || 'Untitled Task',
//         assignee: parsed.assignee || parsed.assignedTo || 'Unassigned',
//         assigneeEmail: parsed.assigneeEmail || parsed.email || null,
//         status: parsed.status || 'todo',
//         loggedHours: parsed.loggedHours || parsed.hours || 0,
//         estimatedHours: parsed.estimatedHours || parsed.estimate || 0,
//         dueDate: parsed.dueDate || parsed.due || null,
//         department: parsed.department || null,
//         description: parsed.description || null,
//         priority: parsed.priority || 'medium',
//         projectName: parsed.projectName || projectName,
//         rework: parsed.rework || null,
//         actualHours: parsed.actualHours || 0,
//         rawString: taskString
//       };
//     }

//     const cleanString = taskString.replace(/\s+/g, ' ').trim();
    
//     const taskObj: Task = {
//       id: `task-${Date.now()}`,
//       title: 'Untitled Task',
//       assignee: 'Unassigned',
//       status: 'todo',
//       loggedHours: 0,
//       estimatedHours: 0,
//       priority: 'medium',
//       projectName: projectName,
//       rawString: taskString
//     };

//     let titleMatch = cleanString.match(/^(.*?)(?:\s*assignee|$)/i);
//     if (titleMatch && titleMatch[1]) {
//       taskObj.title = titleMatch[1].trim();
//     }

//     const assigneeMatch = cleanString.match(/assignee[:\s]+([A-Za-z]+(?:\s+[A-Za-z]+)*)/i);
//     if (assigneeMatch && assigneeMatch[1]) {
//       taskObj.assignee = assigneeMatch[1].trim();
//     }

//     const lowerString = cleanString.toLowerCase();
//     if (lowerString.includes('done')) {
//       taskObj.status = 'done';
//     } else if (lowerString.includes('review')) {
//       taskObj.status = 'review';
//     } else if (lowerString.includes('in-progress') || lowerString.includes('in progress')) {
//       taskObj.status = 'in-progress';
//     } else if (lowerString.includes('todo') || lowerString.includes('to do')) {
//       taskObj.status = 'todo';
//     }

//     const hoursMatch = cleanString.match(/(\d+\.?\d*)\s*h\s*\/\s*(\d+\.?\d*)\s*h/);
//     if (hoursMatch) {
//       taskObj.loggedHours = parseFloat(hoursMatch[1]) || 0;
//       taskObj.estimatedHours = parseFloat(hoursMatch[2]) || 0;
//     }

//     return taskObj;
//   } catch (error) {
//     console.error('Failed to parse task:', error);
//     return null;
//   }
// };

// // ✅ Get employee details
// const getEmployeeDetails = (name: string): TeamMember => {
//   const fallback = EMPLOYEE_DATA[name] || {};
//   return {
//     id: `emp-${Date.now()}`,
//     name: name,
//     role: fallback.role || 'Team Member',
//     email: fallback.email || `${name.toLowerCase().replace(' ', '.')}@company.com`,
//     phone: fallback.phone || '+1 (555) 123-4567',
//     department: fallback.department || 'Engineering',
//     joinDate: fallback.joinDate || '2024-01-01',
//     skills: fallback.skills || ['React', 'TypeScript', 'JavaScript', 'CSS'],
//     projects: [],
//     tasks: []
//   };
// };

// const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack, onProjectUpdate }) => {
//   const [project, setProject] = useState<Project | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(null);
//   const [showEmployeeModal, setShowEmployeeModal] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editFormData, setEditFormData] = useState<any>(null);
//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);

//   // ✅ Format hours helper
//   const formatHours = (hours: number): string => {
//     const h = Math.floor(hours);
//     const m = Math.round((hours - h) * 60);
//     return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
//   };

//   // ✅ Helper to get status label
//   const getStatusLabel = (status: string): string => {
//     switch(status) {
//       case 'todo': return 'To Do';
//       case 'in-progress': return 'In Progress';
//       case 'review': return 'Review';
//       case 'done': return 'Done';
//       default: return status;
//     }
//   };

//   // ✅ Load project data
//   const loadProject = () => {
//     try {
//       setLoading(true);
//       const savedProjects = localStorage.getItem('userProjects');
//       if (savedProjects) {
//         const parsed = JSON.parse(savedProjects);
//         const found = parsed.find((p: any) => p.id === projectId);
//         if (found) {
//           const tasks: Task[] = [];
//           const teamMemberMap = new Map<string, TeamMember>();
//           const activities: Activity[] = [];
//           let totalLoggedHours = 0;

//           if (found.tasks && found.tasks.length > 0) {
//             found.tasks.forEach((taskString: string) => {
//               const task = parseTaskString(taskString, found.projectName);
//               if (task) {
//                 tasks.push(task);
//                 totalLoggedHours += task.loggedHours || 0;

//                 const assigneeName = task.assignee || 'Unassigned';
//                 if (assigneeName !== 'Unassigned' && assigneeName !== 'undefined') {
//                   if (!teamMemberMap.has(assigneeName)) {
//                     const employee = getEmployeeDetails(assigneeName);
//                     employee.tasks = [];
//                     teamMemberMap.set(assigneeName, employee);
//                   }
//                   const member = teamMemberMap.get(assigneeName)!;
//                   member.tasks!.push(task);
//                 }

//                 const statusMap: Record<string, string> = {
//                   'todo': 'created',
//                   'in-progress': 'started working on',
//                   'review': 'sent for review',
//                   'done': 'completed'
//                 };
//                 const action = statusMap[task.status] || 'updated';
//                 activities.push({
//                   id: `act-${Date.now()}-${Math.random()}`,
//                   user: task.assignee && task.assignee !== 'Unassigned' ? task.assignee : 'System',
//                   action: `${action} task: "${task.title}" (${getStatusLabel(task.status)})`,
//                   timestamp: new Date().toISOString(),
//                   type: task.status === 'done' ? 'status_change' : 'task'
//                 });
//               }
//             });
//           }

//           const loggedHoursStr = formatHours(totalLoggedHours);
//           const teamMembers = Array.from(teamMemberMap.values());

//           setProject({
//             ...found,
//             tasks: tasks,
//             teamMembers: teamMembers,
//             loggedHours: loggedHoursStr || found.loggedHours || '00:00',
//             timerRunning: found.timerRunning || false,
//             timerStartedAt: found.timerStartedAt || null,
//             timerElapsedSeconds: found.timerElapsedSeconds || 0,
//             recentActivity: activities.length > 0 ? activities.slice(0, 20) : [
//               { 
//                 id: '1', 
//                 user: 'System', 
//                 action: 'Project created', 
//                 timestamp: found.createdAt || new Date().toISOString(),
//                 type: 'update'
//               }
//             ]
//           });
//         }
//       }
//     } catch (error) {
//       console.error('Failed to load project:', error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadProject();
    
//     // ✅ Listen for storage changes from TaskBoard
//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === 'userProjects' || e.key === 'taskBoardTasks') {
//         console.log('🔄 Storage changed, reloading project...');
//         loadProject();
//       }
//     };
    
//     window.addEventListener('storage', handleStorageChange);
    
//     // ✅ Poll every 500ms for changes (faster updates)
//     const interval = setInterval(() => {
//       loadProject();
//     }, 500);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, [projectId]);

//   // ✅ Handle Edit
//   const handleEdit = () => {
//     if (project) {
//       setEditFormData({
//         projectName: project.projectName,
//         description: project.description,
//         budget: project.budget,
//         rate: project.rate,
//         startDate: project.startDate,
//         endDate: project.endDate,
//         status: project.status,
//         billingMethod: project.billingMethod
//       });
//       setShowEditModal(true);
//       setShowDropdown(false);
//     }
//   };

//   // ✅ Handle Employee Click
//   const handleEmployeeClick = (employeeName: string) => {
//     if (project) {
//       const employee = project.teamMembers?.find(m => m.name === employeeName);
//       if (employee) {
//         setSelectedEmployee(employee);
//         setShowEmployeeModal(true);
//       }
//     }
//   };

//   // ✅ Handle Task click
//   const handleTaskClick = (task: Task) => {
//     setSelectedTask(task);
//     setShowTaskModal(true);
//   };

//   // ✅ Handle Save Edit
//   const handleSaveEdit = () => {
//     try {
//       const savedProjects = localStorage.getItem('userProjects');
//       if (savedProjects) {
//         const parsed = JSON.parse(savedProjects);
//         const index = parsed.findIndex((p: any) => p.id === projectId);
//         if (index !== -1) {
//           parsed[index] = {
//             ...parsed[index],
//             ...editFormData,
//             updatedAt: new Date().toISOString()
//           };
//           localStorage.setItem('userProjects', JSON.stringify(parsed));
//           setShowEditModal(false);
//           loadProject();
//           if (onProjectUpdate) onProjectUpdate();
//         }
//       }
//     } catch (error) {
//       console.error('Failed to update project:', error);
//     }
//   };

//   // ✅ Handle Delete
//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       try {
//         const savedProjects = localStorage.getItem('userProjects');
//         if (savedProjects) {
//           const parsed = JSON.parse(savedProjects);
//           const filtered = parsed.filter((p: any) => p.id !== projectId);
//           localStorage.setItem('userProjects', JSON.stringify(filtered));
//           if (onProjectUpdate) onProjectUpdate();
//           onBack();
//         }
//       } catch (error) {
//         console.error('Failed to delete project:', error);
//       }
//     }
//     setShowDropdown(false);
//   };

//   // ✅ Task Detail Modal
//   const TaskDetailModal = () => {
//     if (!selectedTask) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-xl font-bold text-white">{selectedTask.title}</h2>
//                 <p className="text-blue-100">Task Details</p>
//               </div>
//               <button 
//                 onClick={() => setShowTaskModal(false)}
//                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           <div className="p-6 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
//                   <User className="w-4 h-4" />
//                   <span>Assignee</span>
//                 </div>
//                 <p className="text-gray-800 font-medium">{selectedTask.assignee || 'Unassigned'}</p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
//                   <Tag className="w-4 h-4" />
//                   <span>Status</span>
//                 </div>
//                 <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getTaskStatusColor(selectedTask.status)}`}>
//                   {getTaskStatusLabel(selectedTask.status)}
//                 </span>
//                 <p className="text-xs text-gray-400 mt-1">Update by dragging in task board</p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
//                   <Clock className="w-4 h-4" />
//                   <span>Hours</span>
//                 </div>
//                 <p className="text-gray-800">{selectedTask.loggedHours}h / {selectedTask.estimatedHours || '?'}h</p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
//                   <Award className="w-4 h-4" />
//                   <span>Priority</span>
//                 </div>
//                 <p className="text-gray-800 capitalize">{selectedTask.priority || 'Medium'}</p>
//               </div>
//             </div>

//             {selectedTask.projectName && (
//               <div>
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">Project</h4>
//                 <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{selectedTask.projectName}</p>
//               </div>
//             )}

//             <div className="flex gap-3 pt-4 border-t">
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
//                 <Edit className="w-4 h-4" />
//                 Edit Task
//               </button>
//               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
//                 <ActivityIcon className="w-4 h-4" />
//                 View History
//               </button>
//             </div>

//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
//               <p className="text-xs text-yellow-700">
//                 💡 Tip: Drag this task in the task board to change its status
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ✅ Edit Project Modal
//   const EditProjectModal = () => {
//     if (!showEditModal || !editFormData) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-white">Edit Project</h2>
//               <button 
//                 onClick={() => setShowEditModal(false)}
//                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           <div className="p-6 space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
//               <input
//                 type="text"
//                 value={editFormData.projectName || ''}
//                 onChange={(e) => setEditFormData({...editFormData, projectName: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 value={editFormData.description || ''}
//                 onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 rows={3}
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
//                 <input
//                   type="number"
//                   value={editFormData.budget || ''}
//                   onChange={(e) => setEditFormData({...editFormData, budget: parseFloat(e.target.value) || 0})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour ($)</label>
//                 <input
//                   type="number"
//                   value={editFormData.rate || ''}
//                   onChange={(e) => setEditFormData({...editFormData, rate: parseFloat(e.target.value) || 0})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                 <input
//                   type="date"
//                   value={editFormData.startDate || ''}
//                   onChange={(e) => setEditFormData({...editFormData, startDate: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                 <input
//                   type="date"
//                   value={editFormData.endDate || ''}
//                   onChange={(e) => setEditFormData({...editFormData, endDate: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <select
//                   value={editFormData.status || 'active'}
//                   onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                   <option value="completed">Completed</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Billing Method</label>
//                 <select
//                   value={editFormData.billingMethod || 'Based on Task Hours'}
//                   onChange={(e) => setEditFormData({...editFormData, billingMethod: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="Based on Task Hours">Based on Task Hours</option>
//                   <option value="Based on Project Hours">Based on Project Hours</option>
//                   <option value="Fixed Price">Fixed Price</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex gap-3 pt-4 border-t">
//               <button
//                 onClick={handleSaveEdit}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
//               >
//                 <Save className="w-4 h-4" />
//                 Save Changes
//               </button>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ✅ Employee Detail Modal
//   const EmployeeDetailModal = () => {
//     if (!selectedEmployee) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
//                   {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-white">{selectedEmployee.name}</h2>
//                   <p className="text-blue-100">{selectedEmployee.role}</p>
//                 </div>
//               </div>
//               <button 
//                 onClick={() => setShowEmployeeModal(false)}
//                 className="text-white hover:bg-white/20 rounded-lg p-2 transition"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           <div className="p-6 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
//                   <Mail className="w-4 h-4" />
//                   <span>Email</span>
//                 </div>
//                 <p className="text-gray-800">{selectedEmployee.email}</p>
//               </div>
//               {selectedEmployee.phone && (
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
//                     <Phone className="w-4 h-4" />
//                     <span>Phone</span>
//                   </div>
//                   <p className="text-gray-800">{selectedEmployee.phone}</p>
//                 </div>
//               )}
//               {selectedEmployee.department && (
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
//                     <Briefcase className="w-4 h-4" />
//                     <span>Department</span>
//                   </div>
//                   <p className="text-gray-800">{selectedEmployee.department}</p>
//                 </div>
//               )}
//               {selectedEmployee.joinDate && (
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>Joined</span>
//                   </div>
//                   <p className="text-gray-800">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</p>
//                 </div>
//               )}
//             </div>

//             {selectedEmployee.skills && selectedEmployee.skills.length > 0 && (
//               <div>
//                 <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                   <Award className="w-4 h-4" />
//                   Skills
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedEmployee.skills.map((skill, index) => (
//                     <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedEmployee.tasks && selectedEmployee.tasks.length > 0 && (
//               <div>
//                 <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                   <Tag className="w-4 h-4" />
//                   Assigned Tasks ({selectedEmployee.tasks.length})
//                 </h4>
//                 <div className="space-y-2">
//                   {selectedEmployee.tasks.map((task, index) => (
//                     <div 
//                       key={index} 
//                       className="bg-gray-50 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition"
//                       onClick={() => {
//                         setShowEmployeeModal(false);
//                         setSelectedTask(task);
//                         setShowTaskModal(true);
//                       }}
//                     >
//                       <span className="text-sm text-gray-800">{task.title}</span>
//                       <span className={`text-xs px-2 py-1 rounded-full ${getTaskStatusColor(task.status)}`}>
//                         {getTaskStatusLabel(task.status)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="flex gap-3 pt-4 border-t">
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
//                 <Mail className="w-4 h-4" />
//                 Send Message
//               </button>
//               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
//                 <Clock className="w-4 h-4" />
//                 View Activity
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-gray-500">Loading project details...</div>
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="p-6">
//         <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
//           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
//         </button>
//         <div className="text-center py-12 text-gray-500">Project not found</div>
//       </div>
//     );
//   }

//   const getStatusColor = (status: string) => {
//     switch(status) {
//       case 'active': return 'bg-green-100 text-green-800';
//       case 'inactive': return 'bg-gray-100 text-gray-800';
//       case 'completed': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getTaskStatusColor = (status: Task['status']) => {
//     switch(status) {
//       case 'todo': return 'bg-gray-100 text-gray-600';
//       case 'in-progress': return 'bg-yellow-100 text-yellow-800';
//       case 'review': return 'bg-purple-100 text-purple-800';
//       case 'done': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const getTaskStatusLabel = (status: Task['status']) => {
//     switch(status) {
//       case 'todo': return 'To Do';
//       case 'in-progress': return 'In Progress';
//       case 'review': return 'Review';
//       case 'done': return 'Done';
//       default: return 'Unknown';
//     }
//   };

//   const getTaskStatusIcon = (status: Task['status']) => {
//     switch(status) {
//       case 'todo': return <ClockIcon className="w-3 h-3" />;
//       case 'in-progress': return <ActivityIcon className="w-3 h-3" />;
//       case 'review': return <AlertCircle className="w-3 h-3" />;
//       case 'done': return <CheckCircle className="w-3 h-3" />;
//       default: return null;
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//       <button 
//         onClick={onBack} 
//         className="flex items-center text-gray-600 hover:text-blue-600 transition mb-4"
//       >
//         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
//       </button>

//       {/* Project Header */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
//         <div className="flex flex-wrap items-start justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">{project.projectName}</h1>
//             <p className="text-gray-500">Project ID: {project.id}</p>
//             {project.timerRunning && (
//               <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1">
//                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                 Timer Running
//               </span>
//             )}
//           </div>
//           <div className="flex items-center gap-3 relative">
//             <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
//               {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
//             </span>
            
//             <div className="relative">
//               <button 
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
//               >
//                 <MoreVertical className="w-5 h-5" />
//               </button>
              
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
//                   <button
//                     onClick={handleEdit}
//                     className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-2"
//                   >
//                     <Edit className="w-4 h-4" />
//                     Edit Project
//                   </button>
//                   <button
//                     onClick={handleDelete}
//                     className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Delete Project
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
//           <div className="text-sm text-gray-500">Total Hours</div>
//           <div className="text-2xl font-bold text-gray-900">{project.loggedHours || '00:00'}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
//           <div className="text-sm text-gray-500">Budget</div>
//           <div className="text-2xl font-bold text-gray-900">${project.budget?.toFixed(2) || '0.00'}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
//           <div className="text-sm text-gray-500">Revenue</div>
//           <div className="text-2xl font-bold text-green-600">
//             ${project.budget ? (project.budget * 0.9).toFixed(2) : '0.00'}
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
//           <div className="text-sm text-gray-500">Team Members</div>
//           <div className="text-2xl font-bold text-gray-900">{project.teamMembers?.length || 0}</div>
//         </div>
//       </div>

//       {/* Project Description */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
//         <h3 className="font-semibold text-gray-800 mb-2">Project Description</h3>
//         <p className="text-gray-600">{project.description || 'No description provided'}</p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//           <div>
//             <span className="text-sm text-gray-500">Billing Method</span>
//             <p className="font-medium">{project.billingMethod || 'Not specified'}</p>
//           </div>
//           <div>
//             <span className="text-sm text-gray-500">Rate Per Hour</span>
//             <p className="font-medium">{project.rate ? `$${project.rate.toFixed(2)}/hr` : 'Not specified'}</p>
//           </div>
//           <div>
//             <span className="text-sm text-gray-500">Start Date</span>
//             <p className="font-medium">{project.startDate || 'Not specified'}</p>
//           </div>
//           <div>
//             <span className="text-sm text-gray-500">End Date</span>
//             <p className="font-medium">{project.endDate || 'Not specified'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Tasks Section - Shows current status */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
//         <h3 className="font-semibold text-gray-800 mb-4">
//           Tasks ({project.tasks?.length || 0})
//           <span className="text-xs text-gray-400 ml-2">(Drag in task board to update)</span>
//         </h3>
//         {project.tasks && project.tasks.length > 0 ? (
//           <div className="space-y-3">
//             {project.tasks.map((task, index) => (
//               <div 
//                 key={index} 
//                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition group"
//                 onClick={() => handleTaskClick(task)}
//               >
//                 <div>
//                   <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">
//                     {task.title}
//                   </p>
//                   <p className="text-sm text-gray-500 flex items-center gap-2">
//                     <User className="w-3 h-3" />
//                     Assignee: {task.assignee && task.assignee !== 'Unassigned' ? task.assignee : 'Unassigned'}
//                     {(task.loggedHours > 0 || task.estimatedHours > 0) && (
//                       <span className="ml-2 text-xs text-gray-400">
//                         {task.loggedHours}h / {task.estimatedHours || '?'}h
//                       </span>
//                     )}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${getTaskStatusColor(task.status)}`}>
//                     {getTaskStatusIcon(task.status)}
//                     {getTaskStatusLabel(task.status)}
//                   </span>
//                   <span className="text-xs text-gray-400">↕</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No tasks assigned</p>
//         )}
//       </div>

//       {/* Team Members Section */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
//         <h3 className="font-semibold text-gray-800 mb-4">
//           Team Members ({project.teamMembers?.length || 0})
//         </h3>
//         <div className="space-y-3">
//           {project.teamMembers && project.teamMembers.length > 0 ? (
//             project.teamMembers.map((member) => (
//               <div 
//                 key={member.id}
//                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition group"
//                 onClick={() => handleEmployeeClick(member.name)}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-medium">
//                     {member.name.split(' ').map(n => n[0]).join('')}
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">
//                       {member.name}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {member.role || 'Team Member'}
//                       {member.tasks && member.tasks.length > 0 && (
//                         <span className="ml-2 text-xs text-gray-400">
//                           ({member.tasks.length} tasks)
//                         </span>
//                       )}
//                     </p>
//                   </div>
//                 </div>
//                 <button className="text-blue-600 opacity-0 group-hover:opacity-100 transition">
//                   View Profile →
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No team members assigned</p>
//           )}
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//         <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
//         {project.recentActivity && project.recentActivity.length > 0 ? (
//           <div className="space-y-3 max-h-64 overflow-y-auto">
//             {project.recentActivity.slice().reverse().map((activity) => (
//               <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0">
//                   {activity.user.split(' ').map(n => n[0]).join('')}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm text-gray-800">{activity.action}</p>
//                   <p className="text-xs text-gray-500">
//                     {new Date(activity.timestamp).toLocaleString()} 
//                     {activity.user && activity.user !== 'System' && ` by ${activity.user}`}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-gray-500 text-sm">
//             Activity will appear here when tasks are dragged and dropped
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       <EditProjectModal />
//       <EmployeeDetailModal />
//       <TaskDetailModal />
//     </div>
//   );
// };

// export default ProjectDetail;
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  DollarSign, 
  Users, 
  Calendar, 
  Tag,
  Mail,
  Briefcase,
  Phone,
  Award,
  Edit,
  MoreVertical,
  X,
  CheckCircle,
  AlertCircle,
  Clock as ClockIcon,
  User,
  Activity as ActivityIcon,
  Trash2,
  Save
} from 'lucide-react';

interface Project {
  id: string;
  customerName: string;
  projectName: string;
  billingMethod: string;
  rate: number | null;
  status: 'active' | 'inactive' | 'completed';
  loggedHours: string;
  budget: number | null;
  startDate: string;
  endDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tasks?: Task[];
  teamMembers?: TeamMember[];
  recentActivity?: Activity[];
  timerRunning?: boolean;
  timerStartedAt?: string | null;
  timerElapsedSeconds?: number;
  assignedUsers?: string[];
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  assigneeEmail?: string;
  department?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  dueDate?: string;
  loggedHours: number;
  estimatedHours: number;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  projectName?: string;
  rework?: string;
  actualHours?: number;
  rawString?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  department?: string;
  joinDate?: string;
  skills?: string[];
  projects?: string[];
  tasks?: Task[];
}

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details?: string;
  type?: 'task' | 'comment' | 'update' | 'status_change';
}

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
  onProjectUpdate?: () => void;
}

// ✅ Employee data mapping
const EMPLOYEE_DATA: Record<string, Partial<TeamMember>> = {
  'Patricia Boyle': {
    role: 'Lead Designer',
    email: 'patricia.boyle@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Design',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Design Systems', 'Prototyping'],
    joinDate: '2023-01-15'
  },
  'John Doe': {
    role: 'Senior Developer',
    email: 'john.doe@company.com',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    skills: ['React', 'TypeScript', 'Node.js', 'API Design', 'Database'],
    joinDate: '2023-03-10'
  },
  'Jane Smith': {
    role: 'QA Tester',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 345-6789',
    department: 'Quality Assurance',
    skills: ['Manual Testing', 'Automation', 'Selenium', 'Test Planning'],
    joinDate: '2023-06-01'
  },
  'subahree': {
    role: 'Developer',
    email: 'subahree@company.com',
    phone: '+1 (555) 456-7890',
    department: 'Engineering',
    skills: ['React', 'TypeScript', 'Node.js', 'API Design'],
    joinDate: '2023-04-01'
  }
};

// ✅ Parse task from stored string format
const parseTaskString = (taskString: string, projectName?: string): Task | null => {
  try {
    if (taskString.startsWith('{')) {
      const parsed = JSON.parse(taskString);
      return {
        id: parsed.id || `task-${Date.now()}`,
        title: parsed.title || parsed.name || 'Untitled Task',
        assignee: parsed.assignee || parsed.assignedTo || 'Unassigned',
        assigneeEmail: parsed.assigneeEmail || parsed.email || null,
        status: parsed.status || 'todo',
        loggedHours: parsed.loggedHours || parsed.hours || 0,
        estimatedHours: parsed.estimatedHours || parsed.estimate || 0,
        dueDate: parsed.dueDate || parsed.due || null,
        department: parsed.department || null,
        description: parsed.description || null,
        priority: parsed.priority || 'medium',
        projectName: parsed.projectName || projectName,
        rework: parsed.rework || null,
        actualHours: parsed.actualHours || 0,
        rawString: taskString
      };
    }

    const cleanString = taskString.replace(/\s+/g, ' ').trim();
    
    const taskObj: Task = {
      id: `task-${Date.now()}`,
      title: 'Untitled Task',
      assignee: 'Unassigned',
      status: 'todo',
      loggedHours: 0,
      estimatedHours: 0,
      priority: 'medium',
      projectName: projectName,
      rawString: taskString
    };

    let titleMatch = cleanString.match(/^(.*?)(?:\s*assignee|$)/i);
    if (titleMatch && titleMatch[1]) {
      taskObj.title = titleMatch[1].trim();
    }

    const assigneeMatch = cleanString.match(/assignee[:\s]+([A-Za-z]+(?:\s+[A-Za-z]+)*)/i);
    if (assigneeMatch && assigneeMatch[1]) {
      taskObj.assignee = assigneeMatch[1].trim();
    }

    const lowerString = cleanString.toLowerCase();
    if (lowerString.includes('done')) {
      taskObj.status = 'done';
    } else if (lowerString.includes('review')) {
      taskObj.status = 'review';
    } else if (lowerString.includes('in-progress') || lowerString.includes('in progress')) {
      taskObj.status = 'in-progress';
    } else if (lowerString.includes('todo') || lowerString.includes('to do')) {
      taskObj.status = 'todo';
    }

    const hoursMatch = cleanString.match(/(\d+\.?\d*)\s*h\s*\/\s*(\d+\.?\d*)\s*h/);
    if (hoursMatch) {
      taskObj.loggedHours = parseFloat(hoursMatch[1]) || 0;
      taskObj.estimatedHours = parseFloat(hoursMatch[2]) || 0;
    }

    return taskObj;
  } catch (error) {
    console.error('Failed to parse task:', error);
    return null;
  }
};

// ✅ Get employee details
const getEmployeeDetails = (name: string): TeamMember => {
  const fallback = EMPLOYEE_DATA[name] || {};
  return {
    id: `emp-${Date.now()}`,
    name: name,
    role: fallback.role || 'Team Member',
    email: fallback.email || `${name.toLowerCase().replace(' ', '.')}@company.com`,
    phone: fallback.phone || '+1 (555) 123-4567',
    department: fallback.department || 'Engineering',
    joinDate: fallback.joinDate || '2024-01-01',
    skills: fallback.skills || ['React', 'TypeScript', 'JavaScript', 'CSS'],
    projects: [],
    tasks: []
  };
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack, onProjectUpdate }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // ✅ Format hours helper
  const formatHours = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  // ✅ Helper to get status label
  const getStatusLabel = (status: string): string => {
    switch(status) {
      case 'todo': return 'To Do';
      case 'in-progress': return 'In Progress';
      case 'review': return 'Review';
      case 'done': return 'Done';
      default: return status;
    }
  };

  // ✅ Load project data
  const loadProject = () => {
    try {
      setLoading(true);
      const savedProjects = localStorage.getItem('userProjects');
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        const found = parsed.find((p: any) => p.id === projectId);
        if (found) {
          const tasks: Task[] = [];
          const teamMemberMap = new Map<string, TeamMember>();
          const activities: Activity[] = [];
          let totalLoggedHours = 0;

          if (found.tasks && found.tasks.length > 0) {
            found.tasks.forEach((taskString: string) => {
              const task = parseTaskString(taskString, found.projectName);
              if (task) {
                tasks.push(task);
                totalLoggedHours += task.loggedHours || 0;

                const assigneeName = task.assignee || 'Unassigned';
                if (assigneeName !== 'Unassigned' && assigneeName !== 'undefined') {
                  if (!teamMemberMap.has(assigneeName)) {
                    const employee = getEmployeeDetails(assigneeName);
                    employee.tasks = [];
                    teamMemberMap.set(assigneeName, employee);
                  }
                  const member = teamMemberMap.get(assigneeName)!;
                  member.tasks!.push(task);
                }

                const statusMap: Record<string, string> = {
                  'todo': 'created',
                  'in-progress': 'started working on',
                  'review': 'sent for review',
                  'done': 'completed'
                };
                const action = statusMap[task.status] || 'updated';
                activities.push({
                  id: `act-${Date.now()}-${Math.random()}`,
                  user: task.assignee && task.assignee !== 'Unassigned' ? task.assignee : 'System',
                  action: `${action} task: "${task.title}" (${getStatusLabel(task.status)})`,
                  timestamp: new Date().toISOString(),
                  type: task.status === 'done' ? 'status_change' : 'task'
                });
              }
            });
          }

          const loggedHoursStr = formatHours(totalLoggedHours);
          const teamMembers = Array.from(teamMemberMap.values());

          setProject({
            ...found,
            tasks: tasks,
            teamMembers: teamMembers,
            loggedHours: loggedHoursStr || found.loggedHours || '00:00',
            timerRunning: found.timerRunning || false,
            timerStartedAt: found.timerStartedAt || null,
            timerElapsedSeconds: found.timerElapsedSeconds || 0,
            recentActivity: activities.length > 0 ? activities.slice(0, 20) : [
              { 
                id: '1', 
                user: 'System', 
                action: 'Project created', 
                timestamp: found.createdAt || new Date().toISOString(),
                type: 'update'
              }
            ]
          });
        }
      }
    } catch (error) {
      console.error('Failed to load project:', error);
    }
    setLoading(false);
  };

  // ✅ Force reload function
  const forceReload = () => {
    console.log('🔄 Force reloading project...');
    loadProject();
  };

  useEffect(() => {
    loadProject();
    
    // ✅ Listen for storage changes from TaskBoard
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userProjects' || e.key === 'taskBoardTasks') {
        console.log('🔄 Storage changed, reloading project...');
        loadProject();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // ✅ Listen for custom event from TaskBoard
    const handleTaskUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('📢 Task update event received:', customEvent.detail);
      loadProject();
    };
    
    window.addEventListener('taskBoardUpdated', handleTaskUpdate);
    
    // ✅ Poll every 300ms for changes (faster updates)
    const interval = setInterval(() => {
      loadProject();
    }, 300);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('taskBoardUpdated', handleTaskUpdate);
      clearInterval(interval);
    };
  }, [projectId]);

  // ✅ Handle Edit
  const handleEdit = () => {
    if (project) {
      setEditFormData({
        projectName: project.projectName,
        description: project.description,
        budget: project.budget,
        rate: project.rate,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
        billingMethod: project.billingMethod
      });
      setShowEditModal(true);
      setShowDropdown(false);
    }
  };

  // ✅ Handle Employee Click
  const handleEmployeeClick = (employeeName: string) => {
    if (project) {
      const employee = project.teamMembers?.find(m => m.name === employeeName);
      if (employee) {
        setSelectedEmployee(employee);
        setShowEmployeeModal(true);
      }
    }
  };

  // ✅ Handle Task click
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  // ✅ Handle Save Edit
  const handleSaveEdit = () => {
    try {
      const savedProjects = localStorage.getItem('userProjects');
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        const index = parsed.findIndex((p: any) => p.id === projectId);
        if (index !== -1) {
          parsed[index] = {
            ...parsed[index],
            ...editFormData,
            updatedAt: new Date().toISOString()
          };
          localStorage.setItem('userProjects', JSON.stringify(parsed));
          setShowEditModal(false);
          loadProject();
          if (onProjectUpdate) onProjectUpdate();
        }
      }
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  // ✅ Handle Delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const savedProjects = localStorage.getItem('userProjects');
        if (savedProjects) {
          const parsed = JSON.parse(savedProjects);
          const filtered = parsed.filter((p: any) => p.id !== projectId);
          localStorage.setItem('userProjects', JSON.stringify(filtered));
          if (onProjectUpdate) onProjectUpdate();
          onBack();
        }
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
    setShowDropdown(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading project details...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6">
        <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
        </button>
        <div className="text-center py-12 text-gray-500">Project not found</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskStatusColor = (status: Task['status']) => {
    switch(status) {
      case 'todo': return 'bg-gray-100 text-gray-600';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTaskStatusLabel = (status: Task['status']) => {
    switch(status) {
      case 'todo': return 'To Do';
      case 'in-progress': return 'In Progress';
      case 'review': return 'Review';
      case 'done': return 'Done';
      default: return 'Unknown';
    }
  };

  const getTaskStatusIcon = (status: Task['status']) => {
    switch(status) {
      case 'todo': return <ClockIcon className="w-3 h-3" />;
      case 'in-progress': return <ActivityIcon className="w-3 h-3" />;
      case 'review': return <AlertCircle className="w-3 h-3" />;
      case 'done': return <CheckCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <button 
        onClick={onBack} 
        className="flex items-center text-gray-600 hover:text-blue-600 transition mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
      </button>

      {/* Project Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.projectName}</h1>
            <p className="text-gray-500">Project ID: {project.id}</p>
            {project.timerRunning && (
              <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Timer Running
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 relative">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
            
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  <button
                    onClick={handleEdit}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Project
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="text-sm text-gray-500">Total Hours</div>
          <div className="text-2xl font-bold text-gray-900">{project.loggedHours || '00:00'}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="text-sm text-gray-500">Budget</div>
          <div className="text-2xl font-bold text-gray-900">${project.budget?.toFixed(2) || '0.00'}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="text-2xl font-bold text-green-600">
            ${project.budget ? (project.budget * 0.9).toFixed(2) : '0.00'}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="text-sm text-gray-500">Team Members</div>
          <div className="text-2xl font-bold text-gray-900">{project.teamMembers?.length || 0}</div>
        </div>
      </div>

      {/* Project Description */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Project Description</h3>
        <p className="text-gray-600">{project.description || 'No description provided'}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <span className="text-sm text-gray-500">Billing Method</span>
            <p className="font-medium">{project.billingMethod || 'Not specified'}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Rate Per Hour</span>
            <p className="font-medium">{project.rate ? `$${project.rate.toFixed(2)}/hr` : 'Not specified'}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Start Date</span>
            <p className="font-medium">{project.startDate || 'Not specified'}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">End Date</span>
            <p className="font-medium">{project.endDate || 'Not specified'}</p>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">
          Tasks ({project.tasks?.length || 0})
          <span className="text-xs text-gray-400 ml-2">(Drag in task board to update)</span>
        </h3>
        {project.tasks && project.tasks.length > 0 ? (
          <div className="space-y-3">
            {project.tasks.map((task, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition group"
                onClick={() => handleTaskClick(task)}
              >
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <User className="w-3 h-3" />
                    Assignee: {task.assignee && task.assignee !== 'Unassigned' ? task.assignee : 'Unassigned'}
                    {(task.loggedHours > 0 || task.estimatedHours > 0) && (
                      <span className="ml-2 text-xs text-gray-400">
                        {task.loggedHours}h / {task.estimatedHours || '?'}h
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${getTaskStatusColor(task.status)}`}>
                    {getTaskStatusIcon(task.status)}
                    {getTaskStatusLabel(task.status)}
                  </span>
                  <span className="text-xs text-gray-400">↕</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tasks assigned</p>
        )}
      </div>

      {/* Team Members Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">
          Team Members ({project.teamMembers?.length || 0})
        </h3>
        <div className="space-y-3">
          {project.teamMembers && project.teamMembers.length > 0 ? (
            project.teamMembers.map((member) => (
              <div 
                key={member.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition group"
                onClick={() => handleEmployeeClick(member.name)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-medium">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">
                      {member.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {member.role || 'Team Member'}
                      {member.tasks && member.tasks.length > 0 && (
                        <span className="ml-2 text-xs text-gray-400">
                          ({member.tasks.length} tasks)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 opacity-0 group-hover:opacity-100 transition">
                  View Profile →
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No team members assigned</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
        {project.recentActivity && project.recentActivity.length > 0 ? (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {project.recentActivity.slice().reverse().map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()} 
                    {activity.user && activity.user !== 'System' && ` by ${activity.user}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">
            Activity will appear here when tasks are dragged and dropped
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedTask.title}</h2>
                  <p className="text-blue-100">Task Details</p>
                </div>
                <button 
                  onClick={() => setShowTaskModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <User className="w-4 h-4" />
                    <span>Assignee</span>
                  </div>
                  <p className="text-gray-800 font-medium">{selectedTask.assignee || 'Unassigned'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Tag className="w-4 h-4" />
                    <span>Status</span>
                  </div>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getTaskStatusColor(selectedTask.status)}`}>
                    {getTaskStatusLabel(selectedTask.status)}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">Update by dragging in task board</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Hours</span>
                  </div>
                  <p className="text-gray-800">{selectedTask.loggedHours}h / {selectedTask.estimatedHours || '?'}h</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Award className="w-4 h-4" />
                    <span>Priority</span>
                  </div>
                  <p className="text-gray-800 capitalize">{selectedTask.priority || 'Medium'}</p>
                </div>
              </div>

              {selectedTask.projectName && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Project</h4>
                  <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{selectedTask.projectName}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Task
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                  <ActivityIcon className="w-4 h-4" />
                  View History
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
                <p className="text-xs text-yellow-700">
                  💡 Tip: Drag this task in the task board to change its status
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Edit Project</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={editFormData.projectName || ''}
                  onChange={(e) => setEditFormData({...editFormData, projectName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editFormData.description || ''}
                  onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                  <input
                    type="number"
                    value={editFormData.budget || ''}
                    onChange={(e) => setEditFormData({...editFormData, budget: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour ($)</label>
                  <input
                    type="number"
                    value={editFormData.rate || ''}
                    onChange={(e) => setEditFormData({...editFormData, rate: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={editFormData.startDate || ''}
                    onChange={(e) => setEditFormData({...editFormData, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={editFormData.endDate || ''}
                    onChange={(e) => setEditFormData({...editFormData, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editFormData.status || 'active'}
                    onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Billing Method</label>
                  <select
                    value={editFormData.billingMethod || 'Based on Task Hours'}
                    onChange={(e) => setEditFormData({...editFormData, billingMethod: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Based on Task Hours">Based on Task Hours</option>
                    <option value="Based on Project Hours">Based on Project Hours</option>
                    <option value="Fixed Price">Fixed Price</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Detail Modal */}
      {showEmployeeModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedEmployee.name}</h2>
                    <p className="text-blue-100">{selectedEmployee.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEmployeeModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                  <p className="text-gray-800">{selectedEmployee.email}</p>
                </div>
                {selectedEmployee.phone && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <Phone className="w-4 h-4" />
                      <span>Phone</span>
                    </div>
                    <p className="text-gray-800">{selectedEmployee.phone}</p>
                  </div>
                )}
                {selectedEmployee.department && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span>Department</span>
                    </div>
                    <p className="text-gray-800">{selectedEmployee.department}</p>
                  </div>
                )}
                {selectedEmployee.joinDate && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined</span>
                    </div>
                    <p className="text-gray-800">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              {selectedEmployee.skills && selectedEmployee.skills.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedEmployee.tasks && selectedEmployee.tasks.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Assigned Tasks ({selectedEmployee.tasks.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedEmployee.tasks.map((task, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition"
                        onClick={() => {
                          setShowEmployeeModal(false);
                          setSelectedTask(task);
                          setShowTaskModal(true);
                        }}
                      >
                        <span className="text-sm text-gray-800">{task.title}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTaskStatusColor(task.status)}`}>
                          {getTaskStatusLabel(task.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Send Message
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  View Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;