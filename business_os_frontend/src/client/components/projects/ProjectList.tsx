// // src/client/components/projects/ProjectList.tsx
// import React, { useState } from 'react';
// import { 
//   Search, 
//   Plus, 
//   Filter, 
//   Clock, 
//   MoreVertical, 
//   Edit, 
//   Trash2, 
//   Copy,
//   FileText,
//   Play,
//   ChevronDown,
//   Download,
//   Upload,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   LayoutGrid,
//   List,
//   DollarSign,
//   User,
//   Calendar,
//   Tag,
//   LayoutDashboard,
//   ClipboardList,
//   Timer,
//   Save,
//   X,
//   Users,
//   Pause,
//   Square,
//   Circle
// } from 'lucide-react';
// import TimeTracker from './TimeTracker';
// import TaskBoard from './TaskBoard';
// import ProjectDetail from './ProjectDetail';
// import ProjectEdit from './ProjectEdit';

// // ==================== TYPES ====================
// interface Project {
//   id: string;
//   customerName: string;
//   projectName: string;
//   billingMethod: 'Based on Task Hours' | 'Based on Project Hours' | 'Fixed Cost for Project' | 'Based on Staff Hours';
//   rate: number | null;
//   status: 'active' | 'inactive' | 'completed';
//   loggedHours: string;
//   budget: number | null;
//   startDate: string;
//   endDate: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

// type ViewMode = 'list' | 'card';
// type TabType = 'projects' | 'taskboard' | 'timetracker';
// type ViewState = 'list' | 'detail' | 'edit';

// // ==================== PROJECTS TAB ====================
// interface ProjectsTabProps {
//   viewMode: ViewMode;
//   setViewMode: (mode: ViewMode) => void;
//   viewBy: 'all' | 'active' | 'inactive' | 'completed';
//   setViewBy: (view: 'all' | 'active' | 'inactive' | 'completed') => void;
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   projects: Project[];
//   setProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
//   selectedProjects: string[];
//   setSelectedProjects: (ids: string[] | ((prev: string[]) => string[])) => void;
//   currentPage: number;
//   setCurrentPage: (page: number) => void;
//   itemsPerPage: number;
//   setShowNewProjectModal: (show: boolean) => void;
//   setEditingProject: (project: Project | null) => void;
//   handleDeleteProject: (id: string) => void;
//   onProjectClick: (projectId: string) => void;
//   onEditClick: (project: Project) => void;
// }

// const ProjectsTab: React.FC<ProjectsTabProps> = ({
//   viewMode,
//   setViewMode,
//   viewBy,
//   setViewBy,
//   searchTerm,
//   setSearchTerm,
//   projects,
//   setProjects,
//   selectedProjects,
//   setSelectedProjects,
//   currentPage,
//   setCurrentPage,
//   itemsPerPage,
//   setShowNewProjectModal,
//   setEditingProject,
//   handleDeleteProject,
//   onProjectClick,
//   onEditClick
// }) => {
//   const filteredProjects = projects.filter((project: Project) => {
//     const matchesView = viewBy === 'all' || project.status === viewBy;
//     const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          project.customerName.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesView && matchesSearch;
//   });

//   const paginatedProjects = filteredProjects.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

//   const toggleProjectSelection = (projectId: string) => {
//     setSelectedProjects((prev: string[]) =>
//       prev.includes(projectId)
//         ? prev.filter((id: string) => id !== projectId)
//         : [...prev, projectId]
//     );
//   };

//   const toggleAllProjects = () => {
//     if (selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0) {
//       setSelectedProjects([]);
//     } else {
//       setSelectedProjects(paginatedProjects.map((p: Project) => p.id));
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch(status) {
//       case 'active': return 'bg-green-100 text-green-800 border-green-200';
//       case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
//       case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch(status) {
//       case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
//       case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
//       default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getBillingMethodBadgeColor = (method: string) => {
//     switch(method) {
//       case 'Based on Task Hours': return 'bg-purple-100 text-purple-800';
//       case 'Based on Project Hours': return 'bg-blue-100 text-blue-800';
//       case 'Fixed Cost for Project': return 'bg-green-100 text-green-800';
//       case 'Based on Staff Hours': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
//   const getRandomColor = (name: string) => {
//     const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
//     return colors[name.length % colors.length];
//   };

//   const handleBulkAction = (action: string) => {
//     switch(action) {
//       case 'active':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'active' } : p
//         ));
//         break;
//       case 'inactive':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'inactive' } : p
//         ));
//         break;
//       case 'delete':
//         setProjects((prev: Project[]) => prev.filter((p: Project) => !selectedProjects.includes(p.id)));
//         break;
//     }
//     setSelectedProjects([]);
//   };

//   const renderListView = () => (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left w-10">
//                 <input 
//                   type="checkbox" 
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                   checked={selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0} 
//                   onChange={toggleAllProjects} 
//                 />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Customer
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Project
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Billing
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Rate
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Hours
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Budget
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {paginatedProjects.length === 0 ? (
//               <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">No projects found</td></tr>
//             ) : (
//               paginatedProjects.map((project: Project) => (
//                 <tr key={project.id} className="hover:bg-gray-50 transition">
//                   <td className="px-4 py-3">
//                     <input 
//                       type="checkbox" 
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                       checked={selectedProjects.includes(project.id)} 
//                       onChange={() => toggleProjectSelection(project.id)} 
//                     />
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.customerName}
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-800 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.projectName}
//                     </div>
//                     <div className="text-xs text-gray-500 truncate max-w-xs">{project.description}</div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBillingMethodBadgeColor(project.billingMethod)}`}>
//                       {project.billingMethod}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
//                       {getStatusIcon(project.status)}
//                       <span className="ml-1">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <Clock className="w-4 h-4 mr-1 text-gray-400" />
//                       <span className="font-mono">{project.loggedHours}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.budget ? `$${project.budget.toFixed(2)}` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center space-x-1">
//                       <button 
//                         onClick={() => onEditClick(project)} 
//                         className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition"
//                         title="Edit"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button className="p-1.5 text-gray-400 hover:text-green-600 rounded hover:bg-green-50 transition" title="Start Timer">
//                         <Play className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => { 
//                           const np = { ...project, id: String(Date.now()), projectName: `${project.projectName} (Copy)`, loggedHours: '00:00' }; 
//                           setProjects((prev: Project[]) => [...prev, np]); 
//                         }} 
//                         className="p-1.5 text-gray-400 hover:text-purple-600 rounded hover:bg-purple-50 transition"
//                         title="Clone"
//                       >
//                         <Copy className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteProject(project.id)} 
//                         className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       {filteredProjects.length > 0 && (
//         <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
//           <div className="text-sm text-gray-700">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} results
//           </div>
//           <div className="flex items-center space-x-2">
//             <button 
//               onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} 
//               disabled={currentPage === 1} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p: number) => (
//               <button 
//                 key={p} 
//                 onClick={() => setCurrentPage(p)} 
//                 className={`px-3 py-1 rounded text-sm ${currentPage === p ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
//               >
//                 {p}
//               </button>
//             ))}
//             {totalPages > 5 && <span className="text-sm text-gray-500">...</span>}
//             <button 
//               onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} 
//               disabled={currentPage === totalPages} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderCardView = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//       {paginatedProjects.map((project: Project) => (
//         <div 
//           key={project.id} 
//           className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition p-4 cursor-pointer"
//           onClick={() => onProjectClick(project.id)}
//         >
//           <div className="flex items-start justify-between mb-3">
//             <div className="flex items-center space-x-2">
//               <div className={`w-8 h-8 rounded-full ${getRandomColor(project.customerName)} text-white flex items-center justify-center text-xs font-medium`}>
//                 {getInitials(project.customerName)}
//               </div>
//               <div>
//                 <div 
//                   className="text-sm font-semibold text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                   onClick={() => onProjectClick(project.id)}
//                 >
//                   {project.customerName}
//                 </div>
//                 <p className="text-xs text-gray-500">{project.projectName}</p>
//               </div>
//             </div>
//             <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
//               {project.status}
//             </span>
//           </div>
//           <p className="text-xs text-gray-600 line-clamp-2 mb-3">{project.description}</p>
//           <div className="grid grid-cols-2 gap-2 mb-3">
//             <div className="bg-gray-50 rounded p-2">
//               <div className="text-[10px] text-gray-500">Billing</div>
//               <div className="text-xs font-medium text-gray-700 truncate">{project.billingMethod}</div>
//             </div>
//             <div className="bg-gray-50 rounded p-2">
//               <div className="text-[10px] text-gray-500">Rate</div>
//               <div className="text-xs font-medium text-gray-700">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</div>
//             </div>
//           </div>
//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center space-x-1">
//               <Clock className="w-4 h-4 text-gray-400" />
//               <span className="font-mono">{project.loggedHours}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <DollarSign className="w-4 h-4 text-gray-400" />
//               <span>${project.budget?.toFixed(2) || '0'}</span>
//             </div>
//           </div>
//           <div className="mt-3 flex items-center justify-between">
//             <button className="text-xs text-blue-600 hover:text-blue-700">Create Expense</button>
//             <button className="text-xs text-gray-500 hover:text-gray-700">Log Time</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <>
//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex flex-wrap items-center space-x-4 gap-2">
//             <div className="relative">
//               <select 
//                 className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500" 
//                 value={viewBy} 
//                 onChange={(e) => setViewBy(e.target.value as any)}
//               >
//                 <option value="all">All Projects</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="completed">Completed</option>
//               </select>
//               <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-500 pointer-events-none" />
//             </div>
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
//               <input 
//                 type="text" 
//                 placeholder="Search projects..." 
//                 className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-48 md:w-64" 
//                 value={searchTerm} 
//                 onChange={(e) => setSearchTerm(e.target.value)} 
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
//               <button 
//                 onClick={() => setViewMode('list')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <List className="w-4 h-4" /><span>List</span>
//               </button>
//               <button 
//                 onClick={() => setViewMode('card')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'card' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <LayoutGrid className="w-4 h-4" /><span>Card</span>
//               </button>
//             </div>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Filter className="w-4 h-4 mr-1" />Filter
//             </button>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Download className="w-4 h-4 mr-1" />Export
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Bulk Update */}
//       {selectedProjects.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
//           <span className="text-sm text-blue-700 font-medium">{selectedProjects.length} selected</span>
//           <div className="flex items-center space-x-2">
//             <button onClick={() => handleBulkAction('active')} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">Active</button>
//             <button onClick={() => handleBulkAction('inactive')} className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">Inactive</button>
//             <button onClick={() => handleBulkAction('delete')} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
//             <button onClick={() => setSelectedProjects([])} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">Clear</button>
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       {viewMode === 'list' ? renderListView() : renderCardView()}

//       {/* Stats */}
//       <div className="grid grid-cols-4 gap-4 mt-6">
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Total</div>
//           <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Active</div>
//           <div className="text-2xl font-bold text-green-600">{projects.filter((p: Project) => p.status === 'active').length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Hours</div>
//           <div className="text-2xl font-bold text-blue-600">455:48</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Revenue</div>
//           <div className="text-2xl font-bold text-purple-600">$29,500</div>
//         </div>
//       </div>
//     </>
//   );
// };

// // ==================== MAIN COMPONENT ====================
// const ProjectList: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabType>('projects');
//   const [viewMode, setViewMode] = useState<ViewMode>('list');
//   const [viewBy, setViewBy] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [showNewProjectModal, setShowNewProjectModal] = useState(false);
//   const [editingProject, setEditingProject] = useState<Project | null>(null);
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
//   const [view, setView] = useState<ViewState>('list');
//   const [editProjectData, setEditProjectData] = useState<Project | null>(null);

//   const [projects, setProjects] = useState<Project[]>([
//     { id: '1', customerName: 'Bruce Wayne', projectName: 'Design contract for Mr. Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '106:41', budget: 5000, startDate: '2024-01-15', endDate: '2024-06-30', description: 'Complete UI/UX design for Wayne Enterprises', createdAt: '', updatedAt: '' },
//     { id: '2', customerName: 'Bruce Wayne', projectName: 'Design project for Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '35:28', budget: 3000, startDate: '2024-02-01', endDate: '2024-07-15', description: 'Redesign of corporate website', createdAt: '', updatedAt: '' },
//     { id: '3', customerName: 'Aaron Brown', projectName: 'Design project for MR.X', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '138:00', budget: 8000, startDate: '2024-01-10', endDate: '2024-08-20', description: 'Mobile app design for MR.X', createdAt: '', updatedAt: '' },
//     { id: '4', customerName: 'Aaron Brown', projectName: 'Design project - Z', billingMethod: 'Based on Task Hours', rate: null, status: 'active', loggedHours: '26:00', budget: 2500, startDate: '2024-03-01', endDate: '2024-09-01', description: 'Logo and branding design', createdAt: '', updatedAt: '' },
//     { id: '5', customerName: 'Dinesh Ramamurthy', projectName: 'Designing project', billingMethod: 'Based on Project Hours', rate: 45, status: 'active', loggedHours: '32:04', budget: 2000, startDate: '2024-02-15', endDate: '2024-07-01', description: 'Web application interface design', createdAt: '', updatedAt: '' },
//     { id: '6', customerName: 'Arthur K', projectName: 'Web app designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '65:00', budget: 4500, startDate: '2024-01-20', endDate: '2024-10-15', description: 'E-commerce platform design', createdAt: '', updatedAt: '' },
//     { id: '7', customerName: 'Aaron Brown', projectName: 'Web Designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'completed', loggedHours: '52:35', budget: 3500, startDate: '2023-12-01', endDate: '2024-05-30', description: 'Corporate website redesign', createdAt: '', updatedAt: '' },
//     { id: '8', customerName: 'Aaron Brown', projectName: 'Web designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'inactive', loggedHours: '00:00', budget: 1000, startDate: '2024-04-01', endDate: '2024-12-31', description: 'Portfolio website design', createdAt: '', updatedAt: '' }
//   ]);

//   const handleDeleteProject = (id: string) => {
//     if (window.confirm('Delete this project?')) {
//       setProjects((prev: Project[]) => prev.filter((p: Project) => p.id !== id));
//     }
//   };

//   const handleProjectClick = (projectId: string) => {
//     setSelectedProjectId(projectId);
//     setView('detail');
//   };

//   const handleBackToList = () => {
//     setSelectedProjectId(null);
//     setView('list');
//     setEditProjectData(null);
//   };

//   const handleEditClick = (project: Project) => {
//     setEditProjectData(project);
//     setView('edit');
//   };

//   // ✅ FIXED: Properly saves edited project data
//   const handleEditSave = (updatedData: any) => {
//     console.log('📥 Received updated data from edit form:', updatedData);
    
//     // Find the project being edited
//     const existingProject = projects.find(p => p.id === updatedData.id);
//     if (!existingProject) {
//       console.error('❌ Project not found:', updatedData.id);
//       return;
//     }

//     console.log('🔍 Found existing project:', existingProject);

//     // ✅ Update the project with new data
//     const updatedProjects = projects.map((p: Project) => {
//       if (p.id === updatedData.id) {
//         const updatedProject = {
//           ...p,
//           projectName: updatedData.name,
//           description: updatedData.description,
//           billingMethod: updatedData.billingMethod as Project['billingMethod'],
//           rate: updatedData.rate,
//           budget: updatedData.budget,
//           status: updatedData.status as Project['status'],
//           startDate: updatedData.startDate,
//           endDate: updatedData.endDate,
//           customerName: updatedData.customerName,
//           updatedAt: new Date().toISOString()
//         };
//         console.log('✅ Updated project:', updatedProject);
//         return updatedProject;
//       }
//       return p;
//     });

//     console.log('📋 Updated projects list:', updatedProjects);
//     setProjects(updatedProjects);
    
//     // ✅ Navigate back to list view after state update
//     setTimeout(() => {
//       setView('list');
//       setEditProjectData(null);
//       console.log('🔄 Navigated back to list view');
//     }, 100);
//   };

//   // Render edit view
//   if (view === 'edit' && editProjectData) {
//     const editData = {
//       id: editProjectData.id,
//       name: editProjectData.projectName,
//       description: editProjectData.description,
//       billingMethod: editProjectData.billingMethod,
//       rate: editProjectData.rate || 0,
//       budget: editProjectData.budget || 0,
//       status: editProjectData.status,
//       startDate: editProjectData.startDate,
//       endDate: editProjectData.endDate,
//       customerName: editProjectData.customerName,
//       assignedUsers: []
//     };
//     return (
//       <ProjectEdit 
//         projectId={editProjectData.id}
//         projectName={editProjectData.projectName}
//         onBack={handleBackToList}
//         onSave={handleEditSave}
//         initialData={editData}
//       />
//     );
//   }

//   // Render detail view
//   if (view === 'detail' && selectedProjectId) {
//     return <ProjectDetail projectId={selectedProjectId} onBack={handleBackToList} />;
//   }

//   const renderTabContent = () => {
//     switch(activeTab) {
//       case 'projects':
//         return (
//           <ProjectsTab
//             viewMode={viewMode}
//             setViewMode={setViewMode}
//             viewBy={viewBy}
//             setViewBy={setViewBy}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             projects={projects}
//             setProjects={setProjects}
//             selectedProjects={selectedProjects}
//             setSelectedProjects={setSelectedProjects}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//             itemsPerPage={itemsPerPage}
//             setShowNewProjectModal={setShowNewProjectModal}
//             setEditingProject={setEditingProject}
//             handleDeleteProject={handleDeleteProject}
//             onProjectClick={handleProjectClick}
//             onEditClick={handleEditClick}
//           />
//         );
//       case 'taskboard':
//         return <TaskBoard />;
//       case 'timetracker':
//         return <TimeTracker />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Title and Action Buttons - Proper Alignment */}
//       <div className="flex flex-wrap items-center justify-between mb-4">
//         <div className="flex items-center gap-4">
//           <h1 className="text-2xl font-bold text-gray-900">
//             {activeTab === 'projects' && 'Projects'}
//             {activeTab === 'taskboard' && 'Task Board'}
//             {activeTab === 'timetracker' && 'Time Tracker'}
//           </h1>
//           <p className="text-sm text-gray-500 hidden sm:block">
//             {activeTab === 'projects' && 'Manage all your projects from one place'}
//             {activeTab === 'taskboard' && 'Manage and track tasks across your projects'}
//             {activeTab === 'timetracker' && 'Track and log time for your projects'}
//           </p>
//         </div>
//         <div className="flex items-center gap-2 flex-wrap">
//           <button onClick={() => setShowNewProjectModal(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 text-xs">
//             <Plus className="w-3.5 h-3.5 mr-1.5" />
//             New Project
//           </button>
//           <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700 text-xs">
//             <Play className="w-3.5 h-3.5 mr-1.5" />
//             Start
//           </button>
//           <button className="px-3 py-1.5 bg-gray-600 text-white rounded-lg flex items-center hover:bg-gray-700 text-xs">
//             <Clock className="w-3.5 h-3.5 mr-1.5" />
//             Log Time
//           </button>
//           <button className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-xs">Page Tips</button>
//         </div>
//       </div>

//       {/* Navigation Tabs - Separate Box */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 mb-6">
//         <nav className="flex space-x-6">
//           <button 
//             onClick={() => setActiveTab('projects')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'projects' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <LayoutDashboard className="w-4 h-4" />
//             <span>Projects</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('taskboard')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'taskboard' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <ClipboardList className="w-4 h-4" />
//             <span>Task Board</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('timetracker')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'timetracker' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <Timer className="w-4 h-4" />
//             <span>Time Tracker</span>
//           </button>
//         </nav>
//       </div>

//       {/* Content */}
//       <div>
//         {renderTabContent()}
//       </div>

//       {/* New Project Modal */}
//       {showNewProjectModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setShowNewProjectModal(false)}></div>
//           <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg">
//             <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-900">New Project</h3>
//               <button onClick={() => setShowNewProjectModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><XCircle className="w-5 h-5 text-gray-500" /></button>
//             </div>
//             <div className="p-6 space-y-4">
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter project name" /></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer *</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"><option value="">Select</option><option>Bruce Wayne</option><option>Aaron Brown</option><option>Dinesh Ramamurthy</option><option>Arthur K</option></select></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Billing Method *</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"><option>Based on Task Hours</option><option>Based on Project Hours</option><option>Fixed Cost for Project</option><option>Based on Staff Hours</option></select></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour</label><div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span><input type="number" className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="0.00" /></div></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Max 2000 characters" maxLength={2000}></textarea></div>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end space-x-3">
//               <button onClick={() => setShowNewProjectModal(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"><Plus className="w-4 h-4 mr-2" />Create</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectList;
// src/client/components/projects/ProjectList.tsx
// import React, { useState } from 'react';
// import { 
//   Search, 
//   Plus, 
//   Filter, 
//   Clock, 
//   MoreVertical, 
//   Edit, 
//   Trash2, 
//   Copy,
//   FileText,
//   Play,
//   ChevronDown,
//   Download,
//   Upload,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   LayoutGrid,
//   List,
//   DollarSign,
//   User,
//   Calendar,
//   Tag,
//   LayoutDashboard,
//   ClipboardList,
//   Timer,
//   Save,
//   X,
//   Users,
//   Pause,
//   Square,
//   Circle
// } from 'lucide-react';
// import TimeTracker from './TimeTracker';
// import TaskBoard from './TaskBoard';
// import ProjectDetail from './ProjectDetail';
// import ProjectEdit from './ProjectEdit';

