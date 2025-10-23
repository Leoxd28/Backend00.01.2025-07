use sakila;
-- 1. Listar los 10 primeros clientes con nombre y apellido ordenados alfabéticamente.  
select * from customer order by last_name limit 10;

-- 2. Mostrar todas las películas cuyo título empiece con la letra `A`.  
select * from film where title like 'a%'
-- Contar cuántas películas hay por cada rating.

-- 1) Actores con apellido MONROE
SELECT actor_id, first_name, last_name
FROM actor
WHERE last_name = 'MONROE';

-- 2) Películas y su duración de renta
SELECT film_id, title, rental_duration
FROM film;

-- 3) Películas y su categoría
SELECT f.film_id, f.title, c.name AS category
FROM film f
JOIN film_category fc USING(film_id)
JOIN category c USING(category_id);

-- 4) Clientes y la ciudad donde viven
SELECT cu.customer_id, cu.first_name, cu.last_name, ci.city
FROM customer cu
JOIN address a  USING(address_id)
JOIN city ci    USING(city_id);

-- 5) Todas las películas alquiladas por "MARY SMITH"
SELECT DISTINCT f.film_id, f.title
FROM customer cu
JOIN rental r        USING(customer_id)
JOIN inventory i     USING(inventory_id)
JOIN film f          USING(film_id)
WHERE cu.first_name='MARY' AND cu.last_name='SMITH';

-- 6) Actores que trabajaron en "ACADEMY DINOSAUR"
SELECT a.actor_id, a.first_name, a.last_name
FROM film f
JOIN film_actor fa USING(film_id)
JOIN actor a       USING(actor_id)
WHERE f.title = 'ACADEMY DINOSAUR';

-- 7) Empleados y número de rentas que gestionaron
SELECT s.staff_id, s.first_name, s.last_name, COUNT(*) AS rentals
FROM staff s
LEFT JOIN rental r USING(staff_id)
GROUP BY s.staff_id;

-- 8) Número de películas por cada categoría
SELECT c.name AS category, COUNT(*) AS films
FROM category c
JOIN film_category fc USING(category_id)
GROUP BY c.category_id
ORDER BY films DESC;

-- 9) Top 10 clientes con más rentas
SELECT cu.customer_id, cu.first_name, cu.last_name, COUNT(*) AS rentals
FROM customer cu
JOIN rental r USING(customer_id)
GROUP BY cu.customer_id
ORDER BY rentals DESC
LIMIT 10;

-- 10) Top 5 actores que aparecen en más películas
SELECT a.actor_id, a.first_name, a.last_name, COUNT(*) AS films
FROM actor a
JOIN film_actor fa USING(actor_id)
GROUP BY a.actor_id
ORDER BY films DESC
LIMIT 5;

-- 11) Suma total de pagos por cliente
SELECT cu.customer_id, cu.first_name, cu.last_name, SUM(p.amount) AS total_paid
FROM customer cu
LEFT JOIN payment p USING(customer_id)
GROUP BY cu.customer_id
ORDER BY total_paid DESC;

-- 12) Ingreso total generado por cada empleado
SELECT s.staff_id, s.first_name, s.last_name, SUM(p.amount) AS revenue
FROM staff s
LEFT JOIN payment p USING(staff_id)
GROUP BY s.staff_id
ORDER BY revenue DESC;

-- 13) Clientes que han gastado más que el promedio de todos
WITH tot AS (
  SELECT customer_id, SUM(amount) AS total FROM payment GROUP BY customer_id
),
avgx AS (SELECT AVG(total) AS avg_total FROM tot)
SELECT cu.customer_id, cu.first_name, cu.last_name, t.total
FROM tot t
JOIN avgx a
JOIN customer cu USING(customer_id)
WHERE t.total > a.avg_total
ORDER BY t.total DESC;

-- 14) Películas cuyo precio de renta > promedio general
SELECT f.film_id, f.title, f.rental_rate
FROM film f
WHERE f.rental_rate > (SELECT AVG(rental_rate) FROM film);

-- 15) Actores que trabajaron en las mismas películas que "NICK WAHLBERG"
SELECT DISTINCT a2.actor_id, a2.first_name, a2.last_name
FROM actor a1
JOIN film_actor fa1 USING(actor_id)
JOIN film_actor fa2 ON fa2.film_id = fa1.film_id
JOIN actor a2 ON a2.actor_id = fa2.actor_id
WHERE a1.first_name='NICK' AND a1.last_name='WAHLBERG'
  AND a2.actor_id <> a1.actor_id
