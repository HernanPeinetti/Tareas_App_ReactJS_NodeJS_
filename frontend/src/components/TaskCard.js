import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function TaskCard({ task, onDelete, onToggleComplete }) {
  return (
    <li
      className={`bg-white border ${
        task.completed ? "border-green-300" : "border-gray-200"
      } rounded-xl shadow-md px-5 py-4 flex justify-between items-center transition hover:shadow-lg`}
    >
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onToggleComplete(task._id, task.completed)}
        title="Marcar como completada"
      >
        <FaCheckCircle
          className={`text-lg transition-all duration-300 ease-in-out ${
            task.completed
              ? "text-green-500 scale-110"
              : "text-gray-400 hover:text-green-400 scale-100"
          }`}
        />

        <span
          className={`text-base font-semibold ${
            task.completed ? "text-green-700" : "text-gray-900"
          }`}
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className="text-sm font-semibold text-red-500 hover:text-red-600"
      >
        Eliminar
      </button>
    </li>
  );
}

export default TaskCard;
