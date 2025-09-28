npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,passwordHash:string,role:enum:'{admin,author,reader}'

npx sequelize-cli model:generate --name Post --attributes title:string,slug:string,body:text,published:boolean,authorId:integer
npx sequelize-cli model:generate --name Comment --attributes body:text,postId:integer,userId:integer