// // ==================== TYPES ====================
// interface Project {
//   id: string;
//   customerName: string;
//   projectName: string;
//   billingMethod: 'Based on Task Hours' | 'Based on Project Hours' | 'Fixed Cost for Project' | 'Based on Staff Hours';
//   rate: number | null;
//   status: 'active' | 'inactive' | 'completed';
//   loggedHours: string;
//   budget: number | null;
//   startDate: string;
//   endDate: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

// type ViewMode = 'list' | 'card';
// type TabType = 'projects' | 'taskboard' | 'timetracker';
// type ViewState = 'list' | 'detail' | 'edit';

// // ==================== PROJECTS TAB ====================
// interface ProjectsTabProps {
//   viewMode: ViewMode;
//   setViewMode: (mode: ViewMode) => void;
//   viewBy: 'all' | 'active' | 'inactive' | 'completed';
//   setViewBy: (view: 'all' | 'active' | 'inactive' | 'completed') => void;
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   projects: Project[];
//   setProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
//   selectedProjects: string[];
//   setSelectedProjects: (ids: string[] | ((prev: string[]) => string[])) => void;
//   currentPage: number;
//   setCurrentPage: (page: number) => void;
//   itemsPerPage: number;
//   setShowNewProjectModal: (show: boolean) => void;
//   setEditingProject: (project: Project | null) => void;
//   handleDeleteProject: (id: string) => void;
//   onProjectClick: (projectId: string) => void;
//   onEditClick: (project: Project) => void;
// }

// const ProjectsTab: React.FC<ProjectsTabProps> = ({
//   viewMode,
//   setViewMode,
//   viewBy,
//   setViewBy,
//   searchTerm,
//   setSearchTerm,
//   projects,
//   setProjects,
//   selectedProjects,
//   setSelectedProjects,
//   currentPage,
//   setCurrentPage,
//   itemsPerPage,
//   setShowNewProjectModal,
//   setEditingProject,
//   handleDeleteProject,
//   onProjectClick,
//   onEditClick
// }) => {
//   const filteredProjects = projects.filter((project: Project) => {
//     const matchesView = viewBy === 'all' || project.status === viewBy;
//     const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          project.customerName.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesView && matchesSearch;
//   });

//   const paginatedProjects = filteredProjects.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

//   const toggleProjectSelection = (projectId: string) => {
//     setSelectedProjects((prev: string[]) =>
//       prev.includes(projectId)
//         ? prev.filter((id: string) => id !== projectId)
//         : [...prev, projectId]
//     );
//   };

//   const toggleAllProjects = () => {
//     if (selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0) {
//       setSelectedProjects([]);
//     } else {
//       setSelectedProjects(paginatedProjects.map((p: Project) => p.id));
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch(status) {
//       case 'active': return 'bg-green-100 text-green-800 border-green-200';
//       case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
//       case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch(status) {
//       case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
//       case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
//       default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getBillingMethodBadgeColor = (method: string) => {
//     switch(method) {
//       case 'Based on Task Hours': return 'bg-purple-100 text-purple-800';
//       case 'Based on Project Hours': return 'bg-blue-100 text-blue-800';
//       case 'Fixed Cost for Project': return 'bg-green-100 text-green-800';
//       case 'Based on Staff Hours': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
//   const getRandomColor = (name: string) => {
//     const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
//     return colors[name.length % colors.length];
//   };

//   const handleBulkAction = (action: string) => {
//     switch(action) {
//       case 'active':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'active' } : p
//         ));
//         break;
//       case 'inactive':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'inactive' } : p
//         ));
//         break;
//       case 'delete':
//         setProjects((prev: Project[]) => prev.filter((p: Project) => !selectedProjects.includes(p.id)));
//         break;
//     }
//     setSelectedProjects([]);
//   };

//   const renderListView = () => (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left w-10">
//                 <input 
//                   type="checkbox" 
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                   checked={selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0} 
//                   onChange={toggleAllProjects} 
//                 />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Customer
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Project
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Billing
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Rate
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Hours
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Budget
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {paginatedProjects.length === 0 ? (
//               <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">No projects found</td></tr>
//             ) : (
//               paginatedProjects.map((project: Project) => (
//                 <tr key={project.id} className="hover:bg-gray-50 transition">
//                   <td className="px-4 py-3">
//                     <input 
//                       type="checkbox" 
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                       checked={selectedProjects.includes(project.id)} 
//                       onChange={() => toggleProjectSelection(project.id)} 
//                     />
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.customerName}
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-800 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.projectName}
//                     </div>
//                     <div className="text-xs text-gray-500 truncate max-w-xs">{project.description}</div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBillingMethodBadgeColor(project.billingMethod)}`}>
//                       {project.billingMethod}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
//                       {getStatusIcon(project.status)}
//                       <span className="ml-1">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <Clock className="w-4 h-4 mr-1 text-gray-400" />
//                       <span className="font-mono">{project.loggedHours}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.budget ? `$${project.budget.toFixed(2)}` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center space-x-1">
//                       <button 
//                         onClick={() => onEditClick(project)} 
//                         className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition"
//                         title="Edit"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button className="p-1.5 text-gray-400 hover:text-green-600 rounded hover:bg-green-50 transition" title="Start Timer">
//                         <Play className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => { 
//                           const np = { ...project, id: String(Date.now()), projectName: `${project.projectName} (Copy)`, loggedHours: '00:00' }; 
//                           setProjects((prev: Project[]) => [...prev, np]); 
//                         }} 
//                         className="p-1.5 text-gray-400 hover:text-purple-600 rounded hover:bg-purple-50 transition"
//                         title="Clone"
//                       >
//                         <Copy className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteProject(project.id)} 
//                         className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       {filteredProjects.length > 0 && (
//         <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
//           <div className="text-sm text-gray-700">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} results
//           </div>
//           <div className="flex items-center space-x-2">
//             <button 
//               onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} 
//               disabled={currentPage === 1} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p: number) => (
//               <button 
//                 key={p} 
//                 onClick={() => setCurrentPage(p)} 
//                 className={`px-3 py-1 rounded text-sm ${currentPage === p ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
//               >
//                 {p}
//               </button>
//             ))}
//             {totalPages > 5 && <span className="text-sm text-gray-500">...</span>}
//             <button 
//               onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} 
//               disabled={currentPage === totalPages} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderCardView = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//       {paginatedProjects.map((project: Project) => (
//         <div 
//           key={project.id} 
//           className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition p-4 cursor-pointer"
//           onClick={() => onProjectClick(project.id)}
//         >
//           <div className="flex items-start justify-between mb-3">
//             <div className="flex items-center space-x-2">
//               <div className={`w-8 h-8 rounded-full ${getRandomColor(project.customerName)} text-white flex items-center justify-center text-xs font-medium`}>
//                 {getInitials(project.customerName)}
//               </div>
//               <div>
//                 <div 
//                   className="text-sm font-semibold text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                   onClick={() => onProjectClick(project.id)}
//                 >
//                   {project.customerName}
//                 </div>
//                 <p className="text-xs text-gray-500">{project.projectName}</p>
//               </div>
//             </div>
//             <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
//               {project.status}
//             </span>
//           </div>
//           <p className="text-xs text-gray-600 line-clamp-2 mb-3">{project.description}</p>
//           <div className="grid grid-cols-2 gap-2 mb-3">
//             <div className="bg-gray-50 rounded p-2">
//               <div className="text-[10px] text-gray-500">Billing</div>
//               <div className="text-xs font-medium text-gray-700 truncate">{project.billingMethod}</div>
//             </div>
//             <div className="bg-gray-50 rounded p-2">
//               <div className="text-[10px] text-gray-500">Rate</div>
//               <div className="text-xs font-medium text-gray-700">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</div>
//             </div>
//           </div>
//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center space-x-1">
//               <Clock className="w-4 h-4 text-gray-400" />
//               <span className="font-mono">{project.loggedHours}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <DollarSign className="w-4 h-4 text-gray-400" />
//               <span>${project.budget?.toFixed(2) || '0'}</span>
//             </div>
//           </div>
//           <div className="mt-3 flex items-center justify-between">
//             <button className="text-xs text-blue-600 hover:text-blue-700">Create Expense</button>
//             <button className="text-xs text-gray-500 hover:text-gray-700">Log Time</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <>
//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex flex-wrap items-center space-x-4 gap-2">
//             <div className="relative">
//               <select 
//                 className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500" 
//                 value={viewBy} 
//                 onChange={(e) => setViewBy(e.target.value as any)}
//               >
//                 <option value="all">All Projects</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="completed">Completed</option>
//               </select>
//               <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-500 pointer-events-none" />
//             </div>
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
//               <input 
//                 type="text" 
//                 placeholder="Search projects..." 
//                 className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-48 md:w-64" 
//                 value={searchTerm} 
//                 onChange={(e) => setSearchTerm(e.target.value)} 
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
//               <button 
//                 onClick={() => setViewMode('list')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <List className="w-4 h-4" /><span>List</span>
//               </button>
//               <button 
//                 onClick={() => setViewMode('card')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'card' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <LayoutGrid className="w-4 h-4" /><span>Card</span>
//               </button>
//             </div>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Filter className="w-4 h-4 mr-1" />Filter
//             </button>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Download className="w-4 h-4 mr-1" />Export
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Bulk Update */}
//       {selectedProjects.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
//           <span className="text-sm text-blue-700 font-medium">{selectedProjects.length} selected</span>
//           <div className="flex items-center space-x-2">
//             <button onClick={() => handleBulkAction('active')} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">Active</button>
//             <button onClick={() => handleBulkAction('inactive')} className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">Inactive</button>
//             <button onClick={() => handleBulkAction('delete')} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
//             <button onClick={() => setSelectedProjects([])} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">Clear</button>
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       {viewMode === 'list' ? renderListView() : renderCardView()}

//       {/* Stats */}
//       <div className="grid grid-cols-4 gap-4 mt-6">
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Total</div>
//           <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Active</div>
//           <div className="text-2xl font-bold text-green-600">{projects.filter((p: Project) => p.status === 'active').length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Hours</div>
//           <div className="text-2xl font-bold text-blue-600">455:48</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Revenue</div>
//           <div className="text-2xl font-bold text-purple-600">$29,500</div>
//         </div>
//       </div>
//     </>
//   );
// };

// // ==================== MAIN COMPONENT ====================
// const ProjectList: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabType>('projects');
//   const [viewMode, setViewMode] = useState<ViewMode>('list');
//   const [viewBy, setViewBy] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [showNewProjectModal, setShowNewProjectModal] = useState(false);
//   const [editingProject, setEditingProject] = useState<Project | null>(null);
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
//   const [view, setView] = useState<ViewState>('list');
//   const [editProjectData, setEditProjectData] = useState<Project | null>(null);

//   const [projects, setProjects] = useState<Project[]>([
//     { id: '1', customerName: 'Bruce Wayne', projectName: 'Design contract for Mr. Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '106:41', budget: 5000, startDate: '2024-01-15', endDate: '2024-06-30', description: 'Complete UI/UX design for Wayne Enterprises', createdAt: '', updatedAt: '' },
//     { id: '2', customerName: 'Bruce Wayne', projectName: 'Design project for Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '35:28', budget: 3000, startDate: '2024-02-01', endDate: '2024-07-15', description: 'Redesign of corporate website', createdAt: '', updatedAt: '' },
//     { id: '3', customerName: 'Aaron Brown', projectName: 'Design project for MR.X', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '138:00', budget: 8000, startDate: '2024-01-10', endDate: '2024-08-20', description: 'Mobile app design for MR.X', createdAt: '', updatedAt: '' },
//     { id: '4', customerName: 'Aaron Brown', projectName: 'Design project - Z', billingMethod: 'Based on Task Hours', rate: null, status: 'active', loggedHours: '26:00', budget: 2500, startDate: '2024-03-01', endDate: '2024-09-01', description: 'Logo and branding design', createdAt: '', updatedAt: '' },
//     { id: '5', customerName: 'Dinesh Ramamurthy', projectName: 'Designing project', billingMethod: 'Based on Project Hours', rate: 45, status: 'active', loggedHours: '32:04', budget: 2000, startDate: '2024-02-15', endDate: '2024-07-01', description: 'Web application interface design', createdAt: '', updatedAt: '' },
//     { id: '6', customerName: 'Arthur K', projectName: 'Web app designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '65:00', budget: 4500, startDate: '2024-01-20', endDate: '2024-10-15', description: 'E-commerce platform design', createdAt: '', updatedAt: '' },
//     { id: '7', customerName: 'Aaron Brown', projectName: 'Web Designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'completed', loggedHours: '52:35', budget: 3500, startDate: '2023-12-01', endDate: '2024-05-30', description: 'Corporate website redesign', createdAt: '', updatedAt: '' },
//     { id: '8', customerName: 'Aaron Brown', projectName: 'Web designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'inactive', loggedHours: '00:00', budget: 1000, startDate: '2024-04-01', endDate: '2024-12-31', description: 'Portfolio website design', createdAt: '', updatedAt: '' }
//   ]);

//   const handleDeleteProject = (id: string) => {
//     if (window.confirm('Delete this project?')) {
//       setProjects((prev: Project[]) => prev.filter((p: Project) => p.id !== id));
//     }
//   };

//   const handleProjectClick = (projectId: string) => {
//     setSelectedProjectId(projectId);
//     setView('detail');
//   };

//   const handleBackToList = () => {
//     setSelectedProjectId(null);
//     setView('list');
//     setEditProjectData(null);
//   };

//   const handleEditClick = (project: Project) => {
//     setEditProjectData(project);
//     setView('edit');
//   };

//   const handleEditSave = (updatedData: any) => {
//     console.log('📥 Received updated data from edit form:', updatedData);
    
//     const existingProject = projects.find(p => p.id === updatedData.id);
//     if (!existingProject) {
//       console.error('❌ Project not found:', updatedData.id);
//       return;
//     }

//     console.log('🔍 Found existing project:', existingProject);

//     const updatedProjects = projects.map((p: Project) => {
//       if (p.id === updatedData.id) {
//         const updatedProject = {
//           ...p,
//           projectName: updatedData.name,
//           description: updatedData.description,
//           billingMethod: updatedData.billingMethod as Project['billingMethod'],
//           rate: updatedData.rate,
//           budget: updatedData.budget,
//           status: updatedData.status as Project['status'],
//           startDate: updatedData.startDate,
//           endDate: updatedData.endDate,
//           customerName: updatedData.customerName,
//           updatedAt: new Date().toISOString()
//         };
//         console.log('✅ Updated project:', updatedProject);
//         return updatedProject;
//       }
//       return p;
//     });

//     console.log('📋 Updated projects list:', updatedProjects);
//     setProjects(updatedProjects);
    
//     setTimeout(() => {
//       setView('list');
//       setEditProjectData(null);
//       console.log('🔄 Navigated back to list view');
//     }, 100);
//   };

//   // Render edit view
//   if (view === 'edit' && editProjectData) {
//     const editData = {
//       id: editProjectData.id,
//       name: editProjectData.projectName,
//       description: editProjectData.description,
//       billingMethod: editProjectData.billingMethod,
//       rate: editProjectData.rate || 0,
//       budget: editProjectData.budget || 0,
//       status: editProjectData.status,
//       startDate: editProjectData.startDate,
//       endDate: editProjectData.endDate,
//       customerName: editProjectData.customerName,
//       assignedUsers: []
//     };
//     return (
//       <ProjectEdit 
//         projectId={editProjectData.id}
//         projectName={editProjectData.projectName}
//         onBack={handleBackToList}
//         onSave={handleEditSave}
//         initialData={editData}
//       />
//     );
//   }

//   // Render detail view
//   if (view === 'detail' && selectedProjectId) {
//     return <ProjectDetail projectId={selectedProjectId} onBack={handleBackToList} />;
//   }

//   const renderTabContent = () => {
//     switch(activeTab) {
//       case 'projects':
//         return (
//           <ProjectsTab
//             viewMode={viewMode}
//             setViewMode={setViewMode}
//             viewBy={viewBy}
//             setViewBy={setViewBy}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             projects={projects}
//             setProjects={setProjects}
//             selectedProjects={selectedProjects}
//             setSelectedProjects={setSelectedProjects}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//             itemsPerPage={itemsPerPage}
//             setShowNewProjectModal={setShowNewProjectModal}
//             setEditingProject={setEditingProject}
//             handleDeleteProject={handleDeleteProject}
//             onProjectClick={handleProjectClick}
//             onEditClick={handleEditClick}
//           />
//         );
//       case 'taskboard':
//         return <TaskBoard />;
//       case 'timetracker':
//         return <TimeTracker />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Title and New Project Button - Placed side by side */}
//       <div className="flex flex-wrap items-center justify-between mb-4">
//         <div className="flex items-center gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">
//               {activeTab === 'projects' && 'Projects'}
//               {activeTab === 'taskboard' && 'Task Board'}
//               {activeTab === 'timetracker' && 'Time Tracker'}
//             </h1>
//             <p className="text-sm text-gray-500 hidden sm:block">
//               {activeTab === 'projects' && 'Manage all your projects from one place'}
//               {activeTab === 'taskboard' && 'Manage and track tasks across your projects'}
//               {activeTab === 'timetracker' && 'Track and log time for your projects'}
//             </p>
//           </div>
//           {/* New Project Button - Placed straight next to title */}
//           {activeTab === 'projects' && (
//             <button 
//               onClick={() => setShowNewProjectModal(true)} 
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               New Project
//             </button>
//           )}
//         </div>
//         {/* Other action buttons removed - only New Project remains */}
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 mb-6">
//         <nav className="flex space-x-6">
//           <button 
//             onClick={() => setActiveTab('projects')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'projects' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <LayoutDashboard className="w-4 h-4" />
//             <span>Projects</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('taskboard')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'taskboard' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <ClipboardList className="w-4 h-4" />
//             <span>Task Board</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('timetracker')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'timetracker' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <Timer className="w-4 h-4" />
//             <span>Time Tracker</span>
//           </button>
//         </nav>
//       </div>

//       {/* Content */}
//       <div>
//         {renderTabContent()}
//       </div>

//       {/* New Project Modal */}
//       {showNewProjectModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setShowNewProjectModal(false)}></div>
//           <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg">
//             <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-900">New Project</h3>
//               <button onClick={() => setShowNewProjectModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><XCircle className="w-5 h-5 text-gray-500" /></button>
//             </div>
//             <div className="p-6 space-y-4">
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter project name" /></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer *</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"><option value="">Select</option><option>Bruce Wayne</option><option>Aaron Brown</option><option>Dinesh Ramamurthy</option><option>Arthur K</option></select></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Billing Method *</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"><option>Based on Task Hours</option><option>Based on Project Hours</option><option>Fixed Cost for Project</option><option>Based on Staff Hours</option></select></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour</label><div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span><input type="number" className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="0.00" /></div></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Max 2000 characters" maxLength={2000}></textarea></div>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end space-x-3">
//               <button onClick={() => setShowNewProjectModal(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"><Plus className="w-4 h-4 mr-2" />Create</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectList;
// src/client/components/projects/ProjectList.tsx
// import React, { useState } from 'react';
// import { 
//   Search, 
//   Plus, 
//   Filter, 
//   Clock, 
//   MoreVertical, 
//   Edit, 
//   Trash2, 
//   Copy,
//   FileText,
//   Play,
//   ChevronDown,
//   Download,
//   Upload,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   LayoutGrid,
//   List,
//   DollarSign,
//   User,
//   Calendar,
//   Tag,
//   LayoutDashboard,
//   ClipboardList,
//   Timer,
//   Save,
//   X,
//   Users,
//   Pause,
//   Square,
//   Circle
// } from 'lucide-react';
// import TimeTracker from './TimeTracker';
// import TaskBoard from './TaskBoard';
// import ProjectDetail from './ProjectDetail';
// import ProjectEdit from './ProjectEdit';

// // ==================== TYPES ====================
// interface Project {
//   id: string;
//   customerName: string;
//   projectName: string;
//   billingMethod: 'Based on Task Hours' | 'Based on Project Hours' | 'Fixed Cost for Project' | 'Based on Staff Hours';
//   rate: number | null;
//   status: 'active' | 'inactive' | 'completed';
//   loggedHours: string;
//   budget: number | null;
//   startDate: string;
//   endDate: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

// type ViewMode = 'list' | 'card';
// type TabType = 'projects' | 'taskboard' | 'timetracker';
// type ViewState = 'list' | 'detail' | 'edit';

// // ==================== PROJECTS TAB ====================
// interface ProjectsTabProps {
//   viewMode: ViewMode;
//   setViewMode: (mode: ViewMode) => void;
//   viewBy: 'all' | 'active' | 'inactive' | 'completed';
//   setViewBy: (view: 'all' | 'active' | 'inactive' | 'completed') => void;
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   projects: Project[];
//   setProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
//   selectedProjects: string[];
//   setSelectedProjects: (ids: string[] | ((prev: string[]) => string[])) => void;
//   currentPage: number;
//   setCurrentPage: (page: number) => void;
//   itemsPerPage: number;
//   setShowNewProjectModal: (show: boolean) => void;
//   setEditingProject: (project: Project | null) => void;
//   handleDeleteProject: (id: string) => void;
//   onProjectClick: (projectId: string) => void;
//   onEditClick: (project: Project) => void;
// }

