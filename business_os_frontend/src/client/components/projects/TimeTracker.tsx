// // // // // src/client/components/projects/TimeTracker.tsx
// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { 
// // // //   Play, 
// // // //   Pause, 
// // // //   Square, 
// // // //   Clock, 
// // // //   FileText, 
// // // //   User, 
// // // //   Calendar, 
// // // //   Trash2,
// // // //   Plus,
// // // //   Search,
// // // //   Filter,
// // // //   ChevronDown,
// // // //   CheckCircle,
// // // //   Circle,
// // // //   AlertCircle,
// // // //   MoreVertical,
// // // //   Edit,
// // // //   Save,
// // // //   X,
// // // //   ArrowLeft,
// // // //   LayoutDashboard,
// // // //   Timer,
// // // //   Briefcase,
// // // //   Tag,
// // // //   Users
// // // // } from 'lucide-react';

// // // // // ✅ Add props interface
// // // // interface TimeTrackerProps {
// // // //   preselectedProject?: string;
// // // // }

// // // // // Types
// // // // interface TimeEntry {
// // // //   id: string;
// // // //   date: string;
// // // //   project: string;
// // // //   task: string;
// // // //   time: string;
// // // //   timeInSeconds: number;
// // // //   user: string;
// // // //   status: 'Billable' | 'Non-Bill';
// // // //   notes?: string;
// // // // }

// // // // // Sample data
// // // // const initialEntries: TimeEntry[] = [
// // // //   {
// // // //     id: '1',
// // // //     date: '2024-06-06',
// // // //     project: 'Web De...',
// // // //     task: 'Designing',
// // // //     time: '02h : 00m : 00s',
// // // //     timeInSeconds: 7200,
// // // //     user: 'Patric...',
// // // //     status: 'Billable'
// // // //   },
// // // //   {
// // // //     id: '2',
// // // //     date: '2024-06-06',
// // // //     project: 'Design c...',
// // // //     task: 'Development',
// // // //     time: '01h : 30m : 00s',
// // // //     timeInSeconds: 5400,
// // // //     user: 'John D...',
// // // //     status: 'Billable'
// // // //   },
// // // //   {
// // // //     id: '3',
// // // //     date: '2024-06-05',
// // // //     project: 'Web ap...',
// // // //     task: 'Content',
// // // //     time: '01h : 00m : 00s',
// // // //     timeInSeconds: 3600,
// // // //     user: 'Jane S...',
// // // //     status: 'Non-Bill'
// // // //   }
// // // // ];

// // // // // ✅ Accept props
// // // // const TimeTracker: React.FC<TimeTrackerProps> = ({ preselectedProject = '' }) => {
// // // //   const [entries, setEntries] = useState<TimeEntry[]>(initialEntries);
// // // //   const [selectedProject, setSelectedProject] = useState('');
// // // //   const [selectedTask, setSelectedTask] = useState('');
// // // //   const [notes, setNotes] = useState('');
// // // //   const [isRunning, setIsRunning] = useState(false);
// // // //   const [seconds, setSeconds] = useState(0);
// // // //   const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [filterStatus, setFilterStatus] = useState<string>('all');
// // // //   const timerRef = useRef<NodeJS.Timeout | null>(null);

// // // //   // ✅ Set preselected project when prop changes
// // // //   useEffect(() => {
// // // //     if (preselectedProject) {
// // // //       setSelectedProject(preselectedProject);
// // // //     }
// // // //   }, [preselectedProject]);

// // // //   // Timer logic
// // // //   useEffect(() => {
// // // //     if (isRunning) {
// // // //       timerRef.current = setInterval(() => {
// // // //         setSeconds(prev => prev + 1);
// // // //       }, 1000);
// // // //     } else if (timerRef.current) {
// // // //       clearInterval(timerRef.current);
// // // //       timerRef.current = null;
// // // //     }

// // // //     return () => {
// // // //       if (timerRef.current) {
// // // //         clearInterval(timerRef.current);
// // // //         timerRef.current = null;
// // // //       }
// // // //     };
// // // //   }, [isRunning]);

// // // //   // Format time display
// // // //   const formatTime = (totalSeconds: number) => {
// // // //     const hours = Math.floor(totalSeconds / 3600);
// // // //     const minutes = Math.floor((totalSeconds % 3600) / 60);
// // // //     const secs = totalSeconds % 60;
// // // //     return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
// // // //   };

// // // //   // Handle Start timer
// // // //   const handleStart = () => {
// // // //     if (!selectedProject) {
// // // //       alert('Please select a project first');
// // // //       return;
// // // //     }
// // // //     setIsRunning(true);
// // // //     setCurrentEntryId(Date.now().toString());
// // // //   };

// // // //   // Handle Stop timer
// // // //   const handleStop = () => {
// // // //     if (isRunning && seconds > 0) {
// // // //       setIsRunning(false);
      
// // // //       const newEntry: TimeEntry = {
// // // //         id: Date.now().toString(),
// // // //         date: new Date().toISOString().split('T')[0],
// // // //         project: selectedProject || 'Unassigned',
// // // //         task: selectedTask || 'Unspecified',
// // // //         time: formatTime(seconds),
// // // //         timeInSeconds: seconds,
// // // //         user: 'Current User',
// // // //         status: 'Billable',
// // // //         notes: notes || undefined
// // // //       };
      
// // // //       setEntries([newEntry, ...entries]);
// // // //       setSeconds(0);
// // // //       setNotes('');
// // // //       setSelectedProject('');
// // // //       setSelectedTask('');
// // // //     }
// // // //   };

// // // //   // Handle Reset timer
// // // //   const handleReset = () => {
// // // //     setIsRunning(false);
// // // //     setSeconds(0);
// // // //     setCurrentEntryId(null);
// // // //   };

// // // //   // Handle Delete entry
// // // //   const handleDeleteEntry = (id: string) => {
// // // //     if (window.confirm('Delete this time entry?')) {
// // // //       setEntries(entries.filter(entry => entry.id !== id));
// // // //     }
// // // //   };

// // // //   // Calculate today's total time
// // // //   const getTodayTotal = () => {
// // // //     const today = new Date().toISOString().split('T')[0];
// // // //     const todayEntries = entries.filter(entry => entry.date === today);
// // // //     const totalSeconds = todayEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
// // // //     return formatTime(totalSeconds);
// // // //   };

// // // //   // Calculate week's total time
// // // //   const getWeekTotal = () => {
// // // //     const now = new Date();
// // // //     const startOfWeek = new Date(now);
// // // //     startOfWeek.setDate(now.getDate() - now.getDay());
// // // //     const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
    
// // // //     const weekEntries = entries.filter(entry => entry.date >= startOfWeekStr);
// // // //     const totalSeconds = weekEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
// // // //     return formatTime(totalSeconds);
// // // //   };

// // // //   // Filter entries
// // // //   const getFilteredEntries = () => {
// // // //     let filtered = entries;
// // // //     if (searchTerm) {
// // // //       filtered = filtered.filter(entry =>
// // // //         entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //         entry.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //         entry.user.toLowerCase().includes(searchTerm.toLowerCase())
// // // //       );
// // // //     }
// // // //     if (filterStatus !== 'all') {
// // // //       filtered = filtered.filter(entry => entry.status === filterStatus);
// // // //     }
// // // //     return filtered;
// // // //   };

// // // //   // Projects list
// // // //   const projects = [
// // // //     { id: 'web-dev', name: 'Web Development' },
// // // //     { id: 'design', name: 'Design Project' },
// // // //     { id: 'testing', name: 'Testing' },
// // // //     { id: 'content', name: 'Content Creation' }
// // // //   ];

// // // //   // Tasks list
// // // //   const tasks = [
// // // //     { id: 'designing', name: 'Designing' },
// // // //     { id: 'development', name: 'Development' },
// // // //     { id: 'content', name: 'Content' },
// // // //     { id: 'testing', name: 'Testing' },
// // // //     { id: 'review', name: 'Review' }
// // // //   ];

// // // //   const filteredEntries = getFilteredEntries();

// // // //   return (
// // // //     // ✅ REMOVED p-6 and min-h-screen - Reduced padding
// // // //     <div className="bg-gray-50">
// // // //       {/* ✅ REMOVED Header section - Now in ProjectList */}

// // // //       {/* Timer Section - Reduced margin */}
// // // //       <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 mb-4 border border-blue-100 shadow-sm">
// // // //         <div className="flex flex-col lg:flex-row gap-4">
          
// // // //           {/* Timer Display */}
// // // //           <div className="lg:w-1/3 bg-white rounded-2xl p-5 shadow-md border border-blue-100">
// // // //             <div className="text-center">
// // // //               <div className="text-4xl font-bold text-gray-800 font-mono tracking-wider">
// // // //                 {formatTime(seconds)}
// // // //               </div>
              
// // // //               <div className="flex items-center justify-center gap-2 mt-3">
// // // //                 <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
// // // //                 <span className="text-sm text-gray-500">{isRunning ? 'Running' : 'Stopped'}</span>
// // // //               </div>
              
// // // //               <div className="flex gap-2 mt-3">
// // // //                 {!isRunning ? (
// // // //                   <button
// // // //                     onClick={handleStart}
// // // //                     className="flex-1 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
// // // //                   >
// // // //                     <Play className="w-4 h-4" />
// // // //                     Start Timer
// // // //                   </button>
// // // //                 ) : (
// // // //                   <button
// // // //                     onClick={handleStop}
// // // //                     className="flex-1 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
// // // //                   >
// // // //                     <Square className="w-4 h-4" />
// // // //                     Stop Timer
// // // //                   </button>
// // // //                 )}
// // // //                 <button
// // // //                   onClick={handleReset}
// // // //                   className="px-3 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all text-sm"
// // // //                   disabled={seconds === 0}
// // // //                 >
// // // //                   Reset
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Project & Task Selectors */}
// // // //           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
// // // //             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // // //                 <Briefcase className="w-4 h-4 inline mr-1" />
// // // //                 Project <span className="text-red-500">*</span>
// // // //               </label>
// // // //               <select 
// // // //                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
// // // //                 value={selectedProject}
// // // //                 onChange={(e) => setSelectedProject(e.target.value)}
// // // //                 disabled={isRunning}
// // // //               >
// // // //                 <option value="">Select Project</option>
// // // //                 {projects.map(project => (
// // // //                   <option key={project.id} value={project.name}>
// // // //                     {project.name}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>
// // // //             </div>
            
// // // //             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // // //                 <Tag className="w-4 h-4 inline mr-1" />
// // // //                 Task
// // // //               </label>
// // // //               <select 
// // // //                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
// // // //                 value={selectedTask}
// // // //                 onChange={(e) => setSelectedTask(e.target.value)}
// // // //                 disabled={isRunning}
// // // //               >
// // // //                 <option value="">Select Task</option>
// // // //                 {tasks.map(task => (
// // // //                   <option key={task.id} value={task.name}>
// // // //                     {task.name}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Notes and Summary - Reduced spacing */}
// // // //         <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
// // // //           <div className="md:col-span-1">
// // // //             <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // // //               <FileText className="w-4 h-4 inline mr-1" />
// // // //               Notes
// // // //             </label>
// // // //             <textarea
// // // //               className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm"
// // // //               rows={2}
// // // //               placeholder="Add notes..."
// // // //               value={notes}
// // // //               onChange={(e) => setNotes(e.target.value)}
// // // //               disabled={isRunning}
// // // //             />
// // // //           </div>
          
// // // //           <div className="md:col-span-2 grid grid-cols-2 gap-3">
// // // //             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
// // // //               <span className="text-sm text-gray-600">Today</span>
// // // //               <span className="text-base font-bold text-blue-600">{getTodayTotal()}</span>
// // // //             </div>
// // // //             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
// // // //               <span className="text-sm text-gray-600">This Week</span>
// // // //               <span className="text-base font-bold text-indigo-600">{getWeekTotal()}</span>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Recent Entries Table - Reduced margin */}
// // // //       <div>
// // // //         <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
// // // //           <h2 className="text-base font-semibold text-gray-800 flex items-center">
// // // //             <Clock className="w-4 h-4 mr-1.5 text-blue-600" />
// // // //             Recent Entries
// // // //             <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
// // // //               {filteredEntries.length}
// // // //             </span>
// // // //           </h2>
// // // //           <div className="flex flex-wrap items-center gap-2">
// // // //             <div className="relative">
// // // //               <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
// // // //               <input
// // // //                 type="text"
// // // //                 placeholder="Search entries..."
// // // //                 className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-40 md:w-48"
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //               />
// // // //             </div>
// // // //             <select
// // // //               className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
// // // //               value={filterStatus}
// // // //               onChange={(e) => setFilterStatus(e.target.value)}
// // // //             >
// // // //               <option value="all">All Status</option>
// // // //               <option value="Billable">Billable</option>
// // // //               <option value="Non-Bill">Non-Billable</option>
// // // //             </select>
// // // //           </div>
// // // //         </div>
        
