import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from '../src/routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'


dotenv.config()

const app = express()

//Middlewares
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

//Rutas de prueba

app.get('/', (req, res)=>{
    res.send('Servidor Funcionando')
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


//Conectar con mongoDb

mongoose.connect(process.env.MONGO_URL)
    .then(() =>{
        console.log('Conectado con MongoDB Atlas');
        //Iniciar el servidor solo si la conexion es exitosa
        app.listen(PORT, ()=>{
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
            
        })

    })
    .catch((error)=>{
        console.log('Error al conectar a MongoDB: ',error);
        
    })

    