ORDER BY a2.last_name, a2.first_name;

-- 16) Películas que nunca han sido rentadas
SELECT f.film_id, f.title
FROM film f
LEFT JOIN inventory i USING(film_id)
LEFT JOIN rental r USING(inventory_id)
WHERE r.rental_id IS NULL;

-- 17) Clientes que nunca han realizado un pago
SELECT cu.customer_id, cu.first_name, cu.last_name
FROM customer cu
LEFT JOIN payment p USING(customer_id)
WHERE p.payment_id IS NULL;

-- 18) Número de rentas por mes y año
SELECT YEAR(rental_date) AS y, MONTH(rental_date) AS m, COUNT(*) AS rentals
FROM rental
GROUP BY y, m
ORDER BY y, m;

-- 19) Promedio de duración de renta por mes (según fecha de renta)
SELECT YEAR(rental_date) AS y, MONTH(rental_date) AS m,
       AVG(f.rental_duration) AS avg_duration
FROM rental r
JOIN inventory i USING(inventory_id)
JOIN film f USING(film_id)
GROUP BY y, m
ORDER BY y, m;

-- 20) Día de la semana con más rentas
SELECT DAYNAME(rental_date) AS weekday, COUNT(*) AS rentals
FROM rental
GROUP BY weekday
ORDER BY rentals DESC
LIMIT 1;

-- 21) Cliente que hizo la primera renta en la BD
SELECT cu.customer_id, cu.first_name, cu.last_name, r.rental_date
FROM rental r
JOIN customer cu USING(customer_id)
ORDER BY r.rental_date ASC
LIMIT 1;

-- 22) Ingreso generado por cada año
SELECT YEAR(payment_date) AS year, SUM(amount) AS revenue
FROM payment
GROUP BY year
ORDER BY year;

-- 23) Categorías donde hay más de 60 películas
SELECT c.name, COUNT(*) AS films
FROM category c
JOIN film_category fc USING(category_id)
GROUP BY c.category_id
HAVING COUNT(*) > 60
ORDER BY films DESC;

-- 24) Clientes con más de 30 rentas
SELECT cu.customer_id, cu.first_name, cu.last_name, COUNT(*) AS rentals
FROM customer cu
JOIN rental r USING(customer_id)
GROUP BY cu.customer_id
HAVING COUNT(*) > 30
ORDER BY rentals DESC;

-- 25) Películas rentadas más de 50 veces
SELECT f.film_id, f.title, COUNT(*) AS rentals
FROM film f
JOIN inventory i USING(film_id)
JOIN rental r USING(inventory_id)
GROUP BY f.film_id
HAVING COUNT(*) > 50
ORDER BY rentals DESC;

-- 26) Actores que participan en más de 20 películas
SELECT a.actor_id, a.first_name, a.last_name, COUNT(*) AS films
FROM actor a
JOIN film_actor fa USING(actor_id)
GROUP BY a.actor_id
HAVING COUNT(*) > 20
ORDER BY films DESC;

-- 27) Ciudades con más de 10 clientes registrados
SELECT ci.city, COUNT(*) AS customers
FROM city ci
JOIN address a USING(city_id)
JOIN customer cu USING(address_id)
GROUP BY ci.city_id
HAVING COUNT(*) > 10
ORDER BY customers DESC;

-- 28) Películas en categorías Action o Comedy
SELECT f.film_id, f.title, c.name AS category
FROM film f
JOIN film_category fc USING(film_id)
JOIN category c USING(category_id)
WHERE c.name IN ('Action','Comedy');

-- 29) Películas en todas las categorías menos Horror
-- Nota: en Sakila cada film tiene UNA sola categoría,
-- así que esto equivale a "películas cuya categoría <> 'Horror'".
SELECT f.film_id, f.title
FROM film f
JOIN film_category fc USING(film_id)
JOIN category c USING(category_id)
WHERE c.name <> 'Horror';

