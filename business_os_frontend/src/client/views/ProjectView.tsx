import React from 'react';
import { useLocation } from 'react-router-dom';
import ProjectList from '../components/projects/ProjectList';
import TaskBoard from '../components/projects/TaskBoard';
import TimeTracker from '../components/projects/TimeTracker';

const ProjectView: React.FC = () => {
  const location = useLocation();

  // Determine which component to show based on the URL path
  const renderComponent = () => {
    if (location.pathname.includes('/tasks')) {
      return <TaskBoard />;
    }
    if (location.pathname.includes('/time-tracker')) {
      return <TimeTracker />;
    }
    return <ProjectList />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ProjectView;