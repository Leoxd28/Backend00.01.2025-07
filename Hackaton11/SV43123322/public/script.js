// Estado global de la aplicación
let items = [];
let filtroActual = 'todos';
let servidorConectado = false;

// Configuración de la API - PUERTO FIJO PARA EL SERVIDOR
const SERVER_BASE = 'http://localhost:8000';
const API_BASE = `${SERVER_BASE}/api/lista-compras`;

console.log('🌐 [FRONTEND] Configuración del servidor:');
console.log('   Frontend URL:', window.location.href);
console.log('   Server Base:', SERVER_BASE);
console.log('   API Base:', API_BASE);

// Referencias DOM
let elementos = {};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 [FRONTEND] Inicializando Lista de Compras...');
    
    // Mostrar configuración en la página
    mostrarConfiguracion();
    
    // Inicializar referencias DOM
    inicializarElementosDOM();
    
    // Verificar elementos críticos
    if (!verificarElementosCriticos()) {
        console.error('❌ [FRONTEND] Elementos críticos no encontrados');
        mostrarMensaje('Error: Elementos de la interfaz no encontrados', 'error');
        return;
    }
    
    // Configurar eventos
    configurarEventos();
    
    // Probar conexión al servidor PRIMERO
    probarConexionServidor().then(() => {
        if (servidorConectado) {
            // Solo cargar datos si el servidor está conectado
            cargarItems();
        } else {
            // Mostrar mensaje de ayuda
            mostrarMensajeAyuda();
        }
    });
    
    console.log('✅ [FRONTEND] Aplicación inicializada correctamente');
});

// Mostrar mensaje de ayuda cuando no hay conexión
function mostrarMensajeAyuda() {
    if (elementos.listaItems) {
        elementos.listaItems.innerHTML = `
            <div class="mensaje-ayuda" style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #dc3545;">🔴 Servidor No Disponible</h3>
                <p><strong>El servidor backend no está ejecutándose en el puerto 8000.</strong></p>
                <div style="text-align: left; max-width: 500px; margin: 20px auto;">
                    <h4>📋 Pasos para solucionar:</h4>
                    <ol>
                        <li><strong>Abrir terminal/cmd</strong> en la carpeta del proyecto</li>
                        <li><strong>Ejecutar:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">npm install</code></li>
                        <li><strong>Iniciar servidor:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">npm run dev</code> o <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">node index.js</code></li>
                        <li><strong>Verificar que aparezca:</strong> "Servidor iniciado en puerto 8000"</li>
                        <li><strong>Actualizar esta página</strong></li>
                    </ol>
                </div>
                <button onclick="location.reload()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px;">
                    🔄 Reintentar Conexión
                </button>
            </div>
        `;
    }
}

// Mostrar configuración en la página
function mostrarConfiguracion() {
    console.log('ℹ️ [FRONTEND] Configuración actual:');
    console.log('   Frontend Puerto:', window.location.port || '80');
    console.log('   Backend Puerto: 8000');
    console.log('   API URL:', API_BASE);
}

