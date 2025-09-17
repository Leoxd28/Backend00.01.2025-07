const fs = require('fs');
const path = require('path');

// Funciones para .env (guardarData, cargarData)
const guardarData = (data) => {
    try {
        fs.writeFileSync(process.env.DBFILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        return error;
    }
};

const cargarData = () => {
    try {
        if (fs.existsSync(process.env.DBFILE)) {
            let data = JSON.parse(fs.readFileSync(process.env.DBFILE));
            return data;
        }
        return [];
    } catch (error) {
        return error;
    }
};

// Funciones para cursos.json (readCursos, writeCursos)
const DATA_PATH = path.join(__dirname, '..', 'cursos.json');
console.log('Ruta cursos.json:', DATA_PATH);

function readCursos() {
    if (!fs.existsSync(DATA_PATH)) return [];
    const data = fs.readFileSync(DATA_PATH, 'utf-8');

    console.log(data);
    return JSON.parse(data || '[]');
}

console.log(DATA_PATH)

function writeCursos(cursos) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(cursos, null, 2));
}

// Exporta todo en un solo objeto
module.exports = {
    guardarData,
    cargarData,
    readCursos,
    writeCursos
};