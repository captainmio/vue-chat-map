import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false


/** VUE MATERIAL */
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
/** VUE MATERIAL */


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
