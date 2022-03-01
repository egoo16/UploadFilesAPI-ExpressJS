var express = require("express");

var app = express();

// Libreria para subir archivos
// npm install --save express-fileupload
// https://github.com/richardgirges/express-fileupload
const fileUpload = require("express-fileupload");

app.use(fileUpload());

app.put("/:id", (req, res, next) => {
  var id = req.params.id;

  
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      mensaje: "No se enviaron archivos",
      errors: { message: "Debe seleccionar un archivo" },
    });
  }

  // Obteniendo el nombre del archivo
  var archivo = req.files.imagen; // .imagen es el nombre de como se esta pidiendo que se envie
  var nombreCortado = archivo.name.split(".");
  var extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Validando Extensiones
  var extensionesPermitidas = ["pdf", "docx"];

  if (extensionesPermitidas.indexOf(extensionArchivo) < 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "Extension no valida",
      errors: {
        message:
          "Las extensiones validas son: " + extensionesPermitidas.join(", "),
      },
    });
  }

  // Nombre de Archivo personalizado
  // Se coloca el id para saber a quien le pertenece, se concatena con un numero random, en este caso milisegundos, para evitar cacheo de archivos y la extension del archivo
  // Ejemplo del nombre del archivo: 19468401-123.pdf
  var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

  // Mover el archivo de la memoria temporal a un path especifico
  var path = `./uploads/${nombreArchivo}`;
  archivo.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al mover archivo",
        errors: err,
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: "Archivo colocado correctamente",
    });
  });
});

module.exports = app;
