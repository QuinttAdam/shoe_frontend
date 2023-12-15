import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//import components
import Login from './pages/LoginPage.vue'
import Orders from './pages/OrdersPage.vue'
import Details from './pages/DetailsPage.vue'
import ChangePassword from './pages/ChangePasswordPage.vue'

//import vue router
import * as VueRouter from 'vue-router'

const routes = [
  { path: '/', component: Login },
  { path: '/orders', component: Orders },
  { path: '/details/:id', component: Details },
  { path: '/change-password', component: ChangePassword },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, 
})

const app = createApp(App)
app.use(router)

app.mount('#app')