// const ProjectsTab: React.FC<ProjectsTabProps> = ({
//   viewMode,
//   setViewMode,
//   viewBy,
//   setViewBy,
//   searchTerm,
//   setSearchTerm,
//   projects,
//   setProjects,
//   selectedProjects,
//   setSelectedProjects,
//   currentPage,
//   setCurrentPage,
//   itemsPerPage,
//   setShowNewProjectModal,
//   setEditingProject,
//   handleDeleteProject,
//   onProjectClick,
//   onEditClick
// }) => {
//   const filteredProjects = projects.filter((project: Project) => {
//     const matchesView = viewBy === 'all' || project.status === viewBy;
//     const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          project.customerName.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesView && matchesSearch;
//   });

//   const paginatedProjects = filteredProjects.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

//   const toggleProjectSelection = (projectId: string) => {
//     setSelectedProjects((prev: string[]) =>
//       prev.includes(projectId)
//         ? prev.filter((id: string) => id !== projectId)
//         : [...prev, projectId]
//     );
//   };

//   const toggleAllProjects = () => {
//     if (selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0) {
//       setSelectedProjects([]);
//     } else {
//       setSelectedProjects(paginatedProjects.map((p: Project) => p.id));
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch(status) {
//       case 'active': return 'bg-green-100 text-green-800 border-green-200';
//       case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
//       case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch(status) {
//       case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
//       case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
//       default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getBillingMethodBadgeColor = (method: string) => {
//     switch(method) {
//       case 'Based on Task Hours': return 'bg-purple-100 text-purple-800';
//       case 'Based on Project Hours': return 'bg-blue-100 text-blue-800';
//       case 'Fixed Cost for Project': return 'bg-green-100 text-green-800';
//       case 'Based on Staff Hours': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
//   const getRandomColor = (name: string) => {
//     const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
//     return colors[name.length % colors.length];
//   };

//   const handleBulkAction = (action: string) => {
//     switch(action) {
//       case 'active':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'active' } : p
//         ));
//         break;
//       case 'inactive':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'inactive' } : p
//         ));
//         break;
//       case 'delete':
//         setProjects((prev: Project[]) => prev.filter((p: Project) => !selectedProjects.includes(p.id)));
//         break;
//     }
//     setSelectedProjects([]);
//   };

//   const renderListView = () => (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left w-10">
//                 <input 
//                   type="checkbox" 
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                   checked={selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0} 
//                   onChange={toggleAllProjects} 
//                 />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Customer
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Project
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Billing
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Rate
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Hours
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Budget
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {paginatedProjects.length === 0 ? (
//               <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">No projects found</td></tr>
//             ) : (
//               paginatedProjects.map((project: Project) => (
//                 <tr key={project.id} className="hover:bg-gray-50 transition">
//                   <td className="px-4 py-3">
//                     <input 
//                       type="checkbox" 
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                       checked={selectedProjects.includes(project.id)} 
//                       onChange={() => toggleProjectSelection(project.id)} 
//                     />
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.customerName}
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-800 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.projectName}
//                     </div>
//                     <div className="text-xs text-gray-500 truncate max-w-xs">{project.description}</div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBillingMethodBadgeColor(project.billingMethod)}`}>
//                       {project.billingMethod}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
//                       {getStatusIcon(project.status)}
//                       <span className="ml-1">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <Clock className="w-4 h-4 mr-1 text-gray-400" />
//                       <span className="font-mono">{project.loggedHours}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.budget ? `$${project.budget.toFixed(2)}` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center space-x-1">
//                       <button 
//                         onClick={() => onEditClick(project)} 
//                         className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition"
//                         title="Edit"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button className="p-1.5 text-gray-400 hover:text-green-600 rounded hover:bg-green-50 transition" title="Start Timer">
//                         <Play className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => { 
//                           const np = { ...project, id: String(Date.now()), projectName: `${project.projectName} (Copy)`, loggedHours: '00:00' }; 
//                           setProjects((prev: Project[]) => [...prev, np]); 
//                         }} 
//                         className="p-1.5 text-gray-400 hover:text-purple-600 rounded hover:bg-purple-50 transition"
//                         title="Clone"
//                       >
//                         <Copy className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteProject(project.id)} 
//                         className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       {filteredProjects.length > 0 && (
//         <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
//           <div className="text-sm text-gray-700">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} results
//           </div>
//           <div className="flex items-center space-x-2">
//             <button 
//               onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} 
//               disabled={currentPage === 1} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p: number) => (
//               <button 
//                 key={p} 
//                 onClick={() => setCurrentPage(p)} 
//                 className={`px-3 py-1 rounded text-sm ${currentPage === p ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
//               >
//                 {p}
//               </button>
//             ))}
//             {totalPages > 5 && <span className="text-sm text-gray-500">...</span>}
//             <button 
//               onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} 
//               disabled={currentPage === totalPages} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderCardView = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//       {paginatedProjects.map((project: Project) => (
//         <div 
//           key={project.id} 
//           className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition p-4 cursor-pointer"
//           onClick={() => onProjectClick(project.id)}
//         >
//           <div className="flex items-start justify-between mb-3">
//             <div className="flex items-center space-x-2">
//               <div className={`w-8 h-8 rounded-full ${getRandomColor(project.customerName)} text-white flex items-center justify-center text-xs font-medium`}>
//                 {getInitials(project.customerName)}
//               </div>
//               <div>
//                 <div 
//                   className="text-sm font-semibold text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                   onClick={() => onProjectClick(project.id)}
//                 >
//                   {project.customerName}
//                 </div>
//                 <p className="text-xs text-gray-500">{project.projectName}</p>
//               </div>
//             </div>
//             <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
//               {project.status}
//             </span>
//           </div>
//           <p className="text-xs text-gray-600 line-clamp-2 mb-3">{project.description}</p>
//           <div className="grid grid-cols-2 gap-2 mb-3">
//             <div className="bg-gray-50 rounded p-2">
//               <div className="text-[10px] text-gray-500">Billing</div>
//               <div className="text-xs font-medium text-gray-700 truncate">{project.billingMethod}</div>
//             </div>
//             <div className="bg-gray-50 rounded p-2">
//               <div className="text-[10px] text-gray-500">Rate</div>
//               <div className="text-xs font-medium text-gray-700">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</div>
//             </div>
//           </div>
//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center space-x-1">
//               <Clock className="w-4 h-4 text-gray-400" />
//               <span className="font-mono">{project.loggedHours}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <DollarSign className="w-4 h-4 text-gray-400" />
//               <span>${project.budget?.toFixed(2) || '0'}</span>
//             </div>
//           </div>
//           <div className="mt-3 flex items-center justify-between">
//             <button className="text-xs text-blue-600 hover:text-blue-700">Create Expense</button>
//             <button className="text-xs text-gray-500 hover:text-gray-700">Log Time</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <>
//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex flex-wrap items-center space-x-4 gap-2">
//             <div className="relative">
//               <select 
//                 className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500" 
//                 value={viewBy} 
//                 onChange={(e) => setViewBy(e.target.value as any)}
//               >
//                 <option value="all">All Projects</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="completed">Completed</option>
//               </select>
//               <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-500 pointer-events-none" />
//             </div>
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
//               <input 
//                 type="text" 
//                 placeholder="Search projects..." 
//                 className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-48 md:w-64" 
//                 value={searchTerm} 
//                 onChange={(e) => setSearchTerm(e.target.value)} 
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
//               <button 
//                 onClick={() => setViewMode('list')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <List className="w-4 h-4" /><span>List</span>
//               </button>
//               <button 
//                 onClick={() => setViewMode('card')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'card' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <LayoutGrid className="w-4 h-4" /><span>Card</span>
//               </button>
//             </div>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Filter className="w-4 h-4 mr-1" />Filter
//             </button>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Download className="w-4 h-4 mr-1" />Export
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Bulk Update */}
//       {selectedProjects.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
//           <span className="text-sm text-blue-700 font-medium">{selectedProjects.length} selected</span>
//           <div className="flex items-center space-x-2">
//             <button onClick={() => handleBulkAction('active')} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">Active</button>
//             <button onClick={() => handleBulkAction('inactive')} className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">Inactive</button>
//             <button onClick={() => handleBulkAction('delete')} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
//             <button onClick={() => setSelectedProjects([])} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">Clear</button>
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       {viewMode === 'list' ? renderListView() : renderCardView()}

//       {/* Stats */}
//       <div className="grid grid-cols-4 gap-4 mt-6">
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Total</div>
//           <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Active</div>
//           <div className="text-2xl font-bold text-green-600">{projects.filter((p: Project) => p.status === 'active').length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Hours</div>
//           <div className="text-2xl font-bold text-blue-600">455:48</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Revenue</div>
//           <div className="text-2xl font-bold text-purple-600">$29,500</div>
//         </div>
//       </div>
//     </>
//   );
// };

// // ==================== MAIN COMPONENT ====================
// const ProjectList: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabType>('projects');
//   const [viewMode, setViewMode] = useState<ViewMode>('list');
//   const [viewBy, setViewBy] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [showNewProjectModal, setShowNewProjectModal] = useState(false);
//   const [editingProject, setEditingProject] = useState<Project | null>(null);
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
//   const [view, setView] = useState<ViewState>('list');
//   const [editProjectData, setEditProjectData] = useState<Project | null>(null);

//   const [projects, setProjects] = useState<Project[]>([
//     { id: '1', customerName: 'Bruce Wayne', projectName: 'Design contract for Mr. Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '106:41', budget: 5000, startDate: '2024-01-15', endDate: '2024-06-30', description: 'Complete UI/UX design for Wayne Enterprises', createdAt: '', updatedAt: '' },
//     { id: '2', customerName: 'Bruce Wayne', projectName: 'Design project for Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '35:28', budget: 3000, startDate: '2024-02-01', endDate: '2024-07-15', description: 'Redesign of corporate website', createdAt: '', updatedAt: '' },
//     { id: '3', customerName: 'Aaron Brown', projectName: 'Design project for MR.X', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '138:00', budget: 8000, startDate: '2024-01-10', endDate: '2024-08-20', description: 'Mobile app design for MR.X', createdAt: '', updatedAt: '' },
//     { id: '4', customerName: 'Aaron Brown', projectName: 'Design project - Z', billingMethod: 'Based on Task Hours', rate: null, status: 'active', loggedHours: '26:00', budget: 2500, startDate: '2024-03-01', endDate: '2024-09-01', description: 'Logo and branding design', createdAt: '', updatedAt: '' },
//     { id: '5', customerName: 'Dinesh Ramamurthy', projectName: 'Designing project', billingMethod: 'Based on Project Hours', rate: 45, status: 'active', loggedHours: '32:04', budget: 2000, startDate: '2024-02-15', endDate: '2024-07-01', description: 'Web application interface design', createdAt: '', updatedAt: '' },
//     { id: '6', customerName: 'Arthur K', projectName: 'Web app designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '65:00', budget: 4500, startDate: '2024-01-20', endDate: '2024-10-15', description: 'E-commerce platform design', createdAt: '', updatedAt: '' },
//     { id: '7', customerName: 'Aaron Brown', projectName: 'Web Designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'completed', loggedHours: '52:35', budget: 3500, startDate: '2023-12-01', endDate: '2024-05-30', description: 'Corporate website redesign', createdAt: '', updatedAt: '' },
//     { id: '8', customerName: 'Aaron Brown', projectName: 'Web designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'inactive', loggedHours: '00:00', budget: 1000, startDate: '2024-04-01', endDate: '2024-12-31', description: 'Portfolio website design', createdAt: '', updatedAt: '' }
//   ]);

//   const handleDeleteProject = (id: string) => {
//     if (window.confirm('Delete this project?')) {
//       setProjects((prev: Project[]) => prev.filter((p: Project) => p.id !== id));
//     }
//   };

//   const handleProjectClick = (projectId: string) => {
//     setSelectedProjectId(projectId);
//     setView('detail');
//   };

//   const handleBackToList = () => {
//     setSelectedProjectId(null);
//     setView('list');
//     setEditProjectData(null);
//   };

//   const handleEditClick = (project: Project) => {
//     setEditProjectData(project);
//     setView('edit');
//   };

//   const handleEditSave = (updatedData: any) => {
//     console.log('📥 Received updated data from edit form:', updatedData);
    
//     const existingProject = projects.find(p => p.id === updatedData.id);
//     if (!existingProject) {
//       console.error('❌ Project not found:', updatedData.id);
//       return;
//     }

//     console.log('🔍 Found existing project:', existingProject);

//     const updatedProjects = projects.map((p: Project) => {
//       if (p.id === updatedData.id) {
//         const updatedProject = {
//           ...p,
//           projectName: updatedData.name,
//           description: updatedData.description,
//           billingMethod: updatedData.billingMethod as Project['billingMethod'],
//           rate: updatedData.rate,
//           budget: updatedData.budget,
//           status: updatedData.status as Project['status'],
//           startDate: updatedData.startDate,
//           endDate: updatedData.endDate,
//           customerName: updatedData.customerName,
//           updatedAt: new Date().toISOString()
//         };
//         console.log('✅ Updated project:', updatedProject);
//         return updatedProject;
//       }
//       return p;
//     });

//     console.log('📋 Updated projects list:', updatedProjects);
//     setProjects(updatedProjects);
    
//     setTimeout(() => {
//       setView('list');
//       setEditProjectData(null);
//       console.log('🔄 Navigated back to list view');
//     }, 100);
//   };

//   // Render edit view
//   if (view === 'edit' && editProjectData) {
//     const editData = {
//       id: editProjectData.id,
//       name: editProjectData.projectName,
//       description: editProjectData.description,
//       billingMethod: editProjectData.billingMethod,
//       rate: editProjectData.rate || 0,
//       budget: editProjectData.budget || 0,
//       status: editProjectData.status,
//       startDate: editProjectData.startDate,
//       endDate: editProjectData.endDate,
//       customerName: editProjectData.customerName,
//       assignedUsers: []
//     };
//     return (
//       <ProjectEdit 
//         projectId={editProjectData.id}
//         projectName={editProjectData.projectName}
//         onBack={handleBackToList}
//         onSave={handleEditSave}
//         initialData={editData}
//       />
//     );
//   }

//   // Render detail view
//   if (view === 'detail' && selectedProjectId) {
//     return <ProjectDetail projectId={selectedProjectId} onBack={handleBackToList} />;
//   }

//   const renderTabContent = () => {
//     switch(activeTab) {
//       case 'projects':
//         return (
//           <ProjectsTab
//             viewMode={viewMode}
//             setViewMode={setViewMode}
//             viewBy={viewBy}
//             setViewBy={setViewBy}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             projects={projects}
//             setProjects={setProjects}
//             selectedProjects={selectedProjects}
//             setSelectedProjects={setSelectedProjects}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//             itemsPerPage={itemsPerPage}
//             setShowNewProjectModal={setShowNewProjectModal}
//             setEditingProject={setEditingProject}
//             handleDeleteProject={handleDeleteProject}
//             onProjectClick={handleProjectClick}
//             onEditClick={handleEditClick}
//           />
//         );
//       case 'taskboard':
//         return <TaskBoard />;
//       case 'timetracker':
//         return <TimeTracker />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Title and New Project Button - Button on the right side corner */}
//       <div className="flex flex-wrap items-center justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {activeTab === 'projects' && 'Projects'}
//             {activeTab === 'taskboard' && 'Task Board'}
//             {activeTab === 'timetracker' && 'Time Tracker'}
//           </h1>
//           <p className="text-sm text-gray-500 hidden sm:block">
//             {activeTab === 'projects' && 'Manage all your projects from one place'}
//             {activeTab === 'taskboard' && 'Manage and track tasks across your projects'}
//             {activeTab === 'timetracker' && 'Track and log time for your projects'}
//           </p>
//         </div>
//         {/* New Project Button - Positioned at the right side corner */}
//         {activeTab === 'projects' && (
//           <button 
//             onClick={() => setShowNewProjectModal(true)} 
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 text-sm shadow-sm whitespace-nowrap"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             New Project
//           </button>
//         )}
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 mb-6">
//         <nav className="flex space-x-6">
//           <button 
//             onClick={() => setActiveTab('projects')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'projects' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <LayoutDashboard className="w-4 h-4" />
//             <span>Projects</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('taskboard')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'taskboard' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <ClipboardList className="w-4 h-4" />
//             <span>Task Board</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('timetracker')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'timetracker' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <Timer className="w-4 h-4" />
//             <span>Time Tracker</span>
//           </button>
//         </nav>
//       </div>

//       {/* Content */}
//       <div>
//         {renderTabContent()}
//       </div>

//       {/* New Project Modal */}
//       {showNewProjectModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setShowNewProjectModal(false)}></div>
//           <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg">
//             <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-900">New Project</h3>
//               <button onClick={() => setShowNewProjectModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><XCircle className="w-5 h-5 text-gray-500" /></button>
//             </div>
//             <div className="p-6 space-y-4">
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter project name" /></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer *</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"><option value="">Select</option><option>Bruce Wayne</option><option>Aaron Brown</option><option>Dinesh Ramamurthy</option><option>Arthur K</option></select></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Billing Method *</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"><option>Based on Task Hours</option><option>Based on Project Hours</option><option>Fixed Cost for Project</option><option>Based on Staff Hours</option></select></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour</label><div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span><input type="number" className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="0.00" /></div></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Max 2000 characters" maxLength={2000}></textarea></div>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end space-x-3">
//               <button onClick={() => setShowNewProjectModal(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"><Plus className="w-4 h-4 mr-2" />Create</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectList;
// src/client/components/projects/ProjectList.tsx
// import React, { useState } from 'react';
// import { 
//   Search, 
//   Plus, 
//   Filter, 
//   Clock, 
//   MoreVertical, 
//   Edit, 
//   Trash2, 
//   Copy,
//   FileText,
//   Play,
//   ChevronDown,
//   Download,
//   Upload,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   LayoutGrid,
//   List,
//   DollarSign,
//   User,
//   Calendar,
//   Tag,
//   LayoutDashboard,
//   ClipboardList,
//   Timer,
//   Save,
//   X,
//   Users,
//   Pause,
//   Square,
//   Circle
// } from 'lucide-react';
// import TimeTracker from './TimeTracker';
// import TaskBoard from './TaskBoard';
// import ProjectDetail from './ProjectDetail';
// import ProjectEdit from './ProjectEdit';

// // ==================== TYPES ====================
// interface Project {
//   id: string;
//   customerName: string;
//   projectName: string;
//   billingMethod: 'Based on Task Hours' | 'Based on Project Hours' | 'Fixed Cost for Project' | 'Based on Staff Hours';
//   rate: number | null;
//   status: 'active' | 'inactive' | 'completed';
//   loggedHours: string;
//   budget: number | null;
//   startDate: string;
//   endDate: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

// type ViewMode = 'list' | 'card';
// type TabType = 'projects' | 'taskboard' | 'timetracker';
// type ViewState = 'list' | 'detail' | 'edit';

// // ==================== PROJECTS TAB ====================
// interface ProjectsTabProps {
//   viewMode: ViewMode;
//   setViewMode: (mode: ViewMode) => void;
//   viewBy: 'all' | 'active' | 'inactive' | 'completed';
//   setViewBy: (view: 'all' | 'active' | 'inactive' | 'completed') => void;
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   projects: Project[];
//   setProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
//   selectedProjects: string[];
//   setSelectedProjects: (ids: string[] | ((prev: string[]) => string[])) => void;
//   currentPage: number;
//   setCurrentPage: (page: number) => void;
//   itemsPerPage: number;
//   setShowNewProjectModal: (show: boolean) => void;
//   setEditingProject: (project: Project | null) => void;
//   handleDeleteProject: (id: string) => void;
//   onProjectClick: (projectId: string) => void;
//   onEditClick: (project: Project) => void;
// }

// const ProjectsTab: React.FC<ProjectsTabProps> = ({
//   viewMode,
//   setViewMode,
//   viewBy,
//   setViewBy,
//   searchTerm,
//   setSearchTerm,
//   projects,
//   setProjects,
//   selectedProjects,
//   setSelectedProjects,
//   currentPage,
//   setCurrentPage,
//   itemsPerPage,
//   setShowNewProjectModal,
//   setEditingProject,
//   handleDeleteProject,
//   onProjectClick,
//   onEditClick
// }) => {
//   const filteredProjects = projects.filter((project: Project) => {
//     const matchesView = viewBy === 'all' || project.status === viewBy;
//     const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          project.customerName.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesView && matchesSearch;
//   });

//   const paginatedProjects = filteredProjects.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

//   const toggleProjectSelection = (projectId: string) => {
//     setSelectedProjects((prev: string[]) =>
//       prev.includes(projectId)
//         ? prev.filter((id: string) => id !== projectId)
//         : [...prev, projectId]
//     );
//   };

