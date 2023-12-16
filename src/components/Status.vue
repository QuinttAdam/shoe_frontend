<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
  let socket = null; 

  onMounted(() => {
    socket = new WebSocket("ws://localhost:3000/primus");
  });


  // Set a default value
  const selectedStatus = ref("Change status");
  const error = ref(null);

  const updateStatus = async () => {
    try {
      // get the shoe id from the url
        const id = route.params.id;

      // Make a PATCH request to your API to update the status
      const response = await fetch(`http://localhost:3000/api/v1/shoes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: selectedStatus.value,
        }),
      });

      // Handle the response as needed
      if (response.ok) {
        console.log('Status updated successfully');

        let data = await response.json();
        console.log(data.status);
        
        let newStatus={
          action:"status",
          value:data.data.status
        }
        console.log(data.data.status);
        socket.send(JSON.stringify(newStatus));



      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
</script>

<template>
    <div class="my-4">
      <select
        v-model="selectedStatus"
        @change="updateStatus"
        class="p-2 border-2 border-lime-400 rounded focus:outline-none bg-lime-100 hover:bg-lime-300 focus:border-lime-400 font-bold"
      >
        <option value="Change status" selected disabled>Change status</option>
        <option value="Ordered">Ordered</option>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
      </select>
    </div>
  </template>
  
  <style scoped>
  
  </style>  