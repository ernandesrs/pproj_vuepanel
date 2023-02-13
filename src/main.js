import { createApp } from 'vue'
import store from './store'
import axios from './plugins/axios.js'
import cookie from './plugins/cookie'
import alerts from './services/alerts'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.config.globalProperties.$store = store
app.config.globalProperties.$axios = axios
app.config.globalProperties.$cookie = cookie
app.config.globalProperties.$alerts = alerts

app.use(router).use(store)

app.mount('#app')
