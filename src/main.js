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


/** Vue Chat Scroll */
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
/** Vue Chat Scroll */

/** FIREBASE */
import * as firebase from "firebase"
/** FIREBASE */

router.beforeEach((to, from, next) => {
  
  if(to.meta.needsAuth) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch("fetchUser", user).then(() => {
          next();
        }).catch(() => {
          alert('Need to be logged-in to access this page?');
          window.location.href = '/';
        });
      } else {
        window.location.href = '/';
      }
      
    });
  } else {
    next();
  }
})



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
