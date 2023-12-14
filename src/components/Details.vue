<script setup>
import { ref, onMounted } from 'vue';

//add route
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;


// make onMounted available in the template
onMounted(() => {
  getOrderById();
});

// make a fetch request to the API endpoint to get the order by id
const order = ref({});
const error = ref(null);

const getOrderById = async () => {
    
  
    const apiEndpoint = `http://localhost:3000/api/v1/shoes/${id}`;
    try {
        const response = await fetch(apiEndpoint);
        const result = await response.json();
        console.log(result);
        if (result.status === 'success') {
        order.value = result.data;
        } else {
        error.value = 'Error retrieving order';
        }
    } catch (e) {
        console.error('Error retrieving order:', e);
        error.value = 'An error occurred while retrieving order';
}
};
</script>

<template>
    <div>
      <h2>ORDERS</h2>
      <div v-if="error" class="error">{{ error }}</div>
        <div>
          <h4>Inside Details:</h4>
          <div>Color: {{ order.inside_color }}</div>
          <div>Material: {{ order.inside_material }}</div>
        </div>
  
        <div>
          <h4>Laces Details:</h4>
          <div>Color: {{ order.laces_color }}</div>
          <div>Material: {{ order.laces_material }}</div>
        </div>
  
        <div>
          <h4>Outside 1 Details:</h4>
          <div>Color: {{ order.outside_1_color }}</div>
          <div>Material: {{ order.outside_1_material }}</div>
        </div>
  
        <div>
          <h4>Outside 2 Details:</h4>
          <div>Color: {{ order.outside_2_color }}</div>
          <div>Material: {{ order.outside_2_material }}</div>
        </div>
  
        <div>
          <h4>Outside 3 Details:</h4>
          <div>Color: {{ order.outside_3_color }}</div>
          <div>Material: {{ order.outside_3_material }}</div>
        </div>
  
        <div>
          <h4>Sole Bottom Details:</h4>
          <div>Color: {{ order.sole_bottom_color }}</div>
          <div>Material: {{ order.sole_bottom_material }}</div>
        </div>
  
        <div>
          <h4>Sole Top Details:</h4>
          <div>Color: {{ order.sole_top_color }}</div>
          <div>Material: {{ order.sole_top_material }}</div>
        </div>
  
        <div>
          <h4>Additional Details:</h4>
          <div>Price: {{ order.price }}</div>
          <div>Size: {{ order.size }}</div>
          <div>Status: {{ order.status }}</div>
          <div>User: {{ order.user }}</div>
        </div>
      </div>
  </template>
  

<style scoped>

</style>
