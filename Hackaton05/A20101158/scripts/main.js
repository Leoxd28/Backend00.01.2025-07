import { Sucursal } from './models/Sucursal.js';
import { Tecnico } from './models/Tecnico.js';

export const reportados = ['1234567890', 'ABC123'];
export const sucursalLima = new Sucursal('Lima Centro');

const tecnicoAndroid = new Tecnico('Carlos', ['android']);
const tecnicoIos     = new Tecnico('Lucía',   ['ios']);

sucursalLima.tecnicos.push(tecnicoAndroid, tecnicoIos);

