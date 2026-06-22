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

// const TimeTracker: React.FC = () => {
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
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* ============================================================ */}
//       {/* HEADER: Title + Description + Stats */}
//       {/* ============================================================ */}
//       <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 flex items-center">
//             <Timer className="w-6 h-6 mr-2 text-blue-600" />
//             Time Tracker
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">Track and log time for your projects</p>
//         </div>
//         <div className="flex flex-wrap items-center gap-3">
//           <div className="flex items-center gap-1 text-sm text-gray-500 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
//             <Clock className="w-4 h-4 mr-1" />
//             <span>{entries.length} Entries</span>
//           </div>
//         </div>
//       </div>

//       {/* ============================================================ */}
//       {/* TIMER SECTION: Timer Display + Project/Task Selectors */}
//       {/* ============================================================ */}
//       <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100 shadow-sm">
//         <div className="flex flex-col lg:flex-row gap-6">
          
//           {/* LEFT: Timer Display */}
//           <div className="lg:w-1/3 bg-white rounded-2xl p-6 shadow-md border border-blue-100">
//             <div className="text-center">
//               {/* Timer Numbers */}
//               <div className="text-5xl font-bold text-gray-800 font-mono tracking-wider">
//                 {formatTime(seconds)}
//               </div>
              
//               {/* Status Indicator */}
//               <div className="flex items-center justify-center gap-2 mt-4">
//                 <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
//                 <span className="text-sm text-gray-500">{isRunning ? 'Running' : 'Stopped'}</span>
//               </div>
              
//               {/* Timer Controls */}
//               <div className="flex gap-3 mt-4">
//                 {!isRunning ? (
//                   <button
//                     onClick={handleStart}
//                     className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
//                   >
//                     <Play className="w-5 h-5" />
//                     Start Timer
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleStop}
//                     className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
//                   >
//                     <Square className="w-5 h-5" />
//                     Stop Timer
//                   </button>
//                 )}
//                 <button
//                   onClick={handleReset}
//                   className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all"
//                   disabled={seconds === 0}
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Project & Task Selectors */}
//           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Project Selector */}
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Briefcase className="w-4 h-4 inline mr-1" />
//                 Project <span className="text-red-500">*</span>
//               </label>
//               <select 
//                 className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
            
//             {/* Task Selector */}
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Tag className="w-4 h-4 inline mr-1" />
//                 Task
//               </label>
//               <select 
//                 className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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

//         {/* BOTTOM: Notes + Today/Week Summary */}
//         <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Notes */}
//           <div className="md:col-span-1">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <FileText className="w-4 h-4 inline mr-1" />
//               Notes
//             </label>
//             <textarea
//               className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
//               rows={2}
//               placeholder="Add notes..."
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               disabled={isRunning}
//             />
//           </div>
          
//           {/* Today & Week Summary */}
//           <div className="md:col-span-2 grid grid-cols-2 gap-3">
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 flex items-center justify-between">
//               <span className="text-sm text-gray-600">Today</span>
//               <span className="text-lg font-bold text-blue-600">{getTodayTotal()}</span>
//             </div>
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 flex items-center justify-between">
//               <span className="text-sm text-gray-600">This Week</span>
//               <span className="text-lg font-bold text-indigo-600">{getWeekTotal()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ============================================================ */}
//       {/* RECENT ENTRIES TABLE */}
//       {/* ============================================================ */}
//       <div>
//         {/* Table Header with Search & Filter */}
//         <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
//           <h2 className="text-lg font-semibold text-gray-800 flex items-center">
//             <Clock className="w-5 h-5 mr-2 text-blue-600" />
//             Recent Entries
//             <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
//               {filteredEntries.length}
//             </span>
//           </h2>
//           <div className="flex flex-wrap items-center gap-2">
//             {/* Search */}
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search entries..."
//                 className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-40 md:w-56"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             {/* Filter */}
//             <select
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="Billable">Billable</option>
//               <option value="Non-Bill">Non-Billable</option>
//             </select>
//           </div>
//         </div>
        
