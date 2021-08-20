/*Creacion de db*/
create database if not exists zonadeguerradb;

use zonadeguerradb;


/*
Creacion de Tablas
*/

/*Tabla de clientes*/
CREATE TABLE if not exists clientes (cod_cli int  primary key AUTO_INCREMENT, nom_cli varchar(30), ape_cli varchar(30), rut_cli varchar(15), telefono varchar(30), email varchar(30));

/*Tabla de Reservas*/
CREATE TABLE if not exists reservas (cod_reserva int  primary key AUTO_INCREMENT,fec_reserva datetime, cod_cli int);

/*Tabla de usuarios*/
CREATE TABLE if not exists usuarios (cod_usu int  primary key AUTO_INCREMENT, nom_usu  varchar(30), passwd varchar(200), email varchar(30));

CREATE TABLE horarios(cod_horario int primary key AUTO_INCREMENT, horario varchar(30));

/*

Creacion de relaciones

*/

ALTER TABLE reservas add constraint foreign key (cod_cli) references clientes(cod_cli);

/*
Insert Horarios
*/
insert into horarios values(1,"11:00");
insert into horarios values(2,"12:00");
insert into horarios values(3,"13:00");
insert into horarios values(4,"14:00");
insert into horarios values(5,"15:00");
insert into horarios values(6,"16:00");
insert into horarios values(7,"17:00");
insert into horarios values(8,"18:00");
insert into horarios values(9,"19:00");
insert into horarios values(10,"20:00");
