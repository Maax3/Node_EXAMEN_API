const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();
/*-------------------------
      IMPORT DE RUTAS
---------------------------*/
const indexRouter = require('./routes/index.routes');
const alumnadoRouter = require('./routes/alumnado.routes');
const faltasRouter = require('./routes/faltas.routes');

const app = express();

/*-------------------------
MIDDLEWARES POR DEFECTO DE EXPRESS
---------------------------*/
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Configuracion de rutas para archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

/*-------------------------
          RUTAS
---------------------------*/
app.use('/', indexRouter);
app.use(alumnadoRouter);
app.use(faltasRouter);

/*-------------------------
    MIDDLEWARE DE ERROR
---------------------------*/
app.use((req, res) => res.status(404).json({
  Status: res.statusCode,
  Error: "Esa ruta no existe"
}));

/*-------------------------
    CREACION DEL SERVIDOR
---------------------------*/
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
})

module.exports = app;