//         {/* Table */}
//         <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-200">
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Task</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEntries.length === 0 ? (
//                 /* Empty State */
//                 <tr>
//                   <td colSpan={7} className="text-center py-12 text-gray-500">
//                     <Clock className="w-12 h-12 mx-auto text-gray-300 mb-2" />
//                     <p className="text-sm">No entries found</p>
//                     <p className="text-xs text-gray-400">Start tracking your time to see entries here</p>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredEntries.map((entry, index) => (
//                   <tr key={entry.id} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
//                     {/* Date */}
//                     <td className="py-3 px-4 text-sm text-gray-700">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-3.5 h-3.5 text-gray-400" />
//                         {entry.date}
//                       </div>
//                     </td>
//                     {/* Project */}
//                     <td className="py-3 px-4 text-sm text-gray-700 font-medium">{entry.project}</td>
//                     {/* Task */}
//                     <td className="py-3 px-4 text-sm text-gray-700">
//                       <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
//                         {entry.task}
//                       </span>
//                     </td>
//                     {/* Time */}
//                     <td className="py-3 px-4 text-sm text-gray-700 font-mono font-medium">{entry.time}</td>
//                     {/* User */}
//                     <td className="py-3 px-4 text-sm text-gray-700">
//                       <div className="flex items-center gap-1.5">
//                         <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white flex items-center justify-center text-[10px] font-medium">
//                           {entry.user.charAt(0)}
//                         </div>
//                         {entry.user}
//                       </div>
//                     </td>
//                     {/* Status */}
//                     <td className="py-3 px-4">
//                       <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
//                         entry.status === 'Billable' 
//                           ? 'bg-green-100 text-green-700 border border-green-200' 
//                           : 'bg-gray-100 text-gray-700 border border-gray-200'
//                       }`}>
//                         {entry.status}
//                       </span>
//                     </td>
//                     {/* Action */}
//                     <td className="py-3 px-4">
//                       <button 
//                         onClick={() => handleDeleteEntry(entry.id)}
//                         className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
//                         title="Delete entry"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ============================================================ */}
//       {/* FOOTER STATS */}
//       {/* ============================================================ */}
//       <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
//         <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
//           <div className="text-xs text-gray-500">Total Entries</div>
//           <div className="text-xl font-bold text-gray-800">{entries.length}</div>
//         </div>
//         <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
//           <div className="text-xs text-gray-500">Today</div>
//           <div className="text-xl font-bold text-blue-600">{getTodayTotal()}</div>
//         </div>
//         <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
//           <div className="text-xs text-gray-500">This Week</div>
//           <div className="text-xl font-bold text-indigo-600">{getWeekTotal()}</div>
//         </div>
//         <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
//           <div className="text-xs text-gray-500">Billable</div>
//           <div className="text-xl font-bold text-green-600">
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
  Pause, 
  Square, 
  Clock, 
  FileText, 
  User, 
  Calendar, 
  Trash2,
  Plus,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  Circle,
  AlertCircle,
  MoreVertical,
  Edit,
  Save,
  X,
  ArrowLeft,
  LayoutDashboard,
  Timer,
  Briefcase,
  Tag,
  Users
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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Timer className="w-6 h-6 mr-2 text-blue-600" />
            Time Tracker
          </h1>
          <p className="text-sm text-gray-500 mt-1">Track and log time for your projects</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-gray-500 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
            <Clock className="w-4 h-4 mr-1" />
            <span>{entries.length} Entries</span>
          </div>
        </div>
      </div>

      {/* Timer Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Timer Display */}
          <div className="lg:w-1/3 bg-white rounded-2xl p-6 shadow-md border border-blue-100">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 font-mono tracking-wider">
                {formatTime(seconds)}
              </div>
              
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                <span className="text-sm text-gray-500">{isRunning ? 'Running' : 'Stopped'}</span>
              </div>
              
              <div className="flex gap-3 mt-4">
                {!isRunning ? (
                  <button
                    onClick={handleStart}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Start Timer
                  </button>
                ) : (
                  <button
                    onClick={handleStop}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Square className="w-5 h-5" />
                    Stop Timer
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all"
                  disabled={seconds === 0}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Project & Task Selectors */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-1" />
                Project <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Task
              </label>
              <select 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Notes
            </label>
            <textarea
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              rows={2}
              placeholder="Add notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isRunning}
            />
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 flex items-center justify-between">
              <span className="text-sm text-gray-600">Today</span>
              <span className="text-lg font-bold text-blue-600">{getTodayTotal()}</span>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 flex items-center justify-between">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="text-lg font-bold text-indigo-600">{getWeekTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Entries Table */}
      <div>
        <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Recent Entries
            <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {filteredEntries.length}
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search entries..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-40 md:w-56"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Billable">Billable</option>
              <option value="Non-Bill">Non-Billable</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Task</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-sm">No entries found</p>
                    <p className="text-xs text-gray-400">Start tracking your time to see entries here</p>
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry, index) => (
                  <tr key={entry.id} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {entry.date}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700 font-medium">{entry.project}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {entry.task}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700 font-mono font-medium">{entry.time}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white flex items-center justify-center text-[10px] font-medium">
                          {entry.user.charAt(0)}
                        </div>
                        {entry.user}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        entry.status === 'Billable' 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-500">Total Entries</div>
          <div className="text-xl font-bold text-gray-800">{entries.length}</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-500">Today</div>
          <div className="text-xl font-bold text-blue-600">{getTodayTotal()}</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-500">This Week</div>
          <div className="text-xl font-bold text-indigo-600">{getWeekTotal()}</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-500">Billable</div>
          <div className="text-xl font-bold text-green-600">
            {entries.filter(e => e.status === 'Billable').length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;