// // // //         <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
// // // //           <table className="w-full text-sm">
// // // //             <thead>
// // // //               <tr className="bg-gray-50 border-b border-gray-200">
// // // //                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
// // // //                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
// // // //                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Task</th>
// // // //                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
// // // //                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
// // // //                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
// // // //                 <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {filteredEntries.length === 0 ? (
// // // //                 <tr>
// // // //                   <td colSpan={7} className="text-center py-8 text-gray-500">
// // // //                     <Clock className="w-10 h-10 mx-auto text-gray-300 mb-1" />
// // // //                     <p className="text-sm">No entries found</p>
// // // //                     <p className="text-xs text-gray-400">Start tracking your time to see entries here</p>
// // // //                   </td>
// // // //                 </tr>
// // // //               ) : (
// // // //                 filteredEntries.map((entry, index) => (
// // // //                   <tr key={entry.id} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
// // // //                     <td className="py-2.5 px-3 text-sm text-gray-700">
// // // //                       <div className="flex items-center gap-1">
// // // //                         <Calendar className="w-3.5 h-3.5 text-gray-400" />
// // // //                         {entry.date}
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="py-2.5 px-3 text-sm text-gray-700 font-medium">{entry.project}</td>
// // // //                     <td className="py-2.5 px-3 text-sm text-gray-700">
// // // //                       <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
// // // //                         {entry.task}
// // // //                       </span>
// // // //                     </td>
// // // //                     <td className="py-2.5 px-3 text-sm text-gray-700 font-mono font-medium">{entry.time}</td>
// // // //                     <td className="py-2.5 px-3 text-sm text-gray-700">
// // // //                       <div className="flex items-center gap-1.5">
// // // //                         <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white flex items-center justify-center text-[10px] font-medium">
// // // //                           {entry.user.charAt(0)}
// // // //                         </div>
// // // //                         {entry.user}
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="py-2.5 px-3">
// // // //                       <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
// // // //                         entry.status === 'Billable' 
// // // //                           ? 'bg-green-100 text-green-700 border border-green-200' 
// // // //                           : 'bg-gray-100 text-gray-700 border border-gray-200'
// // // //                       }`}>
// // // //                         {entry.status}
// // // //                       </span>
// // // //                     </td>
// // // //                     <td className="py-2.5 px-3">
// // // //                       <button 
// // // //                         onClick={() => handleDeleteEntry(entry.id)}
// // // //                         className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg"
// // // //                         title="Delete entry"
// // // //                       >
// // // //                         <Trash2 className="w-3.5 h-3.5" />
// // // //                       </button>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))
// // // //               )}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>

// // // //       {/* Footer Stats - Reduced spacing */}
// // // //       <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
// // // //         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
// // // //           <div className="text-xs text-gray-500">Total Entries</div>
// // // //           <div className="text-lg font-bold text-gray-800">{entries.length}</div>
// // // //         </div>
// // // //         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
// // // //           <div className="text-xs text-gray-500">Today</div>
// // // //           <div className="text-lg font-bold text-blue-600">{getTodayTotal()}</div>
// // // //         </div>
// // // //         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
// // // //           <div className="text-xs text-gray-500">This Week</div>
// // // //           <div className="text-lg font-bold text-indigo-600">{getWeekTotal()}</div>
// // // //         </div>
// // // //         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
// // // //           <div className="text-xs text-gray-500">Billable</div>
// // // //           <div className="text-lg font-bold text-green-600">
// // // //             {entries.filter(e => e.status === 'Billable').length}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TimeTracker;
// // // // src/client/components/projects/TimeTracker.tsx
// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import {
// // // //   Play,
// // // //   Pause,
// // // //   Square,
// // // //   Clock,
// // // //   FileText,
// // // //   User,
// // // //   Calendar,
// // // //   Trash2,
// // // //   Plus,
// // // //   Search,
// // // //   Filter,
// // // //   ChevronDown,
// // // //   CheckCircle,
// // // //   Circle,
// // // //   AlertCircle,
// // // //   MoreVertical,
// // // //   Edit,
// // // //   Save,
// // // //   X,
// // // //   ArrowLeft,
// // // //   LayoutDashboard,
// // // //   Timer,
// // // //   Briefcase,
// // // //   Tag,
// // // //   Users
// // // // } from 'lucide-react';

// // // // // ✅ Add props interface
// // // // interface TimeTrackerProps {
// // // //   preselectedProject?: string;
// // // // }

// // // // // Types
// // // // interface TimeEntry {
// // // //   id: string;
// // // //   date: string;
// // // //   project: string;
// // // //   task: string;
// // // //   time: string;
// // // //   timeInSeconds: number;
// // // //   user: string;
// // // //   status: 'Billable' | 'Non-Bill';
// // // //   notes?: string;
// // // // }

// // // // // Sample data
// // // // const initialEntries: TimeEntry[] = [
// // // //   {
// // // //     id: '1',
// // // //     date: '2024-06-06',
// // // //     project: 'Web De...',
// // // //     task: 'Designing',
// // // //     time: '02h : 00m : 00s',
// // // //     timeInSeconds: 7200,
// // // //     user: 'Patric...',
// // // //     status: 'Billable'
// // // //   },
// // // //   {
// // // //     id: '2',
// // // //     date: '2024-06-06',
// // // //     project: 'Design c...',
// // // //     task: 'Development',
// // // //     time: '01h : 30m : 00s',
// // // //     timeInSeconds: 5400,
// // // //     user: 'John D...',
// // // //     status: 'Billable'
// // // //   },
// // // //   {
// // // //     id: '3',
// // // //     date: '2024-06-05',
// // // //     project: 'Web ap...',
// // // //     task: 'Content',
// // // //     time: '01h : 00m : 00s',
// // // //     timeInSeconds: 3600,
// // // //     user: 'Jane S...',
// // // //     status: 'Non-Bill'
// // // //   }
// // // // ];

// // // // // ✅ Accept props
// // // // const TimeTracker: React.FC<TimeTrackerProps> = ({ preselectedProject = '' }) => {
// // // //   const [entries, setEntries] = useState<TimeEntry[]>(initialEntries);
// // // //   const [selectedProject, setSelectedProject] = useState('');
// // // //   const [selectedTask, setSelectedTask] = useState('');
// // // //   const [notes, setNotes] = useState('');
// // // //   const [isRunning, setIsRunning] = useState(false);
// // // //   const [seconds, setSeconds] = useState(0);
// // // //   const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [filterStatus, setFilterStatus] = useState<string>('all');
// // // //   const timerRef = useRef<NodeJS.Timeout | null>(null);

// // // //   // ✅ Set preselected project when prop changes
// // // //   useEffect(() => {
// // // //     if (preselectedProject) {
// // // //       setSelectedProject(preselectedProject);
// // // //     }
// // // //   }, [preselectedProject]);

// // // //   // Timer logic
// // // //   useEffect(() => {
// // // //     if (isRunning) {
// // // //       timerRef.current = setInterval(() => {
// // // //         setSeconds(prev => prev + 1);
// // // //       }, 1000);
// // // //     } else if (timerRef.current) {
// // // //       clearInterval(timerRef.current);
// // // //       timerRef.current = null;
// // // //     }

// // // //     return () => {
// // // //       if (timerRef.current) {
// // // //         clearInterval(timerRef.current);
// // // //         timerRef.current = null;
// // // //       }
// // // //     };
// // // //   }, [isRunning]);

// // // //   // Format time display
// // // //   const formatTime = (totalSeconds: number) => {
// // // //     const hours = Math.floor(totalSeconds / 3600);
// // // //     const minutes = Math.floor((totalSeconds % 3600) / 60);
// // // //     const secs = totalSeconds % 60;
// // // //     return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
// // // //   };

// // // //   // Handle Start timer
// // // //   const handleStart = () => {
// // // //     if (!selectedProject) {
// // // //       alert('Please select a project first');
// // // //       return;
// // // //     }
// // // //     setIsRunning(true);
// // // //     setCurrentEntryId(Date.now().toString());
// // // //   };

// // // //   // Handle Stop timer
// // // //   const handleStop = () => {
// // // //     if (isRunning && seconds > 0) {
// // // //       setIsRunning(false);
      
// // // //       const newEntry: TimeEntry = {
// // // //         id: Date.now().toString(),
// // // //         date: new Date().toISOString().split('T')[0],
// // // //         project: selectedProject || 'Unassigned',
// // // //         task: selectedTask || 'Unspecified',
// // // //         time: formatTime(seconds),
// // // //         timeInSeconds: seconds,
// // // //         user: 'Current User',
// // // //         status: 'Billable',
// // // //         notes: notes || undefined
// // // //       };
      
// // // //       setEntries([newEntry, ...entries]);
// // // //       setSeconds(0);
// // // //       setNotes('');
// // // //       setSelectedProject('');
// // // //       setSelectedTask('');
// // // //     }
// // // //   };

// // // //   // Handle Reset timer
// // // //   const handleReset = () => {
// // // //     setIsRunning(false);
// // // //     setSeconds(0);
// // // //     setCurrentEntryId(null);
// // // //   };

// // // //   // Handle Delete entry
// // // //   const handleDeleteEntry = (id: string) => {
// // // //     if (window.confirm('Delete this time entry?')) {
// // // //       setEntries(entries.filter(entry => entry.id !== id));
// // // //     }
// // // //   };

// // // //   // Calculate today's total time
// // // //   const getTodayTotal = () => {
// // // //     const today = new Date().toISOString().split('T')[0];
// // // //     const todayEntries = entries.filter(entry => entry.date === today);
// // // //     const totalSeconds = todayEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
// // // //     return formatTime(totalSeconds);
// // // //   };

// // // //   // Calculate week's total time
// // // //   const getWeekTotal = () => {
// // // //     const now = new Date();
// // // //     const startOfWeek = new Date(now);
// // // //     startOfWeek.setDate(now.getDate() - now.getDay());
// // // //     const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
    
// // // //     const weekEntries = entries.filter(entry => entry.date >= startOfWeekStr);
// // // //     const totalSeconds = weekEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
// // // //     return formatTime(totalSeconds);
// // // //   };

// // // //   // Filter entries
// // // //   const getFilteredEntries = () => {
// // // //     let filtered = entries;
// // // //     if (searchTerm) {
// // // //       filtered = filtered.filter(entry =>
// // // //         entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //         entry.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //         entry.user.toLowerCase().includes(searchTerm.toLowerCase())
// // // //       );
// // // //     }
// // // //     if (filterStatus !== 'all') {
// // // //       filtered = filtered.filter(entry => entry.status === filterStatus);
// // // //     }
// // // //     return filtered;
// // // //   };

// // // //   // Projects list
// // // //   const projects = [
// // // //     { id: 'web-dev', name: 'Web Development' },
// // // //     { id: 'design', name: 'Design Project' },
// // // //     { id: 'testing', name: 'Testing' },
// // // //     { id: 'content', name: 'Content Creation' }
// // // //   ];

// // // //   // Tasks list
// // // //   const tasks = [
// // // //     { id: 'designing', name: 'Designing' },
// // // //     { id: 'development', name: 'Development' },
// // // //     { id: 'content', name: 'Content' },
// // // //     { id: 'testing', name: 'Testing' },
// // // //     { id: 'review', name: 'Review' }
// // // //   ];

// // // //   const filteredEntries = getFilteredEntries();

// // // //   return (
// // // //     // ✅ REMOVED p-6 and min-h-screen - Reduced padding
// // // //     <div className="bg-gray-50 w-full max-w-full overflow-x-hidden">
// // // //       {/* ✅ REMOVED Header section - Now in ProjectList */}

// // // //       {/* Timer Section - Reduced margin */}
// // // //       <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 mb-4 border border-blue-100 shadow-sm">
// // // //         <div className="flex flex-col lg:flex-row gap-4">
          
// // // //           {/* Timer Display */}
// // // //           <div className="lg:w-1/3 bg-white rounded-2xl p-5 shadow-md border border-blue-100">
// // // //             <div className="text-center">
// // // //               <div className="text-4xl font-bold text-gray-800 font-mono tracking-wider">
// // // //                 {formatTime(seconds)}
// // // //               </div>
              
// // // //               <div className="flex items-center justify-center gap-2 mt-3">
// // // //                 <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
// // // //                 <span className="text-sm text-gray-500">{isRunning ? 'Running' : 'Stopped'}</span>
// // // //               </div>
              
// // // //               <div className="flex gap-2 mt-3">
// // // //                 {!isRunning ? (
// // // //                   <button
// // // //                     onClick={handleStart}
// // // //                     className="flex-1 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
// // // //                   >
// // // //                     <Play className="w-4 h-4" />
// // // //                     Start Timer
// // // //                   </button>
// // // //                 ) : (
// // // //                   <button
// // // //                     onClick={handleStop}
// // // //                     className="flex-1 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
// // // //                   >
// // // //                     <Square className="w-4 h-4" />
// // // //                     Stop Timer
// // // //                   </button>
// // // //                 )}
// // // //                 <button
// // // //                   onClick={handleReset}
// // // //                   className="px-3 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all text-sm"
// // // //                   disabled={seconds === 0}
// // // //                 >
// // // //                   Reset
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Project & Task Selectors */}
// // // //           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
// // // //             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // // //                 <Briefcase className="w-4 h-4 inline mr-1" />
// // // //                 Project <span className="text-red-500">*</span>
// // // //               </label>
// // // //               <select 
// // // //                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
// // // //                 value={selectedProject}
// // // //                 onChange={(e) => setSelectedProject(e.target.value)}
// // // //                 disabled={isRunning}
// // // //               >
// // // //                 <option value="">Select Project</option>
// // // //                 {projects.map(project => (
// // // //                   <option key={project.id} value={project.name}>
// // // //                     {project.name}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>
// // // //             </div>
            
// // // //             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // // //                 <Tag className="w-4 h-4 inline mr-1" />
// // // //                 Task
// // // //               </label>
// // // //               <select 
// // // //                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
// // // //                 value={selectedTask}
// // // //                 onChange={(e) => setSelectedTask(e.target.value)}
// // // //                 disabled={isRunning}
// // // //               >
// // // //                 <option value="">Select Task</option>
// // // //                 {tasks.map(task => (
// // // //                   <option key={task.id} value={task.name}>
// // // //                     {task.name}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Notes and Summary - Reduced spacing */}
// // // //         <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
// // // //           <div className="md:col-span-1">
// // // //             <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // // //               <FileText className="w-4 h-4 inline mr-1" />
// // // //               Notes
// // // //             </label>
// // // //             <textarea
// // // //               className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm"
// // // //               rows={2}
// // // //               placeholder="Add notes..."
// // // //               value={notes}
// // // //               onChange={(e) => setNotes(e.target.value)}
// // // //               disabled={isRunning}
// // // //             />
// // // //           </div>
          
