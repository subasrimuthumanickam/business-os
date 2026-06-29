// // src/client/components/projects/TimeTracker.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Play, 
//   Pause, 
//   Square, 
//   Clock, 
//   FileText, 
//   User, 
//   Calendar, 
//   Trash2,
//   Plus,
//   Search,
//   Filter,
//   ChevronDown,
//   CheckCircle,
//   Circle,
//   AlertCircle,
//   MoreVertical,
//   Edit,
//   Save,
//   X,
//   ArrowLeft,
//   LayoutDashboard,
//   Timer,
//   Briefcase,
//   Tag,
//   Users
// } from 'lucide-react';

// // ✅ Add props interface
// interface TimeTrackerProps {
//   preselectedProject?: string;
// }

// // Types
// interface TimeEntry {
//   id: string;
//   date: string;
//   project: string;
//   task: string;
//   time: string;
//   timeInSeconds: number;
//   user: string;
//   status: 'Billable' | 'Non-Bill';
//   notes?: string;
// }

// // Sample data
// const initialEntries: TimeEntry[] = [
//   {
//     id: '1',
//     date: '2024-06-06',
//     project: 'Web De...',
//     task: 'Designing',
//     time: '02h : 00m : 00s',
//     timeInSeconds: 7200,
//     user: 'Patric...',
//     status: 'Billable'
//   },
//   {
//     id: '2',
//     date: '2024-06-06',
//     project: 'Design c...',
//     task: 'Development',
//     time: '01h : 30m : 00s',
//     timeInSeconds: 5400,
//     user: 'John D...',
//     status: 'Billable'
//   },
//   {
//     id: '3',
//     date: '2024-06-05',
//     project: 'Web ap...',
//     task: 'Content',
//     time: '01h : 00m : 00s',
//     timeInSeconds: 3600,
//     user: 'Jane S...',
//     status: 'Non-Bill'
//   }
// ];

// // ✅ Accept props
// const TimeTracker: React.FC<TimeTrackerProps> = ({ preselectedProject = '' }) => {
//   const [entries, setEntries] = useState<TimeEntry[]>(initialEntries);
//   const [selectedProject, setSelectedProject] = useState('');
//   const [selectedTask, setSelectedTask] = useState('');
//   const [notes, setNotes] = useState('');
//   const [isRunning, setIsRunning] = useState(false);
//   const [seconds, setSeconds] = useState(0);
//   const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState<string>('all');
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   // ✅ Set preselected project when prop changes
//   useEffect(() => {
//     if (preselectedProject) {
//       setSelectedProject(preselectedProject);
//     }
//   }, [preselectedProject]);

//   // Timer logic
//   useEffect(() => {
//     if (isRunning) {
//       timerRef.current = setInterval(() => {
//         setSeconds(prev => prev + 1);
//       }, 1000);
//     } else if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [isRunning]);

//   // Format time display
//   const formatTime = (totalSeconds: number) => {
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
//   };

//   // Handle Start timer
//   const handleStart = () => {
//     if (!selectedProject) {
//       alert('Please select a project first');
//       return;
//     }
//     setIsRunning(true);
//     setCurrentEntryId(Date.now().toString());
//   };

//   // Handle Stop timer
//   const handleStop = () => {
//     if (isRunning && seconds > 0) {
//       setIsRunning(false);
      
//       const newEntry: TimeEntry = {
//         id: Date.now().toString(),
//         date: new Date().toISOString().split('T')[0],
//         project: selectedProject || 'Unassigned',
//         task: selectedTask || 'Unspecified',
//         time: formatTime(seconds),
//         timeInSeconds: seconds,
//         user: 'Current User',
//         status: 'Billable',
//         notes: notes || undefined
//       };
      
//       setEntries([newEntry, ...entries]);
//       setSeconds(0);
//       setNotes('');
//       setSelectedProject('');
//       setSelectedTask('');
//     }
//   };

//   // Handle Reset timer
//   const handleReset = () => {
//     setIsRunning(false);
//     setSeconds(0);
//     setCurrentEntryId(null);
//   };

