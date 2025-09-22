const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
