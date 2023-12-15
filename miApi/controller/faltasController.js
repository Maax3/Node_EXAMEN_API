const db = require('../database/database');

//Comprueba si un valor (id) es un numero
const esNumero = (valor) => Number(valor);

/*----------------
  LISTAR FALTAS
------------------*/

async function listarFaltaAlumno (req, res) {
  const id = req.params.id;
  try {
    if(!esNumero(id)){
      throw new Error ('La ID no es un numero')
    }
    const [resultado] = await db.query(
      `SELECT moduloprofesional, tramohorario, diasemana, justificada, nombre, apellidos
       FROM faltas
       INNER JOIN alumnado
       ON faltas.id_alumno = alumnado.id_alumno
       WHERE alumnado.id_alumno = ?`,[id]);
    
      console.log(resultado);

      if (resultado.length === 0){
        throw new Error('No existe tal ID')
      }

    return res.status(200).json(resultado);
  } catch (error){
    return res.status(400).json({ Mensaje: "ID mal especificada o no valida", Error: error.message });
  }
} 

/*----------------
  CREAR FALTA
------------------*/

async function ponerFaltaAlumno(req,res) {
  const propiedades = Object.values(req.body);
  const id = req.params.id;
  propiedades.push(id);
  console.log(propiedades);
 try {
//comprobamos que existe la ID
const [alumno] = await db.query(`SELECT id_alumno FROM alumnado WHERE id_alumno = ?`,[id]);
if (alumno[0] === undefined){
    throw new Error('No existe tal ID')
}
const [resultHeader] = await db.query(`
    INSERT INTO faltas (moduloprofesional, tramohorario, diasemana, justificada, id_alumno) 
    VALUES (?, ?, ?, ?, ?)`,[...propiedades]);
console.log(resultHeader);
return res.status(201).json({ Mensaje: "Falta introducida "+resultHeader.insertId });
 } catch(error){
  res.status(400).json({mensaje: error.message})
 }

}

/*----------------
  BORRAR FALTA
------------------*/

async function borrarFalta (req, res) {
  const id = req.params.id;
  try {
    if(!esNumero(id)){
      throw new Error('No es un numero');
    }
    //Comprobamos si existe el id buscado, si es undefined no existe...
    const [falta] = await db.query(`SELECT id_faltas FROM faltas WHERE id_faltas = ?`,[id]);
    if (falta[0] === undefined){
      throw new Error('No existe tal ID')
    }
   
    await db.query(`DELETE FROM faltas WHERE id_faltas = ?`,[id]);
    return res.status(200).json({
      Resultado: `falta ${id} borrada con exito`});
  } catch (error){
    return res.status(400).json({ Status: 'ID mal especificada o no valida', Error: error.message});
  }
}

/*----------------
  Justificar falta
------------------*/

async function justificarFaltaAlumno (req, res) {
  const {justificada} = req.body;
  const id = req.params.id;
  try {
    let consulta = "UPDATE faltas SET justificada=? WHERE id_faltas = ?"
    const [resultHeader] = await db.query(consulta,[justificada, id]);
    console.log(resultHeader);
    if (resultHeader.changedRows === 0){
      throw new Error('La falta ya fue justificada')
    }
    return res.status(200).json(`Falta modificada ${resultHeader.info}`);
  } catch (error){
    return res.status(400).json({ 
      Mensaje: 'Demasiados paremetros o mal introducidos',
      Error: error.message })
  }
} 

/*------------------------------
  Seleccionar la falta del alumno
---------------------------------*/

async function seleccionarFaltaAlumno (req, res) {
  const id = req.params.id;
  try {
    if(!esNumero(id)){
      throw new Error ('La ID no es un numero')
    }
    const [resultado] = await db.query(`
    SELECT * FROM faltas
    INNER JOIN alumnado
    ON alumnado.id_alumno = faltas.id_alumno
    WHERE id_faltas = ?`,[id]);
    return res.status(200).json(resultado);
  } catch (error){
    return res.status(400).json({ Mensaje: "ID mal especificada o no valida", Error: error.message });
  }
} 

module.exports= {
  listarFaltaAlumno,
  ponerFaltaAlumno,
  borrarFalta,
  justificarFaltaAlumno,
  seleccionarFaltaAlumno
}