//   const toggleAllProjects = () => {
//     if (selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0) {
//       setSelectedProjects([]);
//     } else {
//       setSelectedProjects(paginatedProjects.map((p: Project) => p.id));
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch(status) {
//       case 'active': return 'bg-green-100 text-green-800 border-green-200';
//       case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
//       case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch(status) {
//       case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
//       case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
//       default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getBillingMethodBadgeColor = (method: string) => {
//     switch(method) {
//       case 'Based on Task Hours': return 'bg-purple-100 text-purple-800';
//       case 'Based on Project Hours': return 'bg-blue-100 text-blue-800';
//       case 'Fixed Cost for Project': return 'bg-green-100 text-green-800';
//       case 'Based on Staff Hours': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
//   const getRandomColor = (name: string) => {
//     const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
//     return colors[name.length % colors.length];
//   };

//   const handleBulkAction = (action: string) => {
//     switch(action) {
//       case 'active':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'active' } : p
//         ));
//         break;
//       case 'inactive':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'inactive' } : p
//         ));
//         break;
//       case 'delete':
//         setProjects((prev: Project[]) => prev.filter((p: Project) => !selectedProjects.includes(p.id)));
//         break;
//     }
//     setSelectedProjects([]);
//   };

//   const renderListView = () => (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left w-10">
//                 <input 
//                   type="checkbox" 
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                   checked={selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0} 
//                   onChange={toggleAllProjects} 
//                 />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Customer
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Project
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Billing
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Rate
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Hours
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Budget
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {paginatedProjects.length === 0 ? (
//               <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">No projects found</td></tr>
//             ) : (
//               paginatedProjects.map((project: Project) => (
//                 <tr key={project.id} className="hover:bg-gray-50 transition">
//                   <td className="px-4 py-3">
//                     <input 
//                       type="checkbox" 
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                       checked={selectedProjects.includes(project.id)} 
//                       onChange={() => toggleProjectSelection(project.id)} 
//                     />
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.customerName}
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-800 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.projectName}
//                     </div>
//                     <div className="text-xs text-gray-500 truncate max-w-xs">{project.description}</div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBillingMethodBadgeColor(project.billingMethod)}`}>
//                       {project.billingMethod}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
//                       {getStatusIcon(project.status)}
//                       <span className="ml-1">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <Clock className="w-4 h-4 mr-1 text-gray-400" />
//                       <span className="font-mono">{project.loggedHours}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.budget ? `$${project.budget.toFixed(2)}` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center space-x-1">
//                       <button 
//                         onClick={() => onEditClick(project)} 
//                         className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition"
//                         title="Edit"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button className="p-1.5 text-gray-400 hover:text-green-600 rounded hover:bg-green-50 transition" title="Start Timer">
//                         <Play className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => { 
//                           const np = { ...project, id: String(Date.now()), projectName: `${project.projectName} (Copy)`, loggedHours: '00:00' }; 
//                           setProjects((prev: Project[]) => [...prev, np]); 
//                         }} 
//                         className="p-1.5 text-gray-400 hover:text-purple-600 rounded hover:bg-purple-50 transition"
//                         title="Clone"
//                       >
//                         <Copy className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteProject(project.id)} 
//                         className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       {filteredProjects.length > 0 && (
//         <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
//           <div className="text-sm text-gray-700">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} results
//           </div>
//           <div className="flex items-center space-x-2">
//             <button 
//               onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} 
//               disabled={currentPage === 1} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p: number) => (
//               <button 
//                 key={p} 
//                 onClick={() => setCurrentPage(p)} 
//                 className={`px-3 py-1 rounded text-sm ${currentPage === p ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
//               >
//                 {p}
//               </button>
//             ))}
//             {totalPages > 5 && <span className="text-sm text-gray-500">...</span>}
//             <button 
//               onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} 
//               disabled={currentPage === totalPages} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderCardView = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//       {paginatedProjects.map((project: Project) => (
//         <div 
//           key={project.id} 
//           className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition p-4 cursor-pointer"
//           onClick={() => onProjectClick(project.id)}
//         >
//           <div className="flex items-start justify-between mb-3">
//             <div className="flex items-center space-x-2">
//               <div className={`w-8 h-8 rounded-full ${getRandomColor(project.customerName)} text-white flex items-center justify-center text-xs font-medium`}>
//                 {getInitials(project.customerName)}
//               </div>
//               <div>
//                 <div 
//                   className="text-sm font-semibold text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                   onClick={() => onProjectClick(project.id)}
//                 >
//                   {project.customerName}
//                 </div>
//                 <p className="text-xs text-gray-500">{project.projectName}</p>
//               </div>
//             </div>
//             <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
//               {project.status}
//             </span>
//           </div>
//           <p className="text-xs text-gray-600 line-clamp-2 mb-3">{project.description}</p>
//           <div className="grid grid-cols-2 gap-2 mb-3">
//             <div className="bg-gray-50 rounded p-2">
//               <div className="text-[10px] text-gray-500">Billing</div>
//               <div className="text-xs font-medium text-gray-700 truncate">{project.billingMethod}</div>
//             </div>
//             <div className="bg-gray-50 rounded p-2">
//               <div className="text-[10px] text-gray-500">Rate</div>
//               <div className="text-xs font-medium text-gray-700">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</div>
//             </div>
//           </div>
//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center space-x-1">
//               <Clock className="w-4 h-4 text-gray-400" />
//               <span className="font-mono">{project.loggedHours}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <DollarSign className="w-4 h-4 text-gray-400" />
//               <span>${project.budget?.toFixed(2) || '0'}</span>
//             </div>
//           </div>
//           <div className="mt-3 flex items-center justify-between">
//             <button className="text-xs text-blue-600 hover:text-blue-700">Create Expense</button>
//             <button className="text-xs text-gray-500 hover:text-gray-700">Log Time</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <>
//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex flex-wrap items-center space-x-4 gap-2">
//             <div className="relative">
//               <select 
//                 className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500" 
//                 value={viewBy} 
//                 onChange={(e) => setViewBy(e.target.value as any)}
//               >
//                 <option value="all">All Projects</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="completed">Completed</option>
//               </select>
//               <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-500 pointer-events-none" />
//             </div>
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
//               <input 
//                 type="text" 
//                 placeholder="Search projects..." 
//                 className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-48 md:w-64" 
//                 value={searchTerm} 
//                 onChange={(e) => setSearchTerm(e.target.value)} 
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
//               <button 
//                 onClick={() => setViewMode('list')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <List className="w-4 h-4" /><span>List</span>
//               </button>
//               <button 
//                 onClick={() => setViewMode('card')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'card' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <LayoutGrid className="w-4 h-4" /><span>Card</span>
//               </button>
//             </div>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Filter className="w-4 h-4 mr-1" />Filter
//             </button>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Download className="w-4 h-4 mr-1" />Export
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Bulk Update */}
//       {selectedProjects.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
//           <span className="text-sm text-blue-700 font-medium">{selectedProjects.length} selected</span>
//           <div className="flex items-center space-x-2">
//             <button onClick={() => handleBulkAction('active')} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">Active</button>
//             <button onClick={() => handleBulkAction('inactive')} className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">Inactive</button>
//             <button onClick={() => handleBulkAction('delete')} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
//             <button onClick={() => setSelectedProjects([])} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">Clear</button>
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       {viewMode === 'list' ? renderListView() : renderCardView()}

//       {/* Stats */}
//       <div className="grid grid-cols-4 gap-4 mt-6">
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Total</div>
//           <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Active</div>
//           <div className="text-2xl font-bold text-green-600">{projects.filter((p: Project) => p.status === 'active').length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Hours</div>
//           <div className="text-2xl font-bold text-blue-600">455:48</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Revenue</div>
//           <div className="text-2xl font-bold text-purple-600">$29,500</div>
//         </div>
//       </div>
//     </>
//   );
// };

// // ==================== MAIN COMPONENT ====================
// const ProjectList: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabType>('projects');
//   const [viewMode, setViewMode] = useState<ViewMode>('list');
//   const [viewBy, setViewBy] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [showNewProjectModal, setShowNewProjectModal] = useState(false);
//   const [editingProject, setEditingProject] = useState<Project | null>(null);
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
//   const [view, setView] = useState<ViewState>('list');
//   const [editProjectData, setEditProjectData] = useState<Project | null>(null);

//   const [projects, setProjects] = useState<Project[]>([
//     { id: '1', customerName: 'Bruce Wayne', projectName: 'Design contract for Mr. Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '106:41', budget: 5000, startDate: '2024-01-15', endDate: '2024-06-30', description: 'Complete UI/UX design for Wayne Enterprises', createdAt: '', updatedAt: '' },
//     { id: '2', customerName: 'Bruce Wayne', projectName: 'Design project for Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '35:28', budget: 3000, startDate: '2024-02-01', endDate: '2024-07-15', description: 'Redesign of corporate website', createdAt: '', updatedAt: '' },
//     { id: '3', customerName: 'Aaron Brown', projectName: 'Design project for MR.X', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '138:00', budget: 8000, startDate: '2024-01-10', endDate: '2024-08-20', description: 'Mobile app design for MR.X', createdAt: '', updatedAt: '' },
//     { id: '4', customerName: 'Aaron Brown', projectName: 'Design project - Z', billingMethod: 'Based on Task Hours', rate: null, status: 'active', loggedHours: '26:00', budget: 2500, startDate: '2024-03-01', endDate: '2024-09-01', description: 'Logo and branding design', createdAt: '', updatedAt: '' },
//     { id: '5', customerName: 'Dinesh Ramamurthy', projectName: 'Designing project', billingMethod: 'Based on Project Hours', rate: 45, status: 'active', loggedHours: '32:04', budget: 2000, startDate: '2024-02-15', endDate: '2024-07-01', description: 'Web application interface design', createdAt: '', updatedAt: '' },
//     { id: '6', customerName: 'Arthur K', projectName: 'Web app designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '65:00', budget: 4500, startDate: '2024-01-20', endDate: '2024-10-15', description: 'E-commerce platform design', createdAt: '', updatedAt: '' },
//     { id: '7', customerName: 'Aaron Brown', projectName: 'Web Designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'completed', loggedHours: '52:35', budget: 3500, startDate: '2023-12-01', endDate: '2024-05-30', description: 'Corporate website redesign', createdAt: '', updatedAt: '' },
//     { id: '8', customerName: 'Aaron Brown', projectName: 'Web designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'inactive', loggedHours: '00:00', budget: 1000, startDate: '2024-04-01', endDate: '2024-12-31', description: 'Portfolio website design', createdAt: '', updatedAt: '' }
//   ]);

//   const handleDeleteProject = (id: string) => {
//     if (window.confirm('Delete this project?')) {
//       setProjects((prev: Project[]) => prev.filter((p: Project) => p.id !== id));
//     }
//   };

//   const handleProjectClick = (projectId: string) => {
//     setSelectedProjectId(projectId);
//     setView('detail');
//   };

//   const handleBackToList = () => {
//     setSelectedProjectId(null);
//     setView('list');
//     setEditProjectData(null);
//   };

//   const handleEditClick = (project: Project) => {
//     setEditProjectData(project);
//     setView('edit');
//   };

//   const handleEditSave = (updatedData: any) => {
//     console.log('📥 Received updated data from edit form:', updatedData);
    
//     const existingProject = projects.find(p => p.id === updatedData.id);
//     if (!existingProject) {
//       console.error('❌ Project not found:', updatedData.id);
//       return;
//     }

//     console.log('🔍 Found existing project:', existingProject);

//     const updatedProjects = projects.map((p: Project) => {
//       if (p.id === updatedData.id) {
//         const updatedProject = {
//           ...p,
//           projectName: updatedData.name,
//           description: updatedData.description,
//           billingMethod: updatedData.billingMethod as Project['billingMethod'],
//           rate: updatedData.rate,
//           budget: updatedData.budget,
//           status: updatedData.status as Project['status'],
//           startDate: updatedData.startDate,
//           endDate: updatedData.endDate,
//           customerName: updatedData.customerName,
//           updatedAt: new Date().toISOString()
//         };
//         console.log('✅ Updated project:', updatedProject);
//         return updatedProject;
//       }
//       return p;
//     });

//     console.log('📋 Updated projects list:', updatedProjects);
//     setProjects(updatedProjects);
    
//     setTimeout(() => {
//       setView('list');
//       setEditProjectData(null);
//       console.log('🔄 Navigated back to list view');
//     }, 100);
//   };

//   // Render edit view
//   if (view === 'edit' && editProjectData) {
//     const editData = {
//       id: editProjectData.id,
//       name: editProjectData.projectName,
//       description: editProjectData.description,
//       billingMethod: editProjectData.billingMethod,
//       rate: editProjectData.rate || 0,
//       budget: editProjectData.budget || 0,
//       status: editProjectData.status,
//       startDate: editProjectData.startDate,
//       endDate: editProjectData.endDate,
//       customerName: editProjectData.customerName,
//       assignedUsers: []
//     };
//     return (
//       <ProjectEdit 
//         projectId={editProjectData.id}
//         projectName={editProjectData.projectName}
//         onBack={handleBackToList}
//         onSave={handleEditSave}
//         initialData={editData}
//       />
//     );
//   }

//   // Render detail view
//   if (view === 'detail' && selectedProjectId) {
//     return <ProjectDetail projectId={selectedProjectId} onBack={handleBackToList} />;
//   }

//   const renderTabContent = () => {
//     switch(activeTab) {
//       case 'projects':
//         return (
//           <ProjectsTab
//             viewMode={viewMode}
//             setViewMode={setViewMode}
//             viewBy={viewBy}
//             setViewBy={setViewBy}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             projects={projects}
//             setProjects={setProjects}
//             selectedProjects={selectedProjects}
//             setSelectedProjects={setSelectedProjects}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//             itemsPerPage={itemsPerPage}
//             setShowNewProjectModal={setShowNewProjectModal}
//             setEditingProject={setEditingProject}
//             handleDeleteProject={handleDeleteProject}
//             onProjectClick={handleProjectClick}
//             onEditClick={handleEditClick}
//           />
//         );
//       case 'taskboard':
//         return <TaskBoard />;
//       case 'timetracker':
//         return <TimeTracker />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header with New Project, Start, and Log Time buttons together */}
//       <div className="flex flex-wrap items-center justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {activeTab === 'projects' && 'Projects'}
//             {activeTab === 'taskboard' && 'Task Board'}
//             {activeTab === 'timetracker' && 'Time Tracker'}
//           </h1>
//           <p className="text-sm text-gray-500 hidden sm:block">
//             {activeTab === 'projects' && 'Manage all your projects from one place'}
//             {activeTab === 'taskboard' && 'Manage and track tasks across your projects'}
//             {activeTab === 'timetracker' && 'Track and log time for your projects'}
//           </p>
//         </div>
//         {/* Three buttons together - New Project, Start, Log Time */}
//         {activeTab === 'projects' && (
//           <div className="flex flex-wrap items-center gap-2">
//             <button 
//               onClick={() => setShowNewProjectModal(true)} 
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               New Project
//             </button>
//             <button 
//               className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Play className="w-4 h-4 mr-2" />
//               Start
//             </button>
//             <button 
//               className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center hover:bg-gray-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Clock className="w-4 h-4 mr-2" />
//               Log Time
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 mb-6">
//         <nav className="flex space-x-6">
//           <button 
//             onClick={() => setActiveTab('projects')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'projects' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <LayoutDashboard className="w-4 h-4" />
//             <span>Projects</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('taskboard')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'taskboard' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <ClipboardList className="w-4 h-4" />
//             <span>Task Board</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('timetracker')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'timetracker' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <Timer className="w-4 h-4" />
//             <span>Time Tracker</span>
//           </button>
//         </nav>
//       </div>

//       {/* Content */}
//       <div>
//         {renderTabContent()}
//       </div>

//       {/* New Project Modal */}
//       {showNewProjectModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setShowNewProjectModal(false)}></div>
//           <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg">
//             <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-900">New Project</h3>
//               <button onClick={() => setShowNewProjectModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><XCircle className="w-5 h-5 text-gray-500" /></button>
//             </div>
//             <div className="p-6 space-y-4">
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter project name" /></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer *</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"><option value="">Select</option><option>Bruce Wayne</option><option>Aaron Brown</option><option>Dinesh Ramamurthy</option><option>Arthur K</option></select></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Billing Method *</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"><option>Based on Task Hours</option><option>Based on Project Hours</option><option>Fixed Cost for Project</option><option>Based on Staff Hours</option></select></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour</label><div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span><input type="number" className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="0.00" /></div></div>
//               <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Max 2000 characters" maxLength={2000}></textarea></div>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end space-x-3">
//               <button onClick={() => setShowNewProjectModal(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"><Plus className="w-4 h-4 mr-2" />Create</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectList;
// src/client/components/projects/ProjectList.tsx
// import React, { useState } from 'react';
// import { 
//   Search, 
//   Plus, 
//   Filter, 
//   Clock, 
//   MoreVertical, 
//   Edit, 
//   Trash2, 
//   Copy,
//   FileText,
//   Play,
//   ChevronDown,
//   Download,
//   Upload,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   LayoutGrid,
//   List,
//   DollarSign,
//   User,
//   Calendar,
//   Tag,
//   LayoutDashboard,
//   ClipboardList,
//   Timer,
//   Save,
//   X,
//   Users,
//   Pause,
//   Square,
//   Circle,
//   ArrowLeft
// } from 'lucide-react';
// import TimeTracker from './TimeTracker';
// import TaskBoard from './TaskBoard';
// import ProjectDetail from './ProjectDetail';
// import ProjectEdit from './ProjectEdit';
// import CreateProjectModal from './CreateProjectModal';

// // ==================== TYPES ====================
// interface Project {
//   id: string;
//   customerName: string;
//   projectName: string;
//   billingMethod: 'Based on Task Hours' | 'Based on Project Hours' | 'Fixed Cost for Project' | 'Based on Staff Hours';
//   rate: number | null;
//   status: 'active' | 'inactive' | 'completed';
//   loggedHours: string;
//   budget: number | null;
//   startDate: string;
//   endDate: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

// type ViewMode = 'list' | 'card';
// type TabType = 'projects' | 'taskboard' | 'timetracker';
// type ViewState = 'list' | 'detail' | 'edit' | 'create';

// // ==================== CREATE PROJECT PAGE ====================
// interface CreateProjectPageProps {
//   onBack: () => void;
//   onSave: (projectData: any) => void;
// }

// const CreateProjectPage: React.FC<CreateProjectPageProps> = ({ onBack, onSave }) => {
//   const [formData, setFormData] = useState({
//     projectName: '',
//     customerName: '',
//     billingMethod: 'Based on Task Hours',
//     rate: 0,
//     budget: 0,
//     status: 'active' as 'active' | 'inactive' | 'completed',
//     startDate: '',
//     endDate: '',
//     description: '',
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSaving, setIsSaving] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSubmit = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
//     if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsSaving(true);

//     setTimeout(() => {
//       onSave({
//         ...formData,
//         loggedHours: '00:00',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       });
//       setIsSaving(false);
//     }, 500);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
//         <div className="flex items-center gap-3">
//           <button onClick={onBack} className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition">
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
//             <p className="text-sm text-gray-500">Fill in the details to create a new project</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <button onClick={onBack} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm flex items-center">
//             <X className="w-4 h-4 mr-1.5" /> Cancel
//           </button>
//           <button onClick={handleSubmit} disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center disabled:opacity-50">
//             <Save className="w-4 h-4 mr-1.5" />
//             {isSaving ? 'Creating...' : 'Create Project'}
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 p-6 max-w-3xl">
//         <div className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Project Name <span className="text-red-500">*</span></label>
//             <input 
//               type="text" 
//               name="projectName" 
//               value={formData.projectName} 
//               onChange={handleChange} 
//               className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.projectName ? 'border-red-300' : 'border-gray-300'}`} 
//               placeholder="Enter project name" 
//             />
//             {errors.projectName && <p className="text-xs text-red-500 mt-1">{errors.projectName}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Customer <span className="text-red-500">*</span></label>
//             <input 
//               type="text" 
//               name="customerName" 
//               value={formData.customerName} 
//               onChange={handleChange} 
//               className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.customerName ? 'border-red-300' : 'border-gray-300'}`} 
//               placeholder="Enter customer name" 
//             />
//             {errors.customerName && <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Billing Method <span className="text-red-500">*</span></label>
//             <select 
//               name="billingMethod" 
//               value={formData.billingMethod} 
//               onChange={handleChange} 
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="Based on Task Hours">Based on Task Hours</option>
//               <option value="Based on Project Hours">Based on Project Hours</option>
//               <option value="Fixed Cost for Project">Fixed Cost for Project</option>
//               <option value="Based on Staff Hours">Based on Staff Hours</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-2 text-gray-500">$</span>
//                 <input 
//                   type="number" 
//                   name="rate" 
//                   value={formData.rate} 
//                   onChange={handleChange} 
//                   className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//                   placeholder="0.00" 
//                   min="0" 
//                   step="0.5" 
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-2 text-gray-500">$</span>
//                 <input 
//                   type="number" 
//                   name="budget" 
//                   value={formData.budget} 
//                   onChange={handleChange} 
//                   className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//                   placeholder="0.00" 
//                   min="0" 
//                   step="100" 
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//               <input 
//                 type="date" 
//                 name="startDate" 
//                 value={formData.startDate} 
//                 onChange={handleChange} 
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//               <input 
//                 type="date" 
//                 name="endDate" 
//                 value={formData.endDate} 
//                 onChange={handleChange} 
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//             <select 
//               name="status" 
//               value={formData.status} 
//               onChange={handleChange} 
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea 
//               name="description" 
//               value={formData.description} 
//               onChange={handleChange} 
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//               rows={3} 
//               placeholder="Max 2000 characters" 
//               maxLength={2000} 
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== PROJECTS TAB ====================
// interface ProjectsTabProps {
//   viewMode: ViewMode;
//   setViewMode: (mode: ViewMode) => void;
//   viewBy: 'all' | 'active' | 'inactive' | 'completed';
//   setViewBy: (view: 'all' | 'active' | 'inactive' | 'completed') => void;
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   projects: Project[];
//   setProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
//   selectedProjects: string[];
//   setSelectedProjects: (ids: string[] | ((prev: string[]) => string[])) => void;
//   currentPage: number;
//   setCurrentPage: (page: number) => void;
//   itemsPerPage: number;
//   handleDeleteProject: (id: string) => void;
//   onProjectClick: (projectId: string) => void;
//   onEditClick: (project: Project) => void;
// }