//   // Handle Delete entry
//   const handleDeleteEntry = (id: string) => {
//     if (window.confirm('Delete this time entry?')) {
//       setEntries(entries.filter(entry => entry.id !== id));
//     }
//   };

//   // Calculate today's total time
//   const getTodayTotal = () => {
//     const today = new Date().toISOString().split('T')[0];
//     const todayEntries = entries.filter(entry => entry.date === today);
//     const totalSeconds = todayEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
//     return formatTime(totalSeconds);
//   };

//   // Calculate week's total time
//   const getWeekTotal = () => {
//     const now = new Date();
//     const startOfWeek = new Date(now);
//     startOfWeek.setDate(now.getDate() - now.getDay());
//     const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
    
//     const weekEntries = entries.filter(entry => entry.date >= startOfWeekStr);
//     const totalSeconds = weekEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
//     return formatTime(totalSeconds);
//   };

//   // Filter entries
//   const getFilteredEntries = () => {
//     let filtered = entries;
//     if (searchTerm) {
//       filtered = filtered.filter(entry =>
//         entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         entry.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         entry.user.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (filterStatus !== 'all') {
//       filtered = filtered.filter(entry => entry.status === filterStatus);
//     }
//     return filtered;
//   };

//   // Projects list
//   const projects = [
//     { id: 'web-dev', name: 'Web Development' },
//     { id: 'design', name: 'Design Project' },
//     { id: 'testing', name: 'Testing' },
//     { id: 'content', name: 'Content Creation' }
//   ];

//   // Tasks list
//   const tasks = [
//     { id: 'designing', name: 'Designing' },
//     { id: 'development', name: 'Development' },
//     { id: 'content', name: 'Content' },
//     { id: 'testing', name: 'Testing' },
//     { id: 'review', name: 'Review' }
//   ];

//   const filteredEntries = getFilteredEntries();

//   return (
//     // ✅ REMOVED p-6 and min-h-screen - Reduced padding
//     <div className="bg-gray-50">
//       {/* ✅ REMOVED Header section - Now in ProjectList */}

//       {/* Timer Section - Reduced margin */}
//       <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 mb-4 border border-blue-100 shadow-sm">
//         <div className="flex flex-col lg:flex-row gap-4">
          
//           {/* Timer Display */}
//           <div className="lg:w-1/3 bg-white rounded-2xl p-5 shadow-md border border-blue-100">
//             <div className="text-center">
//               <div className="text-4xl font-bold text-gray-800 font-mono tracking-wider">
//                 {formatTime(seconds)}
//               </div>
              
//               <div className="flex items-center justify-center gap-2 mt-3">
//                 <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
//                 <span className="text-sm text-gray-500">{isRunning ? 'Running' : 'Stopped'}</span>
//               </div>
              
//               <div className="flex gap-2 mt-3">
//                 {!isRunning ? (
//                   <button
//                     onClick={handleStart}
//                     className="flex-1 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
//                   >
//                     <Play className="w-4 h-4" />
//                     Start Timer
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleStop}
//                     className="flex-1 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
//                   >
//                     <Square className="w-4 h-4" />
//                     Stop Timer
//                   </button>
//                 )}
//                 <button
//                   onClick={handleReset}
//                   className="px-3 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all text-sm"
//                   disabled={seconds === 0}
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Project & Task Selectors */}
//           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
//             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 <Briefcase className="w-4 h-4 inline mr-1" />
//                 Project <span className="text-red-500">*</span>
//               </label>
//               <select 
//                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
//                 value={selectedProject}
//                 onChange={(e) => setSelectedProject(e.target.value)}
//                 disabled={isRunning}
//               >
//                 <option value="">Select Project</option>
//                 {projects.map(project => (
//                   <option key={project.id} value={project.name}>
//                     {project.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 <Tag className="w-4 h-4 inline mr-1" />
//                 Task
//               </label>
//               <select 
//                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
//                 value={selectedTask}
//                 onChange={(e) => setSelectedTask(e.target.value)}
//                 disabled={isRunning}
//               >
//                 <option value="">Select Task</option>
//                 {tasks.map(task => (
//                   <option key={task.id} value={task.name}>
//                     {task.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Notes and Summary - Reduced spacing */}
//         <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
//           <div className="md:col-span-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               <FileText className="w-4 h-4 inline mr-1" />
//               Notes
//             </label>
//             <textarea
//               className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm"
//               rows={2}
//               placeholder="Add notes..."
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               disabled={isRunning}
//             />
//           </div>
          
