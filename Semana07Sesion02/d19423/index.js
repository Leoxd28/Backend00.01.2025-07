console.log("Inicio de la aplicacion");
let http = require("http");
let url = require("url");
let fs = require('fs');
let axios = require("axios");
let JSON2HTMLList = require('json2html-list');
const PORT = 8000

const server = http.createServer(async (req, res) => {
    let q = url.parse(req.url, true);
    let tipo = q.pathname;
    console.log(tipo)
let options = {};
let strHtml = "";
    switch (tipo) {
        case '/peliculas':
            strHtml = `<table>
                <tr>
                    <th>Nombre</th>
                    <th>Imagen</th>
                    <th>Calificacion</th>
                </tr>`
            options = {
                method: 'GET',
                url: 'https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies',
                headers: {
                    'x-rapidapi-key': '73d70d2c28msh7f79106bce6c25ep19a96ajsn943644966186',
                    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
                }
            };
            try {
                const response = await axios.request(options);
                let arrPeliculas = response.data;
                arrPeliculas.forEach(element => {
                    console.log(element)
                    let strPelicula = `<tr>
                        <td>${element.primaryTitle}</td>
                        <td><img src="${element.primaryImage}" width="100px"></img></td>
                        <td>${element.averageRating}</td>
                    </tr>`
                    strHtml += strPelicula;
                });
                strHtml += "</table>"
            } catch (error) {
                console.error(error);
            }
            res.end(strHtml)
            break;
        case '/clima':

            strHtml = "";
            options = {
                method: 'GET',
                url: 'https://open-weather13.p.rapidapi.com/city',
                params: {
                    city: 'Lima',
                    lang: 'ES'
                },
                headers: {
                    'x-rapidapi-key': '73d70d2c28msh7f79106bce6c25ep19a96ajsn943644966186',
                    'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options).then((data)=>{
                   
                    strHtml =  JSON.stringify(data.data)
                    console.log(strHtml)
                });
               
            } catch (error) {
                console.error(error);
            }
            res.end(strHtml)
            break;
        default:
            break;
    }

    // if(req.method === "POST"){
    //     res.end("He creado ul recurso")
    // }
    // else{
    //  res.end(`hola ${q.nombre} ${q.apellido}`)
    // }
    //    let q = url.parse(req.url, true);
    //   let filename = "." + q.pathname;
    //   fs.readFile(filename, function(err, data) {
    //     if (err) {
    //       res.writeHead(404, {'Content-Type': 'text/html'});
    //       return res.end("404 No lo halle");
    //     }

    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.write(data);
    //     return res.end();
    //   });
});

server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});