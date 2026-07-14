import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useTasks = (statusFilter = '') => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const url = statusFilter ? `/tasks?status=${statusFilter}` : '/tasks';
      const response = await api.get(url);
      setTasks(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    const response = await api.post('/tasks', taskData);
    setTasks((prev) => [response.data.data, ...prev]);
    return response.data.data;
  };

  const updateTask = async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    setTasks((prev) => prev.map(t => t.id === id ? response.data.data : t));
    return response.data.data;
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter(t => t.id !== id));
  };

  return { tasks, loading, error, addTask, updateTask, deleteTask, refreshTasks: fetchTasks };
};
