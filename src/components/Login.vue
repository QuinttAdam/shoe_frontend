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
  <div class="bg-orange-700">
    <h1>Login</h1>

    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
/* Add your styling here */
</style>
