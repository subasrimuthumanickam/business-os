// import React, { useState } from 'react';
// import ProjectList from '../components/projects/ProjectList';
// import TaskBoard from '../components/projects/TaskBoard';
// import TimeTracker from '../components/projects/TimeTracker';

// const ProjectView: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'projects' | 'tasks' | 'time'>('projects');

//   return (
//     <div className="project-view">
    
//       <div className="tab-content">
//         {activeTab === 'projects' && <ProjectList />}
//         {activeTab === 'tasks' && <TaskBoard />}
//         {activeTab === 'time' && <TimeTracker />}
//       </div>
//     </div>
//   );
// };

// export default ProjectView;
// src/client/views/ProjectView.tsx
import React from 'react';

import TaskBoard from '../components/projects/TaskBoard';
import TimeTracker from '../components/projects/TimeTracker';
import ProjectList from '../components/projects/ProjectList';

const ProjectView: React.FC = () => {
  // ✅ Just render ProjectList - it handles all tabs internally
  return <ProjectList />;
  <TaskBoard/>;
  <TimeTracker/>
};

export default ProjectView;