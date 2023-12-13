import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//import components
import Login from './components/Login.vue'
import Orders from './components/Orders.vue'

//import vue router
import * as VueRouter from 'vue-router'

const routes = [
  { path: '/', component: Login },
  { path: '/orders', component: Orders }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, 
})

const app = createApp(App)
app.use(router)

app.mount('#app')
