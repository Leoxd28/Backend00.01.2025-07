use sakila;
/*listar los 10 primeros clientes con nombre y apellido ordenados alfabeticamente*/
SELECT first_name, last_name
FROM customer
ORDER BY last_name, first_name
LIMIT 10;
/*Mostrar todas las películas cuyo título empiece con la letra A*/
SELECT title
FROM film
WHERE title LIKE 'A%';
/*Contar cuántas películas hay por cada rating*/
SELECT rating, COUNT(*) AS cantidad_peliculas
FROM film
GROUP BY rating;
/*Mostrar los actores con apellido MONROE*/
SELECT first_name, last_name
FROM actor
WHERE last_name = 'MONROE';
/*Listar las películas y su duración de renta*/
SELECT title, rental_duration
FROM film;
/*Mostrar las películas y su categoría*/
SELECT f.title AS pelicula, c.name AS categoria
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id;
/*Listar los clientes y la ciudad donde viven*/
SELECT cu.first_name AS nombre, cu.last_name AS apellido, ci.city AS ciudad
FROM customer cu
JOIN address a ON cu.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id;
/*Mostrar todas las películas alquiladas por "MARY SMITH"*/
SELECT f.title AS pelicula
FROM customer cu
JOIN rental r ON cu.customer_id = r.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE cu.first_name = 'MARY' AND cu.last_name = 'SMITH';
/*Obtener la lista de actores que trabajaron en la película "ACADEMY DINOSAUR"*/
SELECT a.first_name AS nombre, a.last_name AS apellido
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
JOIN film f ON fa.film_id = f.film_id
WHERE f.title = 'ACADEMY DINOSAUR';
/*Listar empleados y número de rentas que gestionaron*/
SELECT s.first_name AS nombre, s.last_name AS apellido, COUNT(r.rental_id) AS cantidad_rentas
FROM staff s
JOIN rental r ON s.staff_id = r.staff_id
GROUP BY s.staff_id;
/*Calcular el número de películas por cada categoría*/
SELECT c.name AS categoria, COUNT(*) AS cantidad_peliculas
FROM film_category fc
JOIN category c ON fc.category_id = c.category_id
GROUP BY c.name;
/*Mostrar los 10 clientes con más rentas realizadas*/
SELECT cu.first_name AS nombre, cu.last_name AS apellido, COUNT(r.rental_id) AS total_rentas
FROM customer cu
JOIN rental r ON cu.customer_id = r.customer_id
GROUP BY cu.customer_id
ORDER BY total_rentas DESC
LIMIT 10;
/*Mostrar los 5 actores que aparecen en más películas*/
SELECT a.first_name AS nombre, a.last_name AS apellido, COUNT(fa.film_id) AS cantidad_peliculas
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
GROUP BY a.actor_id
ORDER BY cantidad_peliculas DESC
LIMIT 5;
/*Calcular la suma total de pagos por cada cliente*/
SELECT cu.first_name AS nombre, cu.last_name AS apellido, SUM(p.amount) AS total_pagado
FROM customer cu
JOIN payment p ON cu.customer_id = p.customer_id
GROUP BY cu.customer_id
ORDER BY total_pagado DESC;
/*Mostrar el ingreso total generado por cada empleado*/
SELECT s.first_name AS nombre, s.last_name AS apellido, SUM(p.amount) AS ingreso_total
FROM staff s
JOIN payment p ON s.staff_id = p.staff_id
GROUP BY s.staff_id
ORDER BY ingreso_total DESC;
/*Clientes que han gastado más que el promedio de todos los clientes*/
SELECT cu.first_name, cu.last_name, SUM(p.amount) AS total_gastado
FROM customer cu
JOIN payment p ON cu.customer_id = p.customer_id
GROUP BY cu.customer_id
HAVING total_gastado > (
    SELECT AVG(total)
    FROM (
        SELECT SUM(amount) AS total
        FROM payment
        GROUP BY customer_id
    ) AS subquery
);
/*Películas cuyo precio de renta es mayor que el promedio*/
SELECT title, rental_rate
FROM film
WHERE rental_rate > (
    SELECT AVG(rental_rate)
    FROM film
);
/*Actores que trabajaron en las mismas películas que "NICK WAHLBERG"*/
SELECT DISTINCT a2.first_name, a2.last_name
FROM actor a1
JOIN film_actor fa1 ON a1.actor_id = fa1.actor_id
JOIN film_actor fa2 ON fa1.film_id = fa2.film_id
JOIN actor a2 ON fa2.actor_id = a2.actor_id
WHERE a1.first_name = 'NICK' AND a1.last_name = 'WAHLBERG'
  AND a2.actor_id != a1.actor_id;
