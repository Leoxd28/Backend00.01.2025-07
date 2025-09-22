const fs = require("fs");
const path = require("path");

// const exportData = (req, res) => {
//     const DATA_FILE = path.join(__dirname, "..", "data", "data.json");
    
//     res.download(DATA_FILE, "data.json", (err) => {
//         if (err) {
//             res.status(500).json({error: "Error al descargar el archivo"});
//         }
//     });
// }
const exportData = (req, res) => {
  const DATA_FILE = path.join(__dirname, "..", "data", "data.json");
  const db = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  res.json(db);
};

module.exports = {
    exportData,
};