use sakila;

# 1. Consultas Básicas (Calentamiento)
# Listar los 10 primeros clientes con nombre y apellido ordenados alfabéticamente.

    select * from customer order by first_name asc, last_name asc limit 10;

# Mostrar todas las películas cuyo título empiece con la letra A.

    select * from film where title like 'A%';

# Contar cuántas películas hay por cada rating.

    select rating, count(*) as total from film group by rating

# Mostrar los actores con apellido MONROE.

    select * from actor where last_name = 'MONROE';

# Listar las películas y su duración de renta.

    select rental_duration, film_id, title, description from film;
# 2. Joins Intermedios
# Mostrar las películas y su categoría.

    select f.film_id, f.title, f.description, c.category_id, c.name from film_category fc
        join film f on fc.film_id = f.film_id
        join category c on fc.category_id = c.category_id;

# Listar los clientes y la ciudad donde viven.

    select c.last_name, c.first_name, ci.city from customer c
        join address a on c.address_id = a.address_id
        join city ci on a.city_id = ci.city_id;

# Mostrar todas las películas alquiladas por "MARY SMITH".

    select c.last_name, c.first_name, f.title from rental r
        join inventory i on r.inventory_id = i.inventory_id
        join film f on i.film_id = f.film_id
        join customer c on r.customer_id = c.customer_id
    where r.customer_id = 1;

# Obtener la lista de actores que trabajaron en la película "ACADEMY DINOSAUR".

    select a.* from film f
        join film_actor fa on f.film_id = fa.film_id
        join actor a on fa.actor_id = a.actor_id
    where f.title = 'ACADEMY DINOSAUR';

# Listar empleados y número de rentas que gestionaron.

    select s.first_name, s.last_name, count(r.rental_id) from staff s
        join rental r on s.staff_id = r.staff_id
    group by s.staff_id;

# 3. Funciones de Agregación
# Calcular el número de películas por cada categoría.

    select c.name, count(f.film_id) as total_films_category from category c
        join film_category fc on c.category_id = fc.category_id
        join film f on fc.film_id = f.film_id
    group by c.name

# Mostrar los 10 clientes con más rentas realizadas.

    select c.first_name, c.last_name, count(r.rental_id) as total_rentas from customer c
        join rental r on c.customer_id = r.customer_id
    group by c.customer_id
    order by total_rentas desc
    limit 10;

# Mostrar los 5 actores que aparecen en más películas.

    select a.first_name, a.last_name, count(fa.film_id) as total_peliculas from actor a
        join film_actor fa on a.actor_id = fa.actor_id
    group by a.actor_id
    order by total_peliculas desc
    limit 10;

# Calcular la suma total de pagos por cada cliente.

    select c.first_name, c.last_name, sum(p.amount) as total_pagado from customer c
        join payment p on c.customer_id = p.customer_id
    group by c.customer_id
    order by total_pagado desc;

# Mostrar el ingreso total generado por cada empleado.

select s.first_name, s.last_name, sum(p.amount) from staff s
        join payment p on s.staff_id = p.staff_id
    group by s.staff_id;

# 4. Subconsultas
# Listar los clientes que han gastado más que el promedio de todos los clientes.

    select c.first_name, c.last_name, sum(p.amount) as total from customer c
        join payment p on c.customer_id = p.customer_id
    group by c.customer_id
    having total > (
        select AVG(total_cliente) from (select sum(amount) total_cliente from payment group by customer_id)
         t);

# Encontrar las películas cuyo precio de renta sea mayor que el promedio de todas.

    select title, rental_rate from film
        where rental_rate > (select AVG(rental_rate) from film);

# Mostrar los actores que trabajaron en las mismas películas que "NICK WAHLBERG".

    select distinct a.first_name, a.last_name from actor a
        join film_actor fa on a.actor_id = fa.actor_id
    where fa.film_id in (
        select fa2.film_id from actor a2
                 join film_actor fa2 on a2.actor_id = fa2.actor_id
                 where a2.first_name = 'NICK' and a2.last_name = 'WAHLBERG'
        )
    and a.last_name <> 'WAHLBERG';

# Listar las películas que nunca han sido rentadas.

    select f.title from film f
        join inventory i on f.film_id = i.film_id
        join rental r on i.inventory_id = r.inventory_id
    where r.rental_id is null;

