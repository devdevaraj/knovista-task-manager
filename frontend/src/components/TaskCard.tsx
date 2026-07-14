import React from 'react';
import { Edit2, Trash2, Clock } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const priorityColors = {
    low: 'bg-green',
    medium: 'bg-yellow',
    high: 'bg-red'
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <span className={`priority-badge ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <div className="task-actions">
          <button className="icon-btn edit-btn" onClick={onEdit}><Edit2 size={14} /></button>
          <button className="icon-btn delete-btn" onClick={onDelete}><Trash2 size={14} /></button>
        </div>
      </div>
      <h4 className="task-title">{task.title}</h4>
      {task.description && <p className="task-desc">{task.description}</p>}
      
      <div className="task-footer">
        {task.due_date ? (
          <span className="due-date">
            <Clock size={12} /> {new Date(task.due_date).toLocaleDateString()}
          </span>
        ) : (
          <span></span>
        )}
        
        <select 
          value={task.status} 
          onChange={(e) => onStatusChange(e.target.value)}
          className="status-select"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