/*Películas que nunca han sido rentadas*/
SELECT f.title
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.rental_id IS NULL;
/*Clientes que nunca han realizado un pago*/
SELECT cu.first_name, cu.last_name
FROM customer cu
LEFT JOIN payment p ON cu.customer_id = p.customer_id
WHERE p.payment_id IS NULL;
/*Número de rentas por mes y año*/
SELECT 
  YEAR(r.rental_date) AS año,
  MONTH(r.rental_date) AS mes,
  COUNT(*) AS cantidad_rentas
FROM rental r
GROUP BY año, mes
ORDER BY año, mes;
/*Promedio de duración de renta por mes*/
SELECT 
  YEAR(r.rental_date) AS año,
  MONTH(r.rental_date) AS mes,
  AVG(DATEDIFF(r.return_date, r.rental_date)) AS promedio_dias_renta
FROM rental r
WHERE r.return_date IS NOT NULL
GROUP BY año, mes
ORDER BY año, mes;
/*Día de la semana con más rentas*/
SELECT 
  DAYNAME(r.rental_date) AS dia_semana,
  COUNT(*) AS cantidad_rentas
FROM rental r
GROUP BY dia_semana
ORDER BY cantidad_rentas DESC
LIMIT 1;
/*Cliente que hizo la primera renta*/
SELECT cu.first_name, cu.last_name, r.rental_date
FROM rental r
JOIN customer cu ON r.customer_id = cu.customer_id
ORDER BY r.rental_date ASC
LIMIT 1;
/*Ingreso generado por cada año*/
SELECT 
  YEAR(p.payment_date) AS año,
  SUM(p.amount) AS ingreso_total