//           <div className="md:col-span-2 grid grid-cols-2 gap-3">
//             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
//               <span className="text-sm text-gray-600">Today</span>
//               <span className="text-base font-bold text-blue-600">{getTodayTotal()}</span>
//             </div>
//             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
//               <span className="text-sm text-gray-600">This Week</span>
//               <span className="text-base font-bold text-indigo-600">{getWeekTotal()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Entries Table - Reduced margin */}
//       <div>
//         <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
//           <h2 className="text-base font-semibold text-gray-800 flex items-center">
//             <Clock className="w-4 h-4 mr-1.5 text-blue-600" />
//             Recent Entries
//             <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
//               {filteredEntries.length}
//             </span>
//           </h2>
//           <div className="flex flex-wrap items-center gap-2">
//             <div className="relative">
//               <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search entries..."
//                 className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-40 md:w-48"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <select
//               className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="Billable">Billable</option>
//               <option value="Non-Bill">Non-Billable</option>
//             </select>
//           </div>
//         </div>
        
//         <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-200">
//                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
//                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Task</th>
//                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
//                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
//                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEntries.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="text-center py-8 text-gray-500">
//                     <Clock className="w-10 h-10 mx-auto text-gray-300 mb-1" />
//                     <p className="text-sm">No entries found</p>
//                     <p className="text-xs text-gray-400">Start tracking your time to see entries here</p>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredEntries.map((entry, index) => (
//                   <tr key={entry.id} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
//                     <td className="py-2.5 px-3 text-sm text-gray-700">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-3.5 h-3.5 text-gray-400" />
//                         {entry.date}
//                       </div>
//                     </td>
//                     <td className="py-2.5 px-3 text-sm text-gray-700 font-medium">{entry.project}</td>
//                     <td className="py-2.5 px-3 text-sm text-gray-700">
//                       <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
//                         {entry.task}
//                       </span>
//                     </td>
//                     <td className="py-2.5 px-3 text-sm text-gray-700 font-mono font-medium">{entry.time}</td>
//                     <td className="py-2.5 px-3 text-sm text-gray-700">
//                       <div className="flex items-center gap-1.5">
//                         <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white flex items-center justify-center text-[10px] font-medium">
//                           {entry.user.charAt(0)}
//                         </div>
//                         {entry.user}
//                       </div>
//                     </td>
//                     <td className="py-2.5 px-3">
//                       <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                         entry.status === 'Billable' 
//                           ? 'bg-green-100 text-green-700 border border-green-200' 
//                           : 'bg-gray-100 text-gray-700 border border-gray-200'
//                       }`}>
//                         {entry.status}
//                       </span>
//                     </td>
//                     <td className="py-2.5 px-3">
//                       <button 
//                         onClick={() => handleDeleteEntry(entry.id)}
//                         className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg"
//                         title="Delete entry"
//                       >
//                         <Trash2 className="w-3.5 h-3.5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Footer Stats - Reduced spacing */}
//       <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
//         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
//           <div className="text-xs text-gray-500">Total Entries</div>
//           <div className="text-lg font-bold text-gray-800">{entries.length}</div>
//         </div>
//         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
//           <div className="text-xs text-gray-500">Today</div>
//           <div className="text-lg font-bold text-blue-600">{getTodayTotal()}</div>
//         </div>
//         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
//           <div className="text-xs text-gray-500">This Week</div>
//           <div className="text-lg font-bold text-indigo-600">{getWeekTotal()}</div>
//         </div>
//         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
//           <div className="text-xs text-gray-500">Billable</div>
//           <div className="text-lg font-bold text-green-600">
//             {entries.filter(e => e.status === 'Billable').length}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeTracker;
// src/client/components/projects/TimeTracker.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Play,
//   Pause,
//   Square,
//   Clock,
//   FileText,
//   User,
//   Calendar,
//   Trash2,
//   Plus,
//   Search,
//   Filter,
//   ChevronDown,
//   CheckCircle,
//   Circle,
//   AlertCircle,
//   MoreVertical,
//   Edit,
//   Save,
//   X,
//   ArrowLeft,
//   LayoutDashboard,
//   Timer,
//   Briefcase,
//   Tag,
//   Users
// } from 'lucide-react';