// Probar conexión al servidor
async function probarConexionServidor() {
    try {
        console.log('🔍 [FRONTEND] Probando conexión al servidor...');
        console.log('🔗 [FRONTEND] URL de prueba:', `${SERVER_BASE}/health`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout
        
        const response = await fetch(`${SERVER_BASE}/health`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ [FRONTEND] Servidor respondiendo:', data);
            servidorConectado = true;
            
            // Mostrar estado del servidor en la UI
            mostrarEstadoServidor('conectado', data);
            
            return true;
        } else {
            throw new Error(`Servidor respondió con: ${response.status} ${response.statusText}`);
        }
        
    } catch (error) {
        console.error('❌ [FRONTEND] Error de conexión al servidor:', error);
        servidorConectado = false;
        
        let mensaje = 'Error de conexión al servidor';
        if (error.name === 'AbortError') {
            mensaje = 'Timeout: El servidor no responde en el puerto 8000';
        } else if (error.message.includes('Failed to fetch')) {
            mensaje = `Servidor no disponible en ${SERVER_BASE}. Ejecute "npm run dev" para iniciar el servidor.`;
        } else if (error.message.includes('CORS')) {
            mensaje = 'Error de CORS. Verificar configuración del servidor.';
        }
        
        mostrarEstadoServidor('desconectado', { error: mensaje });
        mostrarMensaje(mensaje, 'error');
        
        return false;
    }
}

// Mostrar estado del servidor en la UI
function mostrarEstadoServidor(estado, data) {
    // Remover mensajes de estado anteriores
    document.querySelectorAll('.estado-servidor').forEach(el => el.remove());
    
    const div = document.createElement('div');
    div.className = `estado-servidor estado-${estado}`;
    
    if (estado === 'conectado') {
        div.innerHTML = `
            <span>🟢 Servidor Conectado</span>
            <small>Puerto: ${data.port || '8000'} | DB: ${data.database || 'N/A'}</small>
        `;
        div.style.background = '#28a745';
    } else {
        div.innerHTML = `
            <span>🔴 Servidor Desconectado</span>
            <small>Ejecutar: npm run dev en terminal</small>
        `;
        div.style.background = '#dc3545';
    }
    
    div.style.cssText += `
        position: fixed;
        top: 80px;
        right: 20px;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1001;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 200px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(div);
    
    // Auto-remover después de tiempo según estado
    const tiempo = estado === 'conectado' ? 8000 : 15000;
    setTimeout(() => {
        if (div.parentElement) {
            div.remove();
        }
    }, tiempo);
}

// Inicializar todas las referencias DOM
function inicializarElementosDOM() {
    elementos = {
        // Contadores
        contadorTotal: document.getElementById('contador-total'),
        contadorPendientes: document.getElementById('contador-pendientes'),
        contadorCompletados: document.getElementById('contador-completados'),
        
        // Formulario
        formulario: document.getElementById('formulario-item'),
        inputNombre: document.getElementById('nombre'),
        inputDescripcion: document.getElementById('descripcion'),
        inputFecha: document.getElementById('fecha'),
        
        // Lista y contenedores
        listaItems: document.getElementById('lista-items'),
        
        // Filtros y búsqueda
        btnTodos: document.getElementById('btn-todos'),
        btnPendientes: document.getElementById('btn-pendientes'),
        btnCompletados: document.getElementById('btn-completados'),
        inputBusqueda: document.getElementById('busqueda'),
        btnActualizar: document.getElementById('btn-actualizar')
    };
    
    console.log('🔧 [FRONTEND] Elementos DOM inicializados');
}

// Verificar que los elementos críticos existan
function verificarElementosCriticos() {
    const criticos = ['formulario', 'listaItems'];
    
    for (const elemento of criticos) {
        if (!elementos[elemento]) {
            console.error(`❌ [FRONTEND] Elemento crítico no encontrado: ${elemento}`);
            return false;
        }
    }
    
    return true;
}

// Configurar todos los eventos
function configurarEventos() {
    console.log('🔧 [FRONTEND] Configurando eventos...');
    
    // Evento del formulario
    if (elementos.formulario) {
        elementos.formulario.addEventListener('submit', manejarSubmitFormulario);
    }
    
    // Eventos de filtros
    if (elementos.btnTodos) {
        elementos.btnTodos.addEventListener('click', () => cambiarFiltro('todos'));
    }
    if (elementos.btnPendientes) {
        elementos.btnPendientes.addEventListener('click', () => cambiarFiltro('pendientes'));
    }
    if (elementos.btnCompletados) {
        elementos.btnCompletados.addEventListener('click', () => cambiarFiltro('completados'));
    }
    
    // Evento del botón actualizar
    if (elementos.btnActualizar) {
        elementos.btnActualizar.addEventListener('click', async () => {
            console.log('🔄 [FRONTEND] Actualizando manualmente...');
            
            // Verificar conexión antes de actualizar
            const conectado = await probarConexionServidor();
            if (conectado) {
                cargarItems();
            } else {
                mostrarMensajeAyuda();
            }
        });
    }
    
    // Evento de búsqueda
    if (elementos.inputBusqueda) {
        elementos.inputBusqueda.addEventListener('input', function() {
            console.log('🔍 [FRONTEND] Búsqueda:', this.value);
            filtrarItems(this.value);
        });
    }
}

// Manejar envío del formulario
async function manejarSubmitFormulario(e) {
    e.preventDefault();
    
    console.log('📝 [FRONTEND] Procesando formulario...');
    
    // Verificar conexión al servidor primero
    if (!servidorConectado) {
        console.log('🔍 [FRONTEND] Verificando conexión antes de enviar...');
        const conectado = await probarConexionServidor();
        if (!conectado) {
            mostrarMensaje('No se puede conectar al servidor. Verifique que esté ejecutándose en puerto 8000.', 'error');
            mostrarMensajeAyuda();
            return;
        }
    }
    
    // Obtener datos del formulario
    const datos = {
        nombre: elementos.inputNombre?.value?.trim() || '',
        descripcion: elementos.inputDescripcion?.value?.trim() || '',
        fecha: elementos.inputFecha?.value || ''
    };
    
    console.log('📋 [FRONTEND] Datos del formulario:', datos);
    
    // Validación local
    if (!datos.nombre) {
        mostrarMensaje('El nombre del producto es obligatorio', 'error');
        elementos.inputNombre?.focus();
        return;
    }
    
    const btnSubmit = elementos.formulario.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit ? btnSubmit.textContent : '';
    
    try {
        mostrarCargando(true);
        
        if (btnSubmit) {
            btnSubmit.disabled = true;
            btnSubmit.textContent = 'Guardando...';
        }
        
        await crearItem(datos);
        
        // Limpiar formulario
        elementos.formulario.reset();
        elementos.inputNombre?.focus();
        
        // Recargar lista
        await cargarItems();
        
        mostrarMensaje('¡Producto agregado exitosamente!', 'success');
        
    } catch (error) {
        console.error('❌ [FRONTEND] Error en formulario:', error);
        mostrarMensaje(`Error: ${error.message}`, 'error');
        
        // Si hay error de conexión, mostrar ayuda
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            mostrarMensajeAyuda();
        }
    } finally {
        mostrarCargando(false);
        
        if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.textContent = textoOriginal || '➕ AGREGAR A LA LISTA';
        }
    }
}

// Crear nuevo item en el servidor
async function crearItem(datos) {
    try {
        console.log('📤 [FRONTEND] Enviando nuevo item:', datos);
        console.log('🔗 [FRONTEND] URL destino:', API_BASE);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
        
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(datos),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log('📡 [FRONTEND] Response status:', response.status);
        console.log('📡 [FRONTEND] Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
            let errorMessage = `Error ${response.status}`;
            
            if (response.status === 404) {
                errorMessage = 'Endpoint no encontrado. Verifique que el servidor esté ejecutándose en puerto 8000.';
            } else if (response.status === 405) {
                errorMessage = 'Método no permitido. Error de configuración del servidor.';
            } else if (response.status === 500) {
                errorMessage = 'Error interno del servidor.';
            } else if (response.status === 0) {
                errorMessage = 'No se puede conectar al servidor. Verifique que esté ejecutándose.';
            }
            
            // Intentar obtener mensaje del servidor
            try {
                const errorData = await response.json();
                if (errorData.message) {
                    errorMessage = errorData.message;
                }
            } catch (e) {
                console.warn('No se pudo parsear error del servidor');
            }
            
            throw new Error(errorMessage);
        }
        
        const responseText = await response.text();
        console.log('📥 [FRONTEND] Response text (primeros 300 chars):', responseText.substring(0, 300) + '...');
        
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (parseError) {
            console.error('❌ [FRONTEND] Error parseando JSON:', parseError);
            console.error('📄 [FRONTEND] Respuesta completa:', responseText);
            throw new Error('Respuesta inválida del servidor');
        }
        
        console.log('✅ [FRONTEND] Item creado:', result);
        
        if (!result.success) {
            throw new Error(result.message || 'Error desconocido al crear item');
        }
        
        return result.data;
        
    } catch (error) {
        console.error('❌ [FRONTEND] Error en crearItem:', error);
        
        if (error.name === 'AbortError') {
            throw new Error('Timeout: El servidor tardó demasiado en responder');
        }
        
        if (error.message.includes('Failed to fetch')) {
            throw new Error('No se puede conectar al servidor. Verifique que esté ejecutándose en puerto 8000.');
        }
        
        throw error;
    }
}

// Cargar items desde el servidor
async function cargarItems() {
    try {
        console.log(`📥 [FRONTEND] Cargando items (filtro: ${filtroActual})...`);
        mostrarCargando(true);
        
        let endpoint = API_BASE;
        switch (filtroActual) {
            case 'pendientes':
                endpoint += '/pendientes';
                break;
            case 'completados':
                endpoint += '/completados';
                break;
            default:
                endpoint += '';
        }
        
        console.log(`🌐 [FRONTEND] Petición a: ${endpoint}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log('📡 [FRONTEND] Response status:', response.status);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Endpoint no encontrado');
            } else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        }
        
        const responseText = await response.text();
        console.log('📥 [FRONTEND] Response recibida (primeros 200 chars):', responseText.substring(0, 200) + '...');
        
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (parseError) {
            console.error('❌ [FRONTEND] Error parseando respuesta:', parseError);
            throw new Error('Respuesta inválida del servidor');
        }
        
        console.log('📋 [FRONTEND] Resultado parseado:', {
            success: result.success,
            itemCount: result.data ? result.data.length : 0
        });
        
        if (result.success) {
            items = result.data || [];
            console.log(`✅ [FRONTEND] ${items.length} items cargados`);
            renderizarItems();
            await actualizarContadores();
        } else {
            throw new Error(result.message || 'Error al cargar items');
        }
        
    } catch (error) {
        console.error('❌ [FRONTEND] Error al cargar items:', error);
        
        let mensaje = `Error al cargar: ${error.message}`;
        if (error.name === 'AbortError') {
            mensaje = 'Timeout: El servidor tardó demasiado en responder';
        } else if (error.message.includes('Failed to fetch')) {
            mensaje = 'No se puede conectar al servidor en puerto 8000';
            mostrarMensajeAyuda();
        }
        
        mostrarMensaje(mensaje, 'error');
        items = [];
        renderizarItems();
        
        // Reintentar conexión
        if (error.message.includes('Failed to fetch')) {
            servidorConectado = false;
            await probarConexionServidor();
        }
    } finally {
        mostrarCargando(false);
    }
}