// // // //           <div className="md:col-span-2 grid grid-cols-2 gap-3">
// // // //             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
// // // //               <span className="text-sm text-gray-600">Today</span>
// // // //               <span className="text-base font-bold text-blue-600">{getTodayTotal()}</span>
// // // //             </div>
// // // //             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
// // // //               <span className="text-sm text-gray-600">This Week</span>
// // // //               <span className="text-base font-bold text-indigo-600">{getWeekTotal()}</span>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Recent Entries Table - Reduced margin */}
// // // //       <div>
// // // //         <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
// // // //           <h2 className="text-base font-semibold text-gray-800 flex items-center">
// // // //             <Clock className="w-4 h-4 mr-1.5 text-blue-600" />
// // // //             Recent Entries
// // // //             <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
// // // //               {filteredEntries.length}
// // // //             </span>
// // // //           </h2>
// // // //           <div className="flex flex-wrap items-center gap-2">
// // // //             <div className="relative">
// // // //               <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
// // // //               <input
// // // //                 type="text"
// // // //                 placeholder="Search entries..."
// // // //                 className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-40 md:w-48"
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //               />
// // // //             </div>
// // // //             <select
// // // //               className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
// // // //               value={filterStatus}
// // // //               onChange={(e) => setFilterStatus(e.target.value)}
// // // //             >
// // // //               <option value="all">All Status</option>
// // // //               <option value="Billable">Billable</option>
// // // //               <option value="Non-Bill">Non-Billable</option>
// // // //             </select>
// // // //           </div>
// // // //         </div>
        
// // // //         {/* ✅ Fixed table: overflow-x-auto removed, full width with no horizontal scroll */}
// // // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full overflow-hidden">
// // // //           <div className="w-full overflow-x-auto">
// // // //             <table className="w-full min-w-full table-auto text-sm">
// // // //               <thead>
// // // //                 <tr className="bg-gray-50 border-b border-gray-200">
// // // //                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
// // // //                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Project</th>
// // // //                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Task</th>
// // // //                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Time</th>
// // // //                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">User</th>
// // // //                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
// // // //                   <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Action</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {filteredEntries.length === 0 ? (
// // // //                   <tr>
// // // //                     <td colSpan={7} className="text-center py-8 text-gray-500">
// // // //                       <Clock className="w-10 h-10 mx-auto text-gray-300 mb-1" />
// // // //                       <p className="text-sm">No entries found</p>
// // // //                       <p className="text-xs text-gray-400">Start tracking your time to see entries here</p>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ) : (
// // // //                   filteredEntries.map((entry, index) => (
// // // //                     <tr key={entry.id} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
// // // //                       <td className="py-2.5 px-3 text-sm text-gray-700 whitespace-nowrap">
// // // //                         <div className="flex items-center gap-1">
// // // //                           <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
// // // //                           {entry.date}
// // // //                         </div>
// // // //                       </td>
// // // //                       <td className="py-2.5 px-3 text-sm text-gray-700 font-medium whitespace-nowrap">{entry.project}</td>
// // // //                       <td className="py-2.5 px-3 text-sm text-gray-700 whitespace-nowrap">
// // // //                         <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs whitespace-nowrap">
// // // //                           {entry.task}
// // // //                         </span>
// // // //                       </td>
// // // //                       <td className="py-2.5 px-3 text-sm text-gray-700 font-mono font-medium whitespace-nowrap">{entry.time}</td>
// // // //                       <td className="py-2.5 px-3 text-sm text-gray-700 whitespace-nowrap">
// // // //                         <div className="flex items-center gap-1.5">
// // // //                           <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white flex items-center justify-center text-[10px] font-medium flex-shrink-0">
// // // //                             {entry.user.charAt(0)}
// // // //                           </div>
// // // //                           {entry.user}
// // // //                         </div>
// // // //                       </td>
// // // //                       <td className="py-2.5 px-3 whitespace-nowrap">
// // // //                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
// // // //                           entry.status === 'Billable' 
// // // //                             ? 'bg-green-100 text-green-700 border border-green-200' 
// // // //                             : 'bg-gray-100 text-gray-700 border border-gray-200'
// // // //                         }`}>
// // // //                           {entry.status}
// // // //                         </span>
// // // //                       </td>
// // // //                       <td className="py-2.5 px-3 whitespace-nowrap">
// // // //                         <button 
// // // //                           onClick={() => handleDeleteEntry(entry.id)}
// // // //                           className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg"
// // // //                           title="Delete entry"
// // // //                         >
// // // //                           <Trash2 className="w-3.5 h-3.5" />
// // // //                         </button>
// // // //                       </td>
// // // //                     </tr>
// // // //                   ))
// // // //                 )}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Footer Stats - Reduced spacing */}
// // // //       <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
// // // //         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
// // // //           <div className="text-xs text-gray-500">Total Entries</div>
// // // //           <div className="text-lg font-bold text-gray-800">{entries.length}</div>
// // // //         </div>
// // // //         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
// // // //           <div className="text-xs text-gray-500">Today</div>
// // // //           <div className="text-lg font-bold text-blue-600">{getTodayTotal()}</div>
// // // //         </div>
// // // //         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
// // // //           <div className="text-xs text-gray-500">This Week</div>
// // // //           <div className="text-lg font-bold text-indigo-600">{getWeekTotal()}</div>
// // // //         </div>
// // // //         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
// // // //           <div className="text-xs text-gray-500">Billable</div>
// // // //           <div className="text-lg font-bold text-green-600">
// // // //             {entries.filter(e => e.status === 'Billable').length}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TimeTracker;
// // // // src/client/components/projects/TimeTracker.tsx
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import {
// // //   Play,
// // //   Square,
// // //   Clock,
// // //   FileText,
// // //   Calendar,
// // //   Trash2,
// // //   Search,
// // //   Briefcase,
// // //   Tag,
// // // } from 'lucide-react';

// // // // ✅ Add props interface
// // // interface TimeTrackerProps {
// // //   preselectedProject?: string;
// // // }

// // // // Types
// // // interface TimeEntry {
// // //   id: string;
// // //   date: string;
// // //   project: string;
// // //   task: string;
// // //   time: string;
// // //   timeInSeconds: number;
// // //   user: string;
// // //   status: 'Billable' | 'Non-Bill';
// // //   notes?: string;
// // // }

// // // // Sample data
// // // const initialEntries: TimeEntry[] = [
// // //   {
// // //     id: '1',
// // //     date: '2024-06-06',
// // //     project: 'Web De...',
// // //     task: 'Designing',
// // //     time: '02h : 00m : 00s',
// // //     timeInSeconds: 7200,
// // //     user: 'Patric...',
// // //     status: 'Billable'
// // //   },
// // //   {
// // //     id: '2',
// // //     date: '2024-06-06',
// // //     project: 'Design c...',
// // //     task: 'Development',
// // //     time: '01h : 30m : 00s',
// // //     timeInSeconds: 5400,
// // //     user: 'John D...',
// // //     status: 'Billable'
// // //   },
// // //   {
// // //     id: '3',
// // //     date: '2024-06-05',
// // //     project: 'Web ap...',
// // //     task: 'Content',
// // //     time: '01h : 00m : 00s',
// // //     timeInSeconds: 3600,
// // //     user: 'Jane S...',
// // //     status: 'Non-Bill'
// // //   }
// // // ];

// // // // ✅ Accept props
// // // const TimeTracker: React.FC<TimeTrackerProps> = ({ preselectedProject = '' }) => {
// // //   const [entries, setEntries] = useState<TimeEntry[]>(initialEntries);
// // //   const [selectedProject, setSelectedProject] = useState('');
// // //   const [selectedTask, setSelectedTask] = useState('');
// // //   const [notes, setNotes] = useState('');
// // //   const [isRunning, setIsRunning] = useState(false);
// // //   const [seconds, setSeconds] = useState(0);
// // //   const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [filterStatus, setFilterStatus] = useState<string>('all');
// // //   const timerRef = useRef<NodeJS.Timeout | null>(null);

// // //   // ✅ Set preselected project when prop changes
// // //   useEffect(() => {
// // //     if (preselectedProject) {
// // //       setSelectedProject(preselectedProject);
// // //     }
// // //   }, [preselectedProject]);

// // //   // Timer logic
// // //   useEffect(() => {
// // //     if (isRunning) {
// // //       timerRef.current = setInterval(() => {
// // //         setSeconds(prev => prev + 1);
// // //       }, 1000);
// // //     } else if (timerRef.current) {
// // //       clearInterval(timerRef.current);
// // //       timerRef.current = null;
// // //     }

// // //     return () => {
// // //       if (timerRef.current) {
// // //         clearInterval(timerRef.current);
// // //         timerRef.current = null;
// // //       }
// // //     };
// // //   }, [isRunning]);

// // //   // Format time display
// // //   const formatTime = (totalSeconds: number) => {
// // //     const hours = Math.floor(totalSeconds / 3600);
// // //     const minutes = Math.floor((totalSeconds % 3600) / 60);
// // //     const secs = totalSeconds % 60;
// // //     return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
// // //   };

// // //   // Handle Start timer
// // //   const handleStart = () => {
// // //     if (!selectedProject) {
// // //       alert('Please select a project first');
// // //       return;
// // //     }
// // //     setIsRunning(true);
// // //     setCurrentEntryId(Date.now().toString());
// // //   };

// // //   // Handle Stop timer
// // //   const handleStop = () => {
// // //     if (isRunning && seconds > 0) {
// // //       setIsRunning(false);
      
// // //       const newEntry: TimeEntry = {
// // //         id: Date.now().toString(),
// // //         date: new Date().toISOString().split('T')[0],
// // //         project: selectedProject || 'Unassigned',
// // //         task: selectedTask || 'Unspecified',
// // //         time: formatTime(seconds),
// // //         timeInSeconds: seconds,
// // //         user: 'Current User',
// // //         status: 'Billable',
// // //         notes: notes || undefined
// // //       };
      
// // //       setEntries([newEntry, ...entries]);
// // //       setSeconds(0);
// // //       setNotes('');
// // //       setSelectedProject('');
// // //       setSelectedTask('');
// // //     }
// // //   };

// // //   // Handle Reset timer
// // //   const handleReset = () => {
// // //     setIsRunning(false);
// // //     setSeconds(0);
// // //     setCurrentEntryId(null);
// // //   };

// // //   // Handle Delete entry
// // //   const handleDeleteEntry = (id: string) => {
// // //     if (window.confirm('Delete this time entry?')) {
// // //       setEntries(entries.filter(entry => entry.id !== id));
// // //     }
// // //   };

// // //   // Calculate today's total time
// // //   const getTodayTotal = () => {
// // //     const today = new Date().toISOString().split('T')[0];
// // //     const todayEntries = entries.filter(entry => entry.date === today);
// // //     const totalSeconds = todayEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
// // //     return formatTime(totalSeconds);
// // //   };

// // //   // Calculate week's total time
// // //   const getWeekTotal = () => {
// // //     const now = new Date();
// // //     const startOfWeek = new Date(now);
// // //     startOfWeek.setDate(now.getDate() - now.getDay());
// // //     const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
    
// // //     const weekEntries = entries.filter(entry => entry.date >= startOfWeekStr);
// // //     const totalSeconds = weekEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
// // //     return formatTime(totalSeconds);
// // //   };

// // //   // Filter entries
// // //   const getFilteredEntries = () => {
// // //     let filtered = entries;
// // //     if (searchTerm) {
// // //       filtered = filtered.filter(entry =>
// // //         entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         entry.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         entry.user.toLowerCase().includes(searchTerm.toLowerCase())
// // //       );
// // //     }
// // //     if (filterStatus !== 'all') {
// // //       filtered = filtered.filter(entry => entry.status === filterStatus);
// // //     }
// // //     return filtered;
// // //   };

// // //   // Projects list
// // //   const projects = [
// // //     { id: 'web-dev', name: 'Web Development' },
// // //     { id: 'design', name: 'Design Project' },
// // //     { id: 'testing', name: 'Testing' },
// // //     { id: 'content', name: 'Content Creation' }
// // //   ];

// // //   // Tasks list
// // //   const tasks = [
// // //     { id: 'designing', name: 'Designing' },
// // //     { id: 'development', name: 'Development' },
// // //     { id: 'content', name: 'Content' },
// // //     { id: 'testing', name: 'Testing' },
// // //     { id: 'review', name: 'Review' }
// // //   ];

// // //   const filteredEntries = getFilteredEntries();

// // //   return (
// // //     <div className="bg-gray-50 w-full max-w-full overflow-x-hidden">
// // //       {/* Timer Section */}
// // //       <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 mb-4 border border-blue-100 shadow-sm">
// // //         <div className="flex flex-col lg:flex-row gap-4">
          
// // //           {/* Timer Display */}
// // //           <div className="lg:w-1/3 bg-white rounded-2xl p-5 shadow-md border border-blue-100">
// // //             <div className="text-center">
// // //               <div className="text-4xl font-bold text-gray-800 font-mono tracking-wider">
// // //                 {formatTime(seconds)}
// // //               </div>
              
// // //               <div className="flex items-center justify-center gap-2 mt-3">
// // //                 <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
// // //                 <span className="text-sm text-gray-500">{isRunning ? 'Running' : 'Stopped'}</span>
// // //               </div>
              
// // //               <div className="flex gap-2 mt-3">
// // //                 {!isRunning ? (
// // //                   <button
// // //                     onClick={handleStart}
// // //                     className="flex-1 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
// // //                   >
// // //                     <Play className="w-4 h-4" />
// // //                     Start Timer
// // //                   </button>
// // //                 ) : (
// // //                   <button
// // //                     onClick={handleStop}
// // //                     className="flex-1 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
// // //                   >
// // //                     <Square className="w-4 h-4" />
// // //                     Stop Timer
// // //                   </button>
// // //                 )}
// // //                 <button
// // //                   onClick={handleReset}
// // //                   className="px-3 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all text-sm"
// // //                   disabled={seconds === 0}
// // //                 >
// // //                   Reset
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Project & Task Selectors */}
// // //           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
// // //             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
// // //               <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // //                 <Briefcase className="w-4 h-4 inline mr-1" />
// // //                 Project <span className="text-red-500">*</span>
// // //               </label>
// // //               <select 
// // //                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
// // //                 value={selectedProject}
// // //                 onChange={(e) => setSelectedProject(e.target.value)}
// // //                 disabled={isRunning}
// // //               >
// // //                 <option value="">Select Project</option>
// // //                 {projects.map(project => (
// // //                   <option key={project.id} value={project.name}>
// // //                     {project.name}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             </div>
            
