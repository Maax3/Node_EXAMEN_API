# Examen práctico de una API.

Examen práctico de una API en la asignatura de Entornos de Servidor. Realizada con Node.js y Express. Sin vistas.

## Descripción del examen.

Desarrollar una aplicación web para la gestión de datos de un cliente sobre un sistema de control de asistencia a clase en el centro Celia Viñas. La aplicación se debe basar en el patrón ``MVC`` en la parte del __backend__ y la información se guardará en una base de datos de 2 tablas llamadas 'alumnado' y 'faltas'. *El desarrollo de la vista es opcional.*

| Implementar las siguientes rutas | Descripción |
| --------------------------------- | -----------|
| Mostrar alumnos | Realiza una operación SELECT sobre la tabla de alumnado devolviendo todos los registros. |
| Insertar alumnos | Realiza una operación INSERT sobre la tabla de alumnado que permita crear un alumno. |
| Modificar alumnos | Realiza una operación PUT que modifique los datos del alumno. |
| Borrar alumnos | Realiza una operación DELETE que a partir de la ID alumno permita borrar al alumno y sus faltas de la base de datos. |
| Mostrar faltas | Realiza una consulta SELECT que liste todas las faltas. |
| Poner falta | Realiza una operación INSERT para crear un nuevo registro que añada una falta a un determinado alumno. |
| Justificar una falta | Realiza un PUT para poder cambiar el valor BOOLEAN de FALSE a TRUE. |
| Borrar las faltas | Dado un ID de falta realiza una operacion DELETE para eliminarla de la tabla falta. |
| Mostrar una unica falta con nombre del alumno | Dado un ID realiza una operación SELECT para devolver los datos de un registro de la tabla falta. |
| Mostrar un alumno individualmente | Dado un ID de alumno, realiza una operación SELECT para devolver sus datos. |

## Configuración.

Todas las rutas se encuentran en el archivo ``rutas_test.rest``. Se puede usar la extension VScode ``__REST__`` para comprobar las rutas directamente desde el archivo.

El archivo funciona con el docker-compose donde carga la base de datos automaticamente. El script SQL se encuentra en la carpeta __dump__.

Para abrir el proyecto hace falta usar:
* ``docker-compose up -d``: para lanzar el proyecto.
* ``docker-compose down -v``: para reiniciar la base de datos (-v elimina los volumenes que crea docker).
* ``NPM INSTALL``:  dentro de la carpeta __miApi__ para instalar las dependencias.

## Comprobaciones de rutas.

No he añadido como ejemplo todas las rutas posibles pero la API usa bloques ``try-catch`` para dar siempre una respuesta de __'fallo'__ o __'ok'__.

## Detalles de la implementación.

* He añadido la librería ``dotenv`` para usar las __variables de entorno__ donde están definidas las credenciales de la base de datos y el PUERTO del servidor.
* La carpeta ``HTTP`` no existe porque he optado por el método __app.listen()__ que ofrece Express para crear un servidor directamente en el archivo __app.js__.
* Dentro de los try-catch los metodos devuelven una respuesta con un ``status``según __corresponda__ 
* Se usa el método ``res.json()`` para convertir todo lo que reciba a ``JSON`` de forma automática. Es decir, así evito tener que especificar las cabeceras y usar métodos como "STRINGFY" para mostrar la respuesta en formato ``JSON``.


### Extension REST

![extension](img/imgREST.png)

### Ejemplo codigo ruta 1

![](img/img1.png)

### Ejemplo codigo ruta 2

![](img/img2.png)
