import { Telefono }             from './models/Telefono.js';
import { sucursalLima, reportados } from './main.js';
import { getTecnicoPorMarca }   from './utils/asignacion.js';

const form         = document.getElementById('formIngreso');
const listaEstados = document.getElementById('listaEstados');

form.addEventListener('submit', e => {
  e.preventDefault();

  const imei         = document.getElementById('imei').value.trim();
  const serie        = document.getElementById('serie').value.trim();
  const marca        = document.getElementById('marca').value;
  const diagnostico  = document.getElementById('diagnostico').value.trim();
  const abono        = parseFloat(document.getElementById('abono').value);
  const autorizacion = document.getElementById('autorizacion').checked;
  const repuesto     = document.getElementById('repuesto').value.trim();

  const telefono = new Telefono(imei, serie, marca);

  if (!sucursalLima.ingresarTelefono(telefono, reportados)) {
    alert('Teléfono reportado. No se puede ingresar.');
    return;
  }

  telefono.registrarDiagnostico(diagnostico);
  telefono.autorizarServicio(autorizacion, abono);
  telefono.agregarRepuesto(repuesto);

  const tecnico = getTecnicoPorMarca(sucursalLima, marca);
  telefono.asignarTecnico(tecnico);

  actualizarListaEstados();
  form.reset();
});

function actualizarListaEstados() {
  listaEstados.innerHTML = '';
  sucursalLima.telefonos.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `IMEI: ${t.imei} | Estado: ${t.estado} | Técnico: ${t.tecnicoAsignado?.nombre || 'No asignado'}`;
    listaEstados.appendChild(li);
  });
}
