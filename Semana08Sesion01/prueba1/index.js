let http = require("http")
let url = require("url")
let axios=require("axios")
const PORT = 5000
console.log("Ejecutando archivo:", __filename);
const server = http.createServer(async (req, res) => {
    let q = url.parse(req.url, true);
    let tipo = q.pathname;
    console.log("hola");
    console.log("hola")
switch (tipo) {
    
   case '/github':         
        console.log("funciona")     
        res.writeHead(200,{"Content-Type":"text/plain"})
        res.end("Ruta/github funciona corretamente")
   break;
            
            default:
            res.writeHead(404,{"content-type":"text/plane"
            })
            res.end("Ruta no encontrada")
                break;
            }
        })

server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});  

//"github-user":
//        const query=q.query
//        const username = query.user
//        options={
//        method:"GET",  
//        url:`https://api.github.com/users/${username}`,
//        headers:{'Accept': 'application/vnd.github.v3+json'}
//          }
//          try{
//              const response = await axios.request(options)
//              const data=response.data;
//            
//    res.writeHead(200, { 'Content-Type': 'text/html' });
//                res.end(`
//                    <html>
//                        <head>
//                            <title>Usuario GitHub: ${username}</title>
//                        </head>
//                        <body>
//                            <h1>${data.login}</h1>
//                            <img src="${data.avatar_url}" width="150" />
//                            <p>Nombre: ${data.name || "No disponible"}</p>
//                            <p>Repositorios públicos: ${data.public_repos}</p>
//                            <p>Seguidores: ${data.followers}</p>
//                            <p>Siguiendo: ${data.following}</p>
//                            <p>URL: <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
//                        </body>
//                    </html>
//                `);
//
//            } catch (error) {
//                console.error(error);
//                res.writeHead(500, { 'Content-Type': 'text/plain' });
//                res.end("Error al obtener datos de GitHub");
//            }``