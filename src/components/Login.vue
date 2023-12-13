<!-- Login.vue -->

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const error = ref(null);

const login = async () => {
  // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
  const apiEndpoint = 'http://localhost:3000/api/v1/users/login';

  try {
    // Make a request to your API to check the credentials
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
      
    });
    console.log(email.value, password.value);
    // Assuming the API returns a JSON object with a 'success' property
    const result = await response.json();
    console.log(result);

    if (result.status==='success') {
      // Handle successful login, e.g., show a success message or redirect to another screen
      console.log('Login successful!');
    } else {
      // Handle authentication error
      console.log(result.message);
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
  <div class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-lime-400 font-bold text-2xl mb-4">Login</h1>

    <form @submit.prevent="login" class="w-96">
      <div class="flex flex-col mb-4">
        <label for="email" class="text-left">Email</label>
        <input type="email" id="email" v-model="email" required class="border border-gray-300 p-2" />
      </div>

      <div class="flex flex-col mb-4">
        <label for="password" class="text-left">Password</label>
        <input type="password" id="password" v-model="password" required class="border border-gray-300 p-2" />
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <div class="flex justify-center">
        <button type="submit" class="bg-lime-400 text-white px-4 py-2 rounded" :style="{ width: 'calc(100% - 4px)' }">Login</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Add your styling here */
</style>
