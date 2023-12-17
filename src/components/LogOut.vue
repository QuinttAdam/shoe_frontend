<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const error = ref(null);

const logout = () => {
  try {
    // Clear local storage
    if (localStorage.length===0){
        error.value = 'You are not logged in';
    }else{
        localStorage.clear();
    
        // Redirect to the login page
        router.push('/');
        error.value = 'Successfully logged out';
    }
    
  } catch (err) {
    error.value = 'Error logging out';
  }
};
</script>

<template>
  <button @click="logout" class="text-red-500 font-bold py-2 px-4 pt-5 underline">
    Log out
  </button>
    <p v-if="error" class="text-black-500 font-bold py-2 px-4 ">
        {{ error }}
    </p>
</template>

<style scoped>
/* Your styles go here */
</style>