// const ProjectsTab: React.FC<ProjectsTabProps> = ({
//   viewMode,
//   setViewMode,
//   viewBy,
//   setViewBy,
//   searchTerm,
//   setSearchTerm,
//   projects,
//   setProjects,
//   selectedProjects,
//   setSelectedProjects,
//   currentPage,
//   setCurrentPage,
//   itemsPerPage,
//   handleDeleteProject,
//   onProjectClick,
//   onEditClick
// }) => {
//   const filteredProjects = projects.filter((project: Project) => {
//     const matchesView = viewBy === 'all' || project.status === viewBy;
//     const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          project.customerName.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesView && matchesSearch;
//   });

//   const paginatedProjects = filteredProjects.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

//   const toggleProjectSelection = (projectId: string) => {
//     setSelectedProjects((prev: string[]) =>
//       prev.includes(projectId)
//         ? prev.filter((id: string) => id !== projectId)
//         : [...prev, projectId]
//     );
//   };

//   const toggleAllProjects = () => {
//     if (selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0) {
//       setSelectedProjects([]);
//     } else {
//       setSelectedProjects(paginatedProjects.map((p: Project) => p.id));
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch(status) {
//       case 'active': return 'bg-green-100 text-green-800 border-green-200';
//       case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
//       case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch(status) {
//       case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
//       case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
//       default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getBillingMethodBadgeColor = (method: string) => {
//     switch(method) {
//       case 'Based on Task Hours': return 'bg-purple-100 text-purple-800';
//       case 'Based on Project Hours': return 'bg-blue-100 text-blue-800';
//       case 'Fixed Cost for Project': return 'bg-green-100 text-green-800';
//       case 'Based on Staff Hours': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const handleBulkAction = (action: string) => {
//     switch(action) {
//       case 'active':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'active' } : p
//         ));
//         break;
//       case 'inactive':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'inactive' } : p
//         ));
//         break;
//       case 'delete':
//         setProjects((prev: Project[]) => prev.filter((p: Project) => !selectedProjects.includes(p.id)));
//         break;
//     }
//     setSelectedProjects([]);
//   };

//   const renderListView = () => (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left w-10">
//                 <input 
//                   type="checkbox" 
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                   checked={selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0} 
//                   onChange={toggleAllProjects} 
//                 />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Customer
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Project
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Billing
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Rate
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Hours
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Budget
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {paginatedProjects.length === 0 ? (
//               <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">No projects found</td></tr>
//             ) : (
//               paginatedProjects.map((project: Project) => (
//                 <tr key={project.id} className="hover:bg-gray-50 transition">
//                   <td className="px-4 py-3">
//                     <input 
//                       type="checkbox" 
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                       checked={selectedProjects.includes(project.id)} 
//                       onChange={() => toggleProjectSelection(project.id)} 
//                     />
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.customerName}
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-800 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.projectName}
//                     </div>
//                     <div className="text-xs text-gray-500 truncate max-w-xs">{project.description}</div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBillingMethodBadgeColor(project.billingMethod)}`}>
//                       {project.billingMethod}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
//                       {getStatusIcon(project.status)}
//                       <span className="ml-1">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <Clock className="w-4 h-4 mr-1 text-gray-400" />
//                       <span className="font-mono">{project.loggedHours}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.budget ? `$${project.budget.toFixed(2)}` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center space-x-1">
//                       <button 
//                         onClick={() => onEditClick(project)} 
//                         className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition"
//                         title="Edit"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button className="p-1.5 text-gray-400 hover:text-green-600 rounded hover:bg-green-50 transition" title="Start Timer">
//                         <Play className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => { 
//                           const np = { ...project, id: String(Date.now()), projectName: `${project.projectName} (Copy)`, loggedHours: '00:00' }; 
//                           setProjects((prev: Project[]) => [...prev, np]); 
//                         }} 
//                         className="p-1.5 text-gray-400 hover:text-purple-600 rounded hover:bg-purple-50 transition"
//                         title="Clone"
//                       >
//                         <Copy className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteProject(project.id)} 
//                         className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       {filteredProjects.length > 0 && (
//         <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
//           <div className="text-sm text-gray-700">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} results
//           </div>
//           <div className="flex items-center space-x-2">
//             <button 
//               onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} 
//               disabled={currentPage === 1} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p: number) => (
//               <button 
//                 key={p} 
//                 onClick={() => setCurrentPage(p)} 
//                 className={`px-3 py-1 rounded text-sm ${currentPage === p ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
//               >
//                 {p}
//               </button>
//             ))}
//             {totalPages > 5 && <span className="text-sm text-gray-500">...</span>}
//             <button 
//               onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} 
//               disabled={currentPage === totalPages} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderCardView = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//       {paginatedProjects.map((project: Project) => (
//         <div 
//           key={project.id} 
//           className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition p-4 cursor-pointer"
//           onClick={() => onProjectClick(project.id)}
//         >
//           <div className="flex items-start justify-between mb-3">
//             <div className="flex items-center space-x-2">
//               <div className={`w-8 h-8 rounded-full ${getRandomColor(project.customerName)} text-white flex items-center justify-center text-xs font-medium`}>
//                 {getInitials(project.customerName)}
//               </div>
//               <div>
//                 <div 
//                   className="text-sm font-semibold text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                   onClick={() => onProjectClick(project.id)}
//                 >
//                   {project.customerName}
//                 </div>
//                 <p className="text-xs text-gray-500">{project.projectName}</p>
//               </div>
//             </div>
//             <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
//               {project.status}
//             </span>
//           </div>
//           <p className="text-xs text-gray-600 line-clamp-2 mb-3">{project.description}</p>
//           <div className="grid grid-cols-2 gap-2 mb-3">
//             <div className="bg-gray-50 rounded p-2">
//               <div className="text-[10px] text-gray-500">Billing</div>
//               <div className="text-xs font-medium text-gray-700 truncate">{project.billingMethod}</div>
//             </div>
//             <div className="bg-gray-50 rounded p-2">
//               <div className="text-[10px] text-gray-500">Rate</div>
//               <div className="text-xs font-medium text-gray-700">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</div>
//             </div>
//           </div>
//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center space-x-1">
//               <Clock className="w-4 h-4 text-gray-400" />
//               <span className="font-mono">{project.loggedHours}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <DollarSign className="w-4 h-4 text-gray-400" />
//               <span>${project.budget?.toFixed(2) || '0'}</span>
//             </div>
//           </div>
//           <div className="mt-3 flex items-center justify-between">
//             <button className="text-xs text-blue-600 hover:text-blue-700">Create Expense</button>
//             <button className="text-xs text-gray-500 hover:text-gray-700">Log Time</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
//   const getRandomColor = (name: string) => {
//     const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
//     return colors[name.length % colors.length];
//   };

//   return (
//     <>
//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex flex-wrap items-center space-x-4 gap-2">
//             <div className="relative">
//               <select 
//                 className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500" 
//                 value={viewBy} 
//                 onChange={(e) => setViewBy(e.target.value as any)}
//               >
//                 <option value="all">All Projects</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="completed">Completed</option>
//               </select>
//               <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-500 pointer-events-none" />
//             </div>
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
//               <input 
//                 type="text" 
//                 placeholder="Search projects..." 
//                 className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-48 md:w-64" 
//                 value={searchTerm} 
//                 onChange={(e) => setSearchTerm(e.target.value)} 
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
//               <button 
//                 onClick={() => setViewMode('list')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <List className="w-4 h-4" /><span>List</span>
//               </button>
//               <button 
//                 onClick={() => setViewMode('card')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'card' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <LayoutGrid className="w-4 h-4" /><span>Card</span>
//               </button>
//             </div>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Filter className="w-4 h-4 mr-1" />Filter
//             </button>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Download className="w-4 h-4 mr-1" />Export
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Bulk Update */}
//       {selectedProjects.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
//           <span className="text-sm text-blue-700 font-medium">{selectedProjects.length} selected</span>
//           <div className="flex items-center space-x-2">
//             <button onClick={() => handleBulkAction('active')} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">Active</button>
//             <button onClick={() => handleBulkAction('inactive')} className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">Inactive</button>
//             <button onClick={() => handleBulkAction('delete')} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
//             <button onClick={() => setSelectedProjects([])} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">Clear</button>
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       {viewMode === 'list' ? renderListView() : renderCardView()}

//       {/* Stats */}
//       <div className="grid grid-cols-4 gap-4 mt-6">
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Total</div>
//           <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Active</div>
//           <div className="text-2xl font-bold text-green-600">{projects.filter((p: Project) => p.status === 'active').length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Hours</div>
//           <div className="text-2xl font-bold text-blue-600">455:48</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Revenue</div>
//           <div className="text-2xl font-bold text-purple-600">$29,500</div>
//         </div>
//       </div>
//     </>
//   );
// };

// // ==================== MAIN COMPONENT ====================
// const ProjectList: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabType>('projects');
//   const [viewMode, setViewMode] = useState<ViewMode>('list');
//   const [viewBy, setViewBy] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
//   const [view, setView] = useState<ViewState>('list');
//   const [editProjectData, setEditProjectData] = useState<Project | null>(null);

//   const [projects, setProjects] = useState<Project[]>([
//     { id: '1', customerName: 'Bruce Wayne', projectName: 'Design contract for Mr. Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '106:41', budget: 5000, startDate: '2024-01-15', endDate: '2024-06-30', description: 'Complete UI/UX design for Wayne Enterprises', createdAt: '', updatedAt: '' },
//     { id: '2', customerName: 'Bruce Wayne', projectName: 'Design project for Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '35:28', budget: 3000, startDate: '2024-02-01', endDate: '2024-07-15', description: 'Redesign of corporate website', createdAt: '', updatedAt: '' },
//     { id: '3', customerName: 'Aaron Brown', projectName: 'Design project for MR.X', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '138:00', budget: 8000, startDate: '2024-01-10', endDate: '2024-08-20', description: 'Mobile app design for MR.X', createdAt: '', updatedAt: '' },
//     { id: '4', customerName: 'Aaron Brown', projectName: 'Design project - Z', billingMethod: 'Based on Task Hours', rate: null, status: 'active', loggedHours: '26:00', budget: 2500, startDate: '2024-03-01', endDate: '2024-09-01', description: 'Logo and branding design', createdAt: '', updatedAt: '' },
//     { id: '5', customerName: 'Dinesh Ramamurthy', projectName: 'Designing project', billingMethod: 'Based on Project Hours', rate: 45, status: 'active', loggedHours: '32:04', budget: 2000, startDate: '2024-02-15', endDate: '2024-07-01', description: 'Web application interface design', createdAt: '', updatedAt: '' },
//     { id: '6', customerName: 'Arthur K', projectName: 'Web app designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '65:00', budget: 4500, startDate: '2024-01-20', endDate: '2024-10-15', description: 'E-commerce platform design', createdAt: '', updatedAt: '' },
//     { id: '7', customerName: 'Aaron Brown', projectName: 'Web Designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'completed', loggedHours: '52:35', budget: 3500, startDate: '2023-12-01', endDate: '2024-05-30', description: 'Corporate website redesign', createdAt: '', updatedAt: '' },
//     { id: '8', customerName: 'Aaron Brown', projectName: 'Web designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'inactive', loggedHours: '00:00', budget: 1000, startDate: '2024-04-01', endDate: '2024-12-31', description: 'Portfolio website design', createdAt: '', updatedAt: '' }
//   ]);

//   const handleDeleteProject = (id: string) => {
//     if (window.confirm('Delete this project?')) {
//       setProjects((prev: Project[]) => prev.filter((p: Project) => p.id !== id));
//     }
//   };

//   const handleProjectClick = (projectId: string) => {
//     setSelectedProjectId(projectId);
//     setView('detail');
//   };

//   const handleBackToList = () => {
//     setSelectedProjectId(null);
//     setView('list');
//     setEditProjectData(null);
//   };

//   const handleEditClick = (project: Project) => {
//     setEditProjectData(project);
//     setView('edit');
//   };

//   const handleEditSave = (updatedData: any) => {
//     const existingProject = projects.find(p => p.id === updatedData.id);
//     if (!existingProject) return;

//     const updatedProjects = projects.map((p: Project) => {
//       if (p.id === updatedData.id) {
//         return {
//           ...p,
//           projectName: updatedData.name,
//           description: updatedData.description,
//           billingMethod: updatedData.billingMethod as Project['billingMethod'],
//           rate: updatedData.rate,
//           budget: updatedData.budget,
//           status: updatedData.status as Project['status'],
//           startDate: updatedData.startDate,
//           endDate: updatedData.endDate,
//           customerName: updatedData.customerName,
//           updatedAt: new Date().toISOString()
//         };
//       }
//       return p;
//     });

//     setProjects(updatedProjects);
//     setTimeout(() => {
//       setView('list');
//       setEditProjectData(null);
//     }, 100);
//   };

//   // Handle Create New Project
//   const handleCreateProject = (projectData: any) => {
//     const newProject: Project = {
//       id: String(Date.now()),
//       customerName: projectData.customerName,
//       projectName: projectData.projectName,
//       billingMethod: projectData.billingMethod as Project['billingMethod'],
//       rate: projectData.rate || null,
//       status: projectData.status as Project['status'],
//       loggedHours: '00:00',
//       budget: projectData.budget || null,
//       startDate: projectData.startDate || '',
//       endDate: projectData.endDate || '',
//       description: projectData.description || '',
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     };
//     setProjects([newProject, ...projects]);
//     setView('list');
//   };

//   // Render create view
//   if (view === 'create') {
//     return <CreateProjectPage onBack={handleBackToList} onSave={handleCreateProject} />;
//   }

//   // Render edit view
//   if (view === 'edit' && editProjectData) {
//     const editData = {
//       id: editProjectData.id,
//       name: editProjectData.projectName,
//       description: editProjectData.description,
//       billingMethod: editProjectData.billingMethod,
//       rate: editProjectData.rate || 0,
//       budget: editProjectData.budget || 0,
//       status: editProjectData.status,
//       startDate: editProjectData.startDate,
//       endDate: editProjectData.endDate,
//       customerName: editProjectData.customerName,
//       assignedUsers: []
//     };
//     return (
//       <ProjectEdit 
//         projectId={editProjectData.id}
//         projectName={editProjectData.projectName}
//         onBack={handleBackToList}
//         onSave={handleEditSave}
//         initialData={editData}
//       />
//     );
//   }

//   // Render detail view
//   if (view === 'detail' && selectedProjectId) {
//     return <ProjectDetail projectId={selectedProjectId} onBack={handleBackToList} />;
//   }

//   const renderTabContent = () => {
//     switch(activeTab) {
//       case 'projects':
//         return (
//           <ProjectsTab
//             viewMode={viewMode}
//             setViewMode={setViewMode}
//             viewBy={viewBy}
//             setViewBy={setViewBy}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             projects={projects}
//             setProjects={setProjects}
//             selectedProjects={selectedProjects}
//             setSelectedProjects={setSelectedProjects}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//             itemsPerPage={itemsPerPage}
//             handleDeleteProject={handleDeleteProject}
//             onProjectClick={handleProjectClick}
//             onEditClick={handleEditClick}
//           />
//         );
//       case 'taskboard':
//         return <TaskBoard />;
//       case 'timetracker':
//         return <TimeTracker />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header with New Project, Start, and Log Time buttons */}
//       <div className="flex flex-wrap items-center justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {activeTab === 'projects' && 'Projects'}
//             {activeTab === 'taskboard' && 'Task Board'}
//             {activeTab === 'timetracker' && 'Time Tracker'}
//           </h1>
//           <p className="text-sm text-gray-500 hidden sm:block">
//             {activeTab === 'projects' && 'Manage all your projects from one place'}
//             {activeTab === 'taskboard' && 'Manage and track tasks across your projects'}
//             {activeTab === 'timetracker' && 'Track and log time for your projects'}
//           </p>
//         </div>
//         {/* Three buttons together - New Project opens separate page */}
//         {activeTab === 'projects' && (
//           <div className="flex flex-wrap items-center gap-2">
//             <button 
//               onClick={() => setView('create')} 
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               New Project
//             </button>
//             <button 
//               className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Play className="w-4 h-4 mr-2" />
//               Start
//             </button>
//             <button 
//               className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center hover:bg-gray-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Clock className="w-4 h-4 mr-2" />
//               Log Time
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 mb-6">
//         <nav className="flex space-x-6">
//           <button 
//             onClick={() => setActiveTab('projects')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'projects' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <LayoutDashboard className="w-4 h-4" />
//             <span>Projects</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('taskboard')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'taskboard' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <ClipboardList className="w-4 h-4" />
//             <span>Task Board</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('timetracker')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'timetracker' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <Timer className="w-4 h-4" />
//             <span>Time Tracker</span>
//           </button>
//         </nav>
//       </div>

//       {/* Content */}
//       <div>
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// export default ProjectList;
// src/client/components/projects/ProjectList.tsx
// import React, { useState } from 'react';
// import { 
//   Search, 
//   Plus, 
//   Filter, 
//   Clock, 
//   MoreVertical, 
//   Edit, 
//   Trash2, 
//   Copy,
//   FileText,
//   Play,
//   ChevronDown,
//   Download,
//   Upload,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   LayoutGrid,
//   List,
//   DollarSign,
//   User,
//   Calendar,
//   Tag,
//   LayoutDashboard,
//   ClipboardList,
//   Timer,
//   Save,
//   X,
//   Users,
//   Pause,
//   Square,
//   Circle,
//   ArrowLeft
// } from 'lucide-react';
// import TimeTracker from './TimeTracker';
// import TaskBoard from './TaskBoard';
// import ProjectDetail from './ProjectDetail';
// import ProjectEdit from './ProjectEdit';

// // ==================== TYPES ====================
// interface Project {
//   id: string;
//   customerName: string;
//   projectName: string;
//   billingMethod: 'Based on Task Hours' | 'Based on Project Hours' | 'Fixed Cost for Project' | 'Based on Staff Hours';
//   rate: number | null;
//   status: 'active' | 'inactive' | 'completed';
//   loggedHours: string;
//   budget: number | null;
//   startDate: string;
//   endDate: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

// type ViewMode = 'list' | 'card';
// type TabType = 'projects' | 'taskboard' | 'timetracker';
// type ViewState = 'list' | 'detail' | 'edit' | 'create';

// // ==================== CREATE PROJECT PAGE ====================
// interface CreateProjectPageProps {
//   onBack: () => void;
//   onSave: (projectData: any) => void;
// }

// const CreateProjectPage: React.FC<CreateProjectPageProps> = ({ onBack, onSave }) => {
//   const [formData, setFormData] = useState({
//     projectName: '',
//     customerName: '',
//     billingMethod: 'Based on Task Hours',
//     rate: 0,
//     budget: 0,
//     status: 'active' as 'active' | 'inactive' | 'completed',
//     startDate: '',
//     endDate: '',
//     description: '',
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSaving, setIsSaving] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSubmit = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
//     if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsSaving(true);

