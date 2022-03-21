/*

-- Select process details by process NR

select process.id as process_id,process.number as process_nr, GROUP_CONCAT(people.name SEPARATOR '||') as people_names, GROUP_CONCAT(people.nif SEPARATOR '||') as people_nif from process
left join process_people on process.id = process_people.process_id
left join people on people.id = process_people.people_id
where process.number = '4271/17.5T8VFX'
group by process.id;



-- Select processes with duplicate people

select process_people.process_id, process_people.people_id from process_people
left join (
    select min(id) as minid from process_people
    group by process_id, people_id) pp2
on process_people.id = pp2.minid
where pp2.minid is null
ORDER BY process_people.process_id, process_people.people_id;



-- Delete Process people duplicates

delete process_people from process_people
left join (
    select min(id) as minid from process_people
    group by process_id, people_id) pp2
on process_people.id = pp2.minid
where pp2.minid is null;

-- Duplicate examples
| process id | people id | process nr
|     363217 |        49 | 4271/17.5T8VFX
|     372930 |       152 | 455/22.2T8STS



-- Another get Process people duplicates

SELECT pp.process_id, pp.people_id FROM process_people pp
left join people on people.id = pp.people_id
WHERE people.people_type_id = '1'
GROUP BY pp.process_id, pp.people_id
HAVING COUNT(1) > 1
ORDER BY pp.process_id, pp.people_id;

*/