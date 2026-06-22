// src/client/hooks/useProjects.ts
import { useState, useEffect, useCallback } from 'react';
import { projectApi } from '../services/projectApi';
import { Project } from '../types/project.types';

interface UseProjectsOptions {
  autoFetch?: boolean;
  params?: any;
  initialPage?: number;
  initialLimit?: number;
}

export const useProjects = (options: UseProjectsOptions = { autoFetch: true }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(options.initialPage || 1);
  const [limit, setLimit] = useState(options.initialLimit || 10);

  // Fetch projects
  const fetchProjects = useCallback(async (params?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectApi.getAll(params || options.params);
      const data = response.data || response.projects || [];
      // Ensure billingMethod matches the expected type
      const typedProjects = data.map((p: any) => ({
        ...p,
        billingMethod: p.billingMethod as Project['billingMethod'],
        status: p.status as Project['status'],
      }));
      setProjects(typedProjects);
      setTotal(response.total || data.length || 0);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [options.params]);

  // Create project
  const createProject = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectApi.create(data);
      const newProject = response.data || response;
      const typedProject = {
        ...newProject,
        billingMethod: newProject.billingMethod as Project['billingMethod'],
        status: newProject.status as Project['status'],
      };
      setProjects(prev => [typedProject, ...prev]);
      setTotal(prev => prev + 1);
      return typedProject;
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update project
  const updateProject = useCallback(async (id: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectApi.update(id, data);
      const updatedProject = response.data || response;
      const typedProject = {
        ...updatedProject,
        billingMethod: updatedProject.billingMethod as Project['billingMethod'],
        status: updatedProject.status as Project['status'],
      };
      setProjects(prev => prev.map(p => 
        p.id === id ? typedProject : p
      ));
      return typedProject;
    } catch (err: any) {
      setError(err.message || 'Failed to update project');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete project
  const deleteProject = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await projectApi.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      setTotal(prev => prev - 1);
    } catch (err: any) {
      setError(err.message || 'Failed to delete project');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get project by ID
  const getProjectById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectApi.getById(id);
      const project = response.data || response;
      return {
        ...project,
        billingMethod: project.billingMethod as Project['billingMethod'],
        status: project.status as Project['status'],
      };
    } catch (err: any) {
      setError(err.message || 'Failed to get project');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto fetch on mount
  useEffect(() => {
    if (options.autoFetch) {
      fetchProjects();
    }
  }, [fetchProjects, options.autoFetch]);

  // Refetch when page or limit changes
  useEffect(() => {
    if (options.autoFetch) {
      fetchProjects({ page, limit });
    }
  }, [page, limit, fetchProjects, options.autoFetch]);

  return {
    projects,
    setProjects,
    loading,
    error,
    total,
    page,
    limit,
    setPage,
    setLimit,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
  };
};