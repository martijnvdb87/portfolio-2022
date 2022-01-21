import { createStore } from 'vuex';

export default createStore({
  state: {
    count: 0
  },

  mutations: {
    increment(state, payload = 1) {
      state.count += payload;
    }
  },

  actions: {

  },

  getters: {

  }
})