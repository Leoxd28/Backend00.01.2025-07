 
        // Clases para el sistema de reparaciones
        class Telefono {
            constructor(cliente, telefono, marca, modelo, serie, imei, problema, autorizacion) {
                this.cliente = cliente;
                this.telefonoContacto = telefono;
                this.marca = marca;
                this.modelo = modelo;
                this.serie = serie;
                this.imei = imei;
                this.problemaReportado = problema;
                this.autorizacion = autorizacion;
                this.estado = "ingresado";
                this.diagnostico = "";
                this.costoEstimado = 0;
                this.abono = false;
                this.repuestos = [];
                this.tecnicoAsignado = null;
                this.historialEstados = [{
                    estado: "ingresado",
                    fecha: new Date()
                }];
            }
        }

        class Tecnico {
            constructor(nombre, skills) {
                this.nombre = nombre;
                this.skills = skills; // Array de marcas que el técnico puede reparar
            }
        }

        class Repuesto {
            constructor(nombre, costo) {
                this.nombre = nombre;
                this.costo = costo;
            }
        }

        class SistemaReparaciones {
            constructor() {
                this.telefonos = [];
                this.tecnicos = [];
                this.seriesReportadas = []; // Números de serie reportados
                this.imeisReportados = []; // IMEIs reportados
                
                // Cargar datos del localStorage
                this.cargarDatos();
                
                // Inicializar con algunos técnicos si no existen
                if (this.tecnicos.length === 0) {
                    this.inicializarTecnicos();
                }
            }
            
            inicializarTecnicos() {
                this.agregarTecnico(new Tecnico("Juan Pérez", ["Samsung", "Motorola", "Xiaomi"]));
                this.agregarTecnico(new Tecnico("María García", ["Apple", "Samsung", "Huawei"]));
                this.agregarTecnico(new Tecnico("Carlos López", ["Xiaomi", "Motorola", "LG"]));
                this.guardarDatos();
            }
            
            agregarTelefono(telefono) {
                // Verificar si el serie o IMEI están reportados
                if (this.seriesReportadas.includes(telefono.serie)) {
                    throw new Error("El número de serie está reportado");
                }
                
                if (this.imeisReportados.includes(telefono.imei)) {
                    throw new Error("El IMEI está reportado");
                }
                
                this.telefonos.push(telefono);
                this.guardarDatos();
                return true;
            }
            
            agregarTecnico(tecnico) {
                this.tecnicos.push(tecnico);
                this.guardarDatos();
            }
            
            actualizarDiagnostico(serie, diagnostico, costo, abono) {
                const telefono = this.buscarPorSerie(serie);
                if (telefono) {
                    telefono.diagnostico = diagnostico;
                    telefono.costoEstimado = costo;
                    telefono.abono = abono;
                    telefono.estado = "en revision";
                    telefono.historialEstados.push({
                        estado: "en revision",
                        fecha: new Date()
                    });
                    this.guardarDatos();
                    return true;
                }
                return false;
            }
            
            asignarTecnico(serie, tecnico) {
                const telefono = this.buscarPorSerie(serie);
                if (telefono && this.tecnicos.find(t => t.nombre === tecnico)) {
                    // Verificar que el técnico tenga skills para la marca
                    const tecnicoObj = this.tecnicos.find(t => t.nombre === tecnico);
                    if (tecnicoObj.skills.includes(telefono.marca)) {
                        telefono.tecnicoAsignado = tecnico;
                        telefono.estado = "en reparacion";
                        telefono.historialEstados.push({
                            estado: "en reparacion",
                            fecha: new Date()
                        });
                        this.guardarDatos();
                        return true;
                    } else {
                        throw new Error("El técnico no tiene skills para reparar esta marca");
                    }
                }
                return false;
            }
            
            agregarRepuesto(serie, repuesto) {
                const telefono = this.buscarPorSerie(serie);
                if (telefono) {
                    telefono.repuestos.push(repuesto);
                    this.guardarDatos();
                    return true;
                }
                return false;
            }
            
            actualizarEstado(serie, estado) {
                const telefono = this.buscarPorSerie(serie);
                if (telefono) {
                    telefono.estado = estado;
                    telefono.historialEstados.push({
                        estado: estado,
                        fecha: new Date()
                    });
                    this.guardarDatos();
                    return true;
                }
                return false;
            }
            
            buscarPorSerie(serie) {
                return this.telefonos.find(t => t.serie === serie);
            }
            
            obtenerTelefonosPorEstado(estado) {
                return this.telefonos.filter(t => t.estado === estado);
            }
            
            guardarDatos() {
                localStorage.setItem('telefonos', JSON.stringify(this.telefonos));
                localStorage.setItem('tecnicos', JSON.stringify(this.tecnicos));
                localStorage.setItem('seriesReportadas', JSON.stringify(this.seriesReportadas));
                localStorage.setItem('imeisReportados', JSON.stringify(this.imeisReportados));
            }
            
            cargarDatos() {
                const telefonosData = localStorage.getItem('telefonos');
                const tecnicosData = localStorage.getItem('tecnicos');
                const seriesReportadasData = localStorage.getItem('seriesReportadas');
                const imeisReportadosData = localStorage.getItem('imeisReportados');
                
                if (telefonosData) {
                    this.telefonos = JSON.parse(telefonosData);
                }
                
                if (tecnicosData) {
                    this.tecnicos = JSON.parse(tecnicosData);
                }
                
                if (seriesReportadasData) {
                    this.seriesReportadas = JSON.parse(seriesReportadasData);
                }
                
                if (imeisReportadosData) {
                    this.imeisReportados = JSON.parse(imeisReportadosData);
                }
            }
        }

        // Instancia global del sistema
        const sistema = new SistemaReparaciones();

        // Funciones de la interfaz de usuario
        document.addEventListener('DOMContentLoaded', function() {
            // Manejo de pestañas
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabName = tab.getAttribute('data-tab');
                    
                    // Desactivar todas las pestañas y contenidos
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                    
                    // Activar la pestaña seleccionada
                    tab.classList.add('active');
                    document.getElementById(tabName).classList.add('active');
                    
                    // Actualizar datos según la pestaña
                    if (tabName === 'revision') {
                        actualizarSelectRevision();
                    } else if (tabName === 'reparacion') {
                        actualizarSelectReparacion();
                        actualizarSelectTecnicos();
                    } else if (tabName === 'estado') {
                        actualizarTablaReparaciones();
                    }
                });
            });
            
            // Formulario de ingreso
            document.getElementById('form-ingreso').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const cliente = document.getElementById('cliente').value;
                const telefono = document.getElementById('telefono').value;
                const marca = document.getElementById('marca').value;
                const modelo = document.getElementById('modelo').value;
                const serie = document.getElementById('serie').value;
                const imei = document.getElementById('imei').value;
                const problema = document.getElementById('problema').value;
                const autorizacion = document.getElementById('autorizacion').checked;
                
                try {
                    const nuevoTelefono = new Telefono(
                        cliente, telefono, marca, modelo, serie, imei, problema, autorizacion
                    );
                    
                    sistema.agregarTelefono(nuevoTelefono);
                    
                    // Mostrar mensaje de éxito
                    mostrarAlerta('alert-ingreso', 'Equipo registrado correctamente', 'success');
                    
                    // Limpiar formulario
                    this.reset();
                } catch (error) {
                    mostrarAlerta('alert-ingreso', 'Error: ' + error.message, 'danger');
                }
            });
            
            // Selección de equipo para revisión
            document.getElementById('select-revision').addEventListener('change', function() {
                const serie = this.value;
                if (serie) {
                    const telefono = sistema.buscarPorSerie(serie);
                    if (telefono) {
                        document.getElementById('rev-cliente').textContent = telefono.cliente;
                        document.getElementById('rev-marca').textContent = telefono.marca;
                        document.getElementById('rev-modelo').textContent = telefono.modelo;
                        document.getElementById('rev-serie').textContent = telefono.serie;
                        document.getElementById('rev-imei').textContent = telefono.imei;
                        document.getElementById('rev-problema').textContent = telefono.problemaReportado;
                        
                        document.getElementById('info-equipo').style.display = 'block';
                    }
                } else {
                    document.getElementById('info-equipo').style.display = 'none';
                }
            });
            
            // Formulario de revisión
            document.getElementById('form-revision').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const serie = document.getElementById('select-revision').value;
                const diagnostico = document.getElementById('diagnostico').value;
                const costo = parseFloat(document.getElementById('costo').value);
                const abono = document.getElementById('abono').checked;
                
                if (sistema.actualizarDiagnostico(serie, diagnostico, costo, abono)) {
                    mostrarAlerta('alert-revision', 'Diagnóstico guardado correctamente', 'success');
                    this.reset();
                    document.getElementById('select-revision').value = '';
                    document.getElementById('info-equipo').style.display = 'none';
                    actualizarSelectRevision();
                } else {
                    mostrarAlerta('alert-revision', 'Error al guardar el diagnóstico', 'danger');
                }
            });
            
            // Selección de equipo para reparación
            document.getElementById('select-reparacion').addEventListener('change', function() {
                const serie = this.value;
                if (serie) {
                    const telefono = sistema.buscarPorSerie(serie);
                    if (telefono) {
                        document.getElementById('rep-cliente').textContent = telefono.cliente;
                        document.getElementById('rep-marca').textContent = telefono.marca;
                        document.getElementById('rep-modelo').textContent = telefono.modelo;
                        document.getElementById('rep-diagnostico').textContent = telefono.diagnostico;
                        document.getElementById('rep-costo').textContent = telefono.costoEstimado.toFixed(2);
                        
                        // Actualizar lista de repuestos
                        actualizarListaRepuestos(telefono);
                        
                        // Seleccionar técnico si está asignado
                        if (telefono.tecnicoAsignado) {
                            document.getElementById('tecnico').value = telefono.tecnicoAsignado;
                        }
                        
                        // Seleccionar estado actual
                        document.getElementById('estado-reparacion').value = telefono.estado;
                        
                        document.getElementById('info-reparacion').style.display = 'block';
                    }
                } else {
                    document.getElementById('info-reparacion').style.display = 'none';
                }
            });
            
            // Formulario para agregar repuestos
            document.getElementById('form-repuesto').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const serie = document.getElementById('select-reparacion').value;
                const nombre = document.getElementById('repuesto').value;
                const costo = parseFloat(document.getElementById('costo-repuesto').value);
                
                if (nombre && !isNaN(costo)) {
                    const repuesto = new Repuesto(nombre, costo);
                    if (sistema.agregarRepuesto(serie, repuesto)) {
                        // Actualizar lista de repuestos
                        const telefono = sistema.buscarPorSerie(serie);
                        actualizarListaRepuestos(telefono);
                        
                        // Limpiar formulario
                        this.reset();
                    } else {
                        alert('Error al agregar el repuesto');
                    }
                }
            });
            
            // Guardar cambios en reparación
            document.getElementById('btn-guardar-reparacion').addEventListener('click', function() {
                const serie = document.getElementById('select-reparacion').value;
                const tecnico = document.getElementById('tecnico').value;
                const estado = document.getElementById('estado-reparacion').value;
                
                try {
                    if (tecnico) {
                        sistema.asignarTecnico(serie, tecnico);
                    }
                    
                    sistema.actualizarEstado(serie, estado);
                    
                    mostrarAlerta('alert-reparacion', 'Cambios guardados correctamente', 'success');
                    actualizarSelectReparacion();
                } catch (error) {
                    mostrarAlerta('alert-reparacion', 'Error: ' + error.message, 'danger');
                }
            });
            
            // Búsqueda por número de serie
            document.getElementById('btn-buscar').addEventListener('click', function() {
                const serie = document.getElementById('buscar-serie').value;
                if (serie) {
                    const telefono = sistema.buscarPorSerie(serie);
                    const resultado = document.getElementById('resultado-busqueda');
                    
                    if (telefono) {
                        resultado.innerHTML = `
                            <div class="card">
                                <h3>Resultado de la búsqueda</h3>
                                <p><strong>Cliente:</strong> ${telefono.cliente}</p>
                                <p><strong>Equipo:</strong> ${telefono.marca} ${telefono.modelo}</p>
                                <p><strong>Serie:</strong> ${telefono.serie}</p>
                                <p><strong>Estado:</strong> <span class="status-badge status-${telefono.estado.replace(' ', '-')}">${telefono.estado}</span></p>
                                <p><strong>Técnico asignado:</strong> ${telefono.tecnicoAsignado || 'No asignado'}</p>
                                <p><strong>Diagnóstico:</strong> ${telefono.diagnostico}</p>
                                <p><strong>Costo estimado:</strong> $${telefono.costoEstimado.toFixed(2)}</p>
                            </div>
                        `;
                    } else {
                        resultado.innerHTML = `
                            <div class="alert alert-danger">
                                No se encontró ningún equipo con el número de serie: ${serie}
                            </div>
                        `;
                    }
                }
            });
            
            // Inicializar selects
            actualizarSelectRevision();
            actualizarSelectReparacion();
            actualizarSelectTecnicos();
            actualizarTablaReparaciones();
        });

        // Funciones auxiliares
        function mostrarAlerta(contenedorId, mensaje, tipo) {
            const contenedor = document.getElementById(contenedorId);
            contenedor.innerHTML = `
                <div class="alert alert-${tipo}">
                    ${mensaje}
                </div>
            `;
            
            // Eliminar la alerta después de 5 segundos
            setTimeout(() => {
                contenedor.innerHTML = '';
            }, 5000);
        }

        function actualizarSelectRevision() {
            const select = document.getElementById('select-revision');
            const equipos = sistema.obtenerTelefonosPorEstado('ingresado');
            
            // Mantener el valor seleccionado actual
            const valorActual = select.value;
            select.innerHTML = '<option value="">-- Seleccione un equipo --</option>';
            
            equipos.forEach(equipo => {
                const option = document.createElement('option');
                option.value = equipo.serie;
                option.textContent = `${equipo.cliente} - ${equipo.marca} ${equipo.modelo} (${equipo.serie})`;
                select.appendChild(option);
            });
            
            // Restaurar el valor seleccionado si todavía existe
            if (equipos.find(e => e.serie === valorActual)) {
                select.value = valorActual;
                // Disparar el evento change manualmente
                const event = new Event('change');
                select.dispatchEvent(event);
            }
        }

        function actualizarSelectReparacion() {
            const select = document.getElementById('select-reparacion');
            // Mostrar equipos que ya tienen diagnóstico pero no están completados
            const equipos = sistema.telefonos.filter(t => 
                t.estado !== 'ingresado' && t.estado !== 'completado'
            );
            
            // Mantener el valor seleccionado actual
            const valorActual = select.value;
            select.innerHTML = '<option value="">-- Seleccione un equipo --</option>';
            
            equipos.forEach(equipo => {
                const option = document.createElement('option');
                option.value = equipo.serie;
                option.textContent = `${equipo.cliente} - ${equipo.marca} ${equipo.modelo} (${equipo.estado})`;
                select.appendChild(option);
            });
            
            // Restaurar el valor seleccionado si todavía existe
            if (equipos.find(e => e.serie === valorActual)) {
                select.value = valorActual;
                // Disparar el evento change manualmente
                const event = new Event('change');
                select.dispatchEvent(event);
            }
        }

        function actualizarSelectTecnicos() {
            const select = document.getElementById('tecnico');
            select.innerHTML = '<option value="">-- Seleccione un técnico --</option>';
            
            sistema.tecnicos.forEach(tecnico => {
                const option = document.createElement('option');
                option.value = tecnico.nombre;
                option.textContent = `${tecnico.nombre} (${tecnico.skills.join(', ')})`;
                select.appendChild(option);
            });
        }

        function actualizarListaRepuestos(telefono) {
            const lista = document.getElementById('lista-repuestos');
            lista.innerHTML = '';
            
            if (telefono.repuestos.length === 0) {
                lista.innerHTML = '<p>No se han agregado repuestos</p>';
                return;
            }
            
            let total = 0;
            telefono.repuestos.forEach(repuesto => {
                total += repuesto.costo;
                
                const item = document.createElement('div');
                item.className = 'repuesto-item';
                item.innerHTML = `
                    <span>${repuesto.nombre}</span>
                    <span>$${repuesto.costo.toFixed(2)}</span>
                `;
                lista.appendChild(item);
            });
            
            // Mostrar total
            const totalElem = document.createElement('div');
            totalElem.className = 'repuesto-item';
            totalElem.style.fontWeight = 'bold';
            totalElem.innerHTML = `
                <span>TOTAL</span>
                <span>$${total.toFixed(2)}</span>
            `;
            lista.appendChild(totalElem);
        }

        function actualizarTablaReparaciones() {
            const tbody = document.querySelector('#tabla-reparaciones tbody');
            tbody.innerHTML = '';
            
            sistema.telefonos.forEach(telefono => {
                const tr = document.createElement('tr');
                
                // Determinar la clase de estado
                let claseEstado = '';
                switch(telefono.estado) {
                    case 'ingresado':
                        claseEstado = 'status-pending';
                        break;
                    case 'en revision':
                    case 'en reparacion':
                    case 'espera repuestos':
                        claseEstado = 'status-in-progress';
                        break;
                    case 'completado':
                        claseEstado = 'status-completed';
                        break;
                    default:
                        claseEstado = 'status-pending';
                }
                
                tr.innerHTML = `
                    <td>${telefono.cliente}</td>
                    <td>${telefono.marca} ${telefono.modelo}</td>
                    <td>${telefono.serie}</td>
                    <td><span class="status-badge ${claseEstado}">${telefono.estado}</span></td>
                    <td>${telefono.tecnicoAsignado || 'No asignado'}</td>
                    <td>
                        <button onclick="verDetalles('${telefono.serie}')">Ver Detalles</button>
                    </td>
                `;
                
                tbody.appendChild(tr);
            });
        }

        // Función global para ver detalles
        window.verDetalles = function(serie) {
            // Cambiar a la pestaña de reparación y seleccionar el equipo
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            document.querySelector('.tab[data-tab="reparacion"]').classList.add('active');
            document.getElementById('reparacion').classList.add('active');
            
            // Seleccionar el equipo en el select
            document.getElementById('select-reparacion').value = serie;
            const event = new Event('change');
            document.getElementById('select-reparacion').dispatchEvent(event);
        };
    