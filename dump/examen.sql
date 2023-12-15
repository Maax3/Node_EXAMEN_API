CREATE DATABASE IF NOT EXISTS examendwes;
use examendwes;

CREATE TABLE alumnado (
  id_alumno INTEGER UNSIGNED AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  apellidos varchar(100) NOT NULL,
  PRIMARY KEY (id_alumno)
);

CREATE TABLE faltas (
  id_faltas INTEGER UNSIGNED AUTO_INCREMENT,
  moduloprofesional varchar(5) NOT NULL,
  tramohorario varchar(2) NOT NULL,
  diasemana varchar(10) NOT NULL,
  justificada BOOLEAN NOT NULL,
  id_alumno INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY (id_faltas),
  FOREIGN KEY (id_alumno) REFERENCES alumnado (id_alumno)
  ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO alumnado (nombre, apellidos) VALUES ('Manolo', 'Sanchez Ruiz');
INSERT INTO alumnado (nombre, apellidos) VALUES ('Laura', 'Francisco Lantez');
INSERT INTO alumnado (nombre, apellidos) VALUES ('Maria', 'Avellanos Loes');
INSERT INTO alumnado (nombre, apellidos) VALUES ('Pepe', 'Mirena Polluelo');
INSERT INTO alumnado (nombre, apellidos) VALUES ('Javier', 'Dirr Corerrapido');
INSERT INTO alumnado (nombre, apellidos) VALUES ('Francis', 'Tinreros Lopez');

INSERT INTO faltas (moduloprofesional, tramohorario, diasemana, justificada, id_alumno) 
VALUES ('PROG', '1M', 'Lunes', 0, 1);
INSERT INTO faltas (moduloprofesional, tramohorario, diasemana, justificada, id_alumno) 
VALUES ('BD', '2M', 'Martes', 1, 1);
INSERT INTO faltas (moduloprofesional, tramohorario, diasemana, justificada, id_alumno) 
VALUES ('SI', '3M', 'Jueves', 0, 2);
INSERT INTO faltas (moduloprofesional, tramohorario, diasemana, justificada, id_alumno) 
VALUES ('ED', '4M', 'Viernes', 0, 3);
INSERT INTO faltas (moduloprofesional, tramohorario, diasemana, justificada, id_alumno) 
VALUES ('FOL', '2T', 'Miercoles', 1, 4);
INSERT INTO faltas (moduloprofesional, tramohorario, diasemana, justificada, id_alumno) 
VALUES ('FOL', '6M', 'Miercoles', 1, 5);
INSERT INTO faltas (moduloprofesional, tramohorario, diasemana, justificada, id_alumno) 
VALUES ('DIW', '4T', 'Martes', 1, 6);
