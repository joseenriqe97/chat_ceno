import { createApp } from 'vue'
import { Quasar } from 'quasar'
import VueAutoscroll from '@codekraft-studio/vue-autoscroll'

import './style.css'
import 'quasar/dist/quasar.css'

import App from './App.vue'


createApp(App).use(Quasar).use(VueAutoscroll).mount('#app')
