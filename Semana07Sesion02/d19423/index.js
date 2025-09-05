console.log("Inicio de la aplicacion");
let http = require("http");
const PORT = 8000

const server = http.createServer((req, res) => {
    console.log("Llego una peticion")
    res.writeHead(200,{ 'Content-Type': 'text/text' });
    res.end("<h1>Hola desde el servidor</h1>");
});

server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});