# Mini Learning Platform API

Una plataforma mínima para cursos y lecciones con comentarios de estudiantes, desarrollada con Node.js, Express, Sequelize y MySQL siguiendo las especificaciones del **Caso ABC**.

## 🎯 Características del Proyecto

- **Usuarios**: Sistema de roles (admin, instructor, student)
- **Cursos**: Creación y gestión con soft delete (paranoid)  
- **Lecciones**: Contenido organizado secuencialmente
- **Inscripciones**: Relación N:M con estados y puntuaciones
- **Comentarios**: Sistema de feedback en lecciones
- **Transacciones**: Operaciones ACID para integridad de datos
- **Eager Loading**: Optimización de consultas N+1
- **Paginación**: Listados eficientes con filtros
- **Hooks y Scopes**: Automatización y consultas predefinidas

## 📋 Requisitos del Sistema

- **Node.js** >= 16.x
- **MySQL** >= 8.0  
- **npm** >= 8.x

## 🛠️ Instalación

### 1. Clonar repositorio
```bash
git clone <repository-url>
cd JD002_Hackaton10/SV43123322
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar base de datos MySQL
```sql
-- Conectar a MySQL como root
mysql -u root -p

-- Crear base de datos
CREATE DATABASE mini_learning_platform 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Crear usuario (opcional)
CREATE USER 'mini_learning'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON mini_learning_platform.* TO 'mini_learning'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp .env.sample .env
```

**Editar archivo .env:**
```env
# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mini_learning_platform
DB_USER=root
DB_PASS=your_mysql_password
DB_DIALECT=mysql

# Configuración de Sincronización
DB_SYNC=alter     # Options: none, alter, force

# Configuración del Servidor
NODE_ENV=development
PORT=3000

# Configuración de Logging
DB_LOGGING=true
```

### 5. Inicializar base de datos
```bash
# Sincronizar modelos y crear tablas
npm run dev

# O poblar con datos de prueba
npm run db:seed
```

## 📝 Scripts NPM Disponibles

```bash
# Desarrollo con nodemon (auto-restart)
npm run dev

# Producción
npm start

# Poblar base de datos con datos de prueba
npm run db:seed

# Ejecutar pruebas (si están configuradas)
npm test
```

## 🌐 Endpoints de la API

### 🏥 Health Check
```bash
GET  /health              # Estado del sistema y base de datos
GET  /                    # Información de la API y endpoints
```

### 👥 Usuarios
```bash
POST   /api/users         # Crear usuario (role por defecto: student)
GET    /api/users         # Listar usuarios con filtros
GET    /api/users/:id     # Obtener usuario específico
```

**Filtros disponibles:**
- `role`: admin, instructor, student
- `q`: búsqueda en nombre/apellido/email  
- `page`: número de página (default: 1)
- `pageSize`: elementos por página (default: 10, max: 100)

### 📚 Cursos
```bash
POST   /api/courses           # Crear curso (solo instructor/admin)
GET    /api/courses           # Listar cursos con filtros
GET    /api/courses/slug/:slug # Obtener curso por slug con detalles
PUT    /api/courses/:id       # Actualizar curso
DELETE /api/courses/:id       # Soft delete curso
```

**Filtros disponibles:**
- `published`: true/false (solo cursos publicados)
- `q`: búsqueda en título y descripción
- `order`: campo:dirección (ej: createdAt:DESC, title:ASC)
- `page`, `pageSize`: paginación

### 📖 Lecciones
```bash
POST   /api/courses/:courseId/lessons  # Crear lección (order automático)
GET    /api/courses/:courseId/lessons  # Listar lecciones del curso
PUT    /api/lessons/:id               # Actualizar lección
DELETE /api/lessons/:id               # Soft delete lección
```

**Query parameters:**
- `order`: ASC/DESC para ordenar por campo 'order'

### 🎓 Inscripciones (Enrollments)
```bash
POST   /api/courses/:courseId/enroll     # Inscribir usuario (status='pending')
PATCH  /api/enrollments/:id/status       # Cambiar estado y asignar score
GET    /api/courses/:courseId/enrollments # Listar inscripciones del curso
GET    /api/users/:userId/enrollments     # Listar inscripciones del usuario
```

**Estados disponibles:**
- `pending`: Inscripción pendiente de activación
- `active`: Inscripción activa (cuenta para estadísticas)

### 💬 Comentarios
```bash
POST   /api/lessons/:lessonId/comments   # Crear comentario (trim automático)
GET    /api/lessons/:lessonId/comments   # Listar comentarios (paginados)
```

## 📊 Ejemplos de Uso con cURL

### Crear usuario estudiante
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Juan",
    "lastName": "Pérez", 
    "email": "juan@estudiante.com",
    "passwordHash": "password123",
    "role": "student"
  }'
```

### Crear usuario instructor
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "María",
    "lastName": "García",
    "email": "maria@instructor.com", 
    "passwordHash": "password123",
    "role": "instructor"
  }'
