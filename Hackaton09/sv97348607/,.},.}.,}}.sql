select * from customer limit 10;

select * from film where title LIke "A%";

select 
c.name AS categoria,
count(*)as total_peliculas
from film f 
join film_category fc on f.film_id = fc.film_id
join category c 
 on fc.category_id=c.category_id
 group by c.name
 order by total_peliculas desc;
 
 select * from actor where last_name like "MONROE";

select title, rental_duration FRom film;

select f.title as peliculas, 
c.name as categoria
from film f
join film_category fc on f.film_id=fc.film_id
join category c 
on fc.category_id=c.category_id;

select  c.first_name as clientes,  ci.city as ciudad
from customer c
join address ad on c.address_id=ad.address_id
join city ci on ad.city_id=ci.city_id;

select c.last_name as apellido 
,c.first_name as nombre
,f.title as pelicula
from film f
join inventory i on f.film_id=i.film_id
join rental r on i.inventory_id=r.inventory_id
join customer c on r.customer_id=c.customer_id
where c.last_name ="SMITH"
and c.first_name="MARY";

select a.first_name as nombre , a.last_name as apellido ,f.title as pelicula
from film f 
join film_actor fa on f.film_id=fa.film_id
join actor a on fa.actor_id=a.actor_id
where f.title="ACADEMY DINOSAUR";

select s.first_name as nombre
, sum(p.amount) as cantidad,st.store_id as tienda
from staff s
join payment p on s.staff_id = p.staff_id
join store st on s.store_id =st.store_id
group by s.staff_id, st.store_id;

select 
c.name as categorias,
count(f.title)as peliculas
from film f 
join film_category fc on f.film_id = fc.film_id
join category c on fc.category_id= c.category_id
group by c.name;

select c.first_name as persona
,count(f.title)as rentado
from film f	
join inventory i on f.film_id = i.film_id
join rental r on i.inventory_id=r.inventory_id
join customer c on r.customer_id=c.customer_id
group by c.first_name
order by rentado desc
limit 10;

select
a.first_name,count(f.title) as peliculas
from film f
join film_actor fa on f.film_id=fa.film_id
join actor a on fa.actor_id=a.actor_id
group by a.first_name
order by peliculas desc
limit 5;

select
c.first_name as clientes, sum(p.amount) as gastado
from store s
join customer c on s.store_id=c.store_id
join payment p on c.customer_id=p.customer_id
group by c.first_name;

select 
s.first_name as empleado , sum(p.amount) as generado
from store st
join staff s on st.store_id=s.store_id
join payment p on s.staff_id=p.customer_id
group by s.first_name;

	WITH total as(
	select
	c.first_name , sum(p.amount) as suma
	from customer c
	join payment p on c.customer_id=p.customer_id 
	group by c.first_name
	)
	select
	suma,first_name
	from total
	having suma>(
	Select AVG(suma2)
	from (
	select sum(p2.amount) as suma2
	from customer c
	join payment p2 on c.customer_id=p2.customer_id	
	group by c.first_name)
    as subconsulta);
	
 select
 title,rental_rate
 from film 
 where rental_rate>(
 select AVG(rental_rate)
 from film);
  
select distinct
a.actor_id,a.first_name,a.last_name
from actor a 
join film_actor fa on  a.actor_id=fa.actor_id
where fa.film_id in(
select fa.film_id
from actor a	
join film_actor fa on a.actor_id=fa.actor_id
where a.first_name="NICK" and a.last_name="WAHLBERG"
)
and a.first_name<>"NICK"
and a.last_name<>"WAHLBERG";

select 
f.title 
from film f
LEFT join inventory i on f.film_id=i.film_id
LEFT join rental r on i.inventory_id=r.inventory_id
where r.rental_id is null;

select 
c.first_name
from store s 
left join customer c on s.store_id=c.store_id
left join payment p on c.customer_id=p.customer_id
where p.amount=0;

select
year(p.payment_date) as anio,
month(p.payment_date) as mes,
count(*) as total_ventas
from payment p
group by year(p.payment_date), month(p.payment_date)
order by anio,mes;

