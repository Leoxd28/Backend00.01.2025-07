
<template>
  <form class="checkout" @submit.prevent="submit">
    <h2>Checkout</h2>

    <section class="card">
      <h3>Datos del cliente</h3>
      <div class="grid">
        <label>
          Nombre completo
          <input v-model.trim="form.fullName" type="text" required autocomplete="name" />
        </label>
        <label>
          Email
          <input v-model.trim="form.email" type="email" required autocomplete="email" />
        </label>
        <label>
          Teléfono
          <input v-model.trim="form.phone" type="tel" autocomplete="tel" />
        </label>
      </div>
    </section>

    <section class="card">
      <h3>Dirección de envío</h3>
      <div class="grid">
        <label class="col-span-2">
          Dirección
          <input v-model.trim="form.address" type="text" required autocomplete="address-line1" />
        </label>
        <label>
          Ciudad
          <input v-model.trim="form.city" type="text" required autocomplete="address-level2" />
        </label>
        <label>
          Estado/Provincia
          <input v-model.trim="form.state" type="text" autocomplete="address-level1" />
        </label>
        <label>
          Código postal
          <input v-model.trim="form.postalCode" type="text" required autocomplete="postal-code" />
        </label>
        <label>
          País
          <input v-model.trim="form.country" type="text" required autocomplete="country-name" />
        </label>
      </div>
    </section>

    <section class="card" v-if="includePaymentFields">
      <h3>Pago (solo demo)</h3>
      <p class="note">
        No envíes datos de tarjeta reales a tu servidor. En producción usa tokenización
        (Stripe, Culqi, etc.) para cumplir PCI.
      </p>
      <div class="grid">
        <label class="col-span-2">
          Titular
          <input v-model.trim="form.payment.cardholder" type="text" autocomplete="cc-name" />
        </label>
        <label>
          Número
          <input v-model.trim="form.payment.number" type="text" inputmode="numeric" autocomplete="cc-number" />
        </label>
        <label>
          MM/AA
          <input v-model.trim="form.payment.exp" type="text" placeholder="MM/AA" autocomplete="cc-exp" />
        </label>
        <label>
          CVC
          <input v-model.trim="form.payment.cvc" type="text" inputmode="numeric" autocomplete="cc-csc" />
        </label>
      </div>
    </section>

    <section class="card" v-if="cartItems && cartItems.length">
      <h3>Resumen del carrito</h3>
      <ul class="cart">
        <li v-for="item in cartItems" :key="item.id">
          <span>{{ item.name }} × {{ item.qty }}</span>
          <span>{{ formatPrice(item.price * item.qty, currency) }}</span>
        </li>
      </ul>
      <div class="total">
        <strong>Total</strong>
        <strong>{{ formatPrice(total, currency) }}</strong>
      </div>
    </section>

    <label class="card">
      Notas (opcional)
      <textarea v-model.trim="form.notes" rows="3" placeholder="Indicaciones para el envío, referencias, etc."></textarea>
    </label>

    <div class="actions">
      <button type="submit" :disabled="loading">
        <span v-if="!loading">Pagar y enviar</span>
        <span v-else>Enviando…</span>
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
  </form>
</template>


<script setup>
import { reactive, ref, computed } from 'vue'

const props = defineProps({
  endpoint: { type: String, required: true }, // e.g. "/api/checkout"
  method:   { type: String, default: 'POST' },
  headers:  { type: Object, default: () => ({}) }, // headers extra (e.g. Authorization)
  cartItems:{ 
    type: Array, 
    default: () => ([]), // [{id, name, qty, price}]
  },
  currency: { type: String, default: 'USD' },
  includePaymentFields: { type: Boolean, default: false },
})

const emit = defineEmits(['submitted', 'success', 'error']);

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  notes: '',
  payment: {
    cardholder: '',
    number: '',
    exp: '',
    cvc: ''
  }
})

const loading = ref(false)
const error = ref('')
const successMessage = ref('')

const total = computed(() =>
  (props.cartItems || []).reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.qty) || 0), 0)
)

