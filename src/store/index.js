import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from "./auth.module.js";

export default new Vuex.Store({
  modules: {
    auth
  }
})
