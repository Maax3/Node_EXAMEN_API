const router = require('express').Router();
const alumnadoController = require('../controller/alumnadoController');

/*-----------------------------------------------------------------------------
  Las rutas que ya reciben el JSON del controlador
  El test de rutas esta en el archivo rutas_test.rest usando la extension REST
-------------------------------------------------------------------------------*/

router.get('/alumnado', alumnadoController.listarAlumnado);
router.get('/alumnado/:id', alumnadoController.seleccionarAlumno);
router.post('/alumnado/crear', alumnadoController.guardarAlumno);
router.delete('/alumnado/borrar/:id', alumnadoController.borrarAlumno);
router.put('/alumnado/editar/:id', alumnadoController.modificarAlumno)

module.exports = router;