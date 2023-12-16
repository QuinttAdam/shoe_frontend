<script setup>
import { ref, onMounted } from 'vue';

//add route
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
let socket = null;


// make onMounted available in the template
onMounted(() => {
  getOrderById();
  socket = new WebSocket('ws://localhost:3000/primus');
  socket.onmessage=(e)=>{
    console.log(e);

    let newStatus=JSON.parse(e.data);
    if(newStatus.action==="status"){
      console.log("jaaaaaa");
      order.value.status=newStatus.value;
      
    }

  }
});

// make a fetch request to the API endpoint to get the order by id
const order = ref({});
const error = ref(null);

const getOrderById = async () => {
    
  
    const apiEndpoint = `http://localhost:3000/api/v1/shoes/${id}`;
    try {
        const response = await fetch(apiEndpoint);
        const result = await response.json();
        console.log(result);
        if (result.status === 'success') {
        order.value = result.data;
        } else {
        error.value = 'Error retrieving order';
        }
    } catch (e) {
        console.error('Error retrieving order:', e);
        error.value = 'An error occurred while retrieving order';
}
};
</script>
  
  <template>
  <div class="border-4 border-lime-400 bg-lime-100 pt-10 pb-10">
  
    <h2 class="text-lime-400 text-xl font-bold mb-4 ml-12">Ordernumber: {{ order._id }}</h2>

    <div v-if="error" class="w-full p-4 mb-4">{{ error }}</div>

    <div class="flex flex-wrap justify-between mx-20">

    <!-- Inside Details Section -->
    <div class="w-80 p-4">
      <h4 class="font-bold">Inside Details:</h4>
      <div>Color: {{ order.inside_color }}</div>
      <div>Material: {{ order.inside_material }}</div>
    </div>

    <!-- Laces Details Section -->
    <div class="w-80 p-4">
      <h4 class="font-bold">Laces Details:</h4>
      <div>Color: {{ order.laces_color }}</div>
      <div>Material: {{ order.laces_material }}</div>
    </div>

    <!-- Outside 1 Details Section -->
    <div class="w-80 p-4">
      <h4 class="font-bold">Outside 1 Details:</h4>
      <div>Color: {{ order.outside_1_color }}</div>
      <div>Material: {{ order.outside_1_material }}</div>
    </div>

    <!-- Outside 2 Details Section -->
    <div class="w-80 p-4">
      <h4 class="font-bold">Outside 2 Details:</h4>
      <div>Color: {{ order.outside_2_color }}</div>
      <div>Material: {{ order.outside_2_material }}</div>
    </div>

    <!-- Outside 3 Details Section -->
    <div class="w-80 p-4">
      <h4 class="font-bold">Outside 3 Details:</h4>
      <div>Color: {{ order.outside_3_color }}</div>
      <div>Material: {{ order.outside_3_material }}</div>
    </div>

    <!-- Sole Bottom Details Section -->
    <div class="w-80 p-4">
      <h4 class="font-bold">Sole Bottom Details:</h4>
      <div>Color: {{ order.sole_bottom_color }}</div>
      <div>Material: {{ order.sole_bottom_material }}</div>
    </div>

    <!-- Sole Top Details Section -->
    <div class="w-80 p-4">
      <h4 class="font-bold">Sole Top Details:</h4>
      <div>Color: {{ order.sole_top_color }}</div>
      <div>Material: {{ order.sole_top_material }}</div>
    </div>

    <!-- Additional Details Section -->
    <div class="w-80 p-4">
      <h4 class="font-bold">Additional Details:</h4>
      <div>Price: {{ order.price }}</div>
      <div>Size: {{ order.size }}</div>
      <div>Status: {{ order.status }}</div>
      <div>User: {{ order.user }}</div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