-- 30) Clientes que alquilaron Action pero no Horror
WITH act AS (
  SELECT DISTINCT customer_id
  FROM rental r
  JOIN inventory i USING(inventory_id)
  JOIN film_category fc USING(film_id)
  JOIN category c USING(category_id)
  WHERE c.name='Action'
),
hor AS (
  SELECT DISTINCT customer_id
  FROM rental r
  JOIN inventory i USING(inventory_id)
  JOIN film_category fc USING(film_id)
  JOIN category c USING(category_id)
  WHERE c.name='Horror'
)
SELECT cu.customer_id, cu.first_name, cu.last_name
FROM customer cu
JOIN act a USING(customer_id)
LEFT JOIN hor h USING(customer_id)
WHERE h.customer_id IS NULL;

-- 31) Ciudades que tienen clientes pero no tiendas
SELECT DISTINCT ci.city
FROM city ci
JOIN address a USING(city_id)
JOIN customer cu USING(address_id)
WHERE ci.city_id NOT IN (
  SELECT a2.city_id
  FROM store s
  JOIN address a2 ON s.address_id = a2.address_id
);

-- 32) Actores que NO han actuado en ninguna película de Children
SELECT a.actor_id, a.first_name, a.last_name
FROM actor a
WHERE NOT EXISTS (
  SELECT 1
  FROM film_actor fa
  JOIN film_category fc USING(film_id)
  JOIN category c USING(category_id)
  WHERE fa.actor_id = a.actor_id
    AND c.name = 'Children'
);

-- 33) CTE: total de pagos por cliente (> 100 USD)
WITH tot AS (
  SELECT customer_id, SUM(amount) AS total
  FROM payment GROUP BY customer_id
)
SELECT cu.customer_id, cu.first_name, cu.last_name, t.total
FROM tot t JOIN customer cu USING(customer_id)
WHERE t.total > 100
ORDER BY t.total DESC;

-- 34) CTE: películas más rentadas por categoría
WITH rents AS (
  SELECT c.name AS category, f.film_id, f.title, COUNT(*) AS rentals
  FROM category c
  JOIN film_category fc USING(category_id)
  JOIN film f USING(film_id)
  JOIN inventory i USING(film_id)
  JOIN rental r USING(inventory_id)
  GROUP BY c.name, f.film_id
),
ranked AS (
  SELECT category, film_id, title, rentals,
         RANK() OVER (PARTITION BY category ORDER BY rentals DESC) AS rk
  FROM rents
)
SELECT * FROM ranked WHERE rk = 1 ORDER BY category;

-- 35) CTE: top 3 ciudades con más ingresos
WITH city_rev AS (
  SELECT ci.city, SUM(p.amount) AS revenue
  FROM payment p
  JOIN customer cu USING(customer_id)
  JOIN address a USING(address_id)
  JOIN city ci USING(city_id)
  GROUP BY ci.city
),
ranked AS (
  SELECT city, revenue,
         ROW_NUMBER() OVER (ORDER BY revenue DESC) AS rn
  FROM city_rev
)
SELECT city, revenue FROM ranked WHERE rn <= 3;

-- 36) CTE: empleados con más rentas que el promedio
WITH cnt AS (
  SELECT staff_id, COUNT(*) AS rentals FROM rental GROUP BY staff_id
),
avgx AS (SELECT AVG(rentals) AS av FROM cnt)
SELECT s.staff_id, s.first_name, s.last_name, c.rentals
FROM cnt c JOIN avgx a JOIN staff s USING(staff_id)
WHERE c.rentals > a.av;

-- 37) Tabla derivada: ranking de películas más alquiladas
SELECT x.film_id, x.title, x.rentals,
       RANK() OVER (ORDER BY x.rentals DESC) AS rk
FROM (
  SELECT f.film_id, f.title, COUNT(*) AS rentals
  FROM film f
  JOIN inventory i USING(film_id)
  JOIN rental r USING(inventory_id)
  GROUP BY f.film_id
) AS x
ORDER BY rk
;

-- 38) Ranking de clientes según monto pagado total
SELECT customer_id, first_name, last_name, total_paid, 
       RANK() OVER (ORDER BY total_paid DESC) AS rk
FROM (
  SELECT cu.customer_id, cu.first_name, cu.last_name, SUM(p.amount) AS total_paid
  FROM customer cu
  LEFT JOIN payment p USING(customer_id)
  GROUP BY cu.customer_id
) t
ORDER BY rk;

