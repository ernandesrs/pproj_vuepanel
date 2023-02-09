import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router).use(store);

app.mount('#app')