//     setTimeout(() => {
//       onSave({
//         ...formData,
//         loggedHours: '00:00',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       });
//       setIsSaving(false);
//     }, 500);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header with Back button and Actions - Right aligned */}
//       <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
//         <div className="flex items-center gap-3">
//           <button 
//             onClick={onBack} 
//             className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
//             <p className="text-sm text-gray-500">Fill in the details to create a new project</p>
//           </div>
//         </div>
//         {/* ✅ Buttons aligned to RIGHT */}
//         <div className="flex items-center gap-2">
//           <button 
//             onClick={onBack} 
//             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm flex items-center"
//           >
//             <X className="w-4 h-4 mr-1.5" /> Cancel
//           </button>
//           <button 
//             onClick={handleSubmit} 
//             disabled={isSaving} 
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center disabled:opacity-50 shadow-sm"
//           >
//             <Save className="w-4 h-4 mr-1.5" />
//             {isSaving ? 'Creating...' : 'Create Project'}
//           </button>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-3xl mx-auto">
//         <div className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Name <span className="text-red-500">*</span>
//             </label>
//             <input 
//               type="text" 
//               name="projectName" 
//               value={formData.projectName} 
//               onChange={handleChange} 
//               className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.projectName ? 'border-red-300' : 'border-gray-300'}`} 
//               placeholder="Enter project name" 
//             />
//             {errors.projectName && <p className="text-xs text-red-500 mt-1">{errors.projectName}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Customer <span className="text-red-500">*</span>
//             </label>
//             <input 
//               type="text" 
//               name="customerName" 
//               value={formData.customerName} 
//               onChange={handleChange} 
//               className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.customerName ? 'border-red-300' : 'border-gray-300'}`} 
//               placeholder="Enter customer name" 
//             />
//             {errors.customerName && <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Billing Method <span className="text-red-500">*</span>
//             </label>
//             <select 
//               name="billingMethod" 
//               value={formData.billingMethod} 
//               onChange={handleChange} 
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="Based on Task Hours">Based on Task Hours</option>
//               <option value="Based on Project Hours">Based on Project Hours</option>
//               <option value="Fixed Cost for Project">Fixed Cost for Project</option>
//               <option value="Based on Staff Hours">Based on Staff Hours</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-2 text-gray-500">$</span>
//                 <input 
//                   type="number" 
//                   name="rate" 
//                   value={formData.rate} 
//                   onChange={handleChange} 
//                   className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//                   placeholder="0.00" 
//                   min="0" 
//                   step="0.5" 
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-2 text-gray-500">$</span>
//                 <input 
//                   type="number" 
//                   name="budget" 
//                   value={formData.budget} 
//                   onChange={handleChange} 
//                   className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//                   placeholder="0.00" 
//                   min="0" 
//                   step="100" 
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//               <input 
//                 type="date" 
//                 name="startDate" 
//                 value={formData.startDate} 
//                 onChange={handleChange} 
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//               <input 
//                 type="date" 
//                 name="endDate" 
//                 value={formData.endDate} 
//                 onChange={handleChange} 
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//             <select 
//               name="status" 
//               value={formData.status} 
//               onChange={handleChange} 
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea 
//               name="description" 
//               value={formData.description} 
//               onChange={handleChange} 
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//               rows={3} 
//               placeholder="Max 2000 characters" 
//               maxLength={2000} 
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== PROJECTS TAB ====================
// interface ProjectsTabProps {
//   viewMode: ViewMode;
//   setViewMode: (mode: ViewMode) => void;
//   viewBy: 'all' | 'active' | 'inactive' | 'completed';
//   setViewBy: (view: 'all' | 'active' | 'inactive' | 'completed') => void;
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   projects: Project[];
//   setProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
//   selectedProjects: string[];
//   setSelectedProjects: (ids: string[] | ((prev: string[]) => string[])) => void;
//   currentPage: number;
//   setCurrentPage: (page: number) => void;
//   itemsPerPage: number;
//   handleDeleteProject: (id: string) => void;
//   onProjectClick: (projectId: string) => void;
//   onEditClick: (project: Project) => void;
// }

// const ProjectsTab: React.FC<ProjectsTabProps> = ({
//   viewMode,
//   setViewMode,
//   viewBy,
//   setViewBy,
//   searchTerm,
//   setSearchTerm,
//   projects,
//   setProjects,
//   selectedProjects,
//   setSelectedProjects,
//   currentPage,
//   setCurrentPage,
//   itemsPerPage,
//   handleDeleteProject,
//   onProjectClick,
//   onEditClick
// }) => {
//   const filteredProjects = projects.filter((project: Project) => {
//     const matchesView = viewBy === 'all' || project.status === viewBy;
//     const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          project.customerName.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesView && matchesSearch;
//   });

//   const paginatedProjects = filteredProjects.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

//   const toggleProjectSelection = (projectId: string) => {
//     setSelectedProjects((prev: string[]) =>
//       prev.includes(projectId)
//         ? prev.filter((id: string) => id !== projectId)
//         : [...prev, projectId]
//     );
//   };

//   const toggleAllProjects = () => {
//     if (selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0) {
//       setSelectedProjects([]);
//     } else {
//       setSelectedProjects(paginatedProjects.map((p: Project) => p.id));
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch(status) {
//       case 'active': return 'bg-green-100 text-green-800 border-green-200';
//       case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
//       case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch(status) {
//       case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
//       case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
//       default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getBillingMethodBadgeColor = (method: string) => {
//     switch(method) {
//       case 'Based on Task Hours': return 'bg-purple-100 text-purple-800';
//       case 'Based on Project Hours': return 'bg-blue-100 text-blue-800';
//       case 'Fixed Cost for Project': return 'bg-green-100 text-green-800';
//       case 'Based on Staff Hours': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const handleBulkAction = (action: string) => {
//     switch(action) {
//       case 'active':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'active' } : p
//         ));
//         break;
//       case 'inactive':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'inactive' } : p
//         ));
//         break;
//       case 'delete':
//         setProjects((prev: Project[]) => prev.filter((p: Project) => !selectedProjects.includes(p.id)));
//         break;
//     }
//     setSelectedProjects([]);
//   };

//   const renderListView = () => (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left w-10">
//                 <input 
//                   type="checkbox" 
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                   checked={selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0} 
//                   onChange={toggleAllProjects} 
//                 />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Customer
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Project
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Billing
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Rate
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Hours
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Budget
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {paginatedProjects.length === 0 ? (
//               <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">No projects found</td></tr>
//             ) : (
//               paginatedProjects.map((project: Project) => (
//                 <tr key={project.id} className="hover:bg-gray-50 transition">
//                   <td className="px-4 py-3">
//                     <input 
//                       type="checkbox" 
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                       checked={selectedProjects.includes(project.id)} 
//                       onChange={() => toggleProjectSelection(project.id)} 
//                     />
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.customerName}
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-800 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.projectName}
//                     </div>
//                     <div className="text-xs text-gray-500 truncate max-w-xs">{project.description}</div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBillingMethodBadgeColor(project.billingMethod)}`}>
//                       {project.billingMethod}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
//                       {getStatusIcon(project.status)}
//                       <span className="ml-1">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <Clock className="w-4 h-4 mr-1 text-gray-400" />
//                       <span className="font-mono">{project.loggedHours}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.budget ? `$${project.budget.toFixed(2)}` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center space-x-1">
//                       <button 
//                         onClick={() => onEditClick(project)} 
//                         className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition"
//                         title="Edit"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button className="p-1.5 text-gray-400 hover:text-green-600 rounded hover:bg-green-50 transition" title="Start Timer">
//                         <Play className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => { 
//                           const np = { ...project, id: String(Date.now()), projectName: `${project.projectName} (Copy)`, loggedHours: '00:00' }; 
//                           setProjects((prev: Project[]) => [...prev, np]); 
//                         }} 
//                         className="p-1.5 text-gray-400 hover:text-purple-600 rounded hover:bg-purple-50 transition"
//                         title="Clone"
//                       >
//                         <Copy className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteProject(project.id)} 
//                         className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       {filteredProjects.length > 0 && (
//         <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
//           <div className="text-sm text-gray-700">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} results
//           </div>
//           <div className="flex items-center space-x-2">
//             <button 
//               onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} 
//               disabled={currentPage === 1} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p: number) => (
//               <button 
//                 key={p} 
//                 onClick={() => setCurrentPage(p)} 
//                 className={`px-3 py-1 rounded text-sm ${currentPage === p ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
//               >
//                 {p}
//               </button>
//             ))}
//             {totalPages > 5 && <span className="text-sm text-gray-500">...</span>}
//             <button 
//               onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} 
//               disabled={currentPage === totalPages} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderCardView = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//       {paginatedProjects.map((project: Project) => {
//         const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
//         const getRandomColor = (name: string) => {
//           const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
//           return colors[name.length % colors.length];
//         };
//         return (
//           <div 
//             key={project.id} 
//             className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition p-4 cursor-pointer"
//             onClick={() => onProjectClick(project.id)}
//           >
//             <div className="flex items-start justify-between mb-3">
//               <div className="flex items-center space-x-2">
//                 <div className={`w-8 h-8 rounded-full ${getRandomColor(project.customerName)} text-white flex items-center justify-center text-xs font-medium`}>
//                   {getInitials(project.customerName)}
//                 </div>
//                 <div>
//                   <div 
//                     className="text-sm font-semibold text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                     onClick={() => onProjectClick(project.id)}
//                   >
//                     {project.customerName}
//                   </div>
//                   <p className="text-xs text-gray-500">{project.projectName}</p>
//                 </div>
//               </div>
//               <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
//                 {project.status}
//               </span>
//             </div>
//             <p className="text-xs text-gray-600 line-clamp-2 mb-3">{project.description}</p>
//             <div className="grid grid-cols-2 gap-2 mb-3">
//               <div className="bg-gray-50 rounded p-2">
//                 <div className="text-[10px] text-gray-500">Billing</div>
//                 <div className="text-xs font-medium text-gray-700 truncate">{project.billingMethod}</div>
//               </div>
//               <div className="bg-gray-50 rounded p-2">
//                 <div className="text-[10px] text-gray-500">Rate</div>
//                 <div className="text-xs font-medium text-gray-700">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</div>
//               </div>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center space-x-1">
//                 <Clock className="w-4 h-4 text-gray-400" />
//                 <span className="font-mono">{project.loggedHours}</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <DollarSign className="w-4 h-4 text-gray-400" />
//                 <span>${project.budget?.toFixed(2) || '0'}</span>
//               </div>
//             </div>
//             <div className="mt-3 flex items-center justify-between">
//               <button className="text-xs text-blue-600 hover:text-blue-700">Create Expense</button>
//               <button className="text-xs text-gray-500 hover:text-gray-700">Log Time</button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );

//   return (
//     <>
//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex flex-wrap items-center space-x-4 gap-2">
//             <div className="relative">
//               <select 
//                 className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500" 
//                 value={viewBy} 
//                 onChange={(e) => setViewBy(e.target.value as any)}
//               >
//                 <option value="all">All Projects</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="completed">Completed</option>
//               </select>
//               <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-500 pointer-events-none" />
//             </div>
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
//               <input 
//                 type="text" 
//                 placeholder="Search projects..." 
//                 className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-48 md:w-64" 
//                 value={searchTerm} 
//                 onChange={(e) => setSearchTerm(e.target.value)} 
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
//               <button 
//                 onClick={() => setViewMode('list')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <List className="w-4 h-4" /><span>List</span>
//               </button>
//               <button 
//                 onClick={() => setViewMode('card')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'card' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <LayoutGrid className="w-4 h-4" /><span>Card</span>
//               </button>
//             </div>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Filter className="w-4 h-4 mr-1" />Filter
//             </button>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Download className="w-4 h-4 mr-1" />Export
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Bulk Update */}
//       {selectedProjects.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
//           <span className="text-sm text-blue-700 font-medium">{selectedProjects.length} selected</span>
//           <div className="flex items-center space-x-2">
//             <button onClick={() => handleBulkAction('active')} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">Active</button>
//             <button onClick={() => handleBulkAction('inactive')} className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">Inactive</button>
//             <button onClick={() => handleBulkAction('delete')} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
//             <button onClick={() => setSelectedProjects([])} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">Clear</button>
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       {viewMode === 'list' ? renderListView() : renderCardView()}

//       {/* Stats */}
//       <div className="grid grid-cols-4 gap-4 mt-6">
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Total</div>
//           <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Active</div>
//           <div className="text-2xl font-bold text-green-600">{projects.filter((p: Project) => p.status === 'active').length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Hours</div>
//           <div className="text-2xl font-bold text-blue-600">455:48</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Revenue</div>
//           <div className="text-2xl font-bold text-purple-600">$29,500</div>
//         </div>
//       </div>
//     </>
//   );
// };

// // ==================== MAIN COMPONENT ====================
// const ProjectList: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabType>('projects');
//   const [viewMode, setViewMode] = useState<ViewMode>('list');
//   const [viewBy, setViewBy] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
//   const [view, setView] = useState<ViewState>('list');
//   const [editProjectData, setEditProjectData] = useState<Project | null>(null);

//   const [projects, setProjects] = useState<Project[]>([
//     { id: '1', customerName: 'Bruce Wayne', projectName: 'Design contract for Mr. Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '106:41', budget: 5000, startDate: '2024-01-15', endDate: '2024-06-30', description: 'Complete UI/UX design for Wayne Enterprises', createdAt: '', updatedAt: '' },
//     { id: '2', customerName: 'Bruce Wayne', projectName: 'Design project for Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '35:28', budget: 3000, startDate: '2024-02-01', endDate: '2024-07-15', description: 'Redesign of corporate website', createdAt: '', updatedAt: '' },
//     { id: '3', customerName: 'Aaron Brown', projectName: 'Design project for MR.X', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '138:00', budget: 8000, startDate: '2024-01-10', endDate: '2024-08-20', description: 'Mobile app design for MR.X', createdAt: '', updatedAt: '' },
//     { id: '4', customerName: 'Aaron Brown', projectName: 'Design project - Z', billingMethod: 'Based on Task Hours', rate: null, status: 'active', loggedHours: '26:00', budget: 2500, startDate: '2024-03-01', endDate: '2024-09-01', description: 'Logo and branding design', createdAt: '', updatedAt: '' },
//     { id: '5', customerName: 'Dinesh Ramamurthy', projectName: 'Designing project', billingMethod: 'Based on Project Hours', rate: 45, status: 'active', loggedHours: '32:04', budget: 2000, startDate: '2024-02-15', endDate: '2024-07-01', description: 'Web application interface design', createdAt: '', updatedAt: '' },
//     { id: '6', customerName: 'Arthur K', projectName: 'Web app designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '65:00', budget: 4500, startDate: '2024-01-20', endDate: '2024-10-15', description: 'E-commerce platform design', createdAt: '', updatedAt: '' },
//     { id: '7', customerName: 'Aaron Brown', projectName: 'Web Designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'completed', loggedHours: '52:35', budget: 3500, startDate: '2023-12-01', endDate: '2024-05-30', description: 'Corporate website redesign', createdAt: '', updatedAt: '' },
//     { id: '8', customerName: 'Aaron Brown', projectName: 'Web designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'inactive', loggedHours: '00:00', budget: 1000, startDate: '2024-04-01', endDate: '2024-12-31', description: 'Portfolio website design', createdAt: '', updatedAt: '' }
//   ]);

//   const handleDeleteProject = (id: string) => {
//     if (window.confirm('Delete this project?')) {
//       setProjects((prev: Project[]) => prev.filter((p: Project) => p.id !== id));
//     }
//   };

//   const handleProjectClick = (projectId: string) => {
//     setSelectedProjectId(projectId);
//     setView('detail');
//   };

//   const handleBackToList = () => {
//     setSelectedProjectId(null);
//     setView('list');
//     setEditProjectData(null);
//   };

//   const handleEditClick = (project: Project) => {
//     setEditProjectData(project);
//     setView('edit');
//   };

//   const handleEditSave = (updatedData: any) => {
//     const existingProject = projects.find(p => p.id === updatedData.id);
//     if (!existingProject) return;

//     const updatedProjects = projects.map((p: Project) => {
//       if (p.id === updatedData.id) {
//         return {
//           ...p,
//           projectName: updatedData.name,
//           description: updatedData.description,
//           billingMethod: updatedData.billingMethod as Project['billingMethod'],
//           rate: updatedData.rate,
//           budget: updatedData.budget,
//           status: updatedData.status as Project['status'],
//           startDate: updatedData.startDate,
//           endDate: updatedData.endDate,
//           customerName: updatedData.customerName,
//           updatedAt: new Date().toISOString()
//         };
//       }
//       return p;
//     });

//     setProjects(updatedProjects);
//     setTimeout(() => {
//       setView('list');
//       setEditProjectData(null);
//     }, 100);
//   };

//   // Handle Create New Project
//   const handleCreateProject = (projectData: any) => {
//     const newProject: Project = {
//       id: String(Date.now()),
//       customerName: projectData.customerName,
//       projectName: projectData.projectName,
//       billingMethod: projectData.billingMethod as Project['billingMethod'],
//       rate: projectData.rate || null,
//       status: projectData.status as Project['status'],
//       loggedHours: '00:00',
//       budget: projectData.budget || null,
//       startDate: projectData.startDate || '',
//       endDate: projectData.endDate || '',
//       description: projectData.description || '',
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     };
//     setProjects([newProject, ...projects]);
//     setView('list');
//   };

//   // Render create view
//   if (view === 'create') {
//     return <CreateProjectPage onBack={handleBackToList} onSave={handleCreateProject} />;
//   }

//   // Render edit view
//   if (view === 'edit' && editProjectData) {
//     const editData = {
//       id: editProjectData.id,
//       name: editProjectData.projectName,
//       description: editProjectData.description,
//       billingMethod: editProjectData.billingMethod,
//       rate: editProjectData.rate || 0,
//       budget: editProjectData.budget || 0,
//       status: editProjectData.status,
//       startDate: editProjectData.startDate,
//       endDate: editProjectData.endDate,
//       customerName: editProjectData.customerName,
//       assignedUsers: []
//     };
//     return (
//       <ProjectEdit 
//         projectId={editProjectData.id}
//         projectName={editProjectData.projectName}
//         onBack={handleBackToList}
//         onSave={handleEditSave}
//         initialData={editData}
//       />
//     );
//   }

//   // Render detail view
//   if (view === 'detail' && selectedProjectId) {
//     return <ProjectDetail projectId={selectedProjectId} onBack={handleBackToList} />;
//   }

//   const renderTabContent = () => {
//     switch(activeTab) {
//       case 'projects':
//         return (
//           <ProjectsTab
//             viewMode={viewMode}
//             setViewMode={setViewMode}
//             viewBy={viewBy}
//             setViewBy={setViewBy}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             projects={projects}
//             setProjects={setProjects}
//             selectedProjects={selectedProjects}
//             setSelectedProjects={setSelectedProjects}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//             itemsPerPage={itemsPerPage}
//             handleDeleteProject={handleDeleteProject}
//             onProjectClick={handleProjectClick}
//             onEditClick={handleEditClick}
//           />
//         );
//       case 'taskboard':
//         return <TaskBoard />;
//       case 'timetracker':
//         return <TimeTracker />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* ✅ Header with buttons - Proper alignment */}
//       <div className="flex flex-wrap items-center justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {activeTab === 'projects' && 'Projects'}
//             {activeTab === 'taskboard' && 'Task Board'}
//             {activeTab === 'timetracker' && 'Time Tracker'}
//           </h1>
//           <p className="text-sm text-gray-500 hidden sm:block">
//             {activeTab === 'projects' && 'Manage all your projects from one place'}
//             {activeTab === 'taskboard' && 'Manage and track tasks across your projects'}
//             {activeTab === 'timetracker' && 'Track and log time for your projects'}
//           </p>
//         </div>
//         {/* ✅ Three buttons together - Right aligned */}
//         {activeTab === 'projects' && (
//           <div className="flex flex-wrap items-center gap-2">
//             <button 
//               onClick={() => setView('create')} 
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               New Project
//             </button>
//             <button 
//               className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Play className="w-4 h-4 mr-2" />
//               Start
//             </button>
//             <button 
//               className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center hover:bg-gray-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Clock className="w-4 h-4 mr-2" />
//               Log Time
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 mb-6">
//         <nav className="flex space-x-6">
//           <button 
//             onClick={() => setActiveTab('projects')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'projects' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <LayoutDashboard className="w-4 h-4" />
//             <span>Projects</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('taskboard')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'taskboard' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <ClipboardList className="w-4 h-4" />
//             <span>Task Board</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('timetracker')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'timetracker' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <Timer className="w-4 h-4" />
//             <span>Time Tracker</span>
//           </button>
//         </nav>
//       </div>

//       {/* Content */}
//       <div>
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// export default ProjectList;
// src/client/components/projects/ProjectList.tsx
// import React, { useState } from 'react';
// import { 
//   Search, 
//   Plus, 
//   Filter, 
//   Clock, 
//   MoreVertical, 
//   Edit, 
//   Trash2, 
//   Copy,
//   FileText,
//   Play,
//   ChevronDown,
//   Download,
//   Upload,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   LayoutGrid,
//   List,
//   DollarSign,
//   User,
//   Calendar,
//   Tag,
//   LayoutDashboard,
//   ClipboardList,
//   Timer,
//   Save,
//   X,
//   Users,
//   Pause,
//   Square,
//   Circle,
//   ArrowLeft
// } from 'lucide-react';
// import TimeTracker from './TimeTracker';
// import TaskBoard from './TaskBoard';
// import ProjectDetail from './ProjectDetail';
// import ProjectEdit from './ProjectEdit';

// // ==================== TYPES ====================
// interface Project {
//   id: string;
//   customerName: string;
//   projectName: string;
//   billingMethod: 'Based on Task Hours' | 'Based on Project Hours' | 'Fixed Cost for Project' | 'Based on Staff Hours';
//   rate: number | null;
//   status: 'active' | 'inactive' | 'completed';
//   loggedHours: string;
//   budget: number | null;
//   startDate: string;
//   endDate: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

// type ViewMode = 'list' | 'card';
// type TabType = 'projects' | 'taskboard' | 'timetracker';
// type ViewState = 'list' | 'detail' | 'edit' | 'create';

// // ==================== CREATE PROJECT PAGE ====================
// interface CreateProjectPageProps {
//   onBack: () => void;
//   onSave: (projectData: any) => void;
// }

// const CreateProjectPage: React.FC<CreateProjectPageProps> = ({ onBack, onSave }) => {
//   const [formData, setFormData] = useState({
//     projectName: '',
//     customerName: '',
//     billingMethod: 'Based on Task Hours',
//     rate: 0,
//     budget: 0,
//     status: 'active' as 'active' | 'inactive' | 'completed',
//     startDate: '',
//     endDate: '',
//     description: '',
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSaving, setIsSaving] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSubmit = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
//     if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsSaving(true);

