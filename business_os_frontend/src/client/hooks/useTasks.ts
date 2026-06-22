// src/client/hooks/useTasks.ts
import { useState, useEffect, useCallback } from 'react';
import { taskApi } from '../services/projectApi';

export const useTasks = (projectId?: string) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = projectId 
        ? await taskApi.getByProject(projectId)
        : await taskApi.getAll();
      setTasks(response.data || response.tasks || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const createTask = useCallback(async (data: any) => {
    setLoading(true);
    try {
      const response = await taskApi.create(data);
      setTasks(prev => [...prev, response.data || response]);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (id: string, data: any) => {
    setLoading(true);
    try {
      const response = await taskApi.update(id, data);
      setTasks(prev => prev.map(t => 
        t.id === id ? (response.data || response) : t
      ));
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await taskApi.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};