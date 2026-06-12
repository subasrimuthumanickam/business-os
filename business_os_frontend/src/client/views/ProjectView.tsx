import React, { useState } from 'react';
import ProjectList from '../components/projects/ProjectList';
import TaskBoard from '../components/projects/TaskBoard';
import TimeTracker from '../components/projects/TimeTracker';

const ProjectView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'tasks' | 'time'>('projects');

  return (
    <div className="project-view">
      <div className="tab-header">
        <button 
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          📋 Projects
        </button>
        <button 
          className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          ✅ Task Board
        </button>
        <button 
          className={`tab-btn ${activeTab === 'time' ? 'active' : ''}`}
          onClick={() => setActiveTab('time')}
        >
          ⏱️ Time Tracker
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'projects' && <ProjectList />}
        {activeTab === 'tasks' && <TaskBoard />}
        {activeTab === 'time' && <TimeTracker />}
      </div>
    </div>
  );
};

export default ProjectView;