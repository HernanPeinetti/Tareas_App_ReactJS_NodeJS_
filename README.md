# 📋 Gestor de Tareas - App Full Stack

Aplicación web full stack para gestionar tareas diarias. Permite a los usuarios registrarse, iniciar sesión, agregar, eliminar y marcar tareas como completadas. Desarrollada con **React**, **Express**, **MongoDB** y autenticación con **JWT**.

---

## 🛠 Tecnologías

**Frontend:**
- React
- TailwindCSS
- Axios

**Backend:**
- Node.js
- Express
- MongoDB (MongoDB Atlas)
- Mongoose
- JSON Web Token (JWT)
- Bcrypt

---

## 🚀 Funcionalidades

- Registro de usuarios
- Login seguro con JWT
- Agregar tareas
- Eliminar tareas
- Marcar tareas como completadas
- Interfaz responsiva y moderna

---

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/gestor-tareas.git
cd gestor-tareas
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Crear un archivo `.env`:

```env
MONGO_URL=tu_uri_de_mongodb
JWT_SECRET=una_clave_secreta_segura
```

Ejecutar servidor:

```bash
npm run dev
```

Servidor corriendo en `http://localhost:3001`

---

### 3. Configurar el frontend

```bash
cd ../frontend
npm install
npm start
```

Aplicación accesible en `http://localhost:3000`

---

---

## 📂 Estructura del proyecto

```
gestor-tareas/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   └── index.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── .env
```

---

## 🧑‍💻 Autor

**Hernán Peinetti**

[GitHub](https://github.com/TU_USUARIO) • [LinkedIn](https://www.linkedin.com/in/TU_USUARIO)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