```

### Crear curso
```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introducción a Node.js",
    "description": "Curso completo de Node.js desde cero",
    "ownerId": 2
  }'
```

### Publicar curso
```bash
curl -X PUT http://localhost:3000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{
    "published": true
  }'
```

### Crear lección
```bash
curl -X POST http://localhost:3000/api/courses/1/lessons \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Configuración del entorno",
    "body": "En esta lección aprenderemos a configurar el entorno de desarrollo para Node.js. Instalaremos Node.js, npm y configuraremos nuestro primer proyecto."
  }'
```

### Inscribir estudiante en curso
```bash
curl -X POST http://localhost:3000/api/courses/1/enroll \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1
  }'
```

### Activar inscripción con puntuación
```bash
curl -X PATCH http://localhost:3000/api/enrollments/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "active",
    "score": 95.5
  }'
```

### Agregar comentario a lección
```bash
curl -X POST http://localhost:3000/api/lessons/1/comments \
  -H "Content-Type: application/json" \
  -d '{
    "body": "Excelente explicación, muy clara y detallada!",
    "userId": 1
  }'
```

### Consultas con filtros

#### Listar cursos publicados ordenados por fecha
```bash
curl "http://localhost:3000/api/courses?published=true&order=createdAt:DESC&page=1&pageSize=5"
```

#### Buscar usuarios por nombre
```bash
curl "http://localhost:3000/api/users?q=juan&role=student"
```

#### Obtener detalle completo de curso por slug
```bash
curl "http://localhost:3000/api/courses/slug/introduccion-a-nodejs"
```

#### Listar inscripciones activas de un curso
```bash
curl "http://localhost:3000/api/courses/1/enrollments?status=active"
```

## 🧪 Colección Postman

### Importar colección
1. Abrir Postman
2. Click en **Import**
3. Seleccionar archivo: `docs/docs/postman-learning_platform.json`
4. La colección incluye:
   - ✅ Todos los endpoints documentados
   - ✅ Variables automáticas (IDs se setean dinámicamente)
   - ✅ Tests de validación de respuestas
   - ✅ Ejemplos de casos de error
   - ✅ Flujos completos de prueba

### Variables de entorno Postman
- `baseUrl`: http://localhost:3000 (configurable)
- `userId`, `courseId`, `lessonId`: Se setean automáticamente
- `instructorId`, `enrollmentId`, `commentId`: Auto-configuración

### Flujo de pruebas recomendado
1. **Health Check** → Verificar estado del sistema
2. **Create Instructor** → Crear usuario instructor
3. **Create Student** → Crear usuario estudiante  
4. **Create Course** → Crear curso
5. **Create Lesson** → Agregar lecciones
6. **Enroll Student** → Inscribir estudiante
7. **Activate Enrollment** → Cambiar estado a activo
8. **Add Comments** → Agregar comentarios

## 🗄️ Estructura de Base de Datos

### Entidades y Relaciones
```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│    Users    │ 1───N │   Courses    │ 1───N │   Lessons   │
│             │       │              │       │             │
│ id (PK)     │       │ id (PK)      │       │ id (PK)     │
│ firstName   │       │ title        │       │ title       │
│ lastName    │       │ slug         │       │ slug        │
│ email       │       │ description  │       │ body        │
│ passwordHash│       │ published    │       │ order       │
│ role        │       │ ownerId (FK) │       │ courseId(FK)│
└─────────────┘       └──────────────┘       └─────────────┘
       │                      │                      │
       │                      │                      │ 1
       │ N                    │ N                    │ │
       │ │                    │ │                    │ N
       │ │              ┌─────────────┐              │ │
       └─┴──────────────│ Enrollments │              │ │
         │              │             │              │ │
         │              │ id (PK)     │              │ │
         │              │ userId (FK) │              │ │
         │              │ courseId(FK)│              │ │
         │              │ status      │              │ │
         │              │ score       │              │ │
         │              └─────────────┘              │ │
         │                                           │ │
         │              ┌─────────────┐              │ │
         └──────────────│  Comments   │──────────────┘ │
                        │             │                │
                        │ id (PK)     │                │
                        │ body        │                │
                        │ userId (FK) │                │
                        │ lessonId(FK)│                │
                        └─────────────┘                │
```

### Características técnicas implementadas:
- **Soft Deletes**: Courses y Lessons (paranoid: true)
- **Auto-generated Slugs**: Desde title con hooks
- **Unique Constraints**: email, course title, lesson slug por curso
- **Foreign Keys**: Todas las relaciones con constraints
- **Indexes**: Campos de búsqueda y foreign keys
- **Validaciones**: Email format, longitudes mínimas
- **Hooks**: Normalización de strings, validación de comentarios

## ⚙️ Configuraciones de Sincronización

### DB_SYNC Options
```env
# No modifica estructura existente (production)
DB_SYNC=none

