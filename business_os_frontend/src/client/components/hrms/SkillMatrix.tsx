import React, { useState } from 'react';

interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'leadership' | 'domain';
}

interface EmployeeSkill {
  employeeId: string;
  employeeName: string;
  skills: {
    skillId: string;
    level: 1 | 2 | 3 | 4 | 5;
    years: number;
    certified: boolean;
  }[];
}

const SkillMatrix: React.FC = () => {
  const [skills] = useState<Skill[]>([
    { id: '1', name: 'React', category: 'technical' },
    { id: '2', name: 'TypeScript', category: 'technical' },
    { id: '3', name: 'Node.js', category: 'technical' },
    { id: '4', name: 'Leadership', category: 'leadership' },
    { id: '5', name: 'Communication', category: 'soft' },
    { id: '6', name: 'AWS', category: 'technical' },
    { id: '7', name: 'UI/UX Design', category: 'domain' },
    { id: '8', name: 'Agile', category: 'soft' },
  ]);

  const [employeeSkills] = useState<EmployeeSkill[]>([
    {
      employeeId: '1',
      employeeName: 'Takiya Baksh',
      skills: [
        { skillId: '1', level: 4, years: 3, certified: true },
        { skillId: '2', level: 3, years: 2, certified: false },
        { skillId: '7', level: 5, years: 4, certified: true },
      ]
    },
    {
      employeeId: '2',
      employeeName: 'John Smith',
      skills: [
        { skillId: '1', level: 5, years: 4, certified: true },
        { skillId: '2', level: 4, years: 3, certified: true },
        { skillId: '3', level: 3, years: 2, certified: false },
      ]
    },
    {
      employeeId: '3',
      employeeName: 'Sarah Johnson',
      skills: [
        { skillId: '4', level: 4, years: 5, certified: true },
        { skillId: '5', level: 5, years: 6, certified: true },
        { skillId: '8', level: 4, years: 4, certified: true },
      ]
    }
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const getLevelColor = (level: number): string => {
    switch(level) {
      case 1: return 'bg-red-100 text-red-600';
      case 2: return 'bg-orange-100 text-orange-600';
      case 3: return 'bg-yellow-100 text-yellow-600';
      case 4: return 'bg-blue-100 text-blue-600';
      case 5: return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getLevelLabel = (level: number): string => {
    switch(level) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      case 4: return 'Expert';
      case 5: return 'Master';
      default: return 'Unknown';
    }
  };

  const filteredSkills = filterCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === filterCategory);

  const getEmployeeSkillLevel = (employeeId: string, skillId: string): number | null => {
    const employee = employeeSkills.find(e => e.employeeId === employeeId);
    const skill = employee?.skills.find(s => s.skillId === skillId);
    return skill?.level || null;
  };

  const getAverageLevel = (skillId: string): number => {
    const levels = employeeSkills
      .map(e => e.skills.find(s => s.skillId === skillId)?.level)
      .filter(level => level !== undefined) as number[];
    if (levels.length === 0) return 0;
    return Math.round(levels.reduce((a, b) => a + b, 0) / levels.length * 10) / 10;
  };

  const getSkillGap = (skillId: string): number => {
    const avg = getAverageLevel(skillId);
    return Math.round((5 - avg) * 10) / 10;
  };

  const categories = ['all', 'technical', 'soft', 'leadership', 'domain'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Employee Skill Matrix</h3>
          <p className="text-sm text-gray-500 mt-1">
            {employeeSkills.length} employees • {skills.length} skills tracked
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Skill
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Average Skill Level</p>
          <p className="text-2xl font-bold text-blue-600">3.8</p>
          <p className="text-xs text-green-600">↑ 12% from last year</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Certified Skills</p>
          <p className="text-2xl font-bold text-green-600">12</p>
          <p className="text-xs text-gray-500">Total certifications</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Skill Gaps</p>
          <p className="text-2xl font-bold text-red-600">5</p>
          <p className="text-xs text-yellow-600">Need attention</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Training ROI</p>
          <p className="text-2xl font-bold text-purple-600">94%</p>
          <p className="text-xs text-green-600">↑ 8% from last year</p>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                  Employee
                </th>
                {filteredSkills.map(skill => (
                  <th key={skill.id} className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                    <div className="flex flex-col items-center">
                      <span>{skill.name}</span>
                      <span className="text-[10px] text-gray-400">{skill.category}</span>
                      <span className="text-[10px] text-blue-500 mt-1">
                        Avg: {getAverageLevel(skill.id)}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeSkills.map(employee => (
                <tr 
                  key={employee.employeeId}
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedEmployee === employee.employeeId ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedEmployee(
                    selectedEmployee === employee.employeeId ? null : employee.employeeId
                  )}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 sticky left-0 bg-white z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium">
                        {employee.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{employee.employeeName}</p>
                        <p className="text-xs text-gray-500">ID: {employee.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  {filteredSkills.map(skill => {
                    const level = getEmployeeSkillLevel(employee.employeeId, skill.id);
                    const skillData = employee.skills.find(s => s.skillId === skill.id);
                    return (
                      <td key={skill.id} className="px-2 py-3 text-center">
                        {level ? (
                          <div className="flex flex-col items-center">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${getLevelColor(level)}`}>
                              {level}
                            </span>
                            {skillData?.certified && (
                              <svg className="w-3 h-3 text-blue-500 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                            <span className="text-[10px] text-gray-400 mt-0.5">
                              {skillData?.years}y
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Employee Details */}
      {selectedEmployee && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">
              {employeeSkills.find(e => e.employeeId === selectedEmployee)?.employeeName} - Skill Details
            </h4>
            <button
              onClick={() => setSelectedEmployee(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {employeeSkills
              .find(e => e.employeeId === selectedEmployee)
              ?.skills.map(skill => {
                const skillInfo = skills.find(s => s.id === skill.skillId);
                return (
                  <div key={skill.skillId} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skillInfo?.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getLevelColor(skill.level)}`}>
                        {getLevelLabel(skill.level)}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Experience: {skill.years} years</p>
                      <p>Certified: {skill.certified ? '✅ Yes' : '❌ No'}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Skill Gap Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h4 className="font-semibold text-gray-800 mb-4">Skill Gap Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.slice(0, 6).map(skill => {
            const avg = getAverageLevel(skill.id);
            const gap = getSkillGap(skill.id);
            return (
              <div key={skill.id} className="border rounded-lg p-3">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-500">Avg: {avg}</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${gap > 2 ? 'bg-red-500' : gap > 1 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${(avg / 5) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-gray-500">Target: 5</span>
                  <span className={gap > 2 ? 'text-red-500' : gap > 1 ? 'text-yellow-500' : 'text-green-500'}>
                    Gap: {gap}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillMatrix;