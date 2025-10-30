import { connectDB, disconnectDB } from '../config/db.js';
import { Item } from '../models/Item.js';
import { Empleado } from '../models/Empleado.js';
import { registrarCompra } from '../services/compras.service.js';
import { registrarHoras } from '../services/rrhh.service.js';
import { iniciarOP, terminarOP } from '../services/produccion.service.js';
import { stockResumen } from '../services/inventario.service.js';
import { capacidadMaximaProducible } from '../queries/capacidad.query.js';
import { costoUnitarioArmarioEstimado } from '../queries/costos.query.js';

async function seed() {
  await connectDB();
  await Item.deleteMany({});
  await Empleado.deleteMany({});

  const [tablon, goma, armario] = await Item.create([
    { sku: 'MAT-TABLON', nombre: 'Tablón de madera', tipo: 'materia_prima', unidad: 'tablón', stock: 0, costo_promedio: 0 },
    { sku: 'INS-GOMA', nombre: 'Goma de carpintería', tipo: 'insumo', unidad: 'kg', stock: 0, costo_promedio: 0 },
    { sku: 'ARM-001', nombre: 'Armario estándar', tipo: 'producto', unidad: 'unidad', stock: 0, costo_promedio: 0 },
  ]);

  const [e1, e2] = await Empleado.create([
    { dni: '12345678', nombres: 'Ana Pérez', tarifa_hora: 8.5 },
    { dni: '87654321', nombres: 'Luis García', tarifa_hora: 9.2 },
  ]);

  await registrarCompra({ proveedor: 'Maderas Amazonía SAC', lineas: [{ item: tablon._id, cantidad: 30, costo_unitario: 25 }], ref_doc: 'OC-0001' });
  await registrarCompra({ proveedor: 'Adhesivos Andes', lineas: [{ item: goma._id, cantidad: 10, costo_unitario: 12.5 }], ref_doc: 'OC-0002' });

  await registrarHoras({ empleadoId: e1._id, horas: 8 });
  await registrarHoras({ empleadoId: e2._id, horas: 8 });

  console.log('\n— Stock inicial —');
  console.table((await stockResumen()).map(i => ({ sku: i.sku, nombre: i.nombre, stock: i.stock, unidad: i.unidad, costo_prom: i.costo_promedio })));

  console.log('\n— Capacidad máxima producible (hoy) —');
  console.log(await capacidadMaximaProducible());

  console.log('\n— Costo unitario estimado —');
  console.log(await costoUnitarioArmarioEstimado());

  console.log('\n— Iniciando OP de 3 armarios —');
  const op = await iniciarOP({ codigo: 'OP-0001', cantidad: 3 });

  await registrarHoras({ empleadoId: e1._id, horas: 8, produccionId: op._id });

  console.log('\n— Terminando OP —');
  const opFin = await terminarOP(op._id);
  console.log({ codigo: opFin.codigo, estado: opFin.estado, consumo: opFin.consumo });

  console.log('\n— Stock final —');
  console.table((await stockResumen()).map(i => ({ sku: i.sku, nombre: i.nombre, stock: i.stock, unidad: i.unidad, costo_prom: i.costo_promedio })));

  await disconnectDB();
}

seed().catch(e => { console.error(e); process.exit(1); });
