class ListaComprasApp {
    constructor() {
        this.baseURL = '/api/lista-compras';
        this.itemsContainer = document.getElementById('items-container');
        this.contadorTotal = document.getElementById('contador-total');
        this.contadorPendientes = document.getElementById('contador-pendientes');
        this.contadorCompletados = document.getElementById('contador-completados');
        this.btnAgregar = document.getElementById('btn-agregar');
        this.form = document.getElementById('form-agregar');
        this.filtroActual = 'todos';
        
        this.init();
    }

    init() {
        this.configurarEventos();
        this.cargarItems();
    }

    configurarEventos() {
        // Evento del formulario
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.manejarSubmit(e));
        }

        // Eventos de filtros
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.cambiarFiltro(btn.dataset.filtro);
            });
        });

        // Evento del botón actualizar
        const btnActualizar = document.getElementById('btn-actualizar');
        if (btnActualizar) {
            btnActualizar.addEventListener('click', () => this.cargarItems());
        }
    }

    async manejarSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            nombre: formData.get('nombre'),
            descripcion: formData.get('descripcion'),
            fechaObjetivo: formData.get('fechaObjetivo')
        };

        console.log('📝 Enviando datos:', data);

        try {
            await this.agregarItem(data);
            this.form.reset();
            await this.cargarItems();
            this.mostrarMensaje('Item agregado exitosamente', 'success');
        } catch (error) {
            console.error('❌ Error al agregar item:', error);
            this.mostrarMensaje(`Error: ${error.message}`, 'error');
        }
    }

    async agregarItem(data) {
        try {
            this.mostrarCargando(true);
            
            const response = await fetch(`${this.baseURL}/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            console.log('📡 Response status:', response.status);
            console.log('📡 Response headers:', [...response.headers.entries()]);

            if (!response.ok) {
                let errorMessage = `Error ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (parseError) {
                    console.error('Error al parsear respuesta de error:', parseError);
                    const errorText = await response.text();
                    console.error('Texto de respuesta:', errorText);
                    errorMessage = `Error del servidor: ${response.status}`;
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();
            console.log('✅ Item creado:', result);
            return result;

        } catch (error) {
            console.error('❌ Error en agregarItem:', error);
            throw error;
        } finally {
            this.mostrarCargando(false);
        }
    }

    async cargarItems() {
        try {
            this.mostrarCargando(true);
            
            let endpoint = '';
            switch (this.filtroActual) {
                case 'pendientes':
                    endpoint = '/pendientes';
                    break;
                case 'completados':
                    endpoint = '/completados';
                    break;
                default:
                    endpoint = '/todos';
            }

            console.log(`📋 Cargando items desde: ${this.baseURL}${endpoint}`);

            const response = await fetch(`${this.baseURL}${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('📋 Items cargados:', result);

            if (result.success) {
                this.renderizarItems(result.data);
                await this.actualizarContadores();
            } else {
                throw new Error(result.message || 'Error al cargar items');
            }

        } catch (error) {
            console.error('❌ Error al cargar items:', error);
            this.mostrarMensaje(`Error al cargar: ${error.message}`, 'error');
            this.renderizarItems([]);
        } finally {
            this.mostrarCargando(false);
        }
    }

    async actualizarContadores() {
        try {
            // Cargar contadores desde el servidor
            const [todosRes, pendientesRes, completadosRes] = await Promise.all([
                fetch(`${this.baseURL}/todos`),
                fetch(`${this.baseURL}/pendientes`),
                fetch(`${this.baseURL}/completados`)
            ]);

            const [todos, pendientes, completados] = await Promise.all([
                todosRes.json(),
                pendientesRes.json(),
                completadosRes.json()
            ]);

            if (this.contadorTotal) {
                this.contadorTotal.textContent = todos.success ? todos.total : 0;
            }
            if (this.contadorPendientes) {
                this.contadorPendientes.textContent = pendientes.success ? pendientes.total : 0;
            }
            if (this.contadorCompletados) {
                this.contadorCompletados.textContent = completados.success ? completados.total : 0;
            }

        } catch (error) {
            console.error('❌ Error al actualizar contadores:', error);
        }
    }

    renderizarItems(items) {
        if (!this.itemsContainer) return;

        if (!items || items.length === 0) {
            this.itemsContainer.innerHTML = `
                <div class="no-items">
                    <p>📝 No hay items para mostrar</p>
                    <p>Agrega tu primer producto a la lista</p>
                </div>
            `;
            return;
        }

        this.itemsContainer.innerHTML = items.map(item => this.crearItemHTML(item)).join('');
        
        // Agregar eventos a los botones
        this.itemsContainer.querySelectorAll('.btn-completar').forEach(btn => {
            btn.addEventListener('click', () => this.completarItem(btn.dataset.id));
        });

        this.itemsContainer.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', () => this.eliminarItem(btn.dataset.id));
        });
    }

    crearItemHTML(item) {
        const fechaObjetivo = new Date(item.fechaObjetivo).toLocaleDateString('es-ES');
        const fechaCreacion = new Date(item.fechaCreacion).toLocaleDateString('es-ES');
        const fechaCompletado = item.fechaCompletado ? 
            new Date(item.fechaCompletado).toLocaleDateString('es-ES') : null;

        const esVencido = !item.esCompletado && new Date(item.fechaObjetivo) < new Date();
        const claseEstado = item.esCompletado ? 'completado' : (esVencido ? 'vencido' : 'pendiente');

        return `
            <div class="item ${claseEstado}" data-id="${item._id}">
                <div class="item-header">
                    <h3>${this.escapeHTML(item.nombre)}</h3>
                    <div class="item-estado">
                        ${item.esCompletado ? '✅ Completado' : (esVencido ? '❌ Vencido' : '⏳ Pendiente')}
                    </div>
                </div>
                <div class="item-body">
                    <p class="descripcion">${this.escapeHTML(item.descripcion)}</p>
                    <div class="fechas">
                        <span class="fecha">📅 Objetivo: ${fechaObjetivo}</span>
                        <span class="fecha">📝 Creado: ${fechaCreacion}</span>
                        ${fechaCompletado ? `<span class="fecha">✅ Completado: ${fechaCompletado}</span>` : ''}
                    </div>
                </div>
                <div class="item-actions">
                    ${!item.esCompletado ? `
                        <button class="btn btn-success btn-completar" data-id="${item._id}">
                            ✅ Completar
                        </button>
                    ` : ''}
                    <button class="btn btn-danger btn-eliminar" data-id="${item._id}">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `;
    }

    async completarItem(id) {
        if (!confirm('¿Estás seguro de marcar este item como completado?')) return;

        try {
            this.mostrarCargando(true);
            
            const response = await fetch(`${this.baseURL}/completar/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error ${response.status}`);
            }

            const result = await response.json();
            
            if (result.success) {
                this.mostrarMensaje('Item completado exitosamente', 'success');
                await this.cargarItems();
            } else {
                throw new Error(result.message || 'Error al completar item');
            }

        } catch (error) {
            console.error('❌ Error al completar item:', error);
            this.mostrarMensaje(`Error: ${error.message}`, 'error');
        } finally {
            this.mostrarCargando(false);
        }
    }

    async eliminarItem(id) {
        if (!confirm('¿Estás seguro de eliminar este item? Esta acción no se puede deshacer.')) return;

        try {
            this.mostrarCargando(true);
            
            const response = await fetch(`${this.baseURL}/eliminar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error ${response.status}`);
            }

            const result = await response.json();
            
            if (result.success) {
                this.mostrarMensaje('Item eliminado exitosamente', 'success');
                await this.cargarItems();
            } else {
                throw new Error(result.message || 'Error al eliminar item');
            }

        } catch (error) {
            console.error('❌ Error al eliminar item:', error);
            this.mostrarMensaje(`Error: ${error.message}`, 'error');
        } finally {
            this.mostrarCargando(false);
        }
    }

    cambiarFiltro(filtro) {
        this.filtroActual = filtro;
        
        // Actualizar botones activos
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filtro === filtro);
        });

        this.cargarItems();
    }

    mostrarCargando(mostrar) {
        const loader = document.querySelector('.loading');
        if (loader) {
            loader.style.display = mostrar ? 'block' : 'none';
        }
    }

    mostrarMensaje(mensaje, tipo = 'info') {
        // Remover mensajes anteriores
        document.querySelectorAll('.mensaje-temporal').forEach(el => el.remove());

        const div = document.createElement('div');
        div.className = `mensaje-temporal mensaje-${tipo}`;
        div.textContent = mensaje;
        
        document.body.appendChild(div);
        
        setTimeout(() => {
            div.remove();
        }, 5000);
    }

    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando Lista de Compras App');
    new ListaComprasApp();
});

// Manejo de errores globales
window.addEventListener('error', (e) => {
    console.error('❌ Error global:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Promise rechazada:', e.reason);
    e.preventDefault();
});