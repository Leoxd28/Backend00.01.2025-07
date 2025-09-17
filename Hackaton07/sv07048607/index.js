 
console.log("hola aa  aa  aa  aa ")
let http = require("http")
let url = require("url")
let axios   =require("axios")
const { error } = require("console")
const PORT = 2500
const API_KEY = "dc55f6961d4986baa6b952f0438079db"
const server= http.createServer(async(req,res)=>{
    let q = url.parse(req.url,true)
    let tipo=q.pathname

switch (tipo) {
 
case "/github-user":
        const query=q.query
       const username = query.user
        options={
        method:"GET",  
        url:`https://api.github.com/users/${username}`,
        headers:{'Accept': 'application/vnd.github.v3+json'}
          } 
          try{
              const response = await axios.request(options)
              const data=response.data;
            
    res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head>
                            <title>Usuario GitHub: ${username}</title>
                        </head>
                        <body>
                            <h1>${data.login}</h1>
                            <img src="${data.avatar_url}" width="150" />
                            <p>Nombre: ${data.name || "No disponible"}</p>
                            <p>Repositorios públicos: ${data.public_repos}</p>
                            <p>Seguidores: ${data.followers}</p>
                            <p>Siguiendo: ${data.following}</p>
                            <p>URL: <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
                        </body>
                    </html>
                `);

            } catch (error) {
                console.error(error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
               res.end("Error al obtener datos de GitHub");
            }
        break;
        
         case "/clima":
                console.log("clima")
                const {lat,lon}=q.query
                const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
                const data =response.data
          res.writeHead(200,{"Content-Type":"text/html"})
          res.end(JSON.stringify(data,null,2))
                
         break;
    
         case"/dolar":
                 console.log("dolar")
                 const{month,year}=q.query
                 const response2=await axios.get(`https://api.decolecta.com/v1/tipo-cambio/sunat?month=${month}&year=${year}`,
                 {headers:{
                    Authorization:`Bearer sk_10199.jlBEstvdKrc2hfvsYfvOHwg6zGYDmEBc`
                 }})
                 const data2 =response2.data
                 res.writeHead(200,{"Content-Type":"text/html"})
                 res.end(JSON.stringify(data2,null,2))
         break;

         case"/pokemon":
         console.log("pokemon")
         const{pokemon}=q.query
        try{const response3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const data3 = response3.data
        res.writeHead(200,{"Content-Type":"Text/html"})
        res.end(JSON.stringify(data3,null,2))}
        catch(error){
            console.log(pokemon)
        } 
        case"/pokemonpoderes":
        console.log("pokemonpoderes")
        const{raza}=q.query
        try{const response4 =await axios.get(`https://pokeapi.co/api/v2/pokemon/${raza}`)
         const abilities=response4.data.abilities
         res.writeHead(200,{"Content-Type":"Text/html"})
         res.end(JSON.stringify(abilities,null,2))
        }
         catch(error){
            console.log(raza)
         }
        break;
        case"/principalesrickymorty":
        console.log("princiaples")
        try{
        const response5 =await axios.get("https://rickandmortyapi.com/api/character")
        const data5 =response5.data
        res.writeHead(200,{"Content-Type":"Text/html"})
        res.end(JSON.stringify(data5,null,2))}
        catch(error){
            console.log("hola   ")
        }
        case"/personajerickymorty":
        console.log("personaje")
        const {name,status}=q.query
        try{
         const response6 =await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}&status=${status}`)
         const data6=response6.data
         res.writeHead(200,{"Content-Type":"Text/html"})
        res.end(JSON.stringify(data6,null,2))
        }
        catch(error){
            console.log(name)
        }
        case"/coctel":
        console.log("coctel")
        const {letra}=q.query
        try{
            const response7= await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`)
            const data7=response7.data
            res.writeHead(200,{"Content-Type":"Text/html"})
            res.end(JSON.stringify(data7,null,2))
        }
        catch(error){
            console.log(letra)
        }
        break;

        case "/consultatienda":
           console.log("tienda")
           const {id}= q.query
            try{const response8= await axios.get(`https://fakestoreapi.com/products/${id}`)
            const data8=response8.data
            res.writeHead(200,{"Content-Type":"Text/html"})
            res.end(JSON.stringify(data8,null,2))}
            catch(error){
                console.log(id)
            }
            break;
          case"/fotos":
          console.log("tienda")
          const{tema,orientation}=q.query
          try{
            const response9=await axios.get(`https://api.unsplash.com/search/photos?query=${tema}&orientation=${orientation}&client_id=TGU_OkpsizHuo7m2Nc4JiROjRYleW4d2jWWf0qJTzbc`)
            const data9=response9.data
            res.writeHead(200,{"Content-Type":"Text/html"})
            res.end(JSON.stringify(data9,null,2))
          }
          catch(error){
            console.log(tema)
          }
          case"/citas":
          console.log("citas")
          const{lenguaje,detallado}=q.query
        try{
            const response10=await axios.get(`https://quotes.rest/qod/categories?language=${lenguaje}&detailed=${detallado}`)
            const data10=response10.data
            res.writeHead(200,{"Content-Type":"Text/html"})
            res.end(JSON.stringify(data10,null,2))
        }
        catch(error){
            console.log(lenguaje)
        }
          break;
            default:
        break;
}
})
server.listen(PORT,"localhost",()=>{
    console.log(`Server running at http://localhost:${PORT}/`)
})