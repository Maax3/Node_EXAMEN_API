const router = require('express').Router();
const faltasController = require('../controller/faltasController');

/*-----------------------------------------------------------------------------
  Las rutas que ya reciben el JSON del controlador
  El test de rutas esta en el archivo rutas_test.rest usando la extension REST
-------------------------------------------------------------------------------*/

router.post('/faltas/crear/:id', faltasController.ponerFaltaAlumno);
router.get('/faltas/:id', faltasController.listarFaltaAlumno);
router.delete('/faltas/borrar/:id', faltasController.borrarFalta);
router.put('/faltas/justificar/:id', faltasController.justificarFaltaAlumno);
router.get('/faltas/seleccionar/:id', faltasController.seleccionarFaltaAlumno);

module.exports = router;