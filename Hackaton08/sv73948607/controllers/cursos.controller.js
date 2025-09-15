
const handleData =require('../utils/handleData')

let cursos=[]

exports.traerCursos=(req,res)=>{
  if(req.user.role==="teacher"){
    cursos=handleData.cargarData()
    res.status(200).json(cursos)
  }else{
        res.status(400).json({ message:"no tienes acceso a la informacion"})
    }

    }   
exports.traerCurso=(req,res)=>{
   if(req.user.role==="teacher"){
    cursos=handleData.cargarData()
    let idCurso=req.params.id
    let curso=cursos.find(a=>a.id==req.params.id)
    console.log(idCurso)
    res.status(200).json(curso)
   }else{
    res.status(400).json({message:"No tienes acceso a esa informacion"})
   } 
}    

exports.agregarCurso=(req,res)=>{
  if(req.user.role==="teacher"){
  cursos=handleData.cargarData()
  let cursonew={id:cursos.length+1,nombre:req.body.nombre,alumnos:[]}
cursos.push(cursonew)
if (handleData.guardarData(cursos)) {
  res.status(200).json(cursos)}
  else{
    res.status(404).json("error:datoser")
  }
}else{
  res.status(400),json("acceso:no autorizado")
}

}

exports.traeralumnos=(req,res)=>{
  if(req.user.role==="teacher"){
cursos=handleData.cargarData()
let idCurso=req.params.id
let curso=cursos.find(a=>a.id==req.params.id)
  res.status(200).json(curso.alumnos)
   }
     else{
      res.status(404).json("permisos insuficientes")
     }
  }

exports.crearalumnos=(req,res)=>{
  if (req.user.role==="teacher") {
   cursos=handleData.cargarData()
   let idcurso=req.params.id
   let curso=cursos.find(a=>a.id==req.params.id) 
   let alumnonew={id:curso.alumnos.length+1,nombre:req.body.nombre,nota:req.body.nota}
    curso.alumnos.push(alumnonew)
    if(handleData.guardarData(cursos)){
      res.status(200).json(curso)
    } 
  }
  else{
    res.status(404).json("permiso insuficientes")
  }
}


exports.pagina=(req,res)=>{
if (req.user.role==="teacher") {
cursos=handleData.cargarData()
console.log(cursos)
let page=parseInt(req.query.page)
let limit=parseInt(req.query.limit)
let inicio=(page-1)*limit
let fin=page*limit

let pagina=cursos.slice(inicio,fin)
return res.status(200).json(pagina)

}
else{
  cursos=handleData.cargarData()
  res.status(404).json(handleData.cargarData())
}
}

exports.filtrarnota=(req,res)=>{
  if (req.user.role==="teacher") {
    cursos=handleData.cargarData()
    minota=parseInt(req.query.minota)
    orden=req.query.params
  let alumnosarr=[]
   cursos.forEach(a => {
      alumnosarr = alumnosarr.concat(a.alumnos || []);
   });
  let alumnofiltro=alumnosarr.filter(a=>parseInt(a.nota)>=minota)
   alumnofiltro.sort((a,b)=>{
    if(orden==="asc"){
      return parseInt(a.nota)-parseInt(b.nota)
    }else{return b.nota-a.nota}
   })
  res.status(200).json(alumnofiltro)
  }
}

exports.ordenarsegun=(req,res)=>{
  if (req.user.role="teacher") {
    cursos=handleData.cargarData()
     metodo=req.query.metodo
     orden=req.query.orden
    let Arralumnos=[]
    cursos.forEach(a=>{
      Arralumnos=Arralumnos.concat(a.alumnos)
    })
    let filtro=[]
    if (metodo=="id") { 
      filtro=Arralumnos.filter(a=>a.id)
    }else{
      filtro=Arralumnos.filter(a=>a.nota)
    }
     filtro.sort((a,b)=>{
      if (orden=="asc") { 
        return a.nota-b.nota
      }else{ 
        return b.nota-a.nota
      }
     })
    res.status(200).json(filtro)
  }
}

exports.ranking=(req,res)=>{
  if (req.user.role="teacher") {
    cursos=handleData.cargarData()
    let Arrayalumnos=[]
    cursos.forEach(a=>{
      Arrayalumnos=Arrayalumnos.concat(a.alumnos)
    })
   Arrayalumnos.sort((a,b)=>{
    return b.nota-a.nota
   }
   )
   res.status(200).json(Arrayalumnos) 
  }
  
}

exports.exportar=(req,res)=>{
  if(req.user.role==="teacher"){
    cursos=handleData.cargarData()

    filePath=__dirname+"/cursos.json"
    require("fs").writeFileSync(filePath,JSON.stringify(cursos,null,2),"utf-8")
 
    res.download(filePath,"cursos.json",(err)=>{
      if(err){
        res.status(500).send("EROR al descargar ")
      }else{
        require("fs").unlinkSync(filePath)
      }
    })
  }else{
    res.status(403).send("no autorizad")
  }
}
exports.dashboard=(req,res)=>{
  if (req.user.role==="teacher") {
    cursos=handleData.cargarData()
   let total=[]
    let totalcursos=cursos.length
   total.push(totalcursos)
    let alumnoscant=[]
    let suma = 0
    cursos.forEach(a=>{
      alumnoscant=alumnoscant.concat(a.alumnos)
    })
   let totalalumnos=alumnoscant.length
   total.push(totalalumnos)
   alumnoscant.forEach(a=>{
    suma=suma+a.nota
   })
  let promedio=suma/alumnoscant.length
  total.push(promedio)
alumnoscant.sort((a,b)=>{
   return-b.nota-a
})
let mejoralumna=alumnoscant[0].nombre
  total.push(mejoralumna)
 res.status(200).json({cursostotales:totalcursos,alumnostotales:totalalumnos,promediototal:promedio,merjoalumno:mejoralumna})}
res.status(400).json("permiso denegado")
}
//let pagina =0
//cursos.forEach(cursos=> {
//  let curso=a
//  while (limit!==cursopagina.length)
//   { curospagina.push(curso)
//    if(limit==cursopagina.length)
//      pagina=pagina+1
//    if(limit==cursopagina.length && pagina==req.params.pagina ){
//      res.status(200),json.cursopagina
//    }else{
//      cursopagina=[]
//    }
//   }
//  
//  
//});