<script setup>
import Orders from '../components/Orders.vue';
import { ref, onMounted } from 'vue';

// make onMounted available in the template
onMounted(() => {
  getOrders();
});

// make a fetch request to the API endpoint to get the orders
const orders = ref([]);
const error = ref(null);

const getOrders = async () => {
  const apiEndpoint = 'http://localhost:3000/api/v1/shoes';
  try {
    const response = await fetch(apiEndpoint);
    const result = await response.json();
    console.log(result);
    if (result.status === 'success') {
      orders.value = result.data;
    } else {
      error.value = 'Error retrieving orders';
    }
  } catch (e) {
    console.error('Error retrieving orders:', e);
    error.value = 'An error occurred while retrieving orders';
  }
};
</script>

<template>
    <div>
      <h2>ORDERS</h2>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-for="order in orders" :key="order._id">
        <Orders :order="order"/>
      </div>
    </div>
  </template>
  

<style scoped>
/* Add your styling here */
</style>