# Altera tablas para coincidir con modelos (development)  
DB_SYNC=alter

# Elimina y recrea todas las tablas (development only)
DB_SYNC=force
```

### Recomendaciones por entorno:
- **Desarrollo**: `DB_SYNC=alter`
- **Testing**: `DB_SYNC=force` 
- **Producción**: `DB_SYNC=none`

## 🔍 Características Avanzadas

### 🚀 Transacciones
Operaciones críticas usan transacciones ACID:
```javascript
// Inscripción con actualización de contadores
const transaction = await sequelize.transaction();
try {
  const enrollment = await Enrollment.create({...}, { transaction });
  await enrollment.update({ status: 'active' }, { transaction });
  await Course.increment('studentsCount', {
    by: 1, where: { id: courseId }, transaction
  });
  await transaction.commit();
} catch (error) {
  await transaction.rollback();
  throw error;
}
```

### 🔍 Eager Loading Optimizado
Prevención de consultas N+1:
```javascript
// Curso con owner, lecciones y estadísticas
const course = await Course.findOne({
  where: { slug },
  include: [
    { model: User, as: 'owner', attributes: ['id','firstName','lastName'] },
    { model: Lesson, as: 'lessons', attributes: ['id','title','order'] }
  ]
});
const studentsCount = await Enrollment.count({ 
  where: { courseId: course.id, status: 'active' }
});
```

### 🎯 Scopes Predefinidos
```javascript
// Cursos publicados
await Course.scope('published').findAll();

// Con eager loading
await Course.scope(['published', 'withOwner']).findAll();
```

### 🔧 Hooks Automáticos
```javascript
// Auto-generación de slugs
Course.beforeValidate(course => {
  if (!course.slug && course.title) {
    course.slug = course.title.toLowerCase()
      .replace(/\s+/g,'-')
      .replace(/[^a-z0-9-]/g,'');
  }
});

// Validación de comentarios
Comment.beforeCreate(comment => {
  comment.body = comment.body.trim();
  if (comment.body.length < 3) {
    throw new Error('Comment must be at least 3 characters');
  }
});
```

## 📊 Monitoreo y Debugging

### Logging de SQL
```env
DB_LOGGING=true  # Ver todas las consultas SQL
```

### Health Check Detallado
```bash
curl http://localhost:3000/health
```
Retorna:
- Estado de conexión a BD
- Conteo de registros por tabla
- Tiempo de respuesta
- Uptime del servidor

## 🚨 Solución de Problemas

### Error: ECONNREFUSED (MySQL no conecta)
```bash
# Windows
net start mysql80

# Linux/Mac
sudo systemctl start mysql
# o
brew services start mysql
```

### Error: ER_ACCESS_DENIED_ERROR 
- Verificar credenciales en `.env`
- Comprobar usuario y permisos MySQL

### Error: ER_BAD_DB_ERROR
```sql
CREATE DATABASE mini_learning_platform;
```

### Error: Port already in use
```bash
# Cambiar puerto en .env
PORT=3001

# O encontrar y terminar proceso
lsof -ti:3000 | xargs kill -9
```

### Limpiar y reinstalar
```bash
# Limpiar módulos
rm -rf node_modules package-lock.json
npm install

# Reset completo de BD
# Cambiar en .env: DB_SYNC=force
npm run dev
```

## 📈 Roadmap y Extensiones

### Funcionalidades futuras:
- [ ] **Autenticación JWT** para endpoints protegidos
- [ ] **Upload de archivos** para recursos de lecciones
- [ ] **Sistema de calificaciones** más complejo
- [ ] **Notificaciones** para comentarios
- [ ] **Dashboard analytics** para instructores
- [ ] **Certificados** al completar cursos
- [ ] **Categorías** para organizar cursos

### Optimizaciones técnicas:
- [ ] **Redis caching** para consultas frecuentes  
- [ ] **Rate limiting** por usuario/IP
- [ ] **Elasticsearch** para búsqueda full-text
- [ ] **Docker containers** para deployment
- [ ] **CI/CD pipeline** con tests automatizados

## 👥 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de código:
- **ESLint** para linting
- **Prettier** para formateo
- **Conventional Commits** para mensajes
- **Tests unitarios** para nuevas funcionalidades

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👤 Autor

**SV43123322** - Mini Learning Platform API  
Hackaton Case ABC - Full Stack JavaScript Development

---

## 📞 Soporte Técnico

### Si encuentras problemas:
1. **Revisa los logs** del servidor y base de datos
2. **Verifica configuración** en `.env`
3. **Prueba endpoints** con la colección Postman
4. **Consulta troubleshooting** en este README
5. **Revisa issues** en el repositorio

### Recursos útiles:
- [Sequelize Documentation](https://sequelize.org/)
- [Express.js Guide](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Postman Learning Center](https://learning.postman.com/)

**¡Happy Learning! 🎓✨**