const db = require('../database/database');

//Comprueba si un valor (id) es un numero
const esNumero = (valor) => Number(valor);

/*----------------
  LISTAR ALUMNOS
------------------*/

async function listarAlumnado (req, res) {
  const [resultado] = await db.query(`SELECT * FROM alumnado`);
  return res.status(200).json(resultado);
} 

async function seleccionarAlumno (req, res) {
    const id = req.params.id;
    try {
      if(!esNumero(id)){
        throw new Error ('La ID no es un numero')
      }
      const [resultado] = await db.query(`SELECT * FROM alumnado WHERE id_alumno = ?`,[id]);
      return res.status(200).json(resultado);
    } catch (error){
      return res.status(400).json({ Mensaje: "ID mal especificada o no valida", Error: error.message });
    }
} 

/*----------------
  GUARDAR ALUMNO
------------------*/

async function guardarAlumno (req, res) {
  const propiedades = Object.values(req.body);
  try {
    if (propiedades.length !== 2){
      throw new Error;
    }
    const [resultHeader] = await db.query(`INSERT INTO alumnado (nombre,apellidos) VALUES (?,?)`,[...propiedades]);
    console.log(resultHeader);
    return res.status(201).json(`Alumno creado con la id ${resultHeader.insertId}`);
  } catch (error){
    return res.status(400).json({ Mensaje: 'Demasiados paremetros o mal introducidos'})
  }
} 

/*----------------
  BORRAR ALUMNO
------------------*/

async function borrarAlumno (req, res) {
  const id = req.params.id;
  try {
    if(!esNumero(id)){
      throw new Error('No es un numero');
    }
    //Comprobamos si existe el id buscado, si es undefined no existe...
    const [alumno] = await db.query(`SELECT id_alumno FROM alumnado WHERE id_alumno = ?`,[id]);

    if (alumno[0] === undefined){
      throw new Error('No existe tal ID')
    }
    //hacemos una consulta adicional para recuperar los datos de las faltas que han sido borradas 
    const [faltasBorradas] = await db.query(`SELECT * FROM faltas WHERE id_alumno = ?`,[id]);
    await db.query(`DELETE FROM alumnado WHERE id_alumno = ?`,[id]);
    return res.status(200).json({
      Resultado: `Alumno ${id} borrado con exito`, 
      Faltas_Eliminadas: faltasBorradas});
  } catch (error){
    return res.status(400).json({ Status: 'ID mal especificada o no valida', Error: error.message});
  }
} 

/*-------------------------
      EDITAR ALUMNO 
---------------------------*/

async function modificarAlumno (req, res) {
  const {nombre, apellidos} = req.body;
  const propiedades = [nombre, apellidos, req.params.id];
  try {
    let consulta = "UPDATE alumnado SET nombre=?, apellidos=? WHERE id_alumno = ?"
    const [resultHeader] = await db.query(consulta,[...propiedades]);
  
    if (resultHeader.changedRows === 0){
      throw new Error('Este alumno no existe o no has modificado ninguno de sus campos')
    }
    return res.status(200).json(`Alumno modificado ${resultHeader.info}`);
  } catch (error){
    return res.status(400).json({ 
      Mensaje: 'Demasiados parametros o mal introducidos',
      Error: error.message })
  }
} 

module.exports= {
  listarAlumnado,
  seleccionarAlumno,
  guardarAlumno,
  borrarAlumno,
  modificarAlumno
}