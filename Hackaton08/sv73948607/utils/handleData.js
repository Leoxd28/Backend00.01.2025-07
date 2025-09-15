let fs = require("fs")



guardarData =(data)=>{
console.log(data)
    try{fs.writeFileSync(process.env.DBFILE,JSON.stringify(data,2,null))
return true
    }
catch(error){
    return error
}
}


cargarData = ()=>{
    
    try {
        if(fs.existsSync(process.env.DBFILE)){
            let data = JSON.parse(fs.readFileSync(process.env.DBFILE));
            return data;
        }else{
            console.log(process.env.DBFILE)
        console.log("asdasdasddc")}
    } catch (error) {
        return error;
    }
    }
    const handleData={guardarData,cargarData}
 module.exports=handleData