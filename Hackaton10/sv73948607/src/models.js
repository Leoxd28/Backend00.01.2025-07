const{DataTypes, Sequelize, TEXT}=require("sequelize");
const sequelize=require("./db");

const User = sequelize.define("user",{
    firstName:{type: DataTypes.STRING,allownull:false},
    lastName: {type: DataTypes.STRING,allownull:false},
    email: {type:DataTypes.STRING,allowNull:false, unique:true},
    passwordHash: {type:DataTypes.STRING,allownull:false},
    role:{type:DataTypes.ENUM("admin","instructor","student"),defaultValue:"student"}},{tableName:"user"
})
 
const course = sequelize.define("course",{
    title:{type:DataTypes.STRING,allowNull:false,unique:true},
    slug:{type:DataTypes.STRING,allowNull:false,unique:true},
    description:{type:DataTypes.TEXT},
    published:{type:DataTypes.BOOLEAN,defaultValue:false}},{tableName:"course"
})

const lesson=sequelize.define("lesson",{
     titlelesson:{type:DataTypes.STRING,allowNull:false},
     sluglesson:{type:DataTypes.STRING,allowNull:false,unique:true},
     bodylesson:{type:DataTypes.TEXT,allowNull:false},
     order:{type:DataTypes.INTEGER}
})

const enrollment=sequelize.define("enrollment",{
    statuss:{type:DataTypes.ENUM("active","pending"),defaultValue:"pending"},
    userId:{type:DataTypes.INTEGER,allowNull:false},
    courseId:{type:DataTypes.INTEGER,allowNull:false},
    score:{type:DataTypes.FLOAT}},{tableName:"enrollment"},
)

const comment=sequelize.define("comment",
    {body:{type:TEXT,allowNull:false}},{tableName:"comment"}
)

User.hasMany(course,{foreignKey:"creatorId"});
course.belongsTo(User,{foreignKey:"creatorId"});

course.hasMany(lesson);
lesson.belongsTo(course);

lesson.hasMany(comment,{foreignKey:"lessonId",as:"comments"});
comment.belongsTo(lesson,{foreignKey:"lessonId",as:"lesson"});

User.hasMany(comment,{foreignKey:"userId",as:"comments"});
comment.belongsTo(User,{foreignKey:"userId", as:"author"});

User.belongsToMany(course,{through:enrollment,as:"enrollmentes",foreignKey:"userId"})
course.belongsToMany(User,{through:enrollment,as:"students",foreignKey:"courseId"})

module.exports={sequelize,User,course,lesson,enrollment,comment}