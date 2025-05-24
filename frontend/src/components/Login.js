import React, { useState } from "react";
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(`${API}/api/auth/login`, {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm p-6 mx-auto text-gray-800 bg-white shadow rounded-xl">
      <h2 className="mb-4 text-2xl font-bold text-center">Iniciar sesión</h2>
      {error && <p className="mb-2 text-sm text-center text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-semibold">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-semibold">Contraseña</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 text-white transition rounded bg-violet-700 hover:bg-violet-800"
      >
        Ingresar
      </button>
    </form>
  );
}

export default Login;