// // //             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
// // //               <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // //                 <Tag className="w-4 h-4 inline mr-1" />
// // //                 Task
// // //               </label>
// // //               <select 
// // //                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
// // //                 value={selectedTask}
// // //                 onChange={(e) => setSelectedTask(e.target.value)}
// // //                 disabled={isRunning}
// // //               >
// // //                 <option value="">Select Task</option>
// // //                 {tasks.map(task => (
// // //                   <option key={task.id} value={task.name}>
// // //                     {task.name}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Notes and Summary */}
// // //         <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
// // //           <div className="md:col-span-1">
// // //             <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // //               <FileText className="w-4 h-4 inline mr-1" />
// // //               Notes
// // //             </label>
// // //             <textarea
// // //               className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm"
// // //               rows={2}
// // //               placeholder="Add notes..."
// // //               value={notes}
// // //               onChange={(e) => setNotes(e.target.value)}
// // //               disabled={isRunning}
// // //             />
// // //           </div>
          
// // //           <div className="md:col-span-2 grid grid-cols-2 gap-3">
// // //             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
// // //               <span className="text-sm text-gray-600">Today</span>
// // //               <span className="text-base font-bold text-blue-600">{getTodayTotal()}</span>
// // //             </div>
// // //             <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
// // //               <span className="text-sm text-gray-600">This Week</span>
// // //               <span className="text-base font-bold text-indigo-600">{getWeekTotal()}</span>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Recent Entries Table - NO HORIZONTAL SCROLLING */}
// // //       <div>
// // //         <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
// // //           <h2 className="text-base font-semibold text-gray-800 flex items-center">
// // //             <Clock className="w-4 h-4 mr-1.5 text-blue-600" />
// // //             Recent Entries
// // //             <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
// // //               {filteredEntries.length}
// // //             </span>
// // //           </h2>
// // //           <div className="flex flex-wrap items-center gap-2">
// // //             <div className="relative">
// // //               <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search entries..."
// // //                 className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-36 md:w-48"
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //               />
// // //             </div>
// // //             <select
// // //               className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
// // //               value={filterStatus}
// // //               onChange={(e) => setFilterStatus(e.target.value)}
// // //             >
// // //               <option value="all">All Status</option>
// // //               <option value="Billable">Billable</option>
// // //               <option value="Non-Bill">Non-Billable</option>
// // //             </select>
// // //           </div>
// // //         </div>
        
// // //         {/* ✅ FIXED: No horizontal scroll - table uses responsive layout with wrapping */}
// // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full overflow-hidden">
// // //           <div className="w-full overflow-x-visible">
// // //             <table className="w-full table-auto text-sm">
// // //               <thead>
// // //                 <tr className="bg-gray-50 border-b border-gray-200">
// // //                   <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
// // //                   <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Project</th>
// // //                   <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Task</th>
// // //                   <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Time</th>
// // //                   <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">User</th>
// // //                   <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
// // //                   <th className="text-left py-2.5 px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Action</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {filteredEntries.length === 0 ? (
// // //                   <tr>
// // //                     <td colSpan={7} className="text-center py-8 text-gray-500">
// // //                       <Clock className="w-10 h-10 mx-auto text-gray-300 mb-1" />
// // //                       <p className="text-sm">No entries found</p>
// // //                       <p className="text-xs text-gray-400">Start tracking your time to see entries here</p>
// // //                     </td>
// // //                   </tr>
// // //                 ) : (
// // //                   filteredEntries.map((entry, index) => (
// // //                     <tr key={entry.id} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
// // //                       <td className="py-2.5 px-2 sm:px-3 text-sm text-gray-700 whitespace-nowrap">
// // //                         <div className="flex items-center gap-1">
// // //                           <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 hidden sm:inline" />
// // //                           <span className="text-xs sm:text-sm">{entry.date}</span>
// // //                         </div>
// // //                       </td>
// // //                       <td className="py-2.5 px-2 sm:px-3 text-sm text-gray-700 font-medium whitespace-nowrap">{entry.project}</td>
// // //                       <td className="py-2.5 px-2 sm:px-3 text-sm text-gray-700 whitespace-nowrap">
// // //                         <span className="px-1.5 sm:px-2 py-0.5 bg-gray-100 rounded-full text-xs whitespace-nowrap">
// // //                           {entry.task}
// // //                         </span>
// // //                       </td>
// // //                       <td className="py-2.5 px-2 sm:px-3 text-sm text-gray-700 font-mono font-medium whitespace-nowrap">{entry.time}</td>
// // //                       <td className="py-2.5 px-2 sm:px-3 text-sm text-gray-700 hidden sm:table-cell">
// // //                         <div className="flex items-center gap-1.5">
// // //                           <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white flex items-center justify-center text-[10px] font-medium flex-shrink-0">
// // //                             {entry.user.charAt(0)}
// // //                           </div>
// // //                           <span className="truncate max-w-[60px]">{entry.user}</span>
// // //                         </div>
// // //                       </td>
// // //                       <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap">
// // //                         <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
// // //                           entry.status === 'Billable' 
// // //                             ? 'bg-green-100 text-green-700 border border-green-200' 
// // //                             : 'bg-gray-100 text-gray-700 border border-gray-200'
// // //                         }`}>
// // //                           {entry.status === 'Billable' ? 'Bill' : 'N-Bill'}
// // //                         </span>
// // //                       </td>
// // //                       <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap">
// // //                         <button 
// // //                           onClick={() => handleDeleteEntry(entry.id)}
// // //                           className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg"
// // //                           title="Delete entry"
// // //                         >
// // //                           <Trash2 className="w-3.5 h-3.5" />
// // //                         </button>
// // //                       </td>
// // //                     </tr>
// // //                   ))
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Footer Stats */}
// // //       <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
// // //         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
// // //           <div className="text-xs text-gray-500">Total Entries</div>
// // //           <div className="text-lg font-bold text-gray-800">{entries.length}</div>
// // //         </div>
// // //         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
// // //           <div className="text-xs text-gray-500">Today</div>
// // //           <div className="text-lg font-bold text-blue-600">{getTodayTotal()}</div>
// // //         </div>
// // //         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
// // //           <div className="text-xs text-gray-500">This Week</div>
// // //           <div className="text-lg font-bold text-indigo-600">{getWeekTotal()}</div>
// // //         </div>
// // //         <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200">
// // //           <div className="text-xs text-gray-500">Billable</div>
// // //           <div className="text-lg font-bold text-green-600">
// // //             {entries.filter(e => e.status === 'Billable').length}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TimeTracker;
// // // src/client/components/projects/TimeTracker.tsx
// // // src/client/components/projects/TimeTracker.tsx
// // import React, { useState, useEffect, useRef } from 'react';
// // import { 
// //   Play, 
// //   Pause, 
// //   Square, 
// //   Clock, 
// //   FileText, 
// //   Calendar, 
// //   Trash2,
// //   Search,
// //   Briefcase,
// //   Tag
// // } from 'lucide-react';

// // // ✅ Add props interface with currentUser
// // interface TimeTrackerProps {
// //   preselectedProject?: string;
// //   currentUser?: string;
// // }

// // // Types
// // interface TimeEntry {
// //   id: string;
// //   date: string;
// //   project: string;
// //   task: string;
// //   time: string;
// //   timeInSeconds: number;
// //   employee: string;
// //   status: 'Billable' | 'Non-Bill';
// //   notes?: string;
// // }

// // // ✅ Accept props with currentUser
// // const TimeTracker: React.FC<TimeTrackerProps> = ({ preselectedProject = '', currentUser = '' }) => {
// //   const [entries, setEntries] = useState<TimeEntry[]>([]);
// //   const [selectedProject, setSelectedProject] = useState('');
// //   const [selectedTask, setSelectedTask] = useState('');
// //   const [notes, setNotes] = useState('');
// //   const [isRunning, setIsRunning] = useState(false);
// //   const [seconds, setSeconds] = useState(0);
// //   const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterStatus, setFilterStatus] = useState<string>('all');
// //   const [availableProjects, setAvailableProjects] = useState<{id: string, name: string, employee: string}[]>([]);
// //   const [selectedProjectEmployee, setSelectedProjectEmployee] = useState<string>('');
// //   const timerRef = useRef<NodeJS.Timeout | null>(null);
// //   const [isInitialLoad, setIsInitialLoad] = useState(true);

// //   // ✅ Load saved selected project from localStorage
// //   useEffect(() => {
// //     const savedProject = localStorage.getItem('selectedTimeTrackerProject');
// //     if (savedProject) {
// //       setSelectedProject(savedProject);
// //     }
// //   }, []);

// //   // ✅ Save selected project to localStorage when it changes
// //   useEffect(() => {
// //     if (selectedProject) {
// //       localStorage.setItem('selectedTimeTrackerProject', selectedProject);
// //     } else {
// //       localStorage.removeItem('selectedTimeTrackerProject');
// //     }
// //   }, [selectedProject]);

// //   // ✅ Load projects from localStorage
// //   const loadProjects = () => {
// //     try {
// //       const savedProjects = localStorage.getItem('userProjects');
// //       if (savedProjects) {
// //         const parsed = JSON.parse(savedProjects);
// //         if (Array.isArray(parsed)) {
// //           const allProjects = parsed.map((p: any) => ({ 
// //             id: p.id, 
// //             name: p.projectName,
// //             employee: p.customerName
// //           }));
// //           setAvailableProjects(allProjects);
          
// //           if (preselectedProject) {
// //             const exists = allProjects.some(p => p.name === preselectedProject);
// //             if (exists) {
// //               setSelectedProject(preselectedProject);
// //               const project = allProjects.find(p => p.name === preselectedProject);
// //               if (project) {
// //                 setSelectedProjectEmployee(project.employee);
// //               }
// //             }
// //           }
          
// //           if (!preselectedProject) {
// //             const savedProject = localStorage.getItem('selectedTimeTrackerProject');
// //             if (savedProject) {
// //               const exists = allProjects.some(p => p.name === savedProject);
// //               if (exists) {
// //                 setSelectedProject(savedProject);
// //                 const project = allProjects.find(p => p.name === savedProject);
// //                 if (project) {
// //                   setSelectedProjectEmployee(project.employee);
// //                 }
// //               }
// //             }
// //           }
          
// //           return allProjects;
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Failed to load projects:', error);
// //     }
// //     return [];
// //   };

// //   // ✅ Load entries from localStorage
// //   useEffect(() => {
// //     if (currentUser) {
// //       loadProjects();
      
// //       try {
// //         const savedEntries = localStorage.getItem('timeEntries');
// //         if (savedEntries) {
// //           const parsed = JSON.parse(savedEntries);
// //           if (Array.isArray(parsed)) {
// //             const employeeToShow = selectedProjectEmployee || '';
// //             let filteredEntries = parsed;
// //             if (employeeToShow) {
// //               filteredEntries = parsed.filter((entry: TimeEntry) => entry.employee === employeeToShow);
// //             }
// //             setEntries(filteredEntries);
// //           }
// //         }
// //         setIsInitialLoad(false);
// //       } catch (error) {
// //         console.error('Failed to load time entries:', error);
// //         setIsInitialLoad(false);
// //       }
// //     }
// //   }, [currentUser, selectedProjectEmployee]);

// //   // ✅ When project selection changes, update the employee filter
// //   useEffect(() => {
// //     if (selectedProject) {
// //       const project = availableProjects.find(p => p.name === selectedProject);
// //       if (project) {
// //         setSelectedProjectEmployee(project.employee);
// //         localStorage.setItem('selectedTimeTrackerProject', selectedProject);
// //         try {
// //           const savedEntries = localStorage.getItem('timeEntries');
// //           if (savedEntries) {
// //             const parsed = JSON.parse(savedEntries);
// //             if (Array.isArray(parsed)) {
// //               const filteredEntries = parsed.filter((entry: TimeEntry) => entry.employee === project.employee);
// //               setEntries(filteredEntries);
// //             }
// //           }
// //         } catch (error) {
// //           console.error('Failed to load time entries:', error);
// //         }
// //       }
// //     } else {
// //       setSelectedProjectEmployee('');
// //       localStorage.removeItem('selectedTimeTrackerProject');
// //       try {
// //         const savedEntries = localStorage.getItem('timeEntries');
// //         if (savedEntries) {
// //           const parsed = JSON.parse(savedEntries);
// //           if (Array.isArray(parsed)) {
// //             setEntries([]);
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Failed to load time entries:', error);
// //       }
// //     }
// //   }, [selectedProject, availableProjects]);

