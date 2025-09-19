CREATE DATABASE IF NOT EXISTS veterinaria;
use veterinaria;


drop table if exists tbl_mascota_vacuna;
drop table if exists tbl_mascota;
drop table if exists tbl_propietario;
drop table if exists tbl_vacuna;
drop table if exists tbl_especie;
drop table if exists tbl_raza;
drop table if exists tbl_color;
drop table if exists tbl_sexo;
drop table if exists tbl_nacionalidad;
drop table if exists tbl_usuario;
-- drop database veterinaria;

CREATE TABLE tbl_usuario (
  id int primary key AUTO_INCREMENT,
  username varchar(100) NOT NULL unique,
  email varchar(100) NOT NULL unique,
  password varchar(255) NOT NULL,
  isActivo bit NOT NULL DEFAULT 1,
  usuarioCreacion int NOT NULL,
  fechaCreacion datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  usuarioModificacion int DEFAULT NULL,
  fechaModificacion datetime DEFAULT NULL,
  FOREIGN KEY(usuarioCreacion) references tbl_usuario(id),
  Foreign key(usuarioModificacion) references tbl_usuario(id)
);

insert into tbl_usuario (username, email, password, usuarioCreacion)
values('rpineda', 'rpineda@x-codec.net', '123456', 1);

select * from tbl_usuario;

create table tbl_nacionalidad(
	id int primary key AUTO_INCREMENT  ,
    descripcion varchar(100) not null,
    isActivo bit not null default 1,
    usuarioCreacion int not null,
    fechaCreacion datetime not null default CURRENT_TIMESTAMP,
    usuarioModificacion int ,
    fechaModificacion datetime,
	FOREIGN KEY(usuarioCreacion) references tbl_usuario(id),
    Foreign key(usuarioModificacion) references tbl_usuario(id)
);

insert into tbl_nacionalidad(descripcion, usuarioCreacion)
values('Peruana', 1);

select * from tbl_nacionalidad;

create table tbl_sexo(
	id int primary key AUTO_INCREMENT  ,
    descripcion varchar(100) not null,
    isActivo bit not null default 1,
    usuarioCreacion int not null,
    fechaCreacion datetime not null default CURRENT_TIMESTAMP,
    usuarioModificacion int ,
    fechaModificacion datetime,
	FOREIGN KEY(usuarioCreacion) references tbl_usuario(id),
    Foreign key(usuarioModificacion) references tbl_usuario(id)
);

insert into tbl_sexo(descripcion, usuarioCreacion)
values('Macho', 1),
('Hembra', 1);

select * from tbl_sexo;



create table tbl_color(
	id int primary key AUTO_INCREMENT  ,
    descripcion varchar(100) not null,
    isActivo bit not null default 1,
    usuarioCreacion int not null,
    fechaCreacion datetime not null default CURRENT_TIMESTAMP,
    usuarioModificacion int ,
    fechaModificacion datetime,
	FOREIGN KEY(usuarioCreacion) references tbl_usuario(id),
    Foreign key(usuarioModificacion) references tbl_usuario(id)
);

insert into tbl_color(descripcion, usuarioCreacion)
values('Blanco', 1),
('Negro', 1);

select * from tbl_color;

create table tbl_raza(
	id int primary key AUTO_INCREMENT  ,
    descripcion varchar(100) not null,
    isActivo bit not null default 1,
    usuarioCreacion int not null,
    fechaCreacion datetime not null default CURRENT_TIMESTAMP,
    usuarioModificacion int ,
    fechaModificacion datetime,
	FOREIGN KEY(usuarioCreacion) references tbl_usuario(id),
    Foreign key(usuarioModificacion) references tbl_usuario(id)
);

insert into tbl_raza(descripcion, usuarioCreacion)
values('Mestizo', 1);

select * from tbl_raza;

create table tbl_especie(
	id int primary key AUTO_INCREMENT  ,
    descripcion varchar(100) not null,
    isActivo bit not null default 1,
    usuarioCreacion int not null,
    fechaCreacion datetime not null default CURRENT_TIMESTAMP,
    usuarioModificacion int ,
    fechaModificacion datetime,
	FOREIGN KEY(usuarioCreacion) references tbl_usuario(id),
    Foreign key(usuarioModificacion) references tbl_usuario(id)
);

