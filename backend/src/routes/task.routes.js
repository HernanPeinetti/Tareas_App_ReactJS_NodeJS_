import express from 'express'
import Task from '../models/Task.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

//Crear tarea

router.post('/', authMiddleware, async(req, res)=>{
    try{
        const { title } = req.body
        const task = new Task({ title, userId: req.userId })
        console.log('req.userId:', req.userId);
        await task.save()
        res.status(201).json(task)
    }catch(error){
        console.error(' Error real:', error);
        res.status(500).json({message: 'Error al crear la tarea'})
    }
})


//Obtener tareas del usuario

router.get('/', authMiddleware, async(req, res)=>{
    try{
        const tasks = await Task.find({ userId: req.userId })
        res.json(tasks)
    }catch(error){
        res.status(500).json({message: 'Error al obtener tareas'})
    }
})


//Eliminar tareas
router.delete('/:id', authMiddleware, async (req, res)=>{
    try{
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId })
        res.json({message: 'Tarea eliminada'})
    }catch(error){
        res.status(500).json({message: 'Error al eliminar tarea'})
    }
})

//Actualizar tarea

router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { completed: req.body.completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error('Error al actualizar tarea', err);
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
});



export default router



        
        

        