// //   // ✅ Set preselected project when prop changes
// //   useEffect(() => {
// //     if (preselectedProject && availableProjects.length > 0) {
// //       const exists = availableProjects.some(p => p.name === preselectedProject);
// //       if (exists) {
// //         setSelectedProject(preselectedProject);
// //         const project = availableProjects.find(p => p.name === preselectedProject);
// //         if (project) {
// //           setSelectedProjectEmployee(project.employee);
// //           localStorage.setItem('selectedTimeTrackerProject', preselectedProject);
// //         }
// //       }
// //     }
// //   }, [preselectedProject, availableProjects]);

// //   // ✅ Save entries to localStorage whenever they change
// //   useEffect(() => {
// //     if (isInitialLoad || !currentUser) return;
    
// //     try {
// //       const savedEntries = localStorage.getItem('timeEntries');
// //       let allEntries: TimeEntry[] = savedEntries ? JSON.parse(savedEntries) : [];
      
// //       const employeeToRemove = selectedProjectEmployee || '';
// //       if (employeeToRemove) {
// //         allEntries = allEntries.filter((entry: TimeEntry) => entry.employee !== employeeToRemove);
// //       }
      
// //       const updatedEntries = [...allEntries, ...entries];
// //       localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
// //     } catch (error) {
// //       console.error('Failed to save time entries:', error);
// //     }
// //   }, [entries, currentUser, isInitialLoad, selectedProjectEmployee]);

// //   // Timer logic
// //   useEffect(() => {
// //     if (isRunning) {
// //       timerRef.current = setInterval(() => {
// //         setSeconds(prev => prev + 1);
// //       }, 1000);
// //     } else if (timerRef.current) {
// //       clearInterval(timerRef.current);
// //       timerRef.current = null;
// //     }

// //     return () => {
// //       if (timerRef.current) {
// //         clearInterval(timerRef.current);
// //         timerRef.current = null;
// //       }
// //     };
// //   }, [isRunning]);

// //   // Format time display
// //   const formatTime = (totalSeconds: number) => {
// //     const hours = Math.floor(totalSeconds / 3600);
// //     const minutes = Math.floor((totalSeconds % 3600) / 60);
// //     const secs = totalSeconds % 60;
// //     return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
// //   };

// //   // Handle Start timer
// //   const handleStart = () => {
// //     if (!selectedProject) {
// //       alert('Please select a project first');
// //       return;
// //     }
// //     setIsRunning(true);
// //     setCurrentEntryId(Date.now().toString());
// //   };

// //   // Handle Stop timer
// //   const handleStop = () => {
// //     if (isRunning && seconds > 0) {
// //       setIsRunning(false);
      
// //       const employeeToUse = selectedProjectEmployee || currentUser;
      
// //       const newEntry: TimeEntry = {
// //         id: Date.now().toString(),
// //         date: new Date().toISOString().split('T')[0],
// //         project: selectedProject || 'Unassigned',
// //         task: selectedTask || 'Unspecified',
// //         time: formatTime(seconds),
// //         timeInSeconds: seconds,
// //         employee: employeeToUse,
// //         status: 'Billable',
// //         notes: notes || undefined
// //       };
      
// //       setEntries(prevEntries => [newEntry, ...prevEntries]);
      
// //       try {
// //         const savedEntries = localStorage.getItem('timeEntries');
// //         let allEntries: TimeEntry[] = savedEntries ? JSON.parse(savedEntries) : [];
// //         allEntries = allEntries.filter((entry: TimeEntry) => entry.employee !== employeeToUse);
// //         allEntries = [newEntry, ...allEntries];
// //         localStorage.setItem('timeEntries', JSON.stringify(allEntries));
// //       } catch (error) {
// //         console.error('Failed to save entry directly:', error);
// //       }
      
// //       setSeconds(0);
// //       setNotes('');
// //       setSelectedTask('');
// //     }
// //   };

// //   // Handle Reset timer
// //   const handleReset = () => {
// //     setIsRunning(false);
// //     setSeconds(0);
// //     setCurrentEntryId(null);
// //   };

// //   // Handle Delete entry
// //   const handleDeleteEntry = (id: string) => {
// //     if (window.confirm('Delete this time entry?')) {
// //       const updatedEntries = entries.filter(entry => entry.id !== id);
// //       setEntries(updatedEntries);
      
// //       try {
// //         const savedEntries = localStorage.getItem('timeEntries');
// //         if (savedEntries) {
// //           const parsed = JSON.parse(savedEntries);
// //           const filtered = parsed.filter((entry: TimeEntry) => entry.id !== id);
// //           localStorage.setItem('timeEntries', JSON.stringify(filtered));
// //         }
// //       } catch (error) {
// //         console.error('Failed to delete entry:', error);
// //       }
// //     }
// //   };

// //   // Calculate today's total time
// //   const getTodayTotal = () => {
// //     const today = new Date().toISOString().split('T')[0];
// //     const employeeToShow = selectedProjectEmployee || '';
// //     let filteredEntries = entries;
// //     if (employeeToShow) {
// //       filteredEntries = entries.filter(entry => entry.employee === employeeToShow);
// //     }
// //     if (selectedTask) {
// //       filteredEntries = filteredEntries.filter(entry => entry.task === selectedTask);
// //     }
// //     const todayEntries = filteredEntries.filter(entry => entry.date === today);
// //     const totalSeconds = todayEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
// //     return formatTime(totalSeconds);
// //   };

// //   // Calculate week's total time
// //   const getWeekTotal = () => {
// //     const now = new Date();
// //     const startOfWeek = new Date(now);
// //     startOfWeek.setDate(now.getDate() - now.getDay());
// //     const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
// //     const employeeToShow = selectedProjectEmployee || '';
// //     let filteredEntries = entries;
// //     if (employeeToShow) {
// //       filteredEntries = entries.filter(entry => entry.employee === employeeToShow);
// //     }
// //     if (selectedTask) {
// //       filteredEntries = filteredEntries.filter(entry => entry.task === selectedTask);
// //     }
// //     const weekEntries = filteredEntries.filter(entry => entry.date >= startOfWeekStr);
// //     const totalSeconds = weekEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
// //     return formatTime(totalSeconds);
// //   };

// //   // Filter entries
// //   const getFilteredEntries = () => {
// //     const employeeToShow = selectedProjectEmployee || '';
// //     let filtered = entries;
    
// //     if (employeeToShow) {
// //       filtered = filtered.filter(entry => entry.employee === employeeToShow);
// //     }
    
// //     if (selectedTask) {
// //       filtered = filtered.filter(entry => entry.task === selectedTask);
// //     }
    
// //     if (searchTerm) {
// //       filtered = filtered.filter(entry =>
// //         entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         entry.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         entry.employee.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }
// //     if (filterStatus !== 'all') {
// //       filtered = filtered.filter(entry => entry.status === filterStatus);
// //     }
// //     return filtered;
// //   };

// //   // Tasks list
// //   const tasks = [
// //     { id: 'designing', name: 'Designing' },
// //     { id: 'development', name: 'Development' },
// //     { id: 'content', name: 'Content' },
// //     { id: 'testing', name: 'Testing' },
// //     { id: 'review', name: 'Review' },
// //     { id: 'ui-ux', name: 'UI/UX Design' },
// //     { id: 'backend', name: 'Backend Development' },
// //     { id: 'frontend', name: 'Frontend Development' },
// //     { id: 'deployment', name: 'Deployment' },
// //     { id: 'maintenance', name: 'Maintenance' },
// //     { id: 'design', name: 'Design' },
// //     { id: 'coding', name: 'Coding' },
// //     { id: 'planning', name: 'Planning' },
// //     { id: 'research', name: 'Research' },
// //     { id: 'meeting', name: 'Meeting' },
// //     { id: 'documentation', name: 'Documentation' },
// //     { id: 'bug-fixing', name: 'Bug Fixing' },
// //     { id: 'qa-testing', name: 'QA Testing' },
// //     { id: 'support', name: 'Support' }
// //   ];

// //   const filteredEntries = getFilteredEntries();

// //   return (
// //     <div className="bg-gray-50 w-full max-w-full overflow-x-hidden">
// //       {/* Timer Section */}
// //       <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-3 sm:p-4 md:p-5 mb-4 border border-blue-100 shadow-sm">
// //         <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
          
// //           {/* Timer Display */}
// //           <div className="lg:w-1/3 bg-white rounded-2xl p-3 sm:p-4 md:p-5 shadow-md border border-blue-100">
// //             <div className="text-center">
// //               <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 font-mono tracking-wider">
// //                 {formatTime(seconds)}
// //               </div>
              
// //               <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3">
// //                 <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
// //                 <span className="text-xs sm:text-sm text-gray-500">{isRunning ? 'Running' : 'Stopped'}</span>
// //               </div>
              
// //               <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3">
// //                 {!isRunning ? (
// //                   <button
// //                     onClick={handleStart}
// //                     className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
// //                   >
// //                     <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
// //                     Start
// //                   </button>
// //                 ) : (
// //                   <button
// //                     onClick={handleStop}
// //                     className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
// //                   >
// //                     <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
// //                     Stop
// //                   </button>
// //                 )}
// //                 <button
// //                   onClick={handleReset}
// //                   className="px-2.5 sm:px-3 py-2 sm:py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all text-xs sm:text-sm"
// //                   disabled={seconds === 0}
// //                 >
// //                   Reset
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Project & Task Selectors */}
// //           <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
// //             <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-sm border border-blue-100">
// //               <label className="block text-[10px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
// //                 <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-1" />
// //                 Project <span className="text-red-500">*</span>
// //               </label>
// //               <select 
// //                 className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-xs sm:text-sm"
// //                 value={selectedProject}
// //                 onChange={(e) => {
// //                   setSelectedProject(e.target.value);
// //                   setSelectedTask('');
// //                 }}
// //                 disabled={isRunning}
// //               >
// //                 <option value="">Select Project</option>
// //                 {availableProjects.map(project => (
// //                   <option key={project.id} value={project.name}>
// //                     {project.name}
// //                   </option>
// //                 ))}
// //               </select>
// //               {availableProjects.length === 0 && (
// //                 <p className="text-[10px] text-gray-500 mt-1">No projects available</p>
// //               )}
// //             </div>
            
// //             <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-sm border border-blue-100">
// //               <label className="block text-[10px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
// //                 <Tag className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-1" />
// //                 Task
// //               </label>
// //               <select 
// //                 className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-xs sm:text-sm"
// //                 value={selectedTask}
// //                 onChange={(e) => setSelectedTask(e.target.value)}
// //                 disabled={isRunning}
// //               >
// //                 <option value="">All Tasks</option>
// //                 {tasks.map(task => (
// //                   <option key={task.id} value={task.name}>
// //                     {task.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Notes and Summary */}
// //         <div className="mt-2 sm:mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
// //           <div className="md:col-span-1">
// //             <label className="block text-[10px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
// //               <FileText className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-1" />
// //               Notes
// //             </label>
// //             <textarea
// //               className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-xs sm:text-sm"
// //               rows={2}
// //               placeholder="Add notes..."
// //               value={notes}
// //               onChange={(e) => setNotes(e.target.value)}
// //               disabled={isRunning}
// //             />
// //           </div>
          
