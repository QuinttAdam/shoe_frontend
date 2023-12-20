<script setup>
import Details from '../components/Details.vue';
import DeleteOrder from '../components/Delete.vue';
import Status from '../components/Status.vue';

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
  if(!decodedToken.admin){
    router.push('/');
    return;
  }
}

</script>

<template>
    <div class="ml-10 mr-10 mt-28">
        <Details />
        <div class="flex items-center justify-center mt-4 gap-4">
          <DeleteOrder />
          <Status />
        </div>
    </div>
 
</template>

<style scoped>

</style>