insert into tbl_especie(descripcion, usuarioCreacion)
values('Gato', 1);

select * from tbl_especie;

create table tbl_vacuna(
	id int primary key AUTO_INCREMENT  ,
    descripcion varchar(100) not null,
    lote varchar(200) not null,
    isActivo bit not null default 1,
    usuarioCreacion int not null,
    fechaCreacion datetime not null default CURRENT_TIMESTAMP,
    usuarioModificacion int ,
    fechaModificacion datetime,
	FOREIGN KEY(usuarioCreacion) references tbl_usuario(id),
    Foreign key(usuarioModificacion) references tbl_usuario(id)
);

insert into tbl_vacuna(descripcion, lote, usuarioCreacion)
values('Anti-Rabia','000999', 1),
('TripleFelina','000888', 1);

select * from tbl_vacuna;

create table tbl_propietario(
	id int primary key AUTO_INCREMENT  ,
    nombre varchar(100) not null,
    apellido varchar(100) not null,
    telefono varchar(15) not null,
    direccion varchar(255) not null,
    idNacionalidad int not null,
    isActivo bit not null default 1,
    usuarioCreacion int not null,
    fechaCreacion datetime not null default CURRENT_TIMESTAMP,
    usuarioModificacion int ,
    fechaModificacion datetime,
	FOREIGN KEY(usuarioCreacion) references tbl_usuario(id),
    Foreign key(usuarioModificacion) references tbl_usuario(id),
    FOREIGN KEY(idNacionalidad) references tbl_nacionalidad(id)
);

insert into tbl_propietario( nombre, apellido, telefono,direccion,idNacionalidad, usuarioCreacion)
values('Roberto', 'Pineda', '916730940', 'Lince', 1, 1);

select * from tbl_propietario;


create table tbl_mascota(
	id int primary key AUTO_INCREMENT  ,
    nombre varchar(100) not null,
    fechaNacimiento datetime null,
    peso decimal(18,2) not null,
    idEspecie int not null,
    idRaza int not null,
    idColor int not null,
    idSexo int not null,
    idPropietario int not null,
    isActivo bit not null default 1,
    usuarioCreacion int not null,
    fechaCreacion datetime not null default CURRENT_TIMESTAMP,
    usuarioModificacion int ,
    fechaModificacion datetime,
	FOREIGN KEY(usuarioCreacion) references tbl_usuario(id),
    Foreign key(usuarioModificacion) references tbl_usuario(id),
    FOREIGN KEY(idEspecie) references tbl_especie(id),
    FOREIGN KEY(idRaza) references tbl_raza(id),
    FOREIGN KEY(idColor) references tbl_color(id),
    FOREIGN KEY(idSexo) references tbl_sexo(id),
    FOREIGN KEY(idPropietario) references tbl_propietario(id)
);

insert into tbl_mascota(nombre, peso, idEspecie, idRaza, idColor,idSexo,idPropietario, usuarioCreacion)
values('Felipa', 5.45, 1,1,1,1,1,1),
('Pancho', 4.65, 1,1,1,1,1,1);

select * from tbl_mascota;

create table tbl_mascota_vacuna(
	id int primary key AUTO_INCREMENT  ,
    idVacuna int not null,
    idMascota int not null,
    fechaAplicacion datetime not null default CURRENT_TIMESTAMP,
    isActivo bit not null default 1,
    usuarioCreacion int not null,
    fechaCreacion datetime not null default CURRENT_TIMESTAMP,
    usuarioModificacion int ,
    fechaModificacion datetime,
	FOREIGN KEY(usuarioCreacion) references tbl_usuario(id),
    Foreign key(usuarioModificacion) references tbl_usuario(id),
    FOREIGN KEY(idVacuna) references tbl_vacuna(id),
    FOREIGN KEY(idMascota) references tbl_mascota(id)
);

insert into tbl_mascota_vacuna(idVacuna, idMascota,usuarioCreacion)
values(1, 1, 1),
(2,1,1),
(1,2,1),
(2,2,1);

select * from tbl_mascota_vacuna;