//     setTimeout(() => {
//       onSave({
//         ...formData,
//         loggedHours: '00:00',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       });
//       setIsSaving(false);
//     }, 500);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
//         <div className="flex items-center gap-3">
//           <button 
//             onClick={onBack} 
//             className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
//             <p className="text-sm text-gray-500">Fill in the details to create a new project</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <button 
//             onClick={onBack} 
//             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm flex items-center"
//           >
//             <X className="w-4 h-4 mr-1.5" /> Cancel
//           </button>
//           <button 
//             onClick={handleSubmit} 
//             disabled={isSaving} 
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center disabled:opacity-50 shadow-sm"
//           >
//             <Save className="w-4 h-4 mr-1.5" />
//             {isSaving ? 'Creating...' : 'Create Project'}
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-3xl mx-auto">
//         <div className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Name <span className="text-red-500">*</span>
//             </label>
//             <input 
//               type="text" 
//               name="projectName" 
//               value={formData.projectName} 
//               onChange={handleChange} 
//               className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.projectName ? 'border-red-300' : 'border-gray-300'}`} 
//               placeholder="Enter project name" 
//             />
//             {errors.projectName && <p className="text-xs text-red-500 mt-1">{errors.projectName}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Customer <span className="text-red-500">*</span>
//             </label>
//             <input 
//               type="text" 
//               name="customerName" 
//               value={formData.customerName} 
//               onChange={handleChange} 
//               className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.customerName ? 'border-red-300' : 'border-gray-300'}`} 
//               placeholder="Enter customer name" 
//             />
//             {errors.customerName && <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Billing Method <span className="text-red-500">*</span>
//             </label>
//             <select 
//               name="billingMethod" 
//               value={formData.billingMethod} 
//               onChange={handleChange} 
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="Based on Task Hours">Based on Task Hours</option>
//               <option value="Based on Project Hours">Based on Project Hours</option>
//               <option value="Fixed Cost for Project">Fixed Cost for Project</option>
//               <option value="Based on Staff Hours">Based on Staff Hours</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-2 text-gray-500">$</span>
//                 <input 
//                   type="number" 
//                   name="rate" 
//                   value={formData.rate} 
//                   onChange={handleChange} 
//                   className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//                   placeholder="0.00" 
//                   min="0" 
//                   step="0.5" 
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-2 text-gray-500">$</span>
//                 <input 
//                   type="number" 
//                   name="budget" 
//                   value={formData.budget} 
//                   onChange={handleChange} 
//                   className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//                   placeholder="0.00" 
//                   min="0" 
//                   step="100" 
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//               <input 
//                 type="date" 
//                 name="startDate" 
//                 value={formData.startDate} 
//                 onChange={handleChange} 
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//               <input 
//                 type="date" 
//                 name="endDate" 
//                 value={formData.endDate} 
//                 onChange={handleChange} 
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//             <select 
//               name="status" 
//               value={formData.status} 
//               onChange={handleChange} 
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea 
//               name="description" 
//               value={formData.description} 
//               onChange={handleChange} 
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
//               rows={3} 
//               placeholder="Max 2000 characters" 
//               maxLength={2000} 
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== PROJECTS TAB ====================
// interface ProjectsTabProps {
//   viewMode: ViewMode;
//   setViewMode: (mode: ViewMode) => void;
//   viewBy: 'all' | 'active' | 'inactive' | 'completed';
//   setViewBy: (view: 'all' | 'active' | 'inactive' | 'completed') => void;
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   projects: Project[];
//   setProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
//   selectedProjects: string[];
//   setSelectedProjects: (ids: string[] | ((prev: string[]) => string[])) => void;
//   currentPage: number;
//   setCurrentPage: (page: number) => void;
//   itemsPerPage: number;
//   handleDeleteProject: (id: string) => void;
//   onProjectClick: (projectId: string) => void;
//   onEditClick: (project: Project) => void;
//   onStartTimer: (projectName: string) => void;
// }

// const ProjectsTab: React.FC<ProjectsTabProps> = ({
//   viewMode,
//   setViewMode,
//   viewBy,
//   setViewBy,
//   searchTerm,
//   setSearchTerm,
//   projects,
//   setProjects,
//   selectedProjects,
//   setSelectedProjects,
//   currentPage,
//   setCurrentPage,
//   itemsPerPage,
//   handleDeleteProject,
//   onProjectClick,
//   onEditClick,
//   onStartTimer
// }) => {
//   const filteredProjects = projects.filter((project: Project) => {
//     const matchesView = viewBy === 'all' || project.status === viewBy;
//     const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          project.customerName.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesView && matchesSearch;
//   });

//   const paginatedProjects = filteredProjects.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

//   const toggleProjectSelection = (projectId: string) => {
//     setSelectedProjects((prev: string[]) =>
//       prev.includes(projectId)
//         ? prev.filter((id: string) => id !== projectId)
//         : [...prev, projectId]
//     );
//   };