// //           <div className="md:col-span-2 grid grid-cols-2 gap-2 sm:gap-3">
// //             <div className="bg-white rounded-xl p-2 sm:p-3 shadow-sm border border-blue-100 flex items-center justify-between">
// //               <span className="text-[10px] sm:text-sm text-gray-600">Today</span>
// //               <span className="text-xs sm:text-base font-bold text-blue-600">{getTodayTotal()}</span>
// //             </div>
// //             <div className="bg-white rounded-xl p-2 sm:p-3 shadow-sm border border-blue-100 flex items-center justify-between">
// //               <span className="text-[10px] sm:text-sm text-gray-600">This Week</span>
// //               <span className="text-xs sm:text-base font-bold text-indigo-600">{getWeekTotal()}</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Recent Entries Table */}
// //       <div>
// //         <div className="flex flex-wrap items-center justify-between mb-2 sm:mb-3 gap-1.5 sm:gap-2">
// //           <h2 className="text-sm sm:text-base font-semibold text-gray-800 flex items-center">
// //             <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 text-blue-600" />
// //             Recent Entries
// //             <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs font-normal text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-0.5 rounded-full">
// //               {filteredEntries.length}
// //             </span>
// //           </h2>
// //           <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
// //             <div className="relative">
// //               <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5 absolute left-1.5 sm:left-2.5 top-1.5 sm:top-2 text-gray-400" />
// //               <input
// //                 type="text"
// //                 placeholder="Search..."
// //                 className="pl-6 sm:pl-8 pr-2 sm:pr-3 py-1 sm:py-1.5 border border-gray-300 rounded-lg text-[10px] sm:text-sm focus:ring-2 focus:ring-blue-500 w-20 sm:w-32 md:w-48"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //             <select
// //               className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 border border-gray-300 rounded-lg text-[10px] sm:text-sm focus:ring-2 focus:ring-blue-500 bg-white"
// //               value={filterStatus}
// //               onChange={(e) => setFilterStatus(e.target.value)}
// //             >
// //               <option value="all">All Status</option>
// //               <option value="Billable">Billable</option>
// //               <option value="Non-Bill">Non-Billable</option>
// //             </select>
// //           </div>
// //         </div>
        
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full overflow-hidden">
// //           <div className="w-full overflow-x-visible">
// //             <table className="w-full table-auto text-[10px] sm:text-xs md:text-sm">
// //               <thead>
// //                 <tr className="bg-gray-50 border-b border-gray-200">
// //                   <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">DATE</th>
// //                   <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">PROJECT</th>
// //                   <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">TASK</th>
// //                   <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">TIME</th>
// //                   <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">EMPLOYEE</th>
// //                   <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">ACTION</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filteredEntries.length === 0 ? (
// //                   <tr>
// //                     <td colSpan={6} className="text-center py-4 sm:py-6 md:py-8 text-gray-500">
// //                       <Clock className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto text-gray-300 mb-1" />
// //                       <p className="text-[10px] sm:text-xs md:text-sm">No entries found</p>
// //                       <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-400">Start tracking your time to see entries here</p>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   filteredEntries.map((entry, index) => (
// //                     <tr key={entry.id} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
// //                       <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 whitespace-nowrap">
// //                         <div className="flex items-center gap-0.5 sm:gap-1">
// //                           <Calendar className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-gray-400 flex-shrink-0 hidden xs:inline" />
// //                           <span className="text-[8px] sm:text-[10px] md:text-sm">{entry.date}</span>
// //                         </div>
// //                       </td>
// //                       <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 font-medium whitespace-nowrap text-[8px] sm:text-[10px] md:text-sm truncate max-w-[30px] sm:max-w-[50px] md:max-w-[80px] lg:max-w-[120px]" title={entry.project}>
// //                         {entry.project}
// //                       </td>
// //                       <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 whitespace-nowrap">
// //                         <span className="px-1 sm:px-1.5 md:px-2 py-0.5 bg-gray-100 rounded-full text-[7px] sm:text-[8px] md:text-[10px] whitespace-nowrap">
// //                           {entry.task}
// //                         </span>
// //                       </td>
// //                       <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 font-mono font-medium whitespace-nowrap text-[8px] sm:text-[10px] md:text-sm">{entry.time}</td>
// //                       <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 whitespace-nowrap">
// //                         <div className="flex items-center gap-0.5 sm:gap-1">
// //                           <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white flex items-center justify-center text-[6px] sm:text-[8px] md:text-[10px] font-medium flex-shrink-0">
// //                             {entry.employee.charAt(0).toUpperCase()}
// //                           </div>
// //                           <span className="text-[8px] sm:text-[10px] md:text-sm truncate max-w-[25px] sm:max-w-[40px] md:max-w-[60px] lg:max-w-[80px]" title={entry.employee}>
// //                             {entry.employee}
// //                           </span>
// //                         </div>
// //                       </td>
// //                       <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 whitespace-nowrap">
// //                         <button 
// //                           onClick={() => handleDeleteEntry(entry.id)}
// //                           className="text-gray-400 hover:text-red-500 transition-colors p-0.5 sm:p-1 hover:bg-red-50 rounded-lg"
// //                           title="Delete entry"
// //                         >
// //                           <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ✅ Footer Stats - REMOVED Billable card, only 3 cards */}
// //       <div className="mt-2 sm:mt-3 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
// //         <div className="bg-white rounded-xl p-1.5 sm:p-2.5 shadow-sm border border-gray-200">
// //           <div className="text-[8px] sm:text-xs text-gray-500">Total Entries</div>
// //           <div className="text-xs sm:text-base md:text-lg font-bold text-gray-800">{filteredEntries.length}</div>
// //         </div>
// //         <div className="bg-white rounded-xl p-1.5 sm:p-2.5 shadow-sm border border-gray-200">
// //           <div className="text-[8px] sm:text-xs text-gray-500">Today</div>
// //           <div className="text-xs sm:text-base md:text-lg font-bold text-blue-600">{getTodayTotal()}</div>
// //         </div>
// //         <div className="bg-white rounded-xl p-1.5 sm:p-2.5 shadow-sm border border-gray-200">
// //           <div className="text-[8px] sm:text-xs text-gray-500">This Week</div>
// //           <div className="text-xs sm:text-base md:text-lg font-bold text-indigo-600">{getWeekTotal()}</div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TimeTracker;
// // TimeTracker.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Play, 
//   Square, 
//   Clock, 
//   FileText, 
//   Calendar, 
//   Trash2,
//   Search,
//   Briefcase,
//   Tag,
//   Pause
// } from 'lucide-react';

// // ✅ Updated props interface with global timer controls
// interface TimeTrackerProps {
//   preselectedProject?: string;
//   currentUser?: string;
//   isGlobalRunning?: boolean;
//   globalSeconds?: number;
//   onGlobalStart?: () => void;
//   onGlobalStop?: () => void;
//   onGlobalReset?: () => void;
// }

// // Types
// interface TimeEntry {
//   id: string;
//   date: string;
//   project: string;
//   task: string;
//   time: string;
//   timeInSeconds: number;
//   employee: string;
//   status: 'Billable' | 'Non-Bill';
//   notes?: string;
// }

// const TimeTracker: React.FC<TimeTrackerProps> = ({ 
//   preselectedProject = '', 
//   currentUser = '',
//   isGlobalRunning = false,
//   globalSeconds = 0,
//   onGlobalStart,
//   onGlobalStop,
//   onGlobalReset
// }) => {
//   const [entries, setEntries] = useState<TimeEntry[]>([]);
//   const [selectedProject, setSelectedProject] = useState('');
//   const [selectedTask, setSelectedTask] = useState('');
//   const [notes, setNotes] = useState('');
//   const [isRunning, setIsRunning] = useState(false);
//   const [seconds, setSeconds] = useState(0);
//   const [availableProjects, setAvailableProjects] = useState<{id: string, name: string, employee: string}[]>([]);
//   const [selectedProjectEmployee, setSelectedProjectEmployee] = useState<string>('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState<string>('all');
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);

//   // ✅ Sync with global timer
//   useEffect(() => {
//     setSeconds(globalSeconds);
//     setIsRunning(isGlobalRunning);
//   }, [globalSeconds, isGlobalRunning]);

//   // Load saved selected project from localStorage
//   useEffect(() => {
//     const savedProject = localStorage.getItem('selectedTimeTrackerProject');
//     if (savedProject) {
//       setSelectedProject(savedProject);
//     }
//   }, []);

//   // Save selected project to localStorage when it changes
//   useEffect(() => {
//     if (selectedProject) {
//       localStorage.setItem('selectedTimeTrackerProject', selectedProject);
//     } else {
//       localStorage.removeItem('selectedTimeTrackerProject');
//     }
//   }, [selectedProject]);

//   // Load projects from localStorage
//   const loadProjects = () => {
//     try {
//       const savedProjects = localStorage.getItem('userProjects');
//       if (savedProjects) {
//         const parsed = JSON.parse(savedProjects);
//         if (Array.isArray(parsed)) {
//           const allProjects = parsed.map((p: any) => ({ 
//             id: p.id, 
//             name: p.projectName,
//             employee: p.customerName
//           }));
//           setAvailableProjects(allProjects);
          
//           if (preselectedProject) {
//             const exists = allProjects.some(p => p.name === preselectedProject);
//             if (exists) {
//               setSelectedProject(preselectedProject);
//               const project = allProjects.find(p => p.name === preselectedProject);
//               if (project) {
//                 setSelectedProjectEmployee(project.employee);
//               }
//             }
//           }
          
//           if (!preselectedProject) {
//             const savedProject = localStorage.getItem('selectedTimeTrackerProject');
//             if (savedProject) {
//               const exists = allProjects.some(p => p.name === savedProject);
//               if (exists) {
//                 setSelectedProject(savedProject);
//                 const project = allProjects.find(p => p.name === savedProject);
//                 if (project) {
//                   setSelectedProjectEmployee(project.employee);
//                 }
//               }
//             }
//           }
          
//           return allProjects;
//         }
//       }
//     } catch (error) {
//       console.error('Failed to load projects:', error);
//     }
//     return [];
//   };

//   // Load entries from localStorage
//   useEffect(() => {
//     if (currentUser) {
//       loadProjects();
      
//       try {
//         const savedEntries = localStorage.getItem('timeEntries');
//         if (savedEntries) {
//           const parsed = JSON.parse(savedEntries);
//           if (Array.isArray(parsed)) {
//             const employeeToShow = selectedProjectEmployee || '';
//             let filteredEntries = parsed;
//             if (employeeToShow) {
//               filteredEntries = parsed.filter((entry: TimeEntry) => entry.employee === employeeToShow);
//             }
//             setEntries(filteredEntries);
//           }
//         }
//         setIsInitialLoad(false);
//       } catch (error) {
//         console.error('Failed to load time entries:', error);
//         setIsInitialLoad(false);
//       }
//     }
//   }, [currentUser, selectedProjectEmployee]);

//   // When project selection changes, update the employee filter
//   useEffect(() => {
//     if (selectedProject) {
//       const project = availableProjects.find(p => p.name === selectedProject);
//       if (project) {
//         setSelectedProjectEmployee(project.employee);
//         localStorage.setItem('selectedTimeTrackerProject', selectedProject);
//         try {
//           const savedEntries = localStorage.getItem('timeEntries');
//           if (savedEntries) {
//             const parsed = JSON.parse(savedEntries);
//             if (Array.isArray(parsed)) {
//               const filteredEntries = parsed.filter((entry: TimeEntry) => entry.employee === project.employee);
//               setEntries(filteredEntries);
//             }
//           }
//         } catch (error) {
//           console.error('Failed to load time entries:', error);
//         }
//       }
//     } else {
//       setSelectedProjectEmployee('');
//       localStorage.removeItem('selectedTimeTrackerProject');
//       try {
//         const savedEntries = localStorage.getItem('timeEntries');
//         if (savedEntries) {
//           const parsed = JSON.parse(savedEntries);
//           if (Array.isArray(parsed)) {
//             setEntries([]);
//           }
//         }
//       } catch (error) {
//         console.error('Failed to load time entries:', error);
//       }
//     }
//   }, [selectedProject, availableProjects]);

//   // Set preselected project when prop changes
//   useEffect(() => {
//     if (preselectedProject && availableProjects.length > 0) {
//       const exists = availableProjects.some(p => p.name === preselectedProject);
//       if (exists) {
//         setSelectedProject(preselectedProject);
//         const project = availableProjects.find(p => p.name === preselectedProject);
//         if (project) {
//           setSelectedProjectEmployee(project.employee);
//           localStorage.setItem('selectedTimeTrackerProject', preselectedProject);
//         }
//       }
//     }
//   }, [preselectedProject, availableProjects]);

//   // Save entries to localStorage whenever they change
//   useEffect(() => {
//     if (isInitialLoad || !currentUser) return;
    
//     try {
//       const savedEntries = localStorage.getItem('timeEntries');
//       let allEntries: TimeEntry[] = savedEntries ? JSON.parse(savedEntries) : [];
      
//       const employeeToRemove = selectedProjectEmployee || '';
//       if (employeeToRemove) {
//         allEntries = allEntries.filter((entry: TimeEntry) => entry.employee !== employeeToRemove);
//       }
      
//       const updatedEntries = [...allEntries, ...entries];
//       localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
//     } catch (error) {
//       console.error('Failed to save time entries:', error);
//     }
//   }, [entries, currentUser, isInitialLoad, selectedProjectEmployee]);

//   // Format time display
//   const formatTime = (totalSeconds: number) => {
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
//   };

//   // Handle Start timer - uses global tracker
//   const handleStart = () => {
//     if (!selectedProject) {
//       alert('Please select a project first');
//       return;
//     }
//     if (onGlobalStart) {
//       onGlobalStart();
//     }
//   };

//   // Handle Stop timer - uses global tracker
//   const handleStop = () => {
//     if (isRunning && seconds > 0) {
//       // Create time entry before stopping
//       const employeeToUse = selectedProjectEmployee || currentUser;
      
//       const newEntry: TimeEntry = {
//         id: Date.now().toString(),
//         date: new Date().toISOString().split('T')[0],
//         project: selectedProject || 'Unassigned',
//         task: selectedTask || 'Unspecified',
//         time: formatTime(seconds),
//         timeInSeconds: seconds,
//         employee: employeeToUse,
//         status: 'Billable',
//         notes: notes || undefined
//       };
      
//       setEntries(prevEntries => [newEntry, ...prevEntries]);
      
//       try {
//         const savedEntries = localStorage.getItem('timeEntries');
//         let allEntries: TimeEntry[] = savedEntries ? JSON.parse(savedEntries) : [];
//         allEntries = allEntries.filter((entry: TimeEntry) => entry.employee !== employeeToUse);
//         allEntries = [newEntry, ...allEntries];
//         localStorage.setItem('timeEntries', JSON.stringify(allEntries));
//       } catch (error) {
//         console.error('Failed to save entry directly:', error);
//       }
      
//       setNotes('');
//       setSelectedTask('');
      
//       // Stop global timer
//       if (onGlobalStop) {
//         onGlobalStop();
//       }
//     } else if (isRunning && seconds === 0) {
//       // Just stop if no time recorded
//       if (onGlobalStop) {
//         onGlobalStop();
//       }
//     }
//   };

//   // Handle Reset timer
//   const handleReset = () => {
//     if (onGlobalReset) {
//       onGlobalReset();
//     }
//   };

//   // Handle Delete entry
//   const handleDeleteEntry = (id: string) => {
//     if (window.confirm('Delete this time entry?')) {
//       const updatedEntries = entries.filter(entry => entry.id !== id);
//       setEntries(updatedEntries);
      
//       try {
//         const savedEntries = localStorage.getItem('timeEntries');
//         if (savedEntries) {
//           const parsed = JSON.parse(savedEntries);
//           const filtered = parsed.filter((entry: TimeEntry) => entry.id !== id);
//           localStorage.setItem('timeEntries', JSON.stringify(filtered));
//         }
//       } catch (error) {
//         console.error('Failed to delete entry:', error);
//       }
//     }
//   };

