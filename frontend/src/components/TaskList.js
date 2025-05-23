// TaskList.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';


function TaskList({ token, setToken }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/tasks', {
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
      const res = await axios.post('http://localhost:3001/api/tasks', { title }, {
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
      await axios.delete(`http://localhost:3001/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error al eliminar tarea', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleToggleComplete = async (id, currentState) => {
  try {
    const res = await axios.patch(
      `http://localhost:3001/api/tasks/${id}`,
      { completed: !currentState },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
  } catch (err) {
    console.error('Error al cambiar estado de completado', err);
  }
};


  return (
    // <div className="max-w-xl mx-auto bg-white text-gray-800 p-6 rounded-xl shadow">
    //   <div className="flex justify-between items-center mb-4">
    //     <h2 className="text-2xl font-bold">Mis Tareas</h2>
    //     <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Cerrar sesión</button>
    //   </div>

    //   <form onSubmit={handleAdd} className="flex gap-2 mb-4">
    //     <input type="text" className="flex-grow px-3 py-2 border rounded" placeholder="Nueva tarea" value={title} onChange={e => setTitle(e.target.value)} required />
    //     <button type="submit" className="bg-violet-700 text-white px-4 py-2 rounded hover:bg-violet-800 transition">Agregar</button>
    //   </form>

    //   <ul className="space-y-2">
    //     {tasks.map(task => (
    //       <li key={task._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
    //         <span>{task.title}</span>
    //         <button onClick={() => handleDelete(task._id)} className="text-sm text-red-600 hover:underline">Eliminar</button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>

  <div className="max-w-2xl mx-auto bg-white text-gray-800 p-8 rounded-2xl shadow-2xl">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-extrabold text-gray-900">📋 Mis Tareas</h2>
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 hover:text-red-600 transition font-semibold"
    >
      Cerrar sesión
    </button>
  </div>

  <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3 mb-6">
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
      className="bg-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
    >
      Agregar
    </button>
  </form>

  {/* <ul className="space-y-3">
    {tasks.map((task) => (
      <li
        key={task._id}
        className="flex justify-between items-center bg-purple-50 border border-purple-200 px-4 py-2 rounded-lg shadow-sm"
      >
        <span className="text-gray-800 font-medium">{task.title}</span>
        <button
          onClick={() => handleDelete(task._id)}
          className="text-sm text-red-500 hover:text-red-600 font-medium"
        >
          Eliminar
        </button>
      </li>
    ))}
  </ul> */}

 {/* <ul className="space-y-4">
  {tasks.map((task) => (
    <TaskCard
      key={task._id}
      task={task}
      onDelete={handleDelete}
      onToggleComplete={handleToggleComplete} // ← acá lo agregás
    />
  ))}
</ul> */}
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
