<script setup>
import Orders from "../components/Orders.vue";
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";

let socket = null;

const router = useRouter();

// make onMounted available in the template
onMounted(() => {
  checkAdmin();
  getOrders();
  socket = new WebSocket("ws://localhost:3000/primus");
  socket.onmessage = (e) => {
    console.log("ululuulullu");
    console.log(e);

    let newOrder = JSON.parse(e.data);
    console.log(newOrder);
    if (newOrder.action === "add") {
      orders.value.push(newOrder);
    }
  };
});

// make a fetch request to the API endpoint to get the orders
const orders = ref([]);
const error = ref(null);

//get token from local storage
// localStorage.clear();
const token = localStorage.getItem("token");
console.log(token);

const checkAdmin = () => {
  if (!token) {
    // Redirect to the login page if the token is invalid
    router.push("/");
    return;
  }

  // Decode the JWT token
  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    // Handle the error or redirect to the login page
    router.push("/");
    return;
  }
  console.log(decodedToken);
  if (!decodedToken.admin) {
    router.push("/");
    return;
  }
};
const getOrders = async () => {
  // Check if the token exists

  const apiEndpoint = "http://localhost:3000/api/v1/shoes";
  try {
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    if (result.status === "success") {
      orders.value = result.data;
    } else {
      error.value = "Error retrieving orders";
    }
  } catch (e) {
    console.error("Error retrieving orders:", e);
    error.value = "An error occurred while retrieving orders";
  }
};
</script>

<template>
  <div class="mt-24">
    <h2 class="text-lime-400 text-2xl font-bold mt-4 mb-4 p-4 text-center">
      {{ orders.length }} Orders
    </h2>
    <div class="w-full pl-20 p-4 flex flex-wrap">
      <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
      <RouterLink
        v-for="order in orders"
        :key="order._id"
        :to="`/details/${order._id}`"
      >
        <Orders :order="order" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* Add your styling here */
</style>
