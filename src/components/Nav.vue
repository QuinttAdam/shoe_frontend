<script setup>

</script>

<template>
  <div class="h-0">
    <div class="bg-lime-400 w-full h-4">

    </div>
  <div class="navbar bg-white text-black p-4 pl-8 pr-8 flex items-center justify-between">
    <div class="flex items-center">
      <RouterLink to="/">
        <img src="../assets/logo.png" alt="Logo" class="w-40 h-17 mr-2" />
      </RouterLink>
    </div>
    <div class="flex w-60 justify-between">
      <RouterLink to="/" class="nav-link font-extrabold ">Login</RouterLink>
      <RouterLink to="/orders" class="nav-link font-extrabold">Orders</RouterLink>
      <RouterLink to="/change-password" class="nav-link font-extrabold">Password</RouterLink>
    </div>
  </div>
  </div>
</template>

<style scoped>
.nav-link {
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #a3e635;
}
</style>
