<script setup>
import { ref } from 'vue';

//add route
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const error = ref(null);

const token = localStorage.getItem('token');

const deleteOrder = async () => {
  const apiEndpoint = 'https://shoe-backend-517m.onrender.com/api/v1/shoes';
  const id = route.params.id;
  try {
    const response = await fetch(`${apiEndpoint}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (result.status === 'success') {
      router.push('/orders');
    } else {
      error.value = 'Error deleting order';
    }
  } catch (err) {
    error.value = 'Error deleting order';
  }
};

</script>
  
<template>
    <button @click="deleteOrder" class="border-2 border-red-500 bg-red-100 hover:bg-red-400 text-black font-bold py-2 px-4 rounded">
      Delete Order
    </button>
  </template>

<style scoped>

</style>
