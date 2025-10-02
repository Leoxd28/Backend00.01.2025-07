npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,passwordHash:string,role:enum:'{admin,instructor,student}'

npx sequelize-cli model:generate --name Course --attributes title:string,slug:string,description:text,published:boolean,ownerId:integer

npx sequelize-cli model:generate --name Lesson --attributes title:string,slug:string,body:text,order:integer,courseId:integer

npx sequelize-cli model:generate --name Enrollment --attributes status:enum:'{active,pending}',score:decimal,userId:integer,courseId:integer

npx sequelize-cli model:generate --name Comment --attributes body:text,userId:integer,lessonId:integer

**Entidades principales**
- **User**: firstName, lastName, email (único), passwordHash, role ∈ {admin, instructor, student}.
- **Course**: title (único), slug (único), description, published (bool), ownerId → User (instructor).
- **Lesson**: title, slug (único por curso), body, order (int), courseId → Course.
- **Enrollment** (N:M): User ←→ Course con campos: status ∈ {active, pending}, score (decimal, opcional).
- **Comment**: body, userId → User, lessonId → Lesson.