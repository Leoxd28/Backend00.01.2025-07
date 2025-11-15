<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import CheckoutForm from '../components/CheckoutForm.vue'
const cart = [
  { id: 'sku_001', name: 'Producto A', qty: 2, price: 49.9 },
  { id: 'sku_002', name: 'Producto B', qty: 1, price: 19.5 }
]
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <CheckoutForm
    endpoint="http://localhost:8000/api/process/pay"
    :cart-items="cart"
    currency="PEN"
    :include-payment-fields="true"   
    @success="(res) => console.log('OK', res)"
    @error="(e) => console.error('ERR', e)"
  />
  </main>
</template>
