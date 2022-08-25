import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

/*
*Toast notifaciones
*/
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false

Vue.use(Toast, { timeout: 2000, position: 'top-right' });


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
