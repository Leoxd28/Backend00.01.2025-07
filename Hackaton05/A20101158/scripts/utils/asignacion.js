export function getTecnicoPorMarca(sucursal, marca) {
  switch (marca.toLowerCase()) {
    case 'android':
      return sucursal.tecnicos.find(t => t.skills.includes('android')) || null;
    case 'ios':
      return sucursal.tecnicos.find(t => t.skills.includes('ios')) || null;
    default:
      return null;
  }
}

