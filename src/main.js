import { createApp } from 'vue'
import store from './store'
import axios from './plugins/axios.js'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.config.globalProperties.$store = store
app.config.globalProperties.$axios = axios

app.use(router)

app.mount('#app')