//   const toggleAllProjects = () => {
//     if (selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0) {
//       setSelectedProjects([]);
//     } else {
//       setSelectedProjects(paginatedProjects.map((p: Project) => p.id));
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch(status) {
//       case 'active': return 'bg-green-100 text-green-800 border-green-200';
//       case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
//       case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch(status) {
//       case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
//       case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
//       default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getBillingMethodBadgeColor = (method: string) => {
//     switch(method) {
//       case 'Based on Task Hours': return 'bg-purple-100 text-purple-800';
//       case 'Based on Project Hours': return 'bg-blue-100 text-blue-800';
//       case 'Fixed Cost for Project': return 'bg-green-100 text-green-800';
//       case 'Based on Staff Hours': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const handleBulkAction = (action: string) => {
//     switch(action) {
//       case 'active':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'active' } : p
//         ));
//         break;
//       case 'inactive':
//         setProjects((prev: Project[]) => prev.map((p: Project) => 
//           selectedProjects.includes(p.id) ? { ...p, status: 'inactive' } : p
//         ));
//         break;
//       case 'delete':
//         setProjects((prev: Project[]) => prev.filter((p: Project) => !selectedProjects.includes(p.id)));
//         break;
//     }
//     setSelectedProjects([]);
//   };

//   const renderListView = () => (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left w-10">
//                 <input 
//                   type="checkbox" 
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                   checked={selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0} 
//                   onChange={toggleAllProjects} 
//                 />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Customer
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
//                 Project
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Billing
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Rate
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Hours
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Budget
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {paginatedProjects.length === 0 ? (
//               <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">No projects found</td></tr>
//             ) : (
//               paginatedProjects.map((project: Project) => (
//                 <tr key={project.id} className="hover:bg-gray-50 transition">
//                   <td className="px-4 py-3">
//                     <input 
//                       type="checkbox" 
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
//                       checked={selectedProjects.includes(project.id)} 
//                       onChange={() => toggleProjectSelection(project.id)} 
//                     />
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.customerName}
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div 
//                       className="text-sm font-medium text-gray-800 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                       onClick={() => onProjectClick(project.id)}
//                     >
//                       {project.projectName}
//                     </div>
//                     <div className="text-xs text-gray-500 truncate max-w-xs">{project.description}</div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBillingMethodBadgeColor(project.billingMethod)}`}>
//                       {project.billingMethod}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
//                       {getStatusIcon(project.status)}
//                       <span className="ml-1">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <Clock className="w-4 h-4 mr-1 text-gray-400" />
//                       <span className="font-mono">{project.loggedHours}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">{project.budget ? `$${project.budget.toFixed(2)}` : '-'}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center space-x-1">
//                       <button 
//                         onClick={() => onEditClick(project)} 
//                         className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition"
//                         title="Edit"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       {/* ✅ Start Timer button - opens Time Tracker with project name */}
//                       <button 
//                         onClick={() => onStartTimer(project.projectName)} 
//                         className="p-1.5 text-gray-400 hover:text-green-600 rounded hover:bg-green-50 transition"
//                         title="Start Timer"
//                       >
//                         <Play className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => { 
//                           const np = { ...project, id: String(Date.now()), projectName: `${project.projectName} (Copy)`, loggedHours: '00:00' }; 
//                           setProjects((prev: Project[]) => [...prev, np]); 
//                         }} 
//                         className="p-1.5 text-gray-400 hover:text-purple-600 rounded hover:bg-purple-50 transition"
//                         title="Clone"
//                       >
//                         <Copy className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteProject(project.id)} 
//                         className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       {filteredProjects.length > 0 && (
//         <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
//           <div className="text-sm text-gray-700">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} results
//           </div>
//           <div className="flex items-center space-x-2">
//             <button 
//               onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} 
//               disabled={currentPage === 1} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p: number) => (
//               <button 
//                 key={p} 
//                 onClick={() => setCurrentPage(p)} 
//                 className={`px-3 py-1 rounded text-sm ${currentPage === p ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
//               >
//                 {p}
//               </button>
//             ))}
//             {totalPages > 5 && <span className="text-sm text-gray-500">...</span>}
//             <button 
//               onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} 
//               disabled={currentPage === totalPages} 
//               className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderCardView = () => {
//     const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
//     const getRandomColor = (name: string) => {
//       const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
//       return colors[name.length % colors.length];
//     };
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {paginatedProjects.map((project: Project) => (
//           <div 
//             key={project.id} 
//             className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition p-4 cursor-pointer"
//             onClick={() => onProjectClick(project.id)}
//           >
//             <div className="flex items-start justify-between mb-3">
//               <div className="flex items-center space-x-2">
//                 <div className={`w-8 h-8 rounded-full ${getRandomColor(project.customerName)} text-white flex items-center justify-center text-xs font-medium`}>
//                   {getInitials(project.customerName)}
//                 </div>
//                 <div>
//                   <div 
//                     className="text-sm font-semibold text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
//                     onClick={() => onProjectClick(project.id)}
//                   >
//                     {project.customerName}
//                   </div>
//                   <p className="text-xs text-gray-500">{project.projectName}</p>
//                 </div>
//               </div>
//               <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
//                 {project.status}
//               </span>
//             </div>
//             <p className="text-xs text-gray-600 line-clamp-2 mb-3">{project.description}</p>
//             <div className="grid grid-cols-2 gap-2 mb-3">
//               <div className="bg-gray-50 rounded p-2">
//                 <div className="text-[10px] text-gray-500">Billing</div>
//                 <div className="text-xs font-medium text-gray-700 truncate">{project.billingMethod}</div>
//               </div>
//               <div className="bg-gray-50 rounded p-2">
//                 <div className="text-[10px] text-gray-500">Rate</div>
//                 <div className="text-xs font-medium text-gray-700">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</div>
//               </div>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center space-x-1">
//                 <Clock className="w-4 h-4 text-gray-400" />
//                 <span className="font-mono">{project.loggedHours}</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <DollarSign className="w-4 h-4 text-gray-400" />
//                 <span>${project.budget?.toFixed(2) || '0'}</span>
//               </div>
//             </div>
//             <div className="mt-3 flex items-center justify-between">
//               <button className="text-xs text-blue-600 hover:text-blue-700">Create Expense</button>
//               {/* ✅ Start Timer button in card view */}
//               <button 
//                 onClick={() => onStartTimer(project.projectName)} 
//                 className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1"
//               >
//                 <Play className="w-3 h-3" /> Start Timer
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <>
//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex flex-wrap items-center space-x-4 gap-2">
//             <div className="relative">
//               <select 
//                 className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500" 
//                 value={viewBy} 
//                 onChange={(e) => setViewBy(e.target.value as any)}
//               >
//                 <option value="all">All Projects</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="completed">Completed</option>
//               </select>
//               <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-500 pointer-events-none" />
//             </div>
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
//               <input 
//                 type="text" 
//                 placeholder="Search projects..." 
//                 className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-48 md:w-64" 
//                 value={searchTerm} 
//                 onChange={(e) => setSearchTerm(e.target.value)} 
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
//               <button 
//                 onClick={() => setViewMode('list')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <List className="w-4 h-4" /><span>List</span>
//               </button>
//               <button 
//                 onClick={() => setViewMode('card')} 
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'card' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//               >
//                 <LayoutGrid className="w-4 h-4" /><span>Card</span>
//               </button>
//             </div>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Filter className="w-4 h-4 mr-1" />Filter
//             </button>
//             <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
//               <Download className="w-4 h-4 mr-1" />Export
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Bulk Update */}
//       {selectedProjects.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
//           <span className="text-sm text-blue-700 font-medium">{selectedProjects.length} selected</span>
//           <div className="flex items-center space-x-2">
//             <button onClick={() => handleBulkAction('active')} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">Active</button>
//             <button onClick={() => handleBulkAction('inactive')} className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">Inactive</button>
//             <button onClick={() => handleBulkAction('delete')} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
//             <button onClick={() => setSelectedProjects([])} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">Clear</button>
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       {viewMode === 'list' ? renderListView() : renderCardView()}

//       {/* Stats */}
//       <div className="grid grid-cols-4 gap-4 mt-6">
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Total</div>
//           <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Active</div>
//           <div className="text-2xl font-bold text-green-600">{projects.filter((p: Project) => p.status === 'active').length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Hours</div>
//           <div className="text-2xl font-bold text-blue-600">455:48</div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="text-sm text-gray-500">Revenue</div>
//           <div className="text-2xl font-bold text-purple-600">$29,500</div>
//         </div>
//       </div>
//     </>
//   );
// };

// // ==================== MAIN COMPONENT ====================
// const ProjectList: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabType>('projects');
//   const [viewMode, setViewMode] = useState<ViewMode>('list');
//   const [viewBy, setViewBy] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
//   const [view, setView] = useState<ViewState>('list');
//   const [editProjectData, setEditProjectData] = useState<Project | null>(null);
//   const [timerProjectName, setTimerProjectName] = useState<string>('');

//   const [projects, setProjects] = useState<Project[]>([
//     { id: '1', customerName: 'Bruce Wayne', projectName: 'Design contract for Mr. Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '106:41', budget: 5000, startDate: '2024-01-15', endDate: '2024-06-30', description: 'Complete UI/UX design for Wayne Enterprises', createdAt: '', updatedAt: '' },
//     { id: '2', customerName: 'Bruce Wayne', projectName: 'Design project for Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '35:28', budget: 3000, startDate: '2024-02-01', endDate: '2024-07-15', description: 'Redesign of corporate website', createdAt: '', updatedAt: '' },
//     { id: '3', customerName: 'Aaron Brown', projectName: 'Design project for MR.X', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '138:00', budget: 8000, startDate: '2024-01-10', endDate: '2024-08-20', description: 'Mobile app design for MR.X', createdAt: '', updatedAt: '' },
//     { id: '4', customerName: 'Aaron Brown', projectName: 'Design project - Z', billingMethod: 'Based on Task Hours', rate: null, status: 'active', loggedHours: '26:00', budget: 2500, startDate: '2024-03-01', endDate: '2024-09-01', description: 'Logo and branding design', createdAt: '', updatedAt: '' },
//     { id: '5', customerName: 'Dinesh Ramamurthy', projectName: 'Designing project', billingMethod: 'Based on Project Hours', rate: 45, status: 'active', loggedHours: '32:04', budget: 2000, startDate: '2024-02-15', endDate: '2024-07-01', description: 'Web application interface design', createdAt: '', updatedAt: '' },
//     { id: '6', customerName: 'Arthur K', projectName: 'Web app designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '65:00', budget: 4500, startDate: '2024-01-20', endDate: '2024-10-15', description: 'E-commerce platform design', createdAt: '', updatedAt: '' },
//     { id: '7', customerName: 'Aaron Brown', projectName: 'Web Designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'completed', loggedHours: '52:35', budget: 3500, startDate: '2023-12-01', endDate: '2024-05-30', description: 'Corporate website redesign', createdAt: '', updatedAt: '' },
//     { id: '8', customerName: 'Aaron Brown', projectName: 'Web designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'inactive', loggedHours: '00:00', budget: 1000, startDate: '2024-04-01', endDate: '2024-12-31', description: 'Portfolio website design', createdAt: '', updatedAt: '' }
//   ]);

//   const handleDeleteProject = (id: string) => {
//     if (window.confirm('Delete this project?')) {
//       setProjects((prev: Project[]) => prev.filter((p: Project) => p.id !== id));
//     }
//   };

//   const handleProjectClick = (projectId: string) => {
//     setSelectedProjectId(projectId);
//     setView('detail');
//   };

//   const handleBackToList = () => {
//     setSelectedProjectId(null);
//     setView('list');
//     setEditProjectData(null);
//   };

//   const handleEditClick = (project: Project) => {
//     setEditProjectData(project);
//     setView('edit');
//   };

//   const handleEditSave = (updatedData: any) => {
//     const existingProject = projects.find(p => p.id === updatedData.id);
//     if (!existingProject) return;

//     const updatedProjects = projects.map((p: Project) => {
//       if (p.id === updatedData.id) {
//         return {
//           ...p,
//           projectName: updatedData.name,
//           description: updatedData.description,
//           billingMethod: updatedData.billingMethod as Project['billingMethod'],
//           rate: updatedData.rate,
//           budget: updatedData.budget,
//           status: updatedData.status as Project['status'],
//           startDate: updatedData.startDate,
//           endDate: updatedData.endDate,
//           customerName: updatedData.customerName,
//           updatedAt: new Date().toISOString()
//         };
//       }
//       return p;
//     });

//     setProjects(updatedProjects);
//     setTimeout(() => {
//       setView('list');
//       setEditProjectData(null);
//     }, 100);
//   };

//   // Handle Create New Project
//   const handleCreateProject = (projectData: any) => {
//     const newProject: Project = {
//       id: String(Date.now()),
//       customerName: projectData.customerName,
//       projectName: projectData.projectName,
//       billingMethod: projectData.billingMethod as Project['billingMethod'],
//       rate: projectData.rate || null,
//       status: projectData.status as Project['status'],
//       loggedHours: '00:00',
//       budget: projectData.budget || null,
//       startDate: projectData.startDate || '',
//       endDate: projectData.endDate || '',
//       description: projectData.description || '',
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     };
//     setProjects([newProject, ...projects]);
//     setView('list');
//   };

//   // ✅ Handle Start Timer - Switches to Time Tracker tab
//   const handleStartTimer = (projectName: string) => {
//     setTimerProjectName(projectName);
//     setActiveTab('timetracker');
//   };

//   // Render create view
//   if (view === 'create') {
//     return <CreateProjectPage onBack={handleBackToList} onSave={handleCreateProject} />;
//   }

//   // Render edit view
//   if (view === 'edit' && editProjectData) {
//     const editData = {
//       id: editProjectData.id,
//       name: editProjectData.projectName,
//       description: editProjectData.description,
//       billingMethod: editProjectData.billingMethod,
//       rate: editProjectData.rate || 0,
//       budget: editProjectData.budget || 0,
//       status: editProjectData.status,
//       startDate: editProjectData.startDate,
//       endDate: editProjectData.endDate,
//       customerName: editProjectData.customerName,
//       assignedUsers: []
//     };
//     return (
//       <ProjectEdit 
//         projectId={editProjectData.id}
//         projectName={editProjectData.projectName}
//         onBack={handleBackToList}
//         onSave={handleEditSave}
//         initialData={editData}
//       />
//     );
//   }

//   // Render detail view
//   if (view === 'detail' && selectedProjectId) {
//     return <ProjectDetail projectId={selectedProjectId} onBack={handleBackToList} />;
//   }

//   const renderTabContent = () => {
//     switch(activeTab) {
//       case 'projects':
//         return (
//           <ProjectsTab
//             viewMode={viewMode}
//             setViewMode={setViewMode}
//             viewBy={viewBy}
//             setViewBy={setViewBy}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             projects={projects}
//             setProjects={setProjects}
//             selectedProjects={selectedProjects}
//             setSelectedProjects={setSelectedProjects}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//             itemsPerPage={itemsPerPage}
//             handleDeleteProject={handleDeleteProject}
//             onProjectClick={handleProjectClick}
//             onEditClick={handleEditClick}
//             onStartTimer={handleStartTimer}
//           />
//         );
//       case 'taskboard':
//         return <TaskBoard />;
//       case 'timetracker':
//         // Pass the project name to TimeTracker via a prop or context
//         return <TimeTracker preselectedProject={timerProjectName} />;
//       default:
//         return null;
//     }
//   };

//   // ✅ Header Start button - switches to Time Tracker tab
//   const handleHeaderStart = () => {
//     setTimerProjectName('');
//     setActiveTab('timetracker');
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header with New Project, Start, and Log Time buttons */}
//       <div className="flex flex-wrap items-center justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {activeTab === 'projects' && 'Projects'}
//             {activeTab === 'taskboard' && 'Task Board'}
//             {activeTab === 'timetracker' && 'Time Tracker'}
//           </h1>
//           <p className="text-sm text-gray-500 hidden sm:block">
//             {activeTab === 'projects' && 'Manage all your projects from one place'}
//             {activeTab === 'taskboard' && 'Manage and track tasks across your projects'}
//             {activeTab === 'timetracker' && 'Track and log time for your projects'}
//           </p>
//         </div>
//         {/* Three buttons together */}
//         {activeTab === 'projects' && (
//           <div className="flex flex-wrap items-center gap-2">
//             <button 
//               onClick={() => setView('create')} 
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               New Project
//             </button>
//             {/* ✅ Start button - switches to Time Tracker tab */}
//             <button 
//               onClick={handleHeaderStart}
//               className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Play className="w-4 h-4 mr-2" />
//               Start
//             </button>
//             <button 
//               className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center hover:bg-gray-700 text-sm shadow-sm whitespace-nowrap"
//             >
//               <Clock className="w-4 h-4 mr-2" />
//               Log Time
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 mb-6">
//         <nav className="flex space-x-6">
//           <button 
//             onClick={() => setActiveTab('projects')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'projects' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <LayoutDashboard className="w-4 h-4" />
//             <span>Projects</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('taskboard')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'taskboard' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <ClipboardList className="w-4 h-4" />
//             <span>Task Board</span>
//           </button>
//           <button 
//             onClick={() => setActiveTab('timetracker')} 
//             className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
//               activeTab === 'timetracker' 
//                 ? 'border-blue-600 text-blue-600' 
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <Timer className="w-4 h-4" />
//             <span>Time Tracker</span>
//           </button>
//         </nav>
//       </div>

//       {/* Content */}
//       <div>
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// export default ProjectList;
// src/client/components/projects/ProjectList.tsx
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Clock, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Copy,
  FileText,
  Play,
  ChevronDown,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  LayoutGrid,
  List,
  DollarSign,
  User,
  Calendar,
  Tag,
  LayoutDashboard,
  ClipboardList,
  Timer,
  Save,
  X,
  Users,
  Pause,
  Square,
  Circle,
  ArrowLeft
} from 'lucide-react';
import TimeTracker from './TimeTracker';
import TaskBoard from './TaskBoard';
import ProjectDetail from './ProjectDetail';
import ProjectEdit from './ProjectEdit';
// import LogTimePage from './LogTimePage'; // ✅ Add this import
import LogTimePage from './LogTimePage';
// ==================== TYPES ====================
interface Project {
  id: string;
  customerName: string;
  projectName: string;
  billingMethod: 'Based on Task Hours' | 'Based on Project Hours' | 'Fixed Cost for Project' | 'Based on Staff Hours';
  rate: number | null;
  status: 'active' | 'inactive' | 'completed';
  loggedHours: string;
  budget: number | null;
  startDate: string;
  endDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

type ViewMode = 'list' | 'card';
type TabType = 'projects' | 'taskboard' | 'timetracker';
type ViewState = 'list' | 'detail' | 'edit' | 'create';

// ==================== CREATE PROJECT PAGE ====================
interface CreateProjectPageProps {
  onBack: () => void;
  onSave: (projectData: any) => void;
}

const CreateProjectPage: React.FC<CreateProjectPageProps> = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    customerName: '',
    billingMethod: 'Based on Task Hours',
    rate: 0,
    budget: 0,
    status: 'active' as 'active' | 'inactive' | 'completed',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      onSave({
        ...formData,
        loggedHours: '00:00',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
            <p className="text-sm text-gray-500">Fill in the details to create a new project</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack} 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm flex items-center"
          >
            <X className="w-4 h-4 mr-1.5" /> Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={isSaving} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center disabled:opacity-50 shadow-sm"
          >
            <Save className="w-4 h-4 mr-1.5" />
            {isSaving ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-3xl mx-auto">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="projectName" 
              value={formData.projectName} 
              onChange={handleChange} 
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.projectName ? 'border-red-300' : 'border-gray-300'}`} 
              placeholder="Enter project name" 
            />
            {errors.projectName && <p className="text-xs text-red-500 mt-1">{errors.projectName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="customerName" 
              value={formData.customerName} 
              onChange={handleChange} 
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.customerName ? 'border-red-300' : 'border-gray-300'}`} 
              placeholder="Enter customer name" 
            />
            {errors.customerName && <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Billing Method <span className="text-red-500">*</span>
            </label>
            <select 
              name="billingMethod" 
              value={formData.billingMethod} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="Based on Task Hours">Based on Task Hours</option>
              <option value="Based on Project Hours">Based on Project Hours</option>
              <option value="Fixed Cost for Project">Fixed Cost for Project</option>
              <option value="Based on Staff Hours">Based on Staff Hours</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rate Per Hour</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input 
                  type="number" 
                  name="rate" 
                  value={formData.rate} 
                  onChange={handleChange} 
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
                  placeholder="0.00" 
                  min="0" 
                  step="0.5" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input 
                  type="number" 
                  name="budget" 
                  value={formData.budget} 
                  onChange={handleChange} 
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
                  placeholder="0.00" 
                  min="0" 
                  step="100" 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                type="date" 
                name="startDate" 
                value={formData.startDate} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                type="date" 
                name="endDate" 
                value={formData.endDate} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
              rows={3} 
              placeholder="Max 2000 characters" 
              maxLength={2000} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== PROJECTS TAB ====================
interface ProjectsTabProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  viewBy: 'all' | 'active' | 'inactive' | 'completed';
  setViewBy: (view: 'all' | 'active' | 'inactive' | 'completed') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  projects: Project[];
  setProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
  selectedProjects: string[];
  setSelectedProjects: (ids: string[] | ((prev: string[]) => string[])) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  handleDeleteProject: (id: string) => void;
  onProjectClick: (projectId: string) => void;
  onEditClick: (project: Project) => void;
  onStartTimer: (projectName: string) => void;
  onLogTime: (projectName: string) => void;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({
  viewMode,
  setViewMode,
  viewBy,
  setViewBy,
  searchTerm,
  setSearchTerm,
  projects,
  setProjects,
  selectedProjects,
  setSelectedProjects,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  handleDeleteProject,
  onProjectClick,
  onEditClick,
  onStartTimer,
  onLogTime
}) => {
  const filteredProjects = projects.filter((project: Project) => {
    const matchesView = viewBy === 'all' || project.status === viewBy;
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesView && matchesSearch;
  });

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects((prev: string[]) =>
      prev.includes(projectId)
        ? prev.filter((id: string) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const toggleAllProjects = () => {
    if (selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(paginatedProjects.map((p: Project) => p.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getBillingMethodBadgeColor = (method: string) => {
    switch(method) {
      case 'Based on Task Hours': return 'bg-purple-100 text-purple-800';
      case 'Based on Project Hours': return 'bg-blue-100 text-blue-800';
      case 'Fixed Cost for Project': return 'bg-green-100 text-green-800';
      case 'Based on Staff Hours': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBulkAction = (action: string) => {
    switch(action) {
      case 'active':
        setProjects((prev: Project[]) => prev.map((p: Project) => 
          selectedProjects.includes(p.id) ? { ...p, status: 'active' } : p
        ));
        break;
      case 'inactive':
        setProjects((prev: Project[]) => prev.map((p: Project) => 
          selectedProjects.includes(p.id) ? { ...p, status: 'inactive' } : p
        ));
        break;
      case 'delete':
        setProjects((prev: Project[]) => prev.filter((p: Project) => !selectedProjects.includes(p.id)));
        break;
    }
    setSelectedProjects([]);
  };

  const renderListView = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left w-10">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  checked={selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0} 
                  onChange={toggleAllProjects} 
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                Project
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Billing
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hours
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProjects.length === 0 ? (
              <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">No projects found</td></tr>
            ) : (
              paginatedProjects.map((project: Project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      checked={selectedProjects.includes(project.id)} 
                      onChange={() => toggleProjectSelection(project.id)} 
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div 
                      className="text-sm font-medium text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
                      onClick={() => onProjectClick(project.id)}
                    >
                      {project.customerName}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div 
                      className="text-sm font-medium text-gray-800 hover:text-purple-600 cursor-pointer transition-colors duration-200"
                      onClick={() => onProjectClick(project.id)}
                    >
                      {project.projectName}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{project.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBillingMethodBadgeColor(project.billingMethod)}`}>
                      {project.billingMethod}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</td>
                  <td className="px-4 py-3">
                    <div className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      <span className="ml-1">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="font-mono">{project.loggedHours}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{project.budget ? `$${project.budget.toFixed(2)}` : '-'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => onEditClick(project)} 
                        className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {/* Start Timer button */}
                      <button 
                        onClick={() => onStartTimer(project.projectName)} 
                        className="p-1.5 text-gray-400 hover:text-green-600 rounded hover:bg-green-50 transition"
                        title="Start Timer"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      {/* Log Time button */}
                      <button 
                        onClick={() => onLogTime(project.projectName)} 
                        className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition"
                        title="Log Time"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { 
                          const np = { ...project, id: String(Date.now()), projectName: `${project.projectName} (Copy)`, loggedHours: '00:00' }; 
                          setProjects((prev: Project[]) => [...prev, np]); 
                        }} 
                        className="p-1.5 text-gray-400 hover:text-purple-600 rounded hover:bg-purple-50 transition"
                        title="Clone"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project.id)} 
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {filteredProjects.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} 
              disabled={currentPage === 1} 
              className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p: number) => (
              <button 
                key={p} 
                onClick={() => setCurrentPage(p)} 
                className={`px-3 py-1 rounded text-sm ${currentPage === p ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                {p}
              </button>
            ))}
            {totalPages > 5 && <span className="text-sm text-gray-500">...</span>}
            <button 
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} 
              disabled={currentPage === totalPages} 
              className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderCardView = () => {
    const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    const getRandomColor = (name: string) => {
      const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
      return colors[name.length % colors.length];
    };
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedProjects.map((project: Project) => (
          <div 
            key={project.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition p-4 cursor-pointer"
            onClick={() => onProjectClick(project.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full ${getRandomColor(project.customerName)} text-white flex items-center justify-center text-xs font-medium`}>
                  {getInitials(project.customerName)}
                </div>
                <div>
                  <div 
                    className="text-sm font-semibold text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200"
                    onClick={() => onProjectClick(project.id)}
                  >
                    {project.customerName}
                  </div>
                  <p className="text-xs text-gray-500">{project.projectName}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <p className="text-xs text-gray-600 line-clamp-2 mb-3">{project.description}</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-50 rounded p-2">
                <div className="text-[10px] text-gray-500">Billing</div>
                <div className="text-xs font-medium text-gray-700 truncate">{project.billingMethod}</div>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <div className="text-[10px] text-gray-500">Rate</div>
                <div className="text-xs font-medium text-gray-700">{project.rate ? `$${project.rate.toFixed(2)}/hr` : '-'}</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="font-mono">{project.loggedHours}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span>${project.budget?.toFixed(2) || '0'}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <button className="text-xs text-blue-600 hover:text-blue-700">Create Expense</button>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onStartTimer(project.projectName)} 
                  className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1"
                >
                  <Play className="w-3 h-3" /> Start
                </button>
                <button 
                  onClick={() => onLogTime(project.projectName)} 
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Clock className="w-3 h-3" /> Log Time
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center space-x-4 gap-2">
            <div className="relative">
              <select 
                className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500" 
                value={viewBy} 
                onChange={(e) => setViewBy(e.target.value as any)}
              >
                <option value="all">All Projects</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-500 pointer-events-none" />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-48 md:w-64" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
              <button 
                onClick={() => setViewMode('list')} 
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List className="w-4 h-4" /><span>List</span>
              </button>
              <button 
                onClick={() => setViewMode('card')} 
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${viewMode === 'card' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <LayoutGrid className="w-4 h-4" /><span>Card</span>
              </button>
            </div>
            <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
              <Filter className="w-4 h-4 mr-1" />Filter
            </button>
            <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
              <Download className="w-4 h-4 mr-1" />Export
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Update */}
      {selectedProjects.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
          <span className="text-sm text-blue-700 font-medium">{selectedProjects.length} selected</span>
          <div className="flex items-center space-x-2">
            <button onClick={() => handleBulkAction('active')} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">Active</button>
            <button onClick={() => handleBulkAction('inactive')} className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">Inactive</button>
            <button onClick={() => handleBulkAction('delete')} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
            <button onClick={() => setSelectedProjects([])} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">Clear</button>
          </div>
        </div>
      )}

      {/* Content */}
      {viewMode === 'list' ? renderListView() : renderCardView()}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-sm text-gray-500">Total</div>
          <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-sm text-gray-500">Active</div>
          <div className="text-2xl font-bold text-green-600">{projects.filter((p: Project) => p.status === 'active').length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-sm text-gray-500">Hours</div>
          <div className="text-2xl font-bold text-blue-600">455:48</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="text-2xl font-bold text-purple-600">$29,500</div>
        </div>
      </div>
    </>
  );
};

// ==================== MAIN COMPONENT ====================
const ProjectList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [viewBy, setViewBy] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [view, setView] = useState<ViewState>('list');
  const [editProjectData, setEditProjectData] = useState<Project | null>(null);
  const [timerProjectName, setTimerProjectName] = useState<string>('');

  // ✅ Add Log Time states
  const [showLogTimePage, setShowLogTimePage] = useState(false);
  const [logTimeProject, setLogTimeProject] = useState('');

  const [projects, setProjects] = useState<Project[]>([
    { id: '1', customerName: 'Bruce Wayne', projectName: 'Design contract for Mr. Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '106:41', budget: 5000, startDate: '2024-01-15', endDate: '2024-06-30', description: 'Complete UI/UX design for Wayne Enterprises', createdAt: '', updatedAt: '' },
    { id: '2', customerName: 'Bruce Wayne', projectName: 'Design project for Bruce', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '35:28', budget: 3000, startDate: '2024-02-01', endDate: '2024-07-15', description: 'Redesign of corporate website', createdAt: '', updatedAt: '' },
    { id: '3', customerName: 'Aaron Brown', projectName: 'Design project for MR.X', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '138:00', budget: 8000, startDate: '2024-01-10', endDate: '2024-08-20', description: 'Mobile app design for MR.X', createdAt: '', updatedAt: '' },
    { id: '4', customerName: 'Aaron Brown', projectName: 'Design project - Z', billingMethod: 'Based on Task Hours', rate: null, status: 'active', loggedHours: '26:00', budget: 2500, startDate: '2024-03-01', endDate: '2024-09-01', description: 'Logo and branding design', createdAt: '', updatedAt: '' },
    { id: '5', customerName: 'Dinesh Ramamurthy', projectName: 'Designing project', billingMethod: 'Based on Project Hours', rate: 45, status: 'active', loggedHours: '32:04', budget: 2000, startDate: '2024-02-15', endDate: '2024-07-01', description: 'Web application interface design', createdAt: '', updatedAt: '' },
    { id: '6', customerName: 'Arthur K', projectName: 'Web app designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'active', loggedHours: '65:00', budget: 4500, startDate: '2024-01-20', endDate: '2024-10-15', description: 'E-commerce platform design', createdAt: '', updatedAt: '' },
    { id: '7', customerName: 'Aaron Brown', projectName: 'Web Designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'completed', loggedHours: '52:35', budget: 3500, startDate: '2023-12-01', endDate: '2024-05-30', description: 'Corporate website redesign', createdAt: '', updatedAt: '' },
    { id: '8', customerName: 'Aaron Brown', projectName: 'Web designing', billingMethod: 'Based on Task Hours', rate: 45, status: 'inactive', loggedHours: '00:00', budget: 1000, startDate: '2024-04-01', endDate: '2024-12-31', description: 'Portfolio website design', createdAt: '', updatedAt: '' }
  ]);

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Delete this project?')) {
      setProjects((prev: Project[]) => prev.filter((p: Project) => p.id !== id));
    }
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setView('detail');
  };

  const handleBackToList = () => {
    setSelectedProjectId(null);
    setView('list');
    setEditProjectData(null);
    setShowLogTimePage(false); // ✅ Reset log time page
  };

  const handleEditClick = (project: Project) => {
    setEditProjectData(project);
    setView('edit');
  };

  const handleEditSave = (updatedData: any) => {
    const existingProject = projects.find(p => p.id === updatedData.id);
    if (!existingProject) return;

    const updatedProjects = projects.map((p: Project) => {
      if (p.id === updatedData.id) {
        return {
          ...p,
          projectName: updatedData.name,
          description: updatedData.description,
          billingMethod: updatedData.billingMethod as Project['billingMethod'],
          rate: updatedData.rate,
          budget: updatedData.budget,
          status: updatedData.status as Project['status'],
          startDate: updatedData.startDate,
          endDate: updatedData.endDate,
          customerName: updatedData.customerName,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    });

    setProjects(updatedProjects);
    setTimeout(() => {
      setView('list');
      setEditProjectData(null);
    }, 100);
  };

  // Handle Create New Project
  const handleCreateProject = (projectData: any) => {
    const newProject: Project = {
      id: String(Date.now()),
      customerName: projectData.customerName,
      projectName: projectData.projectName,
      billingMethod: projectData.billingMethod as Project['billingMethod'],
      rate: projectData.rate || null,
      status: projectData.status as Project['status'],
      loggedHours: '00:00',
      budget: projectData.budget || null,
      startDate: projectData.startDate || '',
      endDate: projectData.endDate || '',
      description: projectData.description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProjects([newProject, ...projects]);
    setView('list');
  };

  // Handle Start Timer - Switches to Time Tracker tab
  const handleStartTimer = (projectName: string) => {
    setTimerProjectName(projectName);
    setActiveTab('timetracker');
  };

  // ✅ Handle Log Time - Opens LogTimePage
  const handleLogTimeClick = (projectName: string) => {
    setLogTimeProject(projectName);
    setShowLogTimePage(true);
  };

  // ✅ Handle Log Time Save
  const handleLogTimeSave = (data: any) => {
    console.log('Time logged:', data);
    setShowLogTimePage(false);
    // You can add additional logic here like updating project hours
    alert(`Time logged successfully!\nProject: ${data.project}\nTime: ${data.timeSpent}`);
  };

  // Render create view
  if (view === 'create') {
    return <CreateProjectPage onBack={handleBackToList} onSave={handleCreateProject} />;
  }

  // Render edit view
  if (view === 'edit' && editProjectData) {
    const editData = {
      id: editProjectData.id,
      name: editProjectData.projectName,
      description: editProjectData.description,
      billingMethod: editProjectData.billingMethod,
      rate: editProjectData.rate || 0,
      budget: editProjectData.budget || 0,
      status: editProjectData.status,
      startDate: editProjectData.startDate,
      endDate: editProjectData.endDate,
      customerName: editProjectData.customerName,
      assignedUsers: []
    };
    return (
      <ProjectEdit 
        projectId={editProjectData.id}
        projectName={editProjectData.projectName}
        onBack={handleBackToList}
        onSave={handleEditSave}
        initialData={editData}
      />
    );
  }

  // Render detail view
  if (view === 'detail' && selectedProjectId) {
    return <ProjectDetail projectId={selectedProjectId} onBack={handleBackToList} />;
  }

  // ✅ Render Log Time Page
  if (showLogTimePage) {
    return (
      <LogTimePage 
        onBack={() => setShowLogTimePage(false)} 
        onSave={handleLogTimeSave}
        preselectedProject={logTimeProject}
      />
    );
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'projects':
        return (
          <ProjectsTab
            viewMode={viewMode}
            setViewMode={setViewMode}
            viewBy={viewBy}
            setViewBy={setViewBy}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            projects={projects}
            setProjects={setProjects}
            selectedProjects={selectedProjects}
            setSelectedProjects={setSelectedProjects}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            handleDeleteProject={handleDeleteProject}
            onProjectClick={handleProjectClick}
            onEditClick={handleEditClick}
            onStartTimer={handleStartTimer}
            onLogTime={handleLogTimeClick}
          />
        );
      case 'taskboard':
        return <TaskBoard />;
      case 'timetracker':
        return <TimeTracker preselectedProject={timerProjectName} />;
      default:
        return null;
    }
  };

  // Handle Header Start button
  const handleHeaderStart = () => {
    setTimerProjectName('');
    setActiveTab('timetracker');
  };

  // ✅ Handle Header Log Time button
  const handleHeaderLogTime = () => {
    setLogTimeProject('');
    setShowLogTimePage(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with New Project, Start, and Log Time buttons */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {activeTab === 'projects' && 'Projects'}
            {activeTab === 'taskboard' && 'Task Board'}
            {activeTab === 'timetracker' && 'Time Tracker'}
          </h1>
          <p className="text-sm text-gray-500 hidden sm:block">
            {activeTab === 'projects' && 'Manage all your projects from one place'}
            {activeTab === 'taskboard' && 'Manage and track tasks across your projects'}
            {activeTab === 'timetracker' && 'Track and log time for your projects'}
          </p>
        </div>
        {/* Three buttons together */}
        {activeTab === 'projects' && (
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setView('create')} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 text-sm shadow-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </button>
            <button 
              onClick={handleHeaderStart}
              className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700 text-sm shadow-sm whitespace-nowrap"
            >
              <Play className="w-4 h-4 mr-2" />
              Start
            </button>
            <button 
              onClick={handleHeaderLogTime}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 text-sm shadow-sm whitespace-nowrap"
            >
              <Clock className="w-4 h-4 mr-2" />
              Log Time
            </button>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 mb-6">
        <nav className="flex space-x-6">
          <button 
            onClick={() => setActiveTab('projects')} 
            className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'projects' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Projects</span>
          </button>
          <button 
            onClick={() => setActiveTab('taskboard')} 
            className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'taskboard' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Task Board</span>
          </button>
          <button 
            onClick={() => setActiveTab('timetracker')} 
            className={`py-3 px-1 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'timetracker' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>Time Tracker</span>
          </button>
        </nav>
      </div>

      {/* Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProjectList;