//App.js
import React, { useState } from "react";
import Login from './components/Login.js'
import TaskList from './components/TaskList.js'

function App(){
    const [token, setToken] = useState(localStorage.getItem('token'))

    return(
        <div className="min-h-screen bg-gradient-to-b from-violet-800 via-purple-700 to-white text-white font-sans p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Gestor de Tareas</h1>
            {token ? (
                <TaskList token={token} setToken={setToken} />
            ) : (
                <Login setToken={setToken}/>
            )

            }
               
        </div>
    )
}

export default App;
