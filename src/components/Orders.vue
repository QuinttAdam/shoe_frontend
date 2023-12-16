<script setup>
const props = defineProps(['order']);
</script>

<template>
  <div class="p-4 border-4 border-lime-400 bg-lime-100 rounded w-80 mr-4 mb-4">
    <h4 class="text-lg font-bold mb-2">Ordernumber: {{ order._id }}</h4>
    <div class="mb-2">User: {{ order.user }}</div>
    <div class="mb-2">Price: {{ order.price }}</div>
    <div>Size: {{ order.size }}</div>
  </div>
</template>

<style scoped>
/* You can add more specific styles here if needed */
</style>
