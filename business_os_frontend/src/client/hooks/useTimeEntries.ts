// src/client/hooks/useTimeEntries.ts
import { useState, useEffect, useCallback } from 'react';
import { timeEntryApi } from '../services/projectApi';

export const useTimeEntries = (projectId?: string) => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = projectId 
        ? await timeEntryApi.getByProject(projectId)
        : await timeEntryApi.getAll();
      setEntries(response.data || response.entries || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch time entries');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const createEntry = useCallback(async (data: any) => {
    setLoading(true);
    try {
      const response = await timeEntryApi.create(data);
      setEntries(prev => [response.data || response, ...prev]);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to create time entry');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEntry = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await timeEntryApi.delete(id);
      setEntries(prev => prev.filter(e => e.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete time entry');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return {
    entries,
    loading,
    error,
    fetchEntries,
    createEntry,
    deleteEntry,
  };
};