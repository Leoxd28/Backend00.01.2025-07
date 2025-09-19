CREATE DATABASE IF NOT EXISTS veterinaria;
use veterinaria;

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