// // ✅ Add props interface
// interface TimeTrackerProps {
//   preselectedProject?: string;
// }

// // Types
// interface TimeEntry {
//   id: string;
//   date: string;
//   project: string;
//   task: string;
//   time: string;
//   timeInSeconds: number;
//   user: string;
//   status: 'Billable' | 'Non-Bill';
//   notes?: string;
// }

// // Sample data
// const initialEntries: TimeEntry[] = [
//   {
//     id: '1',
//     date: '2024-06-06',
//     project: 'Web De...',
//     task: 'Designing',
//     time: '02h : 00m : 00s',
//     timeInSeconds: 7200,
//     user: 'Patric...',
//     status: 'Billable'
//   },
//   {
//     id: '2',
//     date: '2024-06-06',
//     project: 'Design c...',
//     task: 'Development',
//     time: '01h : 30m : 00s',
//     timeInSeconds: 5400,
//     user: 'John D...',
//     status: 'Billable'
//   },
//   {
//     id: '3',
//     date: '2024-06-05',
//     project: 'Web ap...',
//     task: 'Content',
//     time: '01h : 00m : 00s',
//     timeInSeconds: 3600,
//     user: 'Jane S...',
//     status: 'Non-Bill'
//   }
// ];

// // ✅ Accept props
// const TimeTracker: React.FC<TimeTrackerProps> = ({ preselectedProject = '' }) => {
//   const [entries, setEntries] = useState<TimeEntry[]>(initialEntries);
//   const [selectedProject, setSelectedProject] = useState('');
//   const [selectedTask, setSelectedTask] = useState('');
//   const [notes, setNotes] = useState('');
//   const [isRunning, setIsRunning] = useState(false);
//   const [seconds, setSeconds] = useState(0);
//   const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState<string>('all');
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   // ✅ Set preselected project when prop changes
//   useEffect(() => {
//     if (preselectedProject) {
//       setSelectedProject(preselectedProject);
//     }
//   }, [preselectedProject]);

//   // Timer logic
//   useEffect(() => {
//     if (isRunning) {
//       timerRef.current = setInterval(() => {
//         setSeconds(prev => prev + 1);
//       }, 1000);
//     } else if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [isRunning]);

//   // Format time display
//   const formatTime = (totalSeconds: number) => {
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
//   };

//   // Handle Start timer
//   const handleStart = () => {
//     if (!selectedProject) {
//       alert('Please select a project first');
//       return;
//     }
//     setIsRunning(true);
//     setCurrentEntryId(Date.now().toString());
//   };

//   // Handle Stop timer
//   const handleStop = () => {
//     if (isRunning && seconds > 0) {
//       setIsRunning(false);
      
//       const newEntry: TimeEntry = {
//         id: Date.now().toString(),
//         date: new Date().toISOString().split('T')[0],
//         project: selectedProject || 'Unassigned',
//         task: selectedTask || 'Unspecified',
//         time: formatTime(seconds),
//         timeInSeconds: seconds,
//         user: 'Current User',
//         status: 'Billable',
//         notes: notes || undefined
//       };
      
//       setEntries([newEntry, ...entries]);
//       setSeconds(0);
//       setNotes('');
//       setSelectedProject('');
//       setSelectedTask('');
//     }
//   };

//   // Handle Reset timer
//   const handleReset = () => {
//     setIsRunning(false);
//     setSeconds(0);
//     setCurrentEntryId(null);
//   };

//   // Handle Delete entry
//   const handleDeleteEntry = (id: string) => {
//     if (window.confirm('Delete this time entry?')) {
//       setEntries(entries.filter(entry => entry.id !== id));
//     }
//   };

//   // Calculate today's total time
//   const getTodayTotal = () => {
//     const today = new Date().toISOString().split('T')[0];
//     const todayEntries = entries.filter(entry => entry.date === today);
//     const totalSeconds = todayEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
//     return formatTime(totalSeconds);
//   };

