import React, { useState, useEffect } from 'react';

interface OrgNode {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  children?: OrgNode[];
  metrics?: {
    performance: number;
    teamSize: number;
    tenure: number;
  };
}

const OrganizationChart: React.FC = () => {
  const [orgData, setOrgData] = useState<OrgNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  useEffect(() => {
    // Mock organization data
    const mockData: OrgNode = {
      id: '1',
      name: 'Sarah Johnson',
      role: 'CEO',
      department: 'Executive',
      metrics: { performance: 4.8, teamSize: 10, tenure: 5 },
      children: [
        {
          id: '2',
          name: 'Takiya Baksh',
          role: 'UI/UX Designer',
          department: 'Design',
          metrics: { performance: 4.5, teamSize: 3, tenure: 2 },
          children: [
            {
              id: '3',
              name: 'John Smith',
              role: 'Frontend Developer',
              department: 'Engineering',
              metrics: { performance: 4.2, teamSize: 0, tenure: 1.5 }
            },
            {
              id: '4',
              name: 'Michael Chen',
              role: 'Backend Developer',
              department: 'Engineering',
              metrics: { performance: 4.0, teamSize: 0, tenure: 1 }
            }
          ]
        },
        {
          id: '5',
          name: 'Emily Rodriguez',
          role: 'HR Specialist',
          department: 'HR',
          metrics: { performance: 4.7, teamSize: 2, tenure: 3 },
          children: [
            {
              id: '6',
              name: 'David Kim',
              role: 'DevOps Engineer',
              department: 'Engineering',
              metrics: { performance: 4.3, teamSize: 0, tenure: 2 }
            }
          ]
        },
        {
          id: '7',
          name: 'Lisa Patel',
          role: 'Marketing Manager',
          department: 'Marketing',
          metrics: { performance: 4.1, teamSize: 1, tenure: 1.5 },
          children: []
        },
        {
          id: '8',
          name: 'James Wilson',
          role: 'Sales Executive',
          department: 'Sales',
          metrics: { performance: 3.9, teamSize: 0, tenure: 1 }
        }
      ]
    };
    setOrgData(mockData);
    // Expand all by default
    const allIds = new Set<string>();
    const collectIds = (node: OrgNode) => {
      allIds.add(node.id);
      node.children?.forEach(collectIds);
    };
    collectIds(mockData);
    setExpandedNodes(allIds);
  }, []);

  const toggleExpand = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const expandAll = () => {
    if (!orgData) return;
    const allIds = new Set<string>();
    const collectIds = (node: OrgNode) => {
      allIds.add(node.id);
      node.children?.forEach(collectIds);
    };
    collectIds(orgData);
    setExpandedNodes(allIds);
  };

  const collapseAll = () => {
    if (!orgData) return;
    const rootId = new Set<string>([orgData.id]);
    setExpandedNodes(rootId);
  };

  const getDepartments = (node: OrgNode): string[] => {
    const depts = new Set<string>([node.department]);
    node.children?.forEach(child => {
      getDepartments(child).forEach(d => depts.add(d));
    });
    return Array.from(depts);
  };

  const filterNodes = (node: OrgNode, search: string, dept: string): boolean => {
    const matchesSearch = node.name.toLowerCase().includes(search.toLowerCase()) ||
      node.role.toLowerCase().includes(search.toLowerCase()) ||
      node.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = dept === 'all' || node.department === dept;
    
    if (matchesSearch && matchesDept) return true;
    if (node.children) {
      return node.children.some(child => filterNodes(child, search, dept));
    }
    return false;
  };

  const departments = orgData ? getDepartments(orgData) : [];

  const renderNode = (node: OrgNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    
    // Filter check
    if (!filterNodes(node, searchTerm, filterDepartment)) {
      return null;
    }

    return (
      <div key={node.id} className="flex flex-col items-center">
        <div 
          className={`
            relative p-4 rounded-xl shadow-md border-2 cursor-pointer transition-all duration-300
            ${selectedNode?.id === node.id ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 bg-white'}
            hover:shadow-lg hover:border-blue-300 hover:scale-105
            ${node.metrics?.performance && node.metrics.performance >= 4.5 ? 'ring-2 ring-green-400' : ''}
          `}
          onClick={() => setSelectedNode(node)}
          style={{ 
            margin: `${level * 8}px`,
            minWidth: '200px',
            maxWidth: '280px'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {node.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{node.name}</p>
              <p className="text-sm text-gray-500 truncate">{node.role}</p>
              <p className="text-xs text-gray-400 truncate">{node.department}</p>
            </div>
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(node.id);
                }}
                className="ml-1 p-1 hover:bg-gray-100 rounded-full transition-transform"
              >
                <svg 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            )}
          </div>
          {node.metrics && (
            <div className="mt-2 flex gap-3 text-xs border-t border-gray-100 pt-2">
              <span className="flex items-center gap-1 text-green-600">
                ⭐ {node.metrics.performance}
              </span>
              <span className="flex items-center gap-1 text-blue-600">
                👥 {node.metrics.teamSize}
              </span>
              <span className="flex items-center gap-1 text-purple-600">
                📅 {node.metrics.tenure}y
              </span>
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="relative mt-2">
            <div className="absolute left-1/2 top-0 w-0.5 h-6 bg-gradient-to-b from-blue-400 to-transparent transform -translate-x-1/2"></div>
            <div className="flex gap-6 justify-center pt-6 flex-wrap">
              {node.children?.map(child => (
                <div key={child.id} className="relative">
                  <div className="absolute left-1/2 top-0 w-0.5 h-6 bg-gradient-to-b from-blue-400 to-transparent transform -translate-x-1/2"></div>
                  <div className="pt-6">{renderNode(child, level + 1)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const getStatistics = () => {
    if (!orgData) return null;
    const countNodes = (node: OrgNode): number => {
      let count = 1;
      node.children?.forEach(child => count += countNodes(child));
      return count;
    };
    const totalEmployees = countNodes(orgData);
    const departments = new Set<string>();
    const collectDepts = (node: OrgNode) => {
      departments.add(node.department);
      node.children?.forEach(collectDepts);
    };
    collectDepts(orgData);

    // Calculate average performance
    let perfSum = 0;
    let perfCount = 0;
    const collectPerf = (node: OrgNode) => {
      if (node.metrics?.performance) {
        perfSum += node.metrics.performance;
        perfCount++;
      }
      node.children?.forEach(collectPerf);
    };
    collectPerf(orgData);
    const avgPerf = perfCount > 0 ? Math.round((perfSum / perfCount) * 10) / 10 : 0;

    return { totalEmployees, departments: departments.size, avgPerformance: avgPerf };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="4" r="2" />
              <circle cx="6" cy="10" r="2" />
              <circle cx="18" cy="10" r="2" />
              <circle cx="6" cy="18" r="2" />
              <circle cx="18" cy="18" r="2" />
              <line x1="12" y1="6" x2="12" y2="10" />
              <line x1="8" y1="12" x2="8" y2="16" />
              <line x1="16" y1="12" x2="16" y2="16" />
              <line x1="12" y1="12" x2="6" y2="12" />
              <line x1="12" y1="12" x2="18" y2="12" />
            </svg>
            Organization Structure
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {stats?.totalEmployees} employees across {stats?.departments} departments • Avg Performance: {stats?.avgPerformance} ⭐
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-48 text-sm"
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <div className="flex items-center gap-1 border rounded-lg overflow-hidden">
            <button
              onClick={() => setZoomLevel(Math.min(zoomLevel + 0.1, 2))}
              className="p-2 hover:bg-gray-50 transition-colors border-r"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>
            <button
              onClick={() => setZoomLevel(Math.max(zoomLevel - 0.1, 0.5))}
              className="p-2 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={expandAll}
              className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div 
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 overflow-auto min-h-[500px]"
        style={{ 
          transform: `scale(${zoomLevel})`, 
          transformOrigin: 'top center',
          transition: 'transform 0.3s ease'
        }}
      >
        {orgData ? (
          <div className="flex justify-center">
            {renderNode(orgData)}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {selectedNode.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800">{selectedNode.name}</h4>
                <p className="text-sm text-gray-500">{selectedNode.role}</p>
                <p className="text-sm text-gray-400">{selectedNode.department}</p>
              </div>
            </div>
            {selectedNode.metrics && (
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Performance</p>
                  <p className="text-2xl font-bold text-green-600">{selectedNode.metrics.performance}</p>
                  <div className="flex items-center gap-0.5 justify-center mt-0.5">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} className={`w-3 h-3 ${star <= Math.round(selectedNode.metrics?.performance || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Team Size</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedNode.metrics.teamSize}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Tenure</p>
                  <p className="text-2xl font-bold text-purple-600">{selectedNode.metrics.tenure}y</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSelectedNode(null)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {selectedNode.children && selectedNode.children.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">Direct Reports ({selectedNode.children.length})</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {selectedNode.children.map(child => (
                  <span key={child.id} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                    {child.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrganizationChart;