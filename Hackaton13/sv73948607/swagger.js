
const swaggerJsdoc=require("swagger-jsdoc")
const swaggerUi=require("swagger-ui-express")

const options={
definition:{
    openapi:"3.0.0",
    info:{
       title:"hackaton13",
       version:"1.0.0",
       description:"Documentacion con sawwger primera"
    },
    servers:[
        {
            url:`http://localhost:${process.env.PORT}`
        }
    ],
    components: {     
    securitySchemes: {
        tokenAuth: {    
            type: "apiKey",
            in: "header",
            name: "x-token" 
        }
    }
}
},
apis:["./src/routes/*.js","./controllers/*.js","./server.js"]
}

const specs=swaggerJsdoc(options)

module.exports={
    swaggerUi,
    specs
}