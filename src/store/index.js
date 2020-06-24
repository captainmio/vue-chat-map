import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import auth from "./auth.module.js";
import map from "./map.module.js";
import chat from "./chat.module.js";

export default new Vuex.Store({
  modules: {
    auth,
    map,
    chat
  },
});