select
month(r.rental_date) as mes,
AVG(datediff(r.return_date,r.rental_date) ) as tiempo_rentado
from rental r 
group by month(r.rental_date);


select
day(r.rental_date) as dia,
AVG(datediff(r.return_date,r.rental_date)) as tiempo_rentado
from rental r
group by day(r.rental_date)
order by tiempo_rentado desc
limit 1;

select
c.first_name as nombre,
year(r.rental_date) as año,
month(r.rental_date) as mes
from  customer c
join rental r on c.customer_id =r.customer_id
where c.customer_id=1
group by year(r.rental_date),month(r.rental_date);

select
sum(p.amount) as pago , year(r.rental_date) as anio
from rental r
join payment p on r.customer_id = p.customer_id
group by year(r.rental_date);

with pelis as(select
 c.name as categoria,count(f.title) as peliculas
from film f
join film_Category fc on f.film_id =fc.film_id
join category c on fc.category_id =c.category_id
group by c.name
)
select
categoria , peliculas
from pelis 
having peliculas>60;

with clientestabla as (
select
c.first_name as cliente , count(r.rental_id) as rentado
from customer c 
join rental r on c.customer_id =r.customer_id
join payment p on r.rental_id =p.rental_id
group by c.first_name
)
select
cliente,rentado
from clientestabla
having rentado>30;
 
 with pelisrent as (
 select
 f.title as peliculas , count(r.rental_id) as veces_rentado
 from film f 
 join inventory i on f.film_id=i.film_id
 join rental r on i.inventory_id = r.inventory_id
 group by f.title)
 select 
 peliculas , veces_rentado
 from pelisrent
where veces_rentado>50;

with actorestabla as(
select
a.first_name as nombre , count(fa.film_id) as participaciones
from film f
join film_actor fa on f.film_id=fa.film_id
join actor a on fa.actor_id=a.actor_id
group by a.first_name)
select
nombre , participaciones
from actorestabla
where participaciones>20;

with registabla as(
select 
ci.city as ciudad , count(a.address_id) as registrados
from customer c 
join address a on c.address_id=a.address_id
join city ci on a.city_id=ci.city_id
group by ci.city)
select 
 ciudad, registrados
 from registabla
 where registrados>10;
 
select
f.title as peliculas , c.name as categoria
from film f
join film_category fc on f.film_id =fc.film_id
join category c on fc.category_id=c.category_id
where c.name IN ("Action","Comedy");

select
f.title as peliculas , c.name as categoria
from film f
join film_category fc on f.film_id=fc.film_id
join category c on fc.category_id=c.category_id
where c.name<>"Horror";

select
c.first_name as nombre,f.title as peliculas,ca.name as categoria
from customer c
join rental r on c.customer_id=r.customer_id
join inventory i on r.inventory_id=i.inventory_id
join film f on i.film_id=f.film_id
join film_category fc on f.film_id=fc.film_id
join category ca on fc.category_id = ca.category_id
where ca.name="Action" and ca.name<>"Horror";

select 
ci.city , count(c.customer_id) as clientes 
from city ci 
join address a on ci.city_id =a.city_id
join customer c on a.address_id=c.address_id
where ci.city_id not in(
select a.city_id
from store s 
join address a on s.address_id = a.address_id)
group by ci.city;

select
a.first_name as nombre_actor , c.name as categoria
from film_actor fa
join film_category fc on fa.film_id=fc.film_id
join actor a on fa.actor_id=a.actor_id
join category c on fc.category_id=c.category_id
where c.name <> "Children" 
group by a.first_name,c.name;

with total as (
select
c.first_name as nombre , sum(p.amount) as total
from customer c
join payment p on c.customer_id = p.customer_id
group by c.first_name)
select 
nombre,total
from total
where total>100 ;

with pelis_Rent as (
select
c.name as categoria , count(r.rental_id) as total_rentas,
f.title as pelicula,
rank()over(partition by c.name order by count(r.rental_id)desc)as ranking
from film f
join inventory i on f.film_id = i.film_id
join rental r on i.inventory_id=r.inventory_id
join film_category fc on f.film_id=fc.film_id
join category c on fc.category_id =c.category_id
group by c.name,f.title)
select
categoria, total_rentas,pelicula
from pelis_Rent
where ranking =1;


