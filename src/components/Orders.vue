<script setup>
const props = defineProps(['order']);
</script>

<template>
        <div>
          <h4>Ordernumber: {{ order._id }}</h4>
          <div>User: {{ order.user }}</div>
          <div>Status: {{ order.status }}</div>
          <div>Price: {{ order.price }}</div>
          <div>Size: {{ order.size }}</div>
        </div>
  </template>
  

<style scoped>
/* Add your styling here */
</style>