//   // Calculate today's total time
//   const getTodayTotal = () => {
//     const today = new Date().toISOString().split('T')[0];
//     const employeeToShow = selectedProjectEmployee || '';
//     let filteredEntries = entries;
//     if (employeeToShow) {
//       filteredEntries = entries.filter(entry => entry.employee === employeeToShow);
//     }
//     if (selectedTask) {
//       filteredEntries = filteredEntries.filter(entry => entry.task === selectedTask);
//     }
//     const todayEntries = filteredEntries.filter(entry => entry.date === today);
//     const totalSeconds = todayEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
//     return formatTime(totalSeconds);
//   };

//   // Calculate week's total time
//   const getWeekTotal = () => {
//     const now = new Date();
//     const startOfWeek = new Date(now);
//     startOfWeek.setDate(now.getDate() - now.getDay());
//     const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
//     const employeeToShow = selectedProjectEmployee || '';
//     let filteredEntries = entries;
//     if (employeeToShow) {
//       filteredEntries = entries.filter(entry => entry.employee === employeeToShow);
//     }
//     if (selectedTask) {
//       filteredEntries = filteredEntries.filter(entry => entry.task === selectedTask);
//     }
//     const weekEntries = filteredEntries.filter(entry => entry.date >= startOfWeekStr);
//     const totalSeconds = weekEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
//     return formatTime(totalSeconds);
//   };

//   // Filter entries
//   const getFilteredEntries = () => {
//     const employeeToShow = selectedProjectEmployee || '';
//     let filtered = entries;
    
//     if (employeeToShow) {
//       filtered = filtered.filter(entry => entry.employee === employeeToShow);
//     }
    
//     if (selectedTask) {
//       filtered = filtered.filter(entry => entry.task === selectedTask);
//     }
    
//     if (searchTerm) {
//       filtered = filtered.filter(entry =>
//         entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         entry.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         entry.employee.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (filterStatus !== 'all') {
//       filtered = filtered.filter(entry => entry.status === filterStatus);
//     }
//     return filtered;
//   };

//   // Tasks list
//   const tasks = [
//     { id: 'designing', name: 'Designing' },
//     { id: 'development', name: 'Development' },
//     { id: 'content', name: 'Content' },
//     { id: 'testing', name: 'Testing' },
//     { id: 'review', name: 'Review' },
//     { id: 'ui-ux', name: 'UI/UX Design' },
//     { id: 'backend', name: 'Backend Development' },
//     { id: 'frontend', name: 'Frontend Development' },
//     { id: 'deployment', name: 'Deployment' },
//     { id: 'maintenance', name: 'Maintenance' },
//     { id: 'design', name: 'Design' },
//     { id: 'coding', name: 'Coding' },
//     { id: 'planning', name: 'Planning' },
//     { id: 'research', name: 'Research' },
//     { id: 'meeting', name: 'Meeting' },
//     { id: 'documentation', name: 'Documentation' },
//     { id: 'bug-fixing', name: 'Bug Fixing' },
//     { id: 'qa-testing', name: 'QA Testing' },
//     { id: 'support', name: 'Support' }
//   ];

//   const filteredEntries = getFilteredEntries();

//   return (
//     <div className="bg-gray-50 w-full max-w-full overflow-x-hidden">
//       {/* Timer Section */}
//       <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-3 sm:p-4 md:p-5 mb-4 border border-blue-100 shadow-sm">
//         <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
          
//           {/* Timer Display */}
//           <div className="lg:w-1/3 bg-white rounded-2xl p-3 sm:p-4 md:p-5 shadow-md border border-blue-100">
//             <div className="text-center">
//               <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 font-mono tracking-wider">
//                 {formatTime(seconds)}
//               </div>
              
//               <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3">
//                 <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
//                 <span className="text-xs sm:text-sm text-gray-500">{isRunning ? 'Running' : 'Stopped'}</span>
//               </div>
              
//               <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3">
//                 {!isRunning ? (
//                   <button
//                     onClick={handleStart}
//                     className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
//                     disabled={!selectedProject}
//                   >
//                     <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                     Start
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleStop}
//                     className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
//                   >
//                     <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                     Stop
//                   </button>
//                 )}
//                 <button
//                   onClick={handleReset}
//                   className="px-2.5 sm:px-3 py-2 sm:py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all text-xs sm:text-sm"
//                   disabled={seconds === 0}
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Project & Task Selectors */}
//           <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
//             <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-sm border border-blue-100">
//               <label className="block text-[10px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
//                 <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-1" />
//                 Project <span className="text-red-500">*</span>
//               </label>
//               <select 
//                 className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-xs sm:text-sm"
//                 value={selectedProject}
//                 onChange={(e) => {
//                   setSelectedProject(e.target.value);
//                   setSelectedTask('');
//                 }}
//                 disabled={isRunning}
//               >
//                 <option value="">Select Project</option>
//                 {availableProjects.map(project => (
//                   <option key={project.id} value={project.name}>
//                     {project.name}
//                   </option>
//                 ))}
//               </select>
//               {availableProjects.length === 0 && (
//                 <p className="text-[10px] text-gray-500 mt-1">No projects available</p>
//               )}
//             </div>
            
//             <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-sm border border-blue-100">
//               <label className="block text-[10px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
//                 <Tag className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-1" />
//                 Task
//               </label>
//               <select 
//                 className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-xs sm:text-sm"
//                 value={selectedTask}
//                 onChange={(e) => setSelectedTask(e.target.value)}
//                 disabled={isRunning}
//               >
//                 <option value="">All Tasks</option>
//                 {tasks.map(task => (
//                   <option key={task.id} value={task.name}>
//                     {task.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Notes and Summary */}
//         <div className="mt-2 sm:mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
//           <div className="md:col-span-1">
//             <label className="block text-[10px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
//               <FileText className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-1" />
//               Notes
//             </label>
//             <textarea
//               className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-xs sm:text-sm"
//               rows={2}
//               placeholder="Add notes..."
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               disabled={isRunning}
//             />
//           </div>
          
//           <div className="md:col-span-2 grid grid-cols-2 gap-2 sm:gap-3">
//             <div className="bg-white rounded-xl p-2 sm:p-3 shadow-sm border border-blue-100 flex items-center justify-between">
//               <span className="text-[10px] sm:text-sm text-gray-600">Today</span>
//               <span className="text-xs sm:text-base font-bold text-blue-600">{getTodayTotal()}</span>
//             </div>
//             <div className="bg-white rounded-xl p-2 sm:p-3 shadow-sm border border-blue-100 flex items-center justify-between">
//               <span className="text-[10px] sm:text-sm text-gray-600">This Week</span>
//               <span className="text-xs sm:text-base font-bold text-indigo-600">{getWeekTotal()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Entries Table */}
//       <div>
//         <div className="flex flex-wrap items-center justify-between mb-2 sm:mb-3 gap-1.5 sm:gap-2">
//           <h2 className="text-sm sm:text-base font-semibold text-gray-800 flex items-center">
//             <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 text-blue-600" />
//             Recent Entries
//             <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs font-normal text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-0.5 rounded-full">
//               {filteredEntries.length}
//             </span>
//           </h2>
//           <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
//             <div className="relative">
//               <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5 absolute left-1.5 sm:left-2.5 top-1.5 sm:top-2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-6 sm:pl-8 pr-2 sm:pr-3 py-1 sm:py-1.5 border border-gray-300 rounded-lg text-[10px] sm:text-sm focus:ring-2 focus:ring-blue-500 w-20 sm:w-32 md:w-48"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <select
//               className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 border border-gray-300 rounded-lg text-[10px] sm:text-sm focus:ring-2 focus:ring-blue-500 bg-white"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="Billable">Billable</option>
//               <option value="Non-Bill">Non-Billable</option>
//             </select>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full overflow-hidden">
//           <div className="w-full overflow-x-visible">
//             <table className="w-full table-auto text-[10px] sm:text-xs md:text-sm">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-200">
//                   <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">DATE</th>
//                   <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">PROJECT</th>
//                   <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">TASK</th>
//                   <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">TIME</th>
//                   <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">EMPLOYEE</th>
//                   <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">ACTION</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredEntries.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="text-center py-4 sm:py-6 md:py-8 text-gray-500">
//                       <Clock className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto text-gray-300 mb-1" />
//                       <p className="text-[10px] sm:text-xs md:text-sm">No entries found</p>
//                       <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-400">Start tracking your time to see entries here</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredEntries.map((entry, index) => (
//                     <tr key={entry.id} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
//                       <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 whitespace-nowrap">
//                         <div className="flex items-center gap-0.5 sm:gap-1">
//                           <Calendar className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-gray-400 flex-shrink-0 hidden xs:inline" />
//                           <span className="text-[8px] sm:text-[10px] md:text-sm">{entry.date}</span>
//                         </div>
//                       </td>
//                       <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 font-medium whitespace-nowrap text-[8px] sm:text-[10px] md:text-sm truncate max-w-[30px] sm:max-w-[50px] md:max-w-[80px] lg:max-w-[120px]" title={entry.project}>
//                         {entry.project}
//                       </td>
//                       <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 whitespace-nowrap">
//                         <span className="px-1 sm:px-1.5 md:px-2 py-0.5 bg-gray-100 rounded-full text-[7px] sm:text-[8px] md:text-[10px] whitespace-nowrap">
//                           {entry.task}
//                         </span>
//                       </td>
//                       <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 font-mono font-medium whitespace-nowrap text-[8px] sm:text-[10px] md:text-sm">{entry.time}</td>
//                       <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 whitespace-nowrap">
//                         <div className="flex items-center gap-0.5 sm:gap-1">
//                           <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white flex items-center justify-center text-[6px] sm:text-[8px] md:text-[10px] font-medium flex-shrink-0">
//                             {entry.employee.charAt(0).toUpperCase()}
//                           </div>
//                           <span className="text-[8px] sm:text-[10px] md:text-sm truncate max-w-[25px] sm:max-w-[40px] md:max-w-[60px] lg:max-w-[80px]" title={entry.employee}>
//                             {entry.employee}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 whitespace-nowrap">
//                         <button 
//                           onClick={() => handleDeleteEntry(entry.id)}
//                           className="text-gray-400 hover:text-red-500 transition-colors p-0.5 sm:p-1 hover:bg-red-50 rounded-lg"
//                           title="Delete entry"
//                         >
//                           <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
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

//       {/* Footer Stats */}
//       <div className="mt-2 sm:mt-3 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
//         <div className="bg-white rounded-xl p-1.5 sm:p-2.5 shadow-sm border border-gray-200">
//           <div className="text-[8px] sm:text-xs text-gray-500">Total Entries</div>
//           <div className="text-xs sm:text-base md:text-lg font-bold text-gray-800">{filteredEntries.length}</div>
//         </div>
//         <div className="bg-white rounded-xl p-1.5 sm:p-2.5 shadow-sm border border-gray-200">
//           <div className="text-[8px] sm:text-xs text-gray-500">Today</div>
//           <div className="text-xs sm:text-base md:text-lg font-bold text-blue-600">{getTodayTotal()}</div>
//         </div>
//         <div className="bg-white rounded-xl p-1.5 sm:p-2.5 shadow-sm border border-gray-200">
//           <div className="text-[8px] sm:text-xs text-gray-500">This Week</div>
//           <div className="text-xs sm:text-base md:text-lg font-bold text-indigo-600">{getWeekTotal()}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeTracker;
// TimeTracker.tsx (Complete Fixed)
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Square, 
  Clock, 
  FileText, 
  Calendar, 
  Trash2,
  Search,
  Briefcase,
  Tag
} from 'lucide-react';

interface Project {
  id: string;
  customerName: string;
  projectName: string;
  timerRunning?: boolean;
  timerSeconds?: number;
  rate?: number | null;
  tasks?: string[];
  currentTask?: string;
}

interface TimeEntry {
  id: string;
  date: string;
  project: string;
  projectId: string;
  task: string;
  time: string;
  timeInSeconds: number;
  employee: string;
  status: 'Billable' | 'Non-Bill';
  notes?: string;
}

