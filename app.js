// Requires
var express = require("express");
var bodyParser = require("body-parser");

// Inicializar variables
var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importacion de Rutas
var appRoutes = require('./routes/app');
var uploadRoutes = require('./routes/upload');

// Rutas
app.use('/upload', uploadRoutes);

app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
  console.log(
    "Express server listening on port 3000: \x1b[32m%s\x1b[0m",
    "online"
  );
});
