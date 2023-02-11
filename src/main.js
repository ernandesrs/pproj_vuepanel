import { createApp } from 'vue'
import store from './store'
import axios from './plugins/axios.js'
import cookie from './plugins/cookie'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.config.globalProperties.$store = store
app.config.globalProperties.$axios = axios
app.config.globalProperties.$cookie = cookie

app.use(router)

app.mount('#app')
