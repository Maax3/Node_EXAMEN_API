const router = require('express').Router();

/* El index de la API */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
