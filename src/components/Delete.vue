<script setup>
import { ref } from 'vue';

//add route
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const error = ref(null);

const deleteOrder = async () => {
  const apiEndpoint = 'http://localhost:3000/api/v1/shoes';
  const id = route.params.id;
  console.log(id);
  try {
    const response = await fetch(`${apiEndpoint}/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    console.log(result);
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
