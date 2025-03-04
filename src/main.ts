import { createApp } from 'vue'
import '@/assets/styles/element.scss'
import '@/assets/styles/main.scss'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router';

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

app.mount('#app')