// Actualizar contadores en la interfaz
async function actualizarContadores() {
    try {
        console.log('🔢 [FRONTEND] Actualizando contadores...');
        
        const requests = [
            fetch(API_BASE, { mode: 'cors' }),
            fetch(`${API_BASE}/pendientes`, { mode: 'cors' }),
            fetch(`${API_BASE}/completados`, { mode: 'cors' })
        ];
        
        const responses = await Promise.all(requests);
        const texts = await Promise.all(responses.map(r => r.text()));
        
        const [todos, pendientes, completados] = texts.map(text => {
            try {
                return JSON.parse(text);
            } catch (e) {
                console.error('Error parseando contador:', e);
                return { success: false, count: 0 };
            }
        });
        
        // Actualizar contadores en la UI
        if (elementos.contadorTotal) {
            elementos.contadorTotal.textContent = todos.success ? (todos.count || 0) : 0;
        }
        if (elementos.contadorPendientes) {
            elementos.contadorPendientes.textContent = pendientes.success ? (pendientes.count || 0) : 0;
        }
        if (elementos.contadorCompletados) {
            elementos.contadorCompletados.textContent = completados.success ? (completados.count || 0) : 0;
        }
        
        console.log('✅ [FRONTEND] Contadores actualizados');
        
    } catch (error) {
        console.error('❌ [FRONTEND] Error actualizando contadores:', error);
    }
}