# Mostrar los clientes que nunca han realizado un pago.

    select c.first_name, c.last_name from customer c
        left join payment p on c.customer_id = p.customer_id
    where payment_id is null

# 5. Funciones de Fecha
# Listar el número de rentas por mes y año.

    select year(rental_date) anio, month(rental_date) mes, count(*) total from rental
        group by anio, mes
    order by anio, mes;

# Calcular el promedio de duración de renta por mes.

    select year(rental_date) anio, month(rental_date) mes, avg(DATEDIFF(r.return_date, rental_date)) avg_days from rental r
    group by anio, mes;

# Mostrar el día de la semana donde se registraron más rentas.

    select day(rental_date) as day, count(*) total_day from rental
    group by day
    order by total_day desc
    limit 1;

# Encontrar el cliente que hizo la primera renta en la base de datos.

    select * from rental order by rental_id asc limit 1;

# Listar el ingreso generado por cada año.

    select year(payment_date) as anio, sum(amount) from payment
        group by anio
    order by anio;

# 6. HAVING y GROUP BY Avanzado
# Listar las categorías donde haya más de 60 películas.

    select c.name, count(fc.film_id) total from category c
        join film_category fc on c.category_id = fc.category_id
        group by c.name
    having total > 60;

# Mostrar los clientes que hayan hecho más de 30 rentas.

    select c.first_name, c.last_name, count(r.rental_id) total from customer c
        join rental r on c.customer_id = r.customer_id
    group by c.customer_id
    having total > 30;

# Obtener las películas que hayan sido rentadas más de 50 veces.

    select f.title, count(r.rental_id) as total from film f
        join inventory i on f.film_id = i.film_id
        join rental r on i.inventory_id = r.inventory_id
    group by f.film_id
    having total > 50;

# Listar los actores que participan en más de 20 películas.

    select a.first_name, a.last_name, count(fa.film_id) total from actor a
        join film_actor fa on a.actor_id = fa.actor_id
    group by a.actor_id
    having total > 20

# Encontrar las ciudades donde hay más de 10 clientes registrados.

    select c.city_id, count(cu.customer_id) as total from city c
        join address a on c.city_id = a.city_id
        join customer cu on a.address_id = cu.address_id
    group by c.city_id
    having total > 10

# 7. Uniones Avanzadas
# Listar las películas que estén en las categorías Action o Comedy.

    select f.title, c.name from film f
        join film_category fc on f.film_id = fc.film_id
        join category c on fc.category_id = c.category_id
    where c.name in ('Action', 'Comedy')

# Mostrar las películas que estén en todas las categorías menos Horror.

    select f.title from film f
        where f.film_id not in (
            select fc.film_id from film_category fc
                join category c on fc.category_id = c.category_id
            where c.name = 'Horror'
            );

# Obtener los clientes que han alquilado películas de Action pero no de Horror.

    select distinct c.first_name, last_name from customer c
        join rental r on c.customer_id = r.customer_id
        join inventory i on i.inventory_id = r.inventory_id
        join  film_category fc on fc.film_id = i.film_id
        join category ca on fc.category_id = ca.category_id
        where ca.name  = 'Action'
        and c.customer_id not in (
            select c2.customer_id from customer c2
                join rental r2 on c2.customer_id = r2.customer_id
                join inventory i2 on r2.inventory_id = i2.inventory_id
                join film_category fc2 on i2.film_id = fc2.category_id
                join category ca2 on ca2.category_id = fc2.category_id
                where ca2.name = 'Horror'
            );

# Mostrar las ciudades que tienen clientes pero no tienen tiendas.

    select c.city_id from city c
        join address a on c.city_id = a.city_id
        join customer cu on a.address_id = cu.address_id
    where c.city_id not in (
        select distinct a2.city_id from store s
        join address a2 on s.address_id = a2.address_id
        )

# Encontrar los actores que no han actuado en ninguna película de Children.

    select a.first_name, a.last_name from actor a
        where a.actor_id not in (
            select fa.actor_id from film_actor fa
                     join film_category fc on fa.film_id = fc.film_id
                     join category c on fc.category_id = c.category_id
                     where c.name = 'Children'
            )

# 8. CTEs y Derivadas
# Crear un CTE que muestre el total de pagos por cliente y listar los que gastaron más de 100 USD.

    WITH pagos_cliente as (
        select c.customer_id, c.first_name, c.last_name, sum(p.amount) as total from customer c
            join payment p on c.customer_id = p.customer_id
        group by c.customer_id
    )
    select * from pagos_cliente
        where total > 100