select
ci.city as ciudad , sum(p.customer_id)as ganancia_generada
from customer c
join payment p on c.customer_id =p.customer_id
join address a on c.address_id=a.address_id
join city ci on a.city_id=ci.city_id
group by ci.city
order by sum(p.customer_id) desc
limit 3;

with total as(
select
s.first_name as nombre ,count(r.staff_id) as ventas_totales
from staff s
join rental r on s.staff_id=r.staff_id
group by s.first_name
)
select
nombre , ventas_totales
from total
having ventas_totales>(
select 
 AVG(ventas_totales)
 from total);
 
 with tabladepos as(
 select
 f.title as peliculas , count(i.inventory_id) as cantidad,
 rank()over(order by count(i.inventory_id)desc )as raking
 from film f
 join inventory i on f.film_id=i.film_id
 join rental r on i.inventory_id=r.inventory_id
group by f.title)
select
peliculas
,cantidad,raking
from tabladepos;

select
c.first_name as nombre, sum(p.amount) as pago,
rank()over(order by sum(p.amount)desc)as ranking
from customer c
join payment p on c.customer_id=p.customer_id
group by c.first_name;

select
f.title,c.name,count(r.rental_id),
rank()over(partition by c.name order by count(r.rental_id) desc) as ranking
from film f
join inventory i on f.film_id=i.film_id
join rental r on i.inventory_id=r.inventory_id
join film_Category fc on f.film_id=fc.film_id
join category c on fc.category_id=c.category_id
group by f.title,c.name
order by count(r.rental_id) desc;

select
c.customer_id,sum(p.amount),date(p.payment_date)
from customer c
join payment p on c.customer_id = p.customer_id
group by c.customer_id,p.payment_date;

with renta as(
select
c.first_name as nombre,count(r.rental_id) as rentado
from customer c
join rental r on c.customer_id=r.customer_id
group by c.first_name)
select nombre,rentado
,(avg(rentado)over()-rentado) as dif_prom
from renta;

select
a.first_name as nombre,
count(fa.actor_id) as apariciones,
row_number()over(order by count(fa.actor_id)desc) as ranking
from film f
join film_actor fa on f.film_id=fa.film_id
join actor a on fa.actor_id=a.actor_id
group by a.first_name
limit 5;

select
f.title,count(fa.actor_id)
from film f 
join film_actor fa on f.film_id=fa.film_id
join actor a on fa.actor_id=a.actor_id
group by f.title
order by count(fa.actor_id) desc;

select
f.title,f.length,r.rental_id
from film f
join inventory i on f.film_id=i.film_id
left join rental r on i.inventory_id=r.inventory_id
group by f.title,f.length,r.rental_id
order by f.length desc;

with generartabla as(
select
f.title as pelicula ,f.rental_rate as costo,count(r.rental_id) as veces_rentado,
(f.rental_rate*count(r.rental_id)) as ganancia 
from film f
join inventory i on f.film_id=i.film_id
join rental r on i.inventory_id=r.inventory_id
join payment p on r.rental_id =p.rental_id
group by f.title , f.rental_rate
)
select
pelicula,costo,veces_rentado
,ganancia
from generartabla
where ganancia >(
select
avg(ganancia)
from generartabla);

with dinero as(
select
c.name as categoria,(f.rental_rate*count(r.rental_id)) as ganancia
from film f
join inventory i on f.film_id=i.film_id
join rental r on i.inventory_id=r.inventory_id
join payment p on r.rental_id=p.rental_id
join film_category fc on f.film_id=fc.film_id
join category c on fc.category_id=c.category_id
group by f.title,f.rental_rate,c.name)
select
categoria,sum(ganancia)
from dinero
group by categoria
order by sum(ganancia) desc;

select
c.first_name, sum(p.amount),f.title,count(r.rental_id)
from customer c
join payment p on c.customer_id=p.customer_id
join rental r on c.customer_id=r.customer_id
join inventory i on r.inventory_id=i.inventory_id
join film f on i.film_id=f.film_id
group by c.first_name, f.title
order by sum(p.amount) desc
limit 3

 
 