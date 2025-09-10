const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Servidor funcionando");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
