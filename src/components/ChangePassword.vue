
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

onMounted(() => {
  checkAdmin();
});

const router = useRouter();
const token = localStorage.getItem('token');

let oldPassword = ref('');
let newPassword = ref('');
let error = ref(null);
let decodedToken;

const checkAdmin=()=>{
  if (!token) {
    // Redirect to the login page if the token is invalid
    router.push('/');
    return;
  }

  // Decode the JWT token
  
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

const changePassword = async () => {
  let id = decodedToken.id;
  console.log(id);
  const apiEndpoint = `http://localhost:3000/api/v1/users/${id}`; // Replace with your API endpoint
  console.log(apiEndpoint);

  try {
    const response = await fetch(apiEndpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      }),
    });

    const result = await response.json();
    console.log(result);

    if (result.status === 'success') {
      // Password changed successfully
      console.log('Password changed successfully');
      error.value = result.message || 'Password changed successfully';
    } else {
      error.value = result.message || 'Error changing password';
    }
  } catch (e) {
    console.error('Error changing password:', e);
    error.value = 'An error occurred while changing the password';
  }
};

</script>

<template>
      <form @submit.prevent="changePassword" class="w-96">
        <div class="flex flex-col mb-4">
          <label for="oldPassword" class="text-left">Old Password:</label>
          <input v-model="oldPassword" type="password" id="oldPassword" name="oldPassword" class="border border-gray-300 p-2" required />
        </div>
  
        <div class="flex flex-col mb-4">
          <label for="newPassword" class="text-left">New Password:</label>
          <input v-model="newPassword" type="password" id="newPassword" name="newPassword" class="border border-gray-300 p-2" required />
        </div>
        <div v-if="error" class="text-black-500 font-bold mb-4">{{ error }}</div>
        <button type="submit" class="bg-lime-400 text-white px-4 py-2 rounded w-full">Change Password</button>
      </form>
  </template>
  
  
  <style scoped>
 
  </style>
  