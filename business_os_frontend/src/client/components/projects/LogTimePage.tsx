// src/client/components/projects/LogTimePage.tsx
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Briefcase, 
  Tag, 
  FileText,
  CheckCircle,
  X,
  Save,
  Play,
  Square,
  DollarSign,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

interface LogTimePageProps {
  onBack: () => void;
  onSave: (logData: any) => void;
  preselectedProject?: string;
}

const LogTimePage: React.FC<LogTimePageProps> = ({ onBack, onSave, preselectedProject = '' }) => {
  const [formData, setFormData] = useState({
    project: preselectedProject || '',
    task: '',
    date: new Date().toISOString().split('T')[0],
    hours: 0,
    minutes: 0,
    billable: true,
    notes: '',
    rate: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const projects = [
    { id: 'web-dev', name: 'Web Development' },
    { id: 'design', name: 'Design Project' },
    { id: 'testing', name: 'Testing' },
    { id: 'content', name: 'Content Creation' }
  ];

  const tasks = [
    { id: 'designing', name: 'Designing' },
    { id: 'development', name: 'Development' },
    { id: 'content', name: 'Content' },
    { id: 'testing', name: 'Testing' },
    { id: 'review', name: 'Review' },
    { id: 'meeting', name: 'Meeting' },
    { id: 'planning', name: 'Planning' }
  ];

  React.useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
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
  }, [isTimerRunning]);

  const formatTimerTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const startTimer = () => {
    if (!formData.project) {
      setErrors({ project: 'Please select a project first' });
      return;
    }
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    setFormData(prev => ({
      ...prev,
      hours: prev.hours + hours,
      minutes: prev.minutes + minutes,
    }));
    setTimerSeconds(0);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.project) newErrors.project = 'Please select a project';
    if (!formData.task) newErrors.task = 'Please select a task';
    if (formData.hours === 0 && formData.minutes === 0 && timerSeconds === 0) {
      newErrors.time = 'Please enter time spent or use the timer';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    const totalSeconds = (formData.hours * 3600) + (formData.minutes * 60) + timerSeconds;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const timeString = `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m`;

    setTimeout(() => {
      onSave({
        ...formData,
        timeSpent: timeString,
        timeInSeconds: totalSeconds,
        date: formData.date || new Date().toISOString().split('T')[0],
      });
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2.5 text-gray-600 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-gray-200 hover:border-blue-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Log Time</span>
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Track and log time for your projects</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="px-5 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 text-sm flex items-center border border-gray-200 hover:border-gray-300 shadow-sm">
            <X className="w-4 h-4 mr-2" /> Cancel
          </button>
          <button onClick={handleSubmit} disabled={isSaving} className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Time Entry'}
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-4xl mx-auto">
        {/* Timer Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center">
              <div className="text-4xl font-bold text-gray-800 font-mono tracking-wider">
                {formatTimerTime(timerSeconds)}
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className={`w-2.5 h-2.5 rounded-full ${isTimerRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                <span className="text-sm text-gray-500">{isTimerRunning ? 'Running' : 'Stopped'}</span>
              </div>
            </div>
            <div className="flex gap-3">
              {!isTimerRunning ? (
                <button onClick={startTimer} className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                  <Play className="w-4 h-4" /> Start Timer
                </button>
              ) : (
                <button onClick={stopTimer} className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                  <Square className="w-4 h-4" /> Stop Timer
                </button>
              )}
              <button onClick={resetTimer} className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all" disabled={timerSeconds === 0}>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Project <span className="text-red-500">*</span></label>
              <div className="relative group">
                <Briefcase className="w-4.5 h-4.5 absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <select name="project" value={formData.project} onChange={handleChange} className={`w-full pl-11 pr-11 py-3 border-2 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-gray-50/50 group-focus-within:bg-white ${errors.project ? 'border-red-300 bg-red-50/30' : 'border-gray-200'}`}>
                  <option value="">Select Project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.name}>{project.name}</option>
                  ))}
                </select>
                <ChevronDown className="w-4.5 h-4.5 absolute right-3.5 top-3.5 text-gray-400 pointer-events-none" />
              </div>
              {errors.project && (
                <div className="flex items-center gap-1 mt-1.5 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /><span>{errors.project}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Task <span className="text-red-500">*</span></label>
              <div className="relative group">
                <Tag className="w-4.5 h-4.5 absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <select name="task" value={formData.task} onChange={handleChange} className={`w-full pl-11 pr-11 py-3 border-2 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-gray-50/50 group-focus-within:bg-white ${errors.task ? 'border-red-300 bg-red-50/30' : 'border-gray-200'}`}>
                  <option value="">Select Task</option>
                  {tasks.map(task => (
                    <option key={task.id} value={task.name}>{task.name}</option>
                  ))}
                </select>
                <ChevronDown className="w-4.5 h-4.5 absolute right-3.5 top-3.5 text-gray-400 pointer-events-none" />
              </div>
              {errors.task && (
                <div className="flex items-center gap-1 mt-1.5 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /><span>{errors.task}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
              <div className="relative group">
                <Calendar className="w-4.5 h-4.5 absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full pl-11 pr-3.5 py-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50/50 group-focus-within:bg-white" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time Spent <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                  <span className="absolute left-3.5 top-3.5 text-sm text-gray-400">Hrs</span>
                  <input type="number" name="hours" value={formData.hours} onChange={handleChange} className={`w-full pl-11 pr-3.5 py-3 border-2 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50/50 group-focus-within:bg-white ${errors.time ? 'border-red-300 bg-red-50/30' : 'border-gray-200'}`} placeholder="0" min="0" max="23" />
                </div>
                <div className="relative group">
                  <span className="absolute left-3.5 top-3.5 text-sm text-gray-400">Min</span>
                  <input type="number" name="minutes" value={formData.minutes} onChange={handleChange} className={`w-full pl-11 pr-3.5 py-3 border-2 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50/50 group-focus-within:bg-white ${errors.time ? 'border-red-300 bg-red-50/30' : 'border-gray-200'}`} placeholder="0" min="0" max="59" />
                </div>
              </div>
              {errors.time && (
                <div className="flex items-center gap-1 mt-1.5 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /><span>{errors.time}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Billable</label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                <button onClick={() => setFormData(prev => ({ ...prev, billable: true }))} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.billable ? 'bg-green-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>✓ Billable</button>
                <button onClick={() => setFormData(prev => ({ ...prev, billable: false }))} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!formData.billable ? 'bg-gray-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>✗ Non-Billable</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Rate Per Hour</label>
              <div className="relative group">
                <DollarSign className="w-4.5 h-4.5 absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input type="number" name="rate" value={formData.rate} onChange={handleChange} className="w-full pl-11 pr-3.5 py-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50/50 group-focus-within:bg-white" placeholder="0.00" min="0" step="0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
          <div className="relative group">
            <FileText className="w-4.5 h-4.5 absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full pl-11 pr-3.5 py-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50/50 group-focus-within:bg-white resize-y min-h-[80px]" rows={3} placeholder="Add notes about your work..." maxLength={500} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400">Max 500 characters</span>
            <span className={`text-xs font-medium ${formData.notes.length > 450 ? 'text-orange-500' : 'text-gray-400'}`}>{formData.notes.length}/500</span>
          </div>
        </div>

        {/* Summary Card */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><div className="text-xs text-gray-500">Project</div><div className="text-sm font-semibold text-gray-800 truncate">{formData.project || 'Not selected'}</div></div>
            <div><div className="text-xs text-gray-500">Task</div><div className="text-sm font-semibold text-gray-800 truncate">{formData.task || 'Not selected'}</div></div>
            <div><div className="text-xs text-gray-500">Time</div><div className="text-sm font-semibold text-gray-800">{formData.hours}h {formData.minutes}m {timerSeconds > 0 && ` + ${formatTimerTime(timerSeconds)}`}</div></div>
            <div><div className="text-xs text-gray-500">Billable</div><div className="text-sm font-semibold"><span className={formData.billable ? 'text-green-600' : 'text-gray-600'}>{formData.billable ? '✓ Billable' : '✗ Non-Billable'}</span></div></div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center"><span className="px-4 bg-white text-xs text-gray-400">Time Entry Details</span></div>
        </div>

        {/* Footer - Buttons Right Aligned */}
        <div className="flex items-center justify-end gap-3">
          <button onClick={onBack} className="px-5 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 text-sm font-medium">Cancel</button>
          <button onClick={handleSubmit} disabled={isSaving} className="px-7 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg">
            <CheckCircle className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Time Entry'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogTimePage;