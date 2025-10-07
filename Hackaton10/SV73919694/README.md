# Mini Learning Platform (Sequelize)
Implementa modelos, asociaciones, validaciones, scopes, hooks, paginación, eager loading y transacciones.


## Endpoints básicos

- `POST /users` crear usuario
- `GET /users` listar con filtros `?role=&q=&page=&pageSize=`
- `POST /courses` crear (instructor/admin)
- `GET /courses` listar paginado `?published=&q=&order=&page=&pageSize=`
- `GET /courses/:slug` detalle con owner+lessons+studentsCount
- `POST /courses/:courseId/lessons`
- `POST /courses/:courseId/enroll`
- `PATCH /enrollments/:id/status`
- `POST /lessons/:lessonId/comments`
- `GET /lessons/:lessonId/comments`