FROM payment p
GROUP BY año
ORDER BY año;
/*Categorías con más de 60 películas*/
SELECT c.name AS categoria, COUNT(*) AS cantidad_peliculas
FROM film_category fc
JOIN category c ON fc.category_id = c.category_id
GROUP BY c.name
HAVING COUNT(*) > 60;
/*Clientes con más de 30 rentas*/
SELECT cu.first_name, cu.last_name, COUNT(r.rental_id) AS total_rentas
FROM customer cu
JOIN rental r ON cu.customer_id = r.customer_id
GROUP BY cu.customer_id
HAVING total_rentas > 30
ORDER BY total_rentas DESC;
/*Películas rentadas más de 50 veces*/
SELECT f.title, COUNT(r.rental_id) AS veces_rentada
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id
HAVING veces_rentada > 50
ORDER BY veces_rentada DESC;
/*Actores que participan en más de 20 películas*/
SELECT a.first_name, a.last_name, COUNT(fa.film_id) AS cantidad_peliculas
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
GROUP BY a.actor_id
HAVING cantidad_peliculas > 20
ORDER BY cantidad_peliculas DESC;
/*Ciudades con más de 10 clientes registrados*/
SELECT ci.city, COUNT(cu.customer_id) AS cantidad_clientes
FROM customer cu
JOIN address a ON cu.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
GROUP BY ci.city
HAVING cantidad_clientes > 10
ORDER BY cantidad_clientes DESC;
/*Películas en las categorías Action o Comedy*/
SELECT f.title, c.name AS categoria
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE c.name IN ('Action', 'Comedy');
/*Películas en todas las categorías menos Horror*/
SELECT f.title
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE f.film_id NOT IN (
    SELECT fc.film_id
    FROM film_category fc
    JOIN category c ON fc.category_id = c.category_id
    WHERE c.name = 'Horror'
);
/*Clientes que alquilaron películas de Action pero no de Horror*/
SELECT DISTINCT cu.first_name, cu.last_name
FROM customer cu
JOIN rental r ON cu.customer_id = r.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film_category fc ON i.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Action'
AND cu.customer_id NOT IN (
    SELECT cu2.customer_id
    FROM customer cu2
    JOIN rental r2 ON cu2.customer_id = r2.customer_id
    JOIN inventory i2 ON r2.inventory_id = i2.inventory_id
    JOIN film_category fc2 ON i2.film_id = fc2.film_id
    JOIN category c2 ON fc2.category_id = c2.category_id
    WHERE c2.name = 'Horror'
);
/*Ciudades con clientes pero sin tiendas*/
SELECT DISTINCT ci.city
FROM city ci
JOIN address a ON ci.city_id = a.city_id
JOIN customer cu ON a.address_id = cu.address_id
WHERE ci.city_id NOT IN (
    SELECT a2.city_id
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
);
/*Actores que no han actuado en ninguna película de Children*/
SELECT a.first_name, a.last_name
FROM actor a
WHERE a.actor_id NOT IN (
    SELECT fa.actor_id
    FROM film_actor fa
    JOIN film_category fc ON fa.film_id = fc.film_id
    JOIN category c ON fc.category_id = c.category_id
    WHERE c.name = 'Children'
);
/*Crear un CTE que muestre el total de pagos por cliente y listar los que gastaron más de 100 USD*/
WITH pagos_por_cliente AS (
  SELECT customer_id, SUM(amount) AS total_pagado
  FROM payment
  GROUP BY customer_id
)
SELECT cu.first_name, cu.last_name, p.total_pagado
FROM pagos_por_cliente p
JOIN customer cu ON p.customer_id = cu.customer_id
WHERE p.total_pagado > 100
ORDER BY p.total_pagado DESC;
/*Crear un CTE que muestre las películas más rentadas por categoría*/
WITH rentas_por_pelicula AS (
  SELECT f.film_id, f.title, COUNT(r.rental_id) AS total_rentas
  FROM film f
  JOIN inventory i ON f.film_id = i.film_id
  JOIN rental r ON i.inventory_id = r.inventory_id
  GROUP BY f.film_id
),
peliculas_con_categoria AS (
  SELECT fc.film_id, c.name AS categoria
  FROM film_category fc
  JOIN category c ON fc.category_id = c.category_id
)
SELECT pc.categoria, rp.title, rp.total_rentas
FROM rentas_por_pelicula rp
JOIN peliculas_con_categoria pc ON rp.film_id = pc.film_id
ORDER BY pc.categoria, rp.total_rentas DESC;
/*Usar un CTE para calcular el top 3 de ciudades con más ingresos*/
WITH ingresos_por_ciudad AS (
  SELECT ci.city, SUM(p.amount) AS total_ingresos
  FROM payment p
  JOIN customer cu ON p.customer_id = cu.customer_id
  JOIN address a ON cu.address_id = a.address_id
  JOIN city ci ON a.city_id = ci.city_id
  GROUP BY ci.city
)
SELECT *
FROM ingresos_por_ciudad
ORDER BY total_ingresos DESC
LIMIT 3;
/*Usar un CTE para obtener los empleados que registraron más rentas que el promedio de todos*/
WITH rentas_por_empleado AS (
  SELECT staff_id, COUNT(rental_id) AS total_rentas
  FROM rental
  GROUP BY staff_id
),
promedio_rentas AS (
  SELECT AVG(total_rentas) AS promedio
  FROM rentas_por_empleado
)
SELECT s.first_name, s.last_name, r.total_rentas
FROM rentas_por_empleado r
JOIN staff s ON r.staff_id = s.staff_id
JOIN promedio_rentas p ON r.total_rentas > p.promedio;
/*Crear una tabla derivada con el ranking de películas más alquiladas*/
SELECT f.title, ranking.total_rentas,
       RANK() OVER (ORDER BY ranking.total_rentas DESC) AS posicion
FROM (
  SELECT f.film_id, f.title, COUNT(r.rental_id) AS total_rentas
  FROM film f
  JOIN inventory i ON f.film_id = i.film_id
  JOIN rental r ON i.inventory_id = r.inventory_id
  GROUP BY f.film_id
) AS ranking;
/*Ranking de clientes según monto pagado total*/
WITH pagos_totales AS (
  SELECT customer_id, SUM(amount) AS total_pagado
  FROM payment
  GROUP BY customer_id
)
SELECT 
  cu.first_name, cu.last_name, p.total_pagado,
  RANK() OVER (ORDER BY p.total_pagado DESC) AS posicion
FROM pagos_totales p
JOIN customer cu ON p.customer_id = cu.customer_id;
/*Películas más rentadas con su ranking dentro de cada categoría*/
WITH rentas_por_pelicula AS (
  SELECT f.film_id, f.title, COUNT(r.rental_id) AS total_rentas
  FROM film f
  JOIN inventory i ON f.film_id = i.film_id
  JOIN rental r ON i.inventory_id = r.inventory_id
  GROUP BY f.film_id
),
peliculas_categoria AS (
  SELECT fc.film_id, c.name AS categoria
  FROM film_category fc
  JOIN category c ON fc.category_id = c.category_id
)
SELECT 
  pc.categoria, rp.title, rp.total_rentas,
  RANK() OVER (PARTITION BY pc.categoria ORDER BY rp.total_rentas DESC) AS ranking_categoria
