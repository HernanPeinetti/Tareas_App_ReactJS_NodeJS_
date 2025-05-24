// TaskList.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';

const API = process.env.REACT_APP_API_URL + '/api/tasks';

function TaskList({ token, setToken }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Error al obtener tareas', err);
    }
  }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API, { title }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, res.data]);
      setTitle('');
    } catch (err) {
      console.error('Error al crear tarea', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error al eliminar tarea', err);
    }
  };

  const handleToggleComplete = async (id, currentState) => {
    try {
      const res = await axios.patch(`${API}/${id}`, {
        completed: !currentState
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error('Error al cambiar estado de completado', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="max-w-2xl p-8 mx-auto text-gray-800 bg-white shadow-2xl rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">📋 Mis Tareas</h2>
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-red-500 transition hover:text-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      <form onSubmit={handleAdd} className="flex flex-col gap-3 mb-6 md:flex-row">
        <input
          type="text"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Nueva tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-5 py-2 font-medium text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Agregar
        </button>
      </form>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
