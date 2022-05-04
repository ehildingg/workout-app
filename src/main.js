import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import VueTimers from 'vue-timers'

createApp(App).use(router).use(store).use(VueTimers).mount('#app')
