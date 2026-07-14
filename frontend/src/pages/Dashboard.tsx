import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTasks, type Task } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { LogOut, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSave = async (taskData: Partial<Task>) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
    } else {
      await addTask(taskData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const columns = ['todo', 'in_progress', 'done'];
  const columnTitles: Record<string, string> = {
    'todo': 'To Do',
    'in_progress': 'In Progress',
    'done': 'Done'
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Task Board</h1>
          <div className="header-actions">
            <span className="user-name">Welcome, {user?.name}</span>
            <button className="btn btn-outline" onClick={logout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="board-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            <Plus size={16} /> New Task
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading tasks...</div>
        ) : (
          <div className="kanban-board">
            {columns.map(status => (
              <div key={status} className="kanban-column">
                <h3 className="column-title">{columnTitles[status]}</h3>
                <div className="task-list">
                  {tasks.filter(t => t.status === status).map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={() => handleEdit(task)}
                      onDelete={() => handleDelete(task.id)}
                      onStatusChange={(newStatus: string) => updateTask(task.id, { ...task, status: newStatus })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
