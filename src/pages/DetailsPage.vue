<script setup>
import Details from '../components/Details.vue';
import DeleteOrder from '../components/Delete.vue';

import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { jwtDecode } from "jwt-decode";

const router = useRouter();
const token = localStorage.getItem('token');

onMounted(() => {
  checkAdmin();
});

const checkAdmin=()=>{
  if (!token) {
    // Redirect to the login page if the token is invalid
    router.push('/');
    return;
  }

  // Decode the JWT token
  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    // Handle the error or redirect to the login page
    router.push('/');
    return;
  }
  console.log(decodedToken);
  if(!decodedToken.admin){
    router.push('/');
    return;
  }
}

</script>

<template>
    <div class="m-10">
        <Details />
        <DeleteOrder />
    </div>
 
</template>

<style scoped>

</style>
