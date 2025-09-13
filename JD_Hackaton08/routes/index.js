var express = require('express');
var router = express.Router();


/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router; */

// Hackaton 08 - Hora 1 – Setup inicial

router.get('/', function(req, res, next) {
  res.send('Hackatón Express Avanzado');
});

module.exports = router;