interface TimeTrackerProps {
  preselectedProject?: string;
  currentUser?: string;
  activeProjectId?: string | null;
  projects?: Project[];
  entries?: TimeEntry[];
  onStartTimer?: (projectId: string, task?: string) => void;
  onStopTimer?: (projectId: string, task?: string, notes?: string) => void;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ 
  preselectedProject = '', 
  currentUser = '',
  activeProjectId = null,
  projects = [],
  entries = [],
  onStartTimer,
  onStopTimer
}) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState('');
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [lastStoppedSeconds, setLastStoppedSeconds] = useState<number>(0);
  const [lastStoppedProject, setLastStoppedProject] = useState<string>('');
  const [localEntries, setLocalEntries] = useState<TimeEntry[]>(entries);
  const [hasPreselected, setHasPreselected] = useState(false);

  // Update local entries when props change
  useEffect(() => {
    setLocalEntries(entries);
  }, [entries]);

  // Find the active project
  const activeProject = projects.find(p => p.id === activeProjectId);
  const isRunning = activeProject?.timerRunning || false;
  const seconds = activeProject?.timerSeconds || 0;
  const projectTasks = activeProject?.tasks || [];

  // When a project becomes active, auto-select it
  useEffect(() => {
    if (activeProject) {
      setSelectedProject(activeProject.projectName);
      setSelectedProjectId(activeProject.id);
      setLastStoppedSeconds(0);
      setLastStoppedProject('');
      // ✅ Auto-select first task if available
      if (activeProject.tasks && activeProject.tasks.length > 0) {
        setSelectedTask(activeProject.tasks[0]);
      } else {
        setSelectedTask('');
      }
      setHasPreselected(true);
    }
  }, [activeProject]);

  // Update when activeProjectId changes
  useEffect(() => {
    if (activeProjectId) {
      const project = projects.find(p => p.id === activeProjectId);
      if (project) {
        setSelectedProject(project.projectName);
        setSelectedProjectId(project.id);
        setLastStoppedSeconds(0);
        setLastStoppedProject('');
        if (project.tasks && project.tasks.length > 0) {
          setSelectedTask(project.tasks[0]);
        } else {
          setSelectedTask('');
        }
        setHasPreselected(true);
      }
    }
  }, [activeProjectId, projects]);

  // Set preselected project
  useEffect(() => {
    if (preselectedProject) {
      const project = projects.find(p => p.projectName === preselectedProject);
      if (project) {
        setSelectedProject(project.projectName);
        setSelectedProjectId(project.id);
        if (!project.timerRunning && project.timerSeconds) {
          setLastStoppedSeconds(project.timerSeconds);
          setLastStoppedProject(project.projectName);
        }
        if (project.tasks && project.tasks.length > 0) {
          setSelectedTask(project.tasks[0]);
        }
        setHasPreselected(true);
      }
    }
  }, [preselectedProject, projects]);

  // If no project is selected but there are entries, auto-select the first project with entries
  useEffect(() => {
    if (!selectedProjectId && localEntries.length > 0 && !hasPreselected) {
      const latestEntry = localEntries[0];
      if (latestEntry) {
        setSelectedProjectId(latestEntry.projectId);
        setSelectedProject(latestEntry.project);
        setHasPreselected(true);
      }
    }
  }, [localEntries, selectedProjectId, hasPreselected]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
  };

  // Start timer
  const handleStart = () => {
    if (!selectedProjectId) {
      alert('Please select a project first');
      return;
    }
    const project = projects.find(p => p.id === selectedProjectId);
    if (project && onStartTimer) {
      // ✅ Pass the selected task when starting
      onStartTimer(project.id, selectedTask);
    }
  };

  // Stop timer - ✅ Pass the selected task
  const handleStop = () => {
    if (isRunning && seconds > 0) {
      setLastStoppedSeconds(seconds);
      setLastStoppedProject(selectedProject);
      
      if (activeProject && onStopTimer) {
        // ✅ Pass the selected task (not "Unspecified")
        const taskToUse = selectedTask || 'Unspecified';
        onStopTimer(activeProject.id, taskToUse, notes);
      }
      setNotes('');
    } else if (isRunning && seconds === 0) {
      if (activeProject && onStopTimer) {
        const taskToUse = selectedTask || 'Unspecified';
        onStopTimer(activeProject.id, taskToUse, notes);
      }
    } else if (!isRunning) {
      alert('No timer is currently running');
    }
  };

  const handleReset = () => {
    if (activeProject && onStopTimer) {
      onStopTimer(activeProject.id);
      setLastStoppedSeconds(0);
      setLastStoppedProject('');
    }
  };

  // Get entries filtered by selected project
  const getProjectEntries = () => {
    if (!selectedProjectId) return [];
    return localEntries.filter(entry => entry.projectId === selectedProjectId);
  };

  // Calculate today's total
  const getTodayTotal = () => {
    const today = new Date().toISOString().split('T')[0];
    const projectEntries = getProjectEntries();
    const todayEntries = projectEntries.filter(entry => entry.date === today);
    const totalSeconds = todayEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
    return formatTime(totalSeconds);
  };

  // Calculate week's total
  const getWeekTotal = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
    const projectEntries = getProjectEntries();
    const weekEntries = projectEntries.filter(entry => entry.date >= startOfWeekStr);
    const totalSeconds = weekEntries.reduce((sum, entry) => sum + entry.timeInSeconds, 0);
    return formatTime(totalSeconds);
  };

  // Get filtered entries
  const getFilteredEntries = () => {
    let filtered = getProjectEntries();
    
    if (searchTerm) {
      filtered = filtered.filter(entry =>
        entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.employee.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(entry => entry.status === filterStatus);
    }
    return filtered;
  };

  // Handle project selection
  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = e.target.value;
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProjectId(projectId);
      setSelectedProject(project.projectName);
      if (!project.timerRunning && project.timerSeconds) {
        setLastStoppedSeconds(project.timerSeconds);
        setLastStoppedProject(project.projectName);
      } else {
        setLastStoppedSeconds(0);
        setLastStoppedProject('');
      }
      // ✅ Auto-select first task when project changes
      if (project.tasks && project.tasks.length > 0) {
        setSelectedTask(project.tasks[0]);
      } else {
        setSelectedTask('');
      }
      setHasPreselected(true);
    } else {
      setSelectedProjectId('');
      setSelectedProject('');
      setLastStoppedSeconds(0);
      setLastStoppedProject('');
      setSelectedTask('');
    }
  };

  // Delete entry
  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Delete this time entry?')) {
      const updated = localEntries.filter(e => e.id !== id);
      setLocalEntries(updated);
      try {
        localStorage.setItem('timeEntries', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to delete entry:', error);
      }
    }
  };

  const filteredEntries = getFilteredEntries();
  const projectEntries = getProjectEntries();

  const displaySeconds = isRunning ? seconds : (lastStoppedSeconds > 0 ? lastStoppedSeconds : seconds);
  const runningProjectName = activeProject?.projectName || '';

  // Get tasks for the selected project
  const selectedProjectObj = projects.find(p => p.id === selectedProjectId);
  const availableTasks = selectedProjectObj?.tasks || [];

  return (
    <div className="bg-gray-50 w-full max-w-full overflow-x-hidden">
      {/* Timer Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-3 sm:p-4 md:p-5 mb-4 border border-blue-100 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
          
          {/* Timer Display */}
          <div className="lg:w-1/3 bg-white rounded-2xl p-3 sm:p-4 md:p-5 shadow-md border border-blue-100">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 font-mono tracking-wider">
                {formatTime(displaySeconds)}
              </div>
              
              <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3">
                <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                <span className="text-xs sm:text-sm text-gray-500">{isRunning ? 'Running' : 'Stopped'}</span>
              </div>
              
              <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                {!isRunning ? (
                  <button
                    onClick={handleStart}
                    className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                    disabled={!selectedProjectId}
                  >
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Start
                  </button>
                ) : (
                  <button
                    onClick={handleStop}
                    className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Stop
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="px-2.5 sm:px-3 py-2 sm:py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all text-xs sm:text-sm"
                  disabled={displaySeconds === 0}
                >
                  Reset
                </button>
              </div>
              
              {isRunning && runningProjectName && (
                <div className="mt-2 text-xs text-green-600 font-medium">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Active: {runningProjectName}
                </div>
              )}
              {!isRunning && lastStoppedSeconds > 0 && lastStoppedProject && (
                <div className="mt-2 text-xs text-orange-500 font-medium">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {lastStoppedProject} - Stopped at {formatTime(lastStoppedSeconds)}
                </div>
              )}
            </div>
          </div>

          {/* Project & Task Selectors */}
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
            <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-sm border border-blue-100">
              <label className="block text-[10px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-1" />
                Project <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-xs sm:text-sm"
                value={selectedProjectId}
                onChange={handleProjectChange}
                disabled={isRunning}
              >
                <option value="">Select Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.projectName} {project.timerRunning ? '🔴' : ''}
                  </option>
                ))}
              </select>
              {selectedProjectId && (
                <p className="text-[10px] text-gray-400 mt-1">
                  {projectEntries.length} entries for this project
                </p>
              )}
            </div>
            
            <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-sm border border-blue-100">
              <label className="block text-[10px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                <Tag className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-1" />
                Task
              </label>
              <select 
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-xs sm:text-sm"
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                disabled={isRunning}
              >
                <option value="">Select Task</option>
                {availableTasks.map(task => (
                  <option key={task} value={task}>
                    {task}
                  </option>
                ))}
              </select>
              {availableTasks.length === 0 && selectedProjectId && (
                <p className="text-[10px] text-gray-400 mt-1">No tasks available for this project</p>
              )}
            </div>
          </div>
        </div>

        {/* Notes and Summary */}
        <div className="mt-2 sm:mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
          <div className="md:col-span-1">
            <label className="block text-[10px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-1" />
              Notes
            </label>
            <textarea
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-xs sm:text-sm"
              rows={2}
              placeholder="Add notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isRunning}
            />
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 gap-2 sm:gap-3">
            <div className="bg-white rounded-xl p-2 sm:p-3 shadow-sm border border-blue-100 flex items-center justify-between">
              <span className="text-[10px] sm:text-sm text-gray-600">Today</span>
              <span className="text-xs sm:text-base font-bold text-blue-600">{getTodayTotal()}</span>
            </div>
            <div className="bg-white rounded-xl p-2 sm:p-3 shadow-sm border border-blue-100 flex items-center justify-between">
              <span className="text-[10px] sm:text-sm text-gray-600">This Week</span>
              <span className="text-xs sm:text-base font-bold text-indigo-600">{getWeekTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Entries Table */}
      <div>
        <div className="flex flex-wrap items-center justify-between mb-2 sm:mb-3 gap-1.5 sm:gap-2">
          <h2 className="text-sm sm:text-base font-semibold text-gray-800 flex items-center">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 text-blue-600" />
            Recent Entries
            <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs font-normal text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-0.5 rounded-full">
              {filteredEntries.length}
            </span>
            {selectedProjectId && (
              <span className="ml-1.5 text-[10px] text-blue-500 font-normal">
                for {selectedProject}
              </span>
            )}
          </h2>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <div className="relative">
              <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5 absolute left-1.5 sm:left-2.5 top-1.5 sm:top-2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-6 sm:pl-8 pr-2 sm:pr-3 py-1 sm:py-1.5 border border-gray-300 rounded-lg text-[10px] sm:text-sm focus:ring-2 focus:ring-blue-500 w-20 sm:w-32 md:w-48"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={!selectedProjectId}
              />
            </div>
            <select
              className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 border border-gray-300 rounded-lg text-[10px] sm:text-sm focus:ring-2 focus:ring-blue-500 bg-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              disabled={!selectedProjectId}
            >
              <option value="all">All Status</option>
              <option value="Billable">Billable</option>
              <option value="Non-Bill">Non-Billable</option>
            </select>
          </div>
        </div>
        
        {!selectedProjectId ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <Clock className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">Select a project to view its time entries</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <Clock className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No entries found for {selectedProject}</p>
            <p className="text-xs text-gray-400 mt-1">Start tracking time to see entries here</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full overflow-hidden">
            <div className="w-full overflow-x-visible">
              <table className="w-full table-auto text-[10px] sm:text-xs md:text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">DATE</th>
                    <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">PROJECT</th>
                    <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">TASK</th>
                    <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">TIME</th>
                    <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">EMPLOYEE</th>
                    <th className="text-left py-1.5 sm:py-2 px-1 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry, index) => (
                    <tr key={entry.id} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 whitespace-nowrap">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <Calendar className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-gray-400 flex-shrink-0 hidden xs:inline" />
                          <span className="text-[8px] sm:text-[10px] md:text-sm">{entry.date}</span>
                        </div>
                      </td>
                      <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 font-medium whitespace-nowrap text-[8px] sm:text-[10px] md:text-sm truncate max-w-[30px] sm:max-w-[50px] md:max-w-[80px] lg:max-w-[120px]" title={entry.project}>
                        {entry.project}
                      </td>
                      <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 whitespace-nowrap">
                        <span className="px-1 sm:px-1.5 md:px-2 py-0.5 bg-gray-100 rounded-full text-[7px] sm:text-[8px] md:text-[10px] whitespace-nowrap">
                          {entry.task}
                        </span>
                      </td>
                      <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 font-mono font-medium whitespace-nowrap text-[8px] sm:text-[10px] md:text-sm">{entry.time}</td>
                      <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 text-gray-700 whitespace-nowrap">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white flex items-center justify-center text-[6px] sm:text-[8px] md:text-[10px] font-medium flex-shrink-0">
                            {entry.employee.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-[8px] sm:text-[10px] md:text-sm truncate max-w-[25px] sm:max-w-[40px] md:max-w-[60px] lg:max-w-[80px]" title={entry.employee}>
                            {entry.employee}
                          </span>
                        </div>
                      </td>
                      <td className="py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-3 whitespace-nowrap">
                        <button 
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-0.5 sm:p-1 hover:bg-red-50 rounded-lg"
                          title="Delete entry"
                        >
                          <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="mt-2 sm:mt-3 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
        <div className="bg-white rounded-xl p-1.5 sm:p-2.5 shadow-sm border border-gray-200">
          <div className="text-[8px] sm:text-xs text-gray-500">Total Entries</div>
          <div className="text-xs sm:text-base md:text-lg font-bold text-gray-800">
            {selectedProjectId ? filteredEntries.length : '-'}
          </div>
        </div>
        <div className="bg-white rounded-xl p-1.5 sm:p-2.5 shadow-sm border border-gray-200">
          <div className="text-[8px] sm:text-xs text-gray-500">Today</div>
          <div className="text-xs sm:text-base md:text-lg font-bold text-blue-600">
            {selectedProjectId ? getTodayTotal() : '-'}
          </div>
        </div>
        <div className="bg-white rounded-xl p-1.5 sm:p-2.5 shadow-sm border border-gray-200">
          <div className="text-[8px] sm:text-xs text-gray-500">This Week</div>
          <div className="text-xs sm:text-base md:text-lg font-bold text-indigo-600">
            {selectedProjectId ? getWeekTotal() : '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;