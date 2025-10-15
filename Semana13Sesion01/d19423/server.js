require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT || 8080;

app.get('/api/stream',(req,res)=>{
    res.setHeader('Content-Type', 'text/event-stream');
    res.flushHeaders?.();
    let i = 0;
    const t = setInterval(()=>{
        res.write(`data: ${JSON.stringify({tick: ++i})}\n\n`)
        if(i===10){
            clearInterval(t);
            res.end();
        }
    }, 1000)
})

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})