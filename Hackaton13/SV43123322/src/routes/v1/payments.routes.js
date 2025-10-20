const express = require('express');
const router = express.Router();

// Almacén en memoria para idempotencia (en producción usar Redis o BD)
const idempotencyStore = new Map();

// Middleware para verificar Idempotency-Key
const checkIdempotency = (req, res, next) => {
  const idempotencyKey = req.headers['idempotency-key'];
  
  if (!idempotencyKey) {
    return res.status(400).json({ 
      error: 'Idempotency-Key header es requerido' 
    });
  }

  // Verificar si la petición ya fue procesada
  if (idempotencyStore.has(idempotencyKey)) {
    const cachedResponse = idempotencyStore.get(idempotencyKey);
    return res.status(200).json({
      ...cachedResponse,
      cached: true,
      message: 'Respuesta recuperada del caché (idempotente)'
    });
  }

  req.idempotencyKey = idempotencyKey;
  next();
};

// POST /api/v1/payments - Procesar pago idempotente
router.post('/', checkIdempotency, (req, res) => {
  /* 
    #swagger.tags = ['Payments']
    #swagger.summary = 'Procesar pago (idempotente)'
    #swagger.description = 'Procesa un pago de forma idempotente usando Idempotency-Key'
    #swagger.parameters['Idempotency-Key'] = {
      in: 'header',
      type: 'string',
      required: true,
      description: 'Clave única para garantizar idempotencia',
      example: 'payment-uuid-12345'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos del pago',
      required: true,
      schema: {
        amount: 99.99,
        currency: 'USD'
      }
    }
    #swagger.responses[200] = {
      description: 'Pago procesado exitosamente',
      schema: {
        status: 'success',
        transactionId: 'txn_1234567890_abc123',
        amount: 99.99,
        currency: 'USD',
        processedAt: '2025-10-19T10:00:00.000Z'
      }
    }
    #swagger.responses[400] = {
      description: 'Datos inválidos'
    }
    #swagger.responses[409] = {
      description: 'Pago duplicado'
    }
  */
  
  const { amount, currency } = req.body;

  // Validaciones
  if (!amount || !currency) {
    return res.status(400).json({ 
      error: 'amount y currency son requeridos' 
    });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ 
      error: 'amount debe ser un número positivo' 
    });
  }

  // Simular procesamiento de pago
  const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const response = {
    status: 'success',
    transactionId,
    amount,
    currency,
    processedAt: new Date().toISOString()
  };

  // Guardar en el almacén de idempotencia
  idempotencyStore.set(req.idempotencyKey, response);

  // Limpiar después de 24 horas (opcional)
  setTimeout(() => {
    idempotencyStore.delete(req.idempotencyKey);
  }, 24 * 60 * 60 * 1000);

  res.status(200).json(response);
});

module.exports = router;