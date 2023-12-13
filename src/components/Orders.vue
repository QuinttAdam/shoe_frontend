<script setup>
import { ref, onMounted } from 'vue';
// make onMounted available in the template
onMounted(() => {
  getOrders();
});

// make a fetch request to the API endpoint to get the orders
const orders = ref([]);
const error = ref(null);

const getOrders= async ()=> {
  const apiEndpoint = 'http://localhost:3000/api/v1/shoes';
  try {
    const response = await fetch(apiEndpoint);
    const result = await response.json();
    console.log(result);
    if (result.status==='success') {
      orders.value = result.data.orders;
    } else {
      error.value = 'Invalid email or password';
    }
  } catch (e) {
    console.error('Error during login:', e);
    error.value = 'An error occurred during login';
  }
};


</script>

<template>
  <div>
    ORDERS
  </div>
</template>

<style scoped>
/* Add your styling here */
</style>