FROM rentas_por_pelicula rp
JOIN peliculas_categoria pc ON rp.film_id = pc.film_id;
/*Ingreso acumulado por cliente en orden cronológico*/
SELECT 
  cu.customer_id,
  cu.first_name, cu.last_name,
  p.payment_date,
  SUM(p.amount) OVER (PARTITION BY cu.customer_id ORDER BY p.payment_date) AS ingreso_acumulado
FROM payment p
JOIN customer cu ON p.customer_id = cu.customer_id
ORDER BY cu.customer_id, p.payment_date;
/*Número total de rentas por cliente y diferencia contra el promedio*/
WITH rentas_por_cliente AS (
  SELECT customer_id, COUNT(*) AS total_rentas
  FROM rental
  GROUP BY customer_id
),
promedio AS (
  SELECT AVG(total_rentas) AS promedio_rentas
  FROM rentas_por_cliente
)
SELECT 
  cu.first_name, cu.last_name, r.total_rentas,
  r.total_rentas - p.promedio_rentas AS diferencia_vs_promedio
FROM rentas_por_cliente r
JOIN customer cu ON r.customer_id = cu.customer_id
JOIN promedio p ON 1=1
ORDER BY diferencia_vs_promedio DESC;
/*Top 5 actores por cantidad de películas usando ROW_NUMBER*/
WITH peliculas_por_actor AS (
  SELECT a.actor_id, a.first_name, a.last_name, COUNT(fa.film_id) AS cantidad_peliculas
  FROM actor a
  JOIN film_actor fa ON a.actor_id = fa.actor_id
  GROUP BY a.actor_id
),
ranking_actores AS (
  SELECT *,
         ROW_NUMBER() OVER (ORDER BY cantidad_peliculas DESC) AS posicion
  FROM peliculas_por_actor
)
SELECT first_name, last_name, cantidad_peliculas, posicion
FROM ranking_actores
WHERE posicion <= 5;
/*Película con el mayor número de actores distintos*/
SELECT f.title, COUNT(DISTINCT fa.actor_id) AS cantidad_actores
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
GROUP BY f.film_id
ORDER BY cantidad_actores DESC
LIMIT 1;
/*Las 5 películas más largas que han sido alquiladas al menos una vez*/
SELECT DISTINCT f.title, f.length
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
ORDER BY f.length DESC
LIMIT 5;
/*Películas con ingreso promedio superior al promedio general*/
WITH ingresos_por_pelicula AS (
  SELECT f.film_id, f.title, SUM(p.amount) AS total_ingreso, COUNT(p.payment_id) AS total_rentas
  FROM film f
  JOIN inventory i ON f.film_id = i.film_id
  JOIN rental r ON i.inventory_id = r.inventory_id
  JOIN payment p ON r.rental_id = p.rental_id
  GROUP BY f.film_id
),
promedios AS (
  SELECT AVG(total_ingreso / total_rentas) AS promedio_general
  FROM ingresos_por_pelicula
)
SELECT i.title, ROUND(i.total_ingreso / i.total_rentas, 2) AS ingreso_promedio
FROM ingresos_por_pelicula i
JOIN promedios p ON (i.total_ingreso / i.total_rentas) > p.promedio_general
ORDER BY ingreso_promedio DESC;
/*Categoría más rentable en total de ingresos*/
SELECT c.name AS categoria, SUM(p.amount) AS ingreso_total
FROM category c
JOIN film_category fc ON c.category_id = fc.category_id
JOIN inventory i ON fc.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY c.category_id
ORDER BY ingreso_total DESC
LIMIT 1;
/*Top 3 clientes más valiosos y las películas que más alquilaron*/
WITH pagos_por_cliente AS (
  SELECT customer_id, SUM(amount) AS total_pagado
  FROM payment
  GROUP BY customer_id
),
top_clientes AS (
  SELECT customer_id
  FROM pagos_por_cliente
  ORDER BY total_pagado DESC
  LIMIT 3
),
peliculas_por_cliente AS (
  SELECT cu.customer_id, f.title, COUNT(*) AS veces_rentada
  FROM customer cu
  JOIN rental r ON cu.customer_id = r.customer_id
  JOIN inventory i ON r.inventory_id = i.inventory_id
  JOIN film f ON i.film_id = f.film_id
  WHERE cu.customer_id IN (SELECT customer_id FROM top_clientes)
  GROUP BY cu.customer_id, f.title
)
SELECT cu.first_name, cu.last_name, p.title, p.veces_rentada
FROM peliculas_por_cliente p
JOIN customer cu ON p.customer_id = cu.customer_id
ORDER BY cu.customer_id, p.veces_rentada DESC;