//   // Calculate week's total time
//   const getWeekTotal = () => {
//     const now = new Date();
//     const startOfWeek = new Date(now);
//     startOfWeek.setDate(now.getDate() - now.getDay());
//     const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
    
//     const weekEntries = entries.filter(entry => entry.date >= startOfWeekStr);
//     const totalSeconds = weekEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
//     return formatTime(totalSeconds);
//   };

//   // Filter entries
//   const getFilteredEntries = () => {
//     let filtered = entries;
//     if (searchTerm) {
//       filtered = filtered.filter(entry =>
//         entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         entry.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         entry.user.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (filterStatus !== 'all') {
//       filtered = filtered.filter(entry => entry.status === filterStatus);
//     }
//     return filtered;
//   };

//   // Projects list
//   const projects = [
//     { id: 'web-dev', name: 'Web Development' },
//     { id: 'design', name: 'Design Project' },
//     { id: 'testing', name: 'Testing' },
//     { id: 'content', name: 'Content Creation' }
//   ];

//   // Tasks list
//   const tasks = [
//     { id: 'designing', name: 'Designing' },
//     { id: 'development', name: 'Development' },
//     { id: 'content', name: 'Content' },
//     { id: 'testing', name: 'Testing' },
//     { id: 'review', name: 'Review' }
//   ];

//   const filteredEntries = getFilteredEntries();

//   return (
//     // ✅ REMOVED p-6 and min-h-screen - Reduced padding
//     <div className="bg-gray-50 w-full max-w-full overflow-x-hidden">
//       {/* ✅ REMOVED Header section - Now in ProjectList */}

//       {/* Timer Section - Reduced margin */}
//       <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 mb-4 border border-blue-100 shadow-sm">
//         <div className="flex flex-col lg:flex-row gap-4">
          
//           {/* Timer Display */}
//           <div className="lg:w-1/3 bg-white rounded-2xl p-5 shadow-md border border-blue-100">
//             <div className="text-center">
//               <div className="text-4xl font-bold text-gray-800 font-mono tracking-wider">
//                 {formatTime(seconds)}
//               </div>
              
//               <div className="flex items-center justify-center gap-2 mt-3">
//                 <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
//                 <span className="text-sm text-gray-500">{isRunning ? 'Running' : 'Stopped'}</span>
//               </div>
              
//               <div className="flex gap-2 mt-3">
//                 {!isRunning ? (
//                   <button
//                     onClick={handleStart}
//                     className="flex-1 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
//                   >
//                     <Play className="w-4 h-4" />
//                     Start Timer
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleStop}
//                     className="flex-1 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
//                   >
//                     <Square className="w-4 h-4" />
//                     Stop Timer
//                   </button>
//                 )}
//                 <button
//                   onClick={handleReset}
//                   className="px-3 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all text-sm"
//                   disabled={seconds === 0}
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Project & Task Selectors */}
//           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
//             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 <Briefcase className="w-4 h-4 inline mr-1" />
//                 Project <span className="text-red-500">*</span>
//               </label>
//               <select 
//                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
//                 value={selectedProject}
//                 onChange={(e) => setSelectedProject(e.target.value)}
//                 disabled={isRunning}
//               >
//                 <option value="">Select Project</option>
//                 {projects.map(project => (
//                   <option key={project.id} value={project.name}>
//                     {project.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 <Tag className="w-4 h-4 inline mr-1" />
//                 Task
//               </label>
//               <select 
//                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
//                 value={selectedTask}
//                 onChange={(e) => setSelectedTask(e.target.value)}
//                 disabled={isRunning}
//               >
//                 <option value="">Select Task</option>
//                 {tasks.map(task => (
//                   <option key={task.id} value={task.name}>
//                     {task.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Notes and Summary - Reduced spacing */}
//         <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
//           <div className="md:col-span-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               <FileText className="w-4 h-4 inline mr-1" />
//               Notes
//             </label>
//             <textarea
//               className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm"
//               rows={2}
//               placeholder="Add notes..."
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               disabled={isRunning}
//             />
//           </div>
          
