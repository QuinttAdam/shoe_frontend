<!-- Login.vue -->

<script setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();


const email = ref('');
const password = ref('');
const error = ref(null);

const login = async () => {
  // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
  const apiEndpoint = 'https://shoe-backend-517m.onrender.com/api/v1/users/login';

  try {
    // Make a request to your API to check the credentials
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
      
    });
    // Assuming the API returns a JSON object with a 'success' property
    const result = await response.json();

    if (result.status==='success') {
      // Handle successful login, e.g., show a success message or redirect to another screen
      // Save the JWT token in the local storage
      localStorage.setItem('token', result.data.token);
      // Redirect to the orders page
      router.push('/orders');

    } else {
      // Handle authentication error
      error.value = 'Invalid email or password';
    }
  } catch (e) {
    console.error('Error during login:', e);
    // Handle other errors
    error.value = 'An error occurred during login';
  }
};
</script>

<template>
    <form @submit.prevent="login" class="w-96">
      <div class="flex flex-col mb-4">
        <label for="email" class="text-left">Email</label>
        <input type="email" id="email" v-model="email" required class="border border-gray-300 p-2" />
      </div>

      <div class="flex flex-col mb-4">
        <label for="password" class="text-left">Password</label>
        <input type="password" id="password" v-model="password" required class="border border-gray-300 p-2" />
      </div>

      <p v-if="error" class="error font-bold">{{ error }}</p>

      <div class="flex justify-center">
        <button type="submit" class="bg-lime-400 text-white px-4 py-2 rounded" :style="{ width: 'calc(100% - 4px)' }">Login</button>
      </div>
    </form>
</template>

<style scoped>
/* Add your styling here */
</style>
