const mongoose = require('mongoose');

const uri = 'mongodb+srv://leocode0312:leonardo@a20101158.4heioul.mongodb.net/A20101158?retryWrites=true&w=majority&appName=A20101158';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado exitosamente a MongoDB Atlas (Base de datos: A20101158)'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

module.exports = mongoose;
