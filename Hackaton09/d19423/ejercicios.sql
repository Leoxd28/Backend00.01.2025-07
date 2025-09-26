use sakila;
-- 1. Listar los 10 primeros clientes con nombre y apellido ordenados alfabéticamente.  
select * from customer order by last_name limit 10;

-- 2. Mostrar todas las películas cuyo título empiece con la letra `A`.  
select * from film where title like 'a%';