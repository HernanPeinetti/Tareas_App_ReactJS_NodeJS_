import React, {useState} from "react";
import axios from 'axios'

function Login({ setToken }){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)


    const handleSubmit = async(e) =>{
        e.preventDefault()
        setError(null)
        try{
            const response = await axios.post('http://localhost:3001/api/auth/login',{
                email,
                password
            })
            localStorage.setItem('token', response.data.token)
            setToken(response.data.token)
        }catch(err){
            setError('Credenciales Invalidas')
        }
    };

    return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white text-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>
      {error && <p className="text-red-500 mb-2 text-sm text-center">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-semibold">Email</label>
        <input type="email" className="w-full px-3 py-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-semibold">Contraseña</label>
        <input type="password" className="w-full px-3 py-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="w-full bg-violet-700 text-white py-2 rounded hover:bg-violet-800 transition">Ingresar</button>
    </form>
  )

}

export default Login;