//           <div className="md:col-span-2 grid grid-cols-2 gap-3">
//             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
//               <span className="text-sm text-gray-600">Today</span>
//               <span className="text-base font-bold text-blue-600">{getTodayTotal()}</span>
//             </div>
//             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
//               <span className="text-sm text-gray-600">This Week</span>
//               <span className="text-base font-bold text-indigo-600">{getWeekTotal()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Entries Table - Reduced margin */}
//       <div>
//         <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
//           <h2 className="text-base font-semibold text-gray-800 flex items-center">
//             <Clock className="w-4 h-4 mr-1.5 text-blue-600" />
//             Recent Entries
//             <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
//               {filteredEntries.length}
//             </span>
//           </h2>
//           <div className="flex flex-wrap items-center gap-2">
//             <div className="relative">
//               <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search entries..."
//                 className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-40 md:w-48"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <select
//               className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="Billable">Billable</option>
//               <option value="Non-Bill">Non-Billable</option>
//             </select>
//           </div>
//         </div>
        
//         {/* ✅ Fixed table: overflow-x-auto removed, full width with no horizontal scroll */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full overflow-hidden">
//           <div className="w-full overflow-x-auto">
//             <table className="w-full min-w-full table-auto text-sm">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-200">
//                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
//                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Project</th>
//                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Task</th>
//                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Time</th>
//                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">User</th>
//                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
//                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredEntries.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="text-center py-8 text-gray-500">
//                       <Clock className="w-10 h-10 mx-auto text-gray-300 mb-1" />
//                       <p className="text-sm">No entries found</p>
//                       <p className="text-xs text-gray-400">Start tracking your time to see entries here</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredEntries.map((entry, index) => (
//                     <tr key={entry.id} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
//                       <td className="py-2.5 px-3 text-sm text-gray-700 whitespace-nowrap">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
//                           {entry.date}
//                         </div>
//                       </td>
//                       <td className="py-2.5 px-3 text-sm text-gray-700 font-medium whitespace-nowrap">{entry.project}</td>
//                       <td className="py-2.5 px-3 text-sm text-gray-700 whitespace-nowrap">
//                         <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs whitespace-nowrap">
//                           {entry.task}
//                         </span>
//                       </td>
//                       <td className="py-2.5 px-3 text-sm text-gray-700 font-mono font-medium whitespace-nowrap">{entry.time}</td>
//                       <td className="py-2.5 px-3 text-sm text-gray-700 whitespace-nowrap">
//                         <div className="flex items-center gap-1.5">
//                           <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white flex items-center justify-center text-[10px] font-medium flex-shrink-0">
//                             {entry.user.charAt(0)}
//                           </div>
//                           {entry.user}
//                         </div>
//                       </td>
//                       <td className="py-2.5 px-3 whitespace-nowrap">
//                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
//                           entry.status === 'Billable' 
//                             ? 'bg-green-100 text-green-700 border border-green-200' 
//                             : 'bg-gray-100 text-gray-700 border border-gray-200'
//                         }`}>
//                           {entry.status}
//                         </span>
//                       </td>
//                       <td className="py-2.5 px-3 whitespace-nowrap">
//                         <button 
//                           onClick={() => handleDeleteEntry(entry.id)}
//                           className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg"
//                           title="Delete entry"
//                         >
//                           <Trash2 className="w-3.5 h-3.5" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Footer Stats - Reduced spacing */}
//       <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
//         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
//           <div className="text-xs text-gray-500">Total Entries</div>
//           <div className="text-lg font-bold text-gray-800">{entries.length}</div>
//         </div>
//         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
//           <div className="text-xs text-gray-500">Today</div>
//           <div className="text-lg font-bold text-blue-600">{getTodayTotal()}</div>
//         </div>
//         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
//           <div className="text-xs text-gray-500">This Week</div>
//           <div className="text-lg font-bold text-indigo-600">{getWeekTotal()}</div>
//         </div>
//         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
//           <div className="text-xs text-gray-500">Billable</div>
//           <div className="text-lg font-bold text-green-600">
//             {entries.filter(e => e.status === 'Billable').length}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeTracker;
// src/client/components/projects/TimeTracker.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Square,
  Clock,
  FileText,
  Calendar,
  Trash2,
  Search,
  Briefcase,
  Tag,
} from 'lucide-react';

