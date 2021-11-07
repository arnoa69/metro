import Vue from 'vue'
import Vuex from 'vuex'
import metropolisData from '../api/mock/data/metropolis';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    metropolis: {}
  },
  mutations: {
    fetchData(state, payload) {
      state.metropolis = payload
    }
  },
  actions: {
    fetchData ( { commit } ) {
        commit('fetchData', metropolisData) 
    }
  },
  getters: {
    getMetropolisData(state) {
      return state.metropolis
    }
  }
})
