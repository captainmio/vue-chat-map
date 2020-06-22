const state = {
  LatLng: [],
};

const actions = {
  setMapCoordinates(context, payload) {
    context.commit("setLatLng", payload);
  },
};

const mutations = {
  setLatLng(state, payload) {
    state.LatLang = payload;
  },
};

const getters = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