# Crear un CTE que muestre las películas más rentadas por categoría.

    WITH rentas_categoria as (
        select c.name AS categoria, f.title, COUNT(r.rental_id) AS total_rentas
        , RANK() OVER (PARTITION BY c.name ORDER BY COUNT(r.rental_id) DESC) AS pos
    from category c
        join film_category fc on fc.category_id = c.category_id
        join film f on fc.film_id = f.film_id
        join inventory i on f.film_id = i.film_id
        join rental r on r.inventory_id = i.inventory_id
    group by c.name, f.title
             )
    SELECT * FROM rentas_categoria
    WHERE pos = 1;

# Usar un CTE para calcular el top 3 de ciudades con más ingresos.

    SELECT ci.city, SUM(p.amount) AS total
    FROM city ci
    JOIN address a ON ci.city_id = a.city_id
    JOIN customer cu ON a.address_id = cu.address_id
    JOIN payment p ON cu.customer_id = p.customer_id
    GROUP BY ci.city

# Usar un CTE para obtener los empleados que registraron más rentas que el promedio de todos.

    SELECT s.staff_id, s.first_name, s.last_name, COUNT(r.rental_id) AS total
    FROM staff s
    JOIN rental r ON s.staff_id = r.staff_id
    GROUP BY s.staff_id;

# Crear una tabla derivada con el ranking de películas más alquiladas.

    select title, total_rentas, RANK() OVER (ORDER BY total_rentas DESC) AS ranking
    from (
        SELECT f.title, COUNT(r.rental_id) AS total_rentas
    FROM film f
        JOIN inventory i ON f.film_id = i.film_id
        JOIN rental r ON i.inventory_id = r.inventory_id
    GROUP BY f.film_id
         ) td;

# 9. Funciones de Ventana (MySQL 8+)
# Mostrar el ranking de clientes según monto pagado total.

    select
        c.first_name, c.last_name, sum(p.amount) as total,
        rank() over (order by sum(p.amount) desc) as ranking
    from customer c
        join payment p on c.customer_id = p.customer_id
    group by c.customer_id;

# Listar las películas más rentadas con su posición de ranking dentro de cada categoría.
# Calcular el ingreso acumulado por cliente en orden cronológico.
# Mostrar el número total de rentas por cliente y la diferencia contra el promedio.
# Listar los top 5 actores por cantidad de películas usando ROW_NUMBER.

# 10. Retos Finales
# Encontrar la película con el mayor número de actores distintos.

    select f.title, count(fa.actor_id) as total_actores
    from film f
        join film_actor fa on f.film_id = fa.film_id
    group by f.film_id
    order by total_actores desc
    limit 1;

# Listar las 5 películas más largas que han sido alquiladas al menos una vez.

    select distinct f.title, f.length
    from film f
        join inventory i on f.film_id = i.film_id
        join rental r on i.inventory_id = r.inventory_id
    order by f.length desc
    limit 5;

# Calcular el ingreso promedio por película, mostrando solo aquellas que superen el promedio general.



# Encontrar la categoría más rentable en total de ingresos.

    select c.name, sum(p.amount) as total_ingresos
    from category c
        JOIN film_category fc ON c.category_id = fc.category_id
        JOIN film f ON fc.film_id = f.film_id
        JOIN inventory i ON f.film_id = i.film_id
        JOIN rental r ON i.inventory_id = r.inventory_id
        JOIN payment p ON r.rental_id = p.rental_id
    group by c.category_id
    order by total_ingresos desc
    limit 1;

# Listar los 3 clientes más valiosos (mayor pago total) y las películas que más alquilaron.

    WITH top_clientes as (
    SELECT c.customer_id, c.first_name, c.last_name, SUM(p.amount) AS total
    FROM customer c
        JOIN payment p ON c.customer_id = p.customer_id
    GROUP BY c.customer_id
    ORDER BY total DESC
    LIMIT 3
)
SELECT tc.first_name, tc.last_name, f.title, COUNT(r.rental_id) AS veces
FROM top_clientes tc
JOIN rental r ON tc.customer_id = r.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
GROUP BY tc.customer_id, f.film_id
ORDER BY tc.last_name, veces DESC;