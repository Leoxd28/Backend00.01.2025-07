
# 🚀 Hackatón Avanzada: Construyendo una API REST con Express (6 horas)

## 🎯 Objetivo
Desarrollar una API REST completa con **Express.js** que gestione cursos y alumnos, aplicando conceptos avanzados como:
- Persistencia en archivos JSON  
- Autenticación por roles  
- Middleware personalizados  
- Paginación, filtros y ordenamiento  
- Exportación de datos  
- Endpoints combinados tipo *dashboard*  

---

## 📅 Agenda (6 horas)

### ⏰ Hora 1 – Setup inicial
- Configuración del proyecto con `npm init -y` y `express`.
- Creación de estructura base:
  ```
  /project
   ├── index.js
   ├── routes/
   │    └── cursos.js
   ├── data.json
   └── utils/
        └── fileManager.js
  ```
- Middleware básico de logging (mostrar método y URL).

👉 **Entrega**: API corriendo con endpoint `/` que diga *"Hackatón Express Avanzado 🚀"*.

---

### ⏰ Hora 2 – CRUD con persistencia en JSON
- Implementar CRUD de **cursos** y **alumnos**.
- Guardar y leer datos en `data.json` con `fs`.
- Ejemplo de estructura:

```json
[
  {
    "id": 1,
    "nombre": "Matemáticas",
    "alumnos": [
      { "id": 1, "nombre": "Ana", "nota": 18 },
      { "id": 2, "nombre": "Luis", "nota": 15 }
    ]
  }
]
```

👉 **Entrega**: Endpoints funcionando:
- `GET /cursos`  
- `POST /cursos`  
- `GET /cursos/:id/alumnos`  
- `POST /cursos/:id/alumnos`

---

### ⏰ Hora 3 – Middleware y autenticación
- Middleware de validación (`nombre` obligatorio).  
- Middleware de **roles** con tokens falsos:  
  - `teacher123` → profesor  
  - `student123` → alumno  
- Restricción: solo profesores pueden crear cursos o ver notas.

👉 **Entrega**: Endpoint protegido `/notas`.

---

### ⏰ Hora 4 – Filtros, orden y paginación
- Query params para búsquedas y paginación:  
  - `/cursos?page=1&limit=2`  
  - `/alumnos?minNota=15&sort=desc`  
- Ordenamiento asc/desc por ID o por nota.  
- Manejo de errores cuando los parámetros son inválidos.

👉 **Entrega**: Endpoints con filtros funcionando.

---

### ⏰ Hora 5 – Funcionalidades avanzadas
- Endpoint `/ranking` → lista de alumnos ordenados por nota global.  
- Endpoint `/exportar` → descarga de `data.json` con `res.download`.  


👉 **Entrega**: API robusta con endpoints extra.

---

### ⏰ Hora 6 – Dashboard y demo final
- Crear `/dashboard` que devuelva estadísticas combinadas:
  ```json
  {
    "totalCursos": 3,
    "totalAlumnos": 12,
    "promedioGeneral": 15.7,
    "mejorAlumno": "Ana"
  }
  ```
- Demo grupal de la API completa.  
- Presentación de mejoras y refactorización.  

👉 **Entrega final**: API lista con documentación en README.md.

---

## 🏆 Retos Extra (para los más rápidos)
1. Implementar un sistema de backup automático de `data.json` cada vez que se edita.  
2. Crear un middleware que mida el tiempo de respuesta de cada request.  
3. Endpoint `/alumnos/top/:n` que devuelva los **N mejores alumnos** globalmente.  
4. Implementar un sistema de **roles múltiples** (profesor puede leer/escribir, alumno solo leer, admin todo).  

---

## 📖 Recursos de ayuda
- [Documentación Express](https://expressjs.com/)  
- [Node.js File System (fs)](https://nodejs.org/api/fs.html)  
- [MDN Query Strings](https://developer.mozilla.org/es/docs/Web/API/URLSearchParams)  