function formatPrice(value, currency) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value || 0)
  } catch {
    return `${currency} ${Number(value || 0).toFixed(2)}`
  }
}

function validate() {
  error.value = ''
  if (!form.fullName || !form.email || !form.address || !form.city || !form.postalCode || !form.country) {
    error.value = 'Por favor completa los campos obligatorios.'
    return false
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  if (!emailOk) {
    error.value = 'Ingresa un email válido.'
    return false
  }
  if (props.includePaymentFields) {
    // Validaciones mínimas de demo (NO usar en producción para tarjetas reales)
    if (!form.payment.cardholder || !form.payment.number || !form.payment.exp || !form.payment.cvc) {
      error.value = 'Completa los datos de pago (solo demo).'
      return false
    }
  }
  return true
}

async function submit() {
  if (!validate()) return
  console.log('Submitting', form);
  loading.value = true
  successMessage.value = ''
  error.value = ''
  emit('submitted');
  try {
    const payload = {
      customer: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone
      },
      shipping: {
        address: form.address,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country
      },
      notes: form.notes || '',
      cart: props.cartItems || [],
      totals: { currency: props.currency, total: total.value },
      // En producción, envía un token del gateway (Stripe/Culqi), no los datos de tarjeta:
      payment: props.includePaymentFields ? { ...form.payment } : { method: 'tokenized-or-cod' }
    }

    const res = await fetch(props.endpoint, {
      method: props.method,
      headers: {
        'Content-Type': 'application/json',
        ...props.headers
      },
      body: JSON.stringify(payload)
    })
    console.log('Response', res);
    if (!res.ok) {
      const msg = await safeError(res)
      throw new Error(msg || `Error ${res.status}`)
    }

    const data = await res.json().catch(() => ({}))
    successMessage.value = data?.message || 'Pedido realizado con éxito.'
    emit('success', data)
    Object.assign(form, {
      fullName: '', email: '', phone: '', address: '', city: '', state: '',
      postalCode: '', country: '', notes: '', payment: { cardholder: '', number: '', exp: '', cvc: '' }
    })

  } catch (error) {
    error.value = e?.message || 'Ocurrió un error inesperado.'
    emit('error', e)
  }finally {
    loading.value = false
  }
}


async function safeError(res) {
  try {
    const text = await res.text()
    try {
      const json = JSON.parse(text)
      return json?.error || json?.message || text
    } catch {
      return text
    }
  } catch {
    return ''
  }
}
</script>


<style scoped>
.checkout {
  max-width: 760px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
}
h2 { margin: 0.25rem 0 0.5rem; }
h3 { margin: 0 0 0.5rem; font-size: 1.05rem; }

.card {
  background: #fff;
  border: 1px solid #e7e7e9;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,.03);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .75rem;
}
.col-span-2 { grid-column: span 2; }

label {
  display: grid;
  gap: .35rem;
  font-size: .92rem;
}

input, textarea {
  border: 1px solid #d8d8dd;
  border-radius: 10px;
  padding: .65rem .75rem;
  font-size: .95rem;
  outline: none;
}
input:focus, textarea:focus {
  border-color: #8da2fb;
  box-shadow: 0 0 0 3px rgba(141,162,251,.15);
}

.cart {
  list-style: none;
  margin: 0;
  padding: 0;
}
.cart li {
  display: flex;
  justify-content: space-between;
  padding: .35rem 0;
  border-bottom: 1px dashed #eee;
}
.total {
  display: flex;
  justify-content: space-between;
  padding-top: .5rem;
  font-size: 1.05rem;
}

.note {
  margin: .25rem 0 .75rem;
  font-size: .85rem;
  color: #6b7280;
}

.actions {
  display: grid;
  gap: .5rem;
  justify-items: start;
}
button {
  background: #111827;
  color: #fff;
  padding: .7rem 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}
button[disabled] {
  opacity: .6;
  cursor: not-allowed;
}
.error { color: #b91c1c; }
.success { color: #047857; }

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
  .col-span-2 { grid-column: auto; }
}
</style>