// ✅ Add props interface
interface TimeTrackerProps {
  preselectedProject?: string;
}

// Types
interface TimeEntry {
  id: string;
  date: string;
  project: string;
  task: string;
  time: string;
  timeInSeconds: number;
  user: string;
  status: 'Billable' | 'Non-Bill';
  notes?: string;
}

// Sample data
const initialEntries: TimeEntry[] = [
  {
    id: '1',
    date: '2024-06-06',
    project: 'Web De...',
    task: 'Designing',
    time: '02h : 00m : 00s',
    timeInSeconds: 7200,
    user: 'Patric...',
    status: 'Billable'
  },
  {
    id: '2',
    date: '2024-06-06',
    project: 'Design c...',
    task: 'Development',
    time: '01h : 30m : 00s',
    timeInSeconds: 5400,
    user: 'John D...',
    status: 'Billable'
  },
  {
    id: '3',
    date: '2024-06-05',
    project: 'Web ap...',
    task: 'Content',
    time: '01h : 00m : 00s',
    timeInSeconds: 3600,
    user: 'Jane S...',
    status: 'Non-Bill'
  }
];

// ✅ Accept props
const TimeTracker: React.FC<TimeTrackerProps> = ({ preselectedProject = '' }) => {
  const [entries, setEntries] = useState<TimeEntry[]>(initialEntries);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [notes, setNotes] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Set preselected project when prop changes
  useEffect(() => {
    if (preselectedProject) {
      setSelectedProject(preselectedProject);
    }
  }, [preselectedProject]);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning]);

  // Format time display
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
  };

  // Handle Start timer
  const handleStart = () => {
    if (!selectedProject) {
      alert('Please select a project first');
      return;
    }
    setIsRunning(true);
    setCurrentEntryId(Date.now().toString());
  };

  // Handle Stop timer
  const handleStop = () => {
    if (isRunning && seconds > 0) {
      setIsRunning(false);
      
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        project: selectedProject || 'Unassigned',
        task: selectedTask || 'Unspecified',
        time: formatTime(seconds),
        timeInSeconds: seconds,
        user: 'Current User',
        status: 'Billable',
        notes: notes || undefined
      };
      
      setEntries([newEntry, ...entries]);
      setSeconds(0);
      setNotes('');
      setSelectedProject('');
      setSelectedTask('');
    }
  };

  // Handle Reset timer
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setCurrentEntryId(null);
  };

  // Handle Delete entry
  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Delete this time entry?')) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  // Calculate today's total time
  const getTodayTotal = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = entries.filter(entry => entry.date === today);
    const totalSeconds = todayEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
    return formatTime(totalSeconds);
  };

  // Calculate week's total time
  const getWeekTotal = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
    
    const weekEntries = entries.filter(entry => entry.date >= startOfWeekStr);
    const totalSeconds = weekEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
    return formatTime(totalSeconds);
  };

  // Filter entries
  const getFilteredEntries = () => {
    let filtered = entries;
    if (searchTerm) {
      filtered = filtered.filter(entry =>
        entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(entry => entry.status === filterStatus);
    }
    return filtered;
  };

  // Projects list
  const projects = [
    { id: 'web-dev', name: 'Web Development' },
    { id: 'design', name: 'Design Project' },
    { id: 'testing', name: 'Testing' },
    { id: 'content', name: 'Content Creation' }
  ];

  // Tasks list
  const tasks = [
    { id: 'designing', name: 'Designing' },
    { id: 'development', name: 'Development' },
    { id: 'content', name: 'Content' },
    { id: 'testing', name: 'Testing' },
    { id: 'review', name: 'Review' }
  ];

  const filteredEntries = getFilteredEntries();

  return (
    <div className="bg-gray-50 w-full max-w-full overflow-x-hidden">
      {/* Timer Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 mb-4 border border-blue-100 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Timer Display */}
          <div className="lg:w-1/3 bg-white rounded-2xl p-5 shadow-md border border-blue-100">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 font-mono tracking-wider">
                {formatTime(seconds)}
              </div>
              
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                <span className="text-sm text-gray-500">{isRunning ? 'Running' : 'Stopped'}</span>
              </div>
              
              <div className="flex gap-2 mt-3">
                {!isRunning ? (
                  <button
                    onClick={handleStart}
                    className="flex-1 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Start Timer
                  </button>
                ) : (
                  <button
                    onClick={handleStop}
                    className="flex-1 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                  >
                    <Square className="w-4 h-4" />
                    Stop Timer
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="px-3 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all text-sm"
                  disabled={seconds === 0}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Project & Task Selectors */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <Briefcase className="w-4 h-4 inline mr-1" />
                Project <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                disabled={isRunning}
              >
                <option value="">Select Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <Tag className="w-4 h-4 inline mr-1" />
                Task
              </label>
              <select 
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                disabled={isRunning}
              >
                <option value="">Select Task</option>
                {tasks.map(task => (
                  <option key={task.id} value={task.name}>
                    {task.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notes and Summary */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <FileText className="w-4 h-4 inline mr-1" />
              Notes
            </label>
            <textarea
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm"
              rows={2}
              placeholder="Add notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isRunning}
            />
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
              <span className="text-sm text-gray-600">Today</span>
              <span className="text-base font-bold text-blue-600">{getTodayTotal()}</span>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="text-base font-bold text-indigo-600">{getWeekTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Entries Table - NO HORIZONTAL SCROLLING */}
      <div>
        <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
          <h2 className="text-base font-semibold text-gray-800 flex items-center">
            <Clock className="w-4 h-4 mr-1.5 text-blue-600" />
            Recent Entries
            <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {filteredEntries.length}
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
              <input
                type="text"
                placeholder="Search entries..."
                className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-36 md:w-48"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Billable">Billable</option>
              <option value="Non-Bill">Non-Billable</option>
            </select>
          </div>
        </div>
        
        {/* ✅ FIXED: No horizontal scroll - table uses responsive layout with wrapping */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full overflow-hidden">
          <div className="w-full overflow-x-visible">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                  <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Project</th>
                  <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Task</th>
                  <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Time</th>
                  <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">User</th>
                  <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      <Clock className="w-10 h-10 mx-auto text-gray-300 mb-1" />
                      <p className="text-sm">No entries found</p>
                      <p className="text-xs text-gray-400">Start tracking your time to see entries here</p>
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((entry, index) => (
                    <tr key={entry.id} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-2.5 px-2 sm:px-3 text-sm text-gray-700 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 hidden sm:inline" />
                          <span className="text-xs sm:text-sm">{entry.date}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 sm:px-3 text-sm text-gray-700 font-medium whitespace-nowrap">{entry.project}</td>
                      <td className="py-2.5 px-2 sm:px-3 text-sm text-gray-700 whitespace-nowrap">
                        <span className="px-1.5 sm:px-2 py-0.5 bg-gray-100 rounded-full text-xs whitespace-nowrap">
                          {entry.task}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 sm:px-3 text-sm text-gray-700 font-mono font-medium whitespace-nowrap">{entry.time}</td>
                      <td className="py-2.5 px-2 sm:px-3 text-sm text-gray-700 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white flex items-center justify-center text-[10px] font-medium flex-shrink-0">
                            {entry.user.charAt(0)}
                          </div>
                          <span className="truncate max-w-[60px]">{entry.user}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap">
                        <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          entry.status === 'Billable' 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}>
                          {entry.status === 'Billable' ? 'Bill' : 'N-Bill'}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap">
                        <button 
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-500">Total Entries</div>
          <div className="text-lg font-bold text-gray-800">{entries.length}</div>
        </div>
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-500">Today</div>
          <div className="text-lg font-bold text-blue-600">{getTodayTotal()}</div>
        </div>
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-500">This Week</div>
          <div className="text-lg font-bold text-indigo-600">{getWeekTotal()}</div>
        </div>
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-500">Billable</div>
          <div className="text-lg font-bold text-green-600">
            {entries.filter(e => e.status === 'Billable').length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;