// Renderizar items en la interfaz
function renderizarItems() {
    if (!elementos.listaItems) {
        console.error('❌ [FRONTEND] Contenedor de lista no encontrado');
        return;
    }
    
    console.log(`🎨 [FRONTEND] Renderizando ${items.length} items...`);
    
    if (items.length === 0) {
        if (!servidorConectado) {
            mostrarMensajeAyuda();
            return;
        }
        
        elementos.listaItems.innerHTML = `
            <div class="mensaje-vacio">
                <div class="icono-vacio">📝</div>
                <h3>No hay items disponibles</h3>
                <p>Agrega tu primer producto a la lista</p>
            </div>
        `;
        return;
    }
    
    elementos.listaItems.innerHTML = items.map(item => crearElementoItem(item)).join('');
    
    console.log('✅ [FRONTEND] Items renderizados correctamente');
}

// Crear elemento HTML para un item - AGREGANDO SOLO EL CAMPO ESTADO
function crearElementoItem(item) {
    const fechaCreacion = new Date(item.fechaCreacion).toLocaleDateString('es-ES');
    const fechaObjetivo = item.fecha ? new Date(item.fecha).toLocaleDateString('es-ES') : '';
    const fechaCompletado = item.fechaCompletado ? new Date(item.fechaCompletado).toLocaleDateString('es-ES') : '';
    
    const claseEstado = item.esCompletado ? 'completado' : 'pendiente';
    
    // SOLO AGREGAR CAMPO ESTADO - SIN MODIFICAR DISEÑO EXISTENTE
    const estadoTexto = item.esCompletado ? 'Completado' : 'Pendiente';
    const estadoColor = item.esCompletado ? '#28a745' : '#dc3545'; // Verde o Rojo
    
    return `
        <div class="item ${claseEstado}" data-id="${item._id}">
            <div class="item-contenido">
                <div class="item-checkbox">
                    <input type="checkbox" 
                           ${item.esCompletado ? 'checked' : ''} 
                           onchange="toggleCompletar('${item._id}', this.checked)"
                           class="checkbox-item">
                </div>
                <div class="item-info">
                    <h4 class="item-nombre">${escapeHtml(item.nombre)}</h4>
                    <p class="item-descripcion">${escapeHtml(item.descripcion || '')}</p>
                    <div class="item-fechas">
                        <span class="fecha-creacion">📝 ${fechaCreacion}</span>
                        ${fechaObjetivo ? `<span class="fecha-objetivo">📅 ${fechaObjetivo}</span>` : ''}
                        ${fechaCompletado ? `<span class="fecha-completado">✅ ${fechaCompletado}</span>` : ''}
                        <span class="item-estado-text" style="color: ${estadoColor}; font-weight: bold; margin-left: 10px;">${estadoTexto}</span>
                    </div>
                </div>
                <div class="item-acciones">
                    <button class="btn-eliminar" onclick="eliminarItem('${item._id}')" title="Eliminar">
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Toggle completar/descompletar item
async function toggleCompletar(id, completar) {
    try {
        console.log(`🔄 [FRONTEND] ${completar ? 'Completando' : 'Descompletando'} item:`, id);
        
        const endpoint = `${API_BASE}/${id}/${completar ? 'completar' : 'descompletar'}`;
        
        const response = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            const emoji = completar ? '✅' : '↩️';
            const accion = completar ? 'completado' : 'marcado como pendiente';
            mostrarMensaje(`${emoji} Item ${accion} exitosamente`, 'success');
            
            // Recargar lista para mostrar el nuevo estado
            await cargarItems();
        } else {
            throw new Error(result.message || 'Error en la operación');
        }
        
    } catch (error) {
        console.error('❌ [FRONTEND] Error en toggle completar:', error);
        mostrarMensaje(`Error: ${error.message}`, 'error');
        
        // Revertir checkbox
        const checkbox = document.querySelector(`input[onchange*="${id}"]`);
        if (checkbox) {
            checkbox.checked = !completar;
        }
    }
}

// Eliminar item
async function eliminarItem(id) {
    if (!confirm('¿Estás seguro de eliminar este item? Esta acción no se puede deshacer.')) {
        return;
    }
    
    try {
        console.log('🗑️ [FRONTEND] Eliminando item:', id);
        
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            mostrarMensaje('Item eliminado exitosamente', 'success');
            await cargarItems();
        } else {
            throw new Error(result.message || 'Error al eliminar');
        }
        
    } catch (error) {
        console.error('❌ [FRONTEND] Error al eliminar:', error);
        mostrarMensaje(`Error: ${error.message}`, 'error');
    }
}

// Cambiar filtro
function cambiarFiltro(filtro) {
    console.log(`🔍 [FRONTEND] Cambiando filtro a: ${filtro}`);
    filtroActual = filtro;
    
    // Actualizar botones activos
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('activo');
    });
    
    const btnActivo = document.getElementById(`btn-${filtro}`);
    if (btnActivo) {
        btnActivo.classList.add('activo');
    }
    
    cargarItems();
}

// Filtrar items localmente (para búsqueda)
function filtrarItems(termino) {
    if (!termino) {
        renderizarItems();
        return;
    }
    
    const terminoLower = termino.toLowerCase();
    const itemsFiltrados = items.filter(item => 
        item.nombre.toLowerCase().includes(terminoLower) ||
        (item.descripcion && item.descripcion.toLowerCase().includes(terminoLower))
    );
    
    // Renderizar items filtrados temporalmente
    const itemsOriginal = [...items];
    items = itemsFiltrados;
    renderizarItems();
    items = itemsOriginal;
}

// Mostrar indicador de carga
function mostrarCargando(mostrar) {
    if (!elementos.listaItems) return;
    
    if (mostrar) {
        elementos.listaItems.innerHTML = `
            <div class="loading" style="text-align: center; padding: 40px;">
                <div class="spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 0 auto;"></div>
                <p style="margin-top: 20px;">Cargando...</p>
            </div>
        `;
    }
}

// Mostrar mensajes al usuario
function mostrarMensaje(mensaje, tipo = 'info') {
    console.log(`📢 [FRONTEND] Mensaje ${tipo}: ${mensaje}`);
    
    // Remover mensajes anteriores del mismo tipo
    document.querySelectorAll(`.mensaje-temporal.mensaje-${tipo}`).forEach(el => el.remove());
    
    const div = document.createElement('div');
    div.className = `mensaje-temporal mensaje-${tipo}`;
    div.innerHTML = `
        <span>${mensaje}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 18px; margin-left: 10px; cursor: pointer;">×</button>
    `;
    
    // Estilos inline para el mensaje
    div.style.cssText = `
        position: fixed;
        top: ${tipo === 'error' ? '20px' : '120px'};
        right: 20px;
        background: ${tipo === 'success' ? '#28a745' : tipo === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        max-width: 400px;
        word-wrap: break-word;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Agregar animación CSS
    if (!document.getElementById('mensaje-styles')) {
        const style = document.createElement('style');
        style.id = 'mensaje-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(div);
    
    // Auto-remover después de tiempo variable según tipo
    const tiempo = tipo === 'error' ? 10000 : 5000;
    setTimeout(() => {
        if (div.parentElement) {
            div.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => div.remove(), 300);
        }
    }, tiempo);
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Funciones globales para eventos inline
window.toggleCompletar = toggleCompletar;
window.eliminarItem = eliminarItem;

console.log('📱 [FRONTEND] Script cargado completamente');
console.log('🔧 [FRONTEND] Configuración final:', {
    serverBase: SERVER_BASE,
    apiBase: API_BASE,
    ubicacionFrontend: window.location.href
});