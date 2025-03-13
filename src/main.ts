import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import CanvasJSChart from '@canvasjs/vue-charts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CanvasJSChart)

app.mount('#app')