-- 39) Películas más rentadas con ranking dentro de cada categoría
WITH counts AS (
  SELECT c.name AS category, f.film_id, f.title, COUNT(*) AS rentals
  FROM category c
  JOIN film_category fc USING(category_id)
  JOIN film f USING(film_id)
  JOIN inventory i USING(film_id)
  JOIN rental r USING(inventory_id)
  GROUP BY c.name, f.film_id
)
SELECT category, film_id, title, rentals,
       DENSE_RANK() OVER (PARTITION BY category ORDER BY rentals DESC) AS rk_in_cat
FROM counts
ORDER BY category, rk_in_cat, title;

-- 40) Ingreso acumulado por cliente en orden cronológico
SELECT cu.customer_id, cu.first_name, cu.last_name, p.payment_date, p.amount,
       SUM(p.amount) OVER (
         PARTITION BY cu.customer_id ORDER BY p.payment_date
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM payment p
JOIN customer cu USING(customer_id)
ORDER BY cu.customer_id, p.payment_date;

-- 41) Total de rentas por cliente y diferencia vs promedio
WITH cnt AS (
  SELECT customer_id, COUNT(*) AS rentals FROM rental GROUP BY customer_id
)
SELECT cu.customer_id, cu.first_name, cu.last_name, c.rentals,
       c.rentals - AVG(c.rentals) OVER () AS diff_vs_avg
FROM cnt c
JOIN customer cu USING(customer_id)
ORDER BY c.rentals DESC;

-- 42) Top 5 actores por cantidad de películas (ROW_NUMBER)
WITH tally AS (
  SELECT a.actor_id, a.first_name, a.last_name, COUNT(*) AS films
  FROM actor a
  JOIN film_actor fa USING(actor_id)
  GROUP BY a.actor_id
),
ranked AS (
  SELECT *, ROW_NUMBER() OVER (ORDER BY films DESC, actor_id) AS rn
  FROM tally
)
SELECT actor_id, first_name, last_name, films
FROM ranked
WHERE rn <= 5
ORDER BY films DESC;

-- 43) Película con mayor número de actores distintos
SELECT f.film_id, f.title, COUNT(DISTINCT fa.actor_id) AS actors
FROM film f
JOIN film_actor fa USING(film_id)
GROUP BY f.film_id
ORDER BY actors DESC
LIMIT 1;

-- 44) 5 películas más largas alquiladas al menos una vez
SELECT DISTINCT f.film_id, f.title, f.length
FROM film f
JOIN inventory i USING(film_id)
JOIN rental r USING(inventory_id)
ORDER BY f.length DESC, f.title
LIMIT 5;

-- 45) Ingreso promedio por película, mostrando las que superan el promedio general
WITH rev AS (
  SELECT f.film_id, f.title, COALESCE(SUM(p.amount),0) AS revenue
  FROM film f
  LEFT JOIN inventory i USING(film_id)
  LEFT JOIN rental r USING(inventory_id)
  LEFT JOIN payment p USING(rental_id)
  GROUP BY f.film_id
)
SELECT film_id, title, revenue
FROM rev
WHERE revenue > (SELECT AVG(revenue) FROM rev)
ORDER BY revenue DESC;

-- 46) Categoría más rentable (ingresos totales)
SELECT c.name AS category, SUM(p.amount) AS revenue
FROM category c
JOIN film_category fc USING(category_id)
JOIN inventory i USING(film_id)
JOIN rental r USING(inventory_id)
JOIN payment p USING(rental_id)
GROUP BY c.category_id
ORDER BY revenue DESC
LIMIT 1;

-- 47) Top 3 clientes más valiosos y la(s) película(s) que más alquilaron
WITH top3 AS (
  SELECT customer_id, SUM(amount) AS total_paid,
         RANK() OVER (ORDER BY SUM(amount) DESC) AS rk
  FROM payment GROUP BY customer_id
),
cust_films AS (
  SELECT r.customer_id, f.film_id, f.title, COUNT(*) AS rentals,
         ROW_NUMBER() OVER (PARTITION BY r.customer_id ORDER BY COUNT(*) DESC, f.film_id) AS rn
  FROM rental r
  JOIN inventory i USING(inventory_id)
  JOIN film f USING(film_id)
  GROUP BY r.customer_id, f.film_id
)
SELECT cu.customer_id, cu.first_name, cu.last_name, t.total_paid,
       cf.title AS top_film, cf.rentals
FROM top3 t
JOIN customer cu USING(customer_id)
JOIN cust_films cf ON cf.customer_id = t.customer_id AND cf.rn = 1
WHERE t.rk <= 3
ORDER BY t.